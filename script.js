/* =====================================================
   SADIQUE DOCS - ULTRA BUTTER SMOOTH SCROLL ENGINE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.prepend(progressBar);

  // 2. LENIS ULTRA-BUTTER INERTIA ENGINE + VELOCITY GLIDE
  const lenisCss = document.createElement("link");
  lenisCss.rel = "stylesheet";
  lenisCss.href = "https://unpkg.com/lenis@1.1.18/dist/lenis.css";
  document.head.appendChild(lenisCss);

  const lenisScript = document.createElement("script");
  lenisScript.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
  lenisScript.onload = () => {
    const lenis = new Lenis({
      lerp: 0.065,          // Lower value = Extra buttery, heavy luxury glide
      wheelMultiplier: 0.9, // Smooth controlled wheel speed
      touchMultiplier: 1.5, // Smooth mobile touch inertia
      smoothWheel: true,
      infinite: false,
    });

    // Parallax targets jo scroll ke saath makkhan ki tarah float karenge
    const parallaxImages = document.querySelectorAll(
      ".clean-thumb-img, .pillar-bg-img, .creator-portrait-img"
    );

    lenis.on("scroll", ({ scroll, limit, velocity }) => {
      // Top Red Progress Bar update
      const progress = limit > 0 ? (scroll / limit) * 100 : 0;
      progressBar.style.width = `${progress}%`;

      // Subtle image parallax on mouse wheel glide
      parallaxImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const centerOffset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.04;
          img.style.transform = `scale(1.05) translate3d(0, ${centerOffset}px, 0)`;
        }
      });
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        lenis.scrollTo(anchor.getAttribute("href"));
      });
    });
  };
  document.head.appendChild(lenisScript);

  // 3. SILKY SCROLL REVEAL OBSERVER (WITH SPRING EASING)
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
  }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });

  elementsToReveal.forEach((el) => revealObserver.observe(el));

  // 4. MOBILE MENU (CLEAN WARM CREAM OVERLAY)
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
      /* Hardware GPU Acceleration for Butter Scroll */
      .clean-video-showcase, .pillar-card, .creator-portrait-frame, .episode-card {
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
      }
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
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.175, 1);
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
