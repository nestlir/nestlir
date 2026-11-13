import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'datavac', title: 'DataVac', category: 'product', year: 'Team project',
    role: 'Frontend engineering · API integration · product flows',
    summary: 'A vaccine information service: live catalogues, search, detailed vaccine pages, payment flow and generated PDF instructions.',
    stack: ['React 19', 'Next.js 16', 'TypeScript 5', 'Tailwind CSS 4', 'Zustand 5', 'REST API', 'CloudPayments', 'React PDF', 'Playwright'],
    status: 'Team product · frontend contribution',
    context: "Team vaccine-reference service. Its Next.js frontend integrates REST catalogues, vaccine pages, checkout and PDF instructions.",
    decisions: [
      'Replace mock catalogue data with live API requests and explicit mapping from UI filters and sorting to backend parameters.',
      'Use TypeScript models and mapper functions to keep API response shapes separate from UI-facing data.',
      'Preserve search and filter state in URL/search parameters and provide loading, empty and error states.',
      'Treat payment and PDF generation as complete user flows: validation and failure states for payment; QR codes and Cyrillic fonts for PDF output.'
    ],
    contribution: "Frontend pages/components, responsive UI, REST integration, catalogues, search, vaccine details, CloudPayments checkout and PDF generation. Delivered as a team contribution, not sole ownership.",
    evidence: [
      "Contribution record: projects/datavac-frontend/README.md",
      "Team frontend repository: DataVac-masterskaya/data-vac-frontend",
      "Documented vaccines API, CloudPayments checkout and PDF/QR generation."
    ],
    architecture: [
      "Next.js App Router / React pages and reusable UI.",
      "Typed models and mappers adapt REST responses and filter parameters.",
      "REST /api/v1 supplies catalogues; URL parameters hold filter state.",
      "CloudPayments checkout and client-side PDF are separate integrations."
    ],
    outcomes: [
      'Catalogue pages moved from mock data to live backend data',
      'Search, filtering, sorting and vaccine detail flows were connected to API data',
      'Payment UI includes amount and recurring-payment selection, validation and success/failure states',
      'PDF instructions are generated from vaccine data with QR codes and Cyrillic font support'
    ],
    limitations: [
      "This is a team product; the case documents a frontend contribution, not sole ownership of the service.",
      "The public project evidence does not provide independently verified usage, revenue or clinical outcome metrics."
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
    context: "Kyoto travel app with a route-based frontend and separate backend organized around trip services and repository contracts.",
    decisions: [
      'Keep page rendering and navigation in one application shell and route registry.',
      'Separate frontend API transport and browser persistence adapters from page components.',
      'Keep backend HTTP routes thin; place trip use cases in application services and persistence behind repository contracts.',
      'Use a JSON-file repository for local persistence with an in-memory repository for isolated tests.'
    ],
    contribution: "Modular frontend/backend implementation, architecture docs, tests and browser QA are present in the repository; this case makes no unsupported business-outcome claims.",
    evidence: [
      "README documents runtime and dependency direction.",
      "backend/src contains api, application, domain and infrastructure.",
      "JSON-file/in-memory repositories and unit, backend and Playwright E2E are documented."
    ],
    architecture: [
      "Frontend shell → route registry → pages.",
      "Place, Food and Trip entities stay separate from UI.",
      "HTTP client and browser-storage adapter isolate external I/O.",
      "Backend transport → Trip service → repository; JSON-file and in-memory adapters."
    ],
    outcomes: [
      'Frontend routing, domain entities and shared adapters have explicit boundaries',
      'Backend trip logic is separated from HTTP transport and storage implementation',
      'Persistence can switch behind a repository boundary without changing the HTTP contract',
      'The repository documents E2E coverage for navigation, detail pages, add/remove flows and API synchronization'
    ],
    limitations: [
      "The documented persistence adapters are JSON-file and in-memory repositories; a managed production database is not evidenced in the project documentation.",
      "No production scale, uptime or user-adoption metrics are claimed."
    ],
    links: [{ label: 'Project source and architecture', href: 'https://github.com/nestlir/nestlir/tree/main/nomad-quiet-kyoto' }]
  },
  {
    id: 'momoha', title: 'MOMOHA — Sakura Street Food', category: 'product', year: 'Static frontend + Node API',
    role: 'Frontend experience · API workflow · deployment setup',
    summary: 'A Japanese street-food experience with a menu, multi-item cart and an order submission API.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Docker', 'GitHub Actions'],
    status: 'Frontend and lightweight API',
    context: "Static Japanese street-food frontend with a lightweight Node API. Flow: menu → cart → contact → POST /api/orders → confirmation.",
    decisions: [
      'Keep the frontend statically deployable while defining a clear API boundary for order submission.',
      'Persist order records through an atomic JSON-file write and cap the store at 500 records.',
      'Keep the admin-facing orders endpoint internal and document that authentication is required before public exposure.',
      'Use an exact CORS origin configuration and document the limits of JSON-file persistence.'
    ],
    contribution: "The repository includes the static UI, lightweight API, Dockerfile, deployment blueprint, API tests and CI checks.",
    evidence: [
      "suwenku/README.md documents screens, API and deployment.",
      "Endpoints: GET /api/health, GET /api/menu, GET /api/orders, POST /api/orders.",
      "Atomic JSON writes, 500-record cap and CI API checks are documented."
    ],
    architecture: [
      "Static frontend serves menu and cart.",
      "Checkout posts validated orders to Node HTTP API.",
      "API atomically writes orders to JSON storage.",
      "Pages hosts frontend; Docker/Render describe API hosting; CORS uses exact origin."
    ],
    outcomes: [
      'A multi-item cart and order confirmation flow are connected to POST /api/orders',
      'Menu and health endpoints are available through the API boundary',
      'Unit/integration tests and API smoke/E2E checks are included in CI',
      'Production limitations are documented: JSON storage is not a substitute for PostgreSQL, auth or payment processing'
    ],
    limitations: [
      "JSON-file persistence is a lightweight implementation, not a managed database; the documented store is capped at 500 records.",
      "Before real restaurant production use, the project documentation calls for managed database storage, authentication, order statuses, notifications and payment integration."
    ],
    links: [{ label: 'MOMOHA source and setup', href: 'https://github.com/nestlir/nestlir/tree/main/suwenku' }]
  },
  {
    id: '50-projects-lab', title: '50 Projects Lab', category: 'platform', year: '43 local projects',
    role: 'Interactive archive · shared runtime · QA',
    summary: 'A self-contained archive with 30 browser demos and 13 native C/C++ systems projects.',
    stack: ['JavaScript', 'HTML', 'CSS', 'C/C++', 'Shared runtime', 'QA scripts'],
    status: 'Interactive learning platform',
    context: "Local archive listing 30 browser demos and 13 native C/C++ projects. Browser pages have separate URLs and share a local runtime.",
    decisions: [
      'Use a shared local runtime for browser demos instead of remote demo iframes.',
      'Keep every demo addressable by its own public URL and index.html.',
      'Separate browser-interaction projects from native C/C++ systems implementations.',
      'Audit the archive so each browser page uses the local runtime and does not depend on the removed external site script.'
    ],
    contribution: "The repository includes the local catalogue, shared browser runtime, 30 demos, native project integration and QA scripts.",
    evidence: [
      "README lists 30 browser demos and 13 native projects.",
      "qa/audit-deep.mjs checks local runtime and iframe independence.",
      "Live browser archive: 50-projects-lab.vercel.app."
    ],
    architecture: [
      "Catalogue with project-specific index.html pages.",
      "Shared project-runtime.js powers 30 browser demos.",
      "Browser demos use local assets/runtime, not remote iframes.",
      "Native C/C++ sources stay separate under projects/c-cpp; QA audits runtime wiring."
    ],
    outcomes: [
      '30 browser projects use the local shared runtime',
      '13 C/C++ systems projects are organized separately from browser demos',
      'The QA audit checks all browser pages for runtime wiring and iframe independence'
    ],
    limitations: [
      "The current README enumerates 30 browser demos and 13 native C/C++ projects (43 listed projects), despite the retained 50 Projects Lab name.",
      "The shared browser runtime applies to browser demos; native C/C++ projects remain separate implementations."
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
