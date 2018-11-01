const router = require('express').Router(),
      MangaController = require('../controllers/mangaeden')

router
    .get('/:page_id', MangaController.listManga)
    .get('/search/:input', MangaController.searchManga)
    .get('/manga/:manga_id', MangaController.mangaDetail)
    .get('/manga/chapter/:chapter_id', MangaController.mangaChapter)
    


module.exports = router