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
   SADIQUE DOCS — BIRTHDAY HERO MESSAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const birthdayWish = document.querySelector(".birthday-wish");

  if (!birthdayWish) return;


  /* =====================================================
     DATE CHECK
     August = 7 in JavaScript
  ===================================================== */

  const today = new Date();

  const isBirthday =
    today.getMonth() === 7 &&
    today.getDate() === 31;


  /* =====================================================
     SHOW ONLY ON 31 AUGUST
  ===================================================== */

  if (isBirthday) {

    birthdayWish.style.display = "block";

    birthdayWish.setAttribute(
      "aria-hidden",
      "false"
    );

  } else {

    birthdayWish.style.display = "none";

    birthdayWish.setAttribute(
      "aria-hidden",
      "true"
    );

  }

});