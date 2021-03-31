import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides:{
    MuiToolbar:{
      root:{
        backgroundColor:"#0277bd"
      }
    }
  }
})

export default theme