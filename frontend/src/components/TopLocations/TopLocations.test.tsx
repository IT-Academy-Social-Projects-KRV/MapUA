/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TopLocations from './TopLocations';
import i18n from '../../i18n';

describe('TopLocations', () => {
  beforeEach(() => {
    i18n.init();
  });
describe('TopLocations', () => {
  const initialState = {
    topLocations: {
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
          <TopLocations />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
