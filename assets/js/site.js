/* Fundación Prospección Hancock — Interacciones & Multilingüe */

/* Inicialización del traductor de Google */
function googleTranslateElementInit() {
  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement({
      pageLanguage: 'es',
      includedLanguages: '', // Permite todos los idiomas del mundo
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  }
}
window.googleTranslateElementInit = googleTranslateElementInit;

(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * NÚMERO DE WHATSAPP OFICIAL DE LA FUNDACIÓN (+33 7 57 75 40 14)
   * ------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = "33757754014";

  /* Menú móvil */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  function setError(field, message) {
    var wrap = field.closest(".field");
    if (!wrap) return;
    var slot = wrap.querySelector(".error");
    wrap.classList.toggle("invalid", Boolean(message));
    if (slot) slot.textContent = message || "";
  }

  function validate(form) {
    var ok = true;
    var first = null;
    var fields = form.querySelectorAll("input, select, textarea");
    Array.prototype.forEach.call(fields, function (field) {
      if (!field.required) return;
      var value = field.type === "checkbox" ? field.checked : field.value.trim();
      var message = "";
      if (!value) {
        message = field.type === "checkbox" ? "Debe aceptar el tratamiento de sus datos." : "Este campo es obligatorio.";
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value)) {
        message = "Dirección de correo electrónico no válida.";
      } else if (field.type === "tel" && field.value.replace(/[^0-9]/g, "").length < 6) {
        message = "Número de teléfono no válido.";
      }
      setError(field, message);
      if (message) {
        ok = false;
        if (!first) first = field;
      }
    });
    if (first) first.focus();
    return ok;
  }

  function buildMessage(form, title) {
    var lines = ["*" + title + "*", ""];
    var fields = form.querySelectorAll("input[name], select[name], textarea[name]");
    Array.prototype.forEach.call(fields, function (field) {
      if (field.type === "file" || field.type === "checkbox") return;
      var value = field.value.trim();
      if (!value) return;
      lines.push("*" + field.name + "*: " + value);
    });
    var consent = form.querySelector("#consent");
    if (consent) lines.push("", "Consentimiento para el tratamiento de datos: SÍ");
    lines.push("", "Enviado desde el sitio web oficial de la Fundación Prospección Hancock.");
    return lines.join("\n");
  }

  function handle(formId, statusId, title) {
    var form = document.getElementById(formId);
    if (!form) return;
    var status = document.getElementById(statusId);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validate(form)) {
        if (status) {
          status.className = "status ko";
          status.textContent = "Su solicitud está incompleta: por favor complete los campos obligatorios indicados.";
        }
        return;
      }
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildMessage(form, title));
      window.open(url, "_blank", "noopener");
      if (status) {
        status.className = "status ok";
        status.innerHTML =
          'WhatsApp se abrirá con su mensaje completado: solo debe pulsar « Enviar ». ' +
          'Si no se abre automáticamente, <a href="' + url + '" target="_blank" rel="noopener">haga clic aquí</a>.';
      }
    });
  }

  handle("donForm", "formStatus", "Nueva Solicitud de Donación - Fundación Prospección Hancock");
  handle("contactForm", "contactStatus", "Mensaje de Contacto - Fundación Prospección Hancock");
})();
