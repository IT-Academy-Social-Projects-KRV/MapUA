import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import { locationCommentsState } from 'redux/ts-types/locationComments';

export const initialState: locationCommentsState = {
  comments: []
};
export const locationCommentsReducer = (
  state = initialState,
  action: LocationCommentsActions
): locationCommentsState => {
  switch (action.type) {
    case LocationCommentsActionTypes.ADD_COMMENT:
      return { comments: [action.payload, ...state.comments] };
    case LocationCommentsActionTypes.FETCH_COMMENTS:
      return { comments: [...action.payload] };
    default:
      return state;
  }
};
