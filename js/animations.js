/**
 * Fundação de animações. Mantém a camada visual separada da lógica principal.
 */
(function(){const sections=document.querySelectorAll("[data-section]");if(!("IntersectionObserver"in window)){sections.forEach(s=>s.classList.add("is-visible"));return}const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("is-visible")})},{threshold:.18});sections.forEach(section=>observer.observe(section))})();
