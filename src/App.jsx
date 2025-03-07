import "./App.css";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import CookieConsentComponent from "./components/CookieConsent";



function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2E5077", // Navy Blue (Main color)
        light: "#436285", // Light Navy Blue
        dark: "#29486b", // Dark Navy Blue
      },
      secondary: {
        main: "#F6F4F0", // Off-White (Main color)
        light: "#F7F5F2", // Lighter Off-White
        dark: "#dddcd8", // Darker Off-White
      },
      customColors: {
        pink: "#D798B0",
        purple: "#8F5B8A",
        darkblue: "#2E5077",
        lightgreen: "#4DA1A9",
        green: "#79D7BE",
        darkgreen: "#459198",
      },
    },
    typography: {
      fontFamily: '"Urbanist", serif',
    },
  });
  return (
    <>
    <CookieConsentComponent/>
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
