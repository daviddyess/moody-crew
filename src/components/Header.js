import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Header extends Component {
  get userIcon() {
    return <FontAwesomeIcon icon="user-circle" />;
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <h3 className="text-warning">Moody Crew</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link as={NavLink} to="/">
                Servers
              </Nav.Link>
              <Nav.Link as={NavLink} to="/rules">
                Server Rules
              </Nav.Link>
              <Nav.Link as={NavLink} to="/stats">
                Player Stats
              </Nav.Link>
              <Nav.Link as={NavLink} to="/motd">
                MOTD
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
