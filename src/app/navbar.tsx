import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import siteLogoLg from "../images/site_logo_lg.png";
import Image from "next/image";

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
      <Navbar>
        {/* <Link className="navbar-brand" href="/"><Image src={siteLogo} alt="Beth's Bon Bons & Cake Pops"></Image></Link> */}
        <Nav className="ms-auto">
          <Link className="nav-item nav-link" href="/about">
            About
          </Link>
          <Link className="nav-item nav-link" href="/order">
            Order
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default MainNavBar;
