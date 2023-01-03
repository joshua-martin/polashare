import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'

import { store } from './app/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.querySelector('.polashare-app'))

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
