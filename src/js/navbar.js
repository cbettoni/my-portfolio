export const initNavbar = () => {
    const toggleMenuButton = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("#navMenu");
    const stickyNav = document.querySelector(".sticky-nav");

    // Fonction pour gérer l'ouverture/fermeture du menu burger
    const toggleMenuAction = () => {
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("menuOpen");
        toggleMenuButton.classList.toggle("active"); // Ajout du style `active`
        if (navMenu.classList.contains("menuOpen")) {
            stickyNav.style.height = "100%";
        } else {
            stickyNav.style.height = "";
        }
    };

    // Attacher l'événement au clic sur le bouton burger
    toggleMenuButton?.addEventListener("click", toggleMenuAction);

    // Fonction pour effectuer le smooth scroll
    const smoothScroll = (e) => {
        const href = e.currentTarget.getAttribute("href");
        const targetId = href.includes("#") ? href.split("#")[1] : null;

        if (targetId) {
            const targetElement = document.querySelector(`#${targetId}`);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        }
    };

    // Cibler les ancres dans le menu de navigation
    const anchorsNav = document.querySelectorAll("#navMenu a");
    anchorsNav.forEach((anchor) => {
        anchor.addEventListener("click", smoothScroll);

        // Fermer le menu après un clic sur une ancre
        anchor.addEventListener("click", () => {
            navMenu.classList.remove("menuOpen");
            navMenu.classList.add("hidden");
            toggleMenuButton.classList.remove("active");
            stickyNav.style.height = "";
        });
    });

    // Cibler aussi les ancres dans le footer
    const anchorsFooter = document.querySelectorAll("footer a[href^='#']");
    anchorsFooter.forEach((anchor) => {
        anchor.addEventListener("click", smoothScroll);
    });

    // Fermer le menu si un clic en dehors du menu est détecté
    document.addEventListener("click", (e) => {
        if (
            navMenu.classList.contains("menuOpen") &&
            !navMenu.contains(e.target) &&
            !toggleMenuButton.contains(e.target)
        ) {
            navMenu.classList.remove("menuOpen");
            navMenu.classList.add("hidden");
            toggleMenuButton.classList.remove("active");
            stickyNav.style.height = "";
        }
    });
};
