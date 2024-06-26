import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { API_AUTH_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";

const LoginForm = () => {

  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password }),
    };

    setStatus('loading');
    fetch(`${API_AUTH_URL}/login`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      })
  };

  return (
    <Form onSubmit={handleSubmit}>

      {
        status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully logged in!</p>
          </Alert>
      )}

      {
        status === "serverError" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
      )}

      {
        status === "clientError" && (
          <Alert variant="danger">
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect...</p>
          </Alert>
      )}

      {
        status === "loading" && (
          <Spinner animation="border" role="status" className="d-block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter login"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;