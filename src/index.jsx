import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './index.css';
import Main from './Main';
import Store from './Store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <Store>
      <Main />
    </Store>
  </HashRouter>
);
