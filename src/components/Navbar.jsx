// aca arrancan los imports
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
// aca terminan los imports

function Navbar(props) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  // NavLink nos avisa con isActive si el link es el de la pagina actual
  // si esta activo le sumamos la clase "activo" para marcarlo
  const claseLink = ({ isActive }) => isActive ? `${styles.link} ${styles.activo}` : styles.link

  return (
    // aca arranca la navbar
    <header className={styles.barra}>
      <div className={`container ${styles.contenido}`}>
        {}
        <Link to="/" className={styles.marca} onClick={cerrarMenu}>
          <img src="/dulce-realeza/img/logo-header.jpg" alt="Logo de Dulce Realeza" width="44" height="44" />
          <span>Dulce Realeza</span>
        </Link>
        {}

        {/* boton que aparece solo en el celu, da vuelta el estado del menu */}
        <button className={styles.botonMenu} onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? 'Cerrar' : 'Menú'}
        </button>

        {/* aca arrancan los links del menu
            si menuAbierto es true le sumamos la clase que lo muestra */}
        <nav className={menuAbierto ? `${styles.menu} ${styles.menuAbierto}` : styles.menu}>
          <Link to="/" className={styles.link} onClick={cerrarMenu}>Inicio</Link>
          <NavLink to="/productos" className={claseLink} onClick={cerrarMenu}>Productos</NavLink>
          <NavLink to="/contacto" className={claseLink} onClick={cerrarMenu}>Contacto</NavLink>
          <NavLink to="/carrito" className={claseLink} onClick={cerrarMenu}>
            Carrito <span className={styles.contador}>{props.cantidadTotal}</span>
          </NavLink>
        </nav>
        {/* aca terminan los links del menu */}
      </div>
    </header>
    // aca termina la navbar
  )
}

export default Navbar
