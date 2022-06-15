import React, { useState, useCallback } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";

const App = (props) => {
  const [user, setUser] = useState({});

  const logoutHandler = () => {
    setUser({});
  };

  const userHandler = useCallback((username, userid) => {
    setUser({ username, userid });
  }, []);

  return (
    <BrowserRouter {...props}>
      <Navbar user={user} onLogout={logoutHandler} />
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
              <Dashboard userHandler={userHandler} user={user} />
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
    </BrowserRouter>
  );
};

export default App;
