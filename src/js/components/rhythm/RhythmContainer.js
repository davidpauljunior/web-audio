/**
 * See https://daveceddia.com/react-project-structure/
 * and https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 * and https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
 * and https://reactjs.org/docs/react-component.html#componentdidmount
 * 
 */

import React from 'react';
import Rhythm from './Rhythm';

export default class RhythmContainer extends React.Component {
    // TODO: what is props doing here?
    constructor() {
        super();
        this.state = { 
            sounds: [] // will now need to check array.length (See comments below about loading)
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
                    return response;
                })
                .catch(err => console.log(err));
        });

        Promise.all(promises).then(response => {
            this.setState({
                sounds: response
            });
        });
    }

    render() {
        // console.log(this.state.sounds); // This logs null, then the sound.  So the did mount DOES cause a re-render
        // So you can say if it's null, show a loading thing, else pass the prop into the component?
        // Or at the presentation layer you can say if null there, should loading otherwise show the html or something.
        return <Rhythm sounds={this.state.sounds} />;
    }
}
