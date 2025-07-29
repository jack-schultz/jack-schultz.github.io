import { fetchJsonc } from '../../helpers/stripJsonC.js';
const data = await fetchJsonc('../data.jsonc');


export const discordBotBlurbHTML = `
<section class="project-panel">
    <div>
        <h2>Dr Robotnic (Discord Bot)</h2>
        <p>
            Active in ${data.robotnic_guilds} guilds, It provides functionality to dynamically create 
            voice channels for users as they are needed. This declutters the chatroom and gives user's 
            control over their personal voice channel. 
        </p>
        <a href="projects/discordBot.html" class="button">Read More</a>
        <a href="https://discord.com/application-directory/853490879753617458" class="button">See in Discord</a>
        <a href="https://github.com/Jack-Schultz/Paper-io" class="button">GitHub</a>
    </div>
    <img src="../../media/gifs/dr-robotnic.gif" alt="Animated screenshot of Discord Bot" width="400">
</section>
`;

export const discordBotHTML = `
<section class="main-panel">
    <div>
        <h2>Dr Robotnic (Discord Bot)</h2>
        <p>
            Active in ${data.robotnic_guilds} guilds, It provides functionality to dynamically create 
            voice channels for users as they are needed. This declutters the chatroom and gives user's 
            control over their personal voice channel. 
        </p>
        <a href="https://discord.com/application-directory/853490879753617458" class="button">See in Discord</a>
        <a href="https://github.com/Jack-Schultz/Paper-io" class="button">GitHub</a>
    </div>
    <img src="../../media/gifs/dr-robotnic.gif" alt="Animated screenshot of Discord Bot" width="400">
</section>
`;