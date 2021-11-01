import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from "../logo.png";
import React from "react";
import { routes } from "../routes";

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{marginRight: "10px"}}
            />
            LanA
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          {routes.map((route, index) => (
            <LinkContainer to={route.path}>
              <Nav.Link>{route.label}</Nav.Link>
            </LinkContainer>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
