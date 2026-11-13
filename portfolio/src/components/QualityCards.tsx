import { Gauge, ShieldCheck, TestTube2 } from 'lucide-react';
import type { copy } from '../i18n';
type T = typeof copy.ru;
export default function QualityCards({ t }: { t: T }) {
  const items = [
    { icon: TestTube2, title: t.tests, text: t.testsText, demo: t.testsDemo, meta: 'Vitest · Playwright' },
    { icon: ShieldCheck, title: t.security, text: t.securityText, demo: t.securityDemo, meta: 'OWASP-minded · no client secrets' },
    { icon: Gauge, title: t.performance, text: t.performanceText, demo: t.performanceDemo, meta: 'Vite · bundle budget · Web Vitals' }
  ];
  return <div className="quality-grid">{items.map(({ icon: Icon, title, text, demo, meta }, i) => <article className="quality-card" key={title}><div className="quality-icon"><Icon size={22}/></div><span className="eyebrow">0{i + 1} / QUALITY</span><h3>{title}</h3><p>{text}</p><details className="quality-demo"><summary>{t.inspect}</summary><p>{demo}</p></details><small>{meta}</small></article>)}</div>;
}
