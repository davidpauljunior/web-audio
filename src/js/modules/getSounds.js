import audioContext from './audioContext';

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
    
    // Sounds promises calls a function which
    // then calls arrayBuffer which returns a promise.
    // So that function needs to wait for that promise.
    // It then calls decode audio which returns a promise.
    const soundPromises = soundFiles.map(file => {
        return fetchSound(file);
    });
    
    // This function needs to wait for those promises before doing something.
    // You should end up with the decoded buffers so something needs renaming here for clarity.
    // Create a new promise here that resolves when all promises in soundPromises are resolved.
    // Phew.
    return Promise.all(soundPromises).then(soundPromise => {
        return soundPromise;
    }).catch(err => {
        console.log(`fetch error: ${err}`);
    });
}

export default init;


