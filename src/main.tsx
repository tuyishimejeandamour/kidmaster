import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './backend/node-api'
import './index.scss'
import "@arco-design/web-react/dist/css/arco.css";


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App/>);


postMessage({payload: 'removeLoading'}, '*')
