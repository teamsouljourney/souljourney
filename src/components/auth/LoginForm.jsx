import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import { object, string } from "yup";
import { authFormBoxStyle } from "../../styles/globalStyle";
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
      <Form>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "customColors.purple",
                color: "secondary.main",
                "&:hover": {
                  backgroundColor: "customColors.darkblue",
                  opacity: 0.8,
                },
              }}
            >
              {isSubmitting ? "Loading..." : "Sign In"}
            </Button>
            <Box
              sx={{
                textAlign: "center",
                color: "customColor.darkblue",
                width: "75%",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <Link to="/forgotPassword" style={{ color: "#2E5077" }}>
                Forgot your <b>password!</b>
              </Link>
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "customColors.purple",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "customColors.darkblue",
                opacity: 0.8,
              },
            }}
            onClick={signInWithGoogle}
          >
            {isSubmitting ? "Loading..." : "Sign in with"}
            <img src={googleLogo} alt="" />
          </Button>
        </Box>
      </Form>
    </div>
  );
};

export default LoginForm;
