# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Action/auth patterns |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Spin entropy on WAX |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Permissions context |

## Product facts locked by tests

- Pot = seats × **exact** buy-in. Partial seats and wrong amounts are refused.
- Spin and forfeit do **not** change the pot. Principal is **at risk by design**.
- Exclude disconnected seats from the elimination draw. Reconnect after grace is refused.
- Claim once; zero the pot in the same logical step. Claim with more than one alive is refused.
- Start with fewer than two seats is refused. Spin with one alive is refused.
- This is **not** [no-loss](https://github.com/pixel-journey/px-rng-no-loss-prize-pool). There the principal stays fixed and only yield is awarded.

## Related labs

| Lab | Topic |
| --- | --- |
| [no-loss pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) | Yield-only awards; principal fixed |
| [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) | House-edge escrow |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve spin |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job table before entropy |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum order |
