import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import siteLogoLg from "../images/site_logo_lg.png";
import Image from "next/image";
import Container from "react-bootstrap/Container";

const MainNavBar: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center row">
        <div className="col-6 col-lg-3 col-md-3 justify-content-center">
          <Link href="/">
            <Image
              className="img-fluid"
              src={siteLogoLg}
              alt="Beth's Bon Bons & Cake Pops"
            ></Image>
          </Link>
        </div>
      </div>
      <Navbar>
        <Container className="navbar-container">
          <Nav className="w-100 justify-content-between">
            <Link className="nav-link nav-column" href="/about">About</Link>
            <div className="divider"></div>
            <Link className="nav-link nav-column" href="/order">Order</Link>
            <div className="divider"></div>
            <Link className="nav-link nav-column" href="/gallery">Gallery</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavBar;
