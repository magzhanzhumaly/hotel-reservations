import React from "react";
import ClerkResItem from "../ClerkResItem";

import "./clerkres.css";

interface Props {
  clerkResListdata: any;
}

const ClerkResList = ({ clerkResListdata }: Props) => {
  return (
    <div className="wrapper_hotel_list">
      {clerkResListdata.map((item: any) => (
        <ClerkResItem data={item} key={item.Id} />
      ))}
    </div>
  );
};

export default ClerkResList;
