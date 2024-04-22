import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/movies" element={<MoviesPage />}></Route>
            <Route
              path="/movies/:movieId/*"
              element={<MovieDetailsPage />}
            ></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
