# .procontext — Context Directory

> **Project context following HCP Protocol v2.0**

This directory contains structured project context using the **Human-Code-AI Protocol (HCP)**.

HCP is a lightweight framework that integrates two established methodologies:
- **KDD (Knowledge-Driven Development)**: Domain knowledge and stable decisions
- **SDD (Specification-Driven Development)**: Features specs and iterative planning

---

## What is this?

`.procontext/` preserves project context while code evolves:
- **Decisions** (why we did X)
- **Knowledge** (how the domain works)
- **Current state** (what we're doing TODAY)
- **History** (project evolution)

---

## For New Developers (5 min read)

### Step 1: Read `context.md`
- Project architecture overview
- Tech stack (React 19, Vite, Tailwind)
- Entry points (`src/main.tsx`, `src/App.tsx`)

### Step 2: Read `session.md`
- What we're doing NOW
- Active TODOs
- Known blockers

### Step 3: Start coding
- Check `.cursorrules` for code conventions
- Consult `planning/features/` for implementation specs
- Ready to contribute

---

## For AI Agents (Cursor, Claude, Copilot)

AI agents automatically read these files before generating code:

1. **context.md** → System overview
2. **session.md** → Current development state
3. **AGENTS.md** → Agent role and capabilities
4. **knowledge/** → Domain glossary, APIs, architecture
5. **planning/** → Specs and pending features

**Result**: Consistent code, reduced hallucinations, instant onboarding.

---

## Estructura del Directorio

```
.procontext/
├── context.md              # ✅ SSOT (Single Source of Truth)
├── session.md              # ✅ Estado actual (actualizar cada sesión)
├── AGENTS.md               # ✅ Roles de IA (7 agentes definidos)
├── spec.yml                # ✅ Config HCP
│
├── knowledge/              # KDD (Knowledge-Driven Development)
│   ├── dependencies/       # Análisis de dependencias
│   ├── architecture/       # Decisiones arquitectónicas permanentes
│   ├── apis/               # Documentación APIs externas
│   └── (agregar según necesidad)
│
├── planning/               # SDD (Specification-Driven Development)
│   ├── adrs/               # Architecture Decision Records (formales)
│   ├── features/           # Especificaciones de features
│   ├── specs/              # Especificaciones técnicas
│   └── tasks/              # Tareas y backlog
│
├── decisions/              # Decisiones rápidas (no-ADR)
├── skills/                 # Skills específicas del proyecto
├── workflows/              # Checklists EOD/EOW (configurar)
└── sessions/               # Logs de sesiones
    ├── daily/              # Logs diarios (poblar con uso)
    ├── weekly/             # Resúmenes semanales
    └── monthly/            # Resúmenes mensuales
```

---

## HCP Integrates KDD and SDD

HCP provides structure for two complementary development approaches:

### KDD: Knowledge-Driven Development (`knowledge/`)
**Stable** data that rarely changes:
- Domain terminology glossary (e.g., Taekwondo: tules, exams, belts)
- Permanent architecture (component tree, data flow)
- External API documentation

**Update frequency**: Rarely (when learning new domain concepts)

### SDD: Specification-Driven Development (`planning/`)
**Iterative** data that evolves:
- Feature specifications (before implementation)
- Backlog tasks
- ADRs (Architecture Decision Records)

**Update frequency**: Frequently (each feature, each sprint)

**How they work together**: KDD provides stable domain knowledge that informs SDD specifications. SDD planning references KDD documentation to ensure domain accuracy.

---

## Daily Usage

### Session Start (5 min)
```bash
# 1. Read current state
cat .procontext/session.md

# 2. Open IDE (e.g., Cursor)
cursor .

# 3. IDE automatically reads .procontext/
# Context loaded before first prompt
```

### During Development
- **Made important decision?** → Document in `decisions/` or `planning/adrs/`
- **Learned domain concept?** → Add to `knowledge/`
- **Found bug pattern?** → Note in `session.md` for EOD consolidation

### Session End (5 min)
```bash
# 1. Update session.md
# - Mark completed TODOs [x]
# - Add new TODOs
# - Document blockers

# 2. (Optional) Generate daily log
cp .procontext/session.md .procontext/sessions/daily/2026-04-23.md

# 3. Commit .procontext/ changes
git add .procontext/
git commit -m "docs(hcp): update session state"
```

---

## Gradual Adoption

**If you just want to code**:
1. Read `context.md` (5 min)
2. Read `session.md` (2 min)
3. Start coding

**HCP grows with you**:
- Week 1: Only use `context.md` + `session.md`
- Week 2: Start using `planning/features/`
- Month 1: Document decisions naturally
- Month 3: HCP is part of daily workflow

**No pressure**. HCP is a tool, not bureaucracy.

---

## About HCP Protocol

HCP (Human-Code-AI Protocol) is an open framework for preserving project context in Git repositories. It integrates KDD and SDD methodologies to help teams maintain consistent knowledge across human and AI collaborators.

**Resources**:
- Protocol documentation: Search "Human Code AI Protocol" or "HCP protocol"
- This is an automated setup using HCP Init skill

---

**Initialized**: 2026-04-23  
**HCP Version**: 2.0.0  
**Setup**: Automated (HCP Init skill)
