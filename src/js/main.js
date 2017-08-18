const playRhythm = require('./modules/playRhythm');
const getSounds = require('./modules/getSounds');

document.addEventListener('DOMContentLoaded', () => {
    async function init() {
        const sounds = await getSounds.init();
        // body.classList.remove('loading');

        console.log(sounds);
        playRhythm.init(sounds);
    }

    init();
});
