// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));
}

// Copy shareable summary (homepage)
const copyBtn = document.getElementById('copy-btn');
if (copyBtn) {
  const status = document.querySelector('.copy-status');
  const textEl = document.getElementById('share-text');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textEl.textContent);
      status.textContent = 'Copied!';
    } catch {
      const r = document.createRange();
      r.selectNodeContents(textEl);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      status.textContent = 'Press Ctrl+C to copy.';
    }
    setTimeout(() => { status.textContent = ''; }, 3000);
  });
}

// Contact page: topic buttons preselect "How can we help?"
const form = document.getElementById('contact-form');
if (form) {
  const select = document.getElementById('help');
  const paths = document.querySelectorAll('.path');
  const choose = topic => {
    if (![...select.options].some(o => o.value === topic)) return;
    select.value = topic;
    paths.forEach(p => p.setAttribute('aria-pressed', String(p.dataset.topic === topic)));
  };
  paths.forEach(p => p.addEventListener('click', () => {
    choose(p.dataset.topic);
    document.getElementById('fn').focus();
  }));
  select.addEventListener('change', () => choose(select.value));
  const fromUrl = new URLSearchParams(location.search).get('topic');
  if (fromUrl) choose(fromUrl);

  form.addEventListener('submit', e => {
    e.preventDefault();
    form.querySelector('.form-status').innerHTML =
      'This concept form doesn’t send messages. Please use the <a href="https://www.pineprogram.org/get-info">official PINE contact form</a>.';
  });
}
