(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const sounds = require('./modules/sounds');

document.addEventListener('DOMContentLoaded', () => {
    sounds.init();
});

},{"./modules/sounds":2}],2:[function(require,module,exports){
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

    // This needs to resolve a promise once the sound has finished playing (based on the length of the sound)
    // That promise can then be use to toggle a class to show what sounds are playing at what points.
}

function toggleClass(el, soundDuration) {
    const activeClassName = 'kit__pad--is-active';
    const durationMs = soundDuration * 1000;

    el.classList.add(activeClassName);
    setTimeout(() => {
        el.classList.remove(activeClassName);
    }, durationMs);
}

function playSoundFromPad(soundsArray) {
    const hiHat = soundsArray[0];
    const kick = soundsArray[1];
    const snare = soundsArray[2];

    const soundPads = document.querySelectorAll('[data-drum]');

    console.log(hiHat.duration, kick.duration, snare.duration);

    soundPads.forEach(pad => {
        const drum = pad.dataset.drum;

        pad.addEventListener('click', () => {
            if (drum == 'hi-hat') {
                playSound(hiHat);
                toggleClass(pad, hiHat.duration);
            } else if (drum == 'kick') {
                playSound(kick);
                toggleClass(pad, kick.duration);
            } else if (drum == 'snare') {
                playSound(snare);
                toggleClass(pad, snare.duration);
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'l' || event.key === 'q') {
                playSound(hiHat);
            } else if (event.key === 's') {
                playSound(kick);
            } else if (event.key === 'd') {
                playSound(snare);
            }
        });
    });
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playRhythm(soundsArray) {
    const hiHat = soundsArray[0];
    const kick = soundsArray[1];
    const snare = soundsArray[2];

    const tempo = 120; // Beats per minute
    const quarterNoteTime = 60 / tempo;
    const eighthNoteTime = quarterNoteTime / 2;

    const playButton = document.querySelector('[data-hook="play-button"]');

    playButton.addEventListener('click', () => {
        async function loopRhythm() {
            const startTime = audioContext.currentTime;

            playSound(hiHat, startTime);
            playSound(kick, startTime);
            playSound(hiHat, startTime + quarterNoteTime);
            playSound(snare, startTime + quarterNoteTime);

            playSound(hiHat, startTime + quarterNoteTime + quarterNoteTime);
            playSound(kick, startTime + quarterNoteTime + quarterNoteTime);
            playSound(kick, startTime + quarterNoteTime + quarterNoteTime + eighthNoteTime);
            playSound(hiHat, startTime + quarterNoteTime + quarterNoteTime + quarterNoteTime);
            playSound(snare, startTime + quarterNoteTime + quarterNoteTime + quarterNoteTime);

            await sleep(2000);
            loopRhythm();
        }

        loopRhythm();
    });
}

// Put the above into a function and do a setTimeout inside that with the delay an extra quarter beat.
// Clear internval or whatever to finish it.

function decodeAudio(buffer) {
    return new Promise(resolve => {
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
        playSoundFromPad(soundPromise);
    }).catch(err => {
        console.log(`fetch error: ${err}`);
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
