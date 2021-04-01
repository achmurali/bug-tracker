import React, { ReactElement, useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core';
import getTheme from './base'

export const ThemeContext = React.createContext(():void => {});

const key:string = "appTheme"

const CustomThemeProvider = (props:{[key:string]:ReactElement}) => {
    const storedTheme:string = localStorage.getItem(key) || "normal";

    const [themeName,setThemeName] = useState(storedTheme);

    const setGlobalTheme = () => {
        let theme = "";
        console.log("themename " + themeName)
        if(themeName === "normal")
            theme = "dark";
        else
            theme = "normal";
        localStorage.setItem(key,theme);
        setThemeName(theme);
    };

    const theme = getTheme(themeName);
    console.log("theme.type "+theme.palette.type)

    return (
    <ThemeContext.Provider value={setGlobalTheme}>
      <MuiThemeProvider theme={theme}>
      {console.log("inside " + theme.palette.type)}
      {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
    );
}

export default CustomThemeProvider
