# Education

The failure mode this quest exists to show is a disconnect that **auto-kills** a seat with no recovery window, or a spin that can select that seat while they are gone.

```text
alive --disconnect--> disconnected (deadline = now + 60)
disconnected --reconnect before deadline--> alive
disconnected --forfeitExpired at/after deadline--> eliminated
spin draws only among status == alive
claim requires exactly one alive and zero disconnected
```

Buy-in is already in the pot at join. Elimination does not move the pot again. That keeps "who is out" separate from "where the stake sits."

## What a future agent should not invent

- Do not name this `orng.wax`. A production lobby would open a quest-001 job per spin; this file does not, on purpose.
- Do not treat this as the wheel escrow in `px-orng-roulette-wheel-escrow` (0..36, house edge).
- Do not pay a disconnected seat with `claim`. Unresolved disconnects must reconnect or forfeit first.
- Do not refund a forfeited seat from the pot. Their buy-in stayed in.
