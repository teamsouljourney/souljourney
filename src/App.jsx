import "./App.css";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";



function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F6F4F0",
      },
      secondary: {
        pink: "#D798B0",
        purple: "#8F5B8A",
        darkblue: "#2E5077",
        lightgreen: "#4DA1A9",
        green: "#79D7BE",
      },
    },
    typography: {
      fontFamily: '"Urbanist", serif',
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
