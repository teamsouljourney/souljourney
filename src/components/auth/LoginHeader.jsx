import React from 'react'

const LoginHeader = () => {
  return (
    <Grid item xs={12} mb={3}>
      <Typography variant="h3" align="center" 
        sx={{color: "customColors.pink"}}
      >
        {/* Welcome Back to Soul Journey
        Log in to Access Your Personal Path */}
        Ready to Continue Your Journey?
      </Typography>
    </Grid>
  )
}

export default LoginHeader