import * as Yup from "yup";
import { Form } from "formik";
import { Box, Button, TextField } from "@mui/material";
import forgotPassword from "../../assets/images/forgotPassword.png";

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPasswordForm = ({
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
            backgroundImage: `url(${forgotPassword})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: { xs: "none", md: "block" },
            width: { md: "50%" },
            height: { md: "23rem" },
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: { xs: "1rem", md: "2rem" },
            gap: 3,
            width: { md: "40%" },
            height: { md: "23rem" },
          }}
        >
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Forgot Password"}
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ForgotPasswordForm;
