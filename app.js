const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const app = express();

// =============================================== Middleware to handle incoming function ============================================
app.use(morgan('dev')); // morgan logger
app.use(express.json());

//setting up static file

app.use(express.static(`${__dirname}/public`))

//create our own middleware ================================================================
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
  
//MOUNTING ROUTERS ======================================================================

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;