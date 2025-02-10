import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { SignupSchema } from "../components/auth/RegisterForm";
import {
  authMainContainerGridStyle,
  authFormContainerGridStyle,
} from "../styles/globalStyle";
import AccountForm from "../components/auth/AccountForm";

const Account = () => {
  return (
    <Container maxWidth="xxl">
      <Grid
        container
        rowSpacing={{ sm: 3 }}
        sx={{
          // height: "100vh",
          p: { xs: 1, sm: 2 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid red",
          bgcolor: "secondary",
          flexDirection: {
              xs: "column",
              sm: "row-reverse",
          }
        }}
      >
        <Grid xs={12}>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            sx={{
              fontWeight: "600",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2rem",
                lg: "2.5rem",
              },
              mb: {
                xs: 2,
                sm: 3,
              }
            }}
          >
            Navigate your path to inner Harmony...
          </Typography>
        </Grid>
        <Grid
          size={12}
          sx={{
            backgroundColor: "rgba(246, 244, 240, 0.7)",
            // border: "1px solid red",
            p: { xs: 2, sm: 3 },
            borderRadius: "30px",
            boxShadow:
              "0px 30px 60px rgba(0, 0, 0, 0.2), 0px 40px 80px rgba(0, 0, 0, 0.15)",
            maxWidth: { xs: "100%", sm: "80%", md: "600px" },
            m: "auto"
          }}
        >
          <Typography
            variant="h5"
            align="center"
            mb={1}
            color="primary"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem",
              },
            }}
          >
            Update Your Account
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
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <AccountForm {...props} />}
          ></Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
