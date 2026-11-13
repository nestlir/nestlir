import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { filterProjects } from './filterProjects';

describe('filterProjects', () => {
  it('returns all projects for an empty all-filter query', () => {
    expect(filterProjects(projects, 'all', '')).toHaveLength(projects.length);
  });
  it('filters by category without mixing educational work into products', () => {
    expect(filterProjects(projects, 'study', '')).toHaveLength(5);
    expect(filterProjects(projects, 'product', '').map(p => p.id)).toEqual(['datavac', 'nomad-quiet-kyoto', 'momoha']);
    expect(filterProjects(projects, 'platform', '').map(p => p.id)).toEqual(['50-projects-lab']);
  });
  it('searches names and technology tags case-insensitively', () => {
    expect(filterProjects(projects, 'all', 'rEdUx').map(p => p.id)).toEqual(['stellar-burger']);
    expect(filterProjects(projects, 'all', ' furniture ').map(p => p.id)).toEqual(['furniture-store']);
  });
  it('returns an empty list for an unmatched query', () => {
    expect(filterProjects(projects, 'all', 'not-a-real-project')).toEqual([]);
  });
});
