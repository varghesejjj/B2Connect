import React from 'react';
import ReactDOM from 'react-dom';

import './styles/login.css';
import { BrowserRouter as Router } from 'react-router-dom'

import { StoreContextProvider } from "./store/store"
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/index.css';
import App from './App';

ReactDOM.render(
  <StoreContextProvider>
    <Router>
      <App />
    </Router>
  </StoreContextProvider>,

  document.getElementById('root')
);