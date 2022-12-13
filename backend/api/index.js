'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const freezbeRoutes = require('./routes/freezbeRoutes');

const app = express();

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', freezbeRoutes.routes);



app.listen(config.port, () => console.log('app listening on url http://localhost:' + config.port ));