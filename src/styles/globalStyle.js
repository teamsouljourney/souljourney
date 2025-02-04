export const authContainerStyle = (bgImage) => {
    return ({
        minHeight: "100vh",
        // minWidth: "100vw",
        p: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    });
};

export const authMainContainerGridStyle = {
    // height: "100vh",
    p: { xs: 1, sm: 2 },
    justifyContent: {
        xs: "center",
        sm: "center",
        md: "center",
        lg: "flex-end"
    },
    alignItems: "center",
    // border: "1px solid red",
    // flexDirection: {
    //     xs: "column",
    //     sm: "row-reverse",
    // }
};

export const authFormContainerGridStyle = {
    backgroundColor: "rgba(246, 244, 240, 0.7)",
    // border: "1px solid red",
    p: { xs: 2, sm: 3 },
    borderRadius: "30px",
    boxShadow: "0px 30px 60px rgba(0, 0, 0, 0.2), 0px 40px 80px rgba(0, 0, 0, 0.15)",
    maxWidth: { xs: "100%", sm: "80%", md: "600px" },
    mt: 12,
    ml: "auto",
    mr: {
        sm: 5,
        md: 6,
        lg: 10,
    }
};

export const authFormBoxStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: 1, 
    backgroundColor: "secondary.main",
    // border: "1px solid red",
    borderRadius: "30px",
    px: {xs: 2, sm: 3, md: 4 ,lg:5},
    py: {xs: 2, sm: 3, md: 4},
    mx: 3
};
export const authButtonBoxStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: 1,
    px: {xs: 2, sm: 3, md: 4 ,lg:5},
    py: 2,
    mx: 3
};

export const btnStyle = {
    backgroundColor: "customColors.darkblue",
    color: "secondary.main",
    "&:hover": {
      backgroundColor: "customColors.lightgreen",
      opacity: 0.9
      },
  };

export const inputHeightStyle = {"& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "1rem"
  }}