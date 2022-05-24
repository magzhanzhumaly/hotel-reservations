import React, { useState } from "react";

import "./roomsitem.css";
import { makeStyles } from "@material-ui/core/styles";
import { DateTIme } from "../RoomsList";

import { changeModalShown, createOrder, isAuth } from "../../store";
import { history } from "../../";

import { Button, Card } from "@material-ui/core";
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
});

interface Props {
  data: any;
  booking: boolean;
  timeRent: DateTIme;
}
const RoomsItem = ({ data, booking, timeRent }: Props) => {
  const [offerId, setOfferId] = useState<number>(1);
  const classes = useStyles();

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOfferId(parseInt(e.target.value));
  };

  const auth = useStore(isAuth);

  const sendData = async () => {
    if (auth) {
      await createOrder({
        roomId: data.Id,
        roomOfferId: offerId,
        start: timeRent.start,
        finish: timeRent.finish,
      }).then(() => {
        console.log("CREATED ORDER");
        history.push("/");
      });
    } else {
      changeModalShown();
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <img src={require("../../assets/images/demo2.jpg")} alt="" />
        <h4 className="headingTop">{data.Type.Name}</h4>
        <div className="flexable_info">
          <p>GUESTS {data.Type.Capacity}</p>
          <p>
            SIZE {data.Type.Size} m<sup>2</sup>
          </p>
        </div>
        <div className="flexable_info">
          <p>{data.Number}</p>
          <p>Floor {data.Floor}</p>
        </div>
        <ul className="features_info">
          {data.Type.Features.map((item: any) => (
            <li key={item.Id}>{item.Name}</li>
          ))}
        </ul>
        {booking && (
          <>
            <div className="flexable_info">
              <p>Our offers</p>
              <select
                value={offerId}
                onChange={(e) => {
                  handleChangeSelect(e);
                }}
              >
                {data.Type.RoomOffers.map((item: any) => (
                  <option key={item.Id} value={item.Id}>
                    {item.PricePerDay} KZT
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={sendData} className={classes.buttonSubmit}>
              Βοοκ
            </Button>
          </>
        )}
      </Card>
    </>
  );
};
export default RoomsItem;
