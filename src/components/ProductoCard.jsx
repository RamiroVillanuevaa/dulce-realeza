// aca arrancan los imports
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import styles from './ProductoCard.module.css'
// aca terminan los imports

function ProductoCard(props) {
  const producto = props.producto
  const sinStock = producto.stock === 0

  return (
    // aca arranca la card del producto (con las clases "card" de bootstrap)
    <div className={`card ${styles.card}`}>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className={sinStock ? `card-img-top ${styles.imagenSinStock}` : 'card-img-top'}
      />

      {/* aca arranca la info del producto */}
      <div className={`card-body ${styles.cuerpo}`}>
        <p className={styles.categoria}>{producto.categoria}</p>
        <h5 className="card-title">{producto.nombre}</h5>

        {producto.etiqueta !== '' ? <span className={styles.etiqueta}>{producto.etiqueta}</span> : null}

        <p className="card-text">{producto.descripcion}</p>

        {/* precio y stock */}
        <p className={styles.precio}>$ {producto.precio}</p>
        <p className={sinStock ? styles.sinStock : styles.stock}>
          {sinStock ? 'Sin stock' : `Stock: ${producto.stock}`}
        </p>

        {/* aca arrancan los botones, si no hay stock el de agregar se desactiva */}
        <div className={styles.botones}>
          <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark">Ver detalle</Link>
          <Button variant="dark" onClick={() => props.agregarAlCarrito(producto)} disabled={sinStock}>
            {sinStock ? 'Sin stock' : 'Agregar'}
          </Button>
        </div>
        {/* aca terminan los botones */}
      </div>
      {/* aca termina la info del producto */}
    </div>
    // aca termina la card del producto
  )
}

export default ProductoCard
