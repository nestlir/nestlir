import { Code2, Database, GitBranch, Network, Server, ShieldCheck } from 'lucide-react';
import type { Locale } from '../types';

type Capability = {
  id: string;
  title: string;
  summary: string;
  evidence: string[];
  projects: { id: string; label: string }[];
  icon: typeof Code2;
};

const content: Record<Locale, { intro: string; capabilities: Capability[]; inspect: string }> = {
  ru: {
    intro: 'Не список навыков по самооценке, а конкретные инженерные практики и проекты, в которых они применены.',
    inspect: 'Открыть доказательство',
    capabilities: [
      { id: 'frontend', title: 'Frontend engineering', summary: 'Компонентные интерфейсы, маршрутизация, формы, состояния и интеграция пользовательских сценариев.', evidence: ['React 19 / Next.js App Router и повторно используемые UI-компоненты в DataVac', 'Route registry, доменные сущности и адаптеры браузерного хранения в NOMAD', 'Статический адаптивный интерфейс и корзина с несколькими товарами в MOMOHA'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Code2 },
      { id: 'backend', title: 'Backend & API', summary: 'Разделение HTTP-транспорта, прикладной логики и хранения; контракты между интерфейсом и сервером.', evidence: ['NOMAD: API transport → application service → repository contract', 'MOMOHA: Node HTTP API с health, menu и order endpoints', 'Валидация заказов и атомарная запись JSON-файла; ограничения production явно задокументированы'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Server },
      { id: 'integration', title: 'APIs & integrations', summary: 'Подключение внешних контрактов и перевод данных API в модель, удобную интерфейсу.', evidence: ['DataVac: REST API, typed models и mapper-функции для UI', 'DataVac: CloudPayments checkout flow и генерация PDF-инструкций', 'MOMOHA: отправка заказа через POST /api/orders'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'momoha', label: 'MOMOHA' }], icon: Network },
      { id: 'data', title: 'Data & persistence', summary: 'Типизированные модели, преобразование ответов и изоляция способов хранения за адаптерами.', evidence: ['DataVac: типизированные модели и mapping REST-ответов', 'NOMAD: JSON-file repository и in-memory adapter за repository contract', 'MOMOHA: атомарная JSON-запись с лимитом 500 заказов'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Database },
      { id: 'quality', title: 'Testing & quality', summary: 'Проверка пользовательских сценариев, API-поведения и повторяемых контрактов.', evidence: ['Vitest для логики каталога и сериализации фильтров портфолио', 'Playwright для browser journeys и cross-browser профилей', 'MOMOHA API tests и smoke checks; 50 Projects Lab QA-аудит shared runtime'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }], icon: ShieldCheck },
      { id: 'delivery', title: 'DevOps & delivery', summary: 'Сборка, контейнеризация и автоматизированная проверка перед публикацией.', evidence: ['GitHub Actions для тестов, сборки и проверки портфолио', 'Dockerfile и deployment blueprint в MOMOHA API', 'Статическая публикация портфолио на GitHub Pages и отдельный live archive на Vercel'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }], icon: GitBranch }
    ]
  },
  en: {
    intro: 'Not a self-rated skills list: these are concrete engineering practices demonstrated in the projects.',
    inspect: 'Open evidence',
    capabilities: [
      { id: 'frontend', title: 'Frontend engineering', summary: 'Component-driven interfaces, routing, forms, state and end-to-end user flows.', evidence: ['React 19 / Next.js App Router and reusable UI components in DataVac', 'Route registry, domain entities and browser-storage adapters in NOMAD', 'Static responsive experience and multi-item cart in MOMOHA'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Code2 },
      { id: 'backend', title: 'Backend & API', summary: 'Separating HTTP transport, application logic and persistence behind explicit contracts.', evidence: ['NOMAD: API transport → application service → repository contract', 'MOMOHA: Node HTTP API with health, menu and order endpoints', 'Order validation and atomic JSON writes; production limitations are documented'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Server },
      { id: 'integration', title: 'APIs & integrations', summary: 'Connecting external contracts and mapping API data into UI-facing models.', evidence: ['DataVac: REST API, typed models and mapper functions for the UI', 'DataVac: CloudPayments checkout flow and generated PDF instructions', 'MOMOHA: order submission through POST /api/orders'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'momoha', label: 'MOMOHA' }], icon: Network },
      { id: 'data', title: 'Data & persistence', summary: 'Typed models, response mapping and storage adapters behind repository boundaries.', evidence: ['DataVac: typed models and REST response mapping', 'NOMAD: JSON-file repository and in-memory adapter behind a repository contract', 'MOMOHA: atomic JSON writes with a 500-order cap'], projects: [{ id: 'datavac', label: 'DataVac' }, { id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }], icon: Database },
      { id: 'quality', title: 'Testing & quality', summary: 'Verifying user journeys, API behavior and repeatable implementation contracts.', evidence: ['Vitest for portfolio catalogue logic and filter URL serialization', 'Playwright for browser journeys and cross-browser profiles', 'MOMOHA API tests and smoke checks; 50 Projects Lab shared-runtime QA audit'], projects: [{ id: 'nomad-quiet-kyoto', label: 'NOMAD' }, { id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }], icon: ShieldCheck },
      { id: 'delivery', title: 'DevOps & delivery', summary: 'Builds, containerization and automated checks before release.', evidence: ['GitHub Actions for portfolio tests, build and validation', 'Dockerfile and deployment blueprint for the MOMOHA API', 'Static portfolio delivery on GitHub Pages and a separate live archive on Vercel'], projects: [{ id: 'momoha', label: 'MOMOHA' }, { id: '50-projects-lab', label: '50 Projects Lab' }], icon: GitBranch }
    ]
  }
};

export default function EngineeringCenter({ locale, onOpen }: { locale: Locale; onOpen: (id: string) => void }) {
  const copy = content[locale];
  return <div className="engineering-center">
    <p className="engineering-intro">{copy.intro}</p>
    <div className="engineering-grid">
      {copy.capabilities.map((item, index) => {
        const Icon = item.icon;
        return <article className="engineering-card" key={item.id}>
          <div className="engineering-card-top"><span>0{index + 1} / 06</span><Icon size={20} strokeWidth={1.5}/></div>
          <h3>{item.title}</h3>
          <p className="engineering-summary">{item.summary}</p>
          <ul>{item.evidence.map(line => <li key={line}>{line}</li>)}</ul>
          <div className="engineering-projects">
            {item.projects.map(project => <button key={project.id} type="button" onClick={() => onOpen(project.id)} aria-label={copy.inspect + ': ' + project.label}>{project.label}<span>↗</span></button>)}
          </div>
        </article>;
      })}
    </div>
  </div>;
}
