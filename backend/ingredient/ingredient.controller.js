const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const ingredientService = require('./ingredient.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    ingredientService.getAll()
        .then(ingredients => res.json(ingredients))
        .catch(next);
}

function getById(req, res, next) {
    ingredientService.getById(req.params.id)
        .then(ingredient => res.json(ingredient))
        .catch(next);
}

function create(req, res, next) {
    ingredientService.create(req.body)
        .then(() => res.json({ message: 'Ingredient created' }))
        .catch(next);
}

function update(req, res, next) {
    ingredientService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Ingredient updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    ingredientService.delete(req.params.id)
        .then(() => res.json({ message: 'Ingredient deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        ingredientName: Joi.string().required(),
        ingredientDescription: Joi.string().required(),
        grammage: Joi.float().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        ingredientName: Joi.string().empty(''),
        ingredientDescription: Joi.string().empty(''),
        grammage: Joi.float().empty('')

    })
    validateRequest(req, next, schema);
}
