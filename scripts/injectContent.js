import { loadAndRenderHTML } from '/scripts/loadAndRenderHTML.js';
import { applyTimelineSpacing } from '/scripts/applyTimelineSpacing.js';

const sectionPaths = {
  // ID in HTML: Path to HTML
  'header': '/content/header.html',
  'footer': '/content/footer.html',

  // "About Me" sections
  'aboutme': '/content/about/aboutMe.html',
  'motivation': '/content/about/motivation.html',
  'whyTeach': '/content/about/whyTeach.html',
  'future': '/content/about/future.html',
  'nonTech': '/content/about/nonTech.html',
  'facts': '/content/about/facts.html',
  'timeline': '/content/about/timeline.html',
  'myvalues': '/content/about/myvalues.html',

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
  'project-discordBot-technologies': '/content/projects/discordBot/technologies.html',

  'project-tetris-blurb': '/content/projects/tetris/blurb.html',

  'project-paperio-blurb': '/content/projects/paperio/blurb.html',

  'project-codingClub-blurb': '/content/projects/codingClub/blurb.html',
  'project-codingClub-impact': '/content/projects/codingClub/impact.html',
  'project-codingClub-overview': '/content/projects/codingClub/overview.html',
  'project-codingClub-responsibilities': '/content/projects/codingClub/responsibilities.html',
  'project-codingClub-skills': '/content/projects/codingClub/skills.html',
  'project-codingClub-technologies': '/content/projects/codingClub/technologies.html',
  'project-codingClub-challenge1': '/content/projects/codingClub/challenges/1.html',
  'project-codingClub-challenge2': '/content/projects/codingClub/challenges/2.html',
  'project-codingClub-challenge3': '/content/projects/codingClub/challenges/3.html',

  'project-thisWebsite-blurb': '/content/projects/this-website/blurb.html',

  'project-game-blurb': '/content/projects/game/blurb.html',
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


