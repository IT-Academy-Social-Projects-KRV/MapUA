import axios from 'axios';
import { UserAction, UserActionTypes, UserLoginState } from 'redux/types/user';

const accessToken = localStorage.getItem('accessToken');
// function ok() {
//   return true;
// }
// eslint-disable-next-line consistent-return
function aaa() {
  let isSuccess: any = 1;
  const checkIsUserAuth = async (token: string | null) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log('User authorized');
        isSuccess = true;
        // console.log('isSuccess', isSuccess);
      }
      // return isSuccess;
    } catch (e) {
      console.log(e);
      isSuccess = false;
    }
  };
  checkIsUserAuth(accessToken);
  console.log('isSuccess', isSuccess);
  return isSuccess;
}
console.log('aaa()', aaa());

function ifAccessTokenExist() {
  if (!accessToken) {
    return false;
  }
  return aaa();
}
console.log('ifAccessTokenExist()', ifAccessTokenExist());

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isAuthorized: ifAccessTokenExist(),
  userInfo: {}
};

export const userLoginReducer = (
  state = initialState,
  action: UserAction
): UserLoginState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return { loading: true, error: null, isAuthorized: false, userInfo: {} };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        error: null,
        isAuthorized: true,
        userInfo: action.payload
      };
    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuthorized: false,
        userInfo: {}
      };
    case UserActionTypes.USER_LOGOUT:
      return { loading: false, error: null, isAuthorized: false, userInfo: {} };
    // Check if user authorized every time when component mounted
    case UserActionTypes.IF_USER_AUTORIZED_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UserActionTypes.IF_USER_AUTORIZED_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthorized: true
      };
    default:
      return state;
  }
};
