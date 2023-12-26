'use strict';
const { release } = require('os');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    release_year: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER,
    plot: DataTypes.TEXT,
    poster_link: DataTypes.STRING,
    genres: DataTypes.ARRAY(DataTypes.STRING),
    actors: DataTypes.ARRAY(DataTypes.STRING),
    director: DataTypes.STRING,
    keywords: DataTypes.ARRAY(DataTypes.STRING),
    rating: DataTypes.FLOAT,
    wiki_link: DataTypes.STRING,
    imdb_link: DataTypes.STRING,
    primary_language: DataTypes.STRING,
    date_published: DataTypes.DATE
  }, {
    sequelize,

    modelName: 'Movie',
  });
  return Movie;
};