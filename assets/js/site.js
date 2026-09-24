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
   * NÚMERO DE WHATSAPP OFICIAL DE LA FUNDACIÓN (+61 420134044)
   * ------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = "61420134044";

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

  /* Bouton flottant WhatsApp officiel */
  function setupWhatsAppFloat() {
    if (document.querySelector(".whatsapp-float")) return;
    var floatBtn = document.createElement("a");
    floatBtn.className = "whatsapp-float";
    floatBtn.href = "https://wa.me/" + WHATSAPP_NUMBER;
    floatBtn.target = "_blank";
    floatBtn.rel = "noopener noreferrer";
    floatBtn.setAttribute("aria-label", "Contactar por WhatsApp (+61 420134044)");
    floatBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>' +
      '<span class="whatsapp-text">WhatsApp</span> <span class="whatsapp-number">+61 420134044</span>';
    document.body.appendChild(floatBtn);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupWhatsAppFloat);
  } else {
    setupWhatsAppFloat();
  }
})();
