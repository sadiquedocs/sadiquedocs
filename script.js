/* =====================================================
   SADIQUE DOCS - NATIVE APP SHELL & BUTTER SCROLL ENGINE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. TOP SCROLL PROGRESS BAR
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.prepend(progressBar);

  // 2. NATIVE MOBILE BOTTOM NAVIGATION DOCK (AUTO-INJECT ON ALL PAGES)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const mobileDock = document.createElement("nav");
  mobileDock.className = "mobile-app-dock";
  mobileDock.innerHTML = `
    <a href="index.html" class="dock-tab ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z"/></svg>
      <span>Home</span>
    </a>
    <a href="documentary.html" class="dock-tab ${currentPage.includes('documentary') ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="4" width="20" height="16" rx="3"/><polygon points="10 9 15 12 10 15 10 9" fill="currentColor"/></svg>
      <span>Archive</span>
    </a>
    <a href="visuals.html" class="dock-tab ${currentPage.includes('visuals') ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      <span>Visuals</span>
    </a>
    <a href="about.html" class="dock-tab ${currentPage.includes('about') ? 'active' : ''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 14.5-4 16 0"/></svg>
      <span>Director</span>
    </a>
  `;
  document.body.appendChild(mobileDock);

  // 3. IN-APP CINEMA VIDEO PLAYER MODAL
  const cinemaModal = document.createElement("div");
  cinemaModal.className = "app-cinema-modal";
  cinemaModal.id = "appCinemaModal";
  cinemaModal.innerHTML = `
    <div class="cinema-modal-box">
      <div class="cinema-modal-top">
        <span>SADIQUE DOCS // IN-APP THEATRE</span>
        <button class="cinema-close-btn" id="closeCinemaBtn">CLOSE ✕</button>
      </div>
      <div class="cinema-iframe-wrap" id="cinemaIframeWrap"></div>
    </div>
  `;
  document.body.appendChild(cinemaModal);

  const iframeWrap = document.getElementById("cinemaIframeWrap");
  const closeCinemaBtn = document.getElementById("closeCinemaBtn");

  document.querySelectorAll(".open-app-player").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const videoId = btn.getAttribute("data-video-id");
      if (videoId) {
        e.preventDefault();
        iframeWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
        cinemaModal.classList.add("modal-open");
      }
    });
  });

  function closeCinema() {
    cinemaModal.classList.remove("modal-open");
    iframeWrap.innerHTML = "";
  }
  closeCinemaBtn.addEventListener("click", closeCinema);
  cinemaModal.addEventListener("click", (e) => {
    if (e.target === cinemaModal) closeCinema();
  });

  // 4. PWA APP INSTALL PROMPT HANDLER
  let deferredPrompt = null;
  const installBtn = document.getElementById("installAppBtn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      } else {
        alert("Sadique Docs App install karne ke liye apne browser menu (⋮ ya Share icon) mein 'Add to Home Screen' / 'Install App' par tap karein!");
      }
    });
  }

  // 5. FLOATING SCROLL-TO-TOP BUTTON
  let scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement("button");
    scrollTopBtn.className = "scroll-top-fab";
    scrollTopBtn.id = "scrollTopBtn";
    scrollTopBtn.innerHTML = "&uarr;";
    document.body.appendChild(scrollTopBtn);
  }

  // 6. LENIS ULTRA-BUTTER INERTIA ENGINE
  const lenisCss = document.createElement("link");
  lenisCss.rel = "stylesheet";
  lenisCss.href = "https://unpkg.com/lenis@1.1.18/dist/lenis.css";
  document.head.appendChild(lenisCss);

  let lenisInstance = null;

  const lenisScript = document.createElement("script");
  lenisScript.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
  lenisScript.onload = () => {
    lenisInstance = new Lenis({
      lerp: 0.068,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    const parallaxImages = document.querySelectorAll(
      ".clean-thumb-img, .pillar-bg-img, .creator-portrait-img"
    );

    lenisInstance.on("scroll", ({ scroll, limit }) => {
      const progress = limit > 0 ? (scroll / limit) * 100 : 0;
      progressBar.style.width = `${progress}%`;

      if (window.innerWidth > 768) {
        parallaxImages.forEach((img) => {
          const rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const centerOffset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.035;
            img.style.transform = `scale(1.05) translate3d(0, ${centerOffset}px, 0)`;
          }
        });
      }
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId.length > 1) {
          e.preventDefault();
          lenisInstance.scrollTo(targetId, { offset: -80, duration: 1.3 });
        }
      });
    });
  };
  document.head.appendChild(lenisScript);

  scrollTopBtn.addEventListener("click", () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.3 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // 7. HEADER & SCROLL-TOP VISIBILITY
  const header = document.querySelector(".modern-header");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    if (header) header.classList.toggle("header-scrolled", scrollTop > 30);
    if (scrollTopBtn) scrollTopBtn.classList.toggle("fab-visible", scrollTop > 450);
  });

  // 8. SCROLL REVEAL OBSERVER
  const elementsToReveal = document.querySelectorAll(".reveal-up, .episode-card, .v-card");
  elementsToReveal.forEach((el, index) => {
    el.classList.add("reveal-up");
    if (index % 3 === 1) el.classList.add("delay-1");
    if (index % 3 === 2) el.classList.add("delay-2");
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });

  elementsToReveal.forEach((el) => revealObserver.observe(el));
});
