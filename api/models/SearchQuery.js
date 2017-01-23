/**
 * SearchQuery.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
'use strict';

const querystring = require('querystring');

module.exports = {

    attributes: {
        from: 'string',
        to: 'string',
        date: 'datetime',
        toParams: function () {
            let obj = this.toObject();
            obj.date = Time.format(this.date);
            return querystring.stringify(obj);
        },
        dayOffset: function (day) {
            return Time.dayOffset(this.date, day);
        },
        dateNice: function () {
            return Time.format(this.date);
        }
    }
    
};

