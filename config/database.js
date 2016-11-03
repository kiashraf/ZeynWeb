/**
 * Created by user on 24-07-2016.
 */

if (process.env.NODE_ENV === 'production') {
    // Offer production stage environment variables
//  mongodb://kiashraf:kiashraf@ds013486.mlab.com:13486/socketchatapp

    module.exports = {
        host: process.env.host || "",
        PORT : process.env.PORT || "",
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
    }
} else {
    module.exports = {

        "host": "http://127.0.0.1:3000",
        "PORT": "http://127.0.0.1:3000",
        "dbURI": 'mongodb://127.0.0.1:27017/zeyn1',
        "sessionSecret": "keyboardkafhlfaflhfdafcat"

    }
}


