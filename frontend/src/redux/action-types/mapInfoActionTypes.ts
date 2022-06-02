/* eslint-disable no-unused-vars */
import { boundsType } from '../../../types';

export enum MapInfoActionsType {
  SET_BOUNDS = 'SET_BOUNDS',
  SET_LOCATION_NAME = 'SET_LOCATION_NAME',
  SET_FILTERS = 'SET_FILTERS'
}

interface SetBoundsAction {
  type: MapInfoActionsType.SET_BOUNDS;
  payload: boundsType;
}
interface SetLocationNameAction {
  type: MapInfoActionsType.SET_LOCATION_NAME;
  payload: string;
}
interface SetFiltersAction {
  type: MapInfoActionsType.SET_FILTERS;
  payload: string[];
}

export type MapInfoActions =
  | SetBoundsAction
  | SetLocationNameAction
  | SetFiltersAction;
