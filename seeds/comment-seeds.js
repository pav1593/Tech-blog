const { Comment } = require('../models');

const commentData = [
  {
    comment: 'Loved it!',
    user_id: 1,
    post_id: 4,
  },
  {
    comment: 'My favourite article',
    user_id: 4,
    post_id: 1,
  },
  {
    comment: 'I agree',
    user_id: 2,
    post_id: 1,
  },
  {
    comment: "I don't agree",
    user_id: 3,
    post_id: 4,
  },
  {
    comment: "I'm recommending this",
    user_id: 3,
    post_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
