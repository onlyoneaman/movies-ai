const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
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

const insertIntoPostgres = async (data) => {
  // Insert data into PostgreSQL
  // Replace with your logic for PostgreSQL insertion
//   console.log('Inserting data into PostgreSQL...');
  const movie = await Movie.create(data);
//   console.log('Done!');
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
    plots = plots.map(plot => {
      return { ...plot, Name: plot.Title, year: plot['Release Year'] };
    }).filter(plot => plot.year > 1970);

    console.log("Merging datasets...");
    const mergedData = mergeData(movies, plots);

    console.log("Length of merged data: ", mergedData.length);

    let it = 0;
    mergedData.forEach(async movie => {
        it++;
        let movieData = {
            name: movie.Name,
            description: movie.Plot,
            release_year: movie.year,
            poster_link: movie.PosterLink,
            genres: movie.Genres,
            actors: movie.Actors,
            director: movie.Director,
            keywords: movie.Keywords,
            rating_value: movie.RatingValue,
            url: movie.url,
            movie_id: movie.id
        }
        await insertIntoPostgres(movieData);
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
