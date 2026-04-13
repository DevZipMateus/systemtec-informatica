// ========================================
// SYSTEMTECSHOP — JavaScript
// ========================================

// ===== MENU MOBILE =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    mobileNav.setAttribute('aria-hidden', !mobileNav.classList.contains('active'));
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  if (scrollTop > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }

  lastScrollTop = scrollTop;
});

// ===== FORMULÁRIO DE CONTATO =====
const contatoForm = document.getElementById('contatoForm');

if (contatoForm) {
  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Coletar dados
    const formData = new FormData(contatoForm);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      telefone: formData.get('telefone'),
      assunto: formData.get('assunto'),
      mensagem: formData.get('mensagem'),
      timestamp: new Date().toISOString()
    };

    // Verificar preenchimento obrigatório
    if (!data.nome || !data.email || !data.assunto || !data.mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Enviar para servidor (aqui você pode integrar com um backend)
      console.log('Formulário enviado:', data);

      // Feedback ao usuário
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      contatoForm.reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  });
}

// ===== ANIMAÇÃO DE ELEMENTOS AO SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos da grid de produtos
document.querySelectorAll('.produto-card, .sobre-card, .depoimento-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== SMOOTH SCROLL PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));

      window.scrollTo({
        top: target.offsetTop - (headerHeight + 20),
        behavior: 'smooth'
      });
    }
  });
});

// ===== RASTREAMENTO DE CLIQUES NO WHATSAPP (GTM) =====
const whatsappButton = document.getElementById('whatsappBtn');
if (whatsappButton) {
  whatsappButton.addEventListener('click', () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'click_whatsapp',
        'event_category': 'engagement',
        'event_label': 'WhatsApp Button'
      });
    }
  });
}

// Também rastrear todos os links WhatsApp
document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
  link.addEventListener('click', () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'click_whatsapp',
        'event_category': 'engagement',
        'event_label': 'WhatsApp Link'
      });
    }
  });
});

// ===== VALIDAÇÃO DE CAMPOS DO FORMULÁRIO =====
const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('blur', () => {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      emailInput.style.borderColor = '#ff0000';
      emailInput.setAttribute('aria-invalid', 'true');
    } else {
      emailInput.style.borderColor = '';
      emailInput.setAttribute('aria-invalid', 'false');
    }
  });
}

// ===== CONTADOR DE CARACTERES (opcional) =====
const mensagemInput = document.getElementById('mensagem');
if (mensagemInput) {
  mensagemInput.addEventListener('input', (e) => {
    const chars = e.target.value.length;
    // Você pode adicionar um display de contagem aqui
    console.log(`Caracteres: ${chars}`);
  });
}

// ===== CARROSSEL DE GALERIA =====
class Carrossel {
  constructor() {
    this.wrapper = document.getElementById('carrosselWrapper');
    this.dotsContainer = document.querySelector('.carrossel-dots');
    this.btnPrev = document.querySelector('.carrossel-prev');
    this.btnNext = document.querySelector('.carrossel-next');

    if (!this.wrapper || !this.dotsContainer) return;

    // Lista das imagens existentes na pasta
    this.imagens = [
      'midia_1.jpg', 'midia_2.jpg',
      'midia_12.png', 'midia_19.png', 'midia_20.png',
      'midia_21.jpg', 'midia_22.png', 'midia_23.jpg', 'midia_24.png',
      'midia_25.jpg', 'midia_26.jpg', 'midia_27.png', 'midia_28.png',
      'midia_29.png', 'midia_30.png', 'midia_31.png', 'midia_32.png',
      'midia_33.png', 'midia_34.png', 'midia_35.png', 'midia_36.jpg',
      'midia_37.png', 'midia_38.png', 'midia_39.png', 'midia_40.jpg',
      'midia_41.png', 'midia_42.jpg', 'midia_43.png', 'midia_44.jpg',
      'midia_45.jpg', 'midia_46.png', 'midia_47.png'
    ];

    this.slideAtual = 0;
    this.totalSlides = this.imagens.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 4000;

    this.init();
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.setupEventListeners();
    this.atualizarSlide(0);
    this.iniciarAutoplay();
  }

  renderSlides() {
    this.imagens.forEach((img, index) => {
      const slide = document.createElement('div');
      slide.className = 'carrossel-slide';

      const imgElement = document.createElement('img');
      imgElement.alt = `Systemtecshop Galeria - ${img}`;
      imgElement.loading = 'lazy';

      imgElement.src = `img/${img}`;

      slide.appendChild(imgElement);
      this.wrapper.appendChild(slide);
    });

    this.slides = document.querySelectorAll('.carrossel-slide');
  }

  renderDots() {
    this.imagens.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carrossel-dot';
      dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
      dot.addEventListener('click', () => {
        this.pararAutoplay();
        this.atualizarSlide(index);
        this.iniciarAutoplay();
      });
      this.dotsContainer.appendChild(dot);
    });

    this.dots = document.querySelectorAll('.carrossel-dot');
  }

  setupEventListeners() {
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        this.pararAutoplay();
        this.anterior();
        this.iniciarAutoplay();
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        this.pararAutoplay();
        this.proximo();
        this.iniciarAutoplay();
      });
    }
  }

  atualizarSlide(index) {
    this.slideAtual = (index + this.totalSlides) % this.totalSlides;

    // Remover classe ativo de todos os slides e dots
    this.slides.forEach(slide => slide.classList.remove('ativo'));
    this.dots.forEach(dot => dot.classList.remove('ativo'));

    // Adicionar classe ativo ao slide e dot atual
    this.slides[this.slideAtual].classList.add('ativo');
    this.dots[this.slideAtual].classList.add('ativo');
  }

  proximo() {
    this.atualizarSlide(this.slideAtual + 1);
  }

  anterior() {
    this.atualizarSlide(this.slideAtual - 1);
  }

  iniciarAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.proximo();
    }, this.autoplayDelay);
  }

  pararAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Inicializar carrossel quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Carrossel();
  });
} else {
  new Carrossel();
}

// ===== FIM CARROSSEL =====

// ===== TYPING EFFECT NO HERO =====
function initTypingEffect() {
  const h2 = document.querySelector('.hero h2');
  if (h2) {
    const text = h2.textContent;
    h2.textContent = '';
    h2.classList.add('typing-text');

    let index = 0;
    const speed = 80; // ms por caractere

    function type() {
      if (index < text.length) {
        h2.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    type();
  }
}

// ===== FLOATING PARTICLES =====
function createParticles() {
  const particleCount = 15;
  const container = document.querySelector('.hero');

  if (container) {
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Posição aleatória
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      // Duração aleatória
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

      container.appendChild(particle);
    }
  }
}

// ===== CARD FLIP =====
function initCardFlip() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });
}

// ===== INICIALIZAR EFEITOS =====
document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  createParticles();
  initCardFlip();
});

console.log('Systemtecshop — Site carregado com sucesso!');
