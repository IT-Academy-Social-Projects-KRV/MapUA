import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  ThemeProvider as CoreThemeProvider
} from '@mui/material/styles';
import React from 'react';

import ReactDOM from 'react-dom';
import theme from 'theme';

import App from './App';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CoreThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </CoreThemeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
