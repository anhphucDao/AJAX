import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const root_element = document.getElementById('react-vtree-entry')
const react_root = ReactDOM.createRoot(root_element)
react_root.render(<App />)