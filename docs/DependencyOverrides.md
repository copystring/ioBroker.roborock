# Dependency Overrides

This project uses npm `overrides` only as a temporary maintenance tool for dependency security fixes when the direct upstream packages have not yet published matching dependency ranges.

## Current overrides

Added on 2026-05-18 in PR #1270.

```json
"overrides": {
  "@alcalzone/esbuild-register": {
    "esbuild": "^0.25.12"
  },
  "mocha": {
    "diff": "^8.0.4",
    "serialize-javascript": "^7.0.5"
  }
}
```

## Why they exist

The remaining `npm audit` advisories after the Dependabot updates were only in development and test tooling:

- `@iobroker/testing@5.2.2` depends on `@alcalzone/esbuild-register@2.5.1-1`.
- `@alcalzone/esbuild-register@2.5.1-1` still declares `esbuild: ^0.11.5`.
- `mocha@11.7.5` still declares `diff: ^7.0.0` and `serialize-javascript: ^6.0.2`.
- `npm audit fix --force` wanted to change `@iobroker/testing` to an older version, so targeted overrides were less invasive.

These overrides do not affect adapter runtime dependencies. Confirm that with:

```sh
npm audit --omit=dev --audit-level=moderate
npm ls @alcalzone/esbuild-register mocha diff serialize-javascript --omit=dev
```

## When to remove them

Review these overrides whenever Dependabot opens updates for any of these packages:

- `@iobroker/testing`
- `@alcalzone/esbuild-register`
- `mocha`

Before removing them, check the latest upstream dependency ranges:

```sh
npm view @alcalzone/esbuild-register@latest dependencies --json
npm view mocha@latest dependencies --json
```

If upstream now depends on safe versions, remove the matching override, run `npm install`, and verify:

```sh
npm audit --audit-level=moderate
npm audit --omit=dev --audit-level=moderate
npm run typecheck
npm run test:unit
npm run test:package
```

Also run `npm run test:integration` when no local ioBroker JS-Controller is already running.

