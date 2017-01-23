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
        var query = _.pick(req.body, 'date', 'from', 'to');
        
        if (!_.has(query, 'date', 'from', 'to')) {
            return res.badRequest("missing query parameter `from`, `to` or `date`");
        }
        
        query.date = Time.parse(query.date);
        
        SearchQuery.create(query)
            .then(function (search_query) {
                FlightSearchService.getAirlines()
                    .then(function (airlines) {
                        airlines = JSON.parse(airlines);
                        FlightSearchService.searchAirlinesByDateRange(airlines, search_query, [-2, 2])
                            .then(function (search_results) {
                                res.json(search_results);
                            }).catch(function (err) {
                                res.badRequest(err);
                            });
                    })
                    .catch(function (err) {
                        res.badRequest(err);
                    });
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

