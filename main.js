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