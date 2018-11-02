const request = require('request')
    function checkGender ( name, cb ) {
        request(`https://api.genderize.io/?name=${ name }`, function (error, response, body) {
            let result = JSON.parse(body)
            cb ( result.gender )
    });
}
 module.exports = checkGender