import React from 'react';
import ReactDOM from 'react-dom';

import {Router} from 'react-router';
import {createBrowserHistory} from 'history';

// Global style
import './assets/css/index.css'

// Components
import ErrorBoundary from './components/ErrorBoundary';
import { Navigator } from './navigator/Navigator';

export const history = createBrowserHistory()

ReactDOM.render(
   <ErrorBoundary>
     <Router history={history}>
        <Navigator/>
     </Router>
   </ErrorBoundary>,
  document.getElementById('root')
);