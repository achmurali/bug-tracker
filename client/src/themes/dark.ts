import { createMuiTheme } from '@material-ui/core/styles'

// Dark theme
const theme = () => createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0277bd',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFB74D',
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
  overrides:{
    MuiToolbar:{
      root:{
        backgroundColor:"#0277bd",
      }
    }
  }
})

export default theme