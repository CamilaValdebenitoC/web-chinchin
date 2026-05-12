/* ============================================================
   auth-pages.js
   Lógica compartida para login.html y registro.html.
   Se carga DESPUÉS de main.js en ambas páginas.
   ============================================================ */

(function () {
  'use strict';

  // ── Utilidades ─────────────────────────────────────────────

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function showFieldError(input, msg) {
    input.classList.add('input-error');
    let err = input.closest('.form-group').querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      // Insertar después del input o del .input-password-wrap
      const wrap = input.closest('.input-password-wrap') || input;
      wrap.insertAdjacentElement('afterend', err);
    }
    err.textContent = msg;
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    form.querySelectorAll('.field-error').forEach(el => el.remove());
  }

  function showAlert(alertEl, msg, type = 'error') {
    alertEl.textContent = msg;
    alertEl.className = 'form-alert visible' + (type === 'success' ? ' success' : '');
  }

  function hideAlert(alertEl) {
    alertEl.className = 'form-alert';
    alertEl.textContent = '';
  }

  function setLoading(btn, label) {
    btn.classList.add('loading');
    btn.dataset.originalText = btn.textContent;
    btn.textContent = label;
  }

  function clearLoading(btn) {
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
    const loginAlert = document.getElementById('loginAlert');
    const loginSubmit = document.getElementById('loginSubmit');

    // Limpiar error de campo al escribir
    loginForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function () {
        this.classList.remove('input-error');
        const err = this.closest('.form-group').querySelector('.field-error');
        if (err) err.remove();
        hideAlert(loginAlert);
      });
    });

    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearFieldErrors(this);
      hideAlert(loginAlert);

      const email = document.getElementById('login-email');
      const pass  = document.getElementById('login-pass');
      let valid = true;

      if (!email.value.trim() || !isValidEmail(email.value)) {
        showFieldError(email, 'Ingresa un correo electrónico válido.');
        valid = false;
      }
      if (pass.value.length < 6) {
        showFieldError(pass, 'La contraseña debe tener al menos 6 caracteres.');
        valid = false;
      }
      if (!valid) return;

      setLoading(loginSubmit, 'Entrando…');

      try {
        // ── Conecta aquí tu API de autenticación ──────────────
        // const res = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email: email.value.trim(), password: pass.value })
        // });
        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message || 'Credenciales incorrectas.');
        // window.location.href = 'dashboard.html';
        // ─────────────────────────────────────────────────────

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
    const passInput      = document.getElementById('reg-password');
    const strengthEl     = document.getElementById('passwordStrength');
    const strengthFill   = document.getElementById('strengthFill');
    const strengthLabel  = document.getElementById('strengthLabel');

    // Indicador de fortaleza de contraseña
    if (passInput && strengthEl) {
      passInput.addEventListener('input', function () {
        const v = this.value;
        if (!v) {
          strengthEl.classList.remove('visible');
          return;
        }
        strengthEl.classList.add('visible');

        let score = 0;
        if (v.length >= 8)              score++;
        if (/[A-Z]/.test(v))            score++;
        if (/[0-9]/.test(v))            score++;
        if (/[^A-Za-z0-9]/.test(v))     score++;

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

    // Limpiar errores al escribir
    registerForm.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', function () {
        this.classList.remove('input-error');
        const err = this.closest('.form-group').querySelector('.field-error');
        if (err) err.remove();
        hideAlert(registerAlert);
      });
    });

    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearFieldErrors(this);
      hideAlert(registerAlert);

      const name   = document.getElementById('reg-name');
      const email  = document.getElementById('reg-email');
      const taller = document.getElementById('reg-taller');
      const pass   = document.getElementById('reg-password');
      const pass2  = document.getElementById('reg-password2');
      let valid = true;

      if (!name.value.trim()) {
        showFieldError(name, 'Ingresa tu nombre completo.');
        valid = false;
      }
      if (!isValidEmail(email.value)) {
        showFieldError(email, 'Ingresa un correo electrónico válido.');
        valid = false;
      }
      if (!taller.value) {
        showFieldError(taller, 'Selecciona un taller de interés.');
        valid = false;
      }
      if (pass.value.length < 8) {
        showFieldError(pass, 'La contraseña debe tener al menos 8 caracteres.');
        valid = false;
      }
      if (pass2.value !== pass.value) {
        showFieldError(pass2, 'Las contraseñas no coinciden.');
        valid = false;
      }
      if (!valid) return;

      setLoading(registerSubmit, 'Creando cuenta…');

      try {
        // ── Conecta aquí tu API de registro ───────────────────
        // const res = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     name: name.value.trim(),
        //     email: email.value.trim(),
        //     taller: taller.value,
        //     message: document.getElementById('reg-msg')?.value || '',
        //     password: pass.value
        //   })
        // });
        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message || 'No se pudo crear la cuenta.');
        // window.location.href = 'login.html';
        // ─────────────────────────────────────────────────────

        // Simulación (eliminar al integrar tu API):
        await new Promise(r => setTimeout(r, 1400));
        showAlert(registerAlert, '¡Cuenta creada! Redirigiendo al inicio de sesión…', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 1800);

      } catch (err) {
        showAlert(registerAlert, err.message || 'Ocurrió un error. Intenta de nuevo.');
      } finally {
        clearLoading(registerSubmit);
      }
    });
  }

})();
