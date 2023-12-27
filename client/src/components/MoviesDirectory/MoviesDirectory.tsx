import {useEffect, useState} from "react";
import MovieCard from "../MovieCard";
import services from "../../services";

const MoviesDirectory = () => {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);

  const getMovies = async () => {
    setLoad(true);
    const res = await services.movieApis.getMovies({});
    console.log(res);
    if (res.err) {
      console.error(res.err);
      return;
    }
    setMovies(res.data);
    setLoad(false);
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div>
      <h1>Movies Directory</h1>
      <div>
        <ul className={"grid grid-cols-4"}>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id}/>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default MoviesDirectory;
