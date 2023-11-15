const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true,"firstName is required"],
  },
  lastName: {
    type: String,
    required: [true,"lastName is required"],
  },
  email: {
    type: String,
    required: [true,"email is required"],
  },
  password: {
    type: String,
    required: [true,"password is required"],
  },
  phone: {
    type: String,
    required: [true,"phone is required"],
  },
  post: {
    type: String,
    required: [true,"post is required"],
  },
  role: {
    type: String,
    required: [true,"server side error"],
  }
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