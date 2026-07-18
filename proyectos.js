// Enrutador Inteligente por Hash de URL (Filtra y muestra exclusivamente un solo proyecto)
        function enrutadorCasos() {
            const hash = window.location.hash;
            const wrappers = document.querySelectorAll('.project-wrapper');
            const fallback = document.getElementById('fallback-message');
            
            let proyectoEncontrado = false;
            
            if (hash) {
                wrappers.forEach(wrap => {
                    if ('#' + wrap.id === hash) {
                        wrap.style.display = 'block';
                        proyectoEncontrado = true;
                    } else {
                        wrap.style.display = 'none';
                    }
                });
            }
            
            // Muestra mensaje de fallback si el hash no coincide o está vacío
            if (!proyectoEncontrado) {
                fallback.style.display = 'block';
                wrappers.forEach(wrap => wrap.style.display = 'none');
            } else {
                fallback.style.display = 'none';
            }

            // Scroll automático al tope superior al cambiar de proyecto para excelente UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Listeners para enrutamiento por cambio de hash y de carga de DOM
        window.addEventListener('hashchange', enrutadorCasos);
        window.addEventListener('DOMContentLoaded', enrutadorCasos);

        // Control de Galería de Imágenes Individualizada para Multi-Instancia
        function changeImage(src, element, targetId) {
            const mainImg = document.getElementById(targetId);
            if (mainImg) {
                mainImg.src = src;
            }
            
            // Quitar clase activa solo de las miniaturas de este proyecto específico
            const container = element.closest('.gallery-wrapper');
            const thumbs = container.querySelectorAll('.thumb');
            thumbs.forEach(thumb => thumb.classList.remove('active'));
            
            element.classList.add('active');
        }

        // Control de Modo Claro / Modo Oscuro persistente con localStorage
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = themeToggleBtn.querySelector('i');

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
            localStorage.setItem('theme', theme);
        });

        

        // ==========================================================================
// CONTROL DE VISUALIZACIÓN DE IMÁGENES A PANTALLA COMPLETA (MODAL)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('custom-image-modal');
    const modalImg = document.getElementById('img-modal-target');
    const closeBtn = document.querySelector('.close-modal');

    // Detectar click en cualquier contenedor de imagen principal
    document.querySelectorAll('.main-img').forEach(container => {
        container.addEventListener('click', () => {
            const innerImg = container.querySelector('img');
            
            // Validamos que el contenedor posea una imagen real (evitando el mock del portafolio)
            if (innerImg && innerImg.src) {
                modalImg.src = innerImg.src;
                modalImg.alt = innerImg.alt;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
            }
        });
    });

    // Función para cerrar la ventana modal de forma limpia
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restaura el scroll de la web
        setTimeout(() => {
            modalImg.src = ''; // Limpia el recurso al terminar la animación
        }, 300);
    }

    // Eventos de cierre: al hacer click en la X, en la imagen misma o en el fondo oscuro
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalImg) modalImg.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Cierre seguro mediante la tecla Escape del teclado
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});