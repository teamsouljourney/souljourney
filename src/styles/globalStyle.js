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
// export const btnStyle = {
//     cursor: "pointer",
//     color: "secondary.main",
//     "&:hover": {
//       color: "red",
//     },
//   };