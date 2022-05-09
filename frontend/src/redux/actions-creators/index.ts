import * as UserActionCreators from './user';
import * as PopupLocationActionCreators from './popupLocation';
import * as LocationListActionCreators from './locationList';

export default {
  ...UserActionCreators,
  ...PopupLocationActionCreators,
  ...LocationListActionCreators
};
