module.exports = (req, res) => {
  console.log(req.headers);
  res.append('Set-Cookie', `user_session=; Max-Age=0`);
  res.render('login', {layout: 'login'});
};
