// aca arrancan los imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//   primero bootstrap y despues nuestro css asi lo pisamos
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
// aca terminan los imports

// aca arranca el render de toda la app 
// el BrowserRouter envuelve todo para que las rutas anden en cualquier lado
// basename: en github pages todas las rutas cuelgan de /dulce-realeza/
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/dulce-realeza/">
    <App />
  </BrowserRouter>
)
// termina el render
