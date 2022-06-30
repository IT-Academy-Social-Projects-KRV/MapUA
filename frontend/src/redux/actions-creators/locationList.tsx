import axios from 'services/axios';
import { Dispatch } from 'redux';
import {
  LocationListActions,
  LocationListActionsType
} from 'redux/action-types/locationListActionTypes';
import { boundsType } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchLocations =
  (
    bounds: boundsType,
    locationName?: string,
    filters?: string[],
    authFilters?: string[]
  ) =>
  async (dispatch: Dispatch<LocationListActions>) => {
    try {
      dispatch({
        type: LocationListActionsType.FETCH_LOCATION_LIST_LOADING
      });

      let url = `${REACT_APP_API_URI}locations/?bounds=${JSON.stringify(
        bounds
      )}`;
      if (locationName) url += `&name=${locationName}`;
      if (filters) url += `&filters=${JSON.stringify(filters)}`;
      if (authFilters) url += `&authFilters=${JSON.stringify(authFilters)}`;

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      };
      const { data } = await axios().get(url, options);
      if (data && data.locations && typeof data.locations === typeof []) {
        dispatch({
          type: LocationListActionsType.FETCH_LOCATION_LIST_SUCCESS,
          payload: data.locations
        });
      }
    } catch (error: any) {
      dispatch({
        type: LocationListActionsType.FETCH_LOCATION_LIST_ERROR,
        payload: 'Could not get location list'
      });
      throw new Error(error);
    }
  };
export const fetchTopLocations =
  () => async (dispatch: Dispatch<LocationListActions>) => {
    try {
      dispatch({
        type: LocationListActionsType.FETCH_TOP_LOCATIONS_LOADING
      });

      const url = `${REACT_APP_API_URI}topLocations`;

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      };
      const { data } = await axios().get(url, options);
      if (data) {
        dispatch({
          type: LocationListActionsType.FETCH_TOP_LOCATIONS_SUCCESS,
          payload: data
        });
      }
    } catch (error: any) {
      dispatch({
        type: LocationListActionsType.FETCH_TOP_LOCATIONS_ERROR,
        payload: 'Could not get location list'
      });
      throw new Error(error);
    }
  };
