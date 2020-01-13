const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userAdminSchema = new Schema({
  email: String,
  password: String
});

userAdminSchema.methods.encryptPassword = (password)  => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userAdminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = model('UserAdmin', userAdminSchema)
