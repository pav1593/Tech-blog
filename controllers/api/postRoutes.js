const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

const multer  = require('multer');
const upload = multer();


//-----------routes for user recipe CRUD---------------------
router.get('/', async (req, res) => {
  // find all Recipes and include other users Favourites and Images for the logged in user
  try {
    const recipeData = await Recipe.findAll({
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Comment },
      ],
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render('user', {
      recipes,
      logged_in: req.session.logged_in,
    });

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.post('/', async (req, res) => {
  // create a new recipe with image upload using Cloudinary middleware via multer
  try {
   // creates a new recipe
    const recipeData = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const recipe = recipeData.get({ plain: true });

    //for each file name submitted and stored by multer add an image for the new recipe being created
    for (const img of req.files) {
      const imageData = await Image.create({
        recipe_id: recipe.id,
        description: img.originalname,
        location: img.path,
        user_id: req.session.user_id,
      });
    }

    // debugging block
    /*const message = {
        recipeData,
        imageData
      }
      res.status(200).json(message);*/

    res.status(200).redirect(`/profile`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  // update a recipe by its `id` value
  try {
    const recipeData = await Recipe.update(
      {
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        date_created: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // Gets the recipe based on the id given in the request parameters
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with that id!' });
      return;
    }

    
    res.status(200).redirect(`/profile`);

  } catch (err) {
    res.status(400).json(err);
  }
});

// user to add a comment using post id and user_id
router.post('/:post_id/comments/:user_id',upload.none(), async (req, res) => {
  try {
    const commentData = await Comment.create(
      {
        comment: req.body.comment,
        user_id: req.params.user_id,
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

//-----------routes for user recipe images creation and deletion ---------------------

router.post('/images/:recipe_id', async (req, res) => {
  // add images for recipe_ for the logged in user

  try {
    const imageData = await Image.create({
      recipe_id: req.params.recipe_id,
      description: req.files[0].originalname,
      location: req.files[0].path,
      user_id: req.session.user_id,
    });
    res.status(200).redirect(`/profile`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/images/:id', async (req, res) => {
  // delete a favourite by its `id` value
  try {
    const imageData = await Image.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!imageData) {
      res.status(404).json({ message: 'No favourite found with that id!' });
      return;
    }

    res.status(200).json(imageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
