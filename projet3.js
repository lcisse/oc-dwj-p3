
//la carte interactive
class Map{
  constructor(){
      
  }

  static factory(element,lonlat,zoomLevel){
      return L.map(element).setView(lonlat,zoomLevel);
  }
}

//var mymap =  L.map('mapdiv').setView([47.2162, -1.5492], 15);
var mymap = Map.factory('mapdiv',[47.2162, -1.5492],15);

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
marker.bindPopup("<b>Velo restant </b>" + marker.veloRestant + "<br>");


// La requete AJAX
$.ajax({

    type: "GET",
    url: "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=c8ee751c6c7cf07c1d1ac13388abf822a7bef259",
    datatype: "json",
    success: parseData
}); 

function parseData(data){
    console.log(data);

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

//la reservation et les boutons du canvas
var reservationBouton = document.getElementById("reserver");
var affichageDuCanvas = document.getElementById("reservation");
var annulationReservation = document.getElementById("annuler");
var inputs = document.querySelectorAll("input");
var effacerLaSignature = document.getElementById("erase");
var divSurLaCarte = document.getElementById("fondMap");
    affichageDuCanvas.style.display = "none";

    reservationBouton.addEventListener("click", function(){
        affichageDuCanvas.style.display = "block"; 
        divSurLaCarte.style.display = "block";
    })

    effacerLaSignature.addEventListener("click", function(){ 
        
       $('#submit').prop('disabled', true); //rentre le bouton non cliquable en effacant la signature 
    })

    annulationReservation.addEventListener("click", function(){
        affichageDuCanvas.style.display = "none";
        ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
        $('#submit').prop('disabled', true); //rendre le bouton valider non cliquable
        divSurLaCarte.style.display = "none";
        $("input").prop('disabled', false);
    })

//la validation de la reservation
var validationBouton = document.getElementById("submit");
var stationReservation = document.getElementById("stationReserver");
var divCompteur = document.getElementById("ConteneurCompteur");
//var divSeRetracter = document.getElementById("retact");
    divCompteur.style.display = "none";

    validationBouton.addEventListener("click", function(){
        divCompteur.style.display = "block";
        affichageDuCanvas.style.display = "none";
        $('#reserver').prop('disabled', true);
        $('input').prop('disabled', true);
    })

    //le temps de la reservation
        $(document).ready(function(){
  var secondes = 60;
  var minutes = 19;
  var on = false;
  var reset = false;
 
  $("#submit").click(function(){
    Start();
    on = false;
  });
  /*$("#pause").click(function(){
    Stop();
  });*/
  $("#retact").click(function(){
    Reset();
  });
 
  function chrono(){
    secondes -= 1;
   
    if(secondes<1){
      minutes -= 1;
      secondes = 60;
    }
   
    if(minutes<10 && secondes<10){
      $("#timer").html("0"+minutes+" : 0"+secondes);
    }
    else if(minutes<10 && secondes>=10){
        $("#timer").html("0"+minutes+" : "+secondes);
    }
    else if(minutes>=10 && secondes<10){
        $("#timer").html(+minutes+" : 0"+secondes);
    }
    else if(minutes>=10 && secondes>10){
        $("#timer").html(+minutes+" : "+secondes);
    }

    if(minutes===0 && secondes===1){
        divCompteur.style.display = "none"; //Masquer le compteur en se retractant
        clearInterval(timerID);
        divSurLaCarte.style.display = "none";
        ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
        alert("C'est la fin de votre réservation.");
    }
  }
 
  function Start(){
    if(on===false){
      timerID = setInterval(chrono, 1000);
      secondes = 60;
      minutes = 19;
      on = true;
      reset = false;
    };
    return
  }
 
 /* function Stop(){
    if(on===true){
      on = false;
      clearTimeout(timerID);
    }
  }*/
 
  function Reset(){
    if(reset===false)
    {
      clearInterval(timerID);
      //secondes = 0;
      //minutes = 0;
      $("#timer").html("00 : 00");
      reset = true;
      divCompteur.style.display = "none"; //Masquer le compteur en se retractant
      ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
      divSurLaCarte.style.display = "none";
      $("input").prop('disabled', false);

      if ($('#nom-client').val().length === 0 && $('#prenom-client').val().length === 0) {
        $('#reserver').prop('disabled', true);
      }else{
        $('#reserver').prop('disabled', false);
      }
    }
  }
 
});


/*var appelCompteur = document.getElementById("appel")
    appelCompteur.addEventListener("click", function(){
        Start()
    })*/

//Fin du temps de la reservation


// Détection du support
const form = document.querySelector('form');


// Empêcher le form d'être soumis
form.addEventListener('submit', function(e) {
  e.preventDefault();
});

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




//fin du local storage

/*jQuery(document).ready(function($){
    //alert('Le chargement du DOM est terminé');
    if ($('#nom-client').val().length === 0 || $('#prenom-client').val().length === 0) {
        $('#reserver').prop('disabled', true);
      }else{
        $('#reserver').prop('disabled', false);
      }
});*/










    
    
