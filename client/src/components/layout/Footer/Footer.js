import { Row, Col } from 'react-bootstrap';

const Footer = () => {

  return (
    <footer className="bg-primary text-white my-4 py-4 rounded">
      <Row className="align-items-center">
        <Col className="text-center" xs={12} md={4}>
          Fullstack Ads Board App ©
        </Col>
        <Col className="text-center my-4 my-md-0" xs={12} md={4}>
          Kodilla Bootcamp 2024
        </Col>
        <Col className="text-center" xs={12} md={4}>
          Natalia Laszczckowska
        </Col>
      </Row>
    </footer>
  );

};

export default Footer;