# Education — elimination lobby (last-alive pot)

> **Rung:** `npm test` passes. Entropy is a teaching argument. Pot is a bigint book — not a token transfer.  
> **The test is the rule.**

Fixed **buy-in** seats join a lobby. A **spin** eliminates exactly one **alive** seat. Disconnect has a **grace** window; expire → forfeit (eliminated, pot unchanged). When exactly one seat remains alive (and no open disconnect), that player **claims** the pot once.

This is **not** ORNG credit math and not a house-edge dice book. It is multi-party elimination accounting.

Sibling randomness: [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent). Sibling pot honesty: [no-loss prize pool](https://github.com/pixel-journey/px-rng-no-loss-prize-pool) (different invariant: principal vs yield).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Exact buy-in; pot = seats × BUY_IN |
| Intermediate | Spin skips disconnected; pot invariant |
| Masterclass | Grace/forfeit; claim once; composition of three buy-ins |

---

## Beginner

`BUY_IN = 1000`. `MAX_SEATS = 6` in tests. Join only with **exact** buy-in.

Two seats → pot **2000**. Wrong amount 999, duplicate seat, 7th seat, start with 1 player — refused.

## Intermediate — spin

Three alive: eliminates **exactly one**; pot **unchanged**. Disconnected seats are **not** in the draw set (offline user must not be eliminated mid-grace by entropy).

Cannot spin with only one alive (game should be in claim phase).

## Masterclass — disconnect and claim

| Event | Effect |
| --- | --- |
| disconnect at t=1000 | seat marked disconnected |
| reconnect before 1000 + GRACE_SEC | alive again |
| reconnect at/after grace | throws |
| forfeitExpired | eliminated; pot stays (e.g. 3000 for three buy-ins) |
| claim with 1 alive | pays pot once; pot 0; second claim refused |
| claim with 2 alive or open disconnect | refused |

### Common mistakes

1. Allowing partial buy-ins (breaks pot = n × BUY_IN).  
2. Drawing from disconnected seats during grace.  
3. Paying claim while a disconnect is still open.  
4. Letting spin change the pot (elimination must not mint or burn pot).  
5. Second claim after pot zeroed.

### Nice-to-have extensions (not in this repo)

- Variable buy-in tiers / side pots.  
- Spectator rebuy after forfeit.  
- Live orng delivery for spin entropy.  
- Token custody on join + payout on claim.  
- Anti-grief: bond to disconnect.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Three buy-ins, one forfeit — pot? (3000)  
2. Why skip disconnected on spin?  
3. Can claim run twice? (No.)
