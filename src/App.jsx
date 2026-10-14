// aca arrancan los imports
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Contacto from './pages/Contacto'


function App() {
  // aca arranca el estado del carrito
  // el carrito vive aca en App y se lo pasamos por props a las paginas que lo usan
  const [carrito, setCarrito] = useState([])
  // aca termina el estado del carrito

  // aca arranca el scroll
  // cada vez que cambia la url:
  // - si tiene hash (por ej /#como-comprar) bajamos hasta esa seccion
  // - si no tiene, subimos hasta arriba, asi cada pagina nueva arranca desde el principio
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      document.querySelector('#root').scrollIntoView()
    }
  }, [location])
  // aca termina el scroll

  // aca arrancan las funciones del carrito

  // arma un objeto nuevo con los datos del producto y la cantidad que le pasamos
  // asi nunca modificamos el objeto que ya esta en el estado
  function copiarConCantidad(item, cantidad) {
    return {
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      imagen: item.imagen,
      stock: item.stock,
      cantidad: cantidad
    }
  }

  function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id)
    if (existente) {
      if (existente.cantidad >= producto.stock) return // no dejamos pasarnos del stock
      setCarrito(carrito.map(item =>
        item.id === producto.id ? copiarConCantidad(item, item.cantidad + 1) : item
      ))
    } else {
      // arma carrito en un array nuevo y hace pushs
      const nuevoCarrito = carrito.map(item => item)
      nuevoCarrito.push(copiarConCantidad(producto, 1))
      setCarrito(nuevoCarrito)
    }
  }

  // sumaOResta viene +1 o -1 segun el boton que toquen
  function cambiarCantidad(id, sumaOResta) {
    setCarrito(carrito.map(item => {
      if (item.id !== id) return item
      const nuevaCantidad = item.cantidad + sumaOResta
      if (nuevaCantidad < 1 || nuevaCantidad > item.stock) return item
      return copiarConCantidad(item, nuevaCantidad)
    }))
  }

  function eliminarDelCarrito(id) {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  // suma de todas las cantidades, es el numerito que sale en la navbar
  const cantidadTotal = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)
  // aca terminan las funciones del carrito

  return (
    <>
      {/* aca va la navbar */}
      <Navbar cantidadTotal={cantidadTotal} />

      {/* aca arrancan las rutas */}
      <main>
        <Routes>
          <Route path="/" element={<Inicio agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={
            <Carrito
              carrito={carrito}
              cambiarCantidad={cambiarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          } />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      {/* aca terminan las rutas */}

      {/* aca va el footer */}
      <Footer />
    </>
  )
}

export default App
