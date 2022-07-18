/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';

describe('Login', () => {
  const initialState = {
    isUserAuthorized: {
      loading: false,
      error: null,
      success: false,
      data: []
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  it('should render Login component', () => {
    const store = mockStore(initialState);
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
