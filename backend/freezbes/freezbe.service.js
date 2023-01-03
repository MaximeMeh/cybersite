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
    return await db.Freezbe.findAll();
}

async function getById(id) {
    return await getFreezbe(id);
}

async function create(params) {
    // validate
    if (await db.Freezbe.findOne({ where: { freezbeName : params.freezbeName } })) {
        throw 'Freezbe "' + params.freezbeName + '" is already registered';
    }

    const freezbe = new db.Freezbe(params);

    // save freezbe
    await freezbe.save();
}

async function update(id, params) {
    const freezbe = await getFreezbe(id);

    // validate
    const freezbeNameChanged = params.freezbeName && params.freezbeName !== params.freezbeName;
    if (freezbeNameChanged && await db.Freezbe.findOne({ where: { freezbeName : params.freezbeName } })) {
        throw 'Freezbe "' + params.freezbeName + '" is already registered';
    }

    // copy params to freezbe and save
    Object.assign(freezbe, params);
    await freezbe.save();
}

async function _delete(id) {
    const freezbe = await getFreezbe(id);
    await freezbe.destroy();
}

// helper functions

async function getFreezbe(id) {
    const freezbe = await db.Freezbe.findByPk(id);
    if (!freezbe) throw 'Freezbe not found';
    return freezbe;
}
