// Timeline spacing function
export function applyTimelineSpacing() {
    const pxPerDay = 0.2;

    const items = document.querySelectorAll('.timeline-panel ul li');
    if (items.length < 2) return;

    // Convert to Unix epoch timestamp
    const toMs = date => new Date(date).getTime();

    // Loop through each item (datestamp)
    for (let i = 1; i < items.length; i++) {
        const prev = toMs(items[i - 1].dataset.date);
        const curr = toMs(items[i].dataset.date);
        // Calc difference in mm and convert to days
        const daysDiff = (curr - prev) / (1000 * 60 * 60 * 24);
        // Adjust spacing based on days between timestamps
        const spacing = Math.min(daysDiff * pxPerDay, 150);
        // Update the css of each item
        items[i].style.marginTop = `${spacing}px`;
    }
}