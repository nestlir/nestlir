# Projects Lab

A unified portfolio package containing a **Frontend Lab** and a **C/C++ Systems Lab**.

> The catalog deliberately reflects the folders that physically exist in this package. It does not invent routes for missing projects.

## Live site

urlProduction deploymenthttps://50-projects-lab.vercel.app

## What's inside

### Frontend Lab

The package currently contains **30 frontend projects**:

- 01–20: core interactive UI projects
- 21–30: additional browser projects

Each project lives in its own directory under:

```text
projects/
└── 01-expanding-cards/
    ├── index.html
    ├── style.css
    └── script.js
```

### C/C++ Systems Lab

The Systems Lab contains the native project tree under:

```text
projects/c-cpp/
├── shell/
├── hash-table/
├── http-server/
├── memory-allocator/
├── redis-clone/
├── tcp-chat-server/
├── text-editor/
├── tiny-compiler/
├── tiny-database/
├── tiny-raytracer/
├── virtual-machine/
├── chip8-emulator/
└── mini-kernel/
```

The browser site provides **interactive architecture explainers** for these projects. Those visualizations explain execution flow and are **not substitutes for the native C/C++ implementations**.

## Architecture

```text
50-projects-lab/
├── index.html
├── app.js
├── javascript-days.js
├── projects/
│   ├── 01-expanding-cards/
│   ├── ...
│   ├── 30-auto-text-effect/
│   └── c-cpp/
├── qa/
│   └── audit-deep.mjs
├── scripts/
│   ├── helpers/
│   └── validators/
├── README.md
└── vercel.json
```

## Run locally

No framework is required.

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/50-projects-lab
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

You can also use any static server.

## QA

Run the deep frontend audit:

```bash
node qa/audit-deep.mjs
```

The report is written to:

```text
qa-report.json
```

The audit checks:

- missing files
- duplicate implementations
- external iframe demos
- detected interaction handlers
- network/API usage
- generic fake-demo markers

A failing audit is intentionally not hidden. The report is the source of truth for cleanup work.

## JavaScript syntax checks

```bash
node --check app.js
node --check javascript-days.js
```

## Native projects

Build commands depend on each project's own source layout. The CI workflow attempts project-level builds for the supported native projects and keeps the legacy source tree until migration/build verification is complete.

## Deployment

The package is configured as a static Vercel project.

```text
Root directory: 50-projects-lab
Build command: none
Output directory: .
```

Before promoting a deployment, verify:

1. the deployment returns HTTP 200;
2. the catalog reflects the real project tree;
3. browser JavaScript has no syntax errors;
4. project links resolve;
5. the Systems Lab visualizers respond to user interaction.

## Credits

The frontend exercise names are historically associated with the educational **50 Projects in 50 Days** collection by Brad Traversy.

urlOriginal collection repositoryhttps://github.com/bradtraversy/50projects50days

This repository uses its own package structure, catalog layer, QA tooling and Systems Lab integration.