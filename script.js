/* =====================================================
   SADIQUE DOCS - INTERACTIVE CINEMA & SCROLL ENGINE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. CINEMA CURTAIN PRELOADER & YEAR COUNTER
  const preloader = document.getElementById("preloader");
  const yearEl = document.getElementById("preloaderYear");
  if (preloader && yearEl) {
    const years = ["1876", "1909", "1924", "2026"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < years.length) {
        yearEl.textContent = years[i];
      } else {
        clearInterval(interval);
      }
    }, 260);

    setTimeout(() => {
      preloader.classList.add("preloader-hide");
    }, 1350);
  }

  // 2. TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.prepend(progressBar);

  // 3. TOP EDITORIAL TICKER BAR
  const ticker = document.createElement("div");
  ticker.className = "top-ticker";
  const tickerContent = `
    <a href="https://youtu.be/Mj7YpHPiII8" target="_blank" class="ticker-item">
      <span><span class="ticker-dot">●</span> PREMIERE: LAST OF KHILAFAT — SULTAN ABDUL HAMID II AUR MUSLIM UNITY</span>
      <span>WATCH NOW IN 4K &rarr;</span>
      <span><span class="ticker-dot">●</span> SADIQUE DOCS ARCHIVE: HISTORY, MYSTERY & GEOPOLITICS</span>
      <span><span class="ticker-dot">●</span> ONGOING SERIES: SULTAN ABDUL HAMID II ON INSTAGRAM</span>
    </a>
  `;
  ticker.innerHTML = `<div class="ticker-track">${tickerContent}${tickerContent}</div>`;
  document.body.prepend(ticker);

  // 4. CUSTOM MAGNETIC CURSOR (PC/LAPTOP)
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const cursorTargets = document.querySelectorAll("[data-cursor]");
  cursorTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-expand");
      cursor.textContent = target.getAttribute("data-cursor");
    });
    target.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-expand");
      cursor.textContent = "";
    });
  });

  // 5. 3D TILT EFFECT & GLARE ON VIDEO/PILLAR CARDS
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });

  // 6. LENIS SMOOTH MOUSE-WHEEL ENGINE
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

  // 7. BLUR-TO-SHARP SCROLL REVEAL OBSERVER
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

  // 8. SCROLL FRAME CINEMA PARALLAX & FLOATING HEADER
  const header = document.querySelector(".modern-header");
  const heroFrame = document.getElementById("heroVideoFrame");
  const bismillahBox = document.querySelector(".bismillah-container");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;

    if (header) {
      header.classList.toggle("header-scrolled", scrollTop > 50);
    }

    // Scroll karne par Hero Video Frame smoothly inset/cinema window banega
    if (heroFrame && scrollTop < window.innerHeight) {
      const progress = Math.min(scrollTop / (window.innerHeight * 0.8), 1);
      const scaleVal = 1 - progress * 0.06;
      const radiusVal = progress * 24;
      heroFrame.style.transform = `scale(${scaleVal})`;
      heroFrame.style.borderRadius = `${radiusVal}px`;
      
      if (bismillahBox) {
        bismillahBox.style.transform = `translateY(${scrollTop * -0.22}px)`;
        bismillahBox.style.opacity = `${1 - progress * 1.15}`;
      }
    }
  });

  // 9. MOBILE MENU
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
        color: currentColor;
        padding: 0.4rem; 
        border-radius: 50px;
        cursor: pointer;
        z-index: 2000;
        transition: all 0.4s ease;
      }
      .modern-header.header-scrolled .mobile-menu-btn { color: #F4F1EB; }
      .mobile-menu-btn.btn-active {
        background: rgba(183, 28, 28, 0.9); 
        color: #ffffff !important; 
        padding: 0.4rem 0.9rem;
      }
      @media (max-width: 900px) {
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
        .nav-links {
          display: flex !important;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          background: rgba(10, 10, 10, 0.97);
          backdrop-filter: blur(25px);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateY(-100%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1500;
        }
        .nav-links.nav-active { transform: translateY(0); }
        .nav-links a { font-size: 1.8rem !important; color: #F4F1EB !important; }
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