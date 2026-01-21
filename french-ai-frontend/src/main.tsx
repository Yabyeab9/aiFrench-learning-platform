import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // <-- This must be here for Tailwind to work
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);