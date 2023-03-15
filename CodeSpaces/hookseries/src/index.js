import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';


import StateHook from './StateHook';
import EffectHook1 from './EffectHook1'
import EffectHook2 from './EffectHook2'
import MemoHook from './MemoHook.js'
import CallbackHook from './CallbackHook'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>State Hook</h1>
    <StateHook />
    <h1>Effect Hook</h1>
    <h3>Part 1</h3>
    <EffectHook1 />
    <h3>Part 2</h3>
    <EffectHook2 />
    <h1>Memo Hook</h1>
    <MemoHook />
    <h1>Callback Hook</h1>
    <CallbackHook />
  </React.StrictMode>
);

reportWebVitals();
