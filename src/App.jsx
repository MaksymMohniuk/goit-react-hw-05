import { NavLink, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

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
          <NavLink className={getNavLinkClassName} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
