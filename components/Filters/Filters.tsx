"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Select, {
  SingleValue,
  components,
  DropdownIndicatorProps,
} from "react-select";
import { Icon } from "../Icon/Icon";
import css from "./Filters.module.css";

interface Option {
  value: string;
  label: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const isOpen = props.selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <Icon id={isOpen ? "Up" : "Down"} className={css.icon} />
    </components.DropdownIndicator>
  );
};

export default function Filters() {
  const { brands, fetchBrands, searchCars } = useStore();
  const [selectedBrand, setSelectedBrand] = useState<SingleValue<Option>>(null);
  const [selectedPrice, setSelectedPrice] = useState<SingleValue<Option>>(null);
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const brandsOpt: Option[] = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOpt: Option[] = [30, 40, 50, 60, 70, 80].map((p) => ({
    value: String(p),
    label: String(p),
  }));

  const handleSearch = () => {
    searchCars({
      brand: selectedBrand?.value,
      rentalPrice: selectedPrice?.value,
      minMileage: minMileage,
      maxMileage: maxMileage,
    });
  };

  return (
    <div className={css.container}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <div className={css.selectBrandWrapper}>
          <Select
            instanceId="brand-select"
            options={brandsOpt}
            placeholder="Choose a brand"
            onChange={setSelectedBrand}
            value={selectedBrand}
            unstyled
            components={{ DropdownIndicator }}
            classNames={{
              control: () => css.control,
              placeholder: () => css.placeholder,
              singleValue: () => css.singleValue,
              dropdownIndicator: () => css.indicator,
              menu: () => css.menu,
              menuList: () => css.menuList,
              option: (state) =>
                state.isSelected
                  ? css.optionSelected
                  : state.isFocused
                    ? css.optionFocused
                    : css.option,
              indicatorSeparator: () => css.separator,
              input: () => css.inputSelect,
            }}
          />
        </div>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.selectPriceWrapper}>
          <Select
            instanceId="brand-select"
            options={priceOpt}
            placeholder="Choose a price"
            onChange={setSelectedPrice}
            value={selectedPrice}
            formatOptionLabel={(option) => `${option.label}`}
            unstyled
            components={{ DropdownIndicator }}
            classNames={{
              control: () => css.control,
              placeholder: () => css.placeholder,
              singleValue: () => css.singleValue,
              dropdownIndicator: () => css.indicator,
              menu: () => css.menu,
              menuList: () => css.menuList,
              option: (state) =>
                state.isSelected
                  ? css.optionSelected
                  : state.isFocused
                    ? css.optionFocused
                    : css.option,
              indicatorSeparator: () => css.separator,
            }}
          />
        </div>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageWrapper}>
          <div className={css.inputWrapper}>
            <span className={css.prefix}>From</span>
            <input
              type="number"
              className={`${css.input} ${css.inputLeft}`}
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
            />
          </div>
          <div className={css.inputWrapper}>
            <span className={css.prefix}>To</span>
            <input
              type="number"
              className={`${css.input} ${css.inputRight}`}
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
