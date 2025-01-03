import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type Props = {};

const Footer: React.FC<Props> = () => {
    return (
            <footer>
                <Row>
                    <Col className="float-start">© 2024 Beth's Bon Bons & Cake Pops LLC</Col>
                    <Col>
                    <ListGroup horizontal className="float-end">
                        <ListGroupItem><a href="https://www.facebook.com/bethsbonbons/"><FaFacebook/></a></ListGroupItem>
                        <ListGroupItem><a href="https://www.instagram.com/bethsbonbons/"><FaInstagram/></a></ListGroupItem>
                        <ListGroupItem><a href="mailto:bethsbonbons@gmail.com"><MdEmail/></a></ListGroupItem>
                    </ListGroup>
                    </Col>
                </Row>
            </footer>
    )
};

export default Footer;
