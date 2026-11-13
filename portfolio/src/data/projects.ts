import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'datavac', title: 'DataVac', category: 'product', year: 'Team project',
    role: 'Frontend engineering · API integration · product flows',
    summary: 'A vaccine information service: live catalogues, search, detailed vaccine pages, payment flow and generated PDF instructions.',
    stack: ['React 19', 'Next.js 16', 'TypeScript 5', 'Tailwind CSS 4', 'Zustand 5', 'REST API', 'CloudPayments', 'React PDF', 'Playwright'],
    status: 'Team product · frontend contribution',
    context: 'DataVac is a team-built information service with vaccine and reference information covering infections, ingredients, contraindications and instructions. The frontend is a Next.js App Router application integrated with a REST backend. The detailed contribution record documents work across catalogues, search, vaccine details, payment and PDF generation.',
    decisions: [
      'Replace mock catalogue data with live API requests and explicit mapping from UI filters and sorting to backend parameters.',
      'Use TypeScript models and mapper functions to keep API response shapes separate from UI-facing data.',
      'Preserve search and filter state in URL/search parameters and provide loading, empty and error states.',
      'Treat payment and PDF generation as complete user flows: validation and failure states for payment; QR codes and Cyrillic fonts for PDF output.'
    ],
    contribution: 'Frontend pages and reusable UI components; responsive layouts; REST API integration; vaccine, ingredient, infection and contraindication catalogues; search and filters; vaccine detail pages; CloudPayments checkout flow; PDF instruction generation. The work was delivered within a team product, not as sole ownership of the full service.',
    evidence: [
      'Detailed contribution and implementation notes in this repository: projects/datavac-frontend/README.md',
      'Team source repository: DataVac-masterskaya/data-vac-frontend',
      'Documented GET /api/v1/vaccines/ integration and UI-to-API parameter mapping',
      'Documented CloudPayments checkout/cryptogram flow and @react-pdf/renderer output with QR codes'
    ],
    architecture: [
      'Next.js 16 App Router / React 19 pages and reusable UI components',
      'Typed frontend models + mapper functions translate REST responses and filter parameters',
      'REST API /api/v1 supplies vaccines, ingredients, infections and contraindications',
      'URL search parameters preserve search, sorting and filter state',
      'CloudPayments checkout and client-side PDF generation are separate user-flow integrations'
    ],
    outcomes: [
      'Catalogue pages moved from mock data to live backend data',
      'Search, filtering, sorting and vaccine detail flows were connected to API data',
      'Payment UI includes amount and recurring-payment selection, validation and success/failure states',
      'PDF instructions are generated from vaccine data with QR codes and Cyrillic font support'
    ],
    links: [
      { label: 'Contribution notes', href: 'https://github.com/nestlir/nestlir/blob/main/projects/datavac-frontend/README.md' },
      { label: 'Team frontend repository', href: 'https://github.com/DataVac-masterskaya/data-vac-frontend' }
    ]
  },
  {
    id: 'nomad-quiet-kyoto', title: 'NOMAD — Quiet Kyoto', category: 'product', year: 'Modular application',
    role: 'Product architecture · frontend and backend structure',
    summary: 'A modular travel-experience application with place, food and trip domains, client-side routing and a separate API.',
    stack: ['JavaScript', 'Node.js', 'HTTP API', 'Domain models', 'Repository pattern', 'Playwright'],
    status: 'Modular application · active codebase',
    context: 'NOMAD is a Kyoto travel-experience application. The project documents a single frontend runtime with route-level pages and domain entities, plus a backend split into HTTP transport, application services, domain contracts and repository implementations.',
    decisions: [
      'Keep page rendering and navigation in one application shell and route registry.',
      'Separate frontend API transport and browser persistence adapters from page components.',
      'Keep backend HTTP routes thin; place trip use cases in application services and persistence behind repository contracts.',
      'Use a JSON-file repository for local persistence with an in-memory repository for isolated tests.'
    ],
    contribution: 'The repository contains the modular frontend and backend implementation, architecture documentation, test suite and browser QA flow. The case describes repository architecture and shipped project structure, not unverified user or business outcomes.',
    evidence: [
      'nomad-quiet-kyoto/README.md documents the active runtime and dependency direction',
      'backend/src contains api, application, domain and infrastructure layers',
      'JSON-file and in-memory trip repository implementations are present',
      'README documents unit, backend and Playwright E2E commands'
    ],
    architecture: [
      'Frontend app shell → route registry → route-level pages',
      'Place, Food and Trip domain entities are separate from UI components',
      'Shared HTTP client and browser storage adapter isolate external I/O',
      'Backend API transport → Trip application service → repository contract',
      'JSON-file repository for persistence; in-memory adapter for isolated tests'
    ],
    outcomes: [
      'Frontend routing, domain entities and shared adapters have explicit boundaries',
      'Backend trip logic is separated from HTTP transport and storage implementation',
      'Persistence can switch behind a repository boundary without changing the HTTP contract',
      'The repository documents E2E coverage for navigation, detail pages, add/remove flows and API synchronization'
    ],
    links: [{ label: 'Project source and architecture', href: 'https://github.com/nestlir/nestlir/tree/main/nomad-quiet-kyoto' }]
  },
  {
    id: 'momoha', title: 'MOMOHA — Sakura Street Food', category: 'product', year: 'Static frontend + Node API',
    role: 'Frontend experience · API workflow · deployment setup',
    summary: 'A Japanese street-food experience with a menu, multi-item cart and an order submission API.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Docker', 'GitHub Actions'],
    status: 'Frontend and lightweight API',
    context: 'MOMOHA (the suwenku directory) is a static restaurant frontend paired with a lightweight Node API. The primary task flow is menu → quick order → cart → contact → POST /api/orders → confirmation.',
    decisions: [
      'Keep the frontend statically deployable while defining a clear API boundary for order submission.',
      'Persist order records through an atomic JSON-file write and cap the store at 500 records.',
      'Keep the admin-facing orders endpoint internal and document that authentication is required before public exposure.',
      'Use an exact CORS origin configuration and document the limits of JSON-file persistence.'
    ],
    contribution: 'The repository contains the static user interface, lightweight API, Dockerfile, deployment blueprint, API tests and CI checks. The README explicitly identifies the need for managed database storage, authentication, order status management, notifications and payment integration before real restaurant production use.',
    evidence: [
      'suwenku/README.md documents screen map, UX audit, API and deployment',
      'GET /api/health, GET /api/menu, GET /api/orders and POST /api/orders are documented',
      'Order persistence uses atomic JSON writes and a 500-record cap',
      'GitHub Actions runs Node tests, API smoke/E2E and frontend contract checks'
    ],
    architecture: [
      'Static frontend: Hero → Menu → Kitchen → News → Visit → Footer',
      'Cart and checkout interaction posts an order to the Node HTTP API',
      'API validates and writes orders to a JSON-file store atomically',
      'Dockerfile and Render blueprint describe a separately hosted API; Pages serves the frontend',
      'CORS_ORIGIN is configured to the exact frontend origin'
    ],
    outcomes: [
      'A multi-item cart and order confirmation flow are connected to POST /api/orders',
      'Menu and health endpoints are available through the API boundary',
      'Unit/integration tests and API smoke/E2E checks are included in CI',
      'Production limitations are documented: JSON storage is not a substitute for PostgreSQL, auth or payment processing'
    ],
    links: [{ label: 'MOMOHA source and setup', href: 'https://github.com/nestlir/nestlir/tree/main/suwenku' }]
  },
  {
    id: '50-projects-lab', title: '50 Projects Lab', category: 'platform', year: '43 local projects',
    role: 'Interactive archive · shared runtime · QA',
    summary: 'A self-contained archive with 30 browser demos and 13 native C/C++ systems projects.',
    stack: ['JavaScript', 'HTML', 'CSS', 'C/C++', 'Shared runtime', 'QA scripts'],
    status: 'Interactive learning platform',
    context: 'The repository describes 30 local browser projects and 13 native C/C++ systems projects. Each browser demo keeps its own URL and page while using a shared local runtime; native project sources remain authoritative.',
    decisions: [
      'Use a shared local runtime for browser demos instead of remote demo iframes.',
      'Keep every demo addressable by its own public URL and index.html.',
      'Separate browser-interaction projects from native C/C++ systems implementations.',
      'Audit the archive so each browser page uses the local runtime and does not depend on the removed external site script.'
    ],
    contribution: 'The repository includes the local project catalogue, shared browser runtime, 30 demo pages, native systems-project integration and QA scripts. The 50 Projects Lab name is retained; the README currently enumerates 30 browser demos plus 13 C/C++ projects.',
    evidence: [
      '50-projects-lab/README.md documents 30 browser demos and 13 native projects',
      'qa/audit-deep.mjs checks local runtime usage and absence of remote iframe dependencies',
      'The live browser archive is published at 50-projects-lab.vercel.app'
    ],
    architecture: [
      'Catalog page and project-specific index.html routes',
      'Shared project-runtime.js provides interactive behavior to the 30 browser demos',
      'No remote demo iframes; local assets and runtime keep demos self-contained',
      'Native C/C++ projects live in a separate projects/c-cpp tree',
      'QA scripts validate the shared-runtime contract across browser demos'
    ],
    outcomes: [
      '30 browser projects use the local shared runtime',
      '13 C/C++ systems projects are organized separately from browser demos',
      'The QA audit checks all browser pages for runtime wiring and iframe independence'
    ],
    links: [
      { label: 'Live 50 Projects Lab', href: 'https://50-projects-lab.vercel.app/' },
      { label: 'Source and project archive', href: 'https://github.com/nestlir/nestlir/tree/main/50-projects-lab' }
    ]
  },
  {
    id: 'furniture-store', title: 'Furniture Store', category: 'experiment', year: 'Independent experiment',
    role: 'Product brief · interface direction · AI-assisted implementation',
    summary: 'A product-interface experiment around a furniture catalogue and product detail experience.',
    stack: ['Responsive UI', 'Catalogue', 'Product cards', 'AI-assisted'],
    status: 'Independent experiment',
    context: 'An independent experiment. Requirements, direction and product structure were defined by the author; AI was used as part of implementation.',
    decisions: [
      'Organize the experience around catalogue discovery and product detail.',
      'Treat responsive behavior as part of the interface, not as a separate afterthought.',
      'Keep AI assistance explicit and preserve human review of the result.'
    ],
    contribution: 'Independent product experiment, not a client engagement or a claim of team commercial delivery.',
    evidence: ['Published project repository', 'Original portfolio illustration and project description'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/Furniture_Store_Ru' }]
  },
  {
    id: 'web-larek', title: 'Web Larek', category: 'study', year: 'Learning project',
    role: 'Frontend practice',
    summary: 'E-commerce learning project focused on TypeScript and application structure.',
    stack: ['TypeScript', 'E-commerce'],
    status: 'Educational work',
    context: 'A learning assignment used to practice frontend patterns. It is not presented as paid client work.',
    decisions: ['Practice typed application boundaries.', 'Keep the project classified as educational work.'],
    contribution: 'Individual learning implementation.',
    evidence: ['Public source repository'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/web-larek-frontend' }]
  },
  {
    id: 'stellar-burger', title: 'Stellar Burger', category: 'study', year: 'Learning project',
    role: 'Frontend practice',
    summary: 'A React and Redux learning project.',
    stack: ['React', 'Redux'],
    status: 'Educational work',
    context: 'A learning assignment for component-driven UI and application state.',
    decisions: ['Practice reusable React components.', 'Keep state-management claims limited to the repository description.'],
    contribution: 'Individual learning implementation.',
    evidence: ['Public source repository'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/stellar-burger' }]
  },
  {
    id: 'mesto', title: 'Mesto', category: 'study', year: 'Learning project',
    role: 'Frontend practice',
    summary: 'A React learning project with forms and interactive content.',
    stack: ['React', 'Forms'],
    status: 'Educational work',
    context: 'A learning assignment that demonstrates practice with React and form flows.',
    decisions: ['Treat forms as explicit user journeys.', 'Separate learning evidence from professional experience.'],
    contribution: 'Individual learning implementation.',
    evidence: ['Public source repository'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/mesto-project-ff' }]
  },
  {
    id: 'blog-customizer', title: 'Blog Customizer', category: 'study', year: 'Learning project',
    role: 'Frontend practice',
    summary: 'A React and TypeScript exercise in configurable interface controls.',
    stack: ['React', 'TypeScript'],
    status: 'Educational work',
    context: 'A learning assignment for typed UI state and user-controlled presentation.',
    decisions: ['Model user choices as explicit state.', 'Keep controls accessible and predictable.'],
    contribution: 'Individual learning implementation.',
    evidence: ['Public source repository'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/blog-customizer' }]
  },
  {
    id: 'ono-tebe-nado', title: 'Оно тебе надо', category: 'study', year: 'Learning project',
    role: 'Frontend practice',
    summary: 'An HTML and CSS learning project focused on layout and responsive composition.',
    stack: ['HTML', 'CSS'],
    status: 'Educational work',
    context: 'A learning assignment for semantic markup and visual layout.',
    decisions: ['Use semantic HTML.', 'Build layout from a consistent grid and spacing rhythm.'],
    contribution: 'Individual learning implementation.',
    evidence: ['Public source repository'],
    links: [{ label: 'GitHub repository', href: 'https://github.com/nestlir/ono-tebe-nado' }]
  }
];
