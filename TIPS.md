# Tips — multiplayer lobbies

- Separate **alive** vs **disconnected** vs **eliminated** explicitly.
- Never draw disconnected seats.
- Wire real RNG via [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) before production.
