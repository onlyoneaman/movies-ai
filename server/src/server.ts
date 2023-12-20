const myApp = require('./app');

const port = 3009;
myApp.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
