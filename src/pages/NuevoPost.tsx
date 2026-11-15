import { useContext, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { UserContext } from '../context/UserContext'
import { API_URL } from '../api'
import type { Post, Tag } from '../types'

function NuevoPost() {
  const { usuario } = useContext(UserContext)
  const navigate = useNavigate()

  const [descripcion, setDescripcion] = useState<string>('')
  const [urls, setUrls] = useState<string[]>([''])
  const [tagsElegidas, setTagsElegidas] = useState<number[]>([])

  const [tags, setTags] = useState<Tag[]>([])

  const [errorDescripcion, setErrorDescripcion] = useState<string>('')
  const [errorGeneral, setErrorGeneral] = useState<string>('')
  const [enviando, setEnviando] = useState<boolean>(false)

  useEffect(() => {
    async function cargarTags() {
      try {
        const respuesta = await fetch(`${API_URL}/tags`)
        if (!respuesta.ok) {
          throw new Error('Error en la respuesta del servidor: ' + respuesta.status)
        }
        const data: Tag[] = await respuesta.json()
        setTags(data)
      } catch (error) {
        console.error('Error inesperado:', error)
        setErrorGeneral('No se pudieron cargar las etiquetas.')
      }
    }

    cargarTags()
  }, [])

  function cambiarUrl(indice: number, valor: string) {
    const copia = [...urls]
    copia[indice] = valor
    setUrls(copia)
  }

  function agregarCampoUrl() {
    setUrls([...urls, ''])
  }

  function quitarCampoUrl(indice: number) {
    setUrls(urls.filter((_, i) => i !== indice))
  }

  function cambiarTag(idTag: number) {
    if (tagsElegidas.includes(idTag)) {
      setTagsElegidas(tagsElegidas.filter((id) => id !== idTag))
    } else {
      setTagsElegidas([...tagsElegidas, idTag])
    }
  }

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErrorDescripcion('')
    setErrorGeneral('')

    if (descripcion.trim() === '') {
      setErrorDescripcion('La descripción es obligatoria.')
      return
    }
    if (!usuario) {
      return
    }

    setEnviando(true)
    try {
      const respuestaPost = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: descripcion.trim(),
          userId: usuario.id,
          tagIds: tagsElegidas, // el back las espera como tagIds
        }),
      })
      if (!respuestaPost.ok) {
        throw new Error('Error al crear el post: ' + respuestaPost.status)
      }
      const postCreado: Post = await respuestaPost.json()

      const urlsCargadas = urls.filter((url) => url.trim() !== '')
      for (const url of urlsCargadas) {
        const respuestaImagen = await fetch(`${API_URL}/postimages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: url.trim(),
            postId: postCreado.id,
          }),
        })
        if (!respuestaImagen.ok) {
          throw new Error('Error al guardar una imagen: ' + respuestaImagen.status)
        }
      }

      navigate('/perfil')
    } catch (error) {
      console.error('Algo salió mal al crear la publicación:', error)
      setErrorGeneral('No se pudo crear la publicación. Probá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Container className="py-4">
      <Card className="formulario formulario-ancho mx-auto">
        <Card.Body>
          <h1 className="h3 mb-3">Nueva publicación</h1>

          {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

          <Form onSubmit={manejarEnvio} noValidate>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="¿Qué querés compartir?"
                value={descripcion}
                onChange={(evento) => setDescripcion(evento.target.value)}
                isInvalid={errorDescripcion !== ''}
              />
              <Form.Control.Feedback type="invalid">{errorDescripcion}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URLs de imágenes (opcional)</Form.Label>
              {urls.map((url, indice) => (
                <div key={indice} className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="url"
                    placeholder="https://..."
                    aria-label={'URL de imagen ' + (indice + 1)}
                    value={url}
                    onChange={(evento) => cambiarUrl(indice, evento.target.value)}
                  />
                  {urls.length > 1 && (
                    <Button variant="outline-danger" onClick={() => quitarCampoUrl(indice)}>
                      Quitar
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline-primary" size="sm" onClick={agregarCampoUrl}>
                + Agregar otra imagen
              </Button>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Etiquetas</Form.Label>
              <div>
                {tags.map((tag) => (
                  <Form.Check
                    inline
                    key={tag.id}
                    type="checkbox"
                    id={'tag-' + tag.id}
                    label={'#' + tag.name}
                    checked={tagsElegidas.includes(tag.id)}
                    onChange={() => cambiarTag(tag.id)}
                  />
                ))}
              </div>
            </Form.Group>

            <Button type="submit" disabled={enviando}>
              {enviando ? 'Publicando...' : 'Publicar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default NuevoPost
