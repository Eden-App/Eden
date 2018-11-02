const express = require('express'),
  routes = express.Router(),
  NewsController = require('../controllers/news'),
  { isLogin } = require('../middlewares/auth.js')

routes.post('/article', isLogin, NewsController.article)
routes.post('/bestseller', isLogin, NewsController.bestSeller)
routes.post('/topstories', isLogin, NewsController.topStories)
routes.post('/mostviewed', isLogin, NewsController.mostViewed)

/*

1. search book, writer, etc by query
2. 

*/

module.exports = routes