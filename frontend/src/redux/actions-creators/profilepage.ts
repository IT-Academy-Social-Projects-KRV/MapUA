import {
  ToogleProfilePageAction,
  ToogleProfilePageTypes
} from 'redux/types/profilepage';

export function toogleProfilePage(): ToogleProfilePageAction {
  return { type: ToogleProfilePageTypes.TOOGLE_PROFILE_PAGE };
}
