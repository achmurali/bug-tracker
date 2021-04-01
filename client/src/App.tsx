import React, { useEffect } from 'react';

import Routes from './Routes';
import CustomThemeProvider from './components/themes/customThemeProvider';
import NavigationBar from './components/navigation-bar';

const App:React.FC = ():React.ReactElement => {

  return (
    <CustomThemeProvider>
    <>
    <NavigationBar/>
    <Routes />
    </>
    </CustomThemeProvider>
  );

}

export default App;
