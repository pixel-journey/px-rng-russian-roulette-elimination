# Security — elimination lobby

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Wrong buy-in / duplicate seat / over capacity | refused |
| Start with 1 player | refused |
| Spin with 1 alive | refused |
| Claim with >1 alive or open disconnect | refused |
| Second claim | refused |
| Reconnect after grace | refused |

Pot stays invariant across spin and forfeit. **Principal is at risk by design** — this is not the no-loss pool.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | `require_auth` on join / claim / reconnect |
| Token custody | Buy-in transfer in; pot transfer out on claim |
| Oracle entropy | Once-resolve spin |
| Grief disconnect | Bond or cooldown so free disconnect cannot stall forever |

## Attack angles

1. Counting a disconnected seat in the spin weights, then forfeiting them for free pot dilution.
2. Paying the pot while two are still alive.
3. Refunding a forfeit into the pot and also paying the winner the old total.
4. Marketing "no loss" for a buy-in elimination game.

## Honesty limits

No wasm or live transfers. Related: [no-loss pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).
