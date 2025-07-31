import { loadAndRenderHTML } from '/scripts/loadAndRenderHTML.js';
import { applyTimelineSpacing } from '/scripts/applyTimelineSpacing.js';

const sectionPaths = {
  // ID in HTML: Path to HTML
  'header': '/content/header.html',
  'footer': '/content/footer.html',

  // "About Me" sections
  'aboutme': '/content/aboutme/aboutMe.html',
  'motivation': '/content/aboutme/motivation.html',
  'whyTeach': '/content/aboutme/whyTeach.html',
  'future': '/content/aboutme/future.html',
  'nonTech': '/content/aboutme/nonTech.html',
  'facts': '/content/aboutme/facts.html',
  'timeline': '/content/aboutme/timeline.html',
  'myvalues': '/content/aboutme/myvalues.html',

  'skills': '/content/lists/skills.html',

  // Project blurbs
  'projectBlurb-discordBot': '/content/projects/discordBot/blurb.html',
  'projectBlurb-tetris': '/content/projects/tetris/blurb.html',
  'projectBlurb-paperio': '/content/projects/paperio/blurb.html',
};

// Loop through each section defined in the map
for (const [id, path] of Object.entries(sectionPaths)) {
  const element = document.getElementById(id);
  if (!element) continue; // Skip if the target element isn't found in the DOM

  // Load and inject HTML content into the target section
  const html = await loadAndRenderHTML(path);
  element.innerHTML += html;

  // If this is the timeline section, apply date-based spacing
  if (id === 'timeline') {
    applyTimelineSpacing();
  }
}


