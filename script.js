document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");

  if (menu && nav) {

    menu.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menu.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    // Close menu after clicking a navigation link

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =====================================================
     DOCUMENTARY TABS
  ===================================================== */

  const tabs = [
    ...document.querySelectorAll(".tab-btn")
  ];

  const panels = [
    ...document.querySelectorAll(".tab-panel")
  ];

  const meta = document.querySelector(".tab-meta");


  const info = {

    ottoman:
      "DIRECTORY: OTTOMAN PALESTINE / PERIOD: 1517–1917",

    abdul:
      "DIRECTORY: ABDUL HAMID II / PERIOD: 1876–1909",

    jerusalem:
      "DIRECTORY: JERUSALEM / PERIOD: LATE OTTOMAN ERA",

    railway:
      "DIRECTORY: HEJAZ RAILWAY / PERIOD: 1900–1920s"

  };


  /* =====================================================
     TAB FUNCTION
  ===================================================== */

  function activateTab(tab) {

    const target = tab.dataset.tab;


    tabs.forEach(currentTab => {

      const active =
        currentTab === tab;

      currentTab.classList.toggle(
        "active",
        active
      );

      currentTab.setAttribute(
        "aria-selected",
        String(active)
      );

    });


    panels.forEach(panel => {

      panel.classList.toggle(
        "active",
        panel.id === target
      );

    });


    if (meta) {

      meta.textContent =
        info[target] || "";

    }

  }


  /* =====================================================
     TAB CLICK
  ===================================================== */

  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      activateTab(tab);

    });


    /* ===================================================
       KEYBOARD NAVIGATION
    =================================================== */

    tab.addEventListener("keydown", event => {

      const currentIndex =
        tabs.indexOf(tab);

      let nextIndex = currentIndex;


      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {

        nextIndex =
          (currentIndex + 1) % tabs.length;

      }


      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {

        nextIndex =
          (currentIndex - 1 + tabs.length) %
          tabs.length;

      }


      if (nextIndex !== currentIndex) {

        event.preventDefault();

        tabs[nextIndex].focus();

        activateTab(
          tabs[nextIndex]
        );

      }

    });

  });


  /* =====================================================
     ESCAPE KEY
     CLOSES MOBILE MENU
  ===================================================== */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Escape" &&
      menu &&
      nav
    ) {

      nav.classList.remove("open");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

      menu.focus();

    }

  });

});

/* =====================================================
   SADIQUE DOCS — 31 AUGUST BIRTHDAY INTRO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const birthdayIntro =
    document.getElementById("birthday-intro");

  if (!birthdayIntro) return;


  /* =====================================================
     DATE SETTINGS
  ===================================================== */

  const today = new Date();

  const isBirthday =
    today.getMonth() === 7 &&
    today.getDate() === 31;


  /*
    TEST MODE

    Testing ke waqt:
    const TEST_MODE = true;

    Real website publish karte waqt:
    const TEST_MODE = false;
  */

  const TEST_MODE = false;


  /* =====================================================
     SHOW / HIDE BIRTHDAY INTRO
  ===================================================== */

  if (!isBirthday && !TEST_MODE) {

    birthdayIntro.remove();
    return;

  }


  /* =====================================================
     MAKE INTRO VISIBLE
  ===================================================== */

  birthdayIntro.style.display = "flex";

  birthdayIntro.setAttribute(
    "aria-hidden",
    "false"
  );


  /* =====================================================
     PREVENT SCROLLING
  ===================================================== */

  document.body.style.overflow = "hidden";


  /* =====================================================
     AUTOMATICALLY FINISH INTRO
     
     CSS animation = approximately 17 seconds
  ===================================================== */

  setTimeout(() => {

    birthdayIntro.style.pointerEvents = "none";

    birthdayIntro.style.opacity = "0";

    setTimeout(() => {

      birthdayIntro.remove();

      document.body.style.overflow = "";

    }, 1500);

  }, 17500);


});