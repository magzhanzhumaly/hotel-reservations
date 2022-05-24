import React, { useState } from "react";

import "./clerkresitem.css";
import { Button, TextField, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "../../assets/images/cancel.png";

import {
  allGuestsforClerk,
  createResClerk,
  removeClerkItemRes,
  addGuestToreserve,
  removeGuestToreserve,
} from "../../store";
import { useStore } from "effector-react";

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
  resizer: {
    fontFamily: " Arial, Helvetica, sans-serif",
  },
  paddinTimer: {
    padding: 10,
  },
  marginTopSpace: {
    marginTop: 10,
  },
  buttonSaver: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    display: "block",
    marginTop: 20,
  },
  RemoverButton: {
    display: "block",
    marginLeft: "auto",
  },
  flexableItem: {
    display: "flex",
  },
});

interface Props {
  data: any;
}

const ClerkResItem = ({ data }: Props) => {
  const allGuest = useStore(allGuestsforClerk);

  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState<string>(data.Start.slice(0, 10));
  const [dateTo, setDateTo] = useState<string>(data.End.slice(0, 10));
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [offerId, setOfferId] = useState<number>(1);
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOfferId(parseInt(e.target.value));
  };
  const goSaveUpdate = () => {
    console.log("from", dateFrom);
    console.log("to", dateTo);
    console.log("id", data.Id);

    createResClerk({
      reservationId: data.Id,
      start: dateFrom,
      finish: dateTo,
    }).then(() => {
      setIsEdit(false);
    });
  };

  const removeItemClerk = () => {
    removeClerkItemRes({ reservationId: data.Id }).then(() => {
      console.log("1232121321");
    });
  };

  const addNewGuest = () => {
    addGuestToreserve({ guestId: offerId, reservationId: data.Id });
  };

  const removeNewGuest = (id: number) => {
    removeGuestToreserve({ guestId: id, reservationId: data.Id });
  };

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.flexableItem}>
          <Button onClick={() => setIsEdit(!isEdit)}>
            {" "}
            {isEdit ? "Cancel" : "Edit"}{" "}
          </Button>
          <Button onClick={removeItemClerk} className={classes.RemoverButton}>
            Delete
          </Button>
        </div>
        <img src={require("../../assets/images/demo2.jpg")} alt="" />
        <h4 className="headingTop">Reserve #{data.Id}</h4>
        {isEdit ? (
          <div className={classes.paddinTimer}>
            <TextField
              id="date"
              label="From"
              InputProps={{
                classes: {
                  input: classes.resizer,
                },
              }}
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              className={classes.marginTopSpace}
              id="date"
              label="To"
              InputProps={{
                classes: {
                  input: classes.resizer,
                },
              }}
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        ) : (
          <div className="flexable_info">
            <p> From {data.Start.slice(0, 10)}</p>
            <p> To {data.End.slice(0, 10)}</p>
          </div>
        )}

        <div className="flexable_info">
          <p>{data.Room.Number}</p>
          <p>Floor {data.Room.Floor}</p>
        </div>
        {data.Occupants.length ? (
          <ul className="features_info">
            <p className={classes.resizer}>Guests:</p>
            {data.Occupants.map((item: any) => (
              <li key={item.Id}>
                {item.Name}{" "}
                <img
                  className="image_control_admin"
                  src={CloseIcon}
                  onClick={() => removeNewGuest(item.Id)}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flexable_info">
          <p>Add new guest</p>
          <select
            value={offerId}
            onChange={(e) => {
              handleChangeSelect(e);
            }}
          >
            {allGuest.map((item: any) => (
              <option key={item.Id} value={item.Id}>
                {item.Name}
              </option>
            ))}
          </select>
        </div>
        <Button className={classes.buttonSaver} onClick={addNewGuest}>
          Αdd
        </Button>
        <ul className="features_info">
          {data.Room.Type.Features.map((item: any) => (
            <li key={item.Id}>{item.Name}</li>
          ))}
        </ul>

        {isEdit && (
          <Button onClick={goSaveUpdate} className={classes.buttonSaver}>
            Save
          </Button>
        )}
      </Card>
    </>
  );
};

export default ClerkResItem;
