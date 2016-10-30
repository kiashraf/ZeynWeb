/**
 * Created by user on 26-07-2016.
 */

var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var ContactUsSchema = new Schema({
    name : String,
    email : String,
    message : String

});

module.exports = mongoose.model('ContactUs' ,ContactUsSchema);
