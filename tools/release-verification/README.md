# Release Manifest Verification

**Status:** Reference implementation / case-study tooling.

Verifies a directory against a SHA-256 manifest before release or deployment. The private project paired this gate with staged copies, non-overwriting backups, process checks, post-copy verification, and rollback.

## Input

`verify.mjs <root-directory> <manifest.json>`. The manifest contains `files` with relative `path` and expected `sha256`.

## Output

A JSON result for every allowlisted file. Missing, mismatched, or extra files produce a non-zero exit code.

## Limitations

This public reference performs verification only; it intentionally does not deploy or restore files. Paths and hashes are supplied by the caller, and no game-specific names are embedded.
