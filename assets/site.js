(() => {
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.nav');
  const syncNav = () => nav?.classList.toggle('is-scrolled', window.scrollY > 24);
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('reveal-ready');
  const items = [...document.querySelectorAll('[data-reveal]')];
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  items.forEach(el => io.observe(el));
})();


// V6.2 — Essential Intelligence independent auto-rail.
(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-auto-rail]').forEach((rail) => {
    const viewport = rail.querySelector('[data-auto-rail-viewport]');
    const items = [...rail.querySelectorAll('.essentialList > li')];
    if (!viewport || items.length < 2 || reduce) return;
    let index = 0, paused = false, timer;
    const go = () => {
      if (paused) return;
      index = (index + 1) % items.length;
      if (index === 0) viewport.scrollTo({top:0,behavior:'smooth'});
      else viewport.scrollTo({top:items[index].offsetTop - items[0].offsetTop,behavior:'smooth'});
    };
    const start = () => { clearInterval(timer); timer = setInterval(go, 4200); };
    ['mouseenter','focusin','touchstart','pointerdown'].forEach(ev => rail.addEventListener(ev, () => {paused=true;} , {passive:true}));
    ['mouseleave','focusout','touchend','pointerup'].forEach(ev => rail.addEventListener(ev, () => {paused=false;start();}, {passive:true}));
    start();
  });
})();

