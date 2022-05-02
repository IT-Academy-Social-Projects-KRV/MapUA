import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions-creators/index';

export const useTypedDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
