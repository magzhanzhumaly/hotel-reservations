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
  buttonSubmit: {
    backgroundColor: "#303030",
    color: "#fff",
    textTransform: "uppercase",
    fontFamily: " Arial, Helvetica, sans-serif",
    display: "block",
    marginLeft: "auto",
    height: 45,
    marginTop: 20,
    marginRight: 20,

    "&:hover": {
      backgroundColor: "#303030",
    },
  },
});

const Admin: React.FC = () => {
  const classes = useStyles();
  const auth = useStore(isAuth);
  const clerkAllRes = useStore(allReservationClerk);

  useEffect(() => {
    getAllResirvationsForClerk().then(() => {
      console.log("COMPLETE");
    });

    getAllGuests().then(() => {
      console.log("GUEST");
    });
  }, []);

  const gotoCreatorfun = () => {
    history.push("/admin/create");
  };

  return (
    <div className="container_fluid">
      <Typography variant="h1"> Clerk area</Typography>
      <Button onClick={gotoCreatorfun} className={classes.buttonSubmit}>
        Go to Guest and Reservation creation
      </Button>
      <ClerkResList clerkResListdata={clerkAllRes} />
    </div>
  );
};

export default Admin;
