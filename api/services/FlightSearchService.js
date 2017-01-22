/**
 * FlightApi
 *
 * @description :: Server-side logic for managing Flight Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const request = require('request-promise');
const querystring = require('querystring');

module.exports = {
    
    getAirlines: function () {
        console.log('api:airlines');
        return request.get('http://node.locomote.com/code-task/airlines');
    },
    
    getAirports: function (q) {
        let query = querystring.stringify({q: q}),
            apiuri = `http://node.locomote.com/code-task/airports?${query}`;
        
        console.log('api:airports', apiuri);
        return request.get(apiuri);
    },
    
    searchAirline: function (airline, q) {
        let query = querystring.stringify(q),
            apiuri = `http://node.locomote.com/code-task/flight_search/${airline}?${query}`;
        
        console.log('api:flight_search', apiuri);
        return request.get(apiuri);
    }
    
};