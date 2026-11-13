import { useEffect, useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../types';
import type { copy } from '../i18n';

type T = typeof copy.ru;
export default function CaseStudy({ project, t, onClose }: { project: Project; t: T; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title">
      <button ref={closeButton} className="icon-button modal-close" onClick={onClose} aria-label={t.close}><X size={20}/></button>
      <p className="eyebrow">{project.year} · {project.category.toUpperCase()}</p>
      <h2 id="case-title">{project.title}</h2>
      <p className="case-lead">{project.summary}</p>
      <div className="case-meta"><span>{t.role}</span><strong>{project.role}</strong></div>
      <section><h3>{t.context}</h3><p>{project.context}</p></section>
      <section><h3>{t.decisions}</h3><ol>{project.decisions.map(item => <li key={item}>{item}</li>)}</ol></section>
      <section><h3>{t.contribution}</h3><p>{project.contribution}</p></section>
      <section><h3>{t.evidence}</h3><ul>{project.evidence.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section><h3>{t.stack}</h3><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></section>
      <p className="case-disclaimer">{t.caseDisclaimer}</p>
      {project.links.map(link => <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={15}/></a>)}
    </section>
  </div>;
}
