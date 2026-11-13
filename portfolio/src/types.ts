export type Locale = 'ru' | 'en';
export type ProjectCategory = 'product' | 'experiment' | 'study';
export interface Project {
  id: string; title: string; category: ProjectCategory; year: string;
  role: string; summary: string; stack: string[]; status: string;
  context: string; decisions: string[]; contribution: string;
  evidence: string[]; links: { label: string; href: string }[];
}
