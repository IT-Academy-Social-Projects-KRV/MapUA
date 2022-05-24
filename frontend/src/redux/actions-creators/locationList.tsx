import axios from 'axios';
import { Dispatch } from 'redux';
import {
  LocationListActions,
  LocationsListActionsType
} from 'redux/action-types/locationListActionTypes';
import { boundsType, latlngType } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchLocations =
  (
    zoomPosition: latlngType,
    bounds: boundsType,
    locationName?: string,
    filters?: string[]
  ) =>
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
      if (filters) {
        url = `${REACT_APP_API_URI}locations/?center=${JSON.stringify(
          zoomPosition
        )}&bounds=${JSON.stringify(bounds)}&filters=${JSON.stringify(filters)}`;
      }
      if (filters && locationName) {
        url = `${REACT_APP_API_URI}locations/?center=${JSON.stringify(
          zoomPosition
        )}&bounds=${JSON.stringify(
          bounds
        )}&name=${locationName}&filters=${JSON.stringify(filters)}`;
      }
      const options = {
        method: 'get',
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      };
      const { data } = await axios(options);
      if (data && data.locations && typeof data.locations === typeof []) {
        dispatch({
          type: LocationsListActionsType.FETCH_LOCATIONS,
          payload: data.locations
        });
      }
    } catch (e: any) {
      throw new Error(e);
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
export function applyFilter(filter: string[]): LocationListActions {
  return {
    type: LocationsListActionsType.APPLY_FILTER,
    payload: filter
  };
}
