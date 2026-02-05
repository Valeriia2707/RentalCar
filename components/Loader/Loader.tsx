import css from "./Loader.module.css";

export function Loader() {
  return (
    <div className={css.container}>
      <span className={css.spinner}></span>
    </div>
  );
}
