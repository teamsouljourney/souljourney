import { Container } from "@mui/material";
import { Formik } from "formik";
import ResetPasswordForm, {
  ResetPasswordSchema,
} from "../components/auth/ResetPasswordForm";
import { useParams } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";

const ResetPassword = () => {
  const { resetPassword } = useAuthCall();
  const { token } = useParams();
  // console.log(token);

  const initialValues = {
    password: "",
    confirmPassword: "",
    verificationCode: "",
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: "12rem",
        minHeight: "100vh",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, actions) => {
          resetPassword(token, values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <ResetPasswordForm {...props} />}
      ></Formik>
    </Container>
  );
};

export default ResetPassword;
