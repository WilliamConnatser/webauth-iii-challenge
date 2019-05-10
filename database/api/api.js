const db = require('../dbConfig');

const register = user => {
    return db('users')
        .insert(user)
        .then(response => {
            return db('users')
                .where({
                    id: response[0]
                })
                .first();
        })
}

const login = ({
    username
}) => {
    return db('users')
        .where({
            username
        })
        .then(response => {
            return db('users')
                .where({
                    id: response[0].id
                })
                .first();
        })
}

const getUserByUsername = username => {
    return db('users')
        .where({
            username
        })
        .first();
}

const getAllUsers = department => {
    return db('users').where({
        department
    });
}


module.exports = {
    register,
    login,
    getUserByUsername,
    getAllUsers
}