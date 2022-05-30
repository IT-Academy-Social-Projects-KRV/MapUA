import { Dispatch } from 'redux';
import axios from 'axios';
import { createLocalizatioMainFilters } from '../../static/mainFIlters';
import { FiltersAction, FiltersActionTypes } from '../action-types/filters';

const { REACT_APP_API_URI } = process.env;

export const fetchFilters =
  (accessToken: string, t: any) =>
  async (dispatch: Dispatch<FiltersAction>) => {
    try {
      dispatch({
        type: FiltersActionTypes.FETCH_FILTERS,
        payload: createLocalizatioMainFilters(t)
      });
      const response = await axios.get(`${REACT_APP_API_URI}subscriptions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': localStorage.getItem('i18nextLng') || ''
        }
      });
      dispatch({
        type: FiltersActionTypes.FETCH_FILTERS_SUCCESS,
        payload: response.data.userData.subscriptions
      });
    } catch (e) {
      dispatch({
        type: FiltersActionTypes.FETCH_FILTERS_ERROR,
        payload: 'An error occurred while loading user data'
      });
    }
  };

// export const fetchFiltersWithoutAuth =
//   () => async (dispatch: Dispatch<FiltersAction>) => {
//     const { t } = useTranslation();
//     dispatch({
//       type: FiltersActionTypes.FETCH_FILTERS_WITHOUT_AUTH,
//       payload: createLocalizatioMainFilters(t)
//     });
//   };
export function fetchFiltersWithoutAuth(t: any) {
  return {
    type: FiltersActionTypes.FETCH_FILTERS_WITHOUT_AUTH,
    payload: createLocalizatioMainFilters(t)
  };
}
