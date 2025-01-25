import { Avatar, Box, Container, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/loginRegisterImage/weSupport2.jpg'
import LoginHeader from "../components/auth/LoginHeader"
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
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
          <Typography
            variant="h5"
            align="center"
            mb={1}
            color="secondary"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
                md: "2rem"
              }
            }}
          >
            Login
          </Typography>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={values => {
         
              console.log(values);
            }}
            component={(props)=><LoginForm {...props}/>}
          >
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2, color: "customColor.darkblue" }}>
            <Link to="/register"  style={{color: "#2E5077"}}>
              Don't have an account? <b>Sign Up</b>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
