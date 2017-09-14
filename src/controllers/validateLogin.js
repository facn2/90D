const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  console.log(req.body);
  let userData = req.body;
  if (!userData.email || !userData.password) {
    res.render('error', {
      message: 'Sorry, your user details is a little lacking. King hates you.', type: 'error'
    });
  }
  res.redirect('/login');
};
