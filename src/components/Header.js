import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink to="/" className="nav-link" exact>
            Home
          </NavLink>
        </Nav>
        <Nav>
          <NavLink to="/options" className="nav-link" exact>
            Options
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
