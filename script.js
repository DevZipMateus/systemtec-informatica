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

console.log('Systemtec Informática — Site carregado com sucesso!');
