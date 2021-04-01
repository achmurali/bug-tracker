import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'

import App from './App';
import CustomThemeProvider from './components/themes/customThemeProvider';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <CustomThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

