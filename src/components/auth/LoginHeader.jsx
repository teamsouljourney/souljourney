import { Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTranslation } from "react-i18next";
import {headerTypographyStyle} from '../../styles/globalStyle';

const LoginHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme()
  return (
    <Grid size={12} mb={3}>
      <Typography
        variant="h4"
        align="center"
        sx={headerTypographyStyle}
      >
        {t("loginHeader")}
      </Typography>
    </Grid>
  )
}

export default LoginHeader