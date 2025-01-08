import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Link from 'next/link';
import Image from 'next/image';
import siteLogo from '../images/site_logo.jpg';

type Props = {};

const MainNavBar: React.FC<Props> = () => {
  return (
    <Navbar expand="lg">
        <Container fluid>
            <Link className="navbar-brand" href="/"><Image src={siteLogo} alt="Beth's Bon Bons & Cake Pops"></Image></Link>
            <NavbarToggle ario-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link className="nav-item nav-link" href="/order">Order</Link>
                </Nav>
            </NavbarCollapse>
        </Container>
    </Navbar>
  );
};

export default MainNavBar;