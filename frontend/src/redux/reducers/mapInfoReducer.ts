import {
  LocationListActions,
  LocationsListActionsType
} from 'redux/action-types/locationListActionTypes';
import { mapInfoType } from '../ts-types/mapInfo';

const initialState: mapInfoType = {
  bounds: {
    _northEast: { lat: 54.82600799909498, lng: 38.64990234375001 },
    _southWest: { lat: 45.62940492064501, lng: 22.456054687500004 }
  },
  locationName: '',
  selectedFilters: []
};

export const mapInfoReducer = (
  state = initialState,
  action: LocationListActions
): mapInfoType => {
  switch (action.type) {
    case LocationsListActionsType.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case LocationsListActionsType.GET_LOCATION_NAME:
      return { ...state, locationName: action.payload };
    case LocationsListActionsType.APPLY_FILTER:
      return { ...state, selectedFilters: action.payload };
    default:
      return state;
  }
};
