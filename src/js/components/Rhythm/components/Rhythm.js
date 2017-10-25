import React from 'react';

/**
 * If it turns out that this doesn't render to the DOM,
 * then make it another container (or hoist data shit up 
 * into RhythmContainer (where most data comes from anyway))
 * 
 * Question is, what should render the bar HTML?
 */

export default class Rhythm extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (this.props.sounds.length) {
            return (
                <div>
                    <div>The sounds array has a length of {this.props.sounds.length}</div>
                    <div className="l-grid">
                        <div className="l-grid__item">What happens to me?</div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

// export default class Rhythm extends React.Component {
//     // https://stackoverflow.com/questions/38357234/is-it-possible-to-use-async-await-in-react-js
//     // May need to do some constructor stuff up here?

//     // Trying to get the component to only return the HTML IF the await returns with sounds.
//     // If it doesn't, it can return with a message in the UI saying couldn't retrieve sounds.
//     // But the site furniture (which isn't yet built), will be there and built.
//     // So this particular component can return and error or something.
//     async getAllSounds() {
//         const sounds = await getSounds();
//         // console.log(sounds);
//         // this needs a try catch to set the message to something else?
//     }

//     render() {
//         // Want to get the functions from playRhythm into here.

//         return (
//             <div className="p-rhythm" data-rhythm>
//                 <button type="button" 
//                         className="p-rhythm__play-button" 
//                         data-play>Play</button>
//                 <div className="p-rhythm__sheet">
//                     <div className="p-rhythm__bar" 
//                          data-bar>
//                         <span className="p-rhythm__cursor" 
//                               data-cursor></span>
//                     </div>
//                     <div className="p-rhythm__bar" 
//                          data-bar>
//                         <span className="p-rhythm__cursor" 
//                               data-cursor></span>
//                     </div>
//                     <div className="p-rhythm__bar" 
//                          data-bar>
//                         <span className="p-rhythm__cursor" 
//                               data-cursor></span>
//                     </div>
//                     <div className="p-rhythm__bar" 
//                          data-bar>
//                         <span className="p-rhythm__cursor" 
//                               data-cursor></span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };
