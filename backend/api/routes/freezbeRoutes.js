'use strict';
const express = require('express');
const freezbeController = require('../controllers/freezbeController');
const router = express.Router();

const {getFreezbes} = freezbeController;

router.get('/freezbes', getFreezbes);

module.exports = {
    routes: router
}