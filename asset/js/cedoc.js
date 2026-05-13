/* ── Filter tabs CEDOC ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.article-card').forEach(card => {
            const tags = card.dataset.tags || '';
            card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
        });
    });
});