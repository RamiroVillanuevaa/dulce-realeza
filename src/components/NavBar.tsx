import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { UserContext } from '../context/UserContext'

function NavBar() {
  const { usuario, logout } = useContext(UserContext)
  const navigate = useNavigate()

  function cerrarSesion() {
    logout()
    navigate('/login')
  }

  return (
    <Navbar expand="md" className="barra" data-bs-theme="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          UnaHur Anti-Social Net
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-md-center">
            <Nav.Link as={NavLink} to="/" end eventKey="inicio">
              Inicio
            </Nav.Link>

            {usuario ? (
              <>
                <Nav.Link as={NavLink} to="/nuevo-post" eventKey="nuevo">
                  Nuevo post
                </Nav.Link>
                <Nav.Link as={NavLink} to="/perfil" eventKey="perfil">
                  @{usuario.nickName}
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-md-2 mt-2 mt-md-0"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" eventKey="login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro" eventKey="registro">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
