import AdAddOrEditForm from "../../features/AdAddOrEditForm/AdAddOrEditForm";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getUser } from "../../../redux/usersRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdRequest } from "../../../redux/adsRedux";

const AdNew = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const handleSubmit = (ad) => {
    const formData = new FormData();
    formData.append("title", ad.title);
    formData.append("description", ad.description);
    formData.append("publishDate", ad.publishDate);
    formData.append("price", ad.price);
    formData.append("location", ad.location);
    formData.append("image", ad.image);

    dispatch(addAdRequest(formData));

    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Row>
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <h1 className="text-center">
            Add new advertisement
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <AdAddOrEditForm action={handleSubmit} />
        </Col>
      </Row>
    </>
  );

};

export default AdNew;