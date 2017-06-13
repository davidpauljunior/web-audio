(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const sounds = require('./modules/sounds');

document.addEventListener('DOMContentLoaded', () => {
    sounds.init();
});

},{"./modules/sounds":2}],2:[function(require,module,exports){
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
        playSound(hiHat, startTime + 2 * quarterNoteTime);
        playSound(kick, startTime + 3 * quarterNoteTime);
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

// TODO: Store the sounds in localStorage
function fetchSound(file) {

    // fetch(`../dist/audio/hi-hat.wav`)
    //     .then(response => {
    //         return response.arrayBuffer();
    //     })
    //     .then(buffer => {
    //         audioContext.decodeAudioData(buffer, decodedData => {
    //             playRhythm(decodedData);
    //         });
    //     });

    /**
     * https://developers.google.com/web/fundamentals/getting-started/primers/promises
     * The promise constructor takes one argument, a callback with two parameters, resolve and reject. 
     * Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.
     */
    return new Promise((resolve, reject) => {

        // Should this be an if (successful response.
        fetch(`../dist/audio/${file}.wav`).then(response => {
            if (response.status !== 200) {
                console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                return;
            }

            response.arrayBuffer().then(buffer => {
                audioContext.decodeAudioData(buffer, decodedData => {
                    resolve(decodedData); // TODO: check this (can it be a return?)
                });
            });
        })

        // Where do I put the reject?
        .catch(err => {
            console.log(`fetch error: ${err}`);
        });
    });

    // const files = soundFiles.map(sound => {
    //     return new Promise((resolve, reject) => { 
    //         fetch(`../dist/audio/${sound}.wav`).then(response => {
    //             return response.arrayBuffer();
    //         })
    //         .then(buffer => {
    //             audioContext.decodeAudioData(buffer, decodedData => {
    //                 resolve(decodedData);
    //             });
    //         });
    //      });
    // });

    // Promise.all(files).then(sounds => {
    //     playRhythm(sounds);
    // });
}

function init() {
    const soundFiles = ['hi-hat', 'kick', 'snare'];

    // This returns the audio buffers but not in an array.
    soundFiles.map(file => {
        fetchSound(file).then(sound => {
            console.log(sound);
        });
    });

    //this line works -> gives the audio buffer
    fetchSound('hi-hat').then(sound => {
        console.log(sound);
    });
}

module.exports = { init: init };

/**
 * Next steps:
 * 
 * So far we have seen just a source and destination node, but WebAudio has many other node kinds. 
 * To create a drum app you could create multiple source nodes, one for each drum, connected to a single output using an AudioChannelMerger. 
 * We could also change the gain of each drum using AudioGainNodes.
 */

},{}]},{},[1]);
