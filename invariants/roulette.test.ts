import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  emptyLobby,
  join,
  start,
  disconnect,
  reconnect,
  forfeitExpired,
  spin,
  claim,
  aliveSeats,
  BUY_IN,
  GRACE_SEC,
  MAX_SEATS,
} from "./roulette.ts";

const entropy = "11".repeat(32);

function seated(names: string[]) {
  let lobby = emptyLobby();
  for (const name of names) lobby = join(lobby, name, BUY_IN);
  return start(lobby);
}

describe("join", () => {
  it("escrows the exact buy-in", () => {
    let lobby = join(emptyLobby(), "alice", BUY_IN);
    lobby = join(lobby, "bob", BUY_IN);
    assert.equal(lobby.pot, 2_000n);
    assert.equal(aliveSeats(lobby).length, 2);
  });

  it("refuses a wrong amount, a duplicate, and a seventh seat", () => {
    assert.throws(() => join(emptyLobby(), "alice", 999n), /exactly 1000/);
    let lobby = join(emptyLobby(), "alice", BUY_IN);
    assert.throws(() => join(lobby, "alice", BUY_IN), /already seated/);
    const names = ["a1", "a2", "a3", "a4", "a5", "b1"];
    lobby = emptyLobby();
    for (const n of names) lobby = join(lobby, n, BUY_IN);
    assert.equal(lobby.seats.length, MAX_SEATS);
    assert.throws(() => join(lobby, "b2", BUY_IN), /full/);
  });

  it("refuses start with one player", () => {
    const lobby = join(emptyLobby(), "alice", BUY_IN);
    assert.throws(() => start(lobby), /at least 2/);
  });
});

describe("spin", () => {
  it("eliminates exactly one alive seat and does not move the pot", () => {
    const lobby = seated(["alice", "bob", "carol"]);
    const pot = lobby.pot;
    const result = spin(lobby, entropy);
    assert.equal(result.lobby.pot, pot);
    assert.equal(aliveSeats(result.lobby).length, 2);
    assert.equal(
      result.lobby.seats.filter((s) => s.status === "eliminated").length,
      1
    );
    assert.ok(["alice", "bob", "carol"].includes(result.eliminated));
  });

  it("does not draw a disconnected seat", () => {
    let lobby = seated(["alice", "bob", "carol"]);
    lobby = disconnect(lobby, "carol", 1_000);
    const result = spin(lobby, entropy);
    assert.notEqual(result.eliminated, "carol");
    assert.equal(
      result.lobby.seats.find((s) => s.owner === "carol")?.status,
      "disconnected"
    );
  });

  it("refuses a spin when only one seat is alive", () => {
    let lobby = seated(["alice", "bob"]);
    lobby = spin(lobby, entropy).lobby;
    assert.throws(() => spin(lobby, entropy), /at least 2 alive/);
  });
});

describe("disconnect recovery", () => {
  it("reconnects before the deadline", () => {
    let lobby = seated(["alice", "bob"]);
    lobby = disconnect(lobby, "bob", 1_000);
    lobby = reconnect(lobby, "bob", 1_000 + GRACE_SEC - 1);
    assert.equal(lobby.seats.find((s) => s.owner === "bob")?.status, "alive");
  });

  it("refuses reconnect at the deadline and forfeits instead", () => {
    let lobby = seated(["alice", "bob", "carol"]);
    lobby = disconnect(lobby, "bob", 1_000);
    assert.throws(() => reconnect(lobby, "bob", 1_000 + GRACE_SEC), /grace expired/);
    lobby = forfeitExpired(lobby, 1_000 + GRACE_SEC);
    assert.equal(lobby.seats.find((s) => s.owner === "bob")?.status, "eliminated");
    assert.equal(lobby.pot, 3_000n);
  });
});

describe("claim", () => {
  it("pays the whole pot to the last alive seat once", () => {
    let lobby = seated(["alice", "bob"]);
    lobby = spin(lobby, entropy).lobby;
    const paid = claim(lobby);
    assert.equal(paid.paid, 2_000n);
    assert.ok(paid.winner === "alice" || paid.winner === "bob");
    assert.equal(paid.lobby.pot, 0n);
    assert.throws(() => claim(paid.lobby), /already claimed/);
  });

  it("refuses claim while two are alive or a disconnect is unresolved", () => {
    const lobby = seated(["alice", "bob"]);
    assert.throws(() => claim(lobby), /exactly one alive/);
    const dropped = disconnect(lobby, "bob", 50);
    assert.throws(() => claim(dropped), /resolve disconnects/);
  });
});
