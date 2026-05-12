/* ── Filter tabs Material Educativo ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterEdu();
    });
});

function filterEdu() {
    const filter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    const cards = document.querySelectorAll('.edu-card');
    let visible = 0;

    cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    /* Mostrar/ocultar títulos de sección si no tienen cards visibles */
    document.querySelectorAll('.edu-section-title').forEach(title => {
        const nextGrid = title.nextElementSibling;
        if (!nextGrid) return;
        const hasVisible = [...nextGrid.querySelectorAll('.edu-card')].some(c => c.style.display !== 'none');
        title.style.display = hasVisible ? '' : 'none';
    });

    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}