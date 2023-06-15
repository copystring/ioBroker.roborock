var n = !('undefined' == typeof window || !window.document || !window.document.createElement),
  t = {
    canUseDOM: n,
    canUseWorkers: 'undefined' != typeof Worker,
    canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
    canUseViewport: n && !!window.screen,
    isInWorker: !n,
  };
module.exports = t;
