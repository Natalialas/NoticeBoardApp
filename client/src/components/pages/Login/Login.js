import LoginForm from "../../features/LoginForm/LoginForm";
import { Row, Col } from "react-bootstrap";

const Login = () => {
  
  return (
    <>
      <Row>
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <h1 className="text-center">
            Sign in
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <LoginForm />
        </Col>
      </Row>
    </>
  );

};

export default Login;