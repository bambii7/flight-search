$(function () {
    
    var $searchForm = $('form[name=flightSearch]'),
        $dateNav = $('#search-results ul'),
        $results = $('#search-results'),
        templateSource   = $("#result-template").html(),
        resultTemplate = Handlebars.compile(templateSource);
    
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
    $searchForm.submit(function (event) {
        var date = $('input[name=date]').val(), index = 3;
        
        $.post('/search', $searchForm.serialize(), function (results) {
            console.log('search results', results);
            $('#search-results li, #search-results .result-container').remove();
            index = Math.round((results.length - 1) / 2);
            for (i=0; i<results.length; i++) {
                var $resultEl = $('<div class="result-container">'),
                    $navEl = $('<li>' + results[i].date + '</li>');
                
                if (i === index) {
                    $resultEl.addClass('active');
                    $navEl.addClass('active');
                }
                
                $results.append($resultEl);
                $dateNav.append($navEl);
                for (var result in results[i].results) {
                    results[i].results.forEach(function (result) {
                        $resultEl.append(resultTemplate(result));
                    });
                }
            }
        });
        
        event.preventDefault();
    });
    
    // date nav tabs
    $('#search-results ul').delegate('li', 'click', function (event) {
        var $dateNavList = $('#search-results li'),
            $resultList = $('#search-results .result-container'),
            index = $dateNavList.index(event.target);
        $('#search-results li.active, #search-results .result-container.active').removeClass('active');
        $dateNavList.eq(index).addClass('active');
        $resultList.eq(index).addClass('active');
    });
})