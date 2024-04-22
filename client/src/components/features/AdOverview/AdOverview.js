import { useParams } from "react-router-dom";
import { getAdById, loadAdsRequest } from "../../../redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import styles from "./AdOverview.module.scss";

const AdOverview = () => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector(getUser);
  const data = useSelector((state) => getAdById(state, id));

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch, id]);

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log('user: ', user);
  console.log('data: ', data);

  const adImageSrc = `${IMGS_URL}${data.image}`;
  const userImageSrc = `${IMGS_URL}${data.seller.avatar}`
  const formattedDate = formatDate(data.publishDate);

  return (
    <Row>
      <Col xs={12} md={10} lg={8} className="mx-auto">
        <Card className="mb-4 p-3">
          <Row>
            <Col xs={12} md={6} lg={5}>
              <div className={styles.imageContainer}>
                <Card.Img variant="top" src={adImageSrc} />
              </div>
            </Col>
            <Col xs={12} md={6} lg={7}>
              <Card.Body>
                <Card.Title>Title: {data.title}</Card.Title>
                <Card.Text>Location: {data.location}</Card.Text>
                <Card.Text>Description: {data.description}</Card.Text>
                <Card.Text>Publish date: {formattedDate}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
          {
            user && user.login === data.seller.login &&
            (
            <Row className="mt-3">
              <Col className="d-flex justify-content-center">
                <Link to={`/edit/${id}`} className="d-block">
                  <Button>
                    Edit
                  </Button>
                </Link>
              </Col>
              <Col className="d-flex justify-content-center">
                <Link to={`/delete/${id}`} className="d-block">
                  <Button variant="danger">
                    Remove
                  </Button>
                </Link>            
              </Col>
            </Row>
          )}
        </Card>
        <Card className="p-3">
          <Row>
            <Col xs={12} md={6} lg={4}>
              <Card.Img 
                variant="top" 
                src={userImageSrc} 
                className="rounded-circle" 
                style={{ width: '200px', height: '200px', objectFit: 'cover', border: '1px solid rgba(0, 0, 0, 0.175)', display: 'block', margin: '0 auto' }}
              />
            </Col>
            <Col xs={12} md={6} lg={8}>
              <Card.Body>
                <Card.Title>Seller: {data.seller.login}</Card.Title>
                <Card.Text>Phone Number: {data.seller.phoneNumber}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );

};

export default AdOverview;