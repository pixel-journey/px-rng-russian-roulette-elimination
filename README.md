# Elimination lobby with disconnect recovery

> **Domain:** multiplayer elimination lobby  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** A lobby that takes a **fixed buy-in**, eliminates **one alive seat per spin**, and lets a disconnected seat **reconnect before a 60s grace** or **forfeit after it**.

**Code under test:** `npm test`. Entropy is a 64-hex stand-in. This repo does not call `orng.wax` and does not transfer tokens. `join` only credits an in-memory pot.

## What is true (executed)

| Rule | Result |
|------|--------|
| `join` | buy-in exactly 1000; max 6 seats; pot += buy-in |
| `start` | at least 2 seats |
| `spin` | exactly one **alive** seat eliminated; pot unchanged; disconnected seats are not drawn |
| `disconnect` / `reconnect` | alive again if `now < deadline` |
| `forfeitExpired` | at/after deadline the seat is eliminated; pot unchanged |
| `claim` | exactly one alive seat, no unresolved disconnect; whole pot once |

## Scope honesty

| Name | Status |
|------|--------|
| `orng.wax::requestrand` / `randnotify` | not built and not called |
| Token `transfer` into the lobby | not modeled |
| Host rake or mid-game refund | not present |

Different from [px-orng-roulette-wheel-escrow](https://github.com/pixel-journey/px-orng-roulette-wheel-escrow) (European wheel bet, not an elimination lobby). Different from [px-rng-no-loss-prize-pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) (principal must not decrease).

```bash
npm test
```

MIT — Pixel Journey
