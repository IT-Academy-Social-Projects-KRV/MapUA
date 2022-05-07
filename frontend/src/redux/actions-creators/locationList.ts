import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LocationListActions,
  LocationsListActionsType
} from 'redux/types/locationList';
import { boundsType, latlngType } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchLocations =
  (zoomPosition: latlngType, bounds: boundsType, locationName?: string) =>
  async (dispatch: Dispatch<LocationListActions>) => {
    try {
      let url = `${REACT_APP_API_URI}locations/?center=${JSON.stringify(
        zoomPosition
      )}&bounds=${JSON.stringify(bounds)}`;
      if (locationName) {
        url = `${REACT_APP_API_URI}locations/?center=${JSON.stringify(
          zoomPosition
        )}&bounds=${JSON.stringify(bounds)}&name=${locationName}`;
      }
      const options = {
        method: 'get',
        url,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios(options);
      if (data && data.locations && typeof data.locations === typeof []) {
        dispatch({
          type: LocationsListActionsType.FETCH_LOCATIONS,
          payload: data.locations
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
export function setBounds(bounds: boundsType): LocationListActions {
  return { type: LocationsListActionsType.SET_BOUNDS, payload: bounds };
}
export function setZoomPosition(zoomPosition: latlngType): LocationListActions {
  return {
    type: LocationsListActionsType.SET_ZOOM_POSITION,
    payload: zoomPosition
  };
}
export function getLocationName(locationName: string): LocationListActions {
  return {
    type: LocationsListActionsType.GET_LOCATION_NAME,
    payload: locationName
  };
}
