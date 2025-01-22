import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { email } from "../constants";

const Footer: React.FC = () => {
  return (
    <footer>
      <Row>
        <Col className="float-start">
          © 2024 Beth&lsquo;s Bon Bons & Cake Pops LLC
        </Col>
        <Col>
          <ListGroup horizontal className="float-end">
            <ListGroupItem>
              <a
                className="link-dark"
                href="https://www.facebook.com/bethsbonbons/"
              >
                <FaFacebook />
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a
                className="link-dark"
                href="https://www.instagram.com/bethsbonbons/"
              >
                <FaInstagram />
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a className="link-dark" href={`mailto:${email}`}>
                <MdEmail />
              </a>
            </ListGroupItem>
            <ListGroupItem>
              <a className="link-dark" href="tel:5152593038">
                <FaPhone />
              </a>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
