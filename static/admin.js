// Panel de Brizna Juegos
const csrf = document.body.dataset.csrf;

document.addEventListener('submit', e => {
  const f = e.target.closest('form.confirmar');
  if (f && !confirm(f.dataset.pregunta || '¿Seguro?')) e.preventDefault();
});

document.addEventListener('click', e => {
  if (e.target.matches('.quitar')) {
    const fila = e.target.closest('.fila-enlace');
    if (document.querySelectorAll('.fila-enlace').length > 1) fila.remove();
    else fila.querySelectorAll('input,select').forEach(x => (x.value = ''));
  }
  if (e.target.id === 'agregar-enlace') {
    const t = document.getElementById('plantilla-enlace');
    document.getElementById('enlaces').appendChild(t.content.cloneNode(true));
  }
});

const leer = file => new Promise((ok, mal) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = mal; r.readAsDataURL(file); });

document.addEventListener('change', async e => {
  const input = e.target;
  if (!input.matches('input[type=file][data-destino]')) return;
  const destino = document.getElementById(input.dataset.destino);
  for (const file of input.files) {
    try {
      const r = await fetch('/admin/subir', { method: 'POST', headers: { 'content-type': 'application/json', 'x-csrf': csrf }, body: JSON.stringify({ datos: await leer(file) }) });
      const j = await r.json();
      if (!r.ok) { alert(j.error || 'No se pudo subir.'); continue; }
      if (destino.tagName === 'TEXTAREA') destino.value = (destino.value.trim() ? destino.value.trim() + '\n' : '') + j.ruta;
      else {
        destino.value = j.ruta;
        const p = document.getElementById('previa-' + destino.id);
        if (p) { p.src = j.ruta; p.hidden = false; }
      }
    } catch { alert('No se pudo subir la imagen.'); }
  }
  input.value = '';
});
