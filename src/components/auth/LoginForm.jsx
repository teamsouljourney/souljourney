import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import {object, string} from "yup"
import { authFormBoxStyle } from "../../styles/globalStyle";

export const loginSchema = object({
  userName: string()
    .required("Username is required!")
    .min(3, "Username must be at least 3 characters!"),
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .required("Password is required")
});

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const theme = useTheme()
  return (
    <div>
      <Form>
        <Box sx={authFormBoxStyle}>
          <TextField
            name="userName"
            label="Username"
            type="text"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
            required
          />
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
          <TextField
            name="password"
            label="Password"
            type="text"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "customColors.purple",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "customColors.darkblue",
                opacity: 0.8
                },
            }}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </Button>
        </Box>
      </Form>
    </div>
  )
}

export default LoginForm