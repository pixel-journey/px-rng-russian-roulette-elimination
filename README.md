# Elimination lobby with disconnect recovery

> **Domain:** multiplayer elimination lobby  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Fixed buy-in, eliminate one **alive** seat per spin, reconnect before **60s** grace or forfeit after. Claim when exactly one alive remains and no open disconnects.

**Code under test:** `npm test`. Entropy stand-in only; no token transfers.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Spin, grace, claim |
| [TIPS.md](TIPS.md) | Alive vs disconnected |
| [SECURITY.md](SECURITY.md) | Claim gates |
| [SOURCES.md](SOURCES.md) | Official |

## What is true (executed)

| Rule | Result |
|------|--------|
| join | buy-in 1000; max 6 |
| spin | one alive eliminated; pot unchanged |
| reconnect / forfeit | grace 60s |
| claim | one alive; pot once |

```bash
npm test
```

MIT — Pixel Journey
