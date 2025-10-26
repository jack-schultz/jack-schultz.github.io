document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.scrollable-container');
    const leftBtn = wrapper.querySelector('.scroll-btn.left');
    const rightBtn = wrapper.querySelector('.scroll-btn.right');
    const scrollAmount = container.offsetWidth * 0.8;

    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});

// Most centered/visible in viewport gets 'active' tag
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    },
    {
        root: document.querySelector('.scrollable-container'),
        threshold: 0.6 // ~60% visible counts as active
    }
);

// run for each section
document.querySelectorAll('.scrollable-container section').forEach(section => {
    observer.observe(section);
});
