import { NavLink, Routes, Rout } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/HomePage";

import clsx from "clsx";
import styles from "./App.module.css";

const getNavLinkClassName = ({ isActive }) =>
  clsx(styles.navLink, { [styles.active]: isActive });

function App() {
  return (
    <>
      <header>
        <nav className={styles.nav}>
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClassName} to="/movies-page">
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Rout path="/" element={<HomePage />}></Rout>
          <Rout path="/movies-page" element={<MoviesPage />}></Rout>
        </Routes>
      </main>
    </>
  );
}

export default App;
