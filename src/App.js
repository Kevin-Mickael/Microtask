import React, { useState, useMemo } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { indigo, teal, grey, blueGrey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: indigo["A100"],
          },
          secondary: {
            main: teal[200],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: grey[800],
          },
          secondary: {
            main: blueGrey[200],
          },
        }),
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

const App = (props) => {
  const [mode, setMode] = useState(
    localStorage.getItem("isDark") ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === "light") {
            localStorage.setItem("isDark", true);
            return "dark";
          } else {
            localStorage.setItem("isDark", false);
            return "light";
          }
        });
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter {...props}>
        <Box sx={{ minHeight: "calc(100vh - 37.91px)" }}>
          <Navbar colorMode={colorMode} />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route
              path="/dashboard"
              render={() => {
                return localStorage.getItem("token") ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            ></Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Box>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
