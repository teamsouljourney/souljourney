import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import * as Yup from "yup"
import { authButtonBoxStyle, authFormBoxStyle, btnStyle } from "../../styles/globalStyle";
import googleLogo from "../../assets/loginRegisterImage/Google.png";
import PasswordField from "./PasswordField";
import useAuthCall from "../../hooks/useAuthCall";
import { useTranslation } from "react-i18next";

export const SignupSchema = (t) => Yup.object().shape({
  userName: Yup.string()
    .required(t("requiredUsernameMessage"))
    .min(3, t("usernameMinMessage")),
  firstName: Yup.string()
    .min(2, t("firstnameMinMessage"))
    .max(50, t("firstnameMaxMessage"))
    .required(t("requiredFirtsnameMessage")),
  lastName: Yup.string()
    .min(2, t("lastnameMinMessage"))
    .max(50, t("lastnameMaxMessage"))
    .required(t("Last name is required!")),
  email: Yup.string().email(t("validEmailMessage")).required(t("requiredEmailMessage")),
  password: Yup.string()
    .required(t("requiredPasswordMessage"))
    .min(8, t("passwordMinLengthMessage"))
    .matches(/\d+/, t("passwordDigitMessage"))
    .matches(/[a-z]/, t("passwordLowerCaseMessage"))
    .matches(/[A-Z]/, t("passwordUpperCaseMessage"))
    .matches(/[@$?!%&*]+/, t("passwordSpecialCharMessage"))
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
  const { t } = useTranslation();

  return (
    <div>
      <Form>
        <Box 
          sx={authFormBoxStyle}
        >
          <TextField
            name="userName"
            label={t("username")}
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
            label={t("firstName")}
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
            label={t("lastName")}
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
            label={t("email")}
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
            label={t("password")}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            errors={errors}
          />

          
        </Box>
      </Form>
      <Box sx={authButtonBoxStyle}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
          onClick={handleSubmit}
        >
          {isSubmitting ? t("loading")+"..." : t("signUp")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
          onClick={signInWithGoogle}
        >
          {isSubmitting ? t("loading")+"..." : t("signUpWith")}
          <img style={{marginLeft: 6}} src={googleLogo} alt="" />
        </Button>
      </Box>      
    </div>
  )
}

export default RegisterForm