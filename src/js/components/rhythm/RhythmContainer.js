/**
 * See https://daveceddia.com/react-project-structure/
 * and https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 * and https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
 * and https://reactjs.org/docs/react-component.html#componentdidmount
 * 
 */

import React from 'react';
import Rhythm from './components/Rhythm';
import audioContext from './services/audioContext';

export default class RhythmContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            sounds: []
        };
    }

    // https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        const fileNames = ['hi-hat', 'kick', 'snare'];
        
        const promises = fileNames.map(file => {
            return fetch(`./dist/audio/${file}.wav`)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.arrayBuffer();
                })
                .then(buffer => {
                    // I don't know why this needs to be a 
                    // new promise (thought decodeAudioData returns a promise)
                    return new Promise(resolve => {
                        audioContext.decodeAudioData(buffer, decodedData => {
                            resolve(decodedData);
                        });
                    });
                })
                .catch(err => console.log(err));
        });

        Promise.all(promises).then(decodedBuffers => {
            this.setState({
                sounds: decodedBuffers
            });
        });
    }

    render() {
        console.log(this.state.sounds); // This logs null, then the sound.  So the did mount DOES cause a re-render
        // So you can say if it's null, show a loading thing, else pass the prop into the component?
        // Or at the presentation layer you can say if null there, should loading otherwise show the html or something.
        return <Rhythm sounds={this.state.sounds} />;
    }
}
