# Worked examples — elimination lobby

`BUY_IN = 1000`. `MAX_SEATS` from tests is **6**. Exact buy-in only.

## Join / start

Two seats → pot **2000**. Wrong amount 999, duplicate seat, 7th seat, start with 1 player — refused.

## Spin

Three alive: eliminates **exactly one**; pot unchanged. Disconnected seats are not drawn. Cannot spin with only one alive.

## Disconnect

`disconnect` at t=1000; `reconnect` before `1000 + GRACE_SEC` → alive again. At the grace deadline reconnect throws; `forfeitExpired` marks eliminated; pot stays **3000** for three buy-ins.

## Claim

After one of two is eliminated, claim pays **2000** once; pot 0; second claim refused. Claim with two alive or unresolved disconnect refused.
