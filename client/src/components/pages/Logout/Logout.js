import { useDispatch } from "react-redux";
import { API_AUTH_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "DELETE",
      credentials: "include",
    };

    fetch(`${API_AUTH_URL}/logout`, options).then(() => {
      dispatch(logOut());
      navigate("/");
    });
  }, [dispatch, navigate]);

  return null;

};

export default Logout;