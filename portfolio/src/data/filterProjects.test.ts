import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import {
  defaultCatalogFilters,
  filterProjects,
  parseCatalogFilters,
  serializeCatalogFilters
} from './filterProjects';

describe('filterProjects', () => {
  it('returns all projects for the default catalogue state', () => {
    expect(filterProjects(projects, defaultCatalogFilters)).toHaveLength(projects.length);
  });

  it('filters by category without mixing educational work into products', () => {
    expect(filterProjects(projects, { ...defaultCatalogFilters, category: 'study' })).toHaveLength(5);
    expect(filterProjects(projects, { ...defaultCatalogFilters, category: 'product' }).map(p => p.id))
      .toEqual(['datavac', 'nomad-quiet-kyoto', 'momoha']);
    expect(filterProjects(projects, { ...defaultCatalogFilters, category: 'platform' }).map(p => p.id))
      .toEqual(['50-projects-lab']);
  });

  it('searches names and technology tags case-insensitively', () => {
    expect(filterProjects(projects, { ...defaultCatalogFilters, query: 'rEdUx' }).map(p => p.id))
      .toEqual(['stellar-burger']);
    expect(filterProjects(projects, { ...defaultCatalogFilters, query: ' furniture ' }).map(p => p.id))
      .toEqual(['furniture-store']);
  });

  it('filters by a selected technology', () => {
    expect(filterProjects(projects, { ...defaultCatalogFilters, technology: 'Node.js' }).map(p => p.id))
      .toEqual(['nomad-quiet-kyoto', 'momoha']);
  });

  it('combines category, technology and search filters', () => {
    expect(filterProjects(projects, {
      ...defaultCatalogFilters,
      category: 'product',
      technology: 'TypeScript',
      query: 'vaccine'
    }).map(p => p.id)).toEqual(['datavac']);
  });

  it('sorts results alphabetically without mutating the source list', () => {
    const result = filterProjects(projects, { ...defaultCatalogFilters, sort: 'alphabetical' });
    expect(result.map(p => p.title)).toEqual([...result.map(p => p.title)].sort((a, b) => a.localeCompare(b)));
    expect(projects[0].id).toBe('datavac');
  });

  it('returns an empty list for an unmatched query', () => {
    expect(filterProjects(projects, { ...defaultCatalogFilters, query: 'not-a-real-project' })).toEqual([]);
  });
});

describe('catalog URL state', () => {
  const technologies = ['Node.js', 'React', 'TypeScript'];

  it('parses valid catalogue filters from the URL', () => {
    expect(parseCatalogFilters('?category=product&q=api&technology=TypeScript&sort=alphabetical', technologies))
      .toEqual({ category: 'product', query: 'api', technology: 'TypeScript', sort: 'alphabetical' });
  });

  it('ignores invalid category, technology and sort values', () => {
    expect(parseCatalogFilters('?category=unknown&technology=Unknown&sort=recent', technologies))
      .toEqual(defaultCatalogFilters);
  });

  it('serializes only non-default values for shareable URLs', () => {
    expect(serializeCatalogFilters({
      category: 'product',
      query: '  vaccine ',
      technology: 'TypeScript',
      sort: 'alphabetical'
    })).toBe('category=product&q=vaccine&technology=TypeScript&sort=alphabetical');
    expect(serializeCatalogFilters(defaultCatalogFilters)).toBe('');
  });
});
