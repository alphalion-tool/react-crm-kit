'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// const date2YMDHM = require('../../config/utils/dateUtil').date2YMDHM;

/*
 * Account Schema
 */
const AccountSchema = new Schema({
    accountId: {
        type: Number,
        default: 0,
        index: { unique: true }
    },
    accountName: {
        type: String,
        default: ''
    },
    idType: {
        type: String,
        default: '', // passport | idcard
    },
    idNumber: {
        type: String,
        default: '',
    },
    level: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },

    mtime: {
        type: Date,
        default: Date.now
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: ObjectId,
        ref: 'User'
    }, // 创建者
    ext: {
        type: String,
        default: ''
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});


/**
 * Validations
 */

AccountSchema.path('accountName').validate(function(name) {
    return name.length;
}, 'Account Name cannot be blank');

// AccountSchema.virtual('ctime_str').get(function() {
//     return 'ctime_str';
// });

/**
 * Pre-save hook
 */
AccountSchema.pre('save', function(next) {
    if (!this.isNew) {
        next();
        return;
    }
    const Account = mongoose.model('Account');
    Account.find({
        accountId: this.accountId
    }).exec((err, accts) => {
        if (err) { 
            next(err);
        } else if (accts.length) {
            next(new Error('accountId already exists'));
        } else {
            next();
        }
    });
});

/**
 * Methods
 */
AccountSchema.methods = {

    // hasPermission: function(uid) {
    //     return this.creator === uid;
    // }
};

/**
 * Statics
 */

AccountSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function(options, cb) {
        options.select = options.select || Object.keys(AccountSchema.paths).join(' ');
        return this.findOne(options.conditions)
            .populate('creator', 'userId userName')
            .select(options.select)
            .exec(cb);
    },

    list: function(options, cb) {
        const conditions = options.conditions || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        const select = options.select || Object.keys(AccountSchema.paths).join(' ');
        // console.log(conditions, page, limit, select);
        return this.find(conditions)
            .populate('creator', 'userId userName')
            .sort({
                ctime: -1
            })
            .limit(limit)
            .skip(limit * page)
            .select(select)
            .exec(cb);
    },

    // get new account id
    newAccountId: function (cb) {
        let maxId = 1;
        return this.find({})
            .sort({
                accountId: -1
            })
            .limit(1)
            .select('accountId')
            .exec()
            .then((accts) => {
                if (accts && accts.length) {
                    maxId = accts[0].accountId + 1;
                }
                if (cb) cb(null, maxId);
                return maxId;
            }, (err) => {
                if (cb) cb(err);
                return err;
            });
    }
};

mongoose.model('Account', AccountSchema);
