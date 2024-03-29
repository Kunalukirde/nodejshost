const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type : String, required : true, trim : true},
    email : {type : String , required : true, trim : true},
    password : { type : String, required : true, trim : true},
    mobile : {type : String,required : true, trim : true}
});

const userTable = mongoose.model('user',UserSchema);

module.exports = userTable;


