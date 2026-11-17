# Security — elimination lobby

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Wrong buy-in / duplicate / over capacity | refused |
| Start with 1 player | refused |
| Spin with 1 alive | refused |
| Claim with >1 alive or open disconnect | refused |
| Second claim | refused |
| Reconnect after grace | refused |

## Not closed

Auth on join/claim, token custody, oracle entropy integrity, grief disconnect without bond.

No wasm or live transfers in this repository.
