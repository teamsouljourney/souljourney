import "./App.css";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import CookieConsentComponent from "./components/CookieConsent";
import { useMemo } from "react";
import useThemeDetector from "./hooks/useThemeDetector";

// Separate the theme creation into a component that can detect theme changes
const ThemedApp = () => {
  const themeMode = useThemeDetector();
  
  // Create theme based on the current mode
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: "#2E5077", // Navy Blue (Main color)
          light: "#436285", // Light Navy Blue
          dark: "#29486b", // Dark Navy Blue
        },
        secondary: {
          // Adjust secondary colors based on theme
          main: themeMode === "dark" ? "#1f2937" : "#F6F4F0", // Using background.darker for dark mode
          light: themeMode === "dark" ? "#4b5563" : "#F7F5F2", // Using background.lightdark for dark mode
          dark: themeMode === "dark" ? "#374151" : "#dddcd8", // Using background.dark for dark mode
        },
        customColors: {
          pink: "#D798B0",
          purple: "#8F5B8A",
          darkblue: "#2E5077",
          lightgreen: "#4DA1A9",
          green: "#79D7BE",
          darkgreen: "#459198",
        },
        // Add specific dark mode colors
        // ...(themeMode === "dark" && {
        //   background: {
        //     default: "#1f2937", // background.darker
        //     paper: "#374151", // background.dark
        //   },
        //   text: {
        //     primary: "#F6F4F0", // offWhite.DEFAULT
        //     secondary: "#dddcd8", // offWhite.dark
        //   },
        // }),
      },
      typography: {
        fontFamily: '"Urbanist", serif',
      },
    }), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <ToastContainer theme={themeMode} />
    </ThemeProvider>
  );
};

function App() {
  return (
    <>
      <CookieConsentComponent />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemedApp />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;