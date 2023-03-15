import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const DB_ADDR = 'http://localhost:3001/contacts'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
