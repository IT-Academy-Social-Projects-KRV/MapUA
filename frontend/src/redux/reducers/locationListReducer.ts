import {
  LocationListActions,
  LocationsListActionsType,
  locationsListStateType
} from 'redux/types/locationList';

const initialState: locationsListStateType = {
  locations: [],
  bounds: {
    _northEast: { lat: 54.82600799909498, lng: 38.64990234375001 },
    _southWest: { lat: 45.62940492064501, lng: 22.456054687500004 }
  },
  zoomPosition: {
    lat: 50.447731,
    lng: 30.542721
  },
  locationName: '',
  selectedFilters: []
};
export const locationsListReducer = (
  state = initialState,
  action: LocationListActions
): locationsListStateType => {
  switch (action.type) {
    case LocationsListActionsType.FETCH_LOCATIONS:
      return { ...state, locations: action.payload };
    case LocationsListActionsType.SET_BOUNDS:
      return { ...state, bounds: action.payload };
    case LocationsListActionsType.SET_ZOOM_POSITION:
      return { ...state, zoomPosition: action.payload };
    case LocationsListActionsType.GET_LOCATION_NAME:
      return { ...state, locationName: action.payload };
    case LocationsListActionsType.APPLY_FILTER:
      return { ...state, selectedFilters: action.payload };
    default:
      return state;
  }
};
