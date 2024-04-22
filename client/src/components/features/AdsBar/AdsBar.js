import SearchForm from "../SearchForm/SearchForm";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const AdsBar = () => {

  const user = useSelector(getUser);

  return (
    <Row>
      <Col xs={12} md={6} lg={4}>
        <SearchForm />
      </Col>
      <Col className="d-md-none d-lg-block" lg={4}></Col>
      <Col xs={12} md={6} lg={4} className="mt-3 mt-md-0">
        {
          user && 
          (
          <Link to="/add" className="w-100">
            <Button variant="primary" className="w-100 text-center">
              Add new Advertisement
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  );

};

export default AdsBar;