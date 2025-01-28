import { Avatar, Box, Container, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/loginRegisterImage/smile1.jpg'
import LoginHeader from "../components/auth/LoginHeader"
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
import { authContainerStyle, authFormContainerGridStyle, authMainContainerGridStyle } from "../styles/globalStyle";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const {login} = useAuthCall()
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
          size={12}
          sx={authFormContainerGridStyle}
        >
          <LoginHeader />
          <Avatar
            sx={{
              m: "auto",
              width: 30,
              height: 30,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h5"
            align="center"
            mb={1}
            color="customColors.pink"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem"
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
            onSubmit={(values, actions) => {         
              console.log(values);
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
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
