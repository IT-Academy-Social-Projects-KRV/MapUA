import * as UserActionCreators from './user';
import * as PopupLocationActionCreators from './popupLocation';
import * as LocationListActionCreators from './locationList';
import * as UserAuthActionCreators from './userAuth';

export default {
  ...UserActionCreators,
  ...PopupLocationActionCreators,
  ...LocationListActionCreators,
  ...UserAuthActionCreators
};
