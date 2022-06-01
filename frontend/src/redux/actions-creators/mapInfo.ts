import {
  MapInfoActions,
  MapInfoActionsType
} from 'redux/action-types/mapInfoActionTypes';
import { boundsType } from '../../../types';

export function setBounds(bounds: boundsType): MapInfoActions {
  return {
    type: MapInfoActionsType.SET_BOUNDS,
    payload: bounds
  };
}
export function setLocationName(locationName: string): MapInfoActions {
  return {
    type: MapInfoActionsType.SET_LOCATION_NAME,
    payload: locationName
  };
}
export function setFilters(filter: string[]): MapInfoActions {
  return {
    type: MapInfoActionsType.SET_FILTERS,
    payload: filter
  };
}
