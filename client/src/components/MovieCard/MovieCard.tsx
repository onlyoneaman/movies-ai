import Movie from "../../types/Movie.ts";

type MovieCardProps = {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full max-w-[200px]" src={movie.poster_link} alt={movie.name}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.name} ({movie.release_year})</div>
        <p className="text-gray-700 text-base">
          {movie.description.substring(0, 150)}...
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {movie.genres.map((genre, index) => (
          <span key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{genre}</span>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
