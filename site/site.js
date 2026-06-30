/* ============================================================
   Gritty Bee — shared site chrome (nav + footer) + interactions.
   Injects the fixed honeycomb background + flying bees too.
   Each page sets <body data-page="..."> to drive the active link.
   ============================================================ */
(function () {
  var PAGES = [
    { href: "how-it-works.html", label: "How it works", key: "how" },
    { href: "pricing.html",      label: "Pricing",      key: "pricing" },
    { href: "why-us.html",       label: "Why us",       key: "why" },
    { href: "about.html",        label: "About",        key: "about" },
    { href: "contact.html",      label: "Contact",      key: "contact" }
  ];

  var page = document.body.getAttribute("data-page") || "";
  var bee = '<img class="bee" src="../../assets/mark.svg" alt="" aria-hidden="true">';

  // ---- HIVE BACKGROUND + FLYING BEES ----
  var hive = document.createElement("div");
  hive.className = "hive-bg";
  hive.setAttribute("aria-hidden", "true");
  hive.innerHTML =
    '<svg class="comb" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">' +
      '<defs><pattern id="gb-comb" width="56" height="96" patternUnits="userSpaceOnUse" patternTransform="scale(1.4)">' +
        '<path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 64 L56 80 M28 64 L0 80 M28 64 L28 96" ' +
        'fill="none" stroke="var(--amber)" stroke-width="1.3" stroke-opacity="0.5"/>' +
      '</pattern></defs>' +
      '<rect width="100%" height="100%" fill="url(#gb-comb)"/>' +
    '</svg>' +
    '<div class="flybee"><img src="../../assets/bee.svg" alt=""></div>' +
    '<div class="flybee two"><img src="../../assets/bee.svg" alt=""></div>';
  document.body.insertBefore(hive, document.body.firstChild);

  // ---- NAV ----
  var linksHtml = PAGES.map(function (p) {
    return '<a href="' + p.href + '"' + (p.key === page ? ' class="active"' : "") + ">" + p.label + "</a>";
  }).join("");

  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML =
    '<div class="navbar" id="navbar">' +
      '<a class="brand" href="index.html">' + bee + '<span class="word">Gritty Bee</span></a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navbar">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>' +
      '</button>' +
      '<div class="links">' + linksHtml + '</div>' +
      '<a class="ncta" href="audit.html">Free audit &#8594;</a>' +
    '</div>';
  document.body.insertBefore(nav, document.body.firstChild);

  // ---- FOOTER ----
  var foot = document.createElement("footer");
  foot.className = "site-footer";
  foot.innerHTML =
    '<div class="wrap">' +
      '<div class="foot-grid">' +
        '<div class="foot-brand">' +
          '<a class="brand" href="index.html">' + bee + '<span class="word">Gritty Bee</span></a>' +
          '<p>A whole hive working your brand. Marketing for local independent businesses \u2014 you approve once a month, we never clock out.</p>' +
          '<a class="btn btn-honey btn-sm" href="audit.html">Get your free audit &#8594;</a>' +
        '</div>' +
        '<div class="foot-col"><h5>Company</h5>' +
          '<a href="about.html">About us</a>' +
          '<a href="why-us.html">Why Gritty Bee</a>' +
          '<a href="how-it-works.html">How it works</a>' +
          '<a href="contact.html">Contact</a>' +
        '</div>' +
        '<div class="foot-col"><h5>What we do</h5>' +
          '<a href="how-it-works.html">Social media</a>' +
          '<a href="how-it-works.html">Google Business</a>' +
          '<a href="how-it-works.html">Email &amp; SMS</a>' +
          '<a href="how-it-works.html">Websites</a>' +
        '</div>' +
        '<div class="foot-col"><h5>Get in touch</h5>' +
          '<a href="mailto:hello@grittybee.co">hello@grittybee.co</a>' +
          '<a href="tel:+14165550199">(416) 555-0199</a>' +
          '<a href="contact.html">Toronto, ON</a>' +
        '</div>' +
      '</div>' +
      '<div class="foot-bottom">' +
        '<span>&copy; ' + new Date().getFullYear() + ' Gritty Bee. All rights reserved.</span>' +
        '<span class="foot-tag">Put the hive to work.</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(foot);

  // ---- MOBILE TOGGLE ----
  var bar = document.getElementById("navbar"),
      btn = document.getElementById("navToggle");
  var burger = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>';
  var close = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  function setOpen(open) {
    bar.classList.toggle("open", open);
    btn.innerHTML = open ? close : burger;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  btn.addEventListener("click", function () { setOpen(!bar.classList.contains("open")); });
  bar.querySelectorAll(".links a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });

  // ---- REVEAL ON SCROLL ----
  document.documentElement.classList.add("js-reveal");
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  var vh = window.innerHeight || 800;
  reveals.forEach(function (el) {
    if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add("in-now");
  });
  var pending = reveals.filter(function (el) { return !el.classList.contains("in-now"); });
  if (pending.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    pending.forEach(function (el) { io.observe(el); });
    setTimeout(function () {
      pending.forEach(function (el) {
        if (!el.classList.contains("in")) el.classList.add("in-now");
      });
    }, 1000);
  } else {
    pending.forEach(function (el) { el.classList.add("in-now"); });
  }

  // ---- SIMPLE FORM HANDLER (prototype) ----
  document.querySelectorAll("form[data-mock]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var card = form.closest(".formcard") || form.parentNode;
      var ok = card.querySelector(".form-success");
      if (ok) { form.style.display = "none"; ok.classList.add("show"); }
    });
  });
})();
