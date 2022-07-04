import { mapInfoStateType } from '../ts-types';
import {
  MapInfoActions,
  MapInfoActionsType
} from '../action-types/mapInfoActionTypes';

const params = new URLSearchParams(window.location.search);

const initialState: mapInfoStateType = {
  bounds: {
    _northEast: { lat: 54.82600799909498, lng: 38.64990234375001 },
    _southWest: { lat: 45.62940492064501, lng: 22.456054687500004 }
  },
  locationName: params.get('locationName') || '',
  selectedFilters: [],
  authorizedFilters: []
};

export const mapInfoReducer = (
  state = initialState,
  action: MapInfoActions
): mapInfoStateType => {
  switch (action.type) {
    case MapInfoActionsType.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case MapInfoActionsType.SET_LOCATION_NAME:
      return { ...state, locationName: action.payload };
    case MapInfoActionsType.SET_FILTERS:
      return {
        ...state,
        selectedFilters: action.payload
      };
    case MapInfoActionsType.SET_AUTHORIZED_FILTERS:
      return {
        ...state,
        authorizedFilters: action.payload
      };
    default:
      return state;
  }
};
