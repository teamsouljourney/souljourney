import { Avatar, Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/loginRegisterImage/weSupport1.jpg'
import RegisterHeader from '../components/auth/RegisterHeader'
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from 'formik';
import RegisterForm from '../components/auth/RegisterForm';
import { SignupSchema } from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { authContainerStyle, authMainContainerGridStyle, authFormContainerGridStyle, } from '../styles/globalStyle';
import useAuthCall from '../hooks/useAuthCall';

const Register = () => {
  const {register} = useAuthCall()
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
          <RegisterHeader />
          <Avatar
            sx={{
              m: "auto",
              width: 30,
              height: 30,
            }}
          >
            <LockIcon size="20" />
          </Avatar>
          <Typography
            variant="h5"
            align="center"
            mb={1}
            color="primary"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem"
              }
            }}
          >
            Register
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
            onSubmit={(values, actions) => {
              console.log(values);
              register(values)
              actions.resetForm()
              actions.setSubmitting(false);
            }}
            component={(props)=><RegisterForm {...props}/>}
          >
          </Formik>
          <Box
             sx={{
              textAlign: "center", 
              mt: 2, 
              color: "customColor.darkblue",
              "&:hover": {
                textDecoration: "underline",
              },
             }}
          >
            <Link to="/login" style={{color: "#2E5077"}}>
              Already have an account? <b>Sign in</b> 
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
