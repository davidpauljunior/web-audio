(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        fetch(url).then(response => {
            return response.arrayBuffer();
        }).then(buffer => {
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

},{}]},{},[1]);
