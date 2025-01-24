import { Avatar, Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/weSupport.jpg'
import RegisterHeader from '../components/auth/RegisterHeader'
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from 'formik';
import RegisterForm, { SignupSchema } from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { authContainerStyle, authMainContainerGridStyle, authFormContainerGridStyle, } from '../styles/globalStyle';

const Register = () => {
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
          <RegisterHeader />
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
            mb={2}
            color="secondary"
          >
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              userName: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
         
              console.log(values);
            }}
            component={(props)=><RegisterForm {...props}/>}
          >

          </Formik>
          <Box sx={{ textAlign: "center", mt: 2, color: "customColor.darkblue" }}>
            <Link to="/login">Already have an account? <b>Sign in</b> </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;