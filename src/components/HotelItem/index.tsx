import React from "react";
import { history } from "../..";

import "./hotelitems.css";

interface Props {
  data: any;
}

const HotelItem = ({ data }: Props) => {
  const goToDetailInfo = (): void => {
    history.push("/hotel/" + data.Id);
  };

  const getImagesForHotel = (id: number) => {
    switch (id % 3) {
      case 1: {
        return require("../../assets/images/hotel1.jpg");
      }
      case 2: {
        return require("../../assets/images/demo3.jpg");
      }
      default:
        return require("../../assets/images/demo1.jpg");
    }
  };

  return (
    <div className="content_items" onClick={goToDetailInfo}>
      <img src={getImagesForHotel(data.Id)} alt="" />
      <h3 className="content_items_h3">{data.Name}</h3>
      <p>{data.Address}</p>
      <ul className="features_info">
        {data.Services.map((item: any) => (
          <li key={item.Id}>
            {item.Name} - {item.Price} KZT
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelItem;
