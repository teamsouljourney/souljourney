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
    backgroundColor: "rgba(246, 244, 240, 0.4)",
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
    borderRadius: "15px",
    px: {xs: 2, sm: 3, md: 4 ,lg:5},
    py: {xs: 2, sm: 3, md: 4},
    mx: {xs: 2, sm: 3, md: 4, lg:5},
};
export const authButtonBoxStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: 1,
    px: {xs: 2, sm: 3, md: 4 ,lg:5},
    py: 2,
    // mx: 1
};

export const btnStyle = {
    backgroundColor: "customColors.darkblue",
    borderRadius: "12px",
    color: "secondary.main",
    px:5,
    "&:hover": {
      backgroundColor: "customColors.lightgreen",
      opacity: 0.9
    },
  };

export const inputHeightStyle = {"& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "1rem"
  }}

  const notFoundStyles = {
    container: { 
      textAlign: "center", 
      padding: "50px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh" 
    },
    image: { 
      width: "600px", 
      height: "auto", 
      marginBottom: "10px" 
    },
    heading: { 
      fontSize: "36px", 
      fontWeight: "bold", 
      color: "#333" 
    },
    text: { 
      fontSize: "20px", 
      color: "#555", 
      marginBottom: "20px" 
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
      textAlign: "center" 
    }
  };
  
  export default notFoundStyles;