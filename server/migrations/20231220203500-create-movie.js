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
      movieId: {
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
      posterLink: {
        type: Sequelize.STRING
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      ACTORS: {
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
      WIKI_LINK: {
        type: Sequelize.STRING
      },
      IMDB_LINK: {
        type: Sequelize.STRING
      },
      PRIMARY_LANGUAGE: {
        type: Sequelize.STRING
      },
      release_year: {
        type: Sequelize.INTEGER
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