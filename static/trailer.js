// Tráileres de Steam (vienen en formato HLS). Safari los abre solo; en los demás se usa hls.js al darle play.
document.querySelectorAll('video[data-hls]').forEach(v => {
  const src = v.dataset.hls;
  if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = src; return; }
  v.addEventListener('play', function cargar() {
    v.removeEventListener('play', cargar);
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js';
    s.onload = () => { if (window.Hls && Hls.isSupported()) { const h = new Hls(); h.loadSource(src); h.attachMedia(v); h.on(Hls.Events.MANIFEST_PARSED, () => v.play()); } };
    document.head.appendChild(s);
  });
});
