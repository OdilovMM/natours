const app = require('./app');

// starting a server on port 3000 // ==============================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
