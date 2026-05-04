# Taekwondo App

This README is the **local development guide** for contributors.

## How it fits together

```
┌──────────────────────┐
│ taekwondo-app (this) │
│ :5173                │
└──────────┬───────────┘
           │ VITE_BASE_URL = http://localhost:8080
           ▼
   ┌──────────────────┐
   │ taekwondo-api    │
   │ :8080            │
   └──────────┬───────┘
              ▼
       ┌──────────────┐
       │ MongoDB :27017│
       └──────────────┘
```

`lib/auth-client.ts` reads its base URL from either `window.__APP_CONFIG__.baseURL` (Docker runtime) or `import.meta.env.VITE_BASE_URL` (local dev). For local dev you just need to set `VITE_BASE_URL`.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v20 LTS, see `.node-version`)
- **pnpm** (v10+, `corepack enable`)
- A running **taekwondo-api** on `:8080` (see `taekwondo-api/README.md`)

---

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Tekwondo-RAM/taekwondo-app.git
cd taekwondo-app
```

Install the dependencies:

```bash
pnpm install
```

Create your `.env` (see [Environment variables](#environment-variables)).

---

### Running the Application

Start the development server:

```bash
pnpm dev
```

You should see output similar to:

```text
VITE v8.x  ready in 438 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.44:5173/
➜  press h + enter to show help
```

Open your browser and navigate to:

```
http://localhost:5173/
```

## Environment variables

`.env` is gitignored. Create it at the repo root:

```env
VITE_BASE_URL=http://localhost:8080
```

In production, `docker-entrypoint.sh` writes `window.__APP_CONFIG__.baseURL` from `VITE_BASE_URL` so the same image works across environments without rebuilding.

## Wiring to the API

1. Start the API: `cd ../taekwondo-api && docker compose up -d && pnpm dev`.
2. Make sure the API's `ORIGINS` includes `http://localhost:5173` (it does by default).
3. Set `VITE_BASE_URL=http://localhost:8080` in this app's `.env`.
4. Restart `pnpm dev` after any `.env` change.

## Scripts

- `pnpm dev` — Vite dev server on `:5173`
- `pnpm build` — type-check and build to `dist/`
- `pnpm preview` — serve the production build locally
- `pnpm lint` / `pnpm lint:fix` — [oxlint](https://oxc.rs/docs/guide/usage/linter.html) (type-aware)
- `pnpm format` / `pnpm format:check` — [oxfmt](https://oxc.rs/)

CI runs `lint` and `format:check`.

- Routes are file-based — drop a file in `src/routes/` and the router plugin updates `routeTree.gen.ts` automatically.
- Path alias `@` → `src/`.
- Tailwind v4 is wired via `@tailwindcss/vite`; config lives in CSS.

## Testing

Playwright (mobile Chrome + Safari emulation):

```bash
pnpm dlx playwright install     # one-time
pnpm dlx playwright test
pnpm dlx playwright test --ui   # debug
```

The setup project (`tests/auth.setup.ts`) signs in once and stores `storageState.json`. The API must be running.


## Contributing

We welcome contributions to improve the project 🎉

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature-name"
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Create a Pull Request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for branch naming, commit conventions, and the PR template.

---

## Recommended VS Code Extensions

For a better development experience, consider installing:

- ES7+ React/Redux/React-Native snippets
- Simple React Snippets
- ESLint
- Error Lens
- Bracket Pair Color DLW
- Auto Rename Tag
- Auto Close Tag
- GitLens
- Auto Import
- Auto Complete Tag

---

**Thanks to all the contributors who have made this project possible!**

[![Contributors](https://contrib.rocks/image?repo=Tekwondo-RAM/taekwondo-app)](https://github.com/Tekwondo-RAM/taekwondo-app/graphs/contributors)

---

Made by [Comuafor](https://discord.com/invite/comuafor) 🐀
