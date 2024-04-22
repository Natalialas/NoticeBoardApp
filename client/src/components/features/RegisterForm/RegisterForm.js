import { useState } from "react";
import { Form, Button, Image, Alert, Spinner } from "react-bootstrap";
import { API_AUTH_URL } from "../../../config";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    phone: "",
    avatar: "",  // Initially set as an empty string
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'loginError'

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.login) newErrors.login = "Login is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.avatar) newErrors.avatar = "Avatar is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const fd = new FormData();
      fd.append('login', formData.login);
      fd.append('password', formData.password);
      fd.append('phoneNumber', formData.phone);
      fd.append('avatar', formData.avatar);

      const options = {
        method: 'POST',
        body: fd,
      };

      setStatus('loading');

      fetch(`${API_AUTH_URL}/register`, options)
        .then(res => {
          if (res.status === 201) {
            setStatus('success');
          } else if (res.status === 400) {
            setStatus('clientError');
          } else if (res.status === 409) {
            setStatus('loginError');
          } else {
            setStatus('serverError');
          }
        })

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      {
        status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been registered! You can now log in...</p>
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
            <Alert.Heading>Not enought data</Alert.Heading>
            <p>You have to fill all the fields</p>
          </Alert>
      )}      

      {
        status === "loginError" && (
          <Alert variant="warning">
            <Alert.Heading>Login already in use</Alert.Heading>
            <p>You have to use other login.</p>
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
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="Enter login"
          isInvalid={errors.login}
        />
        <Form.Control.Feedback type="invalid">
          {errors.login}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          isInvalid={errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          name="avatar"
          onChange={handleAvatarChange}
          isInvalid={errors.avatar}
        />
        <Form.Control.Feedback type="invalid">
          {errors.avatar}
        </Form.Control.Feedback>
        {avatarPreview && (
          <Image src={avatarPreview} alt="Avatar Preview" thumbnail className="mt-3" />
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;