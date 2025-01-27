// js/horizontalScroll.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistre le plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

export const horizontalScroll = (elementRef) => {
    const scrollContainer = elementRef.current;

    if (scrollContainer) {
        gsap.to(scrollContainer, {
            x: "-100%", // Scroll vers la gauche sur l'axe X
            scrollTrigger: {
                trigger: scrollContainer,
                start: "top center",
                end: "bottom center",
                scrub: true, // Scroll fluide avec le défilement
            },
        });
    }
};
