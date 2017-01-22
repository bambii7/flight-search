/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const request = require('request');
const querystring = require('querystring');
const _ = require('underscore');

module.exports = {    
    airlines: function (req, res) {
        console.log('api:airlines');
        request.get('http://node.locomote.com/code-task/airlines').pipe(res)
    },
    airports: function (req, res) {
        let q = req.query.q,
            apiuri = 'http://node.locomote.com/code-task/airports?';
        
        if (!q) {
            return res.badRequest("missing query parameter `q`");
        }
        apiuri += querystring.stringify({q: q});
        console.log('api:airports', apiuri);
        request.get(apiuri).pipe(res)
    },
    flight_search: function (req, res) {
        let query, airline_code, apiuri;
        
        query = _.pick(req.body, 'date', 'from', 'to');
        airline_code = req.params.airline_code;
        if (!_.has(query, 'date', 'from', 'to')) {
            return res.badRequest("missing query parameter `from`, `to` or `date`");
        }
        query = querystring.stringify(query);
        apiuri = `http://node.locomote.com/code-task/flight_search/${airline_code}?${query}`

        console.log('api:flight_search', apiuri);
        request.get(apiuri).pipe(res)
    },
};

