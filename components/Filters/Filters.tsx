"use client";

import css from "./Filters.module.css";

const brands = [
  "Buick",
  "Volvo",
  "HUMMER",
  "Subaru",
  "Mitsubishi",
  "Nissan",
  "Lincoln",
  "GMC",
  "Hyundai",
  "MINI",
  "Bentley",
  "Mercedes-Benz",
  "Aston Martin",
  "Pontiac",
  "Lamborghini",
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Kia",
  "Land",
];

const prices = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function Filters() {
  return (
    <div className={css.container}>
      {/* 1. Бренд */}
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <select className={css.selectBig}>
          <option value="">Enter the text</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Ціна */}
      <div className={css.filterGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <select className={css.selectSmall}>
          <option value="">To $</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}$
            </option>
          ))}
        </select>
      </div>

      {/* 3. Пробіг (Mileage) */}
      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageWrapper}>
          <div className={css.inputWrapper}>
            <span className={css.prefix}>From</span>
            <input type="number" className={css.inputLeft} />
          </div>
          <div className={css.inputWrapper}>
            <span className={css.prefix}>To</span>
            <input type="number" className={css.inputRight} />
          </div>
        </div>
      </div>

      {/* 4. Кнопка пошуку */}
      <button className={css.searchBtn}>Search</button>
    </div>
  );
}
