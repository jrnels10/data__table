import React from 'react';
import ReactDOM from 'react-dom';
import Scratch from './Scratch';
import Portal from './esri/portal.json';
import * as serviceWorker from './serviceWorker';
import { Consumer, Provider } from './context';


import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Consumer>
        {value => <Scratch value={value} portal={Portal.Recovery_portal} />}
      </Consumer>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
