import { Car } from "@/types/cars";
import css from "./CarCard.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";
import { useStore } from "@/store/useStore";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite } = useStore();

  const isFavorite = favorites.some((fav) => fav.id === car.id);
  const iconId = isFavorite ? "Love-blue" : "Love";

  return (
    <li className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.img}
          loading="eager"
        />
        <button
          className={css.heartBtn}
          type="button"
          onClick={() => toggleFavorite(car)}
        >
          <Icon id={iconId} className={css.heartIcon} />
        </button>
      </div>

      <div className={css.info}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>{"$" + car.rentalPrice}</span>
        </div>

        <div className={css.tags}>
          <span>{car.address.split(",")[1] + " " + "|" + " "}</span>
          <span>{car.rentalCompany + " " + "|" + " "}</span> <br />
          <span>{car.type + " " + "|" + " "}</span>
          <span>{car.mileage + " " + "km"}</span>
        </div>

        <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
          Read more
        </Link>
      </div>
    </li>
  );
};
