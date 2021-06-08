const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const slug = require('slugs');
const UserSchema = new mongoose.Schema({
     fullName: {
          type: String,
          reqired: [true, 'Please add a firstName!']
     },

     slug: {
          type: String,
          unique: true
     },

     email: {
          type: String,
          required: [true, 'Please add an email!'],
          unique: true,
          match: [
               /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
               'Please add a valid email!'
          ]
     },

     password: {
          type: String,
          required: [true, 'Please add a password!'],
          minlength: 5,
          select: false,
     },
     phone: {
          type: String,
          maxlength: 14,
          validate: {
               validator: function (v) {
                    return /^((\+)?(\d{2}[-]))?(\d{10}){1}?$/.test(v);
               },
               message: '{VALUE} is not a valid phone number!'
          },
          required: [false, 'Phone number required']
     },

     address: {
          type: String
     },

     verified: {
          type: Boolean,
          default: 0
     },
     verificationCode: String,


     account_status: {
          type: Boolean,
          default: 1
     },


     lastLogin: String,
     resetPasswordToken: String,
     resetPasswordExpire: Date,




}, { timestamps: true });


UserSchema.pre('save', async function (next) {
     if (!this.isModified('password')) {
          next();
     }

     this.slug = slug(this.fullName);
     const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
     const usersWithSlug = await this.constructor.find({ slug: slugRegEx });
     if (usersWithSlug.length) {
          this.slug = `${this.slug}-${usersWithSlug.length + 1}`;
     }


     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)

});


//creating JWT token
UserSchema.methods.getSignedJwtToken = async function () {
     return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
          expiresIn: process.env.JWT_EXPIRE
     });

}




UserSchema.methods.matchPassword = async function (enteredPassword) {


     return await bcrypt.compare(enteredPassword, this.password);//return true or false

}

//generate and hash password token
UserSchema.methods.getResetPasswordToken = async function () {

     //generate token
     const resetToken = crypto.randomBytes(20).toString('hex');

     //hash token and set it to resetPasswordToken field
     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

     //set token expire
     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;//10 minute

     //NOTE: controller ma await user.save() gareko le resetPasswordExpire database ma save hunxa

     //returning original reset token
     return resetToken;

}


module.exports = mongoose.model('User', UserSchema);