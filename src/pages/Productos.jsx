// aca arrancan los imports
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import productos from '../data/productos'
import ProductoCard from '../components/ProductoCard'
import styles from './Productos.module.css'
// aca terminan los imports

// las categorias para los botones de filtro ("Todas" muestra todo)
const categorias = ['Todas', 'Pastelería', 'Panadería', 'Salados', 'Cafetería', 'Regalos']

function Productos(props) {
  // aca arrancan los estados de los filtros
  // si venimos del inicio con /productos?categoria=Panadería leemos la categoria de la url (clase 7)
  // si la url no trae categoria, get devuelve null y con ?? arrancamos en "Todas"
  const [searchParams] = useSearchParams()
  const [categoria, setCategoria] = useState(searchParams.get('categoria') ?? 'Todas')
  const [busqueda, setBusqueda] = useState('')
  const [soloConStock, setSoloConStock] = useState(false)
  // aca terminan los estados de los filtros

  // cada vez que escriben en el buscador guardamos el texto (como en la clase 5)
  function manejarBusqueda(e) {
    setBusqueda(e.target.value)
  }

  // aca arrancan los filtros, uno despues del otro
  // 1) por nombre (es el ejemplo del enunciado)
  const porNombre = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  // 2) por categoria: si esta en "Todas" pasan todos
  const porCategoria = porNombre.filter(producto =>
    categoria === 'Todas' || producto.categoria === categoria
  )
  // 3) solo con stock: si el boton esta apagado pasan todos
  const productosFiltrados = porCategoria.filter(producto =>
    !soloConStock || producto.stock > 0
  )
  // aca terminan los filtros

  return (
    <>
      {/* aca arranca el encabezado de la pagina */}
      <header className={styles.encabezado}>
        <div className="container">
          <p className="texto-chico">Panadería · Cafetería</p>
          <h1 className={styles.titulo}>Nuestros productos</h1>
          <p className={styles.bajada}>Todo lo que sale del horno cada mañana, para llevar o disfrutar acá con un cafecito.</p>
        </div>
      </header>
      {/* aca termina el encabezado */}

      <div className="container">
        {/* aca arrancan los botones de categoria
            el que coincide con la categoria elegida lleva la clase "activo" */}
        <div className={styles.filtros}>
          {categorias.map(cat => (
            <button
              key={cat}
              className={cat === categoria ? `${styles.chip} ${styles.activo}` : styles.chip}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* aca terminan los botones de categoria */}

        {/* aca arranca el buscador y el boton de stock */}
        <div className={styles.filtros}>
          <input
            type="text"
            className={styles.buscador}
            placeholder="Buscar: medialunas, chipá, café..."
            onChange={manejarBusqueda}
          />
          {/* el boton da vuelta el estado: de false a true y de true a false */}
          <button
            className={soloConStock ? `${styles.chip} ${styles.activo}` : styles.chip}
            onClick={() => setSoloConStock(!soloConStock)}
          >
            Solo con stock
          </button>
        </div>
        {/* aca termina el buscador */}

        <p className={styles.resultados}>Encontramos {productosFiltrados.length} productos</p>

        {/* aca arranca la grilla de productos
            si los filtros no encuentran nada mostramos un mensajito */}
        {productosFiltrados.length === 0 ? (
          <p className={styles.vacio}>No encontramos productos con esos filtros.</p>
        ) : (
          <div className="grilla">
            {productosFiltrados.map(producto => (
              <ProductoCard key={producto.id} producto={producto} agregarAlCarrito={props.agregarAlCarrito} />
            ))}
          </div>
        )}
        {/* aca termina la grilla de productos */}
      </div>
    </>
  )
}

export default Productos
