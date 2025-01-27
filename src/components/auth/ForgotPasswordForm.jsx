import * as Yup from "yup";
import { Form } from "formik";
import { Box, Button, TextField } from "@mui/material";
import forgotPassword from "../assets/images/forgotPassword.png";

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
            display: { xs: "none", lg: "block" },
            width: { lg: "40%" },
            height: { lg: "23rem" },
            borderRadius: "1rem 0 0 1rem",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#fff",
            padding: "2rem",
            borderRadius: { xs: "1rem", lg: "0 1rem 1rem 0" },
            gap: 3,
            width: { lg: "50%" },
            height: { lg: "23rem" },
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
            sx={{ width: "27ch" }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ width: "35ch" }}
          >
            {isSubmitting ? "Loading..." : "Forgot Password"}
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ForgotPasswordForm;
