export const authContainerStyle = (bgImage) => {
    return ({
        height: "100vh",
        p: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",}
    );
};

export const authMainContainerGridStyle = {
    height: "100%",
    p: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    border: "1px solid red",
    // flexDirection: {
    //     xs: "column",
    //     sm: "row-reverse",
    // }
};

export const authFormContainerGridStyle = {
    backgroundColor: "primary.main",
    border: "1px solid red",
    p: 3,
    borderRadius: "30px",
    boxShadow: "0px 30px 60px rgba(0, 0, 0, 0.2), 0px 40px 80px rgba(0, 0, 0, 0.15)",
    height: "700px",
    width: "600px",
    opacity: 0.7,
    // mt: 5,
    ml: "auto"
};

export const authFormBoxStyle = {
    display: "flex", 
    flexDirection: "column", 
    gap: 2, 
    backgroundColor: "primary.main",
    border: "1px solid red",
};

// export const btnStyle = {
//     cursor: "pointer",
//     color: "secondary.main",
//     "&:hover": {
//       color: "red",
//     },
//   };