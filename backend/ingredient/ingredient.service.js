const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Ingredient.findAll();
}

async function getById(id) {
    return await getIngredient(id);
}

async function create(params) {
    // validate
    if (await db.Ingredient.findOne({ where: { ingredientName : params.ingredientName } })) {
        throw 'Ingredient "' + params.ingredientName + '" is already registered';
    }

    const ingredient = new db.Ingredient(params);

    // save ingredient
    await ingredient.save();
}

async function update(id, params) {
    const ingredient = await getIngredient(id);

    // validate
    const ingredientNameChanged = params.ingredientName && params.ingredientName !== params.ingredientName;
    if (ingredientNameChanged && await db.Ingredient.findOne({ where: { ingredientName : params.ingredientName } })) {
        throw 'Ingredient "' + params.ingredientName + '" is already registered';
    }

    // copy params to ingredient and save
    Object.assign(ingredient, params);
    await ingredient.save();
}

async function _delete(id) {
    const ingredient = await getIngredient(id);
    await ingredient.destroy();
}

// helper functions

async function getIngredient(id) {
    const ingredient = await db.Ingredient.findByPk(id);
    if (!ingredient) throw 'Ingredient not found';
    return ingredient;
}
