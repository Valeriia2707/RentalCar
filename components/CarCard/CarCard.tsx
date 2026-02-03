import { Car } from "@/types/cars";
import css from "./CarCard.module.css";
import Image from "next/image";
import { Icon } from "../Icon/Icon";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <li className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.img}
        />
        <button className={css.heartBtn} type="button">
          <Icon id={"Love"} className={""}></Icon>
        </button>
      </div>

      <div className={css.info}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>{car.rentalPrice}</span>
        </div>

        <div className={css.tags}>
          <span>{car.address.split(",")[1]}</span>
          <span>{car.rentalCompany + " "}</span>
          <span>{car.type}</span>
        </div>

        <button className={css.learnMoreBtn}>Learn more</button>
      </div>
    </li>
  );
};
