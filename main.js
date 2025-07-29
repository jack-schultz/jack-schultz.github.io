import { projectsHTML } from './components/projects.js';
import { skillsHTML } from './components/skills.js';
import { headerHTML } from './components/header.js';
import { footerHTML } from './components/footer.js';
import { aboutmeHTML } from './components/aboutMe.js';
import { discordBotBlurbHTML } from './components/projects/discordBot.js';
import { discordBotHTML } from './components/projects/discordBot.js';
// import { tetrisBlurbHTML } from './components/projects/discordBot.js';
// import { tetrisHTML } from './components/projects/discordBot.js';

const sectionMap = {
  'list-projects': projectsHTML,
  'list-skills': skillsHTML,
  'site-header': headerHTML,
  'site-footer': footerHTML,
  'site-aboutme': aboutmeHTML,
  'project-discordBotBlurb': discordBotBlurbHTML,
  'project-discordBot': discordBotHTML,
  // 'project-tetrisBlurb': tetrisBlurbHTML,
  // 'project-tetris': tetrisHTML,
};

for (const [id, html] of Object.entries(sectionMap)) {
  const element = document.getElementById(id);
  if (element) element.innerHTML += html;
}
