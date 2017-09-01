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
// TODO: Make the button pause - this means the left has to have been set, so can't just be 100%

const playSound = require('./playSound');

// TODO?: If we know that the notes must fit into certain spaces within a bar
// then we can work out a time at which they should be played because we know the
// length of the transition.
// E.g: if the time to get through a bar is 10 seconds, and the bar is split into
// 10 columns, we know that notes in column 1 should play after 1 second.
// This would mean we're not doing any DOM watching so this function would disappear.
// Would need to collect up all the notes from the bar and find out what column they're
// in, then say at x seconds in that bar, play all those notes (hi hat and bass for example)
function playNote(cursor, noteRect, sound) {
    const cursorRect = cursor.getBoundingClientRect();

    if (cursorRect.right >= noteRect.left) {
        playSound(sound);
    } else {
        window.requestAnimationFrame(() => {
            playNote(cursor, noteRect, sound);
        });
    }
}

function getSoundForNote(noteType, sounds) {
    let sound;
    if (noteType === 'hi-hat') {
        sound = sounds[0];
    } else if (noteType === 'kick') {
        sound = sounds[1];
    } else if (noteType === 'snare') {
        sound = sounds[2];
    }

    return sound;
}

function playBar(bar, sounds) {
    const cursor = bar.querySelector('[data-cursor]');
    const cursorRect = cursor.getBoundingClientRect();
    const nextBar = cursor.parentNode.nextElementSibling;

    cursor.style.transitionDuration = "5s"; // This will come from a user configured
    cursor.classList.add('is-playing');

    const notes = [...bar.querySelectorAll('[data-note]')];

    notes.forEach(note => {
        const noteType = note.dataset.note;
        const sound = getSoundForNote(noteType, sounds);
        const noteRect = note.getBoundingClientRect();

        playNote(cursor, noteRect, sound);
    });

    cursor.addEventListener("transitionend", event => {
        cursor.classList.remove('has-played');

        if (nextBar) {
            playBar(nextBar);
        } else {
            console.log('got here');
            return;
        }
    }, false);
}

function playRhythm(rhythm, sounds) {
    const firstBar = rhythm.querySelector('[data-bar]');
    const playButton = rhythm.querySelector('[data-play]');

    playButton.addEventListener('click', () => {
        playBar(firstBar, sounds);
    });
}

function init(sounds) {
    const rhythm = document.querySelector('[data-rhythm]');

    playRhythm(rhythm, sounds);
}

module.exports = { init };

},{"./playSound":5}],5:[function(require,module,exports){
const audioContext = require('./audioContext');

function playSound(buffer, time, triggerEl) {
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

    if (typeof triggerEl !== 'undefined') {
        triggerEl.classList.add('is-playing');

        sourceNode.onended = () => {
            triggerEl.classList.remove('is-playing');
        };
    }
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
