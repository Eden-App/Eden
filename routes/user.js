const router = require('express').Router()

const{ googleSignIn , getAllBooks} = require('../controllers/user')

router.post('/gsignin', googleSignIn)
router.get('/books', getAllBooks)

module.exports = router