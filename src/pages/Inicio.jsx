// aca arrancan los imports
import { Link } from 'react-router-dom'
import productos from '../data/productos'
import ProductoCard from '../components/ProductoCard'
import styles from './Inicio.module.css'
// aca terminan los imports

// las categorias de la tienda, cada una con la foto que la representa
const categorias = [
  { nombre: 'Pastelería', imagen: '/dulce-realeza/img/cheesecake-oreo.jpg' },
  { nombre: 'Panadería', imagen: '/dulce-realeza/img/medialunas.jpg' },
  { nombre: 'Salados', imagen: '/dulce-realeza/img/tostado.jpg' },
  { nombre: 'Cafetería', imagen: '/dulce-realeza/img/cafe-con-leche.jpg' },
  { nombre: 'Regalos', imagen: '/dulce-realeza/img/caja-regalo.svg' }
]

function Inicio(props) {
  // destacados: los que tienen etiqueta (mas vendido, nuevo, oferta) y que tengan stock
  // es el mismo ejercicio de "destacados con stock" del apunte de estructuras de control, pero con filter
  const destacados = productos.filter(producto => producto.etiqueta !== '' && producto.stock > 0)

  return (
    <>
      {/* aca arranca la portada */}
      <section className={styles.portada}>
        <div className={`container ${styles.portadaContenido}`}>
          <div>
            <p className="texto-chico">Panadería · Cafetería · San Antonio de Padua</p>
            <h1 className={styles.titulo}>Recién horneado, todos los días</h1>
            <p className={styles.bajada}>
              Medialunas, chipá, tortas y el cafecito de siempre. Elegí lo que más te tienta,
              armá tu pedido online y pasalo a retirar por Zárate 52.
            </p>
            <div className={styles.acciones}>
              <Link to="/productos" className="btn btn-dark">Ver productos</Link>
              {/* este link usa hash, como en la clase 7: baja hasta la seccion "como comprar" */}
              <Link to={{ pathname: '/', hash: '#como-comprar' }} className="btn btn-outline-dark">
                ¿Cómo comprar?
              </Link>
            </div>
          </div>
          <img src="/dulce-realeza/img/logo.jpg" alt="Logo de Dulce Realeza" className={styles.logo} />
        </div>
      </section>
      {/* aca termina la portada */}

      {/* aca arrancan las categorias
          cada una te lleva al catalogo ya filtrado con un query string (clase 7) */}
      <section className="container">
        <h2 className={styles.tituloSeccion}>Nuestras categorías</h2>
        <div className={styles.categorias}>
          {categorias.map(cat => (
            <Link key={cat.nombre} to={`/productos?categoria=${cat.nombre}`} className={styles.categoria}>
              <img src={cat.imagen} alt={cat.nombre} />
              <span>{cat.nombre}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* aca terminan las categorias */}

      {/* aca arrancan los destacados, usan la misma card que el catalogo */}
      <section className="container">
        <h2 className={styles.tituloSeccion}>Destacados</h2>
        <div className="grilla">
          {destacados.map(producto => (
            <ProductoCard key={producto.id} producto={producto} carrito={props.carrito} agregarAlCarrito={props.agregarAlCarrito} cambiarCantidad={props.cambiarCantidad} eliminarDelCarrito={props.eliminarDelCarrito} />
          ))}
        </div>
        <div className={styles.centrado}>
          <Link to="/productos" className="btn btn-outline-dark">Ver todo el catálogo</Link>
        </div>
      </section>
      {/* aca terminan los destacados */}

      {/* aca arranca el como comprar (los 3 pasitos)
          el id="como-comprar" es a donde baja el link con hash de la portada */}
      <section id="como-comprar" className="container">
        <h2 className={styles.tituloSeccion}>¿Cómo comprar?</h2>
        <div className={styles.pasos}>
          <div className={styles.paso}>
            <p className={styles.numero}>1</p>
            <h3>Elegí</h3>
            <p>Recorré el catálogo y sumá al carrito lo que quieras.</p>
          </div>
          <div className={styles.paso}>
            <p className={styles.numero}>2</p>
            <h3>Confirmá</h3>
            <p>Completá tus datos y confirmá el pedido desde el carrito.</p>
          </div>
          <div className={styles.paso}>
            <p className={styles.numero}>3</p>
            <h3>Retirá</h3>
            <p>Te esperamos en Zárate 52, San Antonio de Padua, con todo listo.</p>
          </div>
        </div>
      </section>
      {/* aca termina el como comprar */}
    </>
  )
}

export default Inicio
