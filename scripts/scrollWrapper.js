document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.scrollable-container');
    const leftBtn = wrapper.querySelector('.scroll-btn.left');
    const rightBtn = wrapper.querySelector('.scroll-btn.right');
    const firstSection = container.querySelector('section');
    // Scroll by one section width so one item stays centered per click
    const scrollAmount = firstSection ? firstSection.offsetWidth : container.offsetWidth * 0.8;

    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});

// Only the most visible (centered) section gets 'active'
function observeScrollableContainers() {
    document.querySelectorAll('.scrollable-container').forEach(container => {
        const sections = container.querySelectorAll('section');
        if (sections.length === 0) return;

        const ratios = new Map();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    ratios.set(entry.target, entry.intersectionRatio);
                });
                let best = null;
                let bestRatio = 0;
                sections.forEach(section => {
                    const r = ratios.get(section) || 0;
                    if (r > bestRatio) {
                        bestRatio = r;
                        best = section;
                    }
                });
                sections.forEach(section => {
                    section.classList.toggle('active', section === best);
                });
            },
            {
                root: container,
                threshold: [0, 0.25, 0.5, 0.75, 1]
            }
        );

        sections.forEach(section => observer.observe(section));
    });
}

// Run when DOM is ready (sections may be injected later)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeScrollableContainers);
} else {
    observeScrollableContainers();
}
