/* ============================================================
   Aplica os dados de js/config.js no site (nome, contatos, links)
   ============================================================ */
(function applyConfig() {
  if (typeof SITE === 'undefined') return;

  // Textos: <span data-cfg="cidade"></span>
  const values = {
    primeiroNome: SITE.primeiroNome,
    sobrenome: SITE.sobrenome,
    nomeCompleto: SITE.primeiroNome + ' ' + SITE.sobrenome,
    profissao: SITE.profissao,
    registro: SITE.registro,
    telefone: SITE.telefoneExibido,
    email: SITE.email,
    instagramUser: '@' + SITE.instagram,
    cidade: SITE.cidade,
    endereco: SITE.endereco,
    precoAntigo: SITE.precoAntigo,
    precoAtual: SITE.precoAtual,
    ano: String(new Date().getFullYear())
  };
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const v = values[el.dataset.cfg];
    if (v !== undefined) el.textContent = v;
  });

  // Links de WhatsApp: <a data-wa="Mensagem opcional {nome}">
  document.querySelectorAll('[data-wa]').forEach(a => {
    const msg = (a.dataset.wa || SITE.mensagemPadrao).replace('{nome}', SITE.primeiroNome);
    a.href = 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(msg);
  });

  // Outros links
  // document.querySelectorAll('[data-link="instagram"]').forEach(a => {
  //   a.href = 'https://www.instagram.com/' + SITE.instagram + '/';
  // });
  document.querySelectorAll('[data-link="compra"]').forEach(a => { a.href = SITE.linkCompra; });
  document.querySelectorAll('[data-link="email"]').forEach(a => { a.href = 'mailto:' + SITE.email; });

  // Título da aba do navegador
  document.title = values.nomeCompleto + ' | ' + SITE.profissao + ' em ' + SITE.cidade;
})();

(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // NAV scroll + active section
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  const sections = [...navLinks].map(a => document.getElementById(a.dataset.nav)).filter(Boolean);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const y = window.scrollY + nav.offsetHeight + 80;
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= y) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === current));
  }, { passive: true });

  // MOBILE MENU
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileClose');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    ham.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  ham.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  closeBtn.addEventListener('click', () => setMenu(false));
  window.closeMobile = () => setMenu(false);

  // Smooth anchor offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 16;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      setMenu(false);
    });
  });

  // Scroll reveal (all animation classes)
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Counter animation
  function animateCounters() {
    document.querySelectorAll('.stat-n[data-count]').forEach(el => {
      const max = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (prefersReduced) {
        el.textContent = max + suffix;
        return;
      }
      let cur = 0;
      const step = Math.max(1, Math.ceil(max / 50));
      const timer = setInterval(() => {
        cur = Math.min(cur + step, max);
        el.textContent = cur + suffix;
        if (cur >= max) clearInterval(timer);
      }, 30);
    });
  }
  const statsEl = document.querySelector('.stats');
  if (statsEl) {
    const statsObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObs.disconnect();
      }
    }, { threshold: 0.35 });
    statsObs.observe(statsEl);
  }

  // Parallax suave na foto do hero (apenas desktop)
  const heroImg = document.getElementById('heroImg');
  if (heroImg && !prefersReduced && window.matchMedia('(min-width:993px)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 500);
      heroImg.style.transform = `translateY(${y * 0.04}px)`;
    }, { passive: true });
  }

})();
