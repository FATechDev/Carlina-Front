
  import { initCarousel } from "./tw-element.ts";
  initCarousel();

  function initParallaxContainers() {
    const parallaxContainers = document.querySelectorAll('[id="parallax-container"]');
    
    function handleParallaxEffects() {
        const isMobile = window.innerWidth <= 768;
        
        parallaxContainers.forEach(container => {
            if (isMobile) {
                // Mode mobile
                container.style.backgroundAttachment = 'scroll';
                container.style.backgroundPosition = 'center';
            } else {
                // Mode desktop
                container.style.backgroundAttachment = 'fixed';
            }
        });
    }

    // Initialiser au chargement et redimensionnement
    handleParallaxEffects();
    window.addEventListener('resize', handleParallaxEffects);
}

// Exécuter après le chargement du DOM
document.addEventListener('DOMContentLoaded', initParallaxContainers);

// Support pour les transitions Astro
document.addEventListener('astro:page-load', initParallaxContainers);
