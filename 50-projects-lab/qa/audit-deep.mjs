import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root=resolve(fileURLToPath(new URL('.',import.meta.url)),'..');
const dir=resolve(root,'projects');
const out=resolve(root,'qa-report.json');
const sha=s=>createHash('sha256').update(s).digest('hex');
const folders=readdirSync(dir,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name).sort();
const results=[], groups=new Map();

for(const folder of folders){
 const p=resolve(dir,folder), paths={html:resolve(p,'index.html'),css:resolve(p,'style.css'),js:resolve(p,'script.js')};
 const r={folder,passed:true,files:{indexHtml:existsSync(paths.html),styleCss:existsSync(paths.css),scriptJs:existsSync(paths.js)},duplicate:false,fakeDemo:false,externalApi:false,interaction:{detected:false,events:[]},reasons:[]};
 if(!r.files.indexHtml){r.passed=false;r.reasons.push('missing index.html');results.push(r);continue}
 const html=readFileSync(paths.html,'utf8'),css=r.files.styleCss?readFileSync(paths.css,'utf8'):'' ,js=r.files.scriptJs?readFileSync(paths.js,'utf8'):'';
 const all=html+'\n'+css+'\n'+js;
 if(!r.files.styleCss&&!/<style\b/i.test(html)){r.passed=false;r.reasons.push('missing style.css or inline style')}
 if(!r.files.scriptJs&&!/<script\b[^>]*>/i.test(html)){r.passed=false;r.reasons.push('missing script.js or inline script')}
 const events=['click','input','change','submit','keydown','keyup','dragstart','dragover','drop','pointerdown','pointerup','mouseenter','mouseleave','touchstart'];
 r.interaction.events=events.filter(e=>new RegExp('addEventListener\\s*\\(\\s*["\\\']'+e+'|on'+e,'i').test(all));
 r.interaction.detected=r.interaction.events.length>0;
 if(!r.interaction.detected){r.passed=false;r.reasons.push('no user interaction handlers detected')}
 const frames=[...all.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)].map(m=>m[1]).filter(u=>/^https?:\/\//i.test(u));
 if(frames.length){r.fakeDemo=true;r.passed=false;r.reasons.push('external iframe demo dependency')}
 const fetches=[...all.matchAll(/\bfetch\s*\(\s*[\`"']([^\`"']+)/g)].map(m=>m[1]);
 if(fetches.length||/\b(XMLHttpRequest|axios|WebSocket|EventSource)\b/.test(all)){r.externalApi=true;r.reasons.push('external API/network code detected')}
 if(/Interactive application workspace|Click, hover and interact with this local implementation|Action completed ✓/i.test(all)){r.fakeDemo=true;r.passed=false;r.reasons.push('generic/fake demo marker detected')}
 const h=sha(all);groups.set(h,[...(groups.get(h)||[]),folder]);results.push(r);
}
const duplicateGroups=[];
for(const [hash,projects] of groups)if(projects.length>1){duplicateGroups.push({hash,projects});for(const folder of projects){const r=results.find(x=>x.folder===folder);r.duplicate=true;r.passed=false;r.reasons.push('duplicate project implementation shared by: '+projects.join(', '))}}
const report={generatedAt:new Date().toISOString(),totals:{projects:results.length,passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed).length,fakeDemos:results.filter(x=>x.fakeDemo).length,externalApis:results.filter(x=>x.externalApi).length,noInteraction:results.filter(x=>!x.interaction.detected).length},projects:results,duplicateGroups};
writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report.totals,null,2));
if(report.totals.failed)process.exitCode=1;
