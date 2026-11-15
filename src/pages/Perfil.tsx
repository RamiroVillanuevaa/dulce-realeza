import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import PostCard from '../components/PostCard'
import { UserContext } from '../context/UserContext'
import { API_URL } from '../api'
import type { Post } from '../types'

function Perfil() {
  const { usuario, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const idUsuario = usuario ? usuario.id : 0

  useEffect(() => {
    async function cargarMisPosts() {
      try {
        const respuesta = await fetch(`${API_URL}/posts?userId=${idUsuario}`)
        if (!respuesta.ok) {
          throw new Error('Error en la respuesta del servidor: ' + respuesta.status)
        }
        const data: Post[] = await respuesta.json()
        setPosts(data.reverse())
      } catch (error) {
        console.error('Error inesperado:', error)
        setError('No se pudieron cargar tus publicaciones.')
      } finally {
        setCargando(false)
      }
    }

    cargarMisPosts()
  }, [idUsuario])

  function cerrarSesion() {
    logout()
    navigate('/login')
  }

  if (!usuario) {
    return null
  }

  return (
    <Container className="py-4">
      <div className="cabecera-perfil mb-4">
        <div>
          <h1 className="h2 mb-1">@{usuario.nickName}</h1>
          <p className="text-muted mb-0">{usuario.email}</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/nuevo-post" className="btn btn-primary">
            Nueva publicación
          </Link>
          <Button variant="outline-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <h2 className="h4 mb-3">Mis publicaciones</h2>

      {cargando && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!cargando && !error && posts.length === 0 && (
        <Alert variant="info">
          Todavía no publicaste nada. <Link to="/nuevo-post">Creá tu primera publicación</Link>.
        </Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post.id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Perfil
