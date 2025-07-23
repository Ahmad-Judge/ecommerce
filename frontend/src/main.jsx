import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home/home.jsx'
import AdminPanel from './admin/AdminPanel.jsx'
import { Provider } from "react-redux"; // ✅ Add this line
import { store } from "./redux/store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={store}>

    <Home />
       </Provider>
  </StrictMode>,
)
