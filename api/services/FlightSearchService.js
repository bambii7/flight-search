/**
 * FlightApi
 *
 * @description :: Server-side logic for managing Flight Searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const request = require('request-promise');
const querystring = require('querystring');
const _ = require('underscore');

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
        let apiuri = `http://node.locomote.com/code-task/flight_search/${airline}?${q.toParams()}`;
        console.log('api:flight_search', apiuri);
        return request.get(apiuri);
    },
    
    searchAirlines: function (airlines, q) {
        var airline_searches = [];
        return new Promise(function (resolve, reject) {
            airlines.forEach(function (airline) {
                let promise = FlightSearchService.searchAirline(airline.code, q);
                airline_searches.push(promise);
            });
            Promise.all(airline_searches)
                .then(function (search_results) {
                    search_results = search_results.map(JSON.parse);
                    search_results = _.flatten(search_results, true);
                    resolve({
                        results: search_results,
                        date: q.dateNice()
                    });
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    },
    
    searchAirlinesByDateRange: function (airlines, q, range_offset) {
        var date_range, from, to,
            queries = [],
            searches = [];
        from = q.dayOffset(range_offset[0]);
        to = q.dayOffset(range_offset[1] + 1);
        date_range = Time.range(from, to);
        
        return new Promise((resolve, reject) => {
            date_range.forEach((date) => {
                q.date = date;
                queries.push(SearchQuery.create(q.toObject()));
            });  
            Promise.all(queries).then((queries) => {
                queries.forEach((q) => {
                    let promise = FlightSearchService.searchAirlines(airlines, q);
                    searches.push(promise);
                })
                Promise.all(searches)
                    .then((results) => {
                        resolve(results)
                    })
                    .catch((err) => {
                        reject(err);
                    });    
            })
            .catch((err) => {
                reject(err);
            });
        });

    }
    
};