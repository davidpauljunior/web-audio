let ctx;

function setAudioContext() {
    if (ctx) return ctx;
    ctx = new window.AudioContext()
    return ctx;
}

module.exports = ctx || setAudioContext();
