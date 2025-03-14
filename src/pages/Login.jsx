import { Avatar, Box, Container, Typography, useTheme } from "@mui/material"
import Grid from '@mui/material/Grid2'
import bgImage from '../assets/loginRegisterImage/weSupport2.jpg'
import LoginHeader from "../components/auth/LoginHeader"
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
import { authContainerStyle, authFormContainerGridStyle, authLinkStyle, authMainContainerGridStyle } from "../styles/globalStyle";
import useAuthCall from "../hooks/useAuthCall";
import { useTranslation } from "react-i18next";

const Login = () => {
  const {login} = useAuthCall()
  const { t } = useTranslation();
  const theme = useTheme()
  const schemaLogin = loginSchema(t)
  return (
    <Container
      maxWidth="xxl"
      sx={authContainerStyle(bgImage)}
    >
      <Grid
        container
        rowSpacing={{ sm: 3 }}
        sx={authMainContainerGridStyle}
      >
        <Grid
          size={12}
          sx={authFormContainerGridStyle}
        >
          <LoginHeader />
          <Avatar
            sx={{
              m: "auto",
              width: 30,
              height: 30,
              bgcolor: theme.palette.mode === "dark" ? "#dddcd8" : "primary.main",
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h5"
            align="center"
            mb={1}
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.5rem"
              },
              color: theme.palette.mode === "dark" ? "#dddcd8" : "primary.main",
            }}
          >
            {t("login")}
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schemaLogin}
            onSubmit={(values, actions) => {         
              // console.log(values);
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props)=><LoginForm {...props}/>}
          >
          </Formik>
          <Box
            sx={authLinkStyle}
          >
            <Link to="/register"  style={{color: theme.palette.mode === "dark" ? "#F6F4F0" : "#2E5077"}}>
              {t("dontHaveAccount")} <b>{t("signUp")}</b>
            </Link>
          </Box>
          <Box
            sx={{
              ...authLinkStyle(theme),
              mt: 1,
            }}
          >
            <Link to="/forgotPassword" style={{ color: theme.palette.mode === "dark" ? "#F6F4F0" : "#2E5077" }}>
              {t("forgotYourPassword")}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
