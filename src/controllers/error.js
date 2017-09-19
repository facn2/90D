exports.client = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    message: 'Experiencing difficulties - go read a book while you wait'
  });
};

exports.server = (req, res) => {
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    message: 'Experiencing internal difficulties - go call your mom while you wait'
  });
};
