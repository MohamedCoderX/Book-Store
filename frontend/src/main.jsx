import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { store } from './redux/store.js'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
<Provider store={store}>
<ToastContainer position="top-center" autoClose={2000} />
<RouterProvider router={router}/>

</Provider>
    
)
