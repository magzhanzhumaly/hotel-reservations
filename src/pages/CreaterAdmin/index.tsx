import { Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import ClerkResList from "../../components/ClerkResList";
import { Button, TextField, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./creater.css";

import {
  getAllGuests,
  allGuestsforClerk,
  getAllHotels,
  hotels,
  getCurrentHotel,
  hotel,
  createOrderByClerk,
  createGuest,
} from "../../store";
import { history } from "../..";

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
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,

    "&:hover": {
      backgroundColor: "#303030",
    },
  },
  buttonSubmitTe: {
    width: 200,
    height: 45,
    maxWidth: "100%",
    fontFamily: " Arial, Helvetica, sans-serif",
    backgroundColor: "#303030",
    marginLeft: 20,
    color: "#fff",
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
  dataPicker: {
    marginTop: 20,
    width: 300,
  },
  typographHeading: {
    fontSize: 25,
    fontFamily: " Arial, Helvetica, sans-serif",
  },
  inpuTimer: {
    width: 300,
    maxWidth: "100%",
  },
  inpuTimerField: {
    width: "100%",
  },
});

const CreaterAdmin: React.FC = () => {
  const classes = useStyles();

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [currentRoomSelected, setCurrentRoomSelected] = useState<any>({});
  useEffect(() => {
    getAllHotels();
    getAllGuests().then(() => {
      console.log("GUEST");
    });
  }, []);

  const allGuest = useStore(allGuestsforClerk);
  const hotelsAll = useStore(hotels);
  const currentHotel = useStore(hotel);

  const [offerId, setOfferId] = useState<number>(0);
  const [hotelId, setHotelId] = useState<number>(0);
  const [roomOfferslId, setRoomOfferslId] = useState<number>(0);
  const [roomSelectedId, setRoomSelectedId] = useState<number>(0);
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOfferId(parseInt(e.target.value));
  };

  // create Guest
  const [name, setName] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [homePhone, setHomePhone] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const handleChangeSelectOffersRoom = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoomOfferslId(parseInt(e.target.value));
  };

  const handleChangeSelectRoom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomSelectedId(parseInt(e.target.value));
    setCurrentRoomSelected(
      currentHotel.Rooms.filter((item: any) => item.Id == e.target.value)[0]
    );
  };

  const handleChangeSelectHotel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHotelId(parseInt(e.target.value));

    getCurrentHotel({ hotelId: e.target.value.toString() });
  };

  const submitReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      hotelId > 0 &&
      offerId > 0 &&
      roomSelectedId > 0 &&
      roomOfferslId > 0 &&
      dateFrom.trim() &&
      dateTo.trim()
    ) {
      createOrderByClerk({
        guestId: offerId,
        roomId: roomSelectedId,
        roomOfferId: roomOfferslId,
        start: dateFrom,
        finish: dateTo,
      }).then(() => {
        history.push("/admin");
      });
    } else {
      alert("Вы не заполнили все поля");
    }
  };

  const submitCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      name.trim() &&
      adress.trim() &&
      homePhone.trim() &&
      mobilePhone.trim() &&
      login.trim()
    ) {
      createGuest({
        Name: name,
        Address: adress,
        HomePhone: homePhone,
        MobilePhone: mobilePhone,
        Login: login,
      }).then(() => {
        history.push("/admin");
      });
    } else {
      alert("Вы не заполнили все поля");
    }
  };

  const gotoCreatorfun = () => {
    history.push("/admin");
  };

  return (
    <div className="container_fluid">
      <Typography variant="h1">Guest and Reservation creation</Typography>
      <Button onClick={gotoCreatorfun} className={classes.buttonSubmitTe}>
        Go to clerk area
      </Button>
      <div className="wrapper_hotel_list_createAdmin">
        <form onSubmit={submitReg}>
          <h4 className={classes.typographHeading}>Create booking</h4>
          <select
            value={offerId}
            onChange={(e) => {
              handleChangeSelect(e);
            }}
          >
            <option value={0}>Select guest</option>
            {allGuest.map((item: any) => (
              <option key={item.Id} value={item.Id}>
                {item.Name}
              </option>
            ))}
          </select>

          <select
            value={hotelId}
            onChange={(e) => {
              handleChangeSelectHotel(e);
            }}
          >
            <option value={0}>Select hotel</option>
            {hotelsAll.map((item: any) => (
              <option key={item.Id} value={item.Id}>
                {item.Name}
              </option>
            ))}
          </select>

          {Object.values(currentHotel).length ? (
            <select
              value={roomSelectedId}
              onChange={(e) => {
                handleChangeSelectRoom(e);
              }}
            >
              <option value={0}>Select room</option>
              {currentHotel.Rooms.map((item: any) => (
                <option key={item.Id} value={item.Id}>
                  {item.Number}
                </option>
              ))}
            </select>
          ) : null}
          {Object.values(currentRoomSelected).length ? (
            <select
              value={roomOfferslId}
              onChange={(e) => {
                handleChangeSelectOffersRoom(e);
              }}
            >
              <option value={0}>Select offer</option>
              {currentRoomSelected.Type.RoomOffers.map((item: any) => (
                <option key={item.Id} value={item.Id}>
                  {item.PricePerDay} KZT
                </option>
              ))}
            </select>
          ) : null}

          <div>
            <TextField
              className={classes.dataPicker}
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
              className={classes.dataPicker}
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

          <Button type="submit" className={classes.buttonSubmit}>
            Create
          </Button>
        </form>

        <form className={classes.inpuTimer} onSubmit={submitCreateGuest}>
          <h4 className={classes.typographHeading}>Create guest</h4>
          <TextField
            className={classes.inpuTimerField}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            helperText="Enter your name "
          />
          <TextField
            className={classes.inpuTimerField}
            id="name"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            label="Adress"
            helperText="Enter your address"
          />
          <TextField
            className={classes.inpuTimerField}
            id="name"
            value={homePhone}
            onChange={(e) => setHomePhone(e.target.value)}
            label="Home phone"
            helperText="Enter your phone"
          />
          <TextField
            className={classes.inpuTimerField}
            id="name"
            value={mobilePhone}
            onChange={(e) => setMobilePhone(e.target.value)}
            label="Mobile phone"
            helperText="Enter your mobile phone"
          />
          <TextField
            className={classes.inpuTimerField}
            id="name"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            label="Login"
            helperText="Create logjn"
          />
          <Button type="submit" className={classes.buttonSubmit}>
            Registrate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreaterAdmin;
