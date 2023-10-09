const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// =============================================== Middleware to handle incoming function ============================================
app.use(morgan('dev')); // morgan logger
app.use(express.json());

//create our own middleware ================================================================
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//reading tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//REFACTORING ROUTES =========================================================================================================================

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',

    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};


//handling users route ==============================

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}


//tours routing
/*
//GET METHOD ================================================= Getting all tours ====================================================
app.get('/api/v1/tours', getAllTours);

//URL PARAMETRS ========================================================= getting one tour via id ==========================================================
app.get('/api/v1/tours/:id', getTour);

//POST METHOD ========================================== to create a new tour ==============================================================================
app.post('/api/v1/tours', createTour);

//PATCH ================================================== update data using PATCH  ===============================================
app.patch('/api/v1/tours/:id', updateTour);

//DELETE ============================================== Delete ======================================================================
app.delete('/api/v1/tours/:id', deleteTour);
*/
//more refactoring IF NEEDED ======================================================================================================================================


const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//implementing Users Routes ======================================================================================================================================
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);
  
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);  


  
//MOUNTING ROUTERS ======================================================================

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// starting a server on port 3000 // ==============================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
