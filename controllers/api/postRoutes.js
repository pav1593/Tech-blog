const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

const multer  = require('multer');
const upload = multer();


// user to render Posts view
router.get('/:id', async (req, res) => {
  // find one post  by its `id` value and include comments for logged in user
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Comment, include:[{model:User}]},
      ],
    });

    const posts = postData.get({ plain: true });

    if (!postData) {
      res
        .status(404)
        .json({ message: 'No post found with that id!' });
      return;
    }

    //res.status(200).json(postData);
    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a post given a user Id
router.post('/', upload.none(),async (req, res) => {
 
  try {
    const postData = await Post.create(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      }
    );

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    
    res.status(200).redirect(`/dashboard`);

  } catch (err) {
    res.status(400).json(err);
  }
});

//update a post given post Id
router.post('/updates/:post_id', upload.none(), async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        date_created: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        where: {
          id: req.params.post_id,
          user_id: req.session.user_id
        },
      }
    );
    
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    
    res.status(200).redirect('/dashboard');

  } catch (err) {
    res.status(500).json(err);
  }
});

// user to add a comment using post id and user_id
router.post('/comments/:post_id',upload.none(), async (req, res) => {
  try {
    const commentData = await Comment.create(
      {
        comment: req.body.comment,
        user_id: req.session.user_id,
        post_id: req.params.post_id,
      }
    );

    if (!commentData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    
    res.status(200).redirect(`/api/posts/${req.params.post_id}`);

  } catch (err) {
    res.status(400).json(err);
  }
});


//used to render dashboard view
router.delete('/:id', async (req, res) => {
  // delete a recipe by its `id` value
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No recipe found with that id!' });
      return;
    }

   // res.status(200).json(recipeData);
   res.status(200).redirect(`/dashboard`);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
