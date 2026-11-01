/* =====================================================
   SADIQUE DOCS - WHITEHOUSE SMOOTH SCROLL & REVEAL ENGINE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.prepend(progressBar);

  // 2. TOP EDITORIAL TICKER BAR
  const ticker = document.createElement("div");
  ticker.className = "top-ticker";
  const tickerContent = `
    <a href="https://youtu.be/Mj7YpHPiII8" target="_blank" class="ticker-item">
      <span><span class="ticker-dot">●</span> NEW RELEASE: LAST OF KHILAFAT — SULTAN ABDUL HAMID II AUR MUSLIM UNITY</span>
      <span>WATCH NOW ON YOUTUBE &rarr;</span>
      <span><span class="ticker-dot">●</span> SADIQUE DOCS ARCHIVE: RESEARCH-DRIVEN HISTORY, MYSTERY & GEOPOLITICS</span>
      <span><span class="ticker-dot">●</span> ONGOING SERIES: SULTAN ABDUL HAMID II ON INSTAGRAM</span>
    </a>
  `;
  ticker.innerHTML = `<div class="ticker-track">${tickerContent}${tickerContent}</div>`;
  document.body.prepend(ticker);

  // 3. LENIS SMOOTH MOUSE-WHEEL ENGINE
  const lenisScript = document.createElement("script");
  lenisScript.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
  lenisScript.onload = () => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  };
  document.head.appendChild(lenisScript);

  // 4. SCROLL REVEAL OBSERVER
  const autoRevealSelectors = [
    ".bismillah-container",
    ".editorial-kicker",
    ".main-title",
    ".hero-desc",
    ".hero-actions",
    ".section-header",
    ".dark-video-showcase",
    ".statement-kicker",
    ".statement-quote",
    ".pillar-card",
    ".creator-portrait-frame",
    ".creator-info-box > *",
    ".episode-card",
    ".v-card"
  ];

  const elementsToReveal = document.querySelectorAll(autoRevealSelectors.join(","));
  elementsToReveal.forEach((el, index) => {
    el.classList.add("reveal-up");
    if (index % 3 === 1) el.classList.add("delay-1");
    if (index % 3 === 2) el.classList.add("delay-2");
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  elementsToReveal.forEach((el) => revealObserver.observe(el));

  // 5. SCROLL PROGRESS & SUBTLE HERO VIDEO PARALLAX
  const header = document.querySelector(".modern-header");
  const heroVideo = document.querySelector(".hero-video-bg");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;

    if (header) {
      header.classList.toggle("header-scrolled", scrollTop > 40);
    }

    if (heroVideo && scrollTop < window.innerHeight) {
      heroVideo.style.transform = `scale(1.04) translateY(${scrollTop * 0.25}px)`;
    }
  });

  // 6. MOBILE MENU
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  if (navContainer && navLinks) {
    const menuBtn = document.createElement("button");
    menuBtn.className = "mobile-menu-btn";
    
    const threeDotsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>`;
    const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    menuBtn.innerHTML = threeDotsIcon;
    navContainer.appendChild(menuBtn);

    const style = document.createElement("style");
    style.innerHTML = `
      .mobile-menu-btn {
        display: none;
        background: transparent;
        border: none;
        color: var(--text-main);
        padding: 0.5rem; 
        border-radius: 50px;
        cursor: pointer;
        z-index: 2000;
        transition: all 0.4s ease;
      }
      .mobile-menu-btn.btn-active {
        background: rgba(183, 28, 28, 0.9); 
        color: #ffffff; 
        padding: 0.5rem 1rem;
      }
      @media (max-width: 900px) {
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
        .nav-links {
          display: flex !important;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          background: rgba(244, 241, 235, 0.97);
          backdrop-filter: blur(25px);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateY(-100%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1500;
        }
        .nav-links.nav-active { transform: translateY(0); }
        .nav-links a { font-size: 1.8rem !important; color: var(--text-main) !important; }
      }
    `;
    document.head.appendChild(style);

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      menuBtn.classList.toggle("btn-active");
      menuBtn.innerHTML = menuBtn.classList.contains("btn-active") ? closeIcon : threeDotsIcon;
    });
  }
});