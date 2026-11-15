import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { API_URL } from '../api'
import type { Comment, Post, PostImage } from '../types'

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  const [imagenes, setImagenes] = useState<PostImage[]>([])
  const [cantidadComentarios, setCantidadComentarios] = useState<number>(0)

  // GET /posts no trae imagenes ni comentarios, se piden aparte
  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuestaImagenes = await fetch(`${API_URL}/postimages/post/${post.id}`)
        if (!respuestaImagenes.ok) {
          throw new Error('Error al traer las imágenes: ' + respuestaImagenes.status)
        }
        const dataImagenes: PostImage[] = await respuestaImagenes.json()
        setImagenes(dataImagenes)

        const respuestaComentarios = await fetch(`${API_URL}/comments/post/${post.id}`)
        if (!respuestaComentarios.ok) {
          throw new Error('Error al traer los comentarios: ' + respuestaComentarios.status)
        }
        const dataComentarios: Comment[] = await respuestaComentarios.json()
        setCantidadComentarios(dataComentarios.length)
      } catch (error) {
        console.error('Error inesperado:', error)
      }
    }

    cargarDatos()
  }, [post.id])

  return (
    <Card className="tarjeta-post h-100">
      {imagenes.length > 0 && (
        <div className="tira-imagenes">
          {imagenes.map((imagen) => (
            <img key={imagen.id} src={imagen.url} alt={'Imagen del post ' + post.id} />
          ))}
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        {post.User && <Card.Subtitle className="autor mb-2">@{post.User.nickName}</Card.Subtitle>}

        <Card.Text className="descripcion-corta">{post.description}</Card.Text>

        <div className="mb-3">
          {post.Tags?.map((tag) => (
            <Badge key={tag.id} className="etiqueta me-1">
              #{tag.name}
            </Badge>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <small className="text-muted">
            {cantidadComentarios} {cantidadComentarios === 1 ? 'comentario' : 'comentarios'}
          </small>
          <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm">
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PostCard
