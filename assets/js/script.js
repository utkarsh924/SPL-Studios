/* =========================================================
   AAVRIK INTERIORS
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
       ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const closeMenu = () => {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
    };

    if (menuToggle && navLinks) {

        /* Accessibility */
        if (!menuToggle.hasAttribute("aria-expanded")) {
            menuToggle.setAttribute("aria-expanded", "false");
        }

        if (!menuToggle.hasAttribute("aria-controls")) {
            if (!navLinks.id) {
                navLinks.id = "site-navigation";
            }

            menuToggle.setAttribute(
                "aria-controls",
                navLinks.id
            );
        }

        if (!menuToggle.hasAttribute("aria-label")) {
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        /* Close after clicking a navigation link */
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });

        /* Close with Escape */
        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();

                if (
                    document.activeElement &&
                    document.activeElement === menuToggle
                ) {
                    menuToggle.blur();
                }
            }

        });

        /* Close when clicking outside menu */
        document.addEventListener("click", event => {

            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        /* Close mobile menu when resizing to desktop */
        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });

    }


    /* =========================
       PORTFOLIO FILTER
       ========================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    if (filterButtons.length && projectCards.length) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedFilter =
                    button.dataset.filter;

                /* Update active button */
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");

                /* Filter projects */
                projectCards.forEach(card => {

                    const category =
                        card.dataset.category;

                    const shouldShow =
                        selectedFilter === "all" ||
                        selectedFilter === category;

                    if (shouldShow) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }

                });

            });

        });

        /* Accessibility state for initial active button */
        filterButtons.forEach(button => {

            button.setAttribute(
                "aria-pressed",
                button.classList.contains("active")
                    ? "true"
                    : "false"
            );

        });

    }


    /* =========================
       CONTACT FORM
       ========================= */

    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            /*
             * Do not pretend that an enquiry was received
             * until a real form backend is connected.
             */

            if (!contactForm.checkValidity()) {
                return;
            }

            /*
             * If the form does not have a real action/backend yet,
             * prevent the fake submission.
             */
            const formAction =
                contactForm.getAttribute("action");

            if (!formAction) {

                event.preventDefault();

                const formMessage =
                    document.querySelector("#form-message");

                if (formMessage) {
                    formMessage.textContent =
                        "The enquiry form is currently being set up. Please use the available contact option to reach us.";
                }

                return;
            }

        });

    }


    /* =========================
       CURRENT YEAR
       ========================= */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    const currentPath =
        window.location.pathname
            .replace(/\/+$/, "") || "/";

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            const url =
                new URL(
                    link.href,
                    window.location.origin
                );

            const linkPath =
                url.pathname.replace(/\/+$/, "") || "/";

            /*
             * Ignore same-page anchor links when determining
             * the main navigation active state.
             */
            if (
                currentPath === linkPath &&
                !url.hash
            ) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }

        });

});