import React, { useEffect, useState } from "react";

import "./reservations.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Typography } from "@material-ui/core";
import { removeReserItem } from "../../store";

const useStyles = makeStyles({
  paperModal: {
    width: 500,
    height: 500,
    position: "relative",
    outline: "none",
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

export const Reservations = () => {
  const classes = useStyles();
  const [reservations, setReservation] = useState([]);

  useEffect(() => {
    async function start() {
      const res = await fetch("api/reservations/list");
      const result = await res.json();

      setReservation(result);
    }
    start();
  }, []);

  const deleteItemFrom = (id: number) => {
    removeReserItem({ id }).then(async () => {
      const res = await fetch("api/reservations/list");
      const result = await res.json();

      setReservation(result);
    });
  };

  return (
    <div className="container_fluid">
      <div className="rooms_list_wrapper_reservation">
        {reservations.length ? (
          reservations?.map((item: any) => (
            <Card key={item.Id} className={classes.root}>
              <Button
                onClick={() => {
                  deleteItemFrom(item.Id);
                }}
              >
                Cancel
              </Button>
              <img src={require("../../assets/images/demo2.jpg")} alt="" />
              <h4 className="headingTop">Room number: {item.Room.Number}</h4>
              <div className="flexable_info">
                <p>Start: {item.Start}</p>
              </div>
              <div className="flexable_info">
                <p>End: {item.End}</p>
              </div>
            </Card>
          ))
        ) : (
          <Typography variant="h1">
            You don't have any reservations yet
          </Typography>
        )}
      </div>
    </div>
  );
};
