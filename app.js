
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var magnitude = [];
    var lon = [];
    var lat = [];
    var place = [];
d3.json(url, function(data) {
    mydata = data.features
    console.log(mydata)
    mydata.forEach(d => {
        magnitude.push(d.properties.mag)
        lon.push(d.geometry.coordinates[0])
        lat.push(d.geometry.coordinates[1])
        place.push(d.properties.place)
    })

    var myMap = L.map("map", {
        center: [34.0522, -118.2437],
        zoom: 5
    });
      
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
    }).addTo(myMap);
    
    function decideColor(scale){
        if (scale < 2.5) {
            return '#FF99FF'
        } else if (scale < 5.5) {
            return '#FF00FF'
        } else if (scale < 7.0) {
            return '#FF0099'
        } else {
            return '#660066'
        }
    }
    
    for (var i = 0; i < magnitude.length; i++) {
        L.circle([lat[i],lon[i]], {
            fillOpacity: 0.75,
            color: decideColor(magnitude[i]),
            fillColor: decideColor(magnitude[i]),
            radius: magnitude[i]*5000
        }).bindPopup("<h3>" + place[i] + "</h3> <br> <h3> Magnitude: " + magnitude[i] + "</h3>")
        .addTo(myMap);
    }
    
    var legend = L.control({
        position: "bottomright"
    });
   
    legend.onAdd = function() {
        var div = L
            .DomUtil
            .create("div", "info legend");
    
        var grades = [2.5, 5.5, 7.0, 7.9];
        var colors = [
            "#FF99FF",
            "#FF00FF",
            "#FF0099",
            "#660066",
        ];
    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
    };
    
    legend.addTo(myMap);
});






// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);