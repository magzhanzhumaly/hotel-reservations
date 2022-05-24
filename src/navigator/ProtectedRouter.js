import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { changeModalShown, isAuth } from "../store";

export const ProtectedRouter = ({ component: Component, ...rest }) => {
  const auth = useStore(isAuth);

  useEffect(() => {
    console.log(auth);
    if (!auth) {
      changeModalShown();
    }
  }, []);

  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};
