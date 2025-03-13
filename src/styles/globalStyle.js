// Helper function to get theme-aware styles
const getThemeAwareStyles = (lightStyle, darkStyle) => (theme) => {
  return theme.palette.mode === "dark" ? darkStyle : lightStyle;
};

export const authContainerStyle = (bgImage) => (theme) => {
  return {
    minHeight: "100vh",
    p: 0,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    // Add a dark overlay for dark mode
    "&::before":
      theme.palette.mode === "dark"
        ? {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 0,
          }
        : {},
  };
};

export const authMainContainerGridStyle = {
  p: { xs: 1, sm: 2 },
  justifyContent: {
    xs: "center",
    sm: "center",
    md: "center",
    lg: "flex-end",
  },
  alignItems: "center",
  position: "relative",
  zIndex: 1,
};

export const authFormContainerGridStyle = (theme) => ({
  backgroundColor: getThemeAwareStyles(
    "rgba(246, 244, 240, 0.4)", // Light mode
    "rgba(31, 41, 55, 0.7)" // Dark mode (background.darker with opacity)
  )(theme),
  p: { xs: 2, sm: 3 },
  borderRadius: "30px",
  boxShadow: getThemeAwareStyles(
    "0px 30px 60px rgba(0, 0, 0, 0.2), 0px 40px 80px rgba(0, 0, 0, 0.15)",
    "0px 30px 60px rgba(0, 0, 0, 0.5), 0px 40px 80px rgba(0, 0, 0, 0.4)"
  )(theme),
  maxWidth: { xs: "100%", sm: "80%", md: "600px" },
  mt: 12,
  ml: "auto",
  mr: {
    sm: 5,
    md: 6,
    lg: 10,
  },
});

export const authFormBoxStyle = (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "15px",
  px: { xs: 2, sm: 3, md: 4, lg: 5 },
  py: { xs: 2, sm: 3, md: 4 },
  mx: { xs: 2, sm: 3, md: 4, lg: 5 },
  // Add a subtle border in dark mode
  ...(theme.palette.mode === "dark" && {
    border: "1px solid rgba(255, 255, 255, 0.1)",
  }),
});

export const authButtonBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  px: { xs: 2, sm: 3, md: 4, lg: 5 },
  py: 2,
  // mx: 1
};

export const btnStyle = (theme) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.light
      : theme.palette.primary.main,
  borderRadius: "12px",
  // color: "secondary.main",
  px: 5,
  "&:hover": {
    backgroundColor: "customColors.lightgreen",
    opacity: 0.9,
  },
});

export const inputHeightStyle = {
  "& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "1rem",
  },
};

// Dark mode aware typography styles
export const headerTypographyStyle = (theme) => ({
  fontWeight: "600",
  fontSize: {
    xs: "1.5rem",
    sm: "2rem",
    md: "2rem",
    lg: "2.5rem",
  },
  color: theme.palette.mode === "dark" ? "#dddcd8" : "primary.main", // Use offWhite in dark mode
});

// Dark mode aware input styles
// export const inputStyle = (theme) => ({
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.23)" : undefined,
//     },
//     "&:hover fieldset": {
//       borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.5)" : undefined,
//     },
//     "& input": {
//       color: theme.palette.mode === "dark" ? "#F6F4F0" : undefined, // Use offWhite in dark mode
//     }
//   },
//   "& .MuiInputLabel-root": {
//     color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : undefined,
//   },
//   "& .MuiIconButton-root": {
//     color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : undefined,
//   },
// });

// Dark mode aware link styles
// export const authLinkStyle = (theme) => ({
//   textAlign: "center", 
//   color: theme.palette.mode === "dark" ? "#F6F4F0" : "#2E5077", // Use offWhite in dark mode
//   "&:hover": {
//     textDecoration: "underline",
//   },
// });



const notFoundStyles = {
  container: {
    textAlign: "center",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  image: {
    width: "600px",
    height: "auto",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    backgroundColor: "#3CA6A6",
    padding: "12px 25px",
    borderRadius: "30px",
    fontSize: "18px",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
  },
};

export default notFoundStyles;
