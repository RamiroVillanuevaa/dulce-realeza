// aca arrancan los imports
import Button from 'react-bootstrap/Button'
import styles from './CarritoItem.module.css'
// aca terminan los imports

function CarritoItem(props) {
  const item = props.item
  // subtotal = precio por unidad x cantidad (lo pide el enunciado)
  const subtotal = item.precio * item.cantidad

  return (
    // aca arranca la fila de un producto del carrito
    <div className={styles.item}>
      <img src={item.imagen} alt={item.nombre} className={styles.imagen} />

      {/* aca arranca el nombre y el precio por unidad */}
      <div className={styles.info}>
        <h5 className={styles.nombre}>{item.nombre}</h5>
        <p className={styles.unitario}>$ {item.precio} c/u</p>
      </div>
      {/* aca termina el nombre y el precio por unidad */}

      {/* aca arrancan los botones de - y +
          el - se desactiva en 1 y el + cuando llegamos al stock */}
      <div className={styles.cantidad}>
        <Button
          variant="outline-dark"
          onClick={() => props.cambiarCantidad(item.id, -1)}
          disabled={item.cantidad === 1}
        >
          -
        </Button>
        <span className={styles.numero}>{item.cantidad}</span>
        <Button
          variant="outline-dark"
          onClick={() => props.cambiarCantidad(item.id, 1)}
          disabled={item.cantidad === item.stock}
        >
          +
        </Button>
      </div>
      {/* aca terminan los botones de - y + */}

      {/* aca arranca el subtotal y el boton de eliminar */}
      <div className={styles.final}>
        <p className={styles.subtotal}>$ {subtotal}</p>
        <Button variant="outline-danger" onClick={() => props.eliminarDelCarrito(item.id)}>
          Eliminar
        </Button>
      </div>
      {/* aca termina el subtotal y el boton de eliminar */}
    </div>
    // aca termina la fila de un producto del carrito
  )
}

export default CarritoItem
