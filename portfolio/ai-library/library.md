# AI Specialist Library

> A curated map of agent skills, specialist agents, plugins, MCP servers and engineering workflows. This library documents external projects and adaptation paths; it does not claim that every component is installed or executable in ChatGPT.

**Portfolio:** [NESTLIR — Portfolio Magazine](https://nestlir.github.io/nestlir/portfolio/) · **Source repository:** [nestlir/nestlir](https://github.com/nestlir/nestlir)

## How to read this library

- **Skill** — reusable instructions and procedures.
- **Agent / Subagent** — role configuration for a compatible agent runtime.
- **Plugin** — a packaged extension; may bundle skills, commands, hooks and MCP connections.
- **MCP** — a protocol-based connection to external tools or data.
- **Command** — a named, repeatable operation.
- **Workflow / Hook** — an orchestrated sequence or event-triggered action.
- **Collection** — an index of components, not necessarily an installable package.

### Compatibility labels

| Label | Meaning |
| --- | --- |
| **ChatGPT — available now** | A workflow can be performed with capabilities already available in this ChatGPT session, without claiming an external skill was installed. |
| **ChatGPT — connector-dependent** | Requires the named app/plugin to be connected and authorized. |
| **Adaptable** | Methodology or instruction can be translated into a prompt, checklist, project guide or reusable template. |
| **Codex / Claude Code** | Designed for compatible coding-agent runtimes; not automatically imported into ChatGPT. |
| **External runtime** | Requires its own CLI, SDK, server, API credentials or deployment. |

## Source collections

These repositories are discovery sources. Their README counts and category totals change over time; numbers from the original research notes are historical snapshots, not live guarantees. Check each source before installing a component.

| Repository | Component types | Main coverage | Compatibility / use |
| --- | --- | --- | --- |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | Skills, collections | Development, design, data, security, QA, AI/ML, marketing, documents and media | Codex / Claude Code / compatible agents; adapt individual procedures |
| [zhuyansen/awesome-codex-skills](https://github.com/zhuyansen/awesome-codex-skills) | Skills, plugins, MCP, subagents, tooling | Codex skills, integrations, workflows and agent bridges | Codex-first; useful for implementation patterns |
| [Rodert/awesome-skill](https://github.com/Rodert/awesome-skill) | Skills, collections | Coding, creative, data automation, DevOps, research and writing | Multi-runtime discovery; validate each component |
| [ichangyou/awesome-codex](https://github.com/ichangyou/awesome-codex) | Configuration, plugins, MCP, hooks, SDK, multi-agent tooling | Codex setup, automation, remote access and orchestration | Codex ecosystem reference |
| [VoltAgent/awesome-codex-subagents](https://github.com/VoltAgent/awesome-codex-subagents) | Subagents | Development, languages, infrastructure, QA/security, data/AI, product, research and orchestration | Codex-oriented agent definitions; explicit delegation may be needed |
| [openai/plugins](https://github.com/openai/plugins) | Plugins, skills, MCP and resources | Official OpenAI plugin examples and packaged workflows | Inspect current manifests and runtime requirements; not every package is a ChatGPT toggle |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | Skills, agents, commands, scripts and references | Engineering, product, project management, marketing, finance and compliance | Claude Code / Codex-compatible workflows where documented; audit scripts |
| [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | Skills, agents, commands, MCP, settings, hooks, mods, loops, templates, sandboxes | Full Claude Code component catalogue and CLI management | Claude Code-first; some assets may be portable after adaptation |

## Capability map

### 1. Software engineering
**Types:** Skill · Agent · Workflow · Command  
Frontend, backend, full-stack, TypeScript/JavaScript, Python, Java, C#/.NET, Rust, Go, mobile and desktop development; API and SDK integration; refactoring; architecture; code review; documentation.

**Useful outcomes:** implementation plans, component architecture, typed API contracts, migration plans, code review checklists and reproducible bug reports.

**Runtime:** ChatGPT — available now for reasoning and code drafting; Codex / Claude Code for repository-native execution and specialist delegation.

### 2. Product design and UI engineering
**Types:** Skill · Agent · MCP · Workflow  
UI/UX, user journeys, design systems, component libraries, Figma handoff, visual direction, responsive layouts, typography, accessibility, animation and design-to-code translation.

**Useful outcomes:** design briefs, wireframes, tokens, component specifications, interaction states and UI quality audits.

**Runtime:** ChatGPT — available now for design critique and specifications; connector-dependent for direct Figma operations; code agents for implementation.

### 3. Data platforms and databases
**Types:** Skill · Agent · MCP  
PostgreSQL, MongoDB, Redis, Supabase, Neon, ClickHouse, DuckDB, schema design, SQL tuning, data pipelines, storage and migrations.

**Useful outcomes:** ER diagrams, schema reviews, query plans, data contracts and migration checklists.

**Runtime:** Adaptable; direct execution requires database access and explicit credentials/permissions.

### 4. Security and governance
**Types:** Skill · Agent · Workflow · Hook  
OWASP-oriented reviews, dependency auditing, secrets handling, API security, configuration checks, threat modelling, least privilege and agent permission boundaries.

**Useful outcomes:** threat models, security review notes, remediation plans and pre-release checklists.

**Runtime:** ChatGPT — available now for analysis of supplied code and configurations; execution scanners and CI checks require external tools.

### 5. Testing and quality engineering
**Types:** Skill · Agent · Workflow · Command  
Unit, integration, end-to-end, visual regression and accessibility testing; Playwright, Cypress, Jest, Vitest, Pytest and Selenium.

**Useful outcomes:** test plans, coverage matrices, edge-case inventories, regression suites and release gates.

**Runtime:** Adaptable; actual test execution requires the project runtime or CI environment.

### 6. AI engineering and machine learning
**Types:** Skill · Agent · MCP · Workflow  
LLM applications, agent architectures, MCP servers, RAG, embeddings, model integrations, Hugging Face, memory design, evaluation and ML data preparation.

**Useful outcomes:** architecture proposals, retrieval plans, tool contracts, eval datasets and failure analysis.

**Runtime:** ChatGPT — available now for design and analysis; external runtime/API required to deploy models, agents or MCP servers.

### 7. Product, business and marketing
**Types:** Skill · Agent · Workflow  
Product discovery, PRDs, user stories, roadmaps, RICE prioritisation, UX research, SEO, GEO/AEO, copywriting, CRO, marketing analytics, strategy and business analysis.

**Useful outcomes:** product briefs, prioritisation matrices, experiment plans, content strategies and decision memos.

**Runtime:** ChatGPT — available now for analysis and drafting; connected data sources are needed for account-specific or live measurement.

### 8. Research, writing and knowledge work
**Types:** Skill · Agent · Workflow  
Literature discovery, source synthesis, hypothesis comparison, technical writing, scientific drafting, LaTeX, bibliographies, long-form editing and documentation.

**Useful outcomes:** evidence tables, annotated bibliographies, research briefs, editorial plans and reproducible documentation.

**Runtime:** ChatGPT — available now for research and drafting; access to licensed databases or specialised corpora depends on connectors.

### 9. Creative production and media
**Types:** Skill · Agent · Plugin · MCP  
Illustration, visual concepts, posters, presentation graphics, image/video production, animation, Remotion workflows and brand assets.

**Useful outcomes:** creative briefs, art direction, prompt systems, storyboards and production checklists.

**Runtime:** ChatGPT — available now for supported creative generation; specialist tools may require their own connected app or service.

### 10. Infrastructure and delivery
**Types:** Skill · Agent · Workflow · Hook · Sandbox  
Docker, CI/CD, cloud platforms, deployment, environment management, monitoring, observability and diagnostics.

**Useful outcomes:** deployment plans, CI pipelines, runbooks, incident checklists and environment specifications.

**Runtime:** Adaptable; actual deployment or infrastructure changes require authorized external access.

### 11. Agent orchestration and automation
**Types:** Subagent · Plugin · MCP · Hook · Loop · Workflow  
Task decomposition, specialist delegation, parallel execution, result synthesis, event hooks, scheduled loops, remote sessions, agent state and observability.

**Useful outcomes:** role definitions, handoff contracts, approval gates and multi-stage workflows.

**Runtime:** Codex / Claude Code / external agent runtimes; ChatGPT can coordinate work within tools available in the active session, but does not automatically load repository agent definitions.

## Specialist projects worth inspecting

| Project | Why it matters | Component / runtime |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers) | Structured development method: plan, test, debug, implement and verify | Skills / workflow; compatible agent runtime |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | Agent operating practices spanning skills, memory, security and workflows | Agent framework / Claude Code-oriented |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | Marketing strategy, SEO, copy and conversion workflows | Skills / compatible coding agents |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Scientific and technical research skills across specialised domains | Skills / compatible agents; verify domain and safety limits |
| [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | Distinctive interface design direction that avoids generic template output | Design skill / compatible agent |

## Practical library for this portfolio

This is a prioritised roadmap, not a claim that upstream components have been installed.

| Priority | Capability | Candidate source | Deliverable to adapt |
| --- | --- | --- | --- |
| P0 | Frontend implementation and architecture | VoltAgent skills; Codex subagents | Frontend implementation playbook |
| P0 | UI critique and design-to-code | Hallmark; Figma-related skills | Design review and handoff checklist |
| P0 | Testing and code review | Superpowers; Codex subagents | Test-first and review workflow |
| P0 | Security and dependency checks | ECC; Codex subagents | Safe-change and security checklist |
| P1 | Product discovery and requirements | alirezarezvani/claude-skills | PRD and acceptance criteria templates |
| P1 | Research and technical documentation | Rodert; scientific-agent-skills | Evidence-backed research workflow |
| P1 | AI application engineering | VoltAgent; awesome-codex | RAG / MCP / agent design playbook |
| P2 | Marketing and portfolio discoverability | marketingskills | SEO, content and conversion audit |
| P2 | CI/CD and observability | awesome-codex; Codex subagents | Release and incident runbooks |
| P2 | Creative production | awesome-skill; official plugins | Creative brief and asset pipeline |

## ChatGPT integration reality

| Work | Status in this session |
| --- | --- |
| Analyse code, architecture and technical trade-offs | Available now |
| Draft code, tests, documentation and implementation plans | Available now |
| Research and compare public repositories | Available now with web / GitHub access |
| Read and update authorised GitHub repository content | Available now through connected GitHub access |
| Work with connected design and project tools | Connector-dependent; only installed and authorized apps |
| Run a Codex/Claude Code skill file as a native ChatGPT skill | Not automatic; adapt its instructions or run it in its intended environment |
| Execute arbitrary MCP servers, shell scripts or agent loops | Requires an external runtime and explicit setup |

None of the listed upstream collections is represented as installed merely by appearing in this catalogue.

## Safe adoption checklist

1. Confirm the original repository, maintainer, recent activity and license.
2. Read the complete skill instructions and all referenced files.
3. Inspect scripts, package lifecycle hooks and dependencies before execution.
4. Identify network calls, telemetry, filesystem writes and environment-variable access.
5. Never expose tokens, credentials, private files or production data to an untrusted skill.
6. Start with least privilege, a disposable branch and a test environment.
7. Require human review for deployments, destructive operations, account changes and production access.
8. Record the reviewed commit SHA, date, source URL, license and local changes.

**Security status:** external components are unreviewed until a specific version and its executable files have been inspected. Curated lists are discovery indexes, not security certifications.

## Catalogue record template

- **Name / source URL:**
- **Type:** Skill / Agent / Plugin / MCP / Command / Workflow
- **Purpose and supported tasks:**
- **Runtime compatibility:** ChatGPT / Codex / Claude Code / other
- **Integration path:** native connector / prompt adaptation / CLI / SDK / MCP
- **Dependencies and permissions:**
- **License and version / commit:**
- **Security review:** pending / reviewed / rejected
- **Practical value:** P0 / P1 / P2
- **Portfolio use case:**
- **Notes and limitations:**

---

*Maintained as a curated research index. Re-check upstream READMEs, licenses, counts and compatibility before installation; repository contents and project status can change.*
