"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { CarCard } from "@/components/CarCard/CarCard";
import { Loader } from "../Loader/Loader";
import css from "./CarList.module.css";

export default function CarList() {
  const { cars, isLoading, searchCars, loadMore } = useStore();

  useEffect(() => {
    searchCars({});
  }, [searchCars]);

  const showLoadMore = cars.length > 0 && cars.length % 12 === 0 && !isLoading;
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
      {cars.length === 0 && !isLoading && (
        <div className={css.none}>There is no cars for your demands</div>
      )}
      {isLoading && (
        <div className={css.imgLoader}>
          <Loader />
        </div>
      )}
      {showLoadMore && (
        <button type="button" onClick={loadMore} className={css.moreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
