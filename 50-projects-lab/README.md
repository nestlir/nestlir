# 50 Projects Lab

A self-contained interactive engineering archive with **30 local browser projects** and **13 native C/C++ systems projects**.

## Live site

- [Open 50 Projects Lab](https://50-projects-lab.vercel.app/)
- [Browse source](https://github.com/nestlir/nestlir/tree/main/50-projects-lab)

## Frontend Lab — 30 local demos

Projects `01`–`30` use a shared local runtime: `project-runtime.js`.

Every project keeps its own public URL and `index.html`, while the runtime provides the interactive implementation.

**No remote demo iframes. No dependency on the old missing `site.js`.**

```text
projects/
├── 01-expanding-cards/
├── 02-progress-steps/
├── …
└── 30-auto-text-effect/
```

The collection includes local interactions such as card expansion, progress controls, search, loading states, keyboard events, FAQ collapse, random selection, counters, canvas drawing, drag and drop, sliders, clocks, toast notifications, GitHub API lookup and animated text.

## C/C++ Systems Lab — 13 projects

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

The browser catalog provides architecture explainers. Native C/C++ source remains the authoritative implementation.

## Architecture

```text
50-projects-lab/
├── index.html
├── app.js
├── project-runtime.js
├── javascript-days.js
├── style.css
├── projects/
├── qa/
├── scripts/
└── vercel.json
```

## Run locally

```bash
git clone https://github.com/nestlir/nestlir.git
cd nestlir/50-projects-lab
python -m http.server 8080
```

Open `http://localhost:8080`.

## QA

```bash
node --check app.js
node --check project-runtime.js
node qa/audit-deep.mjs
```

The frontend audit verifies that all 30 project pages use the local runtime and that no external iframe dependency remains.

## Native projects

Each native project has its own build requirements. Typical example:

```bash
cd projects/c-cpp/shell
make
./mini-shell
```

## Deployment

Static Vercel deployment:

```text
Root directory: 50-projects-lab
Build command: none
Output directory: .
```

## Credits

The project names are inspired by the educational **50 Projects in 50 Days** collection by Brad Traversy. This repository contains its own local runtime, catalog and systems-project integration.

- [Original collection](https://github.com/bradtraversy/50projects50days)
