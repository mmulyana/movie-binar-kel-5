import React from 'react'
import {
  Navbar,
  Container,
  Nav,
  NavbarBrand,
  Button,
  Form,
} from 'react-bootstrap'

function Navigationbar({ isAuthenticated }) {
  return (
    <div>
      <Navbar>
        <Container>
          <NavbarBrand>MOVIELIST</NavbarBrand>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
          </Form>
          <Nav>
            {!isAuthenticated ? (
              <div>
                <Button variant='outline-danger'>Login</Button>
                <Button variant='danger'>Register</Button>
              </div>
            ) : (
              <Button>Logout</Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigationbar
