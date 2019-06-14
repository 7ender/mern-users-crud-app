module.exports = (user) => ({
  id: user._id,
  givenName: user.givenName,
  familyName: user.familyName,
  email: user.email,
  created: user.created
});
