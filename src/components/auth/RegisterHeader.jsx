import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const RegisterHeader = () => {
  return (
    <Grid item xs={12} mb={3}>
      <Typography
        variant="h4"
        color="secondary"
        align="center"
        sx={{
          fontWeight: "600",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
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
