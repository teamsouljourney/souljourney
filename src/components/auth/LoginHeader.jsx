import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

const LoginHeader = () => {
  return (
    <Grid item xs={12} mb={3}>
      <Typography variant="h4" color="secondary" align="center">
        {/* Welcome Back to Soul Journey
        Log in to Access Your Personal Path */}
        Ready to Continue Your Journey?
      </Typography>
    </Grid>
  )
}

export default LoginHeader