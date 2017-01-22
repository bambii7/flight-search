$(function () {
    var searchForm = $('form[name=flightSearch]'),
        timeParse  = d3.timeParse('%d/%m/%Y'),
        timeFormat = d3.timeFormat("%Y-%m-%d");
    
    var dateNav = $('#search-results li');
    
    
    var templateSource   = $("#result-template").html();
    var resultTemplate = Handlebars.compile(templateSource);
    
    // typeahead
    var airports = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'airports?q=%QUERY',
            wildcard: '%QUERY'
        }
    });
    
    $('.airport-typeahead').typeahead(null, {
        name: 'airports',
        display: 'cityCode',
        source: airports,
        minLength: 2,
        templates: {
            empty: '<div class="empty-message">unable to find any Airports that match</div>',
            suggestion: Handlebars.compile('<div><strong>{{cityCode}}</strong> – {{airportName}}</div>')
        }
    });
    
    // flight search
    searchForm.submit(function (event) {
        var date = $('input[name=date]').val();
        
        $.post('/search', searchForm.serialize(), function (results) {
            console.log('search results', results);
            results.forEach(function (result) {
                $('#search-results').append(resultTemplate(result));
            });
        });
        
//        console.log('searching flighs:', searchForm.serialize());
//        console.log(date, timeParse(date));
//        console.log(date, d3.timeDay.offset(timeParse(date), -24));
        
        event.preventDefault();
    });
    
    
    // date nav tabs
    dateNav.click(function (event) {
        var index = dateNav.index(event.target);
        $('#search-results li.active').removeClass('active');
        dateNav.eq(index).addClass('active');
    });
})