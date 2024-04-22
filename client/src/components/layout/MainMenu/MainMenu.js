import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <Navbar bg="primary" data-bs-theme="primary" className="rounded my-4 px-4">
      <Navbar.Brand as={Link} to="/" className="text-white" style={{ textDecoration: "none" }}>
        Home
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {!user && (
            <Nav.Link as={Link} to="/login" className="text-white" style={{ textDecoration: "none" }}>
              Sign In
            </Nav.Link>
          )}
          {user && (
            <Nav.Link as={Link} to="/logout" className="text-white" style={{ textDecoration: "none" }}>
              Sign Out
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link as={Link} to="/register" className="text-white" style={{ textDecoration: "none" }}>
              Sign Up
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;