# Allowlisted Resource Diff

**Status:** Reference implementation / case-study tooling.

Compares two neutral resource manifests and fails when a changed, added, or removed resource is outside an explicit allowlist.

## Input

Two JSON manifests with `resources: [{ "path": "...", "sha256": "..." }]` and an allowlist JSON array.

## Output

A JSON diff containing changed, added, removed, and unexpected paths.

## Limitations

This tool does not parse archives. A project-specific adapter must create the manifests without publishing proprietary resources.
