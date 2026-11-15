# Education — russian-roulette elimination

## Beginner

Everyone pays the same buy-in into a pot. Each spin removes one still-alive player. The last alive claims the whole pot once.

## Intermediate

Disconnected seats are not in the draw. They get a grace window to reconnect; after that, forfeit eliminates them without a spin. The pot does not shrink on eliminate or forfeit in this lab — buy-ins stay until claim.

## Masterclass (not in this repo)

- Real token escrow and payouts.
- `orng.wax` for the spin bytes.
- Whether forfeited buy-ins stay in the pot or are refunded (this lab keeps the pot).

## Outcomes

1. Enforce exact buy-in and max 6 seats.
2. Spin does not change the pot.
3. Claim only when exactly one seat is alive and no open disconnects.
