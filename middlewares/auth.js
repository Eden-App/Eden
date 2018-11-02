const Helper = require('../helpers/jasonWebToken')

module.exports = {
  isLogin: (req, res, next) => {

    let user = req.headers.token
    console.log(req.headers.token)


    if (user === 'tidak Ada') {
      console.log('gagal masuk controller')
      res.status(500).json({ message: 'User belum melakukan login!' })
    } else {
      console.log('sukses masuk controller')
      let decoded = Helper.decoded(user)
      req.sudahDecode = decoded

      next()

    }
  },
  isAuthorize: (req, res, next) => {

  }
}