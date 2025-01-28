export const authContainerStyle = (bgImage) => {
    return ({
        minHeight: "100vh",
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
    height: "100%",
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
    // height: "700px",
    maxWidth: { xs: "100%", sm: "80%", md: "600px" },
    mt: 8,
    ml: "auto"
};

export const authFormBoxStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: 2, 
    backgroundColor: "secondary.main",
    // border: "1px solid red",
    borderRadius: "30px",
    p: { xs: 2, sm: 3 },
};

// export const btnStyle = {
//     cursor: "pointer",
//     color: "secondary.main",
//     "&:hover": {
//       color: "red",
//     },
//   };