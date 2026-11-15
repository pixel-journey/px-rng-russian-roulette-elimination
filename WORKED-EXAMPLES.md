# Worked examples — elimination lobby

`BUY_IN` is exactly `1000`. `MAX_SEATS` is 6. `GRACE_SEC` is the disconnect window. Entropy `11` × 32.

## Join

Two seats at 1000 each → pot `2000`, two alive.

| Case | Error |
| --- | --- |
| join with 999 | exactly 1000 |
| same name twice | already seated |
| 7th seat | full |
| start with one player | at least 2 |

## Spin

Three alive: spin eliminates **exactly one**, pot unchanged, two alive remain.

Carol disconnects before spin: she is not drawn; status stays `disconnected`.

After one of two is eliminated, a second spin throws `at least 2 alive`.

## Disconnect

Disconnect bob at t=1000. Reconnect at `1000 + GRACE_SEC - 1` → alive again.
Reconnect at `1000 + GRACE_SEC` → `grace expired`.
`forfeitExpired` at that time → bob `eliminated`, pot still `3000` (buy-ins stay).

## Claim

Two-player lobby, one spin, claim → paid `2000` to the last alive, pot `0`. Second claim → `already claimed`.

Claim with two alive → `exactly one alive`. Claim while a disconnect is unresolved → `resolve disconnects`.
