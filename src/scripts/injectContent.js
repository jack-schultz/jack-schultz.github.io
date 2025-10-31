import { loadAndRenderHTML } from '/src/scripts/loadAndRenderHTML.js';
import { applyTimelineSpacing } from '/src/scripts/applyTimelineSpacing.js';

const sectionPaths = {
  // ID in HTML: Path to HTML
  'header': '/src/content/header.html',
  'footer': '/src/content/footer.html',

  // "About Me" sections
  'aboutme': '/src/content/about/aboutMe.html',
  'motivation': '/src/content/about/motivation.html',
  'whyTeach': '/src/content/about/whyTeach.html',
  'future': '/src/content/about/future.html',
  'nonTech': '/src/content/about/nonTech.html',
  'facts': '/src/content/about/facts.html',
  'timeline': '/src/content/about/timeline.html',
  'myvalues': '/src/content/about/myvalues.html',

  'skills': '/src/content/lists/skills.html',

  // Projects
  'projects-about': '/src/content/projects/about.html',

  'project-discordBot-blurb': '/src/content/projects/discordBot/blurb.html',
  'project-discordBot-why': '/src/content/projects/discordBot/why.html',
  'project-discordBot-challenge1': '/src/content/projects/discordBot/challenges/1.html',
  'project-discordBot-challenge2': '/src/content/projects/discordBot/challenges/2.html',
  'project-discordBot-challenge3': '/src/content/projects/discordBot/challenges/3.html',
  'project-discordBot-features': '/src/content/projects/discordBot/features.html',
  'project-discordBot-impact': '/src/content/projects/discordBot/impact.html',
  'project-discordBot-skillsUsed': '/src/content/projects/discordBot/skillsUsed.html',

  'project-tetris-blurb': '/src/content/projects/tetris/blurb.html',

  'project-paperio-blurb': '/src/content/projects/paperio/blurb.html',

  'project-codingClub-blurb': '/src/content/projects/codingClub/blurb.html',

  'project-thisWebsite-blurb': '/src/content/projects/this-website/blurb.html',

  'project-game-blurb': '/src/content/projects/game/blurb.html',
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


