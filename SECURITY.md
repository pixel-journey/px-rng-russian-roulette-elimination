# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Uneven buy-in | amount must equal 1000 |
| Seventh seat / duplicate | refused |
| Spin selects a disconnected or eliminated seat | draw set is alive only |
| Instant death on disconnect | 60s reconnect window |
| Reconnect after grace | refused |
| Claim while two players remain | refused |
| Claim while a disconnect is unresolved | refused |
| Double claim | refused; pot set to 0 |

Production still needs token custody, a real entropy source published after the spin was opened, and a rule for who may call `forfeitExpired` (here anyone may, which is the keeper-friendly choice).
