import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTranslation } from "react-i18next";

const LoginHeader = () => {
  const { t } = useTranslation();
  return (
    <Grid size={12} mb={3}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{
          fontWeight: "600",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2rem",
            lg: "2.5rem",
          },
        }}
      >
        {/* Welcome Back to Soul Journey
        Log in to Access Your Personal Path */}
        {t("loginHeader")}
      </Typography>
    </Grid>
  )
}

export default LoginHeader