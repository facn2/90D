module.exports = (req, res) => {
  res.append('Set-Cookie', `user_session=; Max-Age=0`);
  res.append('Set-Cookie', `user_email=; Max-Age=0`);
  res.render('login', {layout: 'login'});
};
