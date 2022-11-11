const { Post } = require('../models');

const postData = [
  {
    title: 'dsfddf',
    content: "sdfasdfsdaf",
    user_id: 1,
  },
  {
    title: 'dsfddf',
    content: "sdfasdfsdaf",
    user_id: 1,
  },
  {
    title: 'dsfddf',
    content: "sdfasdfsdaf",
    user_id: 1,
  },
  {
    title: 'dsfddf',
    content: "sdfasdfsdaf",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
