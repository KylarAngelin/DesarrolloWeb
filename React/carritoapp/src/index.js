const express = require ('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path')
//Initializations
require('./database');
const app = express();

//Settings
app.use(cors())


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Config Route
app.use('/api',  require('./routes/index'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(3000);
console.log('server on port', 3000);
