const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            navLinks.classList.remove("is-open");
        }
    });
}

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

const contactForm = document.getElementById("formContacto");

if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre");
        const celular = document.getElementById("celular");
        const mensaje = document.getElementById("mensaje");

        if (!(nombre instanceof HTMLInputElement)
            || !(celular instanceof HTMLInputElement)
            || !(mensaje instanceof HTMLTextAreaElement)) {
            return;
        }

        const numeroWhatsApp = "51915946617";
        let texto = `Hola, soy ${nombre.value.trim()} y quiero unirme a la compañía Realeza Wanka Santiago Leon de Chongos Bajo, quiero más información.\n\nMi celular: ${celular.value.trim()}`;

        if (mensaje.value.trim()) {
            texto += `\n\nMensaje adicional: ${mensaje.value.trim()}`;
        }

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
        const whatsappWindow = window.open(url, "_blank");

        if (whatsappWindow) {
            whatsappWindow.opener = null;
        } else {
            window.location.assign(url);
        }
    });
}
