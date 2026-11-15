import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import RutaProtegida from './components/RutaProtegida'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import DetallePost from './pages/DetallePost'
import Perfil from './pages/Perfil'
import NuevoPost from './pages/NuevoPost'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <>
      <NavBar />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/post/:id" element={<DetallePost />} />

          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/nuevo-post"
            element={
              <RutaProtegida>
                <NuevoPost />
              </RutaProtegida>
            }
          />

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
