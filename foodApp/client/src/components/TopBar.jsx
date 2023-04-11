import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdLocalOffer } from "react-icons/md";

const TopBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <h6 className="text-light my-2">
              <MdLocalOffer className="text-warning" /> &nbsp; Free Home
              Delivery on Order Above 500/- Rupees
            </h6>
            <Nav className="ms-auto">
              <LinkContainer to="/" activeClassName="">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about" activeClassName="">
                <Nav.Link>About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact" activeClassName="">
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/policy" activeClassName="">
                <Nav.Link>Terms and Policy</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
