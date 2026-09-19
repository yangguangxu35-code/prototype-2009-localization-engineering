# Visible-Text Audit

**Status:** Reference implementation / case-study tooling.

Classifies pre-extracted text records as confirmed visible misses, approved fallbacks, internal/non-visible content, or non-English content.

## Input

JSON with `entries`. Each entry may contain `id`, `text`, `visible`, `approvedFallback`, and `internal`.

## Output

A JSON classification report. The tool deliberately requires visibility evidence from an upstream adapter.

## Limitations

It uses a simple Latin-letter heuristic and does not determine visibility from a game archive. Production rules must be reviewed for each project.
