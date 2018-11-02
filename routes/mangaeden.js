const router = require('express').Router(),
      MangaController = require('../controllers/mangaeden'),
      { isLogin } = require('../middlewares/auth.js')

router
  .get('/:page_id', isLogin, MangaController.listManga)
  .get('/search/:input', isLogin,  MangaController.searchManga)
  .get('/manga/:manga_id', isLogin,  MangaController.mangaDetail)
  .get('/manga/chapter/:chapter_id', isLogin,  MangaController.mangaChapter)
    


module.exports = router