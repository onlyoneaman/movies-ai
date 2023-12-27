import {useEffect, useState} from "react";
import MovieCard from "../MovieCard";
import services from "../../services";
import Movie from "../../types/Movie.ts";
import PaginationComponent from "./PaginationComponent.tsx";

const MoviesDirectory = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [load, setLoad] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const getMovies = async () => {
    setLoad(true);
    const data = {
      currentPage: currentPage,
      pageSize: pageSize
    }
    const res = await services.movieApis.getMovies(data);
    console.log(res);
    if (res.err) {
      console.error(res.err);
      return;
    }
    setMovies(res.data);
    setTotalPages(res.totalPages);
    setLoad(false);
  }

  useEffect(() => {
    getMovies();
  }, [pageSize, currentPage])

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
      <PaginationComponent
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        load={load}
        totalPages={totalPages}
      />
    </div>
  )
};

export default MoviesDirectory;
