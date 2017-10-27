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
        window.requestAnimationFrame(()=> {
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

export default init;
