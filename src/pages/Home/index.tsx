import React, { useEffect } from "react";

import { useStore } from "effector-react";
import { hotels, getAllHotels } from "../../store";

import "./homepage.css";
import HotelsList from "../../components/HotelsList";

const Home: React.FC = () => {
  useEffect(() => {
    async function start() {
      await getAllHotels();
      console.log("GETALL HOTELS");
    }
    start();
  }, []);

  const allHotels = useStore(hotels);

  return (
    <div className="container_fluid">
      <h1>HOTELS</h1>
      <HotelsList hotelList={allHotels} />
    </div>
  );
};

export default Home;
