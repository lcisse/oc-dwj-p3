//la map
/*
class Map{
	constructor(mapdiv, latView, lngView, zoom, photoIcon, ajaxURL, data, type, typedata){
		//this.container = $(container);
        this.mapdiv = mapdiv;
        this.latView = latView;
        this.lngView = lngView;
        this.zoom = zoom;
        this.photoIcon = photoIcon;
        this.ajaxURL = ajaxURL;
        this.data = data;
        this.type = type;
        this.typedata = typedata;
        //this.latAll = data[i].position.lat;
        //this.lngAll = data[i].position.lng;
        //this.nomStation = 'Station : ' + data[i].name;
        //this.addresseStation ='Adresse : ' +  data[i].address;
        //this.nombrePlaceStation ='Nombre de place : ' +  data[i].bike_stands;
        //this.veloDisponibleStation ='Vélos disponobles : ' +  data[i].available_bikes;
        this.mymap = L.map(this.mapdiv).setView([this.latView, this.lngView], this.zoom);
        //this.marker = L.marker([this.latAll, this.lngAll], {icon: this.greenIcon});
        this.marker1 = L.marker([this.latView, this.lngView]);
        this.infoStation = document.getElementById('stationSelectionnee');
        this.veloReserver = document.getElementById('velo-reserver');
        this.tilelayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic290aWJhIiwiYSI6ImNrMzR3Y3VpMjE0NmQzYnA5a3cxaTExbm4ifQ._5V7MpOr4Ivvza511fHK2w', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'your.mapbox.access.token'
        });
        this.greenIcon = L.icon({
            iconUrl: this.photoIcon,
            iconSize:     [48, 55], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
	} // fin constructeur

    tileLayerL(){
    	console.log("la life")
    	this.tilelayer.addTo(this.mymap);
    	console.log(this.marker1)
    	this.marker1.addTo(this.mymap);
    }
    requeteAjax(){
    	console.log("la life")
    	$.ajax({
            type: "GET",
            url: this.ajaxURL,
            datatype: "json",
            success: this.parseData
        });
    }
    

    parseData(data){
        console.log('ca va ma vie');
//Afficher les station et les marqueur
for (let i = 0; i < data.length; i++) {

    let lat = data[i].position.lat;
    let lng = data[i].position.lng; 
    let nomStation = 'Station : ' + data[i].name;
    let addresseStation ='Adresse : ' +  data[i].address;
    let nombrePlaceStation ='Nombre de place : ' +  data[i].bike_stands;
    let veloDisponibleStation ='Vélos disponobles : ' +  data[i].available_bikes;

    this.marker.addTo(this.mymap);
    this.marker.bindPopup(nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation);


    this.marker.on('click',function(e){
    //populer la div
    this.infoStation.style.fontSize = "1.2em";
    this.infoStation.innerHTML = nomStation + "<br>" + addresseStation + "<br>" + nombrePlaceStation + "<br>" + veloDisponibleStation;
    this.veloReserver.innerHTML = data[i].name; 

        $("input").prop('disabled', false); //Saisir son nom aprés avoir selectionne une station 

        //les conditions a respecter quand une station est selectionnnee
        if ($('#nom-client').val().length === 0 || $('#prenom-client').val().length === 0) {
            $('#reserver').prop('disabled', true);
        }else{
            $('#reserver').prop('disabled', false);
        }

        sessionStorage.setItem('station', this.infoStation.innerHTML)
    })
}

}

}

//Fin de la class Map

var map = new Map('mapdiv', 47.2162, -1.5492, 15,'markerVelo.png',
    "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=c8ee751c6c7cf07c1d1ac13388abf822a7bef259",
    //"GET", "json",
    )

map.tileLayerL();
map.requeteAjax();
map.parseData();
*/