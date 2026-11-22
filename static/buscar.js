// Buscador (funciona igual en la PC y en GitHub Pages)
(async () => {
  const caja = document.getElementById('resultados');
  const base = caja.dataset.base || '';
  const q = new URLSearchParams(location.search).get('q') || '';
  document.getElementById('q').value = q;
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  if (!q.trim()) { caja.innerHTML = '<p class="vacio">Escribe el nombre de un juego.</p>'; return; }
  let datos = [];
  try { datos = await (await fetch(base + '/search.json')).json(); } catch { caja.innerHTML = '<p class="vacio">No se pudo cargar el buscador.</p>'; return; }
  const palabras = norm(q).split(/\s+/).filter(Boolean);
  const hallados = datos.filter(g => { const t = norm([g.t, g.g, ...g.e, ...g.c].join(' ')); return palabras.every(p => t.includes(p)); });
  caja.innerHTML = `<p class="meta">${hallados.length} resultado(s) para «${esc(q)}»</p>` + (hallados.length ? '<div class="grid">' + hallados.slice(0, 120).map(g => `<article class="card"><a href="${base}${esc(g.u)}"><div class="card-img${g.k === 'p' ? ' poster' : ''}">${g.p ? `<img src="${esc(g.p)}" alt="" loading="lazy">` : '<div class="sin-img">Sin portada</div>'}</div><div class="card-body"><h2>${esc(g.t)}</h2>${g.g ? `<p class="meta">${esc(g.g)}</p>` : ''}<div class="tiendas-mini">${g.e.map(e => `<span class="t">${esc(e)}</span>`).join('')}</div></div></a></article>`).join('') + '</div>' : '<p class="vacio">No encontramos ese juego. Prueba con otra palabra.</p>');
})();
