import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import { object, string } from "yup";
import { authButtonBoxStyle, authFormBoxStyle, btnStyle } from "../../styles/globalStyle";
import googleLogo from "../../assets/loginRegisterImage/Google.png";
import PasswordField from "./PasswordField";
import useAuthCall from "../../hooks/useAuthCall";
import { Link } from "react-router-dom";

export const loginSchema = object({
  // userName: string()
  //   .required("Username is required!")
  //   .min(3, "Username must be at least 3 characters!"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  // console.log(errors, touched);
  const theme = useTheme();
  const { signInWithGoogle } = useAuthCall();
  return (
    <div>
      <Form
      //  style={{border: "1px solid red"}}
      >
        <Box sx={authFormBoxStyle}>
          <TextField
            name="email"
            label="Email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            required
          />
          <PasswordField
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            errors={errors}
          />
        </Box>
      </Form>
      <Box
        sx={authButtonBoxStyle}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
          onClick={signInWithGoogle}
        >
          {isSubmitting ? "Loading..." : "Sign in with"}
          <img src={googleLogo} alt="" />
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
