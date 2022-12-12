'use strict';

const freezbeData = require('../data/freezbes');

const getFreezbes = async (req, res, next) => {
    try {
        const freezbes = await freezbeData.getFreezbes();
        res.send(freezbes) 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getFreezbes
}