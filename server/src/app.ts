const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req: any, res: any) => {
  res.send('Hello from moviesapi!');
});

app.get('/ping', (req: any, res: any) => {
  res.send('pong');
});

const movieRouter = require('./routes/movies');

app.use('/api/v1/movies', movieRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
