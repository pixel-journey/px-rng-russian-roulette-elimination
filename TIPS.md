# Tips — elimination lobby

## Do

- Exact buy-in only. Partial seats or wrong amounts are refused.
- Keep pot invariant on spin and on forfeit (disconnected seat after grace).
- Exclude disconnected seats from the elimination draw.
- Claim once; zero the pot in the same logical step.

## Don't

- Start a match with fewer than two seats.
- Eliminate someone still inside the disconnect grace window.
- Pay the pot while two are alive "early."

## Common mistakes

1. Counting a disconnected seat in the spin weights, then forfeiting them for free pot dilution.
2. Letting the last two claim before a final spin.
3. Refunding a forfeit into the pot and also paying the winner the old total (double count).
4. Treating this as [no-loss](https://github.com/pixel-journey/px-rng-no-loss-prize-pool). Here the pot is the buy-ins; principal is at risk by design.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Spectator mode | No buy-in, no claim |
| Rebuy before first spin | New seat rules |
| orng-driven spin | [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) + once-resolve |

Related: [no-loss pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
