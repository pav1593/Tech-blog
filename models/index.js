const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// User hasMany Posts
// Post belongsTo User
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});


// Users hasMany Commments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment belongsTo User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Post hasMany Commments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { Post, User, Comment};
