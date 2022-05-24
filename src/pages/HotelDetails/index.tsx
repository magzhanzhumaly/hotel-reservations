import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useStore } from "effector-react";
import { hotel, freeRooms, getCurrentHotel, getFreeRooms } from "../../store";

import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./hoteldetails.css";
import RoomsList from "../../components/RoomsList";

interface ParamTypes {
  id: string;
}

const useStyles = makeStyles({
  datePicker: {
    fontSize: 50,
  },
  buttonSubmit: {
    backgroundColor: "#303030",
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: " Arial, Helvetica, sans-serif",
    width: 100,
    height: 45,

    "&:hover": {
      backgroundColor: "#303030",
    },
  },
  mytestStyle: {
    color: "#e4e4e4!important",
    backgroundColor: "gray",
  },
  resizer: {
    fontFamily: " Arial, Helvetica, sans-serif",
  },
});

const HotelDetails = () => {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const selectedHotel = useStore(hotel);
  const freeHotelRooms = useStore(freeRooms);

  let { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function start() {
      await getCurrentHotel({ hotelId: id });
      console.log("GET CURRENT HOTEL");
    }
    start();
  }, [id]);

  const submitForm = async () => {
    await getFreeRooms({ hotelId: +id, start: dateFrom, finish: dateTo });
    console.log("GET FREE ROOMS");
  };

  return (
    <div className="container_fluid">
      <div className="flex_datepicker">
        <p>From</p>
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
        <p>To</p>
        <TextField
          id="date"
          label="To"
          type="date"
          value={dateTo}
          InputProps={{
            classes: {
              input: classes.resizer,
            },
          }}
          onChange={(e) => setDateTo(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          disabled={dateFrom.trim() && dateTo.trim() ? false : true}
          onClick={submitForm}
          className={classes.buttonSubmit}
          classes={{ disabled: classes.mytestStyle }}
        >
          Search
        </Button>
      </div>

      <RoomsList
        roomList={
          freeHotelRooms.length ? { Rooms: freeHotelRooms } : selectedHotel
        }
        isBooking={freeHotelRooms.length ? true : false}
        timeRent={{ start: dateFrom, finish: dateTo }}
      />
    </div>
  );
};

export default HotelDetails;
