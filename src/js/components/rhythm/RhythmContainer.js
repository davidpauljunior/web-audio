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
// TODO: Pass the sounds into Rhythm as props
// import Rhythm from './Rhythm';

export default class RhythmContainer extends React.Component {
    // Is this right!?
    constructor(props) {
        super(props);
        this.state = { 
            sound: null
        };
    }

    // https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        
        fetch('./dist/audio/hi-hat.wav')
            .then(res => {
                this.setState({ 
                    sound: res
                });
                // console.log(res); // returns a wav file
                // this.state({posts});
            });
    }
    
    render() {
        console.log(this.state.sound); // This logs null, then the sound.  So the did mount DOES cause a re-render
        // So you can say if it's null, show a loading thing, else pass the prop into the component?
        // Or at the presentation layer you can say if null there, should loading otherwise show the html or something.
        return (
            <div>{this.state.sound}</div>
        );
        // return <Rhythm sounds={this.state.sounds} />;
    }
}



// Not sure this should be inside this componentWillMount() function call
// https://stackoverflow.com/questions/29676408/html-fetch-multiple-files
// const soundFiles = ['hi-hat', 'kick', 'snare'];
// let list = []; // Need to name properly once clearer
// let ressults = [];  // TODO: What is the purpose of this?

// TODO: .map instead of pushing to list?
// soundFiles.forEach((file, i) => {
//     list.push(
//         fetch(`./dist/audio/${file}.wav`)
//         .then(response => {
//             results[i] = response;
//         })
//         .catch(err=> {
//             console.log(`Fetch error: ${err}`);
//         })
//     )
// });

// READ THIS: https://daveceddia.com/ajax-requests-in-react/
// Promise.all(list)
// Fat arrow 'this'
// https://stackoverflow.com/questions/34483888/difference-between-bind-and-var-self-this
// .then(list => {
//     this.setState({
//         sounds: list
//     });
// });
