import { Container } from "@mui/material";
import { Formik } from "formik";
import ForgotPasswordForm, {
  ForgotPasswordSchema,
} from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: "12rem",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        component={(props) => <ForgotPasswordForm {...props} />}
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
