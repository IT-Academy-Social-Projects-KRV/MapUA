import {
  LocationCommentsActions,
  LocationCommentsActionTypes
} from 'redux/action-types/locationCommentsActionTypes';
import { locationCommentsStateType } from '../ts-types';

export const initialState: locationCommentsStateType = {
  comments: []
};
export const locationCommentsReducer = (
  state = initialState,
  action: LocationCommentsActions
): locationCommentsStateType => {
  switch (action.type) {
    case LocationCommentsActionTypes.ADD_COMMENT:
      return { comments: [action.payload, ...state.comments] };
    case LocationCommentsActionTypes.FETCH_COMMENTS:
      return { comments: [...action.payload] };
    default:
      return state;
  }
};