import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Filter";
import Movie from "./Movie";
import { motion,AnimatePresence } from "framer-motion";
function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const fetchPopularMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=354146a1124247938ee8d666bc950446&language=en-US&page=1"
      );
      const movies = await res.json();
      setPopular(movies.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPopularMovies();
  }, []);
 
  return (
    <div className='App'>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className='popular-movies'>
        <AnimatePresence>
          {filtered.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
