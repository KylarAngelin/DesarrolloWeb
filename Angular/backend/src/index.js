const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');
//Initializations
require('./database');
const app = express();

//Settings
app.use(cors())
app.use(express.json());

//Middlewares
app.use(morgan('dev'));

//Config Route
app.use('/api',  require('./routes/index'))


//Start the server
app.listen(3000);
console.log('server on port', 3000);
