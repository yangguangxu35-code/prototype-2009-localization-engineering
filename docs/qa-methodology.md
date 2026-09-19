# QA Methodology

The release process separated text correctness, binary integrity, and visible runtime behavior.

## Text gates

- Compare placeholders, markup, key tokens, line breaks, and control codes between source and localized text.
- Classify English findings by visibility instead of treating every Latin string as a missed translation.
- Check glyph coverage against the font bound to each field, not the union of every font in the package.

## Binary gates

- Identify every release artifact by SHA-256.
- Parse and read back archive entries after rebuilding.
- Compare resource manifests against an explicit change allowlist.
- Reject unexpected additions, removals, or changed hashes.

## Runtime gates

Static parsing was evidence, not proof of rendering behavior. Runtime failures were reduced with controlled A/B builds, one-variable changes, screenshots, and narrow state instrumentation. Human acceptance criteria determined whether a build passed.

## Release gate

The frozen release was checked in a separate pass that re-parsed the final artifacts rather than trusting build reports. Deployment work used staged files, verified backups, post-copy hashes, and rollback checks. The public tools show the neutral validation patterns only; they do not include the game adapters or release archives.
