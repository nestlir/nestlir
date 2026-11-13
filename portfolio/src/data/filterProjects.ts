import type { Project, ProjectCategory } from '../types';

export function filterProjects(projects: Project[], category: ProjectCategory | 'all', query: string): Project[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return projects.filter(project => {
    const categoryMatches = category === 'all' || project.category === category;
    const searchable = [project.title, project.summary, project.role, ...project.stack].join(' ').toLocaleLowerCase();
    return categoryMatches && searchable.includes(normalizedQuery);
  });
}
