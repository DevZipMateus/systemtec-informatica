// ========================================
// GAMER ZONE — Carrossel + Lightbox
// ========================================

(function () {
  const TOTAL_IMAGENS = 21;
  const imagens = Array.from({ length: TOTAL_IMAGENS }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `img/gamer/gamer-${n}.jpg`;
  });

  // ===== PARTÍCULAS DE FUNDO =====
  const particlesEl = document.getElementById('gzParticles');
  if (particlesEl) {
    const cores = ['#A9FF3A', '#00e5ff', '#ff2ec2', '#ff9900'];
    const total = window.innerWidth < 700 ? 14 : 26;
    for (let i = 0; i < total; i++) {
      const p = document.createElement('div');
      p.className = 'gz-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.color = cores[i % cores.length];
      p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      const duration = 9 + Math.random() * 10;
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = -(Math.random() * duration) + 's';
      particlesEl.appendChild(p);
    }
  }

  // ===== CARROSSEL =====
  const track = document.getElementById('gzTrack');
  const dotsWrap = document.getElementById('gzDots');
  const btnPrev = document.getElementById('gzPrev');
  const btnNext = document.getElementById('gzNext');

  if (!track) return;

  imagens.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'gz-slide';
    slide.dataset.index = i;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Produto gamer Systemtecshop ${i + 1}`;
    img.loading = i === 0 ? 'eager' : 'lazy';

    const expandIco = document.createElement('span');
    expandIco.className = 'gz-slide-expand';
    expandIco.innerHTML = '<i class="fas fa-expand"></i>';

    slide.appendChild(img);
    slide.appendChild(expandIco);
    slide.addEventListener('click', () => openLightbox(i));
    track.appendChild(slide);

    if (dotsWrap) {
      const dot = document.createElement('button');
      dot.className = 'gz-dot';
      dot.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
      dot.addEventListener('click', () => scrollToSlide(i));
      dotsWrap.appendChild(dot);
    }
  });

  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function updateActiveDot() {
    const slideWidth = track.clientWidth;
    const index = Math.round(track.scrollLeft / slideWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    return index;
  }

  function scrollToSlide(i) {
    track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  }

  track.addEventListener('scroll', () => {
    clearTimeout(track._scrollTimer);
    track._scrollTimer = setTimeout(updateActiveDot, 80);
  });

  if (btnPrev) btnPrev.addEventListener('click', () => {
    const current = Math.round(track.scrollLeft / track.clientWidth);
    scrollToSlide(Math.max(0, current - 1));
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    const current = Math.round(track.scrollLeft / track.clientWidth);
    scrollToSlide(Math.min(imagens.length - 1, current + 1));
  });

  window.addEventListener('resize', updateActiveDot);
  updateActiveDot();

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('gzLightbox');
  const lightboxImg = document.getElementById('gzLightboxImg');
  const lightboxCounter = document.getElementById('gzLightboxCounter');
  const lightboxClose = document.getElementById('gzLightboxClose');
  const lightboxPrev = document.getElementById('gzLightboxPrev');
  const lightboxNext = document.getElementById('gzLightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    lightboxImg.src = imagens[currentIndex];
    lightboxImg.alt = `Produto gamer Systemtecshop ${currentIndex + 1}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${imagens.length}`;
  }

  function lightboxStep(delta) {
    currentIndex = (currentIndex + delta + imagens.length) % imagens.length;
    renderLightbox();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => lightboxStep(-1));
  lightboxNext.addEventListener('click', () => lightboxStep(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxStep(-1);
    if (e.key === 'ArrowRight') lightboxStep(1);
  });
})();
