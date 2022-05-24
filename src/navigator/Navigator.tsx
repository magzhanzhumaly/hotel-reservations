import { Modal } from "@material-ui/core";
import React, { useEffect } from "react";

import { Switch, Route } from "react-router-dom";
import Header from "../components/BaseHeader";
import { ModalAuth } from "../components/ModalAuth";
import About from "../pages/About";
import Admin from "../pages/Admin";
import CreaterAdmin from "../pages/CreaterAdmin";
// Pages
import Home from "../pages/Home";
import HotelDetails from "../pages/HotelDetails";
import NotFoundPage from "../pages/NotFoundPage";
import { Reservations } from "../pages/Reservations";
import { getIsAuth } from "../store";
import { ProtectedRouter } from "./ProtectedRouter";

export const Navigator: React.FC = () => {
  useEffect(() => {
    getIsAuth().then(() => {
      console.log("kek");
    });
  }, []);
  return (
    <>
      <Header />
      <ModalAuth />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/hotel/:id" component={HotelDetails} />
        <Route path="/about" component={About} />
        <ProtectedRouter path="/reservations" component={Reservations} />
        <ProtectedRouter path="/admin" exact component={Admin} />
        <ProtectedRouter path="/admin/create" component={CreaterAdmin} />
        <Route render={() => <NotFoundPage />} />
      </Switch>
    </>
  );
};
