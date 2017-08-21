const playSound = require('./playSound');

function hasNoteBeenPassed(cursor, note) {
    // TODO: don't want to keep defining this every animation call
    // Could take an obj which contains the cursor, the note, the note position?
    const noteRect = note.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();
    
    if (cursorRect.right >= noteRect.left) {
        console.log('note has now been passed')
        return true;
    } else {
        console.log('not yet passed');
        window.requestAnimationFrame(()=> {
            hasNoteBeenPassed(cursor, note)
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
