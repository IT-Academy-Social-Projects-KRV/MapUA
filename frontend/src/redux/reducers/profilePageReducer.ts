import {
  ToogleProfilePageAction,
  ToogleProfilePageState,
  ToogleProfilePageTypes
} from 'redux/types/profilepage';

const initialState: ToogleProfilePageState = {
  isOpen: false
};

export const toogleProfilePage = (
  state = initialState,
  action: ToogleProfilePageAction
): ToogleProfilePageState => {
  switch (action.type) {
    case ToogleProfilePageTypes.TOOGLE_PROFILE_PAGE:
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
};
