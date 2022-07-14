import * as UserActionCreators from './userData';
import * as PrivateUserActionCreators from './privateUserData';
import * as PopupLocationActionCreators from './popupLocation';
import * as PopupLocationRatingActionCreators from './popupLocationRating';
import * as LocationListActionCreators from './locationList';
import * as FiltersActionCreators from './listOfFiltersOptions';
import * as UserAuthActionCreators from './isUserAuthorized';
import * as MapInfoActionCreators from './mapInfo';
import * as CreateLocationActionCreator from './createLocation';
import * as LocationCommentsActionCreators from './locationComments';
import * as SnackbarActionCreators from './snackbar';
import * as OtherUserActionCreators from './otherUserData';
import * as DeleteLocationActionCreators from './deleteLocation';

export default {
  ...UserActionCreators,
  ...PrivateUserActionCreators,
  ...PopupLocationActionCreators,
  ...PopupLocationRatingActionCreators,
  ...LocationListActionCreators,
  ...UserAuthActionCreators,
  ...FiltersActionCreators,
  ...MapInfoActionCreators,
  ...CreateLocationActionCreator,
  ...LocationCommentsActionCreators,
  ...SnackbarActionCreators,
  ...OtherUserActionCreators,
  ...DeleteLocationActionCreators
};
