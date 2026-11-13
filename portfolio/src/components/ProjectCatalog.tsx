import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, RotateCcw, Search } from 'lucide-react';
import type { Locale, ProjectCategory } from '../types';
import { projects } from '../data/projects';
import {
  defaultCatalogFilters,
  filterProjects,
  parseCatalogFilters,
  serializeCatalogFilters
} from '../data/filterProjects';
import { localizeProject } from '../data/projectCopy';
import type { copy } from '../i18n';

type T = typeof copy.ru;
const categories: ('all' | ProjectCategory)[] = ['all', 'product', 'platform', 'experiment', 'study'];

export default function ProjectCatalog({ t, locale, onOpen }: { t: T; locale: Locale; onOpen: (id: string) => void }) {
  const technologies = useMemo(
    () => [...new Set(projects.flatMap(project => project.stack))].sort((a, b) => a.localeCompare(b)),
    []
  );
  const [filters, setFilters] = useState(() => parseCatalogFilters(window.location.search, technologies));
  const labels = { all: t.all, product: t.product, platform: t.platform, experiment: t.experiment, study: t.study };
  const filtered = useMemo(() => filterProjects(projects, filters), [filters]);

  useEffect(() => {
    const syncFromLocation = () => setFilters(parseCatalogFilters(window.location.search, technologies));
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, [technologies]);

  useEffect(() => {
    const query = serializeCatalogFilters(filters);
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) window.history.replaceState(window.history.state, '', nextUrl);
  }, [filters]);

  const update = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    setFilters(current => ({ ...current, [key]: value }));
  };
  const reset = () => setFilters(defaultCatalogFilters);

  return <div className="catalog">
    <div className="catalog-controls">
      <div className="filter-row" role="group" aria-label={locale === 'ru' ? 'Фильтр по типу проекта' : 'Filter by project type'}>
        {categories.map(item => <button key={item} className={filters.category === item ? 'filter-chip active' : 'filter-chip'} aria-pressed={filters.category === item} onClick={() => update('category', item)}>{labels[item]}</button>)}
      </div>
      <label className="search-box"><Search size={17}/><span className="sr-only">{t.search}</span><input value={filters.query} onChange={e => update('query', e.target.value)} placeholder={t.searchPlaceholder}/></label>
    </div>
    <div className="catalog-extra-controls">
      <label className="catalog-select-label">
        <span>{t.technologyFilter}</span>
        <select className="catalog-select" value={filters.technology} onChange={e => update('technology', e.target.value)}>
          <option value="">{t.allTechnologies}</option>
          {technologies.map(technology => <option key={technology} value={technology}>{technology}</option>)}
        </select>
      </label>
      <label className="catalog-select-label">
        <span>{t.sortBy}</span>
        <select className="catalog-select" value={filters.sort} onChange={e => update('sort', e.target.value as 'curated' | 'alphabetical')}>
          <option value="curated">{t.curatedOrder}</option>
          <option value="alphabetical">{t.alphabeticalOrder}</option>
        </select>
      </label>
      <button className="reset-filters" type="button" onClick={reset}><RotateCcw size={13}/>{t.resetFilters}</button>
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} / {projects.length}</p>
    {filtered.length ? <div className="project-grid">{filtered.map((source, index) => {
      const project = localizeProject(source, locale);
      return <article className="project-card" key={project.id}>
        <div className="card-topline"><span>0{index + 1}</span><span>{project.year}</span></div>
        <p className="eyebrow">{labels[project.category]}</p>
        <h3>{project.title}</h3><p className="project-summary">{project.summary}</p>
        <div className="tags">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="card-bottom"><button className="text-link" onClick={() => onOpen(project.id)}>{t.openCase}<ArrowUpRight size={16}/></button><span className="card-status">{project.status}</span></div>
      </article>;
    })}</div> : <p className="empty-state">{t.noResults}</p>}
  </div>;
}
