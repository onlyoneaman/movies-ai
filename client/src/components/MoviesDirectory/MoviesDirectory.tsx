import {useEffect, useState} from "react";
import MovieCard from "../MovieCard";
import services from "../../services";
import Movie from "../../types/Movie.ts";
import PaginationComponent from "./PaginationComponent.tsx";

const MoviesDirectory = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [load, setLoad] = useState(false);

  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const getMovies = async () => {
    setLoad(true);
    const data = {
      currentPage,
      pageSize,
      query
    }
    const res = await services.movieApis.getMovies(data);
    // console.log(res);
    if (res.err) {
      console.error(res.err);
      return;
    }
    setMovies(res.data);
    setTotalPages(res.totalPages);
    setLoad(false);
  }

  const changeQuery = (e: any) => {
    setQuery(e.target.value);
  }

  useEffect(() => {
    getMovies();
  }, [pageSize, currentPage, query])

  return (
    <div>
      <input
        className={"w-full h-10 px-3 mb-2 text-base bg-gray-300 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"}
        type="text"
        placeholder="Search..."
        onChange={changeQuery}
      />
      <div>
        <div>
          {
            movies.length > 0 ? (
              <ul className={"grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3"}>
                {
                  movies.map(movie => (
                    <MovieCard movie={movie} key={movie.id} load={load}/>
                  ))
                }
              </ul>
            ) : (
              <div className="w-full text-center p-6">
                <h1 className="text-xl font-bold">
                  No results found
                </h1>
              </div>
            )
          }
        </div>
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
