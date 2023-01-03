const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


// async function authenticate(params) {
//     console.log(params);

//     const user = await db.User.scope('withHash').findOne({ where: { email: params.email } });
//     // const password = ;

//     if (!user || !(await bcrypt.compare(params.password, params.passwordHash)))
//         throw 'Email or password is incorrect';

//         return await user;
// }

async function authenticate({ email, passwordHash }) {
    console.log(email);
    const user = await db.User.scope('withHash').findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(passwordHash, user.passwordHash)))
        throw 'Username or password is incorrect';
    else throw 'User connected';
}


async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { passwordHash, ...userWithoutHash } = user;
    return userWithoutHash;
}
