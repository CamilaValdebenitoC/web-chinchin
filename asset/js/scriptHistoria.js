const themeToggle = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark'
    ? '<span class="theme-icon" aria-hidden="true">☀</span>'
    : '<span class="theme-icon" aria-hidden="true">☾</span>';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
}

root.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  });
}

const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar && navbar.classList.contains('show')) {
      new bootstrap.Collapse(navbar).hide();
    }
  });
});