import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import * as Yup from "yup"
import { authFormBoxStyle } from "../../styles/globalStyle";
import googleLogo from "../../assets/loginRegisterImage/Google.png";
import PasswordField from "./PasswordField";
import useAuthCall from "../../hooks/useAuthCall";

export const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required!")
    .min(3, "Username must be at least 3 characters!"),
  firstName: Yup.string()
    .min(2, "First name is too short! It should be at least 2 characters.")
    .max(50, "First name is too long! It should be at most 50 characters.")
    .required("First name is required!"),
  lastName: Yup.string()
    .min(2, "Last name is too short! It should be at least 2 characters.")
    .max(50, "Last name is too long! It should be at most 50 characters.")
    .required("Last name is required!"),
  email: Yup.string().email("Please enter a valid email address!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long!")
    .matches(/\d+/, "Password must contain at least one digit!")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
    .matches(/[@$?!%&*]+/, "Password must contain at least one special character (@$?!%&*)")
});

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {

  const theme = useTheme()
  const {signInWithGoogle} = useAuthCall()
  return (
    <div>
      <Form>
        <Box 
        sx={authFormBoxStyle}
        >
          <TextField
            name="userName"
            label="Username"
            type="text"
            variant="outlined"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
            required
          />
          <TextField
            name="firstName"
            label="First Name"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
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

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "customColors.darkblue",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "customColors.purple",
                opacity: 0.8
                },
            }}
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
          <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
              backgroundColor: "customColors.darkblue",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "customColors.purple",
                opacity: 0.8
                },
            }}
              onClick={signInWithGoogle}
            >
              {isSubmitting ? "Loading..." : "Sign up with"}
              <img src={googleLogo} alt="" />
            </Button>
        </Box>
      </Form>
    </div>
  )
}

export default RegisterForm