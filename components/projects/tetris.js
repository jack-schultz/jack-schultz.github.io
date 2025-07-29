import { fetchJsonc } from '../../helpers/stripJsonC.js';
const data = await fetchJsonc('../data.jsonc');


export const tetrisBlurbHTML = `
<section class="project-panel">
    <div>
        <h2>Tetris</h2>
        <p>
            
        </p>
        <a href="projects/tetris.html" class="button">Read More</a>
        <a href="https://MeltedButter77.itch.io/tetris" class="button">Play on Itch.io</a>
        <a href="https://github.com/Jack-Schultz/Tetris" class="button">GitHub</a>
    </div>
    <img src="../../media/gifs/dr-robotnic.gif" alt="Animated screenshot of Discord Bot" width="400">
</section>
`;
