# Text Integrity Validator

**Status:** Reference implementation / case-study tooling.

Checks whether a localized string preserves placeholders, `$KEY` tokens, markup tags, line-break count, and non-whitespace control codes.

## Input

JSON containing `entries`, each with `id`, `source`, and `target` strings.

## Output

JSON summary with per-entry defects. Exit code is non-zero when a defect is found.

## Limitations

Token rules are examples and must be configured for a real localization format. The tool does not read game archives and includes no game text.
