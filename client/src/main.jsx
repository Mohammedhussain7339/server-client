import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import axios from 'axios'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>

  </React.StrictMode>
)
