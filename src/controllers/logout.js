module.exports = (req, res) => {
  console.log(req.headers);
  res.render('login', {layout: 'login'});
};
