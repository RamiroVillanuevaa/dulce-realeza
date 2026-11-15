import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

function NoEncontrada() {
  return (
    <Container className="py-5 text-center">
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </Container>
  )
}

export default NoEncontrada
