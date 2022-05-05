import { Dispatch } from 'redux';
import {
  LocationListActions,
  LocationsListActionsType
} from 'redux/types/locationList';
import { fetchData } from 'utils/requests';
import { boundsType, latlngType } from '../../../types';

const { REACT_APP_API_URI } = process.env;

export const fetchLocations =
  (zoomPosition: latlngType, bounds: boundsType) =>
  async (dispatch: Dispatch<LocationListActions>) => {
    try {
      const url = `${REACT_APP_API_URI}/locations/location-list`;
      const options = {
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          center: JSON.stringify(zoomPosition),
          bounds: JSON.stringify(bounds)
        }
      };
      const { status, data } = await fetchData(options);

      if (data && data.mes && status) {
        console.log(data.mes, status);
        return;
      }
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
