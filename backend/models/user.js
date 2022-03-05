const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

// Role is 1: Admin, 2: Others

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    photo: String,
    role: Number,
    dateofregistration: Date,
    hasLoggedIn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gender:{ type: String, required: true },
    mobile: {type: Number, required:true},
    phone: {type: Number, required:true}
});


userSchema.pre('save', function (next) {
    let user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                }

                user.password = hash;
                next();

            })
        })
    }
    else {
        return next();
    }
})

userSchema.methods.comparePassword = function (password, next) {
    let user = this
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', userSchema);