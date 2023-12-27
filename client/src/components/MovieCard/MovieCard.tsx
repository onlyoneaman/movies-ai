import Movie from "../../types/Movie.ts";

type MovieCardProps = {
  movie: Movie;
  load: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({movie, load}) => {

  if(load) return <div>Loading...</div>

  const movieTitle = `${movie.name} (${movie.release_year})`;

  return (
    <div className="flex flex-col justify-around max-w-sm p-2 rounded overflow-hidden shadow-lg bg-dark-blue text-sky-blue">
      <div className={"flex items-center justify-center"}>
        <img
          className="w-full max-w-[120px] md:max-w-[160px]"
          src={movie.poster_link}
          alt={movie.name}
        />
      </div>
      <div className="px-3 py-2">
        <a
          className="font-bold cursor-pointer text-sm md:text-lg mb-2 underline"
          title={movieTitle}
          href={movie.imdb_link || movie.wiki_link || "#"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          {movieTitle}
        </a>
        <p className="text-sm truncate">
          {movie.description}...
        </p>
      </div>
      <div className="px-3 py-2">
        {movie.genres.map((genre, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
