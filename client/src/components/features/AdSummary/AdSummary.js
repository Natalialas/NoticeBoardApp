import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import styles from "./AdSummary.module.scss";

const AdSummary = ({ id, title, image, location }) => {

  const imageSrc = `${IMGS_URL}${image}`;
  const targetUrl = `/ads/${id}`;

  return (
    <Card className="my-4">
      <div className={styles.imageContainer}>
        <Card.Img variant="top" src={imageSrc} />
      </div>
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text>{ location }</Card.Text>
        <Link to={targetUrl}>
          <Button variant="primary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );

};

AdSummary.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default AdSummary;