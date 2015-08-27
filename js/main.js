//Code to add Basemaps
        var mapboxtoken= 'pk.eyJ1IjoiY3J1emluNzN2dyIsImEiOiI3RDdhUi1NIn0.jaEqREZw7QQMRafKPNBdmA' //Token to use mapbox services, please change with yours if forking
        var streets =  L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token='+mapboxtoken); 
        var stamen = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png'); //Adds stamen toner-lite layer
        
        //Code to make map with starting location and basemaps
        var map = L.map('map', {
            center: [34.052234, -118.243685],
            zoom: 13,
            layers: [stamen]});
        var baselayers ={
            "Stamen":stamen,
            "Streets":streets
        }
        
        L.control.layers(baselayers).addTo(map); //This adds a control button to change basemaps
        
        //Create locations for geojson
        var lapddivision="data/lapd-divisions.geojson";
        var lapdcarareas="data/lapd-basic-car-areas.geojson";
        var lapdcarareas_cent="data/lapdpatrol_centroid.geojson";
        var lapdareamarkers= L.layerGroup();
        
        //Code to parse LAPD Contact List to array 
        var csvload="data/lapdcontactlist.csv";
        
        Papa.parse(csvload, {
            header: true,
            download: true,
            complete: function(results) {

        //Adds text labels as markers using info from parsed CSV and geojson latlng
        $.getJSON(lapdcarareas_cent, function(data) {
        var Layer = L.geoJson(data, {
            style:{
                fillColor:"#ff7f00",
                color: "#000",
                weight: 0,
                opacity: 0,
                fillOpacity: 0.8
            },
            pointToLayer: function(feature, latlon) {
                var findcontact= function(contactname){
                for (var i = 0, len = results.data.length; i < len; i++) {
                    if (results.data[i].cararea === contactname)
                        return "Patrol Area: " + results.data[i].cararea
                        +"<p class='openlist'>Senior Lead: "
                        +results.data[i].sl_name
                        +"<br>Phone: "
                        +results.data[i].sl_ph
                        +"<br>Email: "
                        +results.data[i].sl_email
                        +"</p>"; // Return as soon as the object is found
                }
                    return contactname; // Returns Patrol Area Name if no info found
                }
                
                return L.marker(latlon,{
                    icon: L.divIcon({
                        iconSize:[300,100],
                        iconAnchor:[150,50],
                        className: 'text-cararea',   // Set class for CSS styling
                        html: findcontact(feature.properties.name)
                    })
                });
            }
            
        }).addTo(lapdareamarkers);
        console.log(lapdareamarkers);
        });
            }
        }); //End of parsing and adding markers      
        
    
        //Styles and loads LAPD divisions
        $.getJSON(lapdcarareas, function(data) {
        var Layer = L.geoJson(data, {
            style:areaStyle,
            onEachFeature: function (feature, layer) {
                layer.on("click", function (e){
                map.fitBounds(layer.getBounds());   
                });
                layer.on("mouseover", function (e) {
                    $( "p.openlist" ).toggleClass( "open" )
                    layer.setStyle(highlightStyle);
                });
                layer.on("mouseout", function (e) {
                    layer.setStyle(areaStyle);
                });
            }
        }).addTo(map);
        });

        var areaStyle = {
            color: '#FFF', 
            weight: 3,
            opacity: 0.6,
            fillOpacity: 0.3,
            fillColor: '#014982'
        };
        
        var highlightStyle = {
            color: '#014982', 
            weight: 3,
            opacity: 0.6,
            fillOpacity: 0.65,
            fillColor: '#014982'
        };
        
        //Styles and loads LAPD divisions
        $.getJSON(lapddivision, function(data) {
        var Layer = L.geoJson(data, {
            style:{
            clickable: false,
            fill:false,
            color: "#014982",
            weight: 4,
            opacity: 1,
            },
            onEachFeature: function (feature, layer) {
                L.marker([layer.getBounds().getCenter().lat,layer.getBounds().getCenter().lng],{
                    clickable: false,
                    icon: L.divIcon({
                        iconSize:[150,100],
                        iconAnchor:[75,50],
                        className: 'text-labels',   // Set class for CSS styling
                        html: feature.properties.name+" Division"
                    })
                }).addTo(map);
            }
        }).addTo(map);
        });

        
        //Function to display patrol area markers at defined zoom levels
        map.on('zoomend', function () {
            if (map.getZoom() < 14 && map.hasLayer(lapdareamarkers)) {
                map.removeLayer(lapdareamarkers);
            }
            if (map.getZoom() > 13 && map.hasLayer(lapdareamarkers) == false)
            {
                map.addLayer(lapdareamarkers);
            }});