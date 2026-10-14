// aca arrancan los imports
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import productos from '../data/productos'
import styles from './DetalleProducto.module.css'
// aca terminan los imports

function DetalleProducto(props) {
  // aca arranca la busqueda del producto
  // el id viene de la url (/producto/3) y llega como texto "3" (clase 7)
  // por eso lo pasamos a numero con Number y despues comparamos con ===: Number("3") da 3
  const { id } = useParams()
  const producto = productos.find(p => p.id === Number(id))
  // aca termina la busqueda del producto

  // el texto del cartelito que aparece al tocar agregar ('' = no se muestra nada)
  const [mensaje, setMensaje] = useState('')

  // aca arranca el caso de producto que no existe (por ej /producto/999)
  // find no encontro nada y devolvio undefined
  if (!producto) {
    return (
      <div className={`container ${styles.noEncontrado}`}>
        <h1>Producto no encontrado</h1>
        <p>Capaz se agotó o el link está mal escrito.</p>
        <Link to="/productos" className="btn btn-dark">Volver al catálogo</Link>
      </div>
    )
  }
  // aca termina el caso de producto que no existe

  const sinStock = producto.stock === 0

  // agregarAlCarrito nos dice con true o false si lo pudo sumar
  // y segun eso elegimos el texto del cartel
  function manejarAgregar() {
    const seAgrego = props.agregarAlCarrito(producto)
    if (seAgrego) {
      setMensaje('Listo, lo sumaste al carrito.')
    } else {
      setMensaje('Ya tenés en el carrito todo el stock disponible.')
    }
  }

  return (
    // aca arranca el detalle del producto
    <div className={`container ${styles.detalle}`}>
      {/* aca arranca la foto grande */}
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className={sinStock ? `${styles.imagen} ${styles.imagenSinStock}` : styles.imagen}
      />
      {/* aca termina la foto grande */}

      {/* aca arranca la info */}
      <div>
        <p className="texto-chico">{producto.categoria}</p>
        <h1 className={styles.nombre}>{producto.nombre}</h1>
        {producto.etiqueta !== '' ? <span className={styles.etiqueta}>{producto.etiqueta}</span> : null}
        <p className={styles.precio}>$ {producto.precio}</p>
        <p>{producto.descripcionLarga}</p>

        {/* lista de caracteristicas, sale del array del producto con un map */}
        <h2 className={styles.subtitulo}>Características</h2>
        <ul>
          {producto.caracteristicas.map(caracteristica => (
            <li key={caracteristica}>{caracteristica}</li>
          ))}
        </ul>

        <p className={sinStock ? styles.sinStock : styles.stock}>
          {sinStock ? 'Sin stock por ahora, volvé pronto' : `Quedan ${producto.stock} disponibles`}
        </p>

        {/* aca arrancan los botones */}
        <div className={styles.acciones}>
          <Button variant="dark" onClick={manejarAgregar} disabled={sinStock}>
            {sinStock ? 'Sin stock' : 'Agregar al carrito'}
          </Button>
          <Link to="/productos" className="btn btn-outline-dark">Volver al catálogo</Link>
        </div>
        {/* aca terminan los botones */}

        {/* el cartelito solo aparece despues de tocar agregar */}
        {mensaje !== '' ? (
          <p className={styles.confirmacion}>
            {mensaje} <Link to="/carrito">Ver carrito</Link>
          </p>
        ) : null}
      </div>
      {/* aca termina la info */}
    </div>
    // aca termina el detalle del producto
  )
}

export default DetalleProducto
