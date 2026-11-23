# AI handoff — russian-roulette elimination

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Spin entropy on WAX |
| [no-loss](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) | Opposite: principal fixed |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve spin |

## Non-negotiables

1. Pot = seats × **exact** buy-in. Partial seats and wrong amounts refused.
2. Spin and forfeit do **not** change the pot. Principal is **at risk by design**.
3. Exclude disconnected seats from the elimination draw. Reconnect after grace is refused.
4. Claim once; zero the pot in the same logical step. Claim with more than one alive is refused.
5. Start with fewer than two seats refused. Spin with one alive refused.
6. **Not** no-loss (there principal stays fixed).
7. Prefer orng once-resolve on WAX. No broadcast.

## Prompt seeds

- "Three seats buy-in 100 — pot size?"
- "Claim with two alive — refused?"
- "Contrast with no-loss principalBefore === principalAfter."
- "Grace disconnect — excluded from draw?"

## Do not

- Promise no-loss on this product.
- Change pot on spin/forfeit.
- Allow claim while multiple seats alive.
