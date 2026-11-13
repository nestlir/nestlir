import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'datavac', title: 'DataVac', category: 'product', year: 'Team project',
    role: 'Frontend contribution · vaccination module',
    summary: 'An information product explored through a clearly bounded frontend contribution.',
    stack: ['React', 'TypeScript', 'API'],
    status: 'Contribution scope documented',
    context: 'DataVac is a team-built information product. The portfolio evidence identifies a frontend contribution within the vaccination module; it does not claim ownership of the whole product.',
    decisions: [
      'Keep the case study scoped to the vaccination module and the frontend work that can be attributed.',
      'Describe UI, data and state concerns without inventing endpoint contracts or infrastructure details.',
      'Separate team-level product outcomes from individual contribution.'
    ],
    contribution: 'Frontend tasks in the vaccination module. Other product areas and team-wide delivery are intentionally not attributed to an individual.',
    evidence: ['Repository-level implementation', 'Module scope described in the original portfolio', 'No unsupported performance or business metrics'],
    links: []
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
