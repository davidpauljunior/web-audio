// const playRhythm = require('./modules/playRhythm');
// const getSounds = require('./modules/getSounds');

// document.addEventListener('DOMContentLoaded', () => {
//     async function init() {
//         const sounds = await getSounds.init();
//         // body.classList.remove('loading');

//         console.log(sounds);
//         playRhythm.init(sounds);
//     }

//     init();
// });

import React from 'react';
import ReactDOM from 'react-dom';

import Main from './layout/main';
// import getSounds from './modules/getSounds';

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
