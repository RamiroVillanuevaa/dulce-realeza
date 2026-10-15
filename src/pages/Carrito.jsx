// aca arrancan los imports
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import CarritoItem from '../components/CarritoItem'
import FormularioCompra from '../components/FormularioCompra'
import ResumenPedido from '../components/ResumenPedido'
import styles from './Carrito.module.css'
// aca terminan los imports

function Carrito(props) {
  const carrito = props.carrito

  // aca arrancan los estados de la pagina
  // mostrarFormulario: false muestra la lista, true muestra el formulario de finalizar compra
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  // pedido: arranca en null (no hay compra hecha), cuando confirman guarda todo lo que compraron
  const [pedido, setPedido] = useState(null)
  // aca terminan los estados

  // aca arrancan las cuentas con reduce (apunte de funciones)
  // total general: suma de todos los subtotales
  const total = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0)
  // cantidad total de productos: suma de todas las cantidades
  const cantidadTotal = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)
  // aca terminan las cuentas

  // aca arranca la confirmacion de la compra
  // la llama el formulario con los datos que completaron
  // guardamos una copia de los productos y el total ANTES de vaciar el carrito,
  // porque despues de vaciarlo ya no los tenemos
  function confirmarCompra(datos) {
    setPedido({
      productos: carrito.map(item => item),
      total: total,
      cantidad: cantidadTotal,
      datos: datos
    })
    props.vaciarCarrito()
  }
  // aca termina la confirmacion de la compra

  // VISTA 1: la compra ya se confirmo, mostramos el resumen del pedido
  if (pedido !== null) {
    return (
      <section className={`container ${styles.angosto}`}>
        <ResumenPedido pedido={pedido} />
      </section>
    )
  }

  // VISTA 2: el carrito esta vacio
  if (carrito.length === 0) {
    return (
      <section className={`container ${styles.vacio}`}>
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no agregaste nada. Date una vuelta por el catálogo.</p>
        <Link to="/productos" className="btn btn-dark">Ver productos</Link>
      </section>
    )
  }

  // VISTA 3: tocaron "Finalizar compra", mostramos el formulario
  if (mostrarFormulario) {
    return (
      <section className={`container ${styles.angosto}`}>
        <p className="texto-chico">Último paso</p>
        <h1>Finalizar compra</h1>
        <p className={styles.pedidoCorto}>
          Tu pedido: {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'} · Total <strong>$ {total.toLocaleString('es-AR')}</strong>
        </p>
        {/* le pasamos dos funciones por props:
            confirmarCompra para que nos mande los datos y volver para cerrar el formulario */}
        <FormularioCompra confirmarCompra={confirmarCompra} volver={() => setMostrarFormulario(false)} />
      </section>
    )
  }

  // VISTA 4: la lista del carrito
  return (
    <section className={`container ${styles.carrito}`}>
      <p className="texto-chico">Tu pedido</p>
      <h1>Carrito</h1>

      <div className={styles.contenido}>
        {/* aca arranca la lista de productos, un CarritoItem por cada uno */}
        <div className={styles.lista}>
          {carrito.map(item => (
            <CarritoItem
              key={item.id}
              item={item}
              cambiarCantidad={props.cambiarCantidad}
              eliminarDelCarrito={props.eliminarDelCarrito}
            />
          ))}
        </div>
        {/* aca termina la lista de productos */}

        {/* aca arranca el resumen con los totales */}
        <div className={styles.resumen}>
          <h2 className={styles.subtitulo}>Resumen</h2>
          <p className={styles.fila}>
            <span>Productos</span>
            <span>{cantidadTotal}</span>
          </p>
          <p className={`${styles.fila} ${styles.total}`}>
            <span>Total</span>
            <span>$ {total.toLocaleString('es-AR')}</span>
          </p>
          {/* este boton no cambia de pagina: da vuelta el estado y se muestra el formulario */}
          <Button variant="dark" className={styles.boton} onClick={() => setMostrarFormulario(true)}>
            Finalizar compra
          </Button>
          <Link to="/productos" className={`btn btn-outline-dark ${styles.boton}`}>Seguir comprando</Link>
        </div>
        {/* aca termina el resumen */}
      </div>
    </section>
  )
}

export default Carrito
