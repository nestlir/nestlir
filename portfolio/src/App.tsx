import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Menu, X } from 'lucide-react';
import { copy } from './i18n';
import type { Locale } from './types';
import { projects } from './data/projects';
import { localizeProject } from './data/projectCopy';
import ProjectCatalog from './components/ProjectCatalog';
import ArchitectureMap from './components/ArchitectureMap';
import QualityCards from './components/QualityCards';
import EngineeringCenter from './components/EngineeringCenter';

const CaseStudy = lazy(() => import('./components/CaseStudy'));

export default function App() {
  const [locale, setLocale] = useState<Locale>('ru');
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useMemo(() => copy[locale], [locale]);
  const selectedProject = projects.find(p => p.id === activeCase);
  const closeCase = useCallback(() => setActiveCase(null), []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    const onHash = () => { const id = window.location.hash.slice(1); if (id.startsWith('case-')) setActiveCase(id.slice(5)); };
    window.addEventListener('hashchange', onHash); onHash();
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const openCase = (id: string) => { setActiveCase(id); window.history.replaceState(null, '', '#case-' + id); };
  const closeAndRestore = () => { closeCase(); if (window.location.hash.startsWith('#case-')) window.history.replaceState(null, '', '#work'); };
  const navigate = () => setMenuOpen(false);
  return <>
    <a className="skip-link" href="#main">{locale === 'ru' ? 'Перейти к содержимому' : 'Skip to content'}</a>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="NESTLIR home"><span className="monogram">N.</span><span>NESTLIR<small>ENGINEERING PORTFOLIO</small></span></a>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label={locale === 'ru' ? 'Основная навигация' : 'Main navigation'}>
        <a href="#work" onClick={navigate}>{t.navWork}</a><a href="#engineering" onClick={navigate}>{locale === "ru" ? "Инженерия" : "Engineering"}</a><a href="#system" onClick={navigate}>{t.navSystem}</a><a href="#quality" onClick={navigate}>{t.navQuality}</a><a href="#approach" onClick={navigate}>{t.navAbout}</a><a href="#contact" onClick={navigate}>{t.contact}</a>
      </nav>
      <div className="header-actions">
        <div className="language-toggle" role="group" aria-label={t.language}><button onClick={() => setLocale('ru')} aria-pressed={locale === 'ru'}>RU</button><button onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>EN</button></div>
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? (locale === 'ru' ? 'Закрыть меню' : 'Close menu') : (locale === 'ru' ? 'Открыть меню' : 'Open menu')} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">{t.eyebrow} <span>·</span> {t.issue}</p><p className="hero-kicker">{t.coverKicker}</p><h1>{t.coverTitle}</h1><p className="hero-description">{t.coverText}</p><a className="primary-link" href="#work">{t.explore}<ArrowDown size={17}/></a></div>
        <div className="hero-art" aria-label="Editorial portrait artwork"><div className="hero-art-frame"><img src="https://gcdn.picsart.com/picsart-mcp/94bd9f3c-b926-4eeb-a846-6230e29fad1c.png" alt="Editorial portrait illustration" fetchPriority="high"/><span>ILLUSTRATED EDITION · 2026</span></div><div className="hero-stamp">N<br/>°01</div></div>
        <div className="hero-index"><span>01</span><span>—</span><span>08</span></div>
      </section>
      <section className="section work-section" id="work"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>{t.selected}</h2><p>{t.selectedText}</p></div><span className="section-mark">N—01</span></div><ProjectCatalog t={t} locale={locale} onOpen={openCase}/></section>
      <section className="section engineering-section" id="engineering"><div className="section-heading"><div><p className="eyebrow">02 / ENGINEERING PRACTICE</p><h2>{locale === "ru" ? "Инженерные направления" : "Engineering capabilities"}</h2></div><span className="section-mark">STACK / 02</span></div><EngineeringCenter locale={locale} onOpen={openCase}/></section>
      <section className="section system-section" id="system"><div className="section-heading"><div><p className="eyebrow">02 / SYSTEM DESIGN</p><h2>{t.systemTitle}</h2><p>{t.systemText}</p></div><span className="section-mark">MAP / 02</span></div><ArchitectureMap t={t}/></section>
      <section className="section quality-section" id="quality"><div className="section-heading"><div><p className="eyebrow">03 / QUALITY ENGINEERING</p><h2>{t.qualityTitle}</h2><p>{t.qualityText}</p></div><span className="section-mark">QA / 03</span></div><QualityCards t={t}/></section>
      <section className="section approach-section" id="approach"><div className="section-heading"><div><p className="eyebrow">04 / WORKING METHOD</p><h2>{t.approachTitle}</h2></div><span className="section-mark">FLOW / 04</span></div><ol className="approach-list">{t.steps.map((step, i) => <li key={step}><span>0{i + 1}</span><strong>{step}</strong><ArrowUpRight size={17}/></li>)}</ol></section>
      <section className="contact-section" id="contact"><div><p className="eyebrow">05 / CORRESPONDENCE</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="primary-link" href="mailto:nestlir@mail.ru?subject=NESTLIR%20portfolio%20inquiry">{t.email}<ArrowUpRight size={17}/></a></div><div className="contact-links"><a href="https://github.com/nestlir" target="_blank" rel="noopener noreferrer"><Github size={17}/>{t.github}</a><a href="https://t.me/nestlir" target="_blank" rel="noopener noreferrer">↗ {t.telegram}</a></div></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#top"><span className="monogram">N.</span><span>NESTLIR<small>PORTFOLIO / 2026</small></span></a><span>{t.footer}</span><a href="https://github.com/nestlir/nestlir/tree/main/portfolio" target="_blank" rel="noopener noreferrer">SOURCE <ArrowUpRight size={14}/></a></footer>
    {selectedProject && <Suspense fallback={<div className="modal-backdrop" role="status">{t.loading}</div>}><CaseStudy project={localizeProject(selectedProject, locale)} t={t} onClose={closeAndRestore}/></Suspense>}
  </>;
}
