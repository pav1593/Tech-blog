const router = require('express').Router();
const { User } = require('../../models');

//---------------router to get all the user infors----------------------
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------------------router to receive the singup infos-------------------
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//------------------router to receive the login infos--------------------
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//------------------router to receive the logout-----------------------
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//-------------- route to process user favourites CRUD -----------------

router.get('/favourites', async (req, res) => {
  // find all favourites for the logged in user
  try {
    const favouriteData = await Favourite.findAll({
      where: {
        user_id: req.session.user_id, //change this prior to prod to equal session user_id
      },
    });

    const favourites = favouriteData.map((favs) => favs.get({ plain: true }));

    res.status(200).json(favourites);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/favourites/:id', async (req, res) => {
  // find one favourites  by its `id` value for the logged in user
  try {
    const favouriteData = await Favourite.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id, //change this prior to prod to equal session user_id
      },
    });

    if (!favouriteData) {
      res
        .status(404)
        .json({ message: 'No favourites found with that id for the user!' });
      return;
    }

    res.status(200).json(favouriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/favourites', async (req, res) => {
  // create a new favourite for the logged in user
  try {
    const favouriteData = await Favourite.create({
      recipe_id: req.body.recipe_id,
      user_id: req.session.user_id, // need to change this for prod with session user_id
    });
    res.status(200).json(favouriteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/favourites/:id', async (req, res) => {
  // delete a favourite by its `id` value
  try {
    const favouriteData = await Favourite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, //need to change this for prod with session user_id
      },
    });

    if (!favouriteData) {
      res.status(404).json({ message: 'No favourite found with that id!' });
      return;
    }

    res.status(200).json(favouriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
