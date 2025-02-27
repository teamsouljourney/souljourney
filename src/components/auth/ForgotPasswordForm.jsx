import * as Yup from "yup";
import { Form } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import forgotPassword from "../../assets/images/verificationFail.png";

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
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to previous page
  };

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
            height: { md: "25rem" },
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
            height: { md: "25rem" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleBack}
                sx={{
                  minWidth: "40px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  mr: 5,
                  color: "customColors.purple",
                  "&:hover": {
                    backgroundColor: "customColors.pink",
                    opacity: 0.8,
                  },
                }}
                variant="text"
              >
                <ArrowBack />
              </Button>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  color: "customColors.darkblue",
                  fontWeight: "semibold",
                }}
              >
                Forgot Password
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Please enter your email to reset your password
            </Typography>
          </Box>

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
            {isSubmitting ? "Loading..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </Form>
  );
};

export default ForgotPasswordForm;
