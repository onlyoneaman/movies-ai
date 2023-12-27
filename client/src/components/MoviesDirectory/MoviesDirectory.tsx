import {useEffect, useState} from "react";
import MovieCard from "../MovieCard";
import services from "../../services";
import Movie from "../../types/Movie.ts";

const MoviesDirectory = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
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
      <h1 className={"text-2xl font-bold"}>
        Movies Directory
      </h1>
      <div>
        <ul className={"grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3"}>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} load={load} />
          ))}
        </ul>
      </div>
    </div>
  )
};

export default MoviesDirectory;
