import { createStore } from "redux";
import districtsReducer from "./reducers/districtReducer";
import ugandaDistricts from '../geoJSON/ugandadistricts.json';

const makeStore = (initialState = { districts: ugandaDistricts }, options) => {
  return createStore(districtsReducer, initialState);
};

export { makeStore };
