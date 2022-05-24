import { Button } from "@material-ui/core";
import { useStore } from "effector-react";
import React from "react";

import { NavLink } from "react-router-dom";
import { isAuth, removeUser } from "../../store";

import { history } from "../../";

import { makeStyles } from "@material-ui/core/styles";

import "./header.css";

const useStyles = makeStyles({
  buttonLogout: {
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: " Arial, Helvetica, sans-serif",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
});

const Header: React.FC = () => {
  const auth = useStore(isAuth);

  const classes = useStyles();

  const logoutUser = () => {
    removeUser();
    history.push("/");
  };

  return (
    <header className="container">
      <NavLink to="/">
        <img src={require("../../assets/images/logo.png")} alt="" />
      </NavLink>

      <nav className="container__navigation">
        <ul className="navigation_list">
          <li>
            <NavLink to="/" exact activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/reservations" exact activeClassName="active-link">
              Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeClassName="active-link">
              About
            </NavLink>
          </li>

          {auth && (
            <Button className={classes.buttonLogout} onClick={logoutUser}>
              Logout
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
