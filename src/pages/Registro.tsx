import { useContext, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { UserContext } from '../context/UserContext'
import { API_URL } from '../api'
import type { User } from '../types'

function Registro() {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const [nickName, setNickName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [errorNickName, setErrorNickName] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [errorGeneral, setErrorGeneral] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErrorNickName('')
    setErrorEmail('')
    setErrorGeneral('')

    if (nickName.trim() === '') {
      setErrorNickName('El nickName es obligatorio.')
      return
    }
    if (email.trim() === '') {
      setErrorEmail('El email es obligatorio.')
      return
    }
    if (!email.includes('@')) {
      setErrorEmail('El email tiene que tener un @.')
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickName: nickName.trim(),
          email: email.trim(),
        }),
      })
      const data = await respuesta.json()

      if (!respuesta.ok) {
        setErrorGeneral(data.error + '. Puede que ese nickName ya esté en uso.')
        return
      }

      const usuarioCreado: User = data
      login(usuarioCreado)
      navigate('/perfil')
    } catch (error) {
      console.error('Error inesperado:', error)
      setErrorGeneral('No se pudo conectar con el servidor. Probá de nuevo más tarde.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Container className="py-5">
      <Card className="formulario mx-auto">
        <Card.Body>
          <h1 className="h3 mb-3">Crear cuenta</h1>

          {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

          <Form onSubmit={manejarEnvio} noValidate>
            <Form.Group className="mb-3" controlId="nickName">
              <Form.Label>NickName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre de usuario"
                value={nickName}
                onChange={(evento) => setNickName(evento.target.value)}
                isInvalid={errorNickName !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorNickName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                isInvalid={errorEmail !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorEmail}</Form.Control.Feedback>
            </Form.Group>

            <Form.Text className="d-block mb-3">
              La contraseña es la misma para todas las cuentas: 123456 (login simulado).
            </Form.Text>

            <Button type="submit" className="w-100" disabled={enviando}>
              {enviando ? 'Creando cuenta...' : 'Registrarme'}
            </Button>
          </Form>

          <p className="mt-3 mb-0 text-center">
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Registro
