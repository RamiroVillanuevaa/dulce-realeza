import { useContext, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import { UserContext } from '../context/UserContext'
import { API_URL } from '../api'
import type { Comment, Post, PostImage } from '../types'

function DetallePost() {
  const { id } = useParams()
  const { usuario } = useContext(UserContext)

  const [post, setPost] = useState<Post | null>(null)
  const [imagenes, setImagenes] = useState<PostImage[]>([])
  const [comentarios, setComentarios] = useState<Comment[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const [textoComentario, setTextoComentario] = useState<string>('')
  const [errorComentario, setErrorComentario] = useState<string>('')
  const [mensajeExito, setMensajeExito] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)

  useEffect(() => {
    async function cargarPost() {
      setCargando(true)
      setError('')
      try {
        const respuestaPost = await fetch(`${API_URL}/posts/${id}`)
        if (respuestaPost.status === 404) {
          setError('La publicación no existe.')
          return
        }
        if (!respuestaPost.ok) {
          throw new Error('Error en la respuesta del servidor: ' + respuestaPost.status)
        }
        const dataPost: Post = await respuestaPost.json()
        setPost(dataPost)

        const respuestaImagenes = await fetch(`${API_URL}/postimages/post/${id}`)
        if (!respuestaImagenes.ok) {
          throw new Error('Error al traer las imágenes: ' + respuestaImagenes.status)
        }
        const dataImagenes: PostImage[] = await respuestaImagenes.json()
        setImagenes(dataImagenes)

        const respuestaComentarios = await fetch(`${API_URL}/comments/post/${id}`)
        if (!respuestaComentarios.ok) {
          throw new Error('Error al traer los comentarios: ' + respuestaComentarios.status)
        }
        const dataComentarios: Comment[] = await respuestaComentarios.json()
        setComentarios(dataComentarios)
      } catch (error) {
        console.error('Error inesperado:', error)
        setError('No se pudo cargar la publicación. Revisá que el BackEnd esté encendido.')
      } finally {
        setCargando(false)
      }
    }

    cargarPost()
  }, [id])

  async function enviarComentario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErrorComentario('')
    setMensajeExito('')

    if (textoComentario.trim() === '') {
      setErrorComentario('El comentario no puede estar vacío.')
      return
    }
    if (!usuario || !post) {
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textoComentario.trim(),
          userId: usuario.id,
          postId: post.id,
        }),
      })
      if (!respuesta.ok) {
        throw new Error('Error en la solicitud: ' + respuesta.status)
      }

      setTextoComentario('')
      setMensajeExito('¡Comentario publicado!')
      const nuevo: Comment = await respuesta.json()
      setComentarios([...comentarios, { ...nuevo, User: usuario }])
    } catch (error) {
      console.error('Algo salió mal al crear el comentario:', error)
      setErrorComentario('No se pudo publicar el comentario. Probá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando publicación...</p>
      </Container>
    )
  }

  if (error || !post) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/">Volver al inicio</Link>
      </Container>
    )
  }

  return (
    <Container className="py-4 detalle">
      <Link to="/">← Volver al inicio</Link>

      <Card className="tarjeta-post mt-3">
        <Card.Body>
          {post.User && <Card.Subtitle className="autor mb-2">@{post.User.nickName}</Card.Subtitle>}
          <small className="text-muted d-block mb-3">
            Publicado el {new Date(post.createdAt).toLocaleDateString('es-AR')}
          </small>

          <Card.Text className="descripcion-completa">{post.description}</Card.Text>

          {imagenes.length > 0 && (
            <div className="galeria mb-3">
              {imagenes.map((imagen) => (
                <img key={imagen.id} src={imagen.url} alt={'Imagen del post ' + post.id} />
              ))}
            </div>
          )}

          <div>
            {post.Tags?.map((tag) => (
              <Badge key={tag.id} className="etiqueta me-1">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </Card.Body>
      </Card>

      <section className="mt-4">
        <h2 className="h4">Comentarios ({comentarios.length})</h2>

        {comentarios.length === 0 ? (
          <p className="text-muted">Todavía no hay comentarios. ¡Escribí el primero!</p>
        ) : (
          <ListGroup className="mb-3">
            {comentarios.map((comentario) => (
              <ListGroup.Item key={comentario.id}>
                <strong>@{comentario.User ? comentario.User.nickName : 'usuario'}</strong>{' '}
                <small className="text-muted">
                  · {new Date(comentario.createdAt).toLocaleDateString('es-AR')}
                </small>
                <p className="mb-0">{comentario.content}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {usuario ? (
          <Form onSubmit={enviarComentario} noValidate>
            <Form.Group className="mb-2" controlId="comentario">
              <Form.Label>Agregar un comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribí tu comentario..."
                value={textoComentario}
                onChange={(evento) => setTextoComentario(evento.target.value)}
                isInvalid={errorComentario !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorComentario}</Form.Control.Feedback>
            </Form.Group>

            {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

            <Button type="submit" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Comentar'}
            </Button>
          </Form>
        ) : (
          <Alert variant="info">
            Para comentar tenés que <Link to="/login">iniciar sesión</Link>.
          </Alert>
        )}
      </section>
    </Container>
  )
}

export default DetallePost
