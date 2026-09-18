/* =====================================================
   SADIQUE DOCS - CINEMATIC INTERACTIONS & MOBILE MENU
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.8s ease-in-out";
  setTimeout(() => { document.body.style.opacity = "1"; }, 100);

  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  if (navContainer && navLinks) {
    const menuBtn = document.createElement("button");
    menuBtn.className = "mobile-menu-btn";
    
    // 3-Dot Icon
    const threeDotsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle><circle cx="5" cy="12" r="1.5"></circle></svg>`;
    // Close 'X' Icon
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
        margin-right: 0.5rem; /* Right wall se satane ke liye */
      }
      
      /* CLICK HONE PAR CRIMSON RED GLASS */
      .mobile-menu-btn.btn-active {
        background: rgba(183, 28, 28, 0.85); 
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(183, 28, 28, 0.4);
        color: #ffffff; 
        box-shadow: 0 4px 15px rgba(183, 28, 28, 0.3);
        padding: 0.5rem 1rem; /* Curved Rectangle shape */
      }

      @media (max-width: 900px) {
        .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
        .nav-links {
          display: flex !important;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          background: rgba(244, 241, 235, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
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

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      menuBtn.classList.toggle("btn-active");
      
      if (menuBtn.classList.contains("btn-active")) {
        menuBtn.innerHTML = closeIcon;
      } else {
        menuBtn.innerHTML = threeDotsIcon;
      }
    });
  }
});