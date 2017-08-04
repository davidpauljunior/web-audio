function createCursorElement() {
    const barsArray = [...document.querySelectorAll('[data-bar]')];

    barsArray.forEach(bar => {
        const cursor = document.createElement('span');
        cursor.setAttribute('class', 'js-cursor');
        bar.insertBefore(cursor, bar.firstChild);
    })
}

function init() {
    createCursorElement();
}

module.exports = {init: init};
