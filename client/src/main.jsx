import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
