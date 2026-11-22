// Permite instalar el sitio en el celular como app (sin tienda) y abrirlo sin internet con lo último visto.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register((document.body.dataset.base || '') + '/sw.js').catch(() => { });
}
