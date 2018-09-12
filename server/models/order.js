'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

/*
 * Order Schema
            "index": 1,
            "orderId": 122,
            "status": "Filled",
            "side": "Buy",
            "currencyPair": "BTC-USD",
            "accountId": 129000,
            "accountName": "jack",
            "createTime": "2018-09-07 12:00:11",
            "quantity": 12.1023,
            "dealQuantity": 10.1820,
            "doneTime": "2018-09-07 13:00:11",
            "price": 8900,
            "orderType": "Limit"

 */

const OrderSchema = new Schema({
    orderId: {
        type: Number,
        default: 0,
        index: { unique: true }
    },
    status: {
        type: String,
        default: '', // can be Filled, PartOf or None,
    },
    accountId: {
        type: Number,
        default: 0,
    },
    currencyPair: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 0.00
    },
    dealQuantity: {
        type: Number,
        default: 0.00
    },
    side: {
        type: String,
        default: '', // buy or sell
    },
    orderType: {
        type: String,
        default: '',  // market or limit
    },
    price: {
        type: Number,
        default: 0.00
    },
    mtime: {
        type: Date,
        default: Date.now
    },
    ctime: {
        type: Date,
        default: Date.now
    },
    doneTime: {
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


OrderSchema.virtual('account', {
    ref: 'Account',
    localField: 'accountId',
    foreignField: 'accountId',
    justOne: true
});

/**
 * Validations
 */

/**
 * Pre-save hook
 */
OrderSchema.pre('save', function(next) {
    if (!this.isNew) {
        next();
        return;
    }
    const Order = mongoose.model('Order');
    Order.find({
        orderId: this.orderId
    }).exec((err, items) => {
        if (err) { 
            next(err);
        } else if (items.length) {
            next(new Error('orderId already exists'));
        } else {
            next();
        }
    });
});

/**
 * Methods
 */
OrderSchema.methods = {

    // hasPermission: function(uid) {
    //     return this.creator === uid;
    // }
};

/**
 * Statics
 */

OrderSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function(options, cb) {
        options.select = options.select || Object.keys(OrderSchema.paths).join(' ');
        return this.findOne(options.conditions)
            .populate('account', 'accountId accountName')
            .select(options.select)
            .exec(cb);
    },

    list: function(options, cb) {
        const conditions = options.conditions || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        const select = options.select || Object.keys(OrderSchema.paths).join(' ');
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

    // get new order id
    newOrderId: function (cb) {
        let maxId = 1;
        return this.find({})
            .sort({
                orderId: -1
            })
            .limit(1)
            .select('orderId')
            .exec()
            .then((items) => {
                if (items && items.length) {
                    maxId = items[0].orderId + 1;
                }
                if (cb) cb(null, maxId);
                return maxId;
            }, (err) => {
                if (cb) cb(err);
                return err;
            });
    }

};

mongoose.model('Order', OrderSchema);
