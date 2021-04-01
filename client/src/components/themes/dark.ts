import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main:"#c5c5c5"
    }
  }
  // overrides:{
  //   MuiToolbar:{
  //     root:{
  //       backgroundColor:"red",
  //     }
  //   }
  // }
})

export default theme