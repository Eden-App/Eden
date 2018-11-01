const {encoded, decoded} = require('../helpers/jasonWebToken.js')
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')

const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);


const googleSignIn = (req, res) => {
    
    let idToken = req.body.idToken
    
    client.verifyIdToken({
        idToken, audience : CLIENT_ID
    }, (error , result) => {
        if ( error ) { 

            res.status(500).json({error: error.message})
        }
        else{
            let email = result.payload.email
            let name = result.payload.given_name
            let userId = result.payload.sub
            
            console.log('email :', email)
            User.findOne({
                email
            })       
                .then( user => {
                    let jwtToken = null
                    if (user){

                        jwtToken = encoded({email, name})

                    }else {

                        let newUser = new User({ email, name, password : userId})
                        newUser.save(function( error, response ){
                            
                            if (error) {
                                res.status(500).json({ message : 'error while saving user', error: error.message})
                            }else {
                                res.status(200).json()
                            } 
                        })
                    }
                    res.status(200).json(jwtToken)
                })  
                .catch( err => {
                    
                    res.status(500).json( { message : ' error while find one user', error: error.message})
                })    
        }
    })
}

const getAllBooks = (req, res) => {

}

module.exports = {
    googleSignIn, getAllBooks
}