import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import App from './app';
import { CommentProvider } from './commentContext';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
      <CommentProvider>
        <App />
        </CommentProvider>
      </CssVarsProvider>
      
    </StyledEngineProvider>
  </React.StrictMode>
);