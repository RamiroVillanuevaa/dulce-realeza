// aca arrancan los imports
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styles from './Contacto.module.css'
// aca terminan los imports

function Contacto() {
  // aca arrancan los estados de los campos, uno por cada campo (clase 5)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  // aca terminan los estados de los campos

  // los mensajes de error, arrancan todos vacios
  const [errores, setErrores] = useState({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' })
  // pasa a true cuando mandan la consulta, para mostrar el mensaje de gracias
  const [enviado, setEnviado] = useState(false)

  // aca arranca el envio
  // se llama con el onSubmit del formulario, revisa los campos uno por uno (estructuras de control)
  // preventDefault frena el comportamiento normal del form, que es recargar la pagina
  function enviarConsulta(e) {
    e.preventDefault()
    const nuevosErrores = { nombre: '', apellido: '', email: '', telefono: '', mensaje: '' }
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
    if (mensaje.trim() === '') {
      nuevosErrores.mensaje = 'Escribí tu consulta.'
      hayErrores = true
    }

    setErrores(nuevosErrores)

    if (!hayErrores) {
      setEnviado(true)
    }
  }
  // aca termina el envio

  // le pone la clase de error al campo solo si tiene un mensaje de error
  function claseCampo(error) {
    return error !== '' ? `${styles.campo} ${styles.campoError}` : styles.campo
  }

  return (
    // aca arranca la pagina de contacto
    <section className={`container ${styles.contacto}`}>
      <p className="texto-chico">Escribinos</p>
      <h1>Contacto</h1>
      <p className={styles.bajada}>¿Querés encargar una torta o tenés alguna consulta? Dejanos tu mensaje y te respondemos.</p>

      {/* si ya mandaron la consulta mostramos el gracias, si no el formulario (ternario, clase 5) */}
      {enviado ? (
        <div className={styles.caja}>
          <h2>¡Gracias, {nombre}!</h2>
          <p>Recibimos tu mensaje. Te vamos a responder a {email} o al {telefono}.</p>
        </div>
      ) : (
        // formulario controlado: cada input muestra lo que hay en su estado (value) y lo actualiza con onChange
        <form className={styles.caja} onSubmit={enviarConsulta}>
          {/* aca arranca la fila de nombre y apellido */}
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

          {/* el espacio grande para escribir: textarea es el input de varias lineas de html */}
          <label className={styles.etiqueta}>
            Mensaje *
            <textarea
              rows="5"
              className={claseCampo(errores.mensaje)}
              placeholder="Contanos qué necesitás..."
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
            />
            {errores.mensaje !== '' ? <span className={styles.error}>{errores.mensaje}</span> : null}
          </label>

          <Button variant="dark" className={styles.boton} type="submit">
            Enviar mensaje
          </Button>
        </form>
      )}
    </section>
    // aca termina la pagina de contacto
  )
}

export default Contacto
