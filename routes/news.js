const express = require('express'),
  routes = express.Router(),
  NewsController = require('../controllers/news');

routes.post('/article', NewsController.article)
routes.post('/bestseller', NewsController.bestSeller)
routes.post('/topstories', NewsController.topStories)
routes.post('/mostviewed', NewsController.mostViewed)

/*

1. search book, writer, etc by query
2. 

*/

module.exports = routes