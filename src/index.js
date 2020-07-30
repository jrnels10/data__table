import React from 'react';
import ReactDOM from 'react-dom';
import Scratch from './Scratch';
// import Portal from './esri/portal.json';
import { Consumer, Provider } from './context';

ReactDOM.render(
  // <React.StrictMode>
  <Provider>
    <Consumer>
      {value => <Scratch value={value}  />}
    </Consumer>
  </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);