import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const RegisterHeader = () => {
  return (
    <Grid xs={12} mb={1}>
      <Typography
        variant="h4"
        color="customColors.pink"
        align="center"
        sx={{
          fontWeight: "600",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "2.5rem",
          },
        }}
      >
        {/* Join Us on a Transformative Journey
        Sign Up and Begin Your Soul Journey*/}
        Create Your Account and Start Healing
      </Typography>
    </Grid>
  );
};

export default RegisterHeader;
