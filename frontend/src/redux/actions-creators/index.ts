import * as UserActionCreators from './user';
import * as PopupLocationActionCreators from './popupLocation';
import * as LocationListActionCreators from './locationList';
import * as FiltersActionCreators from './filtersList';

export default {
  ...UserActionCreators,
  ...PopupLocationActionCreators,
  ...LocationListActionCreators,
  ...FiltersActionCreators
};
