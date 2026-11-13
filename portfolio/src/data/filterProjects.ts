import type { Project, ProjectCategory } from '../types';

export type CatalogSort = 'curated' | 'alphabetical';

export interface CatalogFilters {
  category: ProjectCategory | 'all';
  query: string;
  technology: string;
  sort: CatalogSort;
}

export const defaultCatalogFilters: CatalogFilters = {
  category: 'all',
  query: '',
  technology: '',
  sort: 'curated'
};

const categories = new Set<ProjectCategory>(['product', 'platform', 'experiment', 'study']);

export function parseCatalogFilters(search: string, technologies: string[] = []): CatalogFilters {
  const params = new URLSearchParams(search);
  const rawCategory = params.get('category');
  const rawSort = params.get('sort');
  const rawTechnology = params.get('technology') ?? '';

  return {
    category: rawCategory && categories.has(rawCategory as ProjectCategory)
      ? rawCategory as ProjectCategory
      : 'all',
    query: params.get('q') ?? '',
    technology: technologies.includes(rawTechnology) ? rawTechnology : '',
    sort: rawSort === 'alphabetical' ? 'alphabetical' : 'curated'
  };
}

export function serializeCatalogFilters(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.technology) params.set('technology', filters.technology);
  if (filters.sort !== 'curated') params.set('sort', filters.sort);
  return params.toString();
}

export function filterProjects(projects: Project[], filters: CatalogFilters): Project[] {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase();

  const result = projects.filter(project => {
    const categoryMatches = filters.category === 'all' || project.category === filters.category;
    const technologyMatches = !filters.technology || project.stack.includes(filters.technology);
    const searchable = [
      project.title,
      project.summary,
      project.role,
      project.status,
      ...project.stack
    ].join(' ').toLocaleLowerCase();

    return categoryMatches && technologyMatches && searchable.includes(normalizedQuery);
  });

  if (filters.sort === 'alphabetical') {
    return [...result].sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}
