import type { Locale } from '../types';

type Capability = {
  id: string;
  title: string;
  mark: string;
  summary: string;
  evidence: string[];
  projects: { id: string; label: string }[];
};

const content: Record<Locale, { intro: string; inspect: string; capabilities: Capability[] }> = {
  ru: {
    intro: 'Инженерные практики, подтверждённые реализацией и документацией проектов.',
    inspect: 'Открыть кейс',
    capabilities: [
      { id: 'frontend', title: 'Frontend engineering', mark: 'UI', summary: 'Компонентные интерфейсы, маршрутизация и пользовательские сценарии.', evidence: ['DataVac: React 19, Next.js App Router и повторно используемые компоненты', 'NOMAD: route registry, доменные сущности и browser adapters'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }] },
      { id: 'backend', title: 'Backend & API', mark: 'API', summary: 'HTTP-транспорт, прикладная логика и хранение за явными контрактами.', evidence: ['NOMAD: API transport → application service → repository', 'MOMOHA: Node API, валидация заказов и атомарная JSON-запись'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'integration', title: 'APIs & integrations', mark: '↔', summary: 'Интеграция REST-контрактов и внешних пользовательских сценариев.', evidence: ['DataVac: typed models, mapping REST-ответов и CloudPayments', 'MOMOHA: отправка заказа через POST /api/orders'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'data', title: 'Data & persistence', mark: 'DB', summary: 'Типизированные модели и изолированные адаптеры хранения.', evidence: ['NOMAD: JSON-file и in-memory repositories', 'MOMOHA: атомарное JSON-хранилище с лимитом 500 записей'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'quality', title: 'Testing & quality', mark: 'QA', summary: 'Автоматизация проверок интерфейсов, API и проектных контрактов.', evidence: ['Портфолио: Vitest и Playwright для browser journeys', 'MOMOHA API smoke tests и 50 Projects Lab QA audit'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }] },
      { id: 'delivery', title: 'DevOps & delivery', mark: 'CI', summary: 'Сборка, контейнеризация и автоматические проверки перед релизом.', evidence: ['GitHub Actions: tests, build и проверки репозитория', 'MOMOHA: Dockerfile и deployment blueprint; портфолио — GitHub Pages'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }] }
    ]
  },
  en: {
    intro: 'Engineering practices backed by implementation details and project documentation.',
    inspect: 'Open case',
    capabilities: [
      { id: 'frontend', title: 'Frontend engineering', mark: 'UI', summary: 'Component-driven interfaces, routing and user journeys.', evidence: ['DataVac: React 19, Next.js App Router and reusable components', 'NOMAD: route registry, domain entities and browser adapters'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }] },
      { id: 'backend', title: 'Backend & API', mark: 'API', summary: 'HTTP transport, application logic and persistence behind contracts.', evidence: ['NOMAD: API transport → application service → repository', 'MOMOHA: Node API, order validation and atomic JSON writes'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'integration', title: 'APIs & integrations', mark: '↔', summary: 'REST contracts and external user-flow integrations.', evidence: ['DataVac: typed models, REST mapping and CloudPayments', 'MOMOHA: order submission through POST /api/orders'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'data', title: 'Data & persistence', mark: 'DB', summary: 'Typed models and isolated persistence adapters.', evidence: ['NOMAD: JSON-file and in-memory repositories', 'MOMOHA: atomic JSON storage with a 500-record cap'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }] },
      { id: 'quality', title: 'Testing & quality', mark: 'QA', summary: 'Automated checks for interfaces, APIs and project contracts.', evidence: ['Portfolio: Vitest and Playwright browser journeys', 'MOMOHA API smoke tests and 50 Projects Lab QA audit'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }] },
      { id: 'delivery', title: 'DevOps & delivery', mark: 'CI', summary: 'Builds, containerization and automated pre-release checks.', evidence: ['GitHub Actions: tests, build and repository validation', 'MOMOHA Dockerfile and deployment blueprint; portfolio on GitHub Pages'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }] }
    ]
  }
};

export default function EngineeringCenter({ locale, onOpen }: { locale: Locale; onOpen: (id: string) => void }) {
  const copy = content[locale];
  return <div className="engineering-center">
    <p className="engineering-intro">{copy.intro}</p>
    <div className="engineering-grid">
      {copy.capabilities.map((item, index) => <article className="engineering-card" key={item.id}>
        <div className="engineering-card-top"><span>0{index + 1} / 06</span><span className="engineering-mark">{item.mark}</span></div>
        <h3>{item.title}</h3>
        <p className="engineering-summary">{item.summary}</p>
        <ul>{item.evidence.map(line => <li key={line}>{line}</li>)}</ul>
        <div className="engineering-projects">
          {item.projects.map(project => <button key={project.id} type="button" onClick={() => onOpen(project.id)} aria-label={copy.inspect + ': ' + project.label}>{project.label}<span>↗</span></button>)}
        </div>
      </article>)}
    </div>
  </div>;
}
