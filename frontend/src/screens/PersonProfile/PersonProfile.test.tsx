/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PersonProfilePage from './PersonProfilePage';

describe('PersonProfilePage', () => {
  const initialState = {
    otherUserData: {
      loading: false,
      error: null,
      success: false,
      data: {
        _id: '',
        displayName: '',
        description: '',
        imageUrl: '',
        role: '',
        subscribers: [],
        subscriptions: [1, 2, 3],
        favorite: [],
        visited: [],
        personalLocations: []
      }
    },
    userData: {
      loading: false,
      error: null,
      success: false,
      data: []
    },
    isUserAuthorized: {
      loading: false,
      error: null,
      success: false,
      data: []
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  it('should render TopLocations', () => {
    const store = mockStore(initialState);
    const component = render(
      <Provider store={store}>
        <Router>
          <PersonProfilePage />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
