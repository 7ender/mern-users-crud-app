const express = require('express');
const router = express.Router();

const transformUser = require('../../util/helpers/transform-user');

const {
  validateCreateUserData,
  validateUpdateUserData
} = require('../../util/validators/users');
const User = require('../../models/User');

// Create a user
router.post('/', async (req, res) => {
  // Validate data
  const { valid, errors } = validateCreateUserData(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }

  const { givenName, familyName, email } = req.body;

  // check if user exists (assuming the email field has to be unique)
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ email: 'This email is already in use' });
  }

  const newUser = new User({
    givenName,
    familyName,
    email
  });

  try {
    const user = await newUser.save();
    return res.json(transformUser(user._doc));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Get all users
router.get('/', (req, res) => {
  // Here I didnt use async await because it's overkill as there is only one promise returned
  User.find()
    .sort({ created: -1 })
    .then((users) => {
      res.json(users.map((user) => transformUser(user)));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// Get one user
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.json(transformUser(user));
    })
    .catch((err) => {
      res.status(404).json({ error: 'User not found' });
    });
});

// Update a user
router.put('/:id', async (req, res) => {
  // Validate data
  const { errors, valid } = validateUpdateUserData(req.body);
  if (!valid) {
    return res.status(400).json(errors);
  }
  const { givenName, familyName, email } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (user) {
      if (givenName) user.givenName = givenName;
      if (familyName) user.familyName = familyName;
      if (email) user.email = email;

      await user.save();

      return res.json(transformUser(user));
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
// Delete user
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      await user.delete();
      return res.json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
