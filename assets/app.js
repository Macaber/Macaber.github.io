(() => {
  const root = document.documentElement;
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
  });
  window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--mouse-x', `${event.clientX}px`);
    root.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  const clock = document.querySelector('[data-clock]');
  const tick = () => { if (clock) clock.textContent = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()); };
  tick(); setInterval(tick, 1000);
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  const dataNode = document.querySelector('#docs-data');
  const list = document.querySelector('[data-docs-list]');
  if (!dataNode || !list) return;
  let docs = [];
  try { docs = JSON.parse(dataNode.textContent); } catch (_) {}
  const count = document.querySelector('[data-doc-count]');
  const empty = document.querySelector('[data-empty-state]');
  const escape = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const render = (items) => {
    if (count) count.textContent = String(items.length).padStart(2, '0');
    if (empty) empty.hidden = items.length > 0;
    list.innerHTML = items.map((doc, index) => `<a class="doc-card" href="${escape(doc.url)}"><div class="doc-card-top"><span class="doc-card-index">${String(index + 1).padStart(2, '0')}</span><span class="doc-arrow">↗</span></div><div class="doc-meta"><span>${escape(doc.date || '随笔')}</span><div class="doc-tags">${(doc.tags || []).slice(0, 2).map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div><div class="doc-copy"><h3>${escape(doc.title)}</h3><p>${escape(doc.description || '一篇来自 Macaber 的笔记。')}</p></div><span class="doc-read">阅读文章 <b>›</b></span></a>`).join('');
  };
  render(docs);
  const input = document.querySelector('#doc-search');
  input?.addEventListener('input', () => { const query = input.value.trim().toLocaleLowerCase(); render(docs.filter((doc) => [doc.title, doc.description, ...(doc.tags || [])].join(' ').toLocaleLowerCase().includes(query))); });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement !== input) { event.preventDefault(); input?.focus(); }
    if (event.key === 'Escape' && document.activeElement === input) { input.value = ''; input.blur(); render(docs); }
  });
})();
