import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

const LoginHeader = () => {
  return (
    <Grid xs={12} mb={3}>
      <Typography
        variant="h4"
        color="customColors.pink"
        align="center"
        sx={{
          fontWeight: "600",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
          },
        }}
      >
        {/* Welcome Back to Soul Journey
        Log in to Access Your Personal Path */}
        Ready to Continue Your Journey?
      </Typography>
    </Grid>
  )
}

export default LoginHeader