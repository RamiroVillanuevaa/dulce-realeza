// aca arrancan los imports
import { Link } from 'react-router-dom'
import styles from './ResumenPedido.module.css'
// aca terminan los imports

// muestra el comprobante de la compra: los productos, el total y los datos del formulario
// todo llega adentro de props.pedido, que lo armo el carrito al confirmar
function ResumenPedido(props) {
  const pedido = props.pedido
  const datos = pedido.datos

  return (
    // aca arranca el resumen del pedido
    <div className={styles.resumen}>
      <p className="texto-chico">Compra simulada</p>
      <h1 className={styles.titulo}>¡Gracias, {datos.nombre}!</h1>
      <p className={styles.bajada}>Recibimos tu pedido. Este es el detalle:</p>

      {/* aca arranca el listado de productos, uno por renglon con map */}
      <h2 className={styles.subtitulo}>Productos</h2>
      <ul className={styles.lista}>
        {pedido.productos.map(item => (
          <li key={item.id} className={styles.renglon}>
            <span>{item.cantidad} x {item.nombre}</span>
            <span>$ {item.precio * item.cantidad}</span>
          </li>
        ))}
      </ul>
      <p className={`${styles.renglon} ${styles.total}`}>
        <span>Total ({pedido.cantidad} {pedido.cantidad === 1 ? 'producto' : 'productos'})</span>
        <span>$ {pedido.total}</span>
      </p>
      {/* aca termina el listado de productos */}

      {/* aca arrancan los datos que completaron en el formulario */}
      <h2 className={styles.subtitulo}>Tus datos</h2>
      <p className={styles.dato}><strong>Nombre y apellido:</strong> {datos.nombre} {datos.apellido}</p>
      <p className={styles.dato}><strong>Teléfono:</strong> {datos.telefono}</p>
      <p className={styles.dato}><strong>Email:</strong> {datos.email}</p>
      <p className={styles.dato}><strong>Entrega:</strong> {datos.entrega}</p>
      {/* si es envio mostramos la direccion que escribieron, si es retiro la del local */}
      {datos.entrega === 'Envío a domicilio'
        ? <p className={styles.dato}><strong>Dirección:</strong> {datos.direccion}</p>
        : <p className={styles.dato}><strong>Local:</strong> {datos.local}</p>}
      {/* la nota solo se muestra si escribieron algo */}
      {datos.nota !== '' ? <p className={styles.dato}><strong>Nota:</strong> {datos.nota}</p> : null}
      {/* aca terminan los datos */}

      <Link to="/productos" className={`btn btn-dark ${styles.boton}`}>Volver a la tienda</Link>
    </div>
    // aca termina el resumen del pedido
  )
}

export default ResumenPedido
