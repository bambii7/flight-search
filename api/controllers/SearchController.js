/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const _ = require('underscore');

module.exports = {    
    
    search: function (req, res) {
        var query = _.pick(req.body, 'date', 'from', 'to'),
            airline_searches = [];
        
        if (!_.has(query, 'date', 'from', 'to')) {
            return res.badRequest("missing query parameter `from`, `to` or `date`");
        }
        
        query.date = Time.strToTime(query.date);
        
        FlightSearchService.getAirlines()
            .then(function (airlines) {
                airlines = JSON.parse(airlines);
                airlines.forEach(function (airline) {
                    let promise = FlightSearchService.searchAirline(airline.code, query);
                    airline_searches.push(promise);
                });
                Promise.all(airline_searches).then(function (search_results) {
                    search_results = search_results.map(JSON.parse);
                    search_results = _.flatten(search_results, true);
                    res.json(search_results);
                }).catch(function (err) {
                    res.badRequest(err);
                });
            })
            .catch(function (err) {
                res.badRequest(err);
            });
    }, 
    
    airlines: function (req, res) {
        FlightSearchService.getAirlines().pipe(res);
    },
    
    airports: function (req, res) {
        let q = req.query.q;
        if (!q) {
            return res.badRequest("missing query parameter `q`");
        }
        FlightSearchService.getAirports(q).pipe(res)
    }
    
};

