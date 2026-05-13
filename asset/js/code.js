document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.portal-form');
    if (!formulario) return;

    // Desactivar validación nativa del navegador
    formulario.setAttribute('novalidate', '');

    const inputs = formulario.querySelectorAll('input[required], textarea[required]');
    const boton = formulario.querySelector('.btn-contacto');

    formulario.addEventListener('submit', (e) => {
        let esValido = true;

        // Limpiar estados previos
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });

        // Validar cada campo
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                esValido = false;
                input.classList.add('is-invalid');
            } else if (input.type === 'email' && !validarEmail(input.value)) {
                esValido = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.add('is-valid');
            }
        });

        if (!esValido) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            // Estado de carga para el usuario
            boton.disabled = true;
            boton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Enviando...`;
        }
    }, false);

    // Validación visual mientras el usuario escribe
    inputs.forEach(campo => {
        campo.addEventListener('input', () => {
            if (campo.value.trim() !== '') {
                campo.classList.add('is-valid');
                campo.classList.remove('is-invalid');
            } else {
                campo.classList.remove('is-valid');
                campo.classList.add('is-invalid');
            }
        });
    });

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});