const playSound = require('./playSound');

function hasCursorPassedNote(bar, cursor, sounds) {
    const cursorRect = cursor.getBoundingClientRect();
    const notes = [...bar.querySelectorAll('[data-note]')];

    notes.forEach(note => {
        const noteRect = note.getBoundingClientRect();

        if (cursorRect.right >= noteRect.left) {
            console.log(sounds);
            console.log(cursorRect.right);
            console.log('BOOM SHAKALAKA');
            playSound(note, sounds[1]);
            return;
        }

        window.requestAnimationFrame(()=> {
                hasCursorPassedNote(bar, cursor, sounds)
        });
    });
}

function playRhythm(rhythm, sounds) {
    const bars = [...rhythm.querySelectorAll('[data-bar]')];
    const playButton = rhythm.querySelector('[data-play]');

    playButton.addEventListener('click', () => {
        bars.forEach((bar, i) => {
            const cursor = bar.querySelector('[data-cursor]');

            // needs to know when at end of that bar
            // then up the counter to next bar
            if (i === 0) {
                bar.dataset.currentBar = 'true';
                cursor.classList.add('is-playing');
            }

            hasCursorPassedNote(bar, cursor, sounds)
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
