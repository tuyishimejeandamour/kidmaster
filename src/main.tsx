import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import './backend/node-api'
import './index.scss'


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);


postMessage({ payload: 'removeLoading' }, '*')
