/**
 * Multi-player elimination lobby (educational).
 * Equal buy-in goes into the pot on join. A spin eliminates exactly one alive seat.
 * A disconnected seat can reconnect before `disconnectDeadline`; after that, forfeitExpired eliminates them.
 * Entropy is a 64-hex stand-in. This module does not call orng.wax and does not move tokens.
 */

export const MAX_SEATS = 6;
export const GRACE_SEC = 60;
export const BUY_IN = 1_000n;

export type Status = "alive" | "disconnected" | "eliminated";

export type Seat = {
  owner: string;
  status: Status;
  /** Unix seconds. Set only while disconnected. */
  disconnectDeadline: number | null;
};

export type Lobby = {
  seats: Seat[];
  pot: bigint;
  started: boolean;
  winner: string | null;
};

const NAME = /^[a-z1-5.]{1,12}$/;

export function emptyLobby(): Lobby {
  return { seats: [], pot: 0n, started: false, winner: null };
}

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad account name");
  }
  return name;
}

export function aliveSeats(lobby: Lobby): Seat[] {
  return lobby.seats.filter((s) => s.status === "alive");
}

/** Join before start. Buy-in is fixed. Stake is already inside `pot`. */
export function join(lobby: Lobby, owner: string, amount: bigint): Lobby {
  assertName(owner);
  if (lobby.started) throw new Error("lobby already started");
  if (lobby.winner !== null) throw new Error("lobby closed");
  if (typeof amount !== "bigint" || amount !== BUY_IN) throw new Error("buy-in must be exactly 1000");
  if (lobby.seats.some((s) => s.owner === owner)) throw new Error("already seated");
  if (lobby.seats.length >= MAX_SEATS) throw new Error("lobby full");
  return {
    ...lobby,
    pot: lobby.pot + amount,
    seats: [...lobby.seats, { owner, status: "alive", disconnectDeadline: null }],
  };
}

export function start(lobby: Lobby): Lobby {
  if (lobby.started) throw new Error("lobby already started");
  if (aliveSeats(lobby).length < 2) throw new Error("need at least 2 players");
  return { ...lobby, started: true };
}

export function disconnect(lobby: Lobby, owner: string, nowTs: number): Lobby {
  if (!lobby.started) throw new Error("not started");
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  const seat = lobby.seats.find((s) => s.owner === owner);
  if (!seat) throw new Error("not seated");
  if (seat.status !== "alive") throw new Error("only an alive seat can disconnect");
  return {
    ...lobby,
    seats: lobby.seats.map((s) =>
      s.owner === owner
        ? { ...s, status: "disconnected", disconnectDeadline: nowTs + GRACE_SEC }
        : s
    ),
  };
}

/** Recovery path: back to alive if now is still before the deadline. */
export function reconnect(lobby: Lobby, owner: string, nowTs: number): Lobby {
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  const seat = lobby.seats.find((s) => s.owner === owner);
  if (!seat) throw new Error("not seated");
  if (seat.status !== "disconnected" || seat.disconnectDeadline === null) {
    throw new Error("not disconnected");
  }
  if (nowTs >= seat.disconnectDeadline) throw new Error("grace expired");
  return {
    ...lobby,
    seats: lobby.seats.map((s) =>
      s.owner === owner ? { ...s, status: "alive", disconnectDeadline: null } : s
    ),
  };
}

/** Anyone may call. Expired disconnected seats become eliminated. Pot is unchanged. */
export function forfeitExpired(lobby: Lobby, nowTs: number): Lobby {
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  return {
    ...lobby,
    seats: lobby.seats.map((s) => {
      if (s.status !== "disconnected" || s.disconnectDeadline === null) return s;
      if (nowTs < s.disconnectDeadline) return s;
      return { ...s, status: "eliminated", disconnectDeadline: null };
    }),
  };
}

function entropyIndex(count: number, entropy: string): number {
  if (!/^[0-9a-f]{64}$/i.test(entropy)) throw new Error("entropy must be 64 hex chars");
  const n = BigInt("0x" + entropy.slice(0, 16).toLowerCase());
  return Number(n % BigInt(count));
}

/**
 * Eliminate exactly one alive seat. Disconnected seats are not in the draw.
 * Pot does not change. Refuses when fewer than 2 seats are alive.
 */
export function spin(lobby: Lobby, entropy: string): { lobby: Lobby; eliminated: string } {
  if (!lobby.started) throw new Error("not started");
  if (lobby.winner !== null) throw new Error("lobby closed");
  const alive = aliveSeats(lobby);
  if (alive.length < 2) throw new Error("need at least 2 alive");
  const idx = entropyIndex(alive.length, entropy);
  const eliminated = alive[idx].owner;
  return {
    eliminated,
    lobby: {
      ...lobby,
      seats: lobby.seats.map((s) =>
        s.owner === eliminated ? { ...s, status: "eliminated", disconnectDeadline: null } : s
      ),
    },
  };
}

/** Last alive seat takes the whole pot. Disconnected seats must be forfeited or reconnected first. */
export function claim(lobby: Lobby): { lobby: Lobby; winner: string; paid: bigint } {
  if (!lobby.started) throw new Error("not started");
  if (lobby.winner !== null) throw new Error("already claimed");
  if (lobby.seats.some((s) => s.status === "disconnected")) {
    throw new Error("resolve disconnects before claim");
  }
  const alive = aliveSeats(lobby);
  if (alive.length !== 1) throw new Error("need exactly one alive");
  const winner = alive[0].owner;
  const paid = lobby.pot;
  if (paid <= 0n) throw new Error("empty pot");
  return {
    winner,
    paid,
    lobby: { ...lobby, pot: 0n, winner },
  };
}
