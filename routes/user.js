const router = require('express').Router()

const{ googleSignIn , getAllBooks, signUp, actived, signin} = require('../controllers/user')

router.post('/gsignin', googleSignIn)
router.post('/signup', signUp)
router.get('/actived/:userid', actived)
router.post('/signin', signin)

router.get('/books', getAllBooks)

module.exports = router