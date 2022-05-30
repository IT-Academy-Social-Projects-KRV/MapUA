export type InitialStateType<T> = {
  loading: boolean;
  error: null | string;
  data: T;
};
