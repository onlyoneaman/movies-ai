type Movie = {
  id: number;
  name: string;
  description: string;
  release_year: number;
  movie_id: number;
  plot: string;
  poster_link: string;
  genres: string[];
  actors: string[];
  director: string;
  keywords: string[];
  rating: number;
  wiki_link: string | null;
  imdb_link: string;
  primary_language: string | null;
  date_published: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

export default Movie;
