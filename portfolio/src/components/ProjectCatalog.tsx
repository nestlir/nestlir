import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { Locale, ProjectCategory } from '../types';
import { projects } from '../data/projects';
import { filterProjects } from '../data/filterProjects';
import { localizeProject } from '../data/projectCopy';
import type { copy } from '../i18n';

type T = typeof copy.ru;
const categories: ('all' | ProjectCategory)[] = ['all', 'product', 'experiment', 'study'];
export default function ProjectCatalog({ t, locale, onOpen }: { t: T; locale: Locale; onOpen: (id: string) => void }) {
  const [category, setCategory] = useState<'all' | ProjectCategory>('all');
  const [query, setQuery] = useState('');
  const labels = { all: t.all, product: t.product, experiment: t.experiment, study: t.study };
  const filtered = useMemo(() => filterProjects(projects, category, query), [category, query]);
  return <div className="catalog">
    <div className="catalog-controls">
      <div className="filter-row" role="group" aria-label={locale === 'ru' ? 'Фильтр по типу проекта' : 'Filter by project type'}>
        {categories.map(item => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} aria-pressed={category === item} onClick={() => setCategory(item)}>{labels[item]}</button>)}
      </div>
      <label className="search-box"><Search size={17}/><span className="sr-only">{t.search}</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchPlaceholder}/></label>
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} / {projects.length}</p>
    {filtered.length ? <div className="project-grid">{filtered.map((source, index) => { const project = localizeProject(source, locale); return <article className="project-card" key={project.id}>
      <div className="card-topline"><span>0{index + 1}</span><span>{project.year}</span></div>
      <p className="eyebrow">{labels[project.category]}</p>
      <h3>{project.title}</h3><p className="project-summary">{project.summary}</p>
      <div className="tags">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="card-bottom"><button className="text-link" onClick={() => onOpen(project.id)}>{t.openCase}<ArrowUpRight size={16}/></button><span className="card-status">{project.status}</span></div>
    </article>; })}</div> : <p className="empty-state">{t.noResults}</p>}
  </div>;
}
