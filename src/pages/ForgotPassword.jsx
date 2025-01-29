import { Container } from "@mui/material";
import { Formik } from "formik";
import ForgotPasswordForm, {
  ForgotPasswordSchema,
} from "../components/auth/ForgotPasswordForm";
import useAuthCall from "../hooks/useAuthCall";

const ForgotPassword = () => {
  const { forgotPassword } = useAuthCall();

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
          forgotPassword(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(props) => <ForgotPasswordForm {...props} />}
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
