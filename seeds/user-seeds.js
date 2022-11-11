const { User } = require('../models');

const userData = [
  {
    username: 'DaveSmith',
    email: 'dave@abc.com',
    password: 'password',
  },
  {
    username: 'JaneSmith',
    email: 'jane@abc.com',
    password: 'foodie99',
  },
  {
    username: 'EricaDavey',
    email: 'erica@abc.com',
    password: 'temporary',
  },
  {
    username: 'KevinLau',
    email: 'kevin@abc.com',
    password: '12345678',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
