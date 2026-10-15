/* ============================================================
   FABRIPLAY — WEBINAR LANDING PAGE
   ============================================================ */

/* ------------------------------------------------------------
   1. CONFIG  —  EDIT THIS BLOCK ONLY
   ------------------------------------------------------------
   REGISTER_URL : where every "Register Now" button should go.
                  Put your form / checkout / WhatsApp link here.
                  Leave it as "#register" to scroll to the
                  offer section instead.
   OPEN_IN_NEW  : true  -> opens the link in a new tab
                  false -> opens in the same tab
   STICKY_AFTER : how far down the page (in pixels) the mobile
                  sticky bar appears. 0 = after the hero.
------------------------------------------------------------- */
var CONFIG = {
  REGISTER_URL: "#register",
  OPEN_IN_NEW:  false,
  STICKY_AFTER: 0
};


/* ============================================================
   2. APPLY REGISTER LINK TO EVERY CTA
   ============================================================ */
(function applyRegisterLink(){
  var url = CONFIG.REGISTER_URL;
  if (!url || url === "#register") return;

  document.querySelectorAll(".js-register").forEach(function (el) {
    el.setAttribute("href", url);
    if (CONFIG.OPEN_IN_NEW) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
})();


/* ============================================================
   3. SCROLL REVEAL
   ============================================================ */
(function reveal(){
  var items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach(function (el) { io.observe(el); });
})();


/* ============================================================
   4. FAQ ACCORDION
   ============================================================ */
(function faq(){
  var buttons = document.querySelectorAll(".faq__q");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item   = btn.closest(".faq__item");
      var panel  = item.querySelector(".faq__a");
      var isOpen = item.classList.contains("is-open");

      /* close every item */
      document.querySelectorAll(".faq__item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq__a").style.maxHeight = null;
      });

      /* open the clicked one */
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* keep an open panel the right height after a resize */
  window.addEventListener("resize", function () {
    var open = document.querySelector(".faq__item.is-open .faq__a");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });
})();


/* ============================================================
   5. HEADER BACKGROUND ON SCROLL
   ============================================================ */
(function header(){
  var el = document.getElementById("header");
  if (!el) return;

  var onScroll = function () {
    el.classList.toggle("is-stuck", window.scrollY > 40);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();


/* ============================================================
   6. MOBILE STICKY CTA
   ============================================================ */
(function sticky(){
  var bar  = document.getElementById("stickyBar");
  var hero = document.getElementById("top");
  if (!bar || !hero) return;

  var ticking = false;

  var update = function () {
    var trigger = CONFIG.STICKY_AFTER || hero.offsetHeight * 0.75;
    bar.classList.toggle("is-on", window.scrollY > trigger);
    ticking = false;
  };

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", update, { passive: true });
  update();
})();


/* ============================================================
   7. FOOTER YEAR
   ============================================================ */
(function year(){
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();