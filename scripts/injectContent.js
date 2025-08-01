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

  // Projects
  'projects-about': '/content/projects/about.html',

  'project-discordBot-blurb': '/content/projects/discordBot/blurb.html',
  'project-discordBot-why': '/content/projects/discordBot/why.html',
  'project-discordBot-challenge1': '/content/projects/discordBot/challenges/1.html',
  'project-discordBot-challenge2': '/content/projects/discordBot/challenges/2.html',
  'project-discordBot-challenge3': '/content/projects/discordBot/challenges/3.html',
  'project-discordBot-features': '/content/projects/discordBot/features.html',
  'project-discordBot-impact': '/content/projects/discordBot/impact.html',
  'project-discordBot-skillsUsed': '/content/projects/discordBot/skillsUsed.html',

  'project-tetris-blurb': '/content/projects/tetris/blurb.html',

  'project-paperio-blurb': '/content/projects/paperio/blurb.html',
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


