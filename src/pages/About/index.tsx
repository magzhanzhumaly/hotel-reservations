import { Button, Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import ClerkResList from "../../components/ClerkResList";
import { makeStyles } from "@material-ui/core/styles";
import {
  changeModalShown,
  getAllResirvationsForClerk,
  isAuth,
  allReservationClerk,
  getAllGuests,
} from "../../store";
import { history } from "../..";

const useStyles = makeStyles({
  textAbout: {
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
});

const About: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="container_fluid">
      <Typography variant="h1">About</Typography>
      <Typography className={classes.textAbout} variant="h6">
        Almaty is the business and cultural center of Kazakhstan and a city that
        has long appealed to those of a nomadic nature. With sumptuous
        accommodation, superior service and a prime location in the city center,
        Hotel Master offers a luxury hotel experience that stirs every sense.
        Alight from the sky elevator into the 30th floor lobby and receive a
        splendid welcome, accentuated by the awe-inspiring views that surround
        you. Traditional hospitality and unique spa treatments in the finest
        surroundings and luxurious atmospheres. Hotel Master offers an
        outstanding resort experience with professional entertainment and sports
        activities. At Hotel Master, the all-inclusive is all-exclusive.
      </Typography>
      <Typography className={classes.textAbout} variant="h6">
        Traditional hospitality and unique spa treatments in the finest
        surroundings and luxurious atmospheres. Hotel Master offers an
        outstanding resort experience with professional entertainment and sports
        activities. At Hotel Master, the all-inclusive is all-exclusive.
      </Typography>
    </div>
  );
};

export default About;
