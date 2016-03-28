var JSONURL = 'https://spreadsheets.google.com/feeds/list/1xw_9m-HTc71WZoiQp0t3IO1s2WqeChAzS-72owVdZy0/1/public/basic?alt=json';

function callback(data){
    var rows;
    var cells = data.feed.entry;
    
    //Cells.length controls which row
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
    //raw.innerText = JSON.stringify(rows);
    document.body.appendChild(raw);
    console.log(rows)
    console.log(rowObj)
    $('body').append(`Hello all,`)
    $('body').append(`<br/>`)
    $('body').append(`<br/>`)
    $('body').append(` The following information is for shootnumber ${rows.shootnumber} from ${rows.productioncompany}. `)
    $('body').append(`Please show up at ${rows.locationofshoot} on ${rows.date}, at ${rows.breakfast} A.M. `)
    $('body').append(`<br/>`)
    $('body').append(`<br/>`)
    $('body').append(`Cheers,`)
    $('body').append(`<br/>`)
    $('body').append(`Steve Karson, ${rows.productionmobilenumbers}`)
}

$(document).ready(function(){
    
    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });

});
