// Frontend edition data and interaction layer.
// The edition intentionally stays on the same page as the full-stack portfolio.
const frontendEdition = {
  ru: { title:'Colorful, playful, visual.', text:'Отдельная frontend-версия портфолио: больше цвета, типографики, стикеров, editorial-композиции и визуального эксперимента.', cta:'Вернуться к Full-stack ↗' },
  en: { title:'Colorful, playful, visual.', text:'A frontend-focused portfolio layer with more color, typography, stickers, editorial composition and visual experimentation.', cta:'Back to Full-stack ↗' },
  ja: { title:'Colorful, playful, visual.', text:'カラー、タイポグラフィ、ステッカー、Editorial構成を強くしたフロントエンド版ポートフォリオ。', cta:'Full-stackへ戻る ↗' }
};

function applyFrontendEditionLanguage(lang) {
  const copy = frontendEdition[lang] || frontendEdition.ru;
  const title = document.querySelector('.frontend-copy .section-title');
  const text = document.querySelector('.frontend-copy p');
  const cta = document.querySelector('.frontend-copy .button');
  if (title) title.innerHTML = copy.title.replace('Colorful, playful, visual.', 'Colorful, playful, <em>visual.</em>');
  if (text) text.textContent = copy.text;
  if (cta) cta.textContent = copy.cta;
}

window.applyFrontendEditionLanguage = applyFrontendEditionLanguage;
