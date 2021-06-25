const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Please enter your name']
  },
  phone: {
    type: String,
    required: [ true, 'Please enter phone number' ],
    unique: true,
    validate: {
      validator: function(v) {
        return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  email: {
    type: String,
    required: [ true, 'Please enter an email' ],
    unique: true,
    lowercase: true,
    validate: [ isEmail, 'Please enter a valid email' ]
  },
  password: {
    type: String,
    required: [ true, 'Please enter an password' ],
    minLength: [ 8, 'Minimum password length is 8 characters' ]
  },
  avatar: {
    type: String,
    default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
  }
}, { timestamp: true })


// Fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}


module.exports = mongoose.model('User', userSchema)
