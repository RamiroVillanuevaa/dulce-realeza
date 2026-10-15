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
  // el carrito esta en App y se lo pasamos por props a las paginas
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('dulce-realeza-carrito')
    return guardado ? JSON.parse(guardado) : []
  })
  useEffect(() => {
    localStorage.setItem('dulce-realeza-carrito', JSON.stringify(carrito))
  }, [carrito])

  
  //  arranca el scroll
  // cada vez que cambia la url:
  //  si tiene hash (por ej /#como-comprar) bajamos hasta esa seccion
  //  si no tiene, subimos hasta arriba, asi cada pagina nueva arranca desde el principio
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

  // devuelve true si lo pudo sumar y false si ya no queda stock,
  // asi el boton que la llamo sabe que cartel mostrar
  function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id) //busca en el carro si hay un producto con la misma id
    if (existente) { //si existe y la cantidad es menor al stock de ese producto, agrega ese producto +1 cada vez q se toca el boton
      if (existente.cantidad >= producto.stock) return false // pero no lo deja pasarse del stock
      setCarrito(carrito.map(item =>
        item.id === producto.id ? copiarConCantidad(item, item.cantidad + 1) : item
      ))
    } else {
      // arma carrito en un array nuevo y hace push para colocar ese item al final del array (visualmente en la pag, abajo del ultimo producto agregado)
      const nuevoCarrito = carrito.map(item => item)
      nuevoCarrito.push(copiarConCantidad(producto, 1))
      setCarrito(nuevoCarrito)
    }
    return true
  }

  // sumaOResta viene +1 o -1 segun el boton que toquen dentro de carrito
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
          <Route path="/" element={<Inicio carrito={carrito} agregarAlCarrito={agregarAlCarrito} cambiarCantidad={cambiarCantidad} eliminarDelCarrito={eliminarDelCarrito} />} />
          <Route path="/productos" element={<Productos carrito={carrito} agregarAlCarrito={agregarAlCarrito} cambiarCantidad={cambiarCantidad} eliminarDelCarrito={eliminarDelCarrito} />} />
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
