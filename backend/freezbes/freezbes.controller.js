const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const freezbeService = require('./freezbe.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.patch('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    freezbeService.getAll()
        .then(freezbes => res.json(freezbes))
        .catch(next);
}

function getById(req, res, next) {
    freezbeService.getById(req.params.id)
        .then(freezbe => res.json(freezbe))
        .catch(next);
}

function create(req, res, next) {
    freezbeService.create(req.body)
        .then(() => res.json({ message: 'Freezbe created' }))
        .catch(next);
}

function update(req, res, next) {
    freezbeService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Freezbe updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    freezbeService.delete(req.params.id)
        .then(() => res.json({ message: 'Freezbe deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        freezbeName: Joi.string().required(),
        freezbeDescription: Joi.string().required(),
        puht: Joi.number().required(),
        freezbeRange: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        freezbeName: Joi.string().empty(''),
        freezbeDescription: Joi.string().empty(''),
        puht: Joi.number().empty(''),
        freezbeRange: Joi.string().empty('')

    })
    validateRequest(req, next, schema);
}
