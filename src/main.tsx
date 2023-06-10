import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlockContextProvider } from './contexts/BlockContext'
import './css/index.css'
import { BlobDefs } from 'filterDefs/BlobDefs'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BlockContextProvider>
            <App />
            <BlobDefs/>
        </BlockContextProvider>
    </React.StrictMode>
)
