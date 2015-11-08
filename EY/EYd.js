      //making it get rid of the other images when a button is pushed
       window.onload=function() {
    
       // Now get all the tab panel container divs
	   document.getElementById('submit').onclick = displayChart;

	   }
	
	//this defines the names of the charts
	$(document).ready(function(){
        //alert("JQuery is working! :D");
		defaulta =new Array('');
		oandg=new Array('OPEC','Production by State', 'Retail Gas Price');
		uandp=new Array('');
		stocks=new Array('AAPL');
		demo=new Array('Population');
		economy=new Array('Consumer Sentiment')
		populateSelect();
		
		$('#industrydropdown').change(function(){
			populateSelect();
		});
	});
	
	//one of these for each industry dropdown
	function populateSelect(){
		industrydropdown=$('#industrydropdown').val();
		$('#chartdropdown').html('');
		
		if(industrydropdown=='DEFAULT'){
				defaulta.forEach(function(t) { 
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
		if(industrydropdown=='OANDG'){
				oandg.forEach(function(t) { 
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
	
		if(industrydropdown=='UANDP'){
				uandp.forEach(function(t) {
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
		if(industrydropdown=='STOCKS'){
				stocks.forEach(function(t) {
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
		if(industrydropdown=='DEMO'){
				demo.forEach(function(t) {
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
		if(industrydropdown=='ECON'){
				economy.forEach(function(t) { 
					$('#chartdropdown').append('<option>'+t+'</option>');
			});
		}
	} 


	function displayChart(){

		var industry = document.getElementById('industrydropdown').value;
		var	charttype = document.getElementById('chartdropdown').value;

		if(charttype == "OPEC"){
			drawGID();
		} else if (charttype == "Production by State"){
			drawProductionTree();
		} else if (charttype == "AAPL"){
			AppleStock();
		} else if (charttype == "Population"){
			drawRegionsMap();
		} else if (charttype == "Retail Gas Price"){
			GasPrice();
		} else if (charttype == "Consumer Sentiment"){
			ConsumerSentiment();
		}
		}	


    function drawGID() {
      	var queryString = encodeURIComponent('SELECT A, B')
      	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1-Sw1XkTtmFS3I3TkNHzIwg4q0Gpa4tG8crTNQq_ULms/edit#gid=0'+ queryString);
     		 
         //send the query and get the data
     		query.send(handleQueryResponse);

        function handleQueryResponse(response) {
         if (response.isError()) {
           alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
		}

        var data = response.getDataTable();
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        var options = {'title':'OPEC Oil Price',
                      'legend': 'none',
                      'width':600,
                      'height':300};
		
        chart.draw(data,options); 
    	}

        // to create a picture for exporting, etc.
      	//google.visualization.events.addListener(chart, 'ready', function () 
        //document.getElementById('png').outerHTML = '<a href="' + chart.getImageURI() + '">Printable version</a>';})
    }	

      //Geo chart
	function drawRegionsMap() {

		var dimension = "population";
		var options2 = {'title':'Production map',
                      'displayMode': 'regions',
                      'region': "US",
                      'resolution':"provinces",
                      'width':600,
                      'height':300};
		var statesArray = [["State",dimension]];
	
		$.ajax({
				url: "states.json",
				dataType: "JSON"
				}).done(function(data) {
					$.each(data.states, function() {
                    var stateitem = [this.abbrev, this[dimension]];
                    statesArray.push(stateitem);
					});
				var data2 =  google.visualization.arrayToDataTable(statesArray);
				var chart2 = new google.visualization.GeoChart(document.getElementById('curve_chart'));
				
				//drawing the chart
				chart2.draw(data2,options2);

		  }); 
	}	  

		function AppleStock() {

		var options3 = {'title':'AAPL Stock Price',
                      'legend': 'none',
                      'width':600,
                      'height':300};
					  
		var statesArray = [["Date","Open"]];

		$.ajax({
				url: "https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?trim_start=2010-01-01?auth_token=hq7deXWhVuNWkW3GRguE",
				dataType: "JSON"
				}).done(function(data) {
					$.each(data.data, function() {
                    var stateitem = [this[0], this[1]];
						statesArray.push(stateitem);
					});	
				
				var data3 =  google.visualization.arrayToDataTable(statesArray);
				var chart3 = new google.visualization.LineChart(document.getElementById('curve_chart'));

				//drawing the chart
				chart3.draw(data3,options3);

				});
    	}
		
		
	function GasPrice() {

		var options3 = {'title':'Retail Gasoline Price',
                      'legend': 'none',
                      'width':600,
                      'height':300};
					  
		var statesArray = [["Date","Price"]];

		$.ajax({
				url: "https://www.quandl.com/api/v1/datasets/EIA/PET_EMM_EPMRU_PTE_STX_DPG_W.json",
				dataType: "JSON"
				}).done(function(data) {
					$.each(data.data, function() {
                    var stateitem = [this[0], this[1]];
						statesArray.push(stateitem);
					});		
					
						
				var data3 =  google.visualization.arrayToDataTable(statesArray);
				data3.sort([{column: 0}]);
				var chart3 = new google.visualization.LineChart(document.getElementById('curve_chart'));

				//drawing the chart
				chart3.draw(data3,options3);

				});
		}
		
		
		function ConsumerSentiment() {

		var options3 = {'title':'Consumer Sentiment',
                      'legend': 'none',
                      'width':600,
                      'height':300};
					  
		var statesArray = [["Date","Index"]];

		$.ajax({
				url: "https://www.quandl.com/api/v1/datasets/UMICH/SOC1.json?trim_start=2010-01-01?auth_token=hq7deXWhVuNWkW3GRguE",
				dataType: "JSON"
				}).done(function(data) {
					$.each(data.data, function() {
                    var stateitem = [this[0], this[1]];
						statesArray.push(stateitem);
					});		
					
						
				var data3 =  google.visualization.arrayToDataTable(statesArray);
				data3.sort([{column: 0}]);
				var chart3 = new google.visualization.LineChart(document.getElementById('curve_chart'));

				//drawing the chart
				chart3.draw(data3,options3);

				});
		}
		
		
		
		function drawProductionTree() {
      	var queryString = encodeURIComponent('SELECT A, B, C')
      	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UDkcr29a4jAztdPFYGx_drw0Ga61VqyVhpdx65XijJ8/edit#gid=1007446976'+ queryString);
     		 
         //send the query and get the data
     	query.send(handleQueryResponse);

        function handleQueryResponse(response) {
         if (response.isError()) {
           alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
		}

        var data = response.getDataTable();
        var chart = new google.visualization.TreeMap(document.getElementById('curve_chart'));
        var options = {'title':'Oil Production',
					  'headerHeight': 15,
					  'minColor': '#fff',
					  'midColor': '#ddd',
					  'maxColor': '#0d0',
					  'maxDepth': '1',
					  'noHighlightColor':true,
					  'showScale':true,
					    'maxDepth': 1,
						'maxPostDepth': 2,
						'minHighlightColor': '#8c6bb1',
						'midHighlightColor': '#9ebcda',
						'maxHighlightColor': '#edf8fb',
						'minColor': '#009688',
						'midColor': '#f7f7f7',
						'maxColor': '#ee8100',
						'generateTooltip': showFullTooltip,
					  'width':600,
                      'height':300};
		
        chart.draw(data,options); 
    	
		
		function showFullTooltip(row, size, value) {
			return '<div style="background:#fd9; padding:10px; border-style:solid">' +
				'<span style="font-family:Courier"><b>' + 
				data.getValue(row, 0) + '</b>, ' + 
				data.getValue(row, 1) + ', ' +  '</span><br>' +
				'Datatable row: ' + row + '<br>' +
					data.getColumnLabel(0) +
				' (total value of this cell and its children): ' + size + '<br>';
		}
  
		}

        // to create a picture for exporting, etc.
      	//google.visualization.events.addListener(chart, 'ready', function () 
        //document.getElementById('png').outerHTML = '<a href="' + chart.getImageURI() + '">Printable version</a>';})
    }

	
		
    		
		
   

	





