const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const async = require('async');

const {Movie} = require('../models');

const processCSV = (filename, columns) => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filename)
        .pipe(csv())
        .on('data', (data) => {
          let record = {};
          for (let column of columns) {
            record[column] = data[column];
          }
          results.push(record);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };

const mergeData = (movies, plots) => {
    // Implement logic to merge 'movies' and 'plots' based on common fields
    // This is a simplistic example and might need to be adjusted
    return movies.map(movie => {
      const plot = plots.find(p => p.Name === movie.Name && p.year === movie.year);
      return { ...movie, Plot: plot ? plot.Plot : '' };
    });
  };

const insertIntoPostgres = async (movie) => {
  try {
        // it++;
        // console.log("Inserting movie: ", movie);
        // return 0;
        let movieData = {
          name: movie.Name,
          description: movie.Description,
          plot: movie.Plot,
          release_year: movie.year,
          poster_link: movie.PosterLink,
          director: movie.Director,
          rating: movie.RatingValue,
          url: movie.url,
          movie_id: movie.id,
          imdb_link: movie.url,
      }
        const actors = movie.Actors.split(',');
        const genres = movie.Genres.split(',');
        const keywords = movie.Keywords.split(',');
        movieData.actors = actors;
        movieData.genres = genres;
        movieData.keywords = keywords;
        const datePublished = new Date(movie.DatePublished);
        if(datePublished.toString() !== 'Invalid Date') {
            movieData.date_published = datePublished;
        }
      // search for movie in database
      // if it exists, update it
      // if it doesn't exist, create it
      const movieExists = await Movie.findOne({where: {movie_id: movie.id, name: movie.Name}});
      if (movieExists) {
          await movieExists.update(movieData);
      } else {
          await Movie.create(movieData);
      }
      // await insertIntoPostgres(movieData);
  } catch (e) {
      console.error('Error:', movie.Name, e.message);
  }
};

const main = async () => {
  try {
    const moviesDataPath = path.resolve(__dirname, '../../data/movies_data.csv');
    const wikiMoviesDataPath = path.resolve(__dirname, '../../data/wiki_movie_plots_deduped.csv');

    const movieColumns = ['id', 'Name', 'PosterLink', 'Genres', 'Actors', 'Director', 'Description', 'DatePublished', 'Keywords', 'RatingValue', 'url'];
    const plotColumns = ['Title', 'Plot', 'Release Year'];

    console.log("Loading Movies...");
    let movies = await processCSV(moviesDataPath, movieColumns);
    movies = movies.map(movie => {
      return { ...movie, year: new Date(movie.DatePublished).getFullYear() || 0 };
    });

    console.log("Loading Plots...");
    let plots = await processCSV(wikiMoviesDataPath, plotColumns);

    console.log("Length of movies: ", movies.length);
    plots = plots.map(plot => {
      return { ...plot, Name: plot.Title, year: plot['Release Year'] };
    })

    // plots = plots.map(plot => {
    //   return { ...plot, Name: plot.Title, year: plot['Release Year'] };
    // }).filter(plot => plot.year > 1970);

    console.log("Merging datasets...");
    let mergedData = mergeData(movies, plots);

    console.log("Length of merged data: ", mergedData.length);

    // mergedData = mergedData.filter(movie => movie.DatePublished !== 'N/A');
    // mergedData = mergedData.splice(0, 10);

    // console log random movie
    console.log(mergedData[Math.floor(Math.random() * mergedData.length)]);

    // mergedData = mergedData.filter(movie => movie.year > 2016);

    async.eachLimit(mergedData, 10, async (movie) => {
      await insertIntoPostgres(movie);
    });

  } catch (e) {
    console.error('Error:', e);
  }
};

if (require.main === module) {
    try {
      main();
    } catch (e) {
      console.error('Error:', e);
    }
}
