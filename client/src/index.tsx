import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { HashRouter } from "react-router-dom";

const rootElement = document.getElementById('root')!;

const reactRoot = ReactDOM.createRoot(rootElement);
reactRoot.render(<HashRouter><App /></HashRouter>)

//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept('./App', () => {
        const reactRoot = ReactDOM.createRoot(rootElement);
        reactRoot.render(<HashRouter><App /></HashRouter>)
    });
}

// const root = ReactDOM.hydrateRoot(rootElement, <App />); // Use hydrateRoot for SSR

// //@ts-ignore
// if (module.hot) {
//     //@ts-ignore
//     module.hot.accept('./App', () => {
//         const NextApp = require('./App').default;
//         ReactDOM.hydrateRoot(rootElement, <NextApp />); // Re-render when HMR updates the code
//     });
// }