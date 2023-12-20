const express = require('express');
const { Movie } = require('../../models'); // Import the model
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const currentPage = parseInt(req.query.currentPage, 10) || 1;
    const offset = (currentPage - 1) * pageSize;
    const limit = pageSize;
    const allMovies = await Movie.findAndCountAll({
      offset,
      limit,
      order: [['id', 'ASC']]
    });
    res.json(allMovies);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a movie by id
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.json(movie);
  } catch (err) {
    console.error(err.message);
  }
});

// Create a movie
router.post('/', async (req, res) => {
  const { name, description, release_year } = req.body;
  try {
    const movie = await Movie.create({ name, description, release_year });
    res.json(movie);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  const { name, description, release_year } = req.body;
  try {
    const movie = await Movie.update(
      { name, description, release_year },
      { where: { id: req.params.id } }
    );
    res.json(movie);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.destroy({ where: { id: req.params.id } });
    res.json(movie);
  } catch (err) {
    console.error(err.message);
  }
});

// Search movies by description
router.get('/search', async (req, res) => {
  const { description } = req.query;
  try {
    const movies = await Movie.findAll({
      where: {
        description: {
          [Op.iLike]: `%${description}%`
        }
      }
    });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
  }
});

// Add more routes as needed...

module.exports = router;
