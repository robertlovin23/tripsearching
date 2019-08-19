/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event.
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var infos = [];
var locations = [
  [
        'Dallas, TX', 
        'This is a majestic southwestern city known for its charm and fashion taste.',
         32.7767,
        -96.7970,
        "<img class='window-image' src='img/dallas.jpg'>",
        "<li class='food-list'>Mesa Maya</li>, <li class='food-list'>El Fenix</li>, <li class='food-list'>Freebirds</li>"
  ],
  [
        'Denver, CO', 
        'A city for its towering mountain landscape and for its culinary delights.',
         39.7392,
        -104.9903,
        '<img class="window-image" src="img/denver.jpg">',
        "<li class='food-list'>Casa Bonita</li>, <li class='food-list'>Illegal Petes</li>, <li class='food-list'>Osterio Marco</li>"
  ],
  [
        'Austin, TX', 
        'Austin is the state capital of Texas, an inland city bordering the Hill Country region. Home to the University of Texas flagship campus, Austin is known for its eclectic live-music scene centered around country, blues and rock',
        30.2672,
        -97.7431,
        '<img class="window-image" src="img/austin.jpg">',
        "<li class='food-list'>Torchy's</li>, <li class='food-list'>Cabo Bob's Burritos</li>, <li class='food-list'>Iron Cactus</li>"
  ], 
  [
        "Kansas City, MO", 
        "A Midwestern delight with more fountains than Rome. Known for amazing barbeque and hospitality.", 
        39.0997,
        -94.5786,
        '<img class="window-image" src="img/kansas-city.jpg">',
        "<li class='food-list'>Joe's Kansas City Bar-B-Que</li>, <li class='food-list'>Granite City Food and Brewery</li>, <li class='food-list'>Pigwich</li>"
  ],
  [
        "Oklahoma City, OK", 
        "Oklahoma City is the capital of the U.S. state of Oklahoma. It's known for its cowboy culture and capitol complex, surrounded by working oil wells. ",
        35.4675,
        -97.5164,
        '<img class="window-image" src="img/okc.jpg">',
        "<li class='food-list'>Empire Pizza</li>, <li class='food-list'>Nourished Food Bar</li>, <li class='food-list'>Hatch Early Mood Food</li>"
  ], 
  [
        "Salt Lake City, UT", 
        "Salt Lake City, Utah’s high-elevation capital, is bordered by the buoyant waters of the Great Salt Lake and the snow-capped peaks of the Wasatch Range. ",
        40.7607,
        -111.891045,
        '<img class="window-image" src="img/saltlake.jpg">',
        "<li class='food-list'>Red Iguana</li>, <li class='food-list'>The Roof</li>, <li class='food-list'>The Copper Onion</li>"
  ],
  [
        "Santa Fe, NM", 
        "Santa Fe, New Mexico’s capital, sits in the Sangre de Cristo foothills. It’s renowned for its Pueblo-style architecture and as a creative arts hotbed. ",
        35.6869,
        -105.937798,
        '<img class="window-image" src="img/santafe.jpg">',
        "<li class='food-list'>The Sink</li>, <li class='food-list'>Maria's New Mexican Kitchen</li>, <li class='food-list'>El Farol</li>"
  ]
];
  var Latitude = undefined;
  var longitude = undefined;

  function initMap(latitude, longitude) {

    var myOptions = {
      center: new google.maps.LatLng(33.890542, 151.274856),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var map = new google.maps.Map(document.getElementById("map"),
        myOptions);

    setMarkers(map,locations)

  }
  var onMapSuccess = (position) => {
        latitude = position.coord.latitude;
        longitude = position.coords.longitude;

        latlngset(Latitude, Longitude)
  }
  function setMarkers(map,locations){

      var marker, i

for (i = 0; i < locations.length; i++)
 {  

 var name = locations[i][0]
 var desc = locations[i][1]
 var lat = locations[i][2]
 var long =  locations[i][3]
 var img =  locations[i][4]
 var food = locations[i][5]
 
 var latlngset = new google.maps.LatLng(lat, long);

    var marker = new google.maps.Marker({  
          map: map, 
          title: name, 
          position: latlngset  
        });
        map.setCenter(marker.getPosition())


    var content =  '<h5 class = "content-title titles">' +
                        name + 
                        '</h5>' +  
                        img +
                        '<br>'+ 
                        '<p class = "content-title">'+
                        desc +
                        '</p>' +
                        '<p class = "content-title titles"><b>Food</b></p>'+
                        food +
                        '<div id="city-list"></div>'



    var infoWindow = new google.maps.InfoWindow()
        
       
google.maps.event.addListener(marker,'click', (function(marker,content,infoWindow){ 
    return function() {
        
        /* close the previous info-window */
        closeInfos();
        
        infoWindow.setContent(content);
        infoWindow.open(map,marker);
        
        /* keep the handle, in order to close it on next click event */
        infos[0]=infoWindow;
        
        };
    })(marker,content,infoWindow)); 

  }
}
var onMapWatchSuccess = (position) => {
      var updatedLatitude = position.coord.latitude;
      var updatedLongitude = position.coord.longitude;

      if (updatedLatitude != Latitude && updatedLongitude != Longitude){
            Latitude = updatedLatitude;
            Longitude = updatedLongitude;

           initMap(updatedLatitude, updatedLongitude);
      }
}

function onMapError(error) {
      console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
function getMapLocation() {
      navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true});
}
function closeInfos(){
 
   if(infos.length > 0){
 
      /* detach the info-window from the marker*/
      infos[0].set("marker", null);
 
      /* and close it */
      infos[0].close();
 
      /* blank the array */
      infos.length = 0;
   }
}

