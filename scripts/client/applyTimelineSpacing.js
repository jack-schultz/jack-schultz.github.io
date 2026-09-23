/**
 * Space timeline items by how far apart their dates are.
 *
 * Each <li> has a data-date from the build. Larger gaps between events
 * become larger margin-top, so the list reads roughly chronological.
 */

const PX_PER_DAY = 0.2;
const MAX_SPACING_PX = 150;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * For each item after the first, set margin-top from days since the previous date.
 * Assumes items are already ordered newest → oldest (prev date is later).
 */
function applyTimelineSpacing() {
  const items = document.querySelectorAll('.timeline-panel ul li');
  if (items.length < 2) return;

  for (let i = 1; i < items.length; i++) {
    const prevMs = new Date(items[i - 1].dataset.date).getTime();
    const currMs = new Date(items[i].dataset.date).getTime();
    const daysApart = (prevMs - currMs) / MS_PER_DAY;
    // Cap so multi-year gaps don't push the list off-screen
    const spacing = Math.min(daysApart * PX_PER_DAY, MAX_SPACING_PX);
    items[i].style.marginTop = `${spacing}px`;
  }
}

onReady(applyTimelineSpacing);

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
