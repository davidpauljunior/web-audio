/**
 * See https://daveceddia.com/react-project-structure/
 * and https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
 * and https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
 * and https://reactjs.org/docs/react-component.html#componentdidmount
 * 
 * TODO: Refactor rhythm to take props which are passed in from here.
 * render() {
 *   return <Rhythm comments={this.state.comments} />;
 * }
 * 
 * Although rhythm doesn't actually take any props so.........
 * .....somewhere those sounds must be used somewhere.
 */

import React from 'react';
import Rhythm from './Rhythm';

export default class RhythmContainer extends React.Component {
    // Is this right!?
    constructor() {
        super();
        this.state = { sounds: [] }
    }

    // https://reactjs.org/docs/react-component.html#componentwillmount
    componentWillMount() {
        // Not sure this should be inside this componentWillMount() function call
        // https://stackoverflow.com/questions/29676408/html-fetch-multiple-files
        const soundFiles = ['hi-hat', 'kick', 'snare'];
        let list = []; // Need to name properly once clearer
        let results = []; 

        soundFiles.forEach((file, i) => {
            list.push(
                fetch(`./dist/audio/${file}.wav`)
                .then(response => {
                    results[i] = response;
                })
                .catch(err=> {
                    console.log(`Fetch error: ${err}`);
                })
            )
        });

        Promise.all(list)
        .then(sounds => this.setState)
    }
    
    render() {
        return <Rhythm sounds={this.state.sounds} />;
    }
}
