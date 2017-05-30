document.addEventListener('DOMContentLoaded', () => {

    async function fetchSound(audioContext, sound) {
        const url = `../audio/${sound}.wav`;

        let soundBuffer = null;
        let response;

        // try {
        //     response = await fetch(url);
        // } catch (err) {
        //     return;
        // }

        // if(response.type == arrayBuffer) {

        // }

        const source = audioContext.createBufferSource();

        fetch(url)
        .then(response => { 
             return response.arrayBuffer(); 
        })
        .then(buffer => {
            audioContext.decodeAudioData(buffer, decodedData => {
                source.buffer = decodedData;
                console.log(source.buffer);
                // source.connect(audioCtx.destination);
            });
        });

        // if(response.arrayBuffer) {
        //     // const audio = response.arrayBuffer();
        //     console.log(response.type);
        //     audioContext.decodeAudioData(response.arrayBuffer(), buffer => {
        //         console.log(buffer);
        //     });
        // }

        // if (response.status == 200) {
        //     console.log('here');
        //     audioContext.decodeAudioData(response, buffer => {
        //         soundBuffer = buffer;
        //     });

        //     console.log(soundBuffer);
        // } else {
        //     console.log('booo');
        //     return false;
        // }
    }

    function initAudioContext() {
        const context = new window.AudioContext();
        fetchSound(context, 'hi-hat');
    }

    const playButton = document.querySelector('[data-hook="play-button"]');
    playButton.addEventListener('click', initAudioContext);
});
