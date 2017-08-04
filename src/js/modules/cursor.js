function createCursors(rhythm) {
    const bars = [...rhythm.querySelectorAll('[data-bar]')];
    const playButton = rhythm.querySelector('[data-play]');

    // Possible refactor:
    // fire an event when the play button is clicked
    // have the first bar (bar of index 0) listen the that even.
    // When it hears it, do some shit.
    // Publish / Subscribe

    bars.forEach(bar => {
        const cursor = document.createElement('span');
        cursor.setAttribute('class', 'js-cursor');
        bar.insertBefore(cursor, bar.firstChild);
    })
    
    playButton.addEventListener('click', () => {
        playRhythm(bars);
    });
}

function playRhythm(bars) {
    // May not need to loop, what about some kind of array selector like bars[0];

    bars.forEach((bar, i) => {
        const cursor = bar.querySelector('.js-cursor');

        console.log(bar, i);
        // needs to know when at end of that bar
        // then up the counter to next bar
        if (i === 0) {
            bar.dataset.currentBar = 'true';
            cursor.classList.add('is-playing');
        }
    })
}

// From the minute you press x, it triggers the cursor to move.

function init() {
    const rhythms = [...document.querySelectorAll('[data-rhythm]')];

    rhythms.forEach(rhythm => {
        createCursors(rhythm);
    });
}

module.exports = {init: init};
