import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import siteLogoLg from "../images/site_logo_lg.png";
import Image from "next/image";
import Container from "react-bootstrap/Container";

const MainNavBar: React.FC = () => {
  return (
    <div>
      {/* <h1 className='row text-center'>
        <Link href="/" className={headerFont.className + " link-dark link-underline-opacity-0"}>Beth's Bon Bons & Cake Pops LLC</Link>
      </h1> */}
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
      {/* <div className="d-flex align-items-center row mt-3" style={{"backgroundColor": "#fe9aa0", "height": "80px"}}>
        <div className="col-3 col-lg-3 col-md-3 offset-md-0 offset-lg-2 offset-3">
          <Link className="nav-link" href="/about">About</Link>
        </div>
        <div className="col-3 col-lg-4 col-md-3 offset-md-6 offset-lg-1">
          <Link className="nav-link text-right" style={{"textAlign": "right"}} href="/order">Order</Link>
        </div>
      </div> */}
      <Navbar>
        <Container className="navbar-container">
          <Nav className="w-100 justify-content-between">
            <Link className="nav-link nav-column" href="/about">About</Link>
            <div className="divider"></div>
            <Link className="nav-link nav-column" href="/order">Order</Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar>
        <Link className="navbar-brand" href="/about">About</Link>
        <Nav className="ms-auto">
          {/* <Link className="nav-item nav-link" href="/about">
            About
          </Link> 
          <Link className="nav-item nav-link" href="/order">
            Order
          </Link>
        </Nav>
      </Navbar> */}
    </div>
  );
};

export default MainNavBar;
