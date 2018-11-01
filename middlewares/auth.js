const { Decode } = require('../helpers/jasonWebToken')

module.exports = {
    isLogin : (req, res, next ) => {
        if ( localStorage.getItem('token') ) {
            
            let decoded = Decode(localStorage.getItem('token'))
            req.sudahDecode = decoded

            next()
        }else {
            res.status(500).json({ message : 'User belum melakukan login!'})
        }
    }, 
    isAuthorize : (req, res, next) => {
        
    }
}