$(function () {
    var searchForm = $('form[name=flightSearch]'),
        strToTime  = d3.timeParse('%d/%m/%Y');
    
    
        
    searchForm.submit(function (event) {
        var date = $('input[name=date]').val();
        
        console.log('searching flighs:', searchForm.serialize());
        console.log(date, strToTime(date));
        console.log(date, d3.timeDay.offset(strToTime(date), -24));
        
        event.preventDefault();
    })
})