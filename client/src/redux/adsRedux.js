import axios from "axios";
import { API_URL } from "../config";

// SELECTORS
export const getAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, id) => 
  ads && Array.isArray(ads.data) ? ads.data.find((ad) => ad._id === id) : null;
export const getAdsError = ({ ads }) => ads.error;

// ACTIONS
const createActionName = (name) => `app/ads/${name}`;

export const LOAD_ADS = createActionName("LOAD_ADS");
export const ADD_AD = createActionName("ADD_AD");
export const REMOVE_AD = createActionName("REMOVE_AD");
export const EDIT_AD = createActionName("EDIT_AD");
export const ERROR = createActionName("ERROR");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const setError = (payload) => ({ type: ERROR, payload });

// THUNKS
export const loadAdsRequest = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/ads`);
    dispatch(loadAds(res.data));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const loadSearchedAdsRequest = (searchPhrase) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`, { withCredentials: true });
    dispatch(loadAds(res.data));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addAdRequest = (ad) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/ads`, ad, { withCredentials: true });
    dispatch(loadAdsRequest());
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const editAdRequest = (ad, id) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/ads/${id}`, ad, { withCredentials: true });
    dispatch(loadAdsRequest());
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const removeAdRequest = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/ads/${id}`, { withCredentials: true });
    dispatch(removeAd(id));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

// REDUCER
const adsReducer = (statePart = [], action) => {
switch (action.type) {
  case ADD_AD:
    return { ...statePart, data: [...statePart.data, action.payload] };
  case LOAD_ADS:
    return { ...statePart, data: action.payload };
  case REMOVE_AD:
    return { ...statePart, data: statePart.data.filter((ad) => ad._id !== action.payload) };
  case EDIT_AD:
    return { 
      ...statePart, 
      data: statePart.data.map(ad => ad._id === action.payload._id ? action.payload : ad) 
    };
  case ERROR:
    return { ...statePart, error: action.payload };
  default:
    return statePart;
}
};

export default adsReducer;