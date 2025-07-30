import { loadAndRenderHTML } from '/scripts/loadAndRenderHTML.js';

const sectionPaths = {
  // ID in HTML: Path to HTML
  'aboutme': '/content/content/aboutMe.html',
  'skills': '/content/lists/skills.html',
  'header': '/content/header.html',
  'footer': '/content/footer.html',
  'projectBlurb-discordBot': '/content/projects/discordBot/blurb.html',
  'projectBlurb-tetris': '/content/projects/tetris/blurb.html',
  // etc...
};

for (const [id, path] of Object.entries(sectionPaths)) {
  const element = document.getElementById(id);
  if (!element) continue;

  const html = await loadAndRenderHTML(path);
  element.innerHTML += html;
}
