import type { Locale } from '../types';

const ru = [
  ['Frontend', 'React / Next.js, UI и маршрутизация', 'datavac', 'DataVac'],
  ['Backend & API', 'NOMAD: API layers и repository contracts', 'nomad-quiet-kyoto', 'NOMAD'],
  ['Integrations', 'DataVac: REST, CloudPayments и PDF', 'datavac', 'DataVac'],
  ['Data', 'NOMAD adapters; MOMOHA atomic JSON writes', 'momoha', 'MOMOHA'],
  ['Testing & QA', 'Vitest, Playwright, API smoke, runtime QA', '50-projects-lab', '50 Projects Lab'],
  ['DevOps', 'GitHub Actions, Docker, GitHub Pages', 'momoha', 'MOMOHA']
];
const en = [
  ['Frontend', 'React / Next.js, UI and routing', 'datavac', 'DataVac'],
  ['Backend & API', 'NOMAD: API layers and repository contracts', 'nomad-quiet-kyoto', 'NOMAD'],
  ['Integrations', 'DataVac: REST, CloudPayments and PDF', 'datavac', 'DataVac'],
  ['Data', 'NOMAD adapters; MOMOHA atomic JSON writes', 'momoha', 'MOMOHA'],
  ['Testing & QA', 'Vitest, Playwright, API smoke, runtime QA', '50-projects-lab', '50 Projects Lab'],
  ['DevOps', 'GitHub Actions, Docker, GitHub Pages', 'momoha', 'MOMOHA']
];

export default function EngineeringCenter({ locale, onOpen }: { locale: Locale; onOpen: (id: string) => void }) {
  const items = locale === 'ru' ? ru : en;
  return <div className="engineering-center">
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
