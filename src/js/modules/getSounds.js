const audioContext = require('./audioContext');

function decodeAudio(buffer) {
    return new Promise((resolve) => {
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

module.exports = {init: init};


