"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { Loader } from "@/components/Loader/Loader";
import { Icon } from "@/components/Icon/Icon";
import css from "./details.module.css";
import BookingForm from "@/components/BookingForm/BookingForm";

export default function CarDetailsPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { cars, searchCars, isLoading } = useStore();

  const car = cars.find((c) => String(c.id) === id);

  useEffect(() => {
    if (cars.length === 0) {
      searchCars({});
    }
  }, [cars.length, searchCars]);

  if (!car) {
    return (
      <div className={css.loaderPage}>
        {cars.length > 0 && !isLoading ? <h2>Car not found</h2> : <Loader />}
      </div>
    );
  }

  const addressParts = car.address ? car.address.split(", ") : [];
  const city = addressParts[1] || "";
  const country = addressParts[2] || "";
  const shortId = String(car.id).slice(-4);

  const conditions = car.rentalConditions;

  return (
    <div className={css.container}>
      <div className={css.leftColumn}>
        <div className={css.imgWrapper}>
          <Image
            src={car.img}
            alt={car.model}
            width={600}
            height={400}
            className={css.img}
            priority
          />
        </div>
        <BookingForm />
      </div>

      <div className={css.rightColumn}>
        <div className={css.headerRow}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}{" "}
            <span className={css.carId}>Id:{shortId}</span>
          </h1>
        </div>

        <div className={css.locationRow}>
          <Icon id="Location" className={css.locationIcon} />
          <span className={css.cityText}>
            {city}, {country}
          </span>
          <span className={css.mileage}>
            Mileage: {car.mileage.toLocaleString("en-US")} km
          </span>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>

        <p className={css.description}>{car.description}</p>

        <div className={css.section}>
          <h3 className={css.sectionTitle}>Rental Conditions:</h3>
          <ul className={css.conditionsList}>
            {conditions.map((condition, index) => (
              <li key={index} className={css.conditionItem}>
                <Icon id="VectorO" className={css.checkIcon} />
                <span className={css.condition}>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.section}>
          <h3 className={css.sectionTitle}>Car Specifications:</h3>
          <ul className={css.specsList}>
            <li className={css.specItem}>
              <Icon id="Calendar" className={css.specIcon} />
              <span className={css.condition}>Year: {car.year}</span>
            </li>
            <li className={css.specItem}>
              <Icon id="Car" className={css.specIcon} />
              <span className={css.condition}>Type: {car.type}</span>
            </li>
            <li className={css.specItem}>
              <Icon id="Oil" className={css.specIcon} />
              <span className={css.condition}>
                Fuel Consumption: {car.fuelConsumption}
              </span>
            </li>
            <li className={css.specItem}>
              <Icon id="Setting" className={css.specIcon} />
              <span className={css.condition}>
                Engine Size: {car.engineSize}
              </span>
            </li>
          </ul>
        </div>

        {/* Accessories */}
        <div className={css.section}>
          <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
          <ul className={css.accessoriesList}>
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <li key={index} className={css.accessorieItem}>
                <Icon id="VectorO" className={css.checkIcon} />
                <span className={css.condition}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
