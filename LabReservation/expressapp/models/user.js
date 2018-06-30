var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var bcrypt = require('bcrypt');  

/*var validate = require('mongoose-validator'); 
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Email must be at least 3 characters, max 40, must have @ in, example@gmail.com'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
]; */


var UserSchema = new Schema({
    name: { type: String, required: true }, 
    username: { type: String, lowercase: true, required: true, unique: true }, 
    password: { type: String, required: true}, //validate: usernameValidator
    email: { type: String, required: true, unique: true } 
    
}); 


UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}


UserSchema.methods.comparePassword = function(hashPassword) {
    return bcrypt.compareSync(hashPassword, this.password); 
};

module.exports = mongoose.model('User', UserSchema);


