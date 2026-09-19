# Publication Pre-Flight

Generated: 2026-09-19. Scope: local staging tree only. No Git repository was initialized and nothing was uploaded.

## Repository identity and license

- Final repository name: `prototype-2009-localization-engineering`
- Public author: Grant Yang
- License path: `tools/LICENSE`
- License scope: original source code authored by Grant Yang under `tools/` only
- Excluded from the MIT License: README, docs, screenshots, game-related visual material, and third-party content

## Inventory

| Check | Result |
|---|---:|
| Total staged files | 25 |
| Screenshots | 6 |
| Public docs under `docs/` | 3 |
| Tool groups | 5 |
| Tool files (README + source) | 10 |
| Sanitized/derived text and code files | 19 |
| Explicit proprietary-risk candidate files excluded | 4 |
| Proprietary binary/assets staged | 0 |

The 17 sanitized/derived files are the path-adjusted public README, Notice, `.gitignore`, this pre-flight report, three public docs, five tool READMEs, and five neutral reference implementations. The six screenshots were copied byte-for-byte and are not counted as sanitized.

## Privacy and secret scan

| Pattern | Findings |
|---|---:|
| Private numeric username pattern | 0 |
| Drive-letter absolute paths | 0 |
| Steam installation path markers | 0 |
| Windows/Linux home-directory references | 0 |
| Email patterns | 0 |
| API key/token credential patterns | 0 |
| Password/authorization assignments | 0 |

The ordinary programming word `tokens` appears only in text-validation code and documentation; it is not an access token or credential finding.

## Proprietary-content scan

- Forbidden staged extensions (`.rcf`, `.gfx`, `.p3d`, `.rz`, game fonts, audio, DLL/EXE/JAR, saves): **0**.
- Final, rebuilt, backup, diagnostic, extracted-resource, full TextBible, subtitle/dialogue corpus, and complete translation-package files: **0**.
- Bundled third-party tool/dependency trees: **0**.
- Six screenshots match their approved private source files byte-for-byte: **6/6**.

## Code and link checks

- JavaScript syntax (`node --check`): **5/5 PASS**.
- README image references: **6**.
- Broken README image references: **0**.
- Git metadata directory present: **NO**.
- License files present: **1**, at `tools/LICENSE` only.
- Root-level license present: **NO**.

## Included content

### Tool groups

1. `tools/text-integrity/`
2. `tools/visible-text-audit/`
3. `tools/binding-aware-glyph-audit/`
4. `tools/resource-diff/`
5. `tools/release-verification/`

Each is labeled as reference/case-study tooling and uses a neutral JSON or filesystem input contract. None reads or rebuilds a game archive.

### Public docs

1. `docs/architecture.md`
2. `docs/qa-methodology.md`
3. `docs/engineering-tradeoffs.md`

## Remaining manual review

1. Perform the final spoiler/content check for `05_dialogue_subtitle_final.jpg`.
2. Confirm screenshot use and attribution against the intended hosting platform's rules.
3. Review the five reference implementations for the desired support promise; they are intentionally minimal and not production packages.

## Status

The staging tree passes the local privacy, forbidden-extension, syntax, README-link, and license-scope checks. It is ready for final human publication review, not for automatic publication.
