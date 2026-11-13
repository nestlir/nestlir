import type { Locale } from '../types';

const ru = [
  ['Frontend engineering', 'React / Next.js, маршрутизация и UI-компоненты', 'datavac', 'DataVac'],
  ['Backend & API', 'Слои API, application service и repository', 'nomad-quiet-kyoto', 'NOMAD'],
  ['APIs & integrations', 'REST mapping, CloudPayments и PDF-сценарий', 'datavac', 'DataVac'],
  ['Data & persistence', 'JSON-file и in-memory repositories; atomic writes', 'momoha', 'MOMOHA'],
  ['Testing & quality', 'Vitest, Playwright, API smoke и QA audit', '50-projects-lab', '50 Projects Lab'],
  ['DevOps & delivery', 'GitHub Actions, Docker и GitHub Pages', 'momoha', 'MOMOHA']
];
const en = [
  ['Frontend engineering', 'React / Next.js, routing and reusable UI', 'datavac', 'DataVac'],
  ['Backend & API', 'API layers, application services and repositories', 'nomad-quiet-kyoto', 'NOMAD'],
  ['APIs & integrations', 'REST mapping, CloudPayments and PDF flows', 'datavac', 'DataVac'],
  ['Data & persistence', 'JSON-file and in-memory repositories; atomic writes', 'momoha', 'MOMOHA'],
  ['Testing & quality', 'Vitest, Playwright, API smoke and QA audits', '50-projects-lab', '50 Projects Lab'],
  ['DevOps & delivery', 'GitHub Actions, Docker and GitHub Pages', 'momoha', 'MOMOHA']
];

export default function EngineeringCenter({ locale, onOpen }: { locale: Locale; onOpen: (id: string) => void }) {
  const items = locale === 'ru' ? ru : en;
  return <div className="engineering-center">
    <p className="engineering-intro">{locale === 'ru' ? 'Инженерные практики, подтверждённые реализацией и документацией проектов.' : 'Engineering practices backed by implementation and project documentation.'}</p>
    <div className="engineering-grid">
      {items.map(([title, evidence, id, project], index) => <article className="engineering-card" key={id + title}>
        <div className="engineering-card-top"><span>0{index + 1} / 06</span><span>{['UI', 'API', '↔', 'DB', 'QA', 'CI'][index]}</span></div>
        <h3>{title}</h3>
        <p className="engineering-summary">{evidence}</p>
        <div className="engineering-projects"><button type="button" onClick={() => onOpen(id)}>{project}<span>↗</span></button></div>
      </article>)}
    </div>
  </div>;
}
