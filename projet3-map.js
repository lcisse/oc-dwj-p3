var mymap = L.map('mapdiv').setView([47.2162, -1.5492], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic290aWJhIiwiYSI6ImNrMzR3Y3VpMjE0NmQzYnA5a3cxaTExbm4ifQ._5V7MpOr4Ivvza511fHK2w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//modification du marqueur
var greenIcon = L.icon({
    iconUrl: 'markerVelo.png',

    iconSize:     [48, 55], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
 
var marker = L.marker([47.2162, -1.5492], {icon: greenIcon});//creation marqueur

marker.addTo(mymap);
marker.bindPopup("<b>Velo restant </b>" + marker.veloRestant + "<br>");*/


// La requete AJAX
$.ajax({

    type: "GET",
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=c8ee751c6c7cf07c1d1ac13388abf822a7bef259",
    datatype: "json",
    success: parseData
}); 

function parseData(data){
    console.log(data);*/

//Afficher les station et les marqueur
for (let i = 0; i < data.length; i++) {
    let lat = data[i].position.lat;
    let lng = data[i].position.lng; 
    let nomStation = 'Station : ' + data[i].name;
    let addresseStation ='Adresse : ' +  data[i].address;
    let nombrePlaceStation ='Nombre de place : ' +  data[i].bike_stands;
    let veloDisponibleStation ='Vélos disponobles : ' +  data[i].available_bikes;

    var marker = L.marker([lat, lng], {icon: greenIcon});//creation marqueur

    marker.addTo(mymap);
    marker.bindPopup(nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation);


    marker.on('click',function(e){*/
    //populer la div
    let infoStation = document.getElementById('stationSelectionnee');
    let veloReserver = document.getElementById('velo-reserver');
        infoStation.style.fontSize = "1.2em";
        infoStation.innerHTML = nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation;
        veloReserver.innerHTML = data[i].name; 

        $("input").prop('disabled', false); //Saisir son nom aprés avoir selectionne une station 

        //les conditions a respecter quand une station est selectionnnee
        if ($('#nom-client').val().length === 0 || $('#prenom-client').val().length === 0) {
        $('#reserver').prop('disabled', true);
        }else{
        $('#reserver').prop('disabled', false);
      }

      sessionStorage.setItem('station', infoStation.innerHTML)
});
   
}
}  

var map = new Map('mapdiv', 47.2162, -1.5492, 15,'markerVelo.png',
    "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=c8ee751c6c7cf07c1d1ac13388abf822a7bef259",
    //"GET", "json",
    )

map.tileLayerL();
map.requeteAjax();
map.parseData();
