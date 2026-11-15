import { useContext, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { UserContext } from '../context/UserContext'
import { API_URL, PASSWORD_FIJA } from '../api'
import type { User } from '../types'

function Login() {
  const { usuario, login } = useContext(UserContext)
  const navigate = useNavigate()

  const [nickName, setNickName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errorNickName, setErrorNickName] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string>('')
  const [errorGeneral, setErrorGeneral] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErrorNickName('')
    setErrorPassword('')
    setErrorGeneral('')

    if (nickName.trim() === '') {
      setErrorNickName('Ingresá tu nickName.')
      return
    }
    if (password === '') {
      setErrorPassword('Ingresá la contraseña.')
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch(`${API_URL}/users`)
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor: ' + respuesta.status)
      }
      const usuarios: User[] = await respuesta.json()
      const encontrado = usuarios.find((u) => u.nickName === nickName.trim())

      if (!encontrado) {
        setErrorNickName('No existe un usuario con ese nickName.')
        return
      }

      if (password !== PASSWORD_FIJA) {
        setErrorPassword('Contraseña incorrecta.')
        return
      }

      login(encontrado)
      navigate('/perfil')
    } catch (error) {
      console.error('Error inesperado:', error)
      setErrorGeneral('No se pudo conectar con el servidor. Probá de nuevo más tarde.')
    } finally {
      setEnviando(false)
    }
  }

  if (usuario) {
    return <Navigate to="/perfil" replace />
  }

  return (
    <Container className="py-5">
      <Card className="formulario mx-auto">
        <Card.Body>
          <h1 className="h3 mb-3">Iniciar sesión</h1>

          {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

          <Form onSubmit={manejarEnvio} noValidate>
            <Form.Group className="mb-3" controlId="nickName">
              <Form.Label>NickName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Por ejemplo: luna"
                value={nickName}
                onChange={(evento) => setNickName(evento.target.value)}
                isInvalid={errorNickName !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorNickName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                isInvalid={errorPassword !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorPassword}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={enviando}>
              {enviando ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>

          <p className="mt-3 mb-0 text-center">
            ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
