const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name : String,
    email : String,
    subject : String,
    message : String
});
const messageTable = mongoose.model('message',messageSchema);
module.exports = messageTable;