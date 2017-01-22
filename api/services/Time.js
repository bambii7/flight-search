'use strict';

const d3 = require('d3');
//import * as d3 from "d3";

module.exports = {
    timeParse: d3.timeParse('%d/%m/%y'),
    timeFormat: d3.timeFormat("%Y-%m-%d"),
    strToTime: function (str) {
        let datetime = this.timeParse(str)
        return this.timeFormat(datetime)
    }
}