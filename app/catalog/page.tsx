import CarList from "@/components/CarList/CarList";
import Filters from "@/components/Filters/Filters"; // <--- Імпорт
import css from "./page.module.css";

export default function CatalogPage() {
  return (
    <section className={css.section}>
      {" "}
      <div className={css.container}>
        <Filters />
        <CarList />
      </div>
    </section>
  );
}
