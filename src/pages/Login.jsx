import { Avatar, Container, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/computer-4484282_1280.jpg'
import LoginHeader from "../components/auth/LoginHeader"
import LockIcon from "@mui/icons-material/Lock";
import { authContainerStyle } from "../styles/globalStyle";

const Login = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={authContainerStyle(bgImage)}
    >
      <Grid
        container
        justifyContent="flex-end" // Sağ tarafa hizalama
        alignItems="center" // Dikey ortalama
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100%",
          p: 2,
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            backgroundColor: "white",
            p: 2,
            borderRadius: "30px",
            height: "700px",
            width: "700px",
            opacity: 0.8,
            mt: 5,
            ml: "auto",
          }}
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
