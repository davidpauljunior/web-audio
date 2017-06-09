// Sets up audio context
const audioContext = new window.AudioContext();

function playRhythm(sound) {
    // console.log(Array.isArray(soundsArray));
    // console.log(soundsArray[0]);
    // const hiHat = soundsArray[0];
    // const kick = soundsArray[1];
    // const snare = soundsArray[2];

    // TODO: Loop through soundsArray.
    // Start playing the rhythm 100ms from "now" (now being when you click);
    const startTime = audioContext.currentTime + 0.100;
    const tempo = 60; // Beats per minute

    const playButton = document.querySelector('[data-hook="play-button"]');    
    playButton.addEventListener('click', () => {
        playSound(sound, startTime);
        // playSound(hiHat, startTime + 0.5);
    });
}

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

// TODO Add try catch to the async using await
// TODO: Store the sounds in localStorage
async function fetchSounds() {
    // const soundFiles = ['hi-hat', 'kick', 'snare'];
    // let bufferSounds = [];

    fetch(`../dist/audio/hi-hat.wav`)
        .then(response => {
            return response.arrayBuffer();
        })
        .then(buffer => {
            audioContext.decodeAudioData(buffer, decodedData => {
                playRhythm(decodedData);
            });
        });

    // Promise.all(soundFiles.map(sound => {
    //     .then(response => {
    //         return response.arrayBuffer();
    //     })
    //     .then(buffer => {
    //         audioContext.decodeAudioData(buffer, decodedData => {
    //             bufferSounds.push(decodedData);
    //         });
    //     });
    // }));

    // playRhythm(bufferSounds);
}

module.exports = {init: fetchSounds};

/**
 * Next steps:
 * 
 * So far we have seen just a source and destination node, but WebAudio has many other node kinds. 
 * To create a drum app you could create multiple source nodes, one for each drum, connected to a single output using an AudioChannelMerger. 
 * We could also change the gain of each drum using AudioGainNodes.
 */


