import { Avatar, Container, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/computer-4484282_1280.jpg'
import LoginHeader from "../components/auth/LoginHeader"
import LockIcon from "@mui/icons-material/Lock";
import { authContainerStyle, authFormContainerGridStyle, authMainContainerGridStyle } from "../styles/globalStyle";

const Login = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={authContainerStyle(bgImage)}
    >
      <Grid
        container
        rowSpacing={{ sm: 3 }}
        sx={authMainContainerGridStyle}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={authFormContainerGridStyle}
        >
          <LoginHeader />
          <Avatar
            sx={{
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography textAlign="center">Sign In</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
