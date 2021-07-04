import React, { useEffect } from 'react';

import Routes from './Routes';
import CustomThemeProvider from './themes/customThemeProvider';
import NavigationBar from './components/navigation-bar';
import { CssBaseline } from '@material-ui/core';
import SnackBar from './components/snackBar';
import { useDispatch } from 'react-redux';
import { autoLogin } from './controllers/auth';


const App: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [])

  return (
    <CustomThemeProvider>
      <>
        <CssBaseline />
        <NavigationBar />
        <Routes />
        <SnackBar />
      </>
    </CustomThemeProvider>
  );

}

export default App;
