const playRhythm = require('./modules/playRhythm');
const getSounds = require('./modules/getSounds');

document.addEventListener('DOMContentLoaded', () => {
    async function init() {
        const sounds = await getSounds.init();

        console.log(sounds);
        playRhythm.init(sounds);
    }

    init();
});


// async function init() {
//     const sounds = await getSounds.init();
//     body.classList.removeClass('loading');
//     const someData = module2.init(sounds):
//     module2.init(someData):
//     module3.init():
//     module4.init():
// }

// init();

/**
 * Next steps (copied from elsewhere) - do I need this??
 * 
 * So far we have seen just a source and destination node, but WebAudio has many other node kinds. 
 * To create a drum app you could create multiple source nodes, one for each drum, connected to a single output using an AudioChannelMerger. 
 * We could also change the gain of each drum using AudioGainNodes.
 */
