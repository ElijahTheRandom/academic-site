// Theme toggle — runs on every page
(function() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* localStorage unavailable */ }
  });
})();

// Image modal — only on pages that include the modal markup
(function() {
  const fallback = 'assets/fallback_poster.svg';
  const modal = document.getElementById('imgModal');
  if (!modal) return;
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = modal.querySelector('.modal-close');

  function applyImageConstraints() {
    modalImg.style.maxHeight = '82vh';
    modalImg.style.width = 'auto';
    modalImg.style.objectFit = 'contain';
  }

  document.querySelectorAll('.block-image').forEach(btn => {
    const img = btn.querySelector('img');
    if (!img.getAttribute('src')) img.src = fallback;
    img.addEventListener('error', () => { img.src = fallback; });
    btn.addEventListener('click', () => {
      const full = btn.getAttribute('data-full') || img.src || fallback;
      modalImg.src = full;
      modalImg.alt = img.alt || 'Expanded image';
      const captionSource = btn.parentElement.querySelector('h3');
      modalCaption.textContent = captionSource ? captionSource.textContent : '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      applyImageConstraints();
      closeBtn.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  window.addEventListener('resize', () => {
    if (modal.classList.contains('open')) applyImageConstraints();
  });
})();
