# Education — elimination lobby

> **Rung:** `npm test` passes. Fixed buy-in **1000**, max **6** seats, **60s** disconnect grace.  
> Not European roulette ([wheel escrow](https://github.com/pixel-journey/px-orng-roulette-wheel-escrow)). Not no-loss principal ([prize pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool)).

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Join → start → spin eliminates one **alive** seat |
| Intermediate | Disconnect / reconnect within grace; forfeit after |
| Masterclass | Claim only with exactly one alive and no open disconnects |

## Beginner

Equal buy-ins form the pot. Each spin removes exactly one alive seat from the draw. Pot is unchanged until claim.

## Intermediate

Disconnected seats are **not** drawn. They must reconnect before deadline or be forfeited (eliminated without pot change).

## Masterclass

Entropy is a 64-hex stand-in. Production should use dual-callback once-only resolve. Host rake and mid-game refunds are out of scope here.

## Will not teach

Token custody, orng delivery, or European wheel odds.
