// ========================================
// SYSTEMTEC INFORMÁTICA — JavaScript
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

    // Lista de imagens (midia_1 até midia_47)
    this.imagens = [];
    for (let i = 1; i <= 47; i++) {
      this.imagens.push(`midia_${i}`);
    }

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
      // Determinar tipo de arquivo
      const extension = img.toLowerCase().endsWith('.png') ? '.png' :
                       img.toLowerCase().endsWith('.jpg') ? '.jpg' :
                       img.toLowerCase().endsWith('.gif') ? '.gif' : '.jpg';

      const slide = document.createElement('div');
      slide.className = 'carrossel-slide';
      slide.innerHTML = `<img src="images/${img}${extension}" alt="Systemtec Galeria - ${img}" loading="lazy">`;
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

console.log('Systemtec Informática — Site carregado com sucesso!');
