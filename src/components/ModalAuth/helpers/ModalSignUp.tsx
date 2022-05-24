import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";

import { Button, TextField, Typography } from "@material-ui/core";
import { registrationAuth } from "../../../store";
import { history } from "../../..";

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
  goToLogin: () => void;
}

export const ModalSignUp = ({ goToLogin }: Props) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        Name: "",
        Address: "",
        HomePhone: "",
        MobilePhone: "",
        Login: "",
        Password: "",
      }}
      onSubmit={(values) => {
        registrationAuth({
          Name: values.Name,
          Address: values.Address,
          HomePhone: values.HomePhone,
          MobilePhone: values.MobilePhone,
          Login: values.Login,
          Password: values.Password,
        }).then(() => {
          goToLogin();
        });
      }}
    >
      {(props) => (
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <Typography variant="h4">Регистрация</Typography>
          <TextField
            className={classes.inputField}
            label="Name*"
            value={props.values.Name}
            onChange={props.handleChange("Name")}
          />

          <TextField
            label="Address*"
            className={classes.inputField}
            value={props.values.Address}
            onChange={props.handleChange("Address")}
          />

          <TextField
            label="HomePhone*"
            className={classes.inputField}
            value={props.values.HomePhone}
            onChange={props.handleChange("HomePhone")}
          />

          <TextField
            label="MobilePhone*"
            className={classes.inputField}
            value={props.values.MobilePhone}
            onChange={props.handleChange("MobilePhone")}
          />

          <TextField
            label="Login*"
            className={classes.inputField}
            value={props.values.Login}
            onChange={props.handleChange("Login")}
          />

          <TextField
            label="Password*"
            className={classes.inputField}
            value={props.values.Password}
            onChange={props.handleChange("Password")}
          />

          <Button type="submit" className={classes.buttonSubmit}>
            Зарегистрировать
          </Button>
          <Typography
            onClick={() => {
              goToLogin();
            }}
            className={classes.link}
          >
            Уже создали аккаунт? Вход
          </Typography>
        </form>
      )}
    </Formik>
  );
};
