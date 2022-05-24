import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Modal, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStore } from "effector-react";
import { isModalAuthShow, changeModalShown } from "../../store";
import { ModalLogin } from "./helpers/ModalLogin";
import { ModalSignUp } from "./helpers/ModalSignUp";

const useStyles = makeStyles({
  paperModal: {
    width: 500,
    height: "auto",
    position: "relative",
    outline: "none",
    paddingBottom: 50,
  },
  buttonSubmit: {
    backgroundColor: "#303030",
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: " Arial, Helvetica, sans-serif",
    width: 100,
    height: 45,
    marginTop: 20,
    marginLeft: 10,

    "&:hover": {
      backgroundColor: "#303030",
    },
  },
  closeIcon: {
    position: "absolute",
    right: 10,
    top: 5,
    cursor: "pointer",
  },
  mytestStyle: {
    color: "#e4e4e4!important",
    backgroundColor: "gray",
  },
  root: {
    maxWidth: 350,
    marginTop: 20,
    paddingBottom: 20,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export const ModalAuth = () => {
  const [status, setStatus] = useState("login");
  const classes = useStyles();

  const show = useStore(isModalAuthShow);

  const changeModal = () => {
    changeModalShown();
  };

  const goToSignUp = () => {
    setStatus("signUp");
  };

  const goToLogin = () => {
    setStatus("login");
  };

  return (
    <Modal open={show} className={classes.modal}>
      <Paper className={classes.paperModal} elevation={3}>
        <CloseIcon onClick={changeModal} className={classes.closeIcon} />
        {status === "login" ? (
          <ModalLogin goToSignUp={goToSignUp} />
        ) : (
          <ModalSignUp goToLogin={goToLogin} />
        )}
      </Paper>
    </Modal>
  );
};
