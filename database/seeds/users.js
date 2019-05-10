const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'username1', password: bcrypt.hashSync('password1', 10), department: 'police'},
        {username: 'username2', password: bcrypt.hashSync('password2', 10), department: 'sanitation'},
        {username: 'username3', password: bcrypt.hashSync('password3', 10), department: 'fire'}
      ]);
    });
};
