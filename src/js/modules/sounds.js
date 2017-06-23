// Sets up audio context
const audioContext = new window.AudioContext();

function playSound(buffer, time) {
    /**
     * https://joshondesign.com/p/books/canvasdeepdive/chapter12.html
     * Everything in WebAudio revolves around the concept of nodes. 
     * To manipulate sound we attach nodes together into a chain or graph then start the processing. 
     * To do simple audio playback we need a source node and a destination node. 
     * audioContext.createBufferSource() creates a source node that we can attach to the audio buffer with our sound. 
     * ctx.destination is a property containing the standard destination output, which usually means the speakers of the computer. 
     * The two nodes are connected with the connect function. Once connected we can play the sound by calling noteOn(0) on the source. 
     */

    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(time);
}

function playRhythm(soundsArray) {
    const hiHat = soundsArray[0];
    const kick = soundsArray[1];
    const snare = soundsArray[2];

    const tempo = 200; // Beats per minute
    const quarterNoteTime = 60 / tempo;
    const eighthNoteTime = quarterNoteTime / 2;

    const playButton = document.querySelector('[data-hook="play-button"]');

    playButton.addEventListener('click', () => {
        const startTime = audioContext.currentTime;

        playSound(hiHat, startTime);
        playSound(kick, startTime);
        playSound(kick, startTime + eighthNoteTime);
        playSound(hiHat, startTime + quarterNoteTime);
        playSound(hiHat, startTime + 2*quarterNoteTime);
        playSound(snare, startTime + 2*quarterNoteTime);
        playSound(hiHat, startTime + 3*quarterNoteTime);
        playSound(kick, startTime + 3*quarterNoteTime + eighthNoteTime);
        playSound(hiHat, startTime + 4*quarterNoteTime);
        playSound(kick, startTime + 4*quarterNoteTime + eighthNoteTime);
        playSound(hiHat, startTime + 5*quarterNoteTime);
        playSound(kick, startTime + 5*quarterNoteTime + eighthNoteTime);
        playSound(hiHat, startTime + 6*quarterNoteTime);
        playSound(snare, startTime + 6*quarterNoteTime);
    });
}

function decodeAudio(buffer) {
    return new Promise((resolve) => {
        audioContext.decodeAudioData(buffer, decodedData => {
            resolve(decodedData);
        });
    });

    // TODO: Research if need reject (because it's a native method)
        // reject(new Error(`Resonse went boom, status: ${response.status}`));
}

// TODO: Store the sounds in localStorage
async function fetchSound(file) {
    const response = await fetch(`../dist/audio/${file}.wav`);

    if (response.status !== 200) {
        // Throw error because that's how .catch in init would get it
        throw new Error(`Resonse went boom, status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    
    return decodeAudio(buffer);
}

function init() {
    const soundFiles = ['hi-hat', 'kick', 'snare'];

    const soundPromises = soundFiles.map(file => {
        return fetchSound(file);
    });

    Promise.all(soundPromises).then(soundPromise => {
        console.log(soundPromise);
        playRhythm(soundPromise);
    }).catch(err => {
        console.log(`fetch error: ${err}`);
    });
}

module.exports = {init: init};

/**
 * Next steps:
 * 
 * So far we have seen just a source and destination node, but WebAudio has many other node kinds. 
 * To create a drum app you could create multiple source nodes, one for each drum, connected to a single output using an AudioChannelMerger. 
 * We could also change the gain of each drum using AudioGainNodes.
 */


