import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import App from './app';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);