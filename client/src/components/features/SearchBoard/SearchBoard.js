import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, loadSearchedAdsRequest } from "../../../redux/adsRedux";
import AdsGrid from "../AdsGrid/AdsGrid";

const SearchBoard = () => {
  const dispatch = useDispatch();
  const { searchPhrase } = useParams();
  const [localAds, setLocalAds] = useState([]);
  const reduxAds = useSelector(getAds);

  console.log(reduxAds);

  useEffect(() => {
    if (reduxAds && reduxAds.results) {
      const sortedAds = [...reduxAds.results].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
      setLocalAds(sortedAds);
    } else {
      setLocalAds([]);
    }
  }, [reduxAds]);

  useEffect(() => {
    dispatch(loadSearchedAdsRequest(searchPhrase));
  }, [dispatch, searchPhrase]);

  return (
    <>
      <h1>
        { `Search Board: ${ searchPhrase }` }
      </h1>
      {
        localAds.length ? (<AdsGrid ads={localAds} />) : `No search results for ${searchPhrase}...`
      }
    </>
  );
};

export default SearchBoard;