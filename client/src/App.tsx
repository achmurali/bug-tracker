import React, { useEffect } from 'react';

import Routes from './Routes';
import CustomThemeProvider from './themes/customThemeProvider';
import NavigationBar from './pages/navigation-bar';
import { CssBaseline, makeStyles } from '@material-ui/core';


const App:React.FC = ():React.ReactElement => {

  return (
    <CustomThemeProvider>
    <>
    <CssBaseline />
    <NavigationBar/>
    <Routes />
    </>
    </CustomThemeProvider>
  );

}

export default App;
