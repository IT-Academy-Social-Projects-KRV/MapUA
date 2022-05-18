import { boundsType, latlngType } from '../../../types';

export type locationsListStateType = {
  locations: any[];
  bounds: boundsType;
  zoomPosition: latlngType;
  locationName: string;
  selectedFilters: string[];
};
