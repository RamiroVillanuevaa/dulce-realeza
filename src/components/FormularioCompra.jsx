// aca arrancan los imports
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styles from './FormularioCompra.module.css'
// aca terminan los imports

// los locales donde se puede retirar el pedido
// por ahora hay uno solo, si abren otro se agrega aca y aparece solo en la lista
const locales = ['Zárate 52, San Antonio de Padua']

function FormularioCompra(props) {
  // aca arrancan los estados de los campos, uno por cada campo (clase 5)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [entrega, setEntrega] = useState('Envío a domicilio')
  const [direccion, setDireccion] = useState('')
  const [local, setLocal] = useState(locales[0])
  const [nota, setNota] = useState('')
  // aca terminan los estados de los campos

  // los mensajes de error, arrancan todos vacios
  const [errores, setErrores] = useState({ nombre: '', apellido: '', email: '', telefono: '', direccion: '' })

  // cuando cambian el tipo de entrega borramos la direccion,
  // porque el campo desaparece y vuelve a aparecer vacio
  function elegirEntrega(tipo) {
    setEntrega(tipo)
    setDireccion('')
  }

  // aca arranca la confirmacion
  // se llama con el onSubmit del formulario, revisa los campos uno por uno (estructuras de control)
  // preventDefault frena el comportamiento normal del form, que es recargar la pagina
  function confirmarCompra(e) {
    e.preventDefault()
    const nuevosErrores = { nombre: '', apellido: '', email: '', telefono: '', direccion: '' }
    let hayErrores = false

    // trim saca los espacios, asi "   " cuenta como vacio (clase 2)
    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'Ingresá tu nombre.'
      hayErrores = true
    }
    if (apellido.trim() === '') {
      nuevosErrores.apellido = 'Ingresá tu apellido.'
      hayErrores = true
    }
    if (email.trim() === '') {
      nuevosErrores.email = 'Ingresá tu email.'
      hayErrores = true
    } else if (!email.includes('@') || !email.includes('.')) {
      // un email valido tiene que tener arroba y punto
      nuevosErrores.email = 'Tiene que tener @ y un punto, por ejemplo nombre@mail.com.'
      hayErrores = true
    }
    if (telefono.trim() === '') {
      nuevosErrores.telefono = 'Ingresá tu teléfono.'
      hayErrores = true
    }
    // la direccion solo es obligatoria si es envio a domicilio
    if (entrega === 'Envío a domicilio' && direccion.trim() === '') {
      nuevosErrores.direccion = 'Ingresá la dirección de entrega.'
      hayErrores = true
    }

    setErrores(nuevosErrores)

    // si esta todo bien le pasamos los datos al carrito (el padre) con la funcion que nos dio por props
    // armamos el objeto escribiendo cada propiedad
    if (!hayErrores) {
      props.confirmarCompra({
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        entrega: entrega,
        direccion: direccion,
        local: local,
        nota: nota
      })
    }
  }
  // aca termina la confirmacion

  // le pone la clase de error al campo solo si tiene un mensaje de error
  function claseCampo(error) {
    return error !== '' ? `${styles.campo} ${styles.campoError}` : styles.campo
  }

  return (
    // aca arranca el formulario
    // es controlado: cada input muestra lo que hay en su estado (value) y lo actualiza con onChange
    <form className={styles.formulario} onSubmit={confirmarCompra}>
      {/* aca arranca la fila de nombre y apellido
          cada onChange guarda lo que escriben en su estado, igual que el ejemplo de la clase 5 */}
      <div className={styles.fila}>
        <label className={styles.etiqueta}>
          Nombre *
          <input type="text" className={claseCampo(errores.nombre)} value={nombre} onChange={e => setNombre(e.target.value)} />
          {errores.nombre !== '' ? <span className={styles.error}>{errores.nombre}</span> : null}
        </label>
        <label className={styles.etiqueta}>
          Apellido *
          <input type="text" className={claseCampo(errores.apellido)} value={apellido} onChange={e => setApellido(e.target.value)} />
          {errores.apellido !== '' ? <span className={styles.error}>{errores.apellido}</span> : null}
        </label>
      </div>
      {/* aca termina la fila de nombre y apellido */}

      {/* aca arranca la fila de email y telefono */}
      <div className={styles.fila}>
        <label className={styles.etiqueta}>
          Email *
          <input type="text" className={claseCampo(errores.email)} value={email} onChange={e => setEmail(e.target.value)} />
          {errores.email !== '' ? <span className={styles.error}>{errores.email}</span> : null}
        </label>
        <label className={styles.etiqueta}>
          Teléfono *
          <input type="text" className={claseCampo(errores.telefono)} value={telefono} onChange={e => setTelefono(e.target.value)} />
          {errores.telefono !== '' ? <span className={styles.error}>{errores.telefono}</span> : null}
        </label>
      </div>
      {/* aca termina la fila de email y telefono */}

      {/* aca arranca el tipo de entrega
          son dos botones, el elegido lleva la clase "activo" (igual que los filtros de productos)
          llevan type="button" porque adentro de un form un boton manda el formulario si no se lo aclaramos */}
      <p className={styles.etiqueta}>Tipo de entrega</p>
      <div className={styles.opciones}>
        <button
          type="button"
          className={entrega === 'Envío a domicilio' ? `${styles.opcion} ${styles.activo}` : styles.opcion}
          onClick={() => elegirEntrega('Envío a domicilio')}
        >
          Envío a domicilio
        </button>
        <button
          type="button"
          className={entrega === 'Retiro en el local' ? `${styles.opcion} ${styles.activo}` : styles.opcion}
          onClick={() => elegirEntrega('Retiro en el local')}
        >
          Retiro en el local
        </button>
      </div>

      {/* segun lo que eligieron mostramos una cosa u otra (ternario en jsx, clase 5)
          - envio a domicilio: el campo para escribir la direccion
          - retiro en el local: la lista de locales armada con map */}
      {entrega === 'Envío a domicilio' ? (
        <label className={styles.etiqueta}>
          Dirección de entrega *
          <input
            type="text"
            className={claseCampo(errores.direccion)}
            placeholder="Calle, número y localidad"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
          />
          {errores.direccion !== '' ? <span className={styles.error}>{errores.direccion}</span> : null}
        </label>
      ) : (
        <div>
          <p className={styles.etiqueta}>Elegí el local</p>
          <div className={styles.locales}>
            {locales.map(direccionLocal => (
              <button
                type="button"
                key={direccionLocal}
                className={direccionLocal === local ? `${styles.local} ${styles.localElegido}` : styles.local}
                onClick={() => setLocal(direccionLocal)}
              >
                <strong>Dulce Realeza</strong>
                <span>{direccionLocal}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* aca termina el tipo de entrega */}

      <label className={styles.etiqueta}>
        Nota (opcional)
        <input
          type="text"
          className={styles.campo}
          placeholder="Por ejemplo: timbre 2B, sin azúcar..."
          value={nota}
          onChange={e => setNota(e.target.value)}
        />
      </label>

      {/* aca arrancan los botones: confirmar o volver a la lista del carrito */}
      <div className={styles.botones}>
        <Button variant="outline-dark" type="button" onClick={props.volver}>Volver al carrito</Button>
        {/* type="submit": al tocarlo se dispara el onSubmit del form */}
        <Button variant="dark" type="submit">Confirmar compra</Button>
      </div>
      {/* aca terminan los botones */}
    </form>
    // aca termina el formulario
  )
}

export default FormularioCompra
