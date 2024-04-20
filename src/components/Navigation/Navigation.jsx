import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";

const getNavLinkClassName = ({ isActive }) =>
  clsx(styles.navLink, { [styles.active]: isActive });

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink className={getNavLinkClassName} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
