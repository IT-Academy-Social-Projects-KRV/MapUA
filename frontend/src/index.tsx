import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  ThemeProvider as CoreThemeProvider
} from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

// imports to fix for popup icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import App from './App';
import reportWebVitals from './reportWebVitals';

// fix for popup icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CoreThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </CoreThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
