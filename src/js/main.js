const cursor = require('./modules/cursor');
const sounds = require('./modules/sounds');

document.addEventListener('DOMContentLoaded', () => {
    sounds.init();
    cursor.init();
});
