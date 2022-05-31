import * as UserActionCreators from './userData';
import * as PrivateUserActionCreators from './privateUserData';
import * as PopupLocationActionCreators from './popupLocation';
import * as LocationListActionCreators from './locationList';
import * as FiltersActionCreators from './listOfFiltersOptions';
import * as UserAuthActionCreators from './isUserAuthorized';
import * as MapInfoActionCreators from './mapInfo';

export default {
  ...UserActionCreators,
  ...PrivateUserActionCreators,
  ...PopupLocationActionCreators,
  ...LocationListActionCreators,
  ...UserAuthActionCreators,
  ...FiltersActionCreators,
  ...MapInfoActionCreators
};
