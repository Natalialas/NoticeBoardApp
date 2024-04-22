import { useParams } from "react-router-dom";
import { getAdById, removeAdRequest, loadAdsRequest } from "../../../redux/adsRedux";
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { formatDate } from "../../../utils/formatDate";


const AdDeleteFeature = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const user = useSelector(getUser);
  const data = useSelector((state) => getAdById(state, id));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (data && Object.keys(data).length === 0) {
      navigate("/");
    }

    dispatch(loadAdsRequest());
  }, [dispatch, id, data, navigate, user]);

  const handleSubmit = async (id) => {
    try {
      await dispatch(removeAdRequest(id));
      navigate("/");
    } catch (error) {
      console.error("Failed to remove the ad:", error);
    }
  };

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
    <Row>
      <Col xs={12} md={10} lg={8} className="mx-auto">
        <h1 className="text-center">
          Are you sure you want to permanently remove your advertisement?
        </h1>
        <ul>
          <li>
            Title: { data.title }
          </li>
          <li>
            Location: { data.location }
          </li>
          <li>
            Description: { data.description }
          </li>
          <li>
            Publish date: { formatDate(data.publishDate) }
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col className="d-flex justify-content-center">
        <Link to={`/ads/${id}`} className="d-block">
          <Button>
            Back
          </Button>
        </Link>
      </Col>
      <Col className="d-flex justify-content-center">
        <Link to={`/delete/${id}`} className="d-block">
          <Button variant="danger" onClick={() => handleSubmit(id)}>
            Remove
          </Button>
        </Link>            
      </Col>
    </Row>
    </>
  );

};

export default AdDeleteFeature;