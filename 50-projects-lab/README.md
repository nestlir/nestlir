# 50 Projects Lab

An interactive engineering archive that combines **30 browser-based frontend exercises** and **13 native C/C++ systems projects**.

The catalog is intentionally based on the directories that actually exist in this repository.

## Live site

- [Open 50 Projects Lab](https://50-projects-lab.vercel.app/)
- [Open this folder on GitHub](https://github.com/nestlir/nestlir/tree/main/50-projects-lab)

## What's inside

### Frontend Lab — 30 projects

The frontend catalog contains projects `01` through `30`.

```text
projects/
├── 01-expanding-cards/
├── 02-progress-steps/
├── ...
└── 30-auto-text-effect/
```

Projects **01–20** currently use a shared legacy project-shell template and require the missing `site.js` catalog layer to become fully functional as standalone demos.

Projects **21–30** are working showcase wrappers around the original educational demos and load the demos in an iframe. Their source links point to the original project directories.

### C/C++ Systems Lab — 13 projects

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

The browser catalog contains interactive architecture explainers for the systems projects. These explainers visualize execution flow and **do not replace the native C/C++ implementations**.

## Architecture

```text
50-projects-lab/
├── index.html
├── app.js
├── javascript-days.js
├── style.css
├── projects/
│   ├── 01-expanding-cards/
│   ├── ...
│   ├── 30-auto-text-effect/
│   └── c-cpp/
├── qa/
├── scripts/
├── README.md
└── vercel.json
```

## Run locally

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/50-projects-lab
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## JavaScript checks

```bash
node --check app.js
node --check javascript-days.js
```

## Native C/C++ projects

Each native project has its own source layout and build requirements. Check the project directory and its README where available. For example:

```bash
cd projects/c-cpp/shell
make
./mini-shell
```

## QA and cleanup status

The repository contains QA tooling under `qa/` and validation helpers under `scripts/`.

Before considering the Frontend Lab fully production-ready, verify:

1. every catalog link resolves;
2. projects 01–20 receive a real local implementation or a restored catalog runtime;
3. iframe-based projects 21–30 still load successfully;
4. browser JavaScript has no syntax errors;
5. native projects build according to their own project instructions.

## Deployment

The lab is configured as a static Vercel project.

```text
Root directory: 50-projects-lab
Build command: none
Output directory: .
```

## Credits

The frontend exercise names originate from the educational **50 Projects in 50 Days** collection by Brad Traversy.

- [Original collection repository](https://github.com/bradtraversy/50projects50days)
- [Original project demos](https://50projects50days.com/)

This repository adds its own catalog UI, systems-project archive and C/C++ architecture explainers.