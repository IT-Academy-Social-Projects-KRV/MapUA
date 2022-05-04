import * as UserActionCreators from './user';
import * as TodoActionCreators from './todo';
import * as PopupLocationActionCreators from './popupLocation';
import * as LocationListActionCreators from './locationList';

export default {
  ...TodoActionCreators,
  ...UserActionCreators,
  ...PopupLocationActionCreators,
  ...LocationListActionCreators
};
