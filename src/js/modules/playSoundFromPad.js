function playSoundFromPad(soundsArray) {
    const hiHat = soundsArray[0];
    const kick = soundsArray[1];
    const snare = soundsArray[2];
    
    const soundPads = document.querySelectorAll('[data-note]');

    console.log(hiHat.duration, kick.duration, snare.duration);

    soundPads.forEach(pad => {
        const note = pad.dataset.note;

        pad.addEventListener('click', () => {
            if(note == 'hi-hat') {
                playSound(hiHat, pad);
            }
            else if(note == 'kick') {
                playSound(kick, pad);
            }
            else if(note == 'snare') {
                playSound(snare, pad);
            }
        });
    });
}
