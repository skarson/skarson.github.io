var sdk, census

(function(){

var grayscale = L.tileLayer.provider('CartoDB.Positron');
var map = L.map('map', {
	center: [34.0116, -118.4923], //Austin!
    zoom: 13,
	layers: [grayscale]
});
	

var sdk = new CitySDK();
var census = sdk.modules.census;

//enabling the census API
var apiKey = prompt("Please enter your Census API Key", "API key");
census.enable(apiKey);

censusSDK();
//income();

//adding tracts to the map
function censusSDK(){

	var request = {"sublevel":true,
					"state": "CA",
					"level": "tract",
					"lat": 34.0116,
                    "lng": -118.4923,
                    "container": "place"
	};
					
	var callback = function(response){
		L.geoJson(response, {
				fillColor: '#56DD54',
				weight: 1,
				opacity: 0.7,
				color: '#44A048',
				fillOpacity: 0.7,
				onEachFeature: onEachFeature
		}).addTo(map);
	
	function onEachFeature(feature) {
			if(feature.properties){
				
				var tract = feature.properties.TRACT;
				var lat = feature.properties.INTPTLAT;
				var lon = feature.properties.INTPTLON;
			
				var request2 = {
					"state":"CA",
					"level":"tract",
					"sublevel":true,
					"tract": tract,
					"lat": lat,
					"lng": lon,
					 variables: [ 
                     "income_per_capita", 
                     "population"
					]};
	
				census.APIRequest(request2, function(response) { 
					var inc = Number(response.data[0].income_per_capita).toLocaleString('en');
					var pop = Number(response.data[0].population).toLocaleString('en');
					L.marker([feature.properties.INTPTLAT, feature.properties.INTPTLON]).bindPopup("Medain Income in " + feature.properties.TRACT + " is " + inc + " the population is " + pop).addTo(map);
				});	
			}			
		}	
	};

	census.GEORequest(request,callback); 
	

};

function income(intract, lat, lon) {	
		
		var tract = intract;
		var lat = lat;
		var lon = lon;
 		var request = {
					"state":"CA",
					"level":"tract",
					"sublevel":true,
					"tract": tract,
					"lat": lat,
					"lng": lon,
					 variables: [ 
                     "income", 
                     "population"
					]};
	
             census.APIRequest(request, function(response) { 
                var message = census.aliases.income.description + ": " + Number(response.data[0].income).toLocaleString('en') + " and "  + census.aliases.population.description + ": " + Number(response.data[0].population).toLocaleString('en'); 
				var inc = Number(response.data[0].income).toLocaleString('en');
				return inc;
			}); 
         };
		 
})();