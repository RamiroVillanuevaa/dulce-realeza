import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import PostCard from '../components/PostCard'
import { UserContext } from '../context/UserContext'
import { API_URL } from '../api'
import type { Post, Tag } from '../types'

function Home() {
  const { usuario } = useContext(UserContext)

  const [posts, setPosts] = useState<Post[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [tagElegida, setTagElegida] = useState<number>(0) // 0 = todas
  const [cargando, setCargando] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function cargarFeed() {
      try {
        const respuestaPosts = await fetch(`${API_URL}/posts`)
        if (!respuestaPosts.ok) {
          throw new Error('Error en la respuesta del servidor: ' + respuestaPosts.status)
        }
        const dataPosts: Post[] = await respuestaPosts.json()
        setPosts(dataPosts.reverse()) // los mas nuevos primero

        const respuestaTags = await fetch(`${API_URL}/tags`)
        if (!respuestaTags.ok) {
          throw new Error('Error en la respuesta del servidor: ' + respuestaTags.status)
        }
        const dataTags: Tag[] = await respuestaTags.json()
        setTags(dataTags)
      } catch (error) {
        console.error('Error inesperado:', error)
        setError('No se pudieron cargar las publicaciones. Revisá que el BackEnd esté encendido.')
      } finally {
        setCargando(false)
      }
    }

    cargarFeed()
  }, [])

  const postsFiltrados =
    tagElegida === 0
      ? posts
      : posts.filter((post) => post.Tags?.some((tag) => tag.id === tagElegida))

  return (
    <>
      <section className="banner">
        <Container>
          <h1>UnaHur Anti-Social Net</h1>
          <p className="lead">La red social para compartir sin apuro: publicá, comentá y leé a tu ritmo.</p>
          {usuario ? (
            <Link to="/nuevo-post" className="btn btn-light">
              Crear una publicación
            </Link>
          ) : (
            <Link to="/registro" className="btn btn-light">
              Sumate a la comunidad
            </Link>
          )}
        </Container>
      </section>

      <Container className="py-4">
        <h2 className="mb-3">Publicaciones recientes</h2>

        {tags.length > 0 && (
          <div className="filtros mb-4">
            <Button
              size="sm"
              variant={tagElegida === 0 ? 'primary' : 'outline-primary'}
              onClick={() => setTagElegida(0)}
            >
              Todas
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag.id}
                size="sm"
                variant={tagElegida === tag.id ? 'primary' : 'outline-primary'}
                onClick={() => setTagElegida(tag.id)}
              >
                #{tag.name}
              </Button>
            ))}
          </div>
        )}

        {cargando && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Cargando publicaciones...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!cargando && !error && postsFiltrados.length === 0 && (
          <Alert variant="info">Todavía no hay publicaciones para mostrar.</Alert>
        )}

        <Row xs={1} md={2} lg={3} className="g-4">
          {postsFiltrados.map((post) => (
            <Col key={post.id}>
              <PostCard post={post} />
            </Col>
          ))}
        </Row>

        <section className="sobre-nosotros mt-5">
          <h2>Sobre nosotros</h2>
          <p>
            UnaHur Anti-Social Net es un proyecto de estudiantes de la Universidad Nacional de Hurlingham.
            Es una red social chiquita y tranquila: sin algoritmos, sin publicidad y sin contador de likes.
          </p>
          <p className="frase mb-0">"Menos scroll, más charla."</p>
        </section>
      </Container>
    </>
  )
}

export default Home
