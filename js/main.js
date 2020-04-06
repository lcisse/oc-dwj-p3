//Debut Diapo
var images =['image28','image35','carte2', 'image39', 'imagek', 'image41'];
var message =  ["Bienvenue !",
     "Utilisez également les flèches du clavier pour avancer ou réculer.",
     "Pour réserver, selectionnez une station à partir des marqueurs.",
     "Ensuite si un velo est disonible, remplissez le formulaire.", 
     "Enfin signez pour valider votre réservation.",
     "Nous vous souhaitons une bonne route."]

let monDiaporama = new Diaporama( // objet diapo
    document.getElementById("conteneur"), 
    images,
    message,   
    );

monDiaporama.playImage();

$('#gauche').on('click', function(event){
    monDiaporama.prewImage();
});

$('#droite').on('click', function(event){
    monDiaporama.nextImage();
});

$('#stop').on('click', function(event){
    monDiaporama.stopImage();
});

$('#play').on('click', function(event){
    monDiaporama.playImage();
});
//Déplacer le diaporama avec les flèche du clavier
$(document).on("keydown", function(e){
    monDiaporama.flecheClavier(e);
});
//Fin Diapo

var canvas = new Canvas(); //Objet canvas
    canvas.init();
var context = canvas.getContext();

//Formulaire
var formulaire = new Formulaire(context);//Objet formulaire

formulaire.blocReservCompteur();
formulaire.activationBoutonForm();

$("#reserver").on("click", function(){
     formulaire.boutonReserver();   
})

$("#erase").on("click", function(){        
     formulaire.boutonErase();   
})

$("#annuler").on("click", function(){ //quand la revertion est annulée
     formulaire.boutonAnnuler();
})

$("#submit").on("click", function(){
     formulaire.boutonValider();
})

$('form').on('submit', function(e) {
     formulaire.empechForm(e);
});
//Fin formulaire

//chrono
var chrono2 = new Chrono2()

$("#submit").click(function () {
    handle = chrono2.start()
});
                               
$("#retact").click(function () {
    chrono2.stop(handle)
}.bind(chrono2))
//Fin chrono2

//storage
let storage = new Storage();
storage.getLocal(); 

$('#nom-client').on('input',function(){
formulaire.activationBoutonForm();
localStorage.setItem('nom',this.value);
})

$('#prenom-client').on('input',function(){
formulaire.activationBoutonForm();
localStorage.setItem('prenom',this.value);
})
//fin storage


//Map
var mapgenerator = new MapGenerator();
var mymap = mapgenerator.factory('mapdiv',[47.2162, -1.5492],15);
mapgenerator.addLayerTo(mymap);

//creation d'icon
var greenIcon = L.icon({
    iconUrl: 'markerVelo.png',
    iconSize:     [48, 55], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
    iconUrl: 'iconRed.png',
    iconSize:     [68, 75], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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

        if(data[i].available_bikes < 0){
          marker = L.marker([lat, lng], {icon: redIcon});
        }
            
        marker.addTo(mymap);
        marker.bindPopup(nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation);

        marker.on('click',function(e){
        //populer la div
        let infoStation = document.getElementById('stationSelectionnee');
        let veloReserver = document.getElementById('velo-reserver');
            infoStation.style.fontSize = "1.2em";
            infoStation.innerHTML = nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation;
            veloReserver.innerHTML = data[i].name; 

            $("input").prop('disabled', false); //Saisir son nom qu'aprés avoir selectionne une station 

            //les conditions a respecter quand une station est selectionnnee
            if ($('#nom-client').val().length === 0 || $('#prenom-client').val().length === 0) {
            $('#reserver').prop('disabled', true);
            }else{
            $('#reserver').prop('disabled', false);
            }

            if(data[i].available_bikes < 0){      //afficher ce message au paneau si il n'y a pas de velo dispo 
              infoStation.innerHTML = "Aucun velo n'est disponible dans cette station";
              infoStation.style.color = "#F75518 ";
              infoStation.style.fontSize = "1.5em";
              $("input").prop('disabled', true);
              $('#reserver').prop('disabled', true);
            }else {
              infoStation.style.color = "black ";
            }
          sessionStorage.setItem('infoStation', infoStation.innerHTML)
          sessionStorage.setItem('veloReserver', veloReserver.innerHTML)
        });
      }
    } 
}); 

// Fin de la map 
