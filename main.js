/* ── Dropdown toggles ── */
document.querySelectorAll('.has-dropdown').forEach(li => {
    const btn = li.querySelector('button');
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = li.classList.contains('open');
        document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) li.classList.add('open');
    });
});
document.addEventListener('click', () => {
    document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i * 0.08) + 's';
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--amarillo)' : '';
    });
});

/* ══════════════════════════════════════════
   AUTH MODAL – Abrir / Cerrar / Tabs
══════════════════════════════════════════ */
(function () {
    const modal      = document.getElementById('auth-modal');
    const btnOpen    = document.getElementById('btn-acceso');
    const btnClose   = document.getElementById('btn-close-modal');
    const tabs       = document.querySelectorAll('.auth-tab');
    const panels     = document.querySelectorAll('.auth-panel');

    function openModal(tabId) {
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        if (tabId) switchTab(tabId);
        // Focus the close button for accessibility
        setTimeout(() => btnClose && btnClose.focus(), 50);
    }

    function closeModal() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        btnOpen && btnOpen.focus();
    }

    function switchTab(targetId) {
        tabs.forEach(tab => {
            const isActive = tab.id === targetId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });
        panels.forEach(panel => {
            if (panel.id === targetId.replace('tab-', 'panel-')) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    }

    // Abrir modal con el botón de la navbar
    btnOpen && btnOpen.addEventListener('click', e => {
        e.stopPropagation();
        openModal('tab-login');
    });

    // Cerrar con el botón ✕
    btnClose && btnClose.addEventListener('click', closeModal);

    // Cerrar al hacer clic en el overlay (fuera del box)
    modal && modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });

    // Cambio de tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.id));
    });
})();