const playSound = require('./playSound');

function hasNoteBeenPassed(cursor, noteRect, sound) {
    const cursorRect = cursor.getBoundingClientRect();
    
    if (cursorRect.right >= noteRect.left) {
        console.log('note has now been passed')
        playSound(sound);
    } else {
        console.log('not yet passed');
        window.requestAnimationFrame(()=> {
            hasNoteBeenPassed(cursor, noteRect, sound);
        });
    }
}

// Can the above could simply return a boolean??
// Keep calling the request anim until it returns true.
// if it returns true, call a different function called

function getSoundForNote(noteType, sounds) {
    let sound;
    if (noteType === 'kick') {
        sound = sounds[1];
    } else if (noteType === 'snare') {
        sound = sounds[2];
    }

    return sound;
}

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
                const noteType = note.dataset.note;
                const sound = getSoundForNote(noteType, sounds);

                const noteRect = note.getBoundingClientRect();
                hasNoteBeenPassed(cursor, noteRect, sound);
            });
        })  
    });
}

function init(sounds) {
    const rhythms = [...document.querySelectorAll('[data-rhythm]')];

    rhythms.forEach(rhythm => {
        playRhythm(rhythm, sounds);
    });
}

module.exports = {init: init};
