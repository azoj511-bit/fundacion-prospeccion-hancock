/* Fundación Prospección Hancock — Interacciones, Multilingüe & Experiencia de Usuario */

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

  /* 1. Menú móvil interactivo con autocierre */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  var header = document.querySelector(".site-header");

  if (burger && nav) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    var navLinks = nav.querySelectorAll("a");
    Array.prototype.forEach.call(navLinks, function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* 2. Header Glassmorphism & Botón Volver Arriba */
  var scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.setAttribute("type", "button");
  scrollTopBtn.setAttribute("aria-label", "Volver al inicio de la página");
  scrollTopBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>';
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      if (y > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    if (y > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* 3. Contador animado para cifras clave (Stats Counter) */
  function animateStats() {
    var statsContainer = document.querySelector(".stats");
    if (!statsContainer || statsContainer.dataset.animated) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          statsContainer.dataset.animated = "true";
          var items = statsContainer.querySelectorAll("strong");
          Array.prototype.forEach.call(items, function (el) {
            var rawText = el.textContent.trim();
            // Match number and suffix
            var match = rawText.match(/^([0-9\s]+)(.*)$/);
            if (!match) return;
            var numStr = match[1].replace(/\s/g, "");
            var targetNum = parseInt(numStr, 10);
            var suffix = match[2];
            if (isNaN(targetNum)) return;

            var duration = 1600;
            var startTime = null;

            function step(time) {
              if (!startTime) startTime = time;
              var progress = Math.min((time - startTime) / duration, 1);
              // Ease-out expo
              var current = Math.floor((1 - Math.pow(1 - progress, 3)) * targetNum);
              el.textContent = current.toLocaleString("es-ES") + (suffix ? " " + suffix.trim() : "");
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                el.textContent = rawText;
              }
            }
            requestAnimationFrame(step);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsContainer);
  }
  if ("IntersectionObserver" in window) {
    animateStats();
  }

  /* 4. Formulario & Validación */
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

  // Validación reactiva
  document.querySelectorAll("form.form").forEach(function (form) {
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        if (!field.required && !field.value.trim()) return;
        var value = field.type === "checkbox" ? field.checked : field.value.trim();
        var message = "";
        if (!value && field.required) {
          message = "Este campo es obligatorio.";
        } else if (field.type === "email" && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value)) {
          message = "Dirección de correo electrónico no válida.";
        }
        setError(field, message);
      });
    });
  });

  // Contador de caracteres para descripción en demande-don
  var descField = document.getElementById("description");
  if (descField) {
    var charBadge = document.createElement("div");
    charBadge.className = "char-count";
    charBadge.textContent = "0 caracteres";
    descField.parentNode.appendChild(charBadge);
    descField.addEventListener("input", function () {
      var len = descField.value.length;
      charBadge.textContent = len + " caracteres (recomendado: +100)";
      if (len >= 100) charBadge.style.color = "var(--green)";
      else charBadge.style.color = "var(--muted)";
    });
  }

  // Badge pour champ fichier
  var pieceInput = document.getElementById("piece");
  if (pieceInput) {
    var fileBadge = document.createElement("div");
    fileBadge.className = "file-badge";
    pieceInput.parentNode.appendChild(fileBadge);
    pieceInput.addEventListener("change", function () {
      if (pieceInput.files && pieceInput.files[0]) {
        var f = pieceInput.files[0];
        fileBadge.innerHTML = '📎 <strong>Archivo:</strong> ' + f.name + ' (' + Math.round(f.size / 1024) + ' KB) — <em>recuerde adjuntarlo en WhatsApp al abrirse</em>';
        fileBadge.classList.add("visible");
      } else {
        fileBadge.classList.remove("visible");
      }
    });
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

  /* 5. FAQ Accordéon interactif */
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = item.classList.contains("open");
      // Ferme les autres pour un effet propre
      var parent = item.closest(".faq-wrap");
      if (parent) {
        parent.querySelectorAll(".faq-item").forEach(function (other) {
          other.classList.remove("open");
        });
      }
      if (!isOpen) item.classList.add("open");
    });
  });

  /* 6. Galerie : Filtres par catégories & Lightbox Plein Écran */
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    var figures = gallery.querySelectorAll("figure");

    // Création de la Lightbox
    var lbModal = document.createElement("div");
    lbModal.className = "lightbox-modal";
    lbModal.setAttribute("role", "dialog");
    lbModal.setAttribute("aria-modal", "true");
    lbModal.innerHTML =
      '<div class="lightbox-card">' +
        '<button class="lightbox-close" type="button" aria-label="Cerrar">&times;</button>' +
        '<div class="lightbox-img-wrap">' +
          '<button class="lightbox-nav-btn lightbox-prev" type="button" aria-label="Anterior">&#10094;</button>' +
          '<img src="" alt="" />' +
          '<button class="lightbox-nav-btn lightbox-next" type="button" aria-label="Siguiente">&#10095;</button>' +
        '</div>' +
        '<div class="lightbox-info">' +
          '<span class="badge-cat"></span>' +
          '<h3></h3>' +
          '<p></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lbModal);

    var lbImg = lbModal.querySelector(".lightbox-img-wrap img");
    var lbCat = lbModal.querySelector(".badge-cat");
    var lbTitle = lbModal.querySelector("h3");
    var lbDesc = lbModal.querySelector("p");
    var lbClose = lbModal.querySelector(".lightbox-close");
    var lbPrev = lbModal.querySelector(".lightbox-prev");
    var lbNext = lbModal.querySelector(".lightbox-next");

    var visibleFigures = Array.from(figures);
    var currentIndex = 0;

    function openLightbox(index) {
      if (index < 0) index = visibleFigures.length - 1;
      if (index >= visibleFigures.length) index = 0;
      currentIndex = index;

      var fig = visibleFigures[currentIndex];
      var img = fig.querySelector("img");
      var cat = fig.querySelector(".badge-cat");
      var title = fig.querySelector("strong");
      var descNode = fig.querySelector("figcaption");

      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
      lbCat.textContent = cat ? cat.textContent : "Fundación Hancock";
      lbTitle.textContent = title ? title.textContent : "";
      
      // Texte sans la catégorie et le titre
      var descText = "";
      if (descNode) {
        var clone = descNode.cloneNode(true);
        var bCat = clone.querySelector(".badge-cat");
        if (bCat) bCat.remove();
        var bStrong = clone.querySelector("strong");
        if (bStrong) bStrong.remove();
        descText = clone.textContent.trim();
      }
      lbDesc.textContent = descText;

      lbModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lbModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    figures.forEach(function (fig) {
      fig.addEventListener("click", function () {
        visibleFigures = Array.from(figures).filter(function (f) {
          return !f.classList.contains("hidden");
        });
        var idx = visibleFigures.indexOf(fig);
        if (idx !== -1) openLightbox(idx);
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function (e) { e.stopPropagation(); openLightbox(currentIndex - 1); });
    lbNext.addEventListener("click", function (e) { e.stopPropagation(); openLightbox(currentIndex + 1); });

    lbModal.addEventListener("click", function (e) {
      if (e.target === lbModal) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lbModal.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
      if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
    });

    // Filtres de catégories
    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.dataset.filter || "all";

        figures.forEach(function (fig) {
          var catText = (fig.querySelector(".badge-cat") ? fig.querySelector(".badge-cat").textContent : "").toLowerCase();
          var titleText = (fig.querySelector("strong") ? fig.querySelector("strong").textContent : "").toLowerCase();
          var combined = catText + " " + titleText;

          if (filter === "all") {
            fig.classList.remove("hidden");
          } else if (filter === "sport" && (combined.includes("deporte") || combined.includes("athlète") || combined.includes("netball"))) {
            fig.classList.remove("hidden");
          } else if (filter === "rural" && (combined.includes("rural") || combined.includes("pastoral") || combined.includes("comunidades") || combined.includes("pueblo") || combined.includes("aldea"))) {
            fig.classList.remove("hidden");
          } else if (filter === "education" && (combined.includes("beca") || combined.includes("educación") || combined.includes("juventud") || combined.includes("ciencia") || combined.includes("espacial"))) {
            fig.classList.remove("hidden");
          } else if (filter === "institution" && (combined.includes("emblema") || combined.includes("hancock") || combined.includes("financiera") || combined.includes("minería") || combined.includes("diplomátic") || combined.includes("alocución") || combined.includes("directiva"))) {
            fig.classList.remove("hidden");
          } else {
            fig.classList.add("hidden");
          }
        });
      });
    });
  }

  /* 7. Actualités : Recherche instantanée & Modale de lecture */
  var newsGrid = document.querySelector(".actualites-grid-wrap");
  var newsSearchInput = document.getElementById("newsSearchInput");
  if (newsSearchInput && newsGrid) {
    var articles = newsGrid.querySelectorAll("article.card");

    newsSearchInput.addEventListener("input", function () {
      var query = newsSearchInput.value.toLowerCase().trim();
      articles.forEach(function (art) {
        var text = art.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          art.style.display = "";
        } else {
          art.style.display = "none";
        }
      });
    });

    // Modale de lecture complète
    var newsModal = document.createElement("div");
    newsModal.className = "lightbox-modal";
    newsModal.innerHTML =
      '<div class="lightbox-card">' +
        '<button class="lightbox-close" type="button" aria-label="Cerrar">&times;</button>' +
        '<div class="lightbox-img-wrap">' +
          '<img src="" alt="" />' +
        '</div>' +
        '<div class="lightbox-info">' +
          '<span class="badge-cat"></span>' +
          '<h3></h3>' +
          '<p style="font-size:1.02rem; line-height:1.7;"></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(newsModal);

    var nImg = newsModal.querySelector("img");
    var nCat = newsModal.querySelector(".badge-cat");
    var nTitle = newsModal.querySelector("h3");
    var nDesc = newsModal.querySelector("p");
    var nClose = newsModal.querySelector(".lightbox-close");

    function closeNewsModal() {
      newsModal.classList.remove("active");
      document.body.style.overflow = "";
    }
    nClose.addEventListener("click", closeNewsModal);
    newsModal.addEventListener("click", function (e) { if (e.target === newsModal) closeNewsModal(); });

    articles.forEach(function (art) {
      var btn = art.querySelector(".news-card-action");
      if (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var img = art.querySelector("img");
          var date = art.querySelector(".date");
          var title = art.querySelector("h3");
          var desc = art.querySelector("p");

          if (img) nImg.src = img.src;
          nCat.textContent = date ? date.textContent : "Actualidad";
          nTitle.textContent = title ? title.textContent : "";
          nDesc.textContent = desc ? desc.textContent : "";

          newsModal.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      }
    });
  }

  /* 8. Bouton flottant WhatsApp officiel */
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
