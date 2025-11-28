# TypeScript & Development Setup

## 🚀 Unified Development Server

We have a unified development server that runs everything in **one single window**.

### Start Development

```bash
npm run dev
```

This starts **3 concurrent processes** in one window:

1.  **[BUILDS]** (Cyan) - `tsc -b --watch`
    *   Builds Backend (`src` → `build`)
    *   Builds Frontend (`src/www` → `www`)
2.  **[TESTS]** (Magenta) - `mocha --watch`
    *   Runs Backend tests
3.  **[VITEST]** (Blue) - `vitest watch`
    *   Runs Frontend tests

## 📁 Configuration Structure

We have minimized the configuration to **3 files**:

- **`tsconfig.json`** - **Solution & Base Config**
    *   Contains shared compiler options (Base).
    *   References the other two projects (Solution).
    *   This is the entry point for `tsc -b`.
- **`tsconfig.build.json`** - **Backend Config**
    *   Extends `tsconfig.json`.
    *   Builds to `./build` (CommonJS).
- **`tsconfig.build.web.json`** - **Frontend Config**
    *   Extends `tsconfig.json`.
    *   Builds to `./www` (ES2022).

**Why 3 files?**
We cannot reduce this further because the Backend (Node.js) and Frontend (Browser) require fundamentally different output settings (`CommonJS` vs `ES2022`) and different output folders. TypeScript requires separate configuration files for these distinct targets.
