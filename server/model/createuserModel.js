const mongoose = require ('mongoose');

//schema declartion for users collection
const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role: String 
    },
    { collection: 'users' });
const userModel = mongoose.model('users', userSchema);

module.exports= userModel;
