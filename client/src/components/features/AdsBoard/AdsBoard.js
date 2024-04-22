import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect, useState } from "react";
import AdsGrid from "../AdsGrid/AdsGrid";

const AdsBoard = () => {
  const dispatch = useDispatch();

  const [localAds, setLocalAds] = useState(null);
  
  const reduxAds = useSelector(getAds);

  useEffect(() => {
    if (reduxAds && Array.isArray(reduxAds)) {
      const sortedAds = [...reduxAds].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      setLocalAds(sortedAds);
    }
  }, [reduxAds]);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);
  
  return (
    <AdsGrid ads={localAds} />
  );
};

export default AdsBoard;