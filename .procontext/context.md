# Taekwondo App — Project Context

**Project Type**: React PWA (Progressive Web App)  
**Main Stack**: React 19 + TypeScript + Vite 8 + Tailwind CSS 4  
**Purpose**: Web application for Taekwondo training and belt progression tracking  
**Last Updated**: 2026-04-23

---

## About This Document

This file follows **HCP Protocol v1.0** (Human-Code-AI Protocol), which integrates:

- **KDD (Knowledge-Driven Development)**: Stable domain knowledge, architecture, and APIs
- **SDD (Specification-Driven Development)**: Feature specs, ADRs, and iterative planning

**This `context.md`** is the project's SSOT (Single Source of Truth). For detailed information, consult subdirectories in `.procontext/`.

---

## 📊 Project Overview

### Technologies Detected

**Core Stack**:
- **React**: 19.2.0 (UI library)
- **TypeScript**: Proyecto 100% tipado
- **Vite**: 8.0.0 (Build tool ultra-rápido)
- **Tailwind CSS**: 4.1.18 (Utility-first CSS)

**UI Components**:
- **@base-ui/react**: 1.3.0 (Base UI component library)
- **lucide-react**: 0.562.0 (Icon system)
- **react-day-picker**: 9.14.0 (Date picker)

**Routing & State**:
- **@tanstack/react-router**: 1.168.23 (Type-safe routing)
- **zustand**: 5.0.12 (State management)
- **zod**: 4.3.6 (Schema validation)

**PWA**:
- **vite-plugin-pwa**: 1.2.0 (Service worker)
- **workbox-window**: 7.4.0 (PWA runtime)

**Testing**:
- **Playwright**: 1.59.1 (E2E testing)

**Linting/Formatting**:
- **oxlint**: 1.60.0 (Fast linter, Rust-based)
- **oxfmt**: 0.45.0 (Fast formatter)

### Identified Entry Points

1. **src/main.tsx**: Main entry point (React root)
2. **src/App.tsx**: Root application component
3. **index.html**: HTML shell for PWA

### Project Structure

```
src/
├── assets/           # SVG icons (exam-line, korean-block, tules)
├── common/           # Componentes compartidos (Video.tsx es hotspot)
├── components/       # UI components (Header, MenuMobile)
├── consts/           # Constantes de la app
├── context/          # React contexts
├── hooks/            # Custom React hooks
├── pages/            # Páginas principales
│   ├── Account.tsx   # Cuenta de usuario (hotspot)
│   ├── Exams.tsx     # Página de exámenes (hotspot)
│   ├── Tules.tsx     # Página de tules/formas (hotspot)
│   └── MainLayout.tsx
├── routes/           # Definiciones de routing
│   └── _auth/        # Rutas autenticadas
├── styles/           # CSS global (index.css es hotspot)
└── utils/            # Utilidades compartidas

public/               # Assets estáticos
tests/                # Playwright E2E tests
```

### Hotspots (Archivos más modificados - 3 meses)

1. **package.json** (15 modificaciones) — Gestión de dependencias activa
2. **src/App.tsx** (10 modificaciones) — Evolución del layout principal
3. **src/common/Video.tsx** (8 modificaciones) — Componente video crítico
4. **src/styles/index.css** (7 modificaciones) — Ajustes de estilos frecuentes
5. **src/pages/Account.tsx** (6 mods) — Feature de cuenta en desarrollo
6. **src/components/MenuMobile.tsx** (6 mods) — UX móvil iterativa

**Pattern**: Active development focused on UI/UX and account management features.

### External Integrations

- **UI Framework**: @base-ui/react (Base UI components)
- **Routing**: @tanstack/react-router (type-safe client-side routing)
- **State**: Zustand (lightweight state management)
- **Media**: media-chrome/react (video player controls)
- **Icons**: lucide-react
- **Dates**: react-day-picker

**Not detected**: Backend API, database, auth provider (frontend-only or pending definition)

### Recent Development Activity

- **0e9a71e**: Auto-scroll to current exam (UX improvement)
- **615bee9**: Simplify exam list rendering
- **1c4040a**: Add Playwright E2E testing (calidad)
- **7e1305e/0b05287**: View transitions (UX polish)
- **bf429ba**: Mobile viewport improvements

**Pattern**: Focus on UX/UI polish and quality (testing), with active feature development.

---

## 🎯 Project Purpose

PWA application for Taekwondo students and instructors that enables:
- **Exam management**: Track and review belt progression exams
- **Tules learning**: Practice and study Taekwondo forms/patterns  
- **Account management**: User profiles and progress tracking
- **Educational videos**: Embedded video player for technique demonstrations

---

## 🏗️ Architecture

### Architectural Pattern

Single Page Application (SPA) with:
- **Client-side routing** (@tanstack/react-router)
- **Local state management** (Zustand)
- **Component-based architecture** (React 19 functional components)
- **PWA-enabled** (offline-first capable)

### Key Architectural Decisions

1. **React 19**: Latest features (Actions, improved Suspense, compiler optimizations)
2. **Vite 8**: Fastest build tool, excellent PWA support, instant HMR
3. **Tailwind 4**: Utility-first CSS for rapid UI development
4. **Zustand**: Lightweight state management, suitable for medium-sized app
5. **Base UI**: Unstyled components, full design control with Tailwind
6. **Oxlint/Oxfmt**: Rust-based tooling (10-100x faster than ESLint/Prettier)

See `planning/adrs/ADR-001-stack-selection.md` for detailed rationale.

---

## 🔒 Constraints

**Technical**:
- **Node.js**: v20 LTS (`.node-version`)
- **Package Manager**: pnpm (`pnpm-lock.yaml`)
- **Build Target**: PWA (Service Worker required)
- **Testing**: Playwright E2E (coverage TBD)

---

## 🚧 Current Status

### Project Strengths

✅ **Modern stack**: React 19, Vite 8, Tailwind 4  
✅ **PWA-ready**: Service worker configured  
✅ **Type-safe**: 100% TypeScript + Zod validation  
✅ **Testing**: Playwright E2E framework  
✅ **Fast tooling**: Oxlint/Oxfmt (Rust-based)  
✅ **Active development**: Clean commits, collaborative PRs

### Areas for Development

🟡 **Backend/API**: Strategy undefined (frontend-only currently)  
🟡 **Authentication**: Provider not yet integrated  
🟡 **Test coverage**: Expand Playwright test suite  
🟡 **Documentation**: README needs completion

---

## 📚 Key References

- **Repository**: https://github.com/Tekwondo-RAM/taekwondo-app
- **Stack docs**: React 19, Vite 8, Tailwind 4, Base UI
- **ADRs**: See `planning/adrs/` for architectural decisions

---

## 🎯 Roadmap

### Current Sprint
- Complete README documentation
- Expand test coverage (Exams, Tules flows)
- Document auth strategy in ADR

### Next Sprint
- Define backend/API architecture
- Expand Taekwondo domain knowledge base
- Performance optimization

---

**Last Updated**: 2026-04-23  
**HCP Version**: 1.0.0
