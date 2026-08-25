/* ==========================================================================
   Eco Städ – script.js
   Mobile nav, scroll reveal, active-link highlighting, contact form handling.
   ========================================================================== */
(function () {
  "use strict";

  /* Flag that JS is running, so CSS can safely hide-then-reveal .reveal
     elements only when something will actually un-hide them again. */
  document.documentElement.classList.add("js");

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after choosing a link (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScrollHeader = function () {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 8
      ? "0 4px 18px rgba(58,69,80,0.10)"
      : "none";
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".main-nav a");
  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute("id");
          var link = document.querySelector('.main-nav a[href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Contact form ---------- */
  /* Submits via FormSubmit (https://formsubmit.co) — a backend-less form
     relay: whatever the visitor types is emailed straight to the address
     in the form's "action" attribute. No account, server, or API key
     needed, and it works on any static host (GitHub Pages, Netlify, ...).
     NOTE: the first submission ever sent to a given address triggers a
     one-time confirmation email from FormSubmit — someone has to click
     "Confirm" there before messages start arriving normally. */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function formDataToObject(formEl) {
    var obj = {};
    Array.from(new FormData(formEl)).forEach(function (pair) {
      obj[pair[0]] = pair[1];
    });
    return obj;
  }

  function ajaxEndpoint(actionUrl) {
    // https://formsubmit.co/you@example.com -> https://formsubmit.co/ajax/you@example.com
    return actionUrl.replace("formsubmit.co/", "formsubmit.co/ajax/");
  }

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("error");
      status.textContent = "Skickar...";

      var action = form.getAttribute("action");

      fetch(ajaxEndpoint(action), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formDataToObject(form)),
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Tack! Vi hör av oss så snart som möjligt.";
            form.reset();
          } else {
            throw new Error("Form endpoint responded with " + response.status);
          }
        })
        .catch(function () {
          status.classList.add("error");
          var email = "ecostadflytt@gmail.com";
          status.innerHTML =
            'Kunde inte skicka formuläret just nu. Maila oss gärna direkt på ' +
            '<a href="mailto:' + email + '">' + email + "</a> istället.";
        });
    });
  }
})();
