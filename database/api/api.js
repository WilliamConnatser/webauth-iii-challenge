const db = require('../dbConfig');

const register = user => {
    return db('users')
        .insert(user);
}

const getUserByUsername = username => {
    return db('users')
        .where({
            username
        })
        .first();
}

const getAllUsers = _ => {
    return db('users');
}


module.exports = {
    register,
    getUserByUsername,
    getAllUsers
}