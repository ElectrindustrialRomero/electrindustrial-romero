/* =========================================================
   ELECTRINDUSTRIAL "ROMERO" — Comportamiento de la página
   Cambia el número de WhatsApp aquí (formato internacional, sin + ni espacios)
   ========================================================= */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "593993053192";
  var DEFAULT_MESSAGE = "Hola, me gustaría obtener información sobre los servicios de Electrindustrial Romero.";

  document.documentElement.classList.add("js");

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Aparición suave al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Botones "Consultar": preseleccionan el servicio ---------- */
  var serviceSelect = document.getElementById("f-servicio");
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var value = link.getAttribute("data-service");
      for (var i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text === value) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    });
  });

  /* ---------- Formulario → WhatsApp ---------- */
  var form = document.getElementById("wa-form");

  function showError(field, msg) {
    var wrap = field.closest(".field");
    var err = document.getElementById("e-" + field.name);
    wrap.classList.toggle("invalid", !!msg);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (err) err.textContent = msg || "";
  }

  function validate() {
    var f = form.elements;
    var ok = true;
    var firstInvalid = null;

    function check(field, msg) {
      showError(field, msg);
      if (msg) { ok = false; if (!firstInvalid) firstInvalid = field; }
    }

    var nombre = f.nombre.value.trim();
    check(f.nombre, nombre.length < 2 ? "Escribe tu nombre." : "");

    var telDigits = f.telefono.value.replace(/\D/g, "");
    check(f.telefono, telDigits.length < 7 || telDigits.length > 15 ? "Ingresa un teléfono válido." : "");

    check(f.servicio, !f.servicio.value ? "Selecciona un servicio." : "");

    var mensaje = f.mensaje.value.trim();
    check(f.mensaje, mensaje.length < 5 ? "Escribe un breve mensaje." : "");

    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var f = form.elements;
    var text =
      "Hola, soy " + f.nombre.value.trim() + ".\n\n" +
      "Estoy interesado/a en:\n" + f.servicio.value + "\n\n" +
      "Mi teléfono es:\n" + f.telefono.value.trim() + "\n\n" +
      "Mensaje:\n" + f.mensaje.value.trim() + "\n\n" +
      "Quisiera obtener más información.";

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
  });

  form.addEventListener("input", function (e) {
    if (e.target.name) showError(e.target, "");
  });

  /* ---------- Lightbox de la galería ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector(".lb-caption");

  document.querySelectorAll(".g-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var thumb = btn.querySelector("img");
      lbImg.src = btn.getAttribute("data-full");
      lbImg.alt = thumb ? thumb.alt : "";
      lbCap.textContent = btn.getAttribute("data-caption") || "";
      if (typeof lb.showModal === "function") lb.showModal();
      else lb.setAttribute("open", "");
    });
  });

  function closeLb() {
    if (typeof lb.close === "function") lb.close();
    else lb.removeAttribute("open");
  }
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLb(); // clic en el fondo oscuro
  });

  /* ---------- Enlaces de WhatsApp sin mensaje: añadir mensaje por defecto ---------- */
  document.querySelectorAll("a[data-wa]").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && href.indexOf("?text=") === -1) {
      a.setAttribute("href", href + "?text=" + encodeURIComponent(DEFAULT_MESSAGE));
    }
  });
})();
