# Worked examples — elimination lobby

## Example A — fill and start

Two+ joins at buy-in 1000; `start` requires ≥2 alive.

## Example B — spin

Exactly one alive eliminated; pot unchanged; disconnected not eligible.

## Example C — disconnect recovery

`disconnect` sets deadline now+60; `reconnect` before deadline → alive; after → grace expired.

## Example D — forfeitExpired

At/after deadline, disconnected → eliminated; pot unchanged.

## Example E — claim

Exactly one alive, no disconnected seats → winner takes entire pot once.

## Example F — claim blocked

Any disconnected seat → `resolve disconnects before claim`.
