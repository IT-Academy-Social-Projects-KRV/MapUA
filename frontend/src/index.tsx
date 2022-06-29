import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  ThemeProvider as CoreThemeProvider
} from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { Provider } from 'react-redux';
import CircularLoader from './components/CircularLoader/CircularLoader';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './redux/store';

import './i18n';

// fix for popup icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <Suspense fallback={<CircularLoader />}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CoreThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <App />
          </Provider>
        </CoreThemeProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Suspense>
);

reportWebVitals();
