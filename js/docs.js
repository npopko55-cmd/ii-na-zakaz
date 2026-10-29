/* Документы (28.10.2026): язык как на главной — ?lang=ru|uz, иначе выбор из localStorage «lang» (его же пишет main.js), иначе узбекский. */
(function () {
  var d = document.documentElement, q = new URLSearchParams(location.search), saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* приватный режим */ }
  function set(lang, save) {
    d.lang = lang;
    var t = d.getAttribute('data-title-' + lang); if (t) document.title = t;
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) { /* приватный режим */ } }
  }
  var first = (q.get('lang') || saved || 'uz').toLowerCase() === 'ru' ? 'ru' : 'uz';
  set(first, !!q.get('lang'));
  document.addEventListener('DOMContentLoaded', function () { set(d.lang, false); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang]'); if (b) set(b.getAttribute('data-lang'), true);
  });
})();
