import React, { useEffect } from 'react';

import Routes from './Routes';
import NavigationBar from './components/navigation-bar';

const App:React.FC = ():React.ReactElement => {

  return (
    <>
    <NavigationBar/>
    <Routes />
    </>
  );

}

export default App;
