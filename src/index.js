import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#6D4C41",
    },
    secondary: {
      main: "#827717",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      padding: "0.5rem",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 700,
      padding: "0.5rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      padding: "0.5rem",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
