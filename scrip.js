        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = themeToggleBtn.querySelector('i');

        // Verificar si el usuario ya tenía una preferencia guardada
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        // Evento de clic para cambiar el tema
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
            
            // Guardar la elección del usuario
            localStorage.setItem('theme', theme);
        });

// Aseguramos que el código se ejecute cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página intente recargarse

            // Cambiar el estado del botón a "Enviando..." para dar feedback visual
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Abriendo Correo... <i class="fa-solid fa-spinner fa-spin"></i>';

            try {
                // Obtener los valores de los inputs de tu HTML
                const name = contactForm.querySelector('input[name="name"]').value.trim();
                const email = contactForm.querySelector('input[name="email"]').value.trim();
                const message = contactForm.querySelector('textarea[name="message"]').value.trim();

                // Tu correo de destino
                const emailDestino = 'solorzano200339@gmail.com';
                
                // Configurar el asunto del correo electrónico
                const asunto = encodeURIComponent(`💼 Contacto Portafolio - ${name}`);
                
                // Estructurar el cuerpo del mensaje de forma limpia
                const cuerpoMensaje = encodeURIComponent(
                    `Nombre: ${name}\n` +
                    `Correo de contacto: ${email}\n\n` +
                    `Mensaje:\n${message}`
                );

                // Construir la URL nativa mailto
                const mailtoUrl = `mailto:${emailDestino}?subject=${asunto}&body=${cuerpoMensaje}`;

                // Abrir el cliente de correo del usuario con los datos prellenados
                window.location.href = mailtoUrl;

                // Pequeña alerta de confirmación
                alert('¡Perfecto! Se abrirá tu aplicación de correo para enviar el mensaje.');
                contactForm.reset(); // Limpia los campos del formulario

            } catch (error) {
                console.error('Error al procesar el formulario:', error);
                alert('Hubo un problema al procesar el formulario. Por favor, inténtalo de nuevo.');
            } finally {
                // Restauramos el botón a su estado original después de un breve delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 1000);
            }
        });
    }
});