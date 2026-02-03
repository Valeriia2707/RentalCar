import CarList from "@/components/CarList/CarList";
import css from "./page.module.css";

export default function CatalogPage() {
  return (
    <div className={css.container}>
      <CarList />
    </div>
  );
}
