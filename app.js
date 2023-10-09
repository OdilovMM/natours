const express = require('express');
const fs = require('fs');
const app = express();

//Middleware to handle incoming function ===========================================================================================
app.use(express.json());

//reading tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//tours routing

//GET METHOD ======================================================================================================================
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

//POST METHOD ====================================================================================================================

//to create a new tour

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// starting a server on port 3000 // ==============================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
