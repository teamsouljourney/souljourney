import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import { object, string } from "yup";
import { authButtonBoxStyle, authFormBoxStyle, btnStyle } from "../../styles/globalStyle";
import googleLogo from "../../assets/loginRegisterImage/Google.png";
import PasswordField from "./PasswordField";
import useAuthCall from "../../hooks/useAuthCall";
import { useTranslation } from "react-i18next";

export const loginSchema = (t) => 
  object({
    email: string()
      .email(t("validEmailMessage"))
      .required(t("requiredEmailMessage")),
    password: string().required(t("requiredPasswordMessage")),
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
  const { t } = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div>
      <Form onKeyDown={handleKeyDown}>
        <Box sx={authFormBoxStyle}>
          <TextField
            name="email"
            label={t("email")}
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
            label={t("password")}
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
          onClick={handleSubmit}
        >
          {isSubmitting ? t("loading") + "..." : t("signIn")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
          onClick={signInWithGoogle}
        >
          {isSubmitting ? t("loading") + "..." : t("signInWith")}
          <img style={{marginLeft: 6}} src={googleLogo} alt="" />
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
