import * as Yup from "yup";
import { Form } from "formik";
import { Box, Button, TextField } from "@mui/material";
import resetPassword from "../../assets/images/resetPassword.png";
import PasswordField from "./PasswordField";

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d+/, "Password must contain at least one digit!")
    .matches(/[a-z]/, "Password must contain lowercase letters!")
    .matches(/[A-Z]/, "Password must contain uppercase letters!")
    .matches(
      /[@$?!%&*]+/,
      "Password must contain at least one special character(@$?!%&*)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  verificationCode: Yup.string()
    .required("Verification Code is required")
    .length(6, "Verification Code must be 6 digits long")
    .matches(/^\d{6}$/, "Verification Code must be a 6-digit number"),
});

const ResetPasswordForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: { xs: "1rem", md: "2rem" },
            gap: 3,
            width: { md: "40%" },
            height: { md: "25rem" },
          }}
        >
          <PasswordField
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            errors={errors}
          />
          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            errors={errors}
          />

          <TextField
            name="verificationCode"
            label="Verification Code"
            id="verificationCode"
            value={values.verificationCode}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.verificationCode && errors.verificationCode}
            error={touched.verificationCode && Boolean(errors.verificationCode)}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Change Password"}
          </Button>
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${resetPassword})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: { xs: "none", md: "block" },
            width: { md: "50%" },
            height: { md: "25rem" },
          }}
        ></Box>
      </Box>
    </Form>
  );
};

export default ResetPasswordForm;
