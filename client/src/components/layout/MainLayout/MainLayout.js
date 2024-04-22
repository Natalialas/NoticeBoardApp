import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";

const MainLayout = ({ children }) => (
  <Container>
    <MainMenu />
    { children }
    <Footer />
  </Container>
);

export default MainLayout;