import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css';
import Main from './Main';
import * as serviceWorker from './serviceWorker';
import Store from './Store';

setTimeout(() => {
  ReactDOM.render(
    <HashRouter>
      <Store>
        <Main />
      </Store>
    </HashRouter>,
    document.getElementById('root')
  );
}, 1500);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
