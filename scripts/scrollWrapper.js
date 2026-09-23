/**
 * Horizontal project carousel: arrow buttons + "active" highlight.
 *
 * Each .scroll-wrapper has a scrollable row of sections. Buttons move by one
 * section width; IntersectionObserver marks the most visible section active.
 */

onReady(() => {
  setupScrollButtons();
  markActiveSections();
});

/**
 * Wire left/right buttons on every carousel.
 * Scroll distance matches one section so each click centers the next item.
 */
function setupScrollButtons() {
  document.querySelectorAll('.scroll-wrapper').forEach((wrapper) => {
    const container = wrapper.querySelector('.scrollable-container');
    const leftBtn = wrapper.querySelector('.scroll-btn.left');
    const rightBtn = wrapper.querySelector('.scroll-btn.right');
    const firstSection = container.querySelector('section');
    const scrollAmount = firstSection
      ? firstSection.offsetWidth
      : container.offsetWidth * 0.8;

    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

/**
 * Only the most visible section in each carousel gets class "active".
 * Track intersection ratios across all sections, then pick the highest.
 */
function markActiveSections() {
  document.querySelectorAll('.scrollable-container').forEach((container) => {
    const sections = [...container.querySelectorAll('section')];
    if (sections.length === 0) return;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }

        let best = null;
        let bestRatio = 0;
        for (const section of sections) {
          const ratio = ratios.get(section) || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = section;
          }
        }

        for (const section of sections) {
          section.classList.toggle('active', section === best);
        }
      },
      {
        // Observe relative to the scroll container, not the viewport
        root: container,
        // Multiple thresholds so we get updates as visibility changes smoothly
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }
  });
}

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
