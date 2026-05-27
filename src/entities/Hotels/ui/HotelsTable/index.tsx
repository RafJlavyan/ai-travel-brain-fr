import { useEffect, useState } from "react";
import { HotelCard } from "../HotelCard";
import styles from "./styles.module.scss";
import { getHotels } from "src/entities/Hotels/queries/useGetHotels";
import { Link } from "react-router-dom";

export const HotelsTable = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHotels() {
      try {
        const hotels = await getHotels({ signal: controller.signal });
        setHotels(hotels);
      } catch (e: any) {
        if (e.name === "AbortError") return;
        console.error(e);
      }
    }

    loadHotels();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      {hotels.map((hotel: any) => (
        <Link
          key={hotel.id}
          to={`/hotels/${hotel.id}`}
          className={styles.cardLinkWrapper}
          data-discover="true"
        >
          <HotelCard data={hotel} />
        </Link>
      ))}
    </div>
  );
};
