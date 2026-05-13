/* ── Filter tabs ── */
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterContent();
    });
});

function filterContent() {
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.media-card');
    let visible = 0;

    cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const text = card.innerText.toLowerCase();
        const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
        const matchSearch = !searchVal || text.includes(searchVal);
        const show = matchFilter && matchSearch;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}

document.getElementById('searchInput').addEventListener('input', filterContent);