// Sets up audio context
const audioContext = new window.AudioContext();

function playRhythm(soundsArray) {

    console.log(Array.isArray(soundsArray));
    console.log(soundsArray[0]);
    console.log(soundsArray[1]);
    console.log(soundsArray[2]);
    const hiHat = soundsArray[0];
    const kick = soundsArray[1];
    const snare = soundsArray[2];

    // TODO: Loop through soundsArray.
    // Start playing the rhythm 100ms from "now" (now being when you click);
    const startTime = audioContext.currentTime + 0.100;
    const tempo = 120; // Beats per minute
    const quarterNoteTime = 60 / tempo;

    const playButton = document.querySelector('[data-hook="play-button"]');    
    playButton.addEventListener('click', () => {
        playSound(kick, startTime);
        // playSound(hiHat, startTime);
        playSound(kick, startTime + quarterNoteTime);
        playSound(hiHat, startTime + 2*quarterNoteTime);
        playSound(kick, startTime + 3*quarterNoteTime);
        // playSound(snare, startTime);
        // soundsArray.forEach(sound => {
        //     playSound(sound, startTime + Math.random());
        // })
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
    const soundFiles = ['hi-hat', 'kick', 'snare'];
    // let bufferSounds = [];

    // fetch(`../dist/audio/hi-hat.wav`)
    //     .then(response => {
    //         return response.arrayBuffer();
    //     })
    //     .then(buffer => {
    //         audioContext.decodeAudioData(buffer, decodedData => {
    //             playRhythm(decodedData);
    //         });
    //     });
        
    const files = soundFiles.map(sound => {
        return new Promise((resolve, reject) => { 
            fetch(`../dist/audio/${sound}.wav`).then(response => {
                return response.arrayBuffer();
            })
            .then(buffer => {
                audioContext.decodeAudioData(buffer, decodedData => {
                    resolve(decodedData);
                });
            });
         });
    });
    
    Promise.all(files).then(sounds => {
        playRhythm(sounds);
    });

    // var p1 = new Promise((resolve, reject) => { 
    // setTimeout(resolve, 1000, 'one'); 
    // }); 
    // var p2 = new Promise((resolve, reject) => { 
    // setTimeout(resolve, 2000, 'two'); 
    // });
    // var p3 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 3000, 'three');
    // });
    // var p4 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 4000, 'four');
    // });

    // Promise.all([p1, p2, p3, p4]).then(values => { 
    // console.log('all', values);
    // }, reason => {
    // console.log(reason)
    // });

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


