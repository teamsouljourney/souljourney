import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { headerTypographyStyle } from "../../styles/globalStyle";

const RegisterHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme()
  return (
    <Grid size={12} mb={1}>
      <Typography
        variant="h5"
        align="center"
        sx={headerTypographyStyle}
      >
        {t("registerHeader")}
      </Typography>
    </Grid>
  );
};

export default RegisterHeader;
