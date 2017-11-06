//Get the npm modules we require.
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local:{
      username : String,
      password : String,
      isAdmin : Boolean,
  }
});

//Methods ======================
//Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
