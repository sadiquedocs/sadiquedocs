/* =====================================================
   SADIQUE DOCS - CINEMATIC INTERACTIONS & MOBILE MENU
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Cinematic Page Load Effect
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease-in-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // 2. Smart Mobile Menu Setup
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  if (navContainer && navLinks) {
    // Generate menu button for mobile automatically
    const menuBtn = document.createElement("button");
    menuBtn.className = "mobile-menu-btn";
    menuBtn.innerHTML = "MENU";
    navContainer.appendChild(menuBtn);

    // Inject exact CSS needed for the mobile menu interaction
    const style = document.createElement("style");
    style.innerHTML = `
      .mobile-menu-btn {
        display: none;
        background: var(--text-main);
        color: var(--bg-primary);
        border: none;
        padding: 0.5rem 1.2rem;
        border-radius: 50px;
        font-family: var(--font-body);
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        z-index: 2000;
      }
      @media (max-width: 768px) {
        .mobile-menu-btn { display: block; }
        .nav-links {
          display: flex !important;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1500;
        }
        .nav-links.nav-active {
          transform: translateY(0);
        }
        .nav-links a {
          font-size: 2rem !important;
          color: var(--text-main) !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Toggle menu on click
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      menuBtn.innerHTML = navLinks.classList.contains("nav-active") ? "CLOSE" : "MENU";
    });
  }
});
