'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      plot: {
        type: Sequelize.TEXT
      },
      poster_link: {
        type: Sequelize.STRING
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      actors: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      director: {
        type: Sequelize.STRING
      },
      keywords: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      rating: {
        type: Sequelize.FLOAT
      },
      wiki_link: {
        type: Sequelize.STRING
      },
      imdb_link: {
        type: Sequelize.STRING
      },
      primary_language: {
        type: Sequelize.STRING
      },
      release_year: {
        type: Sequelize.INTEGER
      },
      date_published: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};