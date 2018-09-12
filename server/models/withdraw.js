'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

/*
 * Deposit Schema
 * // "id": 12,
// "status": "Pending",
// "accountId": 1123,
// "accountName": "jasmine",
// "quantity": 1234.97,
// "currency": "BTC",
// "ctime": "2018-09-08 12:00:01",
// "finishTime": "2018-09-08 14:00:46",
// "address": "1MFUPo2vRih3XkRDCiSzGiirQh2PXb8tkj"
 */

const WithdrawSchema = new Schema({
    depositId: {
        type: Number,
        default: 0,
        index: { unique: true }
    },
    status: {
        type: String,
        default: '', // can be pending or Finish
    },
    accountId: {
        type: Number,
        default: 0,
        // type: ObjectId,
        // ref: 'Account'
    },
    quantity: {
        type: Number,
        default: 0.00
    },
    currency: {
        type: String,
        default: ''
    },
    address: {
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
    finishTime: {
        type: Date,
        default: Date.now
    },
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


WithdrawSchema.virtual('account', {
    ref: 'Account',
    localField: 'accountId',
    foreignField: 'accountId',
    justOne: true // for many-to-1 relationships
});

/**
 * Validations
 */

/**
 * Pre-save hook
 */
WithdrawSchema.pre('save', function(next) {
    if (!this.isNew) {
        next();
        return;
    }
    const Deposit = mongoose.model('Deposit');
    Deposit.find({
        depositId: this.depositId
    }).exec((err, items) => {
        if (err) { 
            next(err);
        } else if (items.length) {
            next(new Error('depositId already exists'));
        } else {
            next();
        }
    });
});

/**
 * Methods
 */
WithdrawSchema.methods = {

    // hasPermission: function(uid) {
    //     return this.creator === uid;
    // }
};

/**
 * Statics
 */

WithdrawSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function(options, cb) {
        options.select = options.select || Object.keys(WithdrawSchema.paths).join(' ');
        return this.findOne(options.conditions)
            .populate('account', 'accountId accountName')
            .select(options.select)
            .exec(cb);
    },

    list: function(options, cb) {
        const conditions = options.conditions || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        const select = options.select || Object.keys(WithdrawSchema.paths).join(' ');
        // console.log(conditions, page, limit, select);
        return this.find(conditions)
            .populate('account', 'accountId accountName')
            .sort({
                ctime: -1
            })
            .limit(limit)
            .skip(limit * page)
            .select(select)
            .exec(cb)
    },

    // get new deposit id
    newDepositId: function (cb) {
        let maxId = 1;
        return this.find({})
            .sort({
                depositId: -1
            })
            .limit(1)
            .select('depositId')
            .exec()
            .then((items) => {
                if (items && items.length) {
                    maxId = items[0].depositId + 1;
                }
                if (cb) cb(null, maxId);
                return maxId;
            }, (err) => {
                if (cb) cb(err);
                return err;
            });
    }

};

mongoose.model('Withdraw', WithdrawSchema);
