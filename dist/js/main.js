(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./modules/getSounds":3,"./modules/playRhythm":4}],2:[function(require,module,exports){
let ctx;

function setAudioContext() {
    if (ctx) return ctx;
    ctx = new window.AudioContext();
    return ctx;
}

module.exports = ctx || setAudioContext();

},{}],3:[function(require,module,exports){
const audioContext = require('./audioContext');

function decodeAudio(buffer) {
    return new Promise(resolve => {
        audioContext.decodeAudioData(buffer, decodedData => {
            resolve(decodedData);
        });
    });

    // TODO: Research if need reject (because it's a native method)
    // reject(new Error(`Resonse went boom, status: ${response.status}`));
}

async function fetchSound(file) {
    const response = await fetch(`./dist/audio/${file}.wav`);

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

    return Promise.all(soundPromises).then(soundPromise => {
        return soundPromise;
    }).catch(err => {
        console.log(`fetch error: ${err}`);
    });
}

module.exports = { init: init };

},{"./audioContext":2}],4:[function(require,module,exports){
const playSound = require('./playSound');

function hasNoteBeenPassed(cursor, note) {
    // TODO: don't want to keep defining this every animation call
    // Could take an obj which contains the cursor, the note, the note position?
    const noteRect = note.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    if (cursorRect.right >= noteRect.left) {
        console.log('note has now been passed');
        return true;
    } else {
        console.log('not yet passed');
        window.requestAnimationFrame(() => {
            hasNoteBeenPassed(cursor, note);
        });
    }
}

// Can the above could simply return a boolean??
// Keep calling the request anim until it returns true.
// if it returns true, call a different function called

// doesn't require the sounds array
function playRhythm(rhythm, sounds) {
    const bars = [...rhythm.querySelectorAll('[data-bar]')];
    const playButton = rhythm.querySelector('[data-play]');

    playButton.addEventListener('click', () => {
        bars.forEach((bar, i) => {
            const cursor = bar.querySelector('[data-cursor]');
            const cursorRect = cursor.getBoundingClientRect();

            // needs to know when at end of that bar
            // then up the counter to next bar
            // let currentBar;
            // Then once the cursor gets to the end, bump the currentBar to be bar, i++ ??;

            // if (i === 0) { maybe something }

            bar.dataset.currentBar = 'true';
            cursor.classList.add('is-playing'); // starts the animation

            const notes = [...bar.querySelectorAll('[data-note]')];

            notes.forEach(note => {
                hasNoteBeenPassed(cursor, note);
            });
        });
    });
}

function init(sounds) {
    const rhythms = [...document.querySelectorAll('[data-rhythm]')];

    rhythms.forEach(rhythm => {
        playRhythm(rhythm, sounds);
    });
}

module.exports = { init: init };

},{"./playSound":5}],5:[function(require,module,exports){
const audioContext = require('./audioContext');

function playSound(triggerEl, buffer, time) {
    const startTime = typeof time === 'undefined' ? audioContext.currentTime : time;

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
    sourceNode.start(startTime);

    triggerEl.classList.add('is-playing');

    sourceNode.onended = () => {
        triggerEl.classList.remove('is-playing');
    };
}

module.exports = playSound;

/**
 * Next steps (copied from elsewhere) - do I need this??
 * 
 * So far we have seen just a source and destination node, but WebAudio has many other node kinds. 
 * To create a drum app you could create multiple source nodes, one for each drum, connected to a single output using an AudioChannelMerger. 
 * We could also change the gain of each drum using AudioGainNodes.
 */

},{"./audioContext":2}]},{},[1]);
