const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// Create a user
router.post('/', async (req, res) => {
  // TODO: validate data
  // TODO: check if user exists
  // TODO: persist data
  const { givenName, familyName, email } = req.body;
  const newUser = new User({
    givenName,
    familyName,
    email
  });

  try {
    const user = await newUser.save();
    return res.json(user);
  } catch (err) {
    // TODO: send error response
    throw new Error(err);
  }
});
// Get all users
router.get('/', (req, res) => {
  User.find()
    .sort({ created: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err }));
});
// Get one user
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(404).json({ error: 'User not found' });
    });
});
// Update a user
router.put('/:id', async (req, res) => {
  // TODO: validate
  const { givenName, familyName, email } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (givenName) user.givenName = givenName;
    if (familyName) user.familyName = familyName;
    if (email) user.email = email;

    await user.save();

    res.json(user);
  } catch (err) {
    // TODO: return error
    throw new Error(err);
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
    // TODO: return error
    throw new Error(err);
  }
});

module.exports = router;
