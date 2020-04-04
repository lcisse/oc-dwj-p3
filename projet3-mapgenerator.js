//la carte interactive
class MapGenerator{
    constructor(){
        
    }
  
    factory(element,lonlat,zoomLevel){
        return L.map(element).setView(lonlat,zoomLevel);
    }
  
    addLayerTo(map){
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic290aWJhIiwiYSI6ImNrMzR3Y3VpMjE0NmQzYnA5a3cxaTExbm4ifQ._5V7MpOr4Ivvza511fHK2w', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
      }).addTo(map);
    }
  }