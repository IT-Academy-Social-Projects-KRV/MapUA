import axios from 'axios';
import { UserAction, UserActionTypes, UserLoginState } from 'redux/types/user';

const accessToken = localStorage.getItem('accessToken');

// (checkIsUserAuth = async (token: string | null) => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_API_URI}is-authenticated`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
//   // console.log(response.data.success);
//   data = await response.data.success;
//   return data)()

const checkIsUserAuth = async (token: string | null) => {
  let result;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URI}is-authenticated`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    result = response.data.success;
  } catch (e) {
    console.log(e);
  }
  return result;
};

console.log(
  'checkIsUserAuth(accessToken)',
  checkIsUserAuth(accessToken).then(result => result)
);

const respon = axios.get(`${process.env.REACT_APP_API_URI}is-authenticated`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
console.log('respon', respon);

// const text = checkIsUserAuth(accessToken);
// console.log('text', text);

function ifAccessTokenExist(): any {
  if (!accessToken) {
    return false;
  }
  return axios
    .get(`${process.env.REACT_APP_API_URI}is-authenticated`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.data.success);
  // .then(res => {
  //   console.log('res', res);
  //   return res.success;
  // });
}

const token = ifAccessTokenExist().then(
  (response: any) => response.data.success
);

console.log('token', token);

console.log('ifAccessTokenExist()', ifAccessTokenExist());
// console.log('isAuth', isAuth);

const initialState: UserLoginState = {
  loading: false,
  error: null,
  isAuthorized: false,
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
