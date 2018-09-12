'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
    userId: { type: Number, default: 0, index: { unique: true } },
    userName: { type: String, default: '' },
    email: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    description: { type: String, default: '' },
    gender: {
        type: String,
        default: 'm'
    },

    hashedPassword: { type: String, default: '' },
    salt: {
        type: String,
        default: ''
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    mtime: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    permission: {
        type: Object,
        default: {
            user: {
                add: true,
                view: true,
                edit: true,
                query: true
            },
        }
    }
});

const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

/**
 * Validations
 */

// the below 1 validations only apply if you are signing up traditionally
// UserSchema.path('userId').validate(function(userId) {
//     const User = mongoose.model('User');

//     // check userId is already exists
//     if (this.isNew || this.isModified('userId')) {
//         User.find({
//             userId: userId
//         }).exec(function(err, users) {
//             return !err && users.length === 0;
//         });
//     } else return true;
// }, 'userId already exists');


UserSchema.path('hashedPassword').validate(function(hashedPassword) {
    return hashedPassword.length && this._password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
    if (!this.isNew) { next(); return; }

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        let count = 0;
        const callNext = function () { if (count === 2) next(); }
        const User = mongoose.model('User');
        User.find({
            userId: this.userId
        }).exec((err, users) => {
            if (err) { 
                next(err);
            } else if (users.length) {
                next(new Error('userId already exists'));
            } else {
                count++;
                callNext();
            }
        });

        User.find({
            userName: this.userName
        }).exec((err, users) => {
            if (err) {
                next(err);
            } else if (users.length) {
                next(new Error('userName already exists'));
            } else {
                count++;
                callNext();
            }
        });

    }
});

/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return true;
        // return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return `${Math.round((new Date().valueOf() * Math.random()))}`;
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Load
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function(options, cb) {
        options.select = options.select || Object.keys(UserSchema.paths).join(' ');
        return this.findOne(options.conditions)
            .populate('creator', 'userId userName')
            .select(options.select)
            .exec(cb);
    },

    list: function(options, cb) {
        const conditions = options.conditions || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        const select = options.select || Object.keys(UserSchema.paths).join(' ');
        return this.find(conditions)
            .sort({
                ctime: -1
            })
            .limit(limit)
            .skip(limit * page)
            .select(select)
            .exec(cb);
    },

    // get new user id
    newUserId: function (cb) {
        let maxId = 1;
        return this.find({})
            .sort({
                userId: -1
            })
            .limit(1)
            .select('userId')
            .exec()
            .then((users) => {
                if (users && users.length) {
                    maxId = users[0].userId + 1;
                }
                if (cb) cb(null, maxId);
                return maxId;
            }, (err) => {
                if (cb) cb(err);
                return err;
            });
    }
};

mongoose.model('User', UserSchema);