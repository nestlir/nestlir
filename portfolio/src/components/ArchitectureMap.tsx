import { useState } from 'react';
import { ArrowDown, ArrowRight, Layers3, Server, Database, GitBranch } from 'lucide-react';
import type { copy } from '../i18n';
type T = typeof copy.ru;
const nodes = [
  { id: 'frontend', icon: Layers3, title: 'frontend', desc: 'frontendDesc', detail: 'src/App.tsx · components · local UI state' },
  { id: 'api', icon: Server, title: 'api', desc: 'apiDesc', detail: 'No active server. A future integration must define validation, rate limits and error contracts.' },
  { id: 'data', icon: Database, title: 'data', desc: 'dataDesc', detail: 'src/data/projects.ts · src/i18n.ts · typed content' },
  { id: 'delivery', icon: GitBranch, title: 'delivery', desc: 'deliveryDesc', detail: 'GitHub Actions · build checks · browser suite · Pages artifact' }
] as const;
export default function ArchitectureMap({ t }: { t: T }) {
  const [active, setActive] = useState('frontend');
  const descriptions: Record<string, string> = { frontend: t.frontendDesc, api: t.apiDesc, data: t.dataDesc, delivery: t.deliveryDesc };
  return <div className="architecture">
    <div className="architecture-flow">
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return <div className="architecture-step" key={node.id}>
          <button className={active === node.id ? 'architecture-node selected' : 'architecture-node'} onClick={() => setActive(node.id)} aria-pressed={active === node.id}>
            <span className="node-icon"><Icon size={20}/></span><span className="node-name">{t[node.title]}</span><span className="node-desc">{descriptions[node.id]}</span>
          </button>
          {index < nodes.length - 1 && <span className="flow-arrow"><ArrowRight size={18}/><ArrowDown size={18}/></span>}
        </div>;
      })}
    </div>
    <div className="architecture-detail" aria-live="polite"><span className="eyebrow">SELECTED LAYER · {active.toUpperCase()}</span><p>{nodes.find(n => n.id === active)?.detail}</p></div>
    <p className="architecture-note">Frontend → API boundary → data contracts → delivery. The API and database boxes are intentionally marked as future boundaries, not implemented services.</p>
  </div>;
}
