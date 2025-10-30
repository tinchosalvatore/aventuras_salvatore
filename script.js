document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO ORIGINAL (Animaciones, etc.) ---
    const body = document.querySelector('body');
    body.classList.add('loaded');

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // --- CÓDIGO ORIGINAL (Scroll Suave) MODIFICADO ---
    // Ahora busca todos los links CON la excepción del botón de aventura
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not(#btn-aventura)');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CÓDIGO NUEVO ---

    // --- Idea 2: Trigger de Confeti en el BOTÓN ---
    const btnAventura = document.getElementById('btn-aventura');
    if (btnAventura) {
        btnAventura.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenimos el salto de ancla inmediato

            // 1. Lanza el confeti
            try {
                confetti({
                    particleCount: 150,
                    spread: 180,
                    origin: { y: 0.6 } // Que salga desde el centro de la pantalla
                });
            } catch (e) {
                console.error("Error al lanzar confeti. ¿Se cargó la librería?", e);
            }

            // 2. Hace el scroll suave
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- (OPCIONAL) Código del Logo (ya no hace confeti) ---
    // Lo dejamos solo por si quieres que haga *otra cosa* al clickearlo,
    // si no, puedes borrar este bloque.
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            // Ya no hace confeti. ¿Quizás un sonidito? ¿O nada?
            console.log("Clickeaste el logo!");
        });
    }

    // --- Idea 3: Lógica del Modal de Términos ---
    const modal = document.getElementById('modal-tyc');
    const openLink = document.getElementById('open-modal-link');
    const closeBtn = document.getElementById('close-modal');

    if (modal && openLink && closeBtn) {
        openLink.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "flex";
        }
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // --- NUEVO: Ocultar Navbar al scrollear ---
    const navbar = document.querySelector('.top-navbar');
    let lastScrollY = window.scrollY; // Almacena la última posición de scroll

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 50) {
            // Si estamos muy arriba (cerca del inicio), siempre mostrar la barra
            navbar.style.transform = 'translateY(0)';
        } else if (currentScrollY > lastScrollY) {
            // Si scrolleamos HACIA ABAJO
            navbar.style.transform = 'translateY(-100%)'; // Oculta la barra (la mueve hacia arriba)
        } else {
            // Si scrolleamos HACIA ARRIBA
            navbar.style.transform = 'translateY(0)'; // Muestra la barra
        }

        // Actualiza la última posición para la próxima vez
        lastScrollY = currentScrollY;
    });


}); // <-- Fin del DOMContentLoaded