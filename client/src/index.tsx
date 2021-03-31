import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import CustomThemeProvider from './components/themes/customThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

