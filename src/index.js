import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import './static/css/bootstrap-grid.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/ru';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
