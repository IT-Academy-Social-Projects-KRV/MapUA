import axios from 'services/axios';
import { Dispatch } from 'redux';
import {
  LocationListActions,
  LocationListActionsType
} from 'redux/action-types/locationListActionTypes';
import { boundsType } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchLocations =
  (bounds: boundsType, locationName?: string, filters?: string[]) =>
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
          type: LocationListActionsType.FETCH_LOCATION_LIST_SUCCESS,
          payload: data.locations
        });
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: LocationListActionsType.FETCH_LOCATION_LIST_ERROR,
        payload: 'Could not get location list'
      });
    }
  };
