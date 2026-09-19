# Engineering Trade-offs

The release favored stable rendering over nominal 100% localization coverage.

## Ability Wheel

Initial and locked states produced geometry corruption with Chinese labels. Runtime tracing separated no-selection, locked, and unlocked behavior. The final screen-local logic uses an empty initial value, ASCII `LOCKED`, and the verified English names for unlocked abilities. Five targeted runtime states passed.

## Objectives and Tutorial

Small headings used a legacy title path that was unstable with Chinese. Those headings use local English fallbacks while body text remains Chinese. The fallback is isolated to the affected screen and does not change the global text table.

## Opportunity/Event title

The local English fallback passed static validation. Its original triggering event had already been completed in the available final save, so that exact runtime scene could not be repeated. The limitation remains explicit.

## Rejected systemic font change

A broader CJK TitleFont injection was rejected because the available serialization path could not safely preserve legacy glyph records. Avoiding a high-blast-radius font rewrite was considered safer than claiming complete cosmetic coverage.
