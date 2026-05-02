# Contributing

Thank you for your interest in contributing to **taekwondo-app**! Please read the following guidelines before submitting any changes.

## Branching Strategy

- Create a feature branch from `main` for every change.
- Use descriptive branch names: `feat/description`, `fix/description`, `chore/description`.
- Keep branches short-lived — merge them as soon as they are ready.
- Prefer **rebase** over merge to keep a linear history. Use `git pull --rebase` and rebase your branch on top of `main` before opening a PR.

## Commits

- All commits merged into `main` **must** follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
  - Examples: `feat: add scoring panel`, `fix: correct timer reset on round end`, `docs: update contributing guide`.
- **Squash** all commits before merging into `main` so that each PR results in a single, meaningful commit.

## Pull Requests

- Every PR **must** use the provided PR template and have all sections filled in (**What**, **Why**, **How it was tested**).
- Keep PRs focused on a single concern. Avoid mixing unrelated changes.
- Ensure that the linter passes before requesting a review (`npm run lint`).
- Request at least one review before merging.

## Code Style

- Run `npm run lint` to check for linting errors.
- Run `npm run format:check` to verify formatting.
- You can auto-fix most issues with `npm run lint:fix` and `npm run format`.

## Releases & Versioning

- This project follows [Semantic Versioning (SemVer)](https://semver.org/).
  - **MAJOR** — breaking changes.
  - **MINOR** — new features, backwards-compatible.
  - **PATCH** — bug fixes, backwards-compatible.
- Every version bump **must** create a GitHub Release.
- Release notes **must** follow the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format, grouping changes under: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Format code
npm run format
```

## Reporting Issues

- Search existing issues before opening a new one.
- Include steps to reproduce, expected behavior, and actual behavior.
- Add screenshots or screen recordings when relevant.
