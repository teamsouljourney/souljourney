import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

const RegisterHeader = () => {
  const { t } = useTranslation();
  return (
    <Grid size={12} mb={1}>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{
          fontWeight: "600",
          paddingTop: "",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2rem",
            lg: "2.5rem",
          },
        }}
      >
        {/* Join Us on a Transformative Journey
        Sign Up and Begin Your Soul Journey*/}
        {t("registerHeader")}
        {/* Navigate your path to inner Harmony... */}
      </Typography>
    </Grid>
  );
};

export default RegisterHeader;
