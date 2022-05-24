import React from "react";
import RoomsItem from "../RoomsItem";

import "./rooms.css";

export interface DateTIme {
  start: string;
  finish: string;
}

interface Props {
  roomList: any;
  isBooking: boolean;
  timeRent: DateTIme;
}

const RoomsList = ({ roomList, isBooking, timeRent }: Props) => {
  return (
    <div className="rooms_list_wrapper">
      {roomList?.Rooms &&
        roomList.Rooms.map((item: any) => (
          <RoomsItem
            key={item.Id}
            data={item}
            booking={isBooking}
            timeRent={timeRent}
          />
        ))}
    </div>
  );
};
export default RoomsList;
