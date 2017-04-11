import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


let appState = {
  x:0,
  y:0,
  targetX:0,
  targetY:0
};

function onStateChange(newState) {
  Object.assign(appState, newState);
}

ReactDOM.render(<App data={appState} onStateChange={onStateChange} />, document.getElementById('root'));
