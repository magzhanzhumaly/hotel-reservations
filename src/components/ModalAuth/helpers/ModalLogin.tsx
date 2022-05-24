import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";

import { Button, TextField, Typography } from "@material-ui/core";
import {
  changeIsAuth,
  changeModalShown,
  isAuth,
  loginAuth,
} from "../../../store";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  inputField: {
    width: "80%",
    marginTop: 20,
  },
  buttonSubmit: {
    width: "80%",
    height: 50,
    backgroundColor: "#303030",
    marginTop: 50,
    color: "#fff",
    textTransform: "uppercase",
    fontFamily: " Arial, Helvetica, sans-serif",
    "&:hover": {
      backgroundColor: "#303030",
    },
  },
  link: {
    marginTop: 20,
    textDecoration: "underline",
    cursor: "pointer",
  },
});

interface Props {
  goToSignUp: () => void;
}

export const ModalLogin = ({ goToSignUp }: Props) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        changeIsAuth(true);
        changeModalShown();
        loginAuth({ userName: values.username, password: values.password });
      }}
    >
      {(props) => (
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <Typography variant="h4">Вход</Typography>
          <TextField
            className={classes.inputField}
            label="Username*"
            value={props.values.username}
            onChange={props.handleChange("username")}
          />

          <TextField
            label="Password*"
            className={classes.inputField}
            value={props.values.password}
            onChange={props.handleChange("password")}
          />

          <Button type="submit" className={classes.buttonSubmit}>
            Войти
          </Button>
          <Typography
            onClick={() => {
              goToSignUp();
            }}
            className={classes.link}
          >
            Еще не создали аккаунт? Регистрация
          </Typography>
        </form>
      )}
    </Formik>
  );
};
