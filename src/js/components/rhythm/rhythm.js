import React from 'react';
// import getSounds from './modules/getSounds';

export default class Rhythm extends React.Component {
    // https://stackoverflow.com/questions/38357234/is-it-possible-to-use-async-await-in-react-js
    // May need to do some constructor stuff up here?

    // Trying to get the component to only return the HTML IF the await returns with sounds.
    // If it doesn't, it can return with a message in the UI saying couldn't retrieve sounds.
    // But the site furniture (which isn't yet built), will be there and built.
    // So this particular component can return and error or something.
    async getAllSounds() {
        const sounds = await getSounds();
        // console.log(sounds);
        // this needs a try catch to set the message to something else?
    }

    render() {
        // Want to get the functions from playRhythm into here.

        return (
            <div className="p-rhythm" data-rhythm>
                <button type="button" 
                        className="p-rhythm__play-button" 
                        data-play>Play</button>
                <div className="p-rhythm__sheet">
                    <div className="p-rhythm__bar" 
                         data-bar>
                        <span className="p-rhythm__cursor" 
                              data-cursor></span>
                    </div>
                    <div className="p-rhythm__bar" 
                         data-bar>
                        <span className="p-rhythm__cursor" 
                              data-cursor></span>
                    </div>
                    <div className="p-rhythm__bar" 
                         data-bar>
                        <span className="p-rhythm__cursor" 
                              data-cursor></span>
                    </div>
                    <div className="p-rhythm__bar" 
                         data-bar>
                        <span className="p-rhythm__cursor" 
                              data-cursor></span>
                    </div>
                </div>
            </div>
        );
    }
};
