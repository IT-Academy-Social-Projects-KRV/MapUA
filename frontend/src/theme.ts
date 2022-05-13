import { createTheme, Theme, ThemeOptions, styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export interface ITheme extends Theme {}

const theme = createTheme({
  spacing: 5,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    background: {
      paper: '#fff',
      gray: '#eaeaea'
    }
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {}
      }
    }
  }
} as unknown as ThemeOptions);

export default theme;

export const AuthFormWrapper = styled(Box)`
  min-height: calc(100vh - 64px - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaperForm = styled(Paper)`
  border-radius: 20px;
  padding: 2rem;
`;
