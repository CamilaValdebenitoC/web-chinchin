/* ============================================================
   auth-pages.js
   Lógica compartida para login.html y registro.html.
   Se carga DESPUÉS de main.js en ambas páginas.
   ============================================================ */

(function () {
  'use strict';

  // ── Utilidades generales ───────────────────────────────────

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  /**
   * Marca un campo como inválido usando clases Bootstrap
   * y muestra el mensaje de error debajo.
   */
  function showFieldError(input, msg) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid', 'input-error');

    let err = _getErrorEl(input);
    err.textContent = msg;
    err.classList.remove('d-none');
  }

  /**
   * Marca un campo como válido y oculta su mensaje de error.
   */
  function showFieldSuccess(input) {
    input.classList.remove('is-invalid', 'input-error');
    input.classList.add('is-valid');

    let err = _getErrorEl(input);
    if (err) {
      err.textContent = '';
      err.classList.add('d-none');
    }
  }

  /**
   * Obtiene (o crea) el elemento de error asociado a un input.
   */
  function _getErrorEl(input) {
    const group = input.closest('.form-group') || input.parentElement;
    let err = group.querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      const wrap = input.closest('.input-password-wrap') || input;
      wrap.insertAdjacentElement('afterend', err);
    }
    return err;
  }

  /**
   * Limpia todos los estados de error/éxito de un formulario.
   */
  function clearFieldErrors(form) {
    form.querySelectorAll('.is-invalid, .is-valid, .input-error').forEach(el => {
      el.classList.remove('is-invalid', 'is-valid', 'input-error');
    });
    form.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.classList.add('d-none');
    });
  }

  /**
   * Muestra el alert principal del formulario.
   * @param {HTMLElement} alertEl
   * @param {string} msg
   * @param {'error'|'success'} type
   */
  function showAlert(alertEl, msg, type = 'error') {
    alertEl.textContent = msg;
    const isSuccess = type === 'success';
    alertEl.className = [
      'form-alert',
      'alert',
      isSuccess ? 'alert-success' : 'alert-danger',
      'rounded-4',
      'visible',
    ].join(' ');
  }

  function hideAlert(alertEl) {
    alertEl.className = 'form-alert';
    alertEl.textContent = '';
  }

  function setLoading(btn, label) {
    btn.disabled = true;
    btn.classList.add('loading');
    btn.dataset.originalText = btn.textContent;
    btn.textContent = label;
  }

  function clearLoading(btn) {
    btn.disabled = false;
    btn.classList.remove('loading');
    btn.textContent = btn.dataset.originalText || btn.textContent;
  }

  // ── Mostrar / ocultar contraseña ───────────────────────────

  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', function () {
      const input = document.getElementById(this.dataset.target);
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      this.textContent = show ? '🙈' : '👁';
      this.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });

  // ══════════════════════════════════════════════════════════
  // LOGIN
  // ══════════════════════════════════════════════════════════

  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    const loginAlert  = document.getElementById('loginAlert');
    const loginSubmit = document.getElementById('loginSubmit');
    const emailInput  = document.getElementById('login-email');
    const passInput   = document.getElementById('login-pass');

    // ── Validadores individuales ──────────────────────────

    function validateLoginEmail() {
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        showFieldError(emailInput, 'Ingresa un correo electrónico válido.');
        return false;
      }
      showFieldSuccess(emailInput);
      return true;
    }

    function validateLoginPass() {
      if (passInput.value.length < 6) {
        showFieldError(passInput, 'La contraseña debe tener al menos 6 caracteres.');
        return false;
      }
      showFieldSuccess(passInput);
      return true;
    }

    // ── Validación en tiempo real ─────────────────────────

    emailInput.addEventListener('input', function () {
      validateLoginEmail();
      hideAlert(loginAlert);
    });

    passInput.addEventListener('input', function () {
      validateLoginPass();
      hideAlert(loginAlert);
    });

    // ── Submit ────────────────────────────────────────────

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearFieldErrors(this);
      hideAlert(loginAlert);

      const isEmailValid = validateLoginEmail();
      const isPassValid  = validateLoginPass();

      if (!isEmailValid || !isPassValid) {
        showAlert(loginAlert, 'Revisa los campos marcados antes de continuar.');
        return;
      }

      setLoading(loginSubmit, 'Entrando…');

      try {
        // ── Conecta aquí tu API de autenticación ──────────
        // const res = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: emailInput.value.trim(), password: passInput.value })
        // });
        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas.');
        // window.location.href = 'dashboard.html';
        // ─────────────────────────────────────────────────

        // Simulación (eliminar al integrar tu API):
        await new Promise(r => setTimeout(r, 1200));
        showAlert(loginAlert, '¡Bienvenido/a de vuelta! Redirigiendo…', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1500);

      } catch (err) {
        showAlert(loginAlert, err.message || 'Ocurrió un error. Intenta de nuevo.');
      } finally {
        clearLoading(loginSubmit);
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // REGISTRO
  // ══════════════════════════════════════════════════════════

  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    const registerAlert  = document.getElementById('registerAlert');
    const registerSubmit = document.getElementById('registerSubmit');
    const nameInput      = document.getElementById('reg-name');
    const emailInput     = document.getElementById('reg-email');
    const tallerInput    = document.getElementById('reg-taller');
    const passInput      = document.getElementById('reg-password');
    const pass2Input     = document.getElementById('reg-password2');
    const strengthEl     = document.getElementById('passwordStrength');
    const strengthFill   = document.getElementById('strengthFill');
    const strengthLabel  = document.getElementById('strengthLabel');

    // ── Validadores individuales ──────────────────────────

    function validateName() {
      const val = nameInput.value.trim();
      if (!val) {
        showFieldError(nameInput, 'El nombre es obligatorio.');
        return false;
      }
      if (val.length < 3) {
        showFieldError(nameInput, 'El nombre debe tener al menos 3 caracteres.');
        return false;
      }
      showFieldSuccess(nameInput);
      return true;
    }

    function validateEmail() {
      if (!isValidEmail(emailInput.value)) {
        showFieldError(emailInput, 'Ingresa un correo electrónico válido.');
        return false;
      }
      showFieldSuccess(emailInput);
      return true;
    }

    function validateTaller() {
      if (!tallerInput.value) {
        showFieldError(tallerInput, 'Selecciona un taller de interés.');
        return false;
      }
      showFieldSuccess(tallerInput);
      return true;
    }

    function validatePassword() {
      if (passInput.value.length < 8) {
        showFieldError(passInput, 'La contraseña debe tener al menos 8 caracteres.');
        return false;
      }
      showFieldSuccess(passInput);
      return true;
    }

    function validatePassword2() {
      if (pass2Input.value !== passInput.value) {
        showFieldError(pass2Input, 'Las contraseñas no coinciden.');
        return false;
      }
      showFieldSuccess(pass2Input);
      return true;
    }

    // ── Indicador de fortaleza de contraseña ──────────────

    if (passInput && strengthEl) {
      passInput.addEventListener('input', function () {
        const v = this.value;
        if (!v) {
          strengthEl.classList.remove('visible');
          return;
        }
        strengthEl.classList.add('visible');

        let score = 0;
        if (v.length >= 8)           score++;
        if (/[A-Z]/.test(v))         score++;
        if (/[0-9]/.test(v))         score++;
        if (/[^A-Za-z0-9]/.test(v))  score++;

        const levels = [
          { cls: '',       label: '' },
          { cls: 'weak',   label: 'Débil' },
          { cls: 'medium', label: 'Media' },
          { cls: 'strong', label: 'Fuerte' },
          { cls: 'strong', label: 'Muy fuerte' },
        ];
        const level = levels[Math.min(score, 4)];
        strengthFill.className = 'strength-fill ' + level.cls;
        strengthLabel.textContent = level.label;
      });
    }

    // ── Validación en tiempo real ─────────────────────────

    nameInput.addEventListener('input',   () => { validateName();      hideAlert(registerAlert); });
    emailInput.addEventListener('input',  () => { validateEmail();     hideAlert(registerAlert); });
    tallerInput.addEventListener('input', () => { validateTaller();    hideAlert(registerAlert); });
    passInput.addEventListener('input',   () => { validatePassword();  hideAlert(registerAlert); });
    pass2Input.addEventListener('input',  () => { validatePassword2(); hideAlert(registerAlert); });

    // ── Submit ────────────────────────────────────────────

    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearFieldErrors(this);
      hideAlert(registerAlert);

      const results = [
        validateName(),
        validateEmail(),
        validateTaller(),
        validatePassword(),
        validatePassword2(),
      ];

      if (results.includes(false)) {
        showAlert(registerAlert, 'Revisa los campos marcados antes de continuar.');
        return;
      }

      setLoading(registerSubmit, 'Creando cuenta…');

      try {
        // ── Conecta aquí tu API de registro ───────────────
        // const res = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: nameInput.value.trim(),
        //     email: emailInput.value.trim(),
        //     taller: tallerInput.value,
        //     message: document.getElementById('reg-msg')?.value || '',
        //     password: passInput.value
        //   })
        // });
        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message || 'No se pudo crear la cuenta.');
        // window.location.href = 'login.html';
        // ─────────────────────────────────────────────────

        // Simulación (eliminar al integrar tu API):
        await new Promise(r => setTimeout(r, 1400));
        showAlert(registerAlert, '¡Cuenta creada! Redirigiendo al inicio de sesión…', 'success');

        setTimeout(() => {
          registerForm.reset();
          registerForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          if (strengthEl) strengthEl.classList.remove('visible');
          window.location.href = 'login.html';
        }, 1800);

      } catch (err) {
        showAlert(registerAlert, err.message || 'Ocurrió un error. Intenta de nuevo.');
      } finally {
        clearLoading(registerSubmit);
      }
    });
  }

})();