/* eslint-disable no-unused-vars */
export interface TodoState {
  todos: any[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SET_TODO_PAGE = 'SET_TODO_PAGE'
}
type FetchTodoAction = {
  type: TodoActionTypes.FETCH_TODOS;
};

type FetchTodoSuccessAction = {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: any[];
};

type FetchTodoErrorAction = {
  type: TodoActionTypes.FETCH_TODOS_ERROR;
  payload: string;
};

type SetTodoPage = {
  type: TodoActionTypes.SET_TODO_PAGE;
  payload: number;
};

export type TodoAction =
  | FetchTodoAction
  | FetchTodoErrorAction
  | FetchTodoSuccessAction
  | SetTodoPage;
