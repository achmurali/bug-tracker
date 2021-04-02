import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Normal or default theme
const theme = () => createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#58a5f0',
      main: '#0277bd',
      dark: '#004c8c',
    },
    secondary: {
      light: '#b3e5fc',
      main: '#bbdefb',
      dark: '#82b3c9',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    }
  }
})
export default theme