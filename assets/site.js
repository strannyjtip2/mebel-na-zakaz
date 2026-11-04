/* ==== ГЛАВНЫЕ НАСТРОЙКИ — меняйте здесь ==== */
const CONFIG = {
  brand: '[Название студии]',          // условное название — заменить
  master: 'Тагир Магомедов',
  phoneDisplay: '+7 963 373-17-67',
  phoneDigits: '79633731767',
  telegram: 'https://t.me/+79633731767',
  cities: 'Каспийск и Махачкала'
};
/* ============================================ */
document.documentElement.classList.add('js');
const waUrl = (t) => `https://wa.me/${CONFIG.phoneDigits}` + (t ? `?text=${encodeURIComponent(t)}` : '');

document.querySelectorAll('[data-brand]').forEach(e => e.textContent = CONFIG.brand);
document.querySelectorAll('[data-master]').forEach(e => e.textContent = CONFIG.master);
document.querySelectorAll('[data-phone]').forEach(e => { e.textContent = CONFIG.phoneDisplay; e.href = 'tel:+' + CONFIG.phoneDigits; });
document.querySelectorAll('[data-wa]').forEach(e => e.href = waUrl('Здравствуйте! Хочу рассчитать проект мебели.'));
document.querySelectorAll('[data-tg]').forEach(e => e.href = CONFIG.telegram);

// header
const header = document.querySelector('header');
const fab = document.querySelector('.fab');
const onScroll = () => {
  header.classList.toggle('solid', scrollY > 40);
  fab.classList.toggle('show', scrollY > innerHeight * .7);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// burger
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const o = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', o);
});
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

// reveal
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// form -> WhatsApp / Telegram (без сервера)
const form = document.getElementById('lead');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const f = new FormData(form);
  const text = `Заявка с сайта\nИмя: ${f.get('name')}\nТелефон: ${f.get('phone')}\nЧто нужно: ${f.get('type')}\nГород: ${f.get('city')}\nКомментарий: ${f.get('msg') || '—'}`;
  const via = ev.submitter && ev.submitter.dataset.via;
  if (via === 'tg') { navigator.clipboard && navigator.clipboard.writeText(text).catch(() => {}); window.open(CONFIG.telegram, '_blank', 'noopener'); }
  else window.open(waUrl(text), '_blank', 'noopener');
  const ok = form.querySelector('.ok'); ok.style.display = 'block';
});
