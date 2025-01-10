import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import siteLogo from '../images/site_logo.png';

const MainNavBar: React.FC = () => {
  return (
    <Navbar>
        <Container fluid>
            <Link className="navbar-brand" href="/"><Image src={siteLogo} alt="Beth's Bon Bons & Cake Pops"></Image></Link>
            <Nav className="ms-auto">
                <Link className="nav-item nav-link" href="/about">About</Link>
                <Link className="nav-item nav-link" href="/order">Order</Link>
            </Nav>
        </Container>
    </Navbar>
  );
};

export default MainNavBar;