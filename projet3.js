
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

//var mymap =  L.map('mapdiv').setView([47.2162, -1.5492], 15);
var mapgenerator = new MapGenerator();
var mymap = mapgenerator.factory('mapdiv',[47.2162, -1.5492],15);
mapgenerator.addLayerTo(mymap);

//modification du marqueur
var greenIcon = L.icon({
    iconUrl: 'markerVelo.png',

    iconSize:     [48, 55], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([47.2162, -1.5492], {icon: greenIcon});//creation marqueur

marker.addTo(mymap);
marker.bindPopup("<b>Velo restant </b>" + marker.veloRestant + "<br>");


// La requete AJAX
$.ajax({

    type: "GET",
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=c8ee751c6c7cf07c1d1ac13388abf822a7bef259",
    datatype: "json",
    success: function (data){

    
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


        marker.on('click',function(e){
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
}); 

// Fin de la map 





/*
$("#reservation").css("display", "none"); //masquer le canvas

$("#reserver").on("click", function(){
        $("#reservation").css("display", "block"); // afficher le canvas
        $("#fondMap").css("display", "block"); //rentre la map non cliquable  
})

$("#erase").on("click", function(){        
       $('#submit').prop('disabled', true); //rentre le bouton valider non cliquable en effacant la signature 
})

$("#annuler").on("click", function(){ //quand la revertion est annulée
        $("#reservation").css("display", "none"); //masquer le canvas
        ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
        $('#submit').prop('disabled', true); //rendre le bouton valider non cliquable
        $("#fondMap").css("display", "none"); // enlever le bloc sur la map et le rendre cliquable
        $("input").prop('disabled', false);
})

$("#ConteneurCompteur").css("display", "none"); // masquer le bloc compteur

$("#submit").on("click", function(){
    $("#ConteneurCompteur").css("display", "block");
    $("#reservation").css("display", "none"); //masquer le canvas
    $('#reserver').prop('disabled', true);
    $('input').prop('disabled', true);
})
*/

//const form = document.querySelector('form');

// Empêcher le form d'être soumis
/*$('form').on('submit', function(e) {
  e.preventDefault();
});*/
/*
var activateButton = function(){
    let valeurInputNom = $('#nom-client').val();
    let valeurInputPrenom = $('#prenom-client').val();
    if( valeurInputNom.length >= 1 && valeurInputPrenom.length >= 1){
        console.log("code")
        $('#reserver').prop('disabled', false);
    }else{
        $('#reserver').prop('disabled', true);
        $('#reservation').hide()
    }
}
*/




/*
//chr2
 class Chrono2{
  constructor(){
    this.dureeInit = 60 * 20;
    //transformer en affichage digital sur la page web
    //pour obtenir des minutes il faut utiliser la division euclidienne module   %
    // le reste de la division va te donner les seconde
    //arrange toi pour afficher la durée exprimées en seconde en affichage minute et secondes.
  }

  decrement(){
      this.dureeInit -= 1;
  }

  start(){
    var handle = setInterval(function(){
        this.decrement()
    }.bind(this), 1000);

    console.log(this.dureeInit)
    return handle
 }

 stop(handle){
  clearInterval(handle)
 }
}

  //Début de l'exécution du script global
$(document).ready(function(){

  var chrono2 = new Chrono2()
  var handle = null;

  $("#submit").click(function(){
    handle = chrono2.start()
  });

  $("#retact").click(function(){
    chrono2.stop(handle)
  })


  $("#retact").click(function(){
    chrono.Reset(h);
          
      $("#timer").html("00 : 00");
      divCompteur.style.display = "none"; //Masquer le compteur en se retractant
      ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
      divSurLaCarte.style.display = "none";
      $("input").prop('disabled', false);

      if ($('#nom-client').val().length === 0 && $('#prenom-client').val().length === 0) {
        $('#reserver').prop('disabled', true);
      }else{
        $('#reserver').prop('disabled', false);
      }
  });


});


//fin chr2
*/

//Fin du temps de la reservation




