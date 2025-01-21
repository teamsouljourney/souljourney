import "./App.css";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import 'flowbite';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#454F5B",
      },
      secondary: {
        main: "#454F4B",
        second: "#161C24",
      },
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
