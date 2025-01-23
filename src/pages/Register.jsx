import { Avatar, Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/images/weSupport.jpg'
import RegisterHeader from '../components/auth/RegisterHeader'
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from 'formik';
import { SignupSchema } from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={{
        height: "100vh",
        p: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
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
          >

          </Formik>
          <Box sx={{ textAlign: "center", mt: 2, color: "customColor.darkblue" }}>
            <Link to="/login">Already have an account? Sign in</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;