# px-rng-russian-roulette-elimination

> **Trust:** private educational lab (Tier B)  
> **Quest:** 020 — elimination lobby with disconnect recovery  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach a lobby that takes a **fixed buy-in**, eliminates **one alive seat per spin**, and lets a disconnected seat **reconnect before a 60s grace** or **forfeit after it**.

**Real code:** `npm test`. Entropy is a **64-hex stand-in**. This repo does **not** call `orng.wax` and does **not** transfer tokens. `join` only credits an in-memory pot.

---

## What is true (executed)

| Rule | Result |
|------|--------|
| `join` | buy-in exactly 1000; max 6 seats; pot += buy-in |
| `start` | at least 2 seats |
| `spin` | exactly one **alive** seat eliminated; pot unchanged; disconnected seats are not drawn |
| `disconnect` / `reconnect` | alive again if `now < deadline` |
| `forfeitExpired` | at/after deadline the seat is eliminated; pot unchanged |
| `claim` | exactly one alive seat, no unresolved disconnect; whole pot once |

```bash
npm test
```

## Actions this lab does **not** claim

| Name | Status |
|------|--------|
| `orng.wax::requestrand` / `randnotify` | not built and not called |
| Token `transfer` into the lobby | not modeled |
| Host rake or mid-game refund | not present |

Different from quest 006 (`px-orng-roulette-wheel-escrow`), which is a European wheel bet, not an elimination lobby. Different from quest 019, which must not reduce principal.

## License

MIT — Pixel Journey
