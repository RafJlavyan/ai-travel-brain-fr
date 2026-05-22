import { getHotels } from "src/hotel.api";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { HotelCard } from "src/entities//HotelCard/ui/HotelDetails";

const Hero = () => {
  const [hotels, setHotels] = useState([])
  const data = hotels[0]

  async function loadHotels() {
    try {
      const hotels = await getHotels();
      console.log(hotels);
      setHotels(hotels);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadHotels();
  }, []);

  return <div className={styles.wrapper}>
    <HotelCard data={data} />
  </div>;
};

export default Hero;
