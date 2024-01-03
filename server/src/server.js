"use strict";
const myApp = require('./app');
const port = 3001;
myApp.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
