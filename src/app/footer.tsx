import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
    return (
        <Container className="fixed-bottom p-3">
            <Row>
                <Col className="float-start">© 2024 Beth's Bon Bons & Cake Pops LLC. All rights reserved.</Col>
                <Col>
                <ListGroup horizontal className="float-end">
                    <ListGroupItem><a href="https://www.facebook.com/bethsbonbons/"><FaFacebook/></a></ListGroupItem>
                    <ListGroupItem><a href=""><FaInstagram/></a></ListGroupItem>
                    <ListGroupItem><a href="mailto:bethsbonbons@gmail.com"><MdEmail/></a></ListGroupItem>
                </ListGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default Footer;
