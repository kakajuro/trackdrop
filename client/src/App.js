import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.scss";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuth();
  });

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect from="/" to="/feed"/>
        </Switch>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/feed" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/feed"
            render={(props) =>
              isAuthenticated ? (
                <Feed {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}
