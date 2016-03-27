var JSONURL = 'https://spreadsheets.google.com/feeds/list/1xw_9m-HTc71WZoiQp0t3IO1s2WqeChAzS-72owVdZy0/1/public/basic?alt=json';

function callback(data){
    var rows;
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows = rowObj;
    }
    
    var raw = document.createElement('p');
    // raw.innerText = JSON.stringify(rows);
    document.body.appendChild(raw);
    console.log(rows)
    $('body').append(`The following information is for ${rows.shootnumber} from ${rows.productioncompany} `)
}

$(document).ready(function(){
    
    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });

});
