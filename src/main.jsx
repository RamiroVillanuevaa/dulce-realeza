// aca arrancan los imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// ojo con el orden: primero bootstrap y despues nuestro css, asi lo podemos pisar
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
// aca terminan los imports

// aca arranca el render de toda la app (igual que en la clase 7)
// el BrowserRouter envuelve todo para que las rutas anden en cualquier lado
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
// aca termina el render
