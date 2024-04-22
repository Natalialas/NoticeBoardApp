import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout";

import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import AdDetails from "./components/pages/AdDetails/AdDetails";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdNew from "./components/pages/AdNew/AdNew";
import AdDelete from "./components/pages/AdDelete/AdDelete";
import Search from "./components/pages/Search/Search";
import NotFound from "./components/pages/NotFound/NotFound";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLoggedUser } from "./redux/usersRedux";
import { loadAdsRequest } from "./redux/adsRedux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
    dispatch(loadLoggedUser());
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ads/:id" element={<AdDetails />} />
        <Route path="/edit/:id" element={<AdEdit />} />      
        <Route path="/add" element={<AdNew />} />
        <Route path="/delete/:id" element={<AdDelete />} />
        <Route path="/search/:searchPhrase" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;