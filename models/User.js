const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName:String,
  email: String,
  password:String,
  phone:String,
  post:String,
  role:String
});
userSchema.methods.toJSON=function(){
  const user=this;
  const userObject=user.toObject()
  delete userObject.password
  delete userObject.role
  delete userObject.__v
  return userObject
}

module.exports = mongoose.model('User', userSchema);