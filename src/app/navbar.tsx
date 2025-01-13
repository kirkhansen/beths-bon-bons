import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { Great_Vibes } from 'next/font/google';

const headerFont = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});


const MainNavBar: React.FC = () => {
  return (
    <Navbar>
        <Container fluid>
            {/* <Link className="navbar-brand" href="/"><Image src={siteLogo} alt="Beth's Bon Bons & Cake Pops"></Image></Link> */}
            <Link href="/" className={headerFont.className + " link-dark"}>Beth's Bon Bons & Cake Pops LLC</Link>
            <Nav className="ms-auto">
                <Link className="nav-item nav-link" href="/about">About</Link>
                <Link className="nav-item nav-link" href="/order">Order</Link>
            </Nav>
        </Container>
    </Navbar>
  );
};

export default MainNavBar;