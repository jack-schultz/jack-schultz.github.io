import { loadAndRenderHTML } from '/scripts/loadAndRenderHTML.js';
import { applyTimelineSpacing } from '/scripts/applyTimelineSpacing.js';

const sectionPaths = {
  // ID in HTML: Path to markdown content
  'header': '/content/header.md',
  'footer': '/content/footer.md',

  // "About Me" sections
  'aboutme': '/content/about/aboutMe.md',
  'motivation': '/content/about/motivation.md',
  'whyTeach': '/content/about/whyTeach.md',
  'future': '/content/about/future.md',
  'nonTech': '/content/about/nonTech.md',
  'facts': '/content/about/facts.md',
  'timeline': '/content/about/timeline.md',
  'myvalues': '/content/about/myvalues.md',

  'skills': '/content/lists/skills.md',

  // Projects
  'projects-about': '/content/projects/about.md',

  'project-discordBot-blurb': '/content/projects/discordBot/blurb.md',
  'project-discordBot-why': '/content/projects/discordBot/why.md',
  'project-discordBot-challenge1': '/content/projects/discordBot/challenges/1.md',
  'project-discordBot-challenge2': '/content/projects/discordBot/challenges/2.md',
  'project-discordBot-challenge3': '/content/projects/discordBot/challenges/3.md',
  'project-discordBot-features': '/content/projects/discordBot/features.md',
  'project-discordBot-impact': '/content/projects/discordBot/impact.md',
  'project-discordBot-technologies': '/content/projects/discordBot/technologies.md',

  'project-tetris-blurb': '/content/projects/tetris/blurb.md',

  'project-paperio-blurb': '/content/projects/paperio/blurb.md',

  'project-codingClub-blurb': '/content/projects/codingClub/blurb.md',
  'project-codingClub-impact': '/content/projects/codingClub/impact.md',
  'project-codingClub-overview': '/content/projects/codingClub/overview.md',
  'project-codingClub-responsibilities': '/content/projects/codingClub/responsibilities.md',
  'project-codingClub-skills': '/content/projects/codingClub/skills.md',
  'project-codingClub-technologies': '/content/projects/codingClub/technologies.md',
  'project-codingClub-challenge1': '/content/projects/codingClub/challenges/1.md',
  'project-codingClub-challenge2': '/content/projects/codingClub/challenges/2.md',
  'project-codingClub-challenge3': '/content/projects/codingClub/challenges/3.md',

  'project-thisWebsite-blurb': '/content/projects/this-website/blurb.md',

  'project-game-blurb': '/content/projects/game/blurb.md',
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


