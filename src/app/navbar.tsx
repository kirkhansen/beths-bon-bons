import Container from 'react-bootstrap/Container'
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Link from 'next/link';

function MainNavBar () {
  return (
    <Navbar expand="lg">
        <Container fluid>
            <Link className="navbar-brand" href="/">Beth's Bon Bons & Cake Pops</Link>
            <NavbarToggle ario-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link className="nav-item nav-link" href="/">Home</Link>
                    <Link className="nav-item nav-link" href="/order">Order</Link>
                </Nav>
            </NavbarCollapse>
        </Container>
    </Navbar>
  );
};

export default MainNavBar;