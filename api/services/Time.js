'use strict';

const d3 = require('d3');
//import * as d3 from "d3";

module.exports = {
    parse: d3.timeParse('%d/%m/%y'),
    format: d3.timeFormat("%Y-%m-%d"),
    dayOffset: d3.timeDay.offset,
    range: d3.timeDay.range
}