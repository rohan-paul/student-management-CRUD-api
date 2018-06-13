var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* The above { title: 'Express' } is the one that feeds into ./views/index.ejs for rendering the text of title on the landing page of the boilerplate server
<p>Welcome to <%= title %></p> */