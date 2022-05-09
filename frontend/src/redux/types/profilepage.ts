/* eslint-disable no-unused-vars */
export interface ToogleProfilePageState {
  isOpen: boolean;
}

export enum ToogleProfilePageTypes {
  TOOGLE_PROFILE_PAGE = 'TOOGLE_PROFILE_PAGE'
}

export type ToogleProfilePageAction = {
  type: ToogleProfilePageTypes.TOOGLE_PROFILE_PAGE;
};
