# Education — elimination lobby (last-alive pot)

> **Rung:** `npm test` passes. Entropy is a teaching argument. Pot is a bigint book — not a token transfer.  
> **The test is the rule.**

Fixed **buy-in** seats join a lobby. A **spin** eliminates exactly one **alive** seat. Disconnect has a **grace** window; expire → forfeit (eliminated, pot unchanged). When exactly one seat remains alive (and no open disconnect), that player **claims** the pot once.

This is **not** ORNG credit math and not a house-edge dice book. It is multi-party elimination accounting.

Official: [docs.wax.io](https://docs.wax.io/) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

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

```bash
npm test
```

---

## Intermediate — spin

Three alive: eliminates **exactly one**; pot **unchanged**. Disconnected seats are **not** in the draw set (offline user must not be eliminated mid-grace by entropy).

Cannot spin with only one alive (game should be in claim phase).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Partial buy-in | refused |
| Spin changes pot | pot invariant |
| Draw from disconnected | excluded from set |
| Claim with 2 alive | refused |
| Second claim | refused |

---

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
6. Confusing this with no-loss (there principal is never at risk).

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Variable buy-in tiers / side pots | New accounting |
| Spectator rebuy after forfeit | Product policy |
| Live orng delivery for spin | Dual-callback |
| Token custody on join + payout on claim | Chain integration |
| Anti-grief bond to disconnect | Economics |

### Exercises

1. Three buy-ins, one forfeit — pot? (**3000**.)  
2. Why skip disconnected on spin? (Grace fairness.)  
3. Can claim run twice? (No.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Live token transfers for buy-in or claim
- That spin entropy is oracle-authenticated here (argument only)
- No-loss principal protection (opposite product)
