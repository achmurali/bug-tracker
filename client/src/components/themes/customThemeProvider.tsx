import React, { ReactElement, useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core';
import getTheme from './base'

export const ThemeContext = React.createContext((theme:string):void => {});

const key:string = "appTheme"

const CustomThemeProvider = (props:{[key:string]:ReactElement}) => {
    const storedTheme:string = localStorage.getItem(key) || "light";

    const [themeName,setThemeName] = useState(storedTheme);

    const setGlobalTheme = (theme:string) => {
        localStorage.setItem(key,theme);
        setThemeName(theme);
    };

    const theme = getTheme(themeName);

    return (
    <ThemeContext.Provider value={setGlobalTheme}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
    );
}

export default CustomThemeProvider
