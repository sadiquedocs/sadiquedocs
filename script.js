/* =====================================================
   SADIQUE DOCS - CLEAN EDITORIAL SMOOTH SCROLL & MENU
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.prepend(progressBar);

  // 2. LENIS SMOOTH MOUSE-WHEEL ENGINE
  const lenisScript = document.createElement("script");
  lenisScript.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
  lenisScript.onload = () => {
    const lenis = new Lenis({
      duration: 1.15,
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

  // 3. CLEAN SCROLL REVEAL OBSERVER
  const autoRevealSelectors = [
    ".bismillah-container",
    ".signature-pill",
    ".display-brand-title",
    ".crunchy-subline",
    ".hero-actions",
    ".section-header",
    ".clean-video-showcase",
    ".crimson-header-center",
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
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  elementsToReveal.forEach((el) => revealObserver.observe(el));

  // 4. SCROLL PROGRESS UPDATE
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });

  // 5. MOBILE MENU (CLEAN WARM CREAM OVERLAY)
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  if (navContainer && navLinks) {
    const menuBtn = document.createElement("button");
    menuBtn.className = "mobile-menu-btn";
    
    const twoLinesIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line></svg>`;
    const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    menuBtn.innerHTML = twoLinesIcon;
    navContainer.appendChild(menuBtn);

    const style = document.createElement("style");
    style.innerHTML = `
      .mobile-menu-btn {
        display: none;
        background: transparent;
        border: none;
        color: var(--accent-red);
        padding: 0.4rem;
        cursor: pointer;
        z-index: 2000;
      }
      @media (max-width: 900px) {
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
        .nav-links {
          display: flex !important;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          background: #F5F0E6;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1500;
        }
        .nav-links.nav-active { transform: translateY(0); }
        .nav-links a {
          font-family: var(--font-display) !important;
          font-size: 2.2rem !important;
          color: var(--accent-red) !important;
          opacity: 1 !important;
        }
      }
    `;
    document.head.appendChild(style);

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      menuBtn.classList.toggle("btn-active");
      menuBtn.innerHTML = menuBtn.classList.contains("btn-active") ? closeIcon : twoLinesIcon;
    });
  }
});
