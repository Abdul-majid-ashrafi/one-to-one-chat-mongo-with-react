import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AllRoutes } from './config/router'

// import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AllRoutes />, document.getElementById('root'));
registerServiceWorker();
