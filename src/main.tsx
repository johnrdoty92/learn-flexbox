import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlockContextProvider } from './contexts/BlockContext'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BlockContextProvider>
            <App />
        </BlockContextProvider>
    </React.StrictMode>
)
