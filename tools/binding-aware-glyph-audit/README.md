# Binding-Aware Glyph Audit

**Status:** Reference implementation / case-study tooling.

Checks characters against the font assigned to each runtime field. It intentionally avoids combining all fonts into one union.

## Input

JSON containing `fonts` as font-name to codepoint arrays, and `fields` with `field`, `font`, and `strings`.

## Output

Missing codepoints grouped by field and bound font. Exit code is non-zero when any glyph is missing.

## Limitations

An upstream adapter must prove the runtime field-to-font binding. This tool does not parse GFX or embed glyphs.
