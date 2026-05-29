import { HotelCard } from "../HotelCard";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const HotelsTable = ({
  hotels,
}: {
  hotels: any[];
  loading: boolean;
}) => {
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
