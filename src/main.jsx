import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react";
import App from "./App.jsx";
import './index.css'
import ErrorBoundary from './ErrorBoundary.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider>
            <ErrorBoundary>
            <App/>
            </ErrorBoundary>
        </ChakraProvider>
    </React.StrictMode>
)
