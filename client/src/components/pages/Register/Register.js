import RegisterForm from "../../features/RegisterForm/RegisterForm";
import { Row, Col } from "react-bootstrap";

const Register = () => {
  
  return (
    <>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h1 className="text-center">
            Sign up
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <RegisterForm />
        </Col>
      </Row>
    </>
  );

};

export default Register;