// V7.3 — LTH Compass: multilingual, static, privacy-friendly search.
(() => {
  const all = Array.isArray(window.LTH_SEARCH_INDEX) ? window.LTH_SEARCH_INDEX : [];
  const navin = document.querySelector('.navin');
  if (!navin || !all.length) return;
  const lang=(document.documentElement.lang||'pt-BR').toLowerCase();
  const code=lang.startsWith('zh')?'zh':lang.startsWith('es')?'es':lang.startsWith('en')?'en':'pt';
  const TXT={
    pt:{title:'Encontre a inteligência certa para a sua decisão.',sub:'Busque por assunto, mercado, destino ou decisão — inclusive por termos relacionados.',ph:'Ex.: pós-Copa, China, IA, 50+, wellness...',topics:'ASSUNTOS EM DESTAQUE',library:'BUSQUE A BIBLIOTECA',count:'análises indexadas',empty:'Qual assunto precisa estar à mão?',hint:'Digite um tema acima ou escolha um dos atalhos.',results:'RESULTADOS',none:'Nenhuma análise encontrada',local:'Busca local no acervo do Lipe Travel Hub',close:'ESC fecha · ENTER abre o primeiro resultado',chips:[['IA & agentes','IA & Agents'],['pós-Copa','Pós-Copa'],['Destination Economics','Destination Economics'],['50+ longevidade','50+'],['Wellness','Wellness'],['Luxury airport','Luxury'],['Brasil','Brasil'],['China','China']]},
    en:{title:'Find the intelligence that fits the decision in front of you.',sub:'Search by topic, market, destination or business decision — including related terms.',ph:'Try: post-World Cup, China, AI, 50+, wellness...',topics:'FEATURED TOPICS',library:'SEARCH THE LIBRARY',count:'analyses indexed',empty:'What do you need at hand?',hint:'Type a topic above or choose a shortcut.',results:'RESULTS',none:'No analysis found',local:'Local search across the Lipe Travel Hub library',close:'ESC closes · ENTER opens the first result',chips:[['AI agents','AI & Agents'],['post World Cup','Post-World Cup'],['Destination Economics','Destination Economics'],['50+ longevity','50+'],['Wellness','Wellness'],['Luxury airport','Luxury'],['Brazil','Brazil'],['China','China']]},
    es:{title:'Encuentra la inteligencia adecuada para la decisión que tienes delante.',sub:'Busca por tema, mercado, destino o decisión — también por términos relacionados.',ph:'Ej.: post-Mundial, China, IA, 50+, wellness...',topics:'TEMAS DESTACADOS',library:'BUSCAR EN LA BIBLIOTECA',count:'análisis indexados',empty:'¿Qué tema necesitas tener a mano?',hint:'Escribe un tema o elige un atajo.',results:'RESULTADOS',none:'No encontramos análisis',local:'Búsqueda local en la biblioteca de Lipe Travel Hub',close:'ESC cierra · ENTER abre el primer resultado',chips:[['IA agentes','IA & Agents'],['post Mundial','Post-Mundial'],['Destination Economics','Destination Economics'],['50+ longevidad','50+'],['Wellness','Wellness'],['Luxury airport','Luxury'],['Brasil','Brasil'],['China','China']]},
    zh:{title:'把真正有用的行业洞察，放到当前决策手边。',sub:'可按主题、市场、目的地或业务决策搜索，也支持相关表达。',ph:'例如：世界杯后、中国、AI、50+、Wellness…',topics:'重点主题',library:'搜索内容库',count:'篇分析已索引',empty:'你现在最需要理解什么？',hint:'输入主题，或直接选择快捷标签。',results:'搜索结果',none:'没有找到相关分析',local:'Lipe Travel Hub 本地内容库搜索',close:'ESC 关闭 · ENTER 打开首条结果',chips:[['AI 智能体','AI & Agents'],['世界杯后','世界杯后'],['目的地 经济','目的地经济'],['50+ 长寿','50+'],['Wellness','Wellness'],['奢华 机场','奢华旅行'],['巴西','巴西'],['中国','中国']]}
  }[code];
  const index=all.filter(x=>(x.lang||'pt')===code);
  const scriptEl=[...document.scripts].find(s=>/assets\/site\.js(?:\?|$)/.test(s.getAttribute('src')||''));
  const siteRoot=scriptEl?new URL('../',new URL(scriptEl.getAttribute('src'),document.baseURI)):new URL('./',document.baseURI);
  const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>';
  let trigger=navin.querySelector('.compassTrigger');
  if(!trigger){trigger=document.createElement('button');trigger.type='button';trigger.className='compassTrigger';trigger.innerHTML=icon+'<span>Compass</span>';const langs=navin.querySelector('.langs');navin.insertBefore(trigger,langs||navin.querySelector('.pill'));}
  trigger.setAttribute('aria-label','LTH Compass');
  const overlay=document.createElement('div'); overlay.className='compassOverlay'; overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML=`<section class="compassPanel" role="dialog" aria-modal="true" aria-labelledby="compass-title"><button type="button" class="compassClose" aria-label="Close">×</button><header class="compassHeader"><div class="ey">LTH COMPASS</div><h2 id="compass-title">${TXT.title}</h2><p>${TXT.sub}</p></header><div class="compassSearchBox">${icon}<input type="search" autocomplete="off" spellcheck="false" aria-label="Search" placeholder="${TXT.ph}"><span class="compassShortcut">⌘ K</span></div><div class="compassTopics"><span>${TXT.topics}</span>${TXT.chips.map(c=>`<button class="compassChip" data-q="${c[0]}">${c[1]}</button>`).join('')}</div><div class="compassResults" aria-live="polite"></div><footer class="compassFoot"><span><i class="compassMark"></i>${TXT.local}</span><span>${TXT.close}</span></footer></section>`;
  document.body.appendChild(overlay);
  const panel=overlay.querySelector('.compassPanel'),closeBtn=overlay.querySelector('.compassClose'),input=overlay.querySelector('input'),results=overlay.querySelector('.compassResults'),shortcut=overlay.querySelector('.compassShortcut'); if(!/Mac|iPhone|iPad/.test(navigator.platform||'')) shortcut.textContent='Ctrl K';
  const normalize=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9+\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g,' ').trim();
  const esc=s=>(s||'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const expand=raw=>{let q=normalize(raw);const syn=[[/pos copa|post world cup|post mundial|世界杯/, ' world cup mundial copa legado 世界杯 '],[/\bia\b|\bai\b|智能体|人工智能/, ' ai ia agentic agents agentes 智能体 人工智能 '],[/50\+|longevity|longevidad|长寿/, ' 50+ longevity longevidad senior 长寿 银发 '],[/coreia|korea|hallyu|韩流|韩国/, ' korea coreia hallyu seoul 韩流 韩国 '],[/wellness|bienestar|健康/, ' wellness wellbeing bienestar 健康 '],[/luxury|luxo|lujo|奢华/, ' luxury luxo lujo premium 奢华 '],[/brasil|brazil|巴西/, ' brasil brazil 巴西 '],[/china|中国/, ' china 中国 '],[/distribution|distribuicao|distribución|分销/, ' distribution distribuicao distribucion 分销 ota merchant marketplace ']];syn.forEach(([r,a])=>{if(r.test(q))q+=a});return normalize(q)};
  const score=(item,raw)=>{const q0=normalize(raw),q=expand(raw);if(!q0)return 0;const fields=[normalize(item.title),normalize(item.kicker),normalize(item.description),normalize(item.aliases),normalize(item.context)];const hay=fields.join(' ');let sc=0;if(fields[0].includes(q0))sc+=120;if(fields[3].includes(q0))sc+=90;if(hay.includes(q0))sc+=35;[...new Set(q.split(' ').filter(Boolean))].forEach(t=>{if(fields[0].includes(t))sc+=22;else if(fields[3].includes(t))sc+=16;else if(fields[1].includes(t))sc+=12;else if(fields[2].includes(t))sc+=8;else if(fields[4].includes(t))sc+=4});return sc};
  const defaultView=()=>results.innerHTML=`<div class="compassResultHead"><span>${TXT.library}</span><span>${index.length} ${TXT.count}</span></div><div class="compassEmpty"><strong>${TXT.empty}</strong>${TXT.hint}</div>`;
  const render=raw=>{const q=raw.trim();if(!q)return defaultView();const found=index.map(item=>({item,score:score(item,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8);if(!found.length){results.innerHTML=`<div class="compassResultHead"><span>${TXT.results}</span><span>0</span></div><div class="compassEmpty"><strong>${TXT.none}: “${esc(q)}”.</strong>${TXT.hint}</div>`;return;}results.innerHTML=`<div class="compassResultHead"><span>${TXT.results}</span><span>${found.length}</span></div><div class="compassResultList">${found.map(({item})=>`<a class="compassResult" href="${new URL(item.url,siteRoot).href}"><div><small>${esc(item.kicker)}</small><strong>${esc(item.title)}</strong><p>${esc(item.description)}</p></div><b>→</b></a>`).join('')}</div>`};
  const open=(prefill='')=>{overlay.classList.add('isOpen');overlay.setAttribute('aria-hidden','false');document.body.classList.add('compassOpen');if(prefill)input.value=prefill;render(input.value);setTimeout(()=>input.focus(),40)};const close=()=>{overlay.classList.remove('isOpen');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('compassOpen')};
  trigger.addEventListener('click',()=>open()); closeBtn.addEventListener('click',close); overlay.addEventListener('mousedown',e=>{if(e.target===overlay)close()});panel.addEventListener('mousedown',e=>e.stopPropagation());input.addEventListener('input',()=>render(input.value));overlay.querySelectorAll('.compassChip').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.q;render(input.value);input.focus()}));document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}else if(e.key==='Escape'&&overlay.classList.contains('isOpen'))close();else if(e.key==='Enter'&&overlay.classList.contains('isOpen')){const first=results.querySelector('.compassResult');if(first&&document.activeElement===input)first.click()}});
  document.querySelectorAll('[data-open-compass]').forEach(b=>b.addEventListener('click',()=>open()));document.querySelectorAll('[data-compass-query]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.compassQuery||b.textContent.trim())));
  defaultView();
})();


// V7.5 — narrative motion only where CSS needs viewport timing.
(() => {
  const targets=[...document.querySelectorAll('[data-market-bridge]')];
  if(!targets.length) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){targets.forEach(el=>el.classList.add('is-active'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-active');obs.unobserve(entry.target);}
    });
  },{threshold:.32});
  targets.forEach(el=>observer.observe(el));
})();
