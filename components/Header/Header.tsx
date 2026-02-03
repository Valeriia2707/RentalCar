"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import { Icon } from "../Icon/Icon";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <Icon id={"Logo"} className={css.logo}></Icon>
        </Link>
        <nav className={css.nav}>
          <Link
            href="/"
            className={`${css.link} ${pathname === "/" ? css.active : ""}`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${css.link} ${pathname === "/catalog" ? css.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
