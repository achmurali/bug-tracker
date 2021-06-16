import React, { useEffect } from 'react';

import Routes from './Routes';
import CustomThemeProvider from './themes/customThemeProvider';
import NavigationBar from './components/navigation-bar';
import { CssBaseline, makeStyles } from '@material-ui/core';
import SnackBar from './components/snackBar';


const App:React.FC = ():React.ReactElement => {

  return (
    <CustomThemeProvider>
    <>
    <CssBaseline />
    <NavigationBar/>
    <Routes />
    <SnackBar />
    </>
    </CustomThemeProvider>
  );

}

export default App;
