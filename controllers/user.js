const {encoded, decoded} = require('../helpers/jasonWebToken.js')
const { comparePassword } = require('../helpers/brcyrpt')
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
                                res.status(200).json(jwtToken)
                            } 
                        })
                    }
                    
                })  
                .catch( err => {
                    
                    res.status(500).json( { message : ' error while find one user', error: error.message})
                })    
        }
    })
}

const signUp = (req, res) => {
    console.log('sign up')
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    
    let newUser = new User({ name, email, password})
    newUser.save()
        .then( result => {

            const msg = {
                to: `${email}`,
                from: 'hokandre@mhs.mdp.ac.id',
                subject: 'Registration',
                text: 'Thank\'s to join our app, just one step again to complete your registration. click link below',
                html: `<strong>link : <a href=http://localhost:3000/users/actived/${result._id}>Click here</a></strong>`,
            };

            sgMail.send(msg);

            res.status(200).json({ message : 'Email activation has been sent, please cek your email :)'})

        })
        .catch( error => {
            res.status(500).json({ message : 'error while sign up', error: error.message})
        })

   
        
}

const actived = (req, res) => {
    console.log('actived masuk')

    let id = req.params.userid

    User.findById(id)
        .then( user => {
            res.status(200).json(user)
        })
        .catch( error => {
            res.status(500).json({ message: 'Error while activated user', error: error.message})
        })
    
}

const getAllBooks = (req, res) => {

}

const signin = (req, res) => {
    let email = req.body.email
    let password = req.body.password


    User.findOne({ email })
        .then( user => {
          
            let validatedPassword = comparePassword(password, user.password)
            let jwtToken = null

            if (validatedPassword) {
                jwtToken = encoded({email : user.email, name : user.name})
                res.status(200).json(jwtToken)
            }else {
                res.status(401).json({ message: 'Password salah!'})
            }
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({ message:'Error while sign in', error:error.message})
        })
}

module.exports = {
    googleSignIn, getAllBooks, signUp, actived, signin
}