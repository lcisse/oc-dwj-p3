//Debut Diapo
var images =['images/image28','images/image35','images/carte2', 'images/image39', 'images/imagek', 'images/image41'];
var message =  ["Bienvenue !",
     "Utilisez également les flèches du clavier pour avancer ou reculer.",
     "Pour réserver, sélectionnez une station à partir des marqueurs.",
     "Ensuite, si un vélo est disponible, remplissez le formulaire.", 
     "Enfin, signez pour valider votre réservation.",
     "Nous vous souhaitons une bonne route."]

let monDiaporama = new Diaporama( // objet diapo
    document.getElementById("conteneur"), 
    images,
    message,   
    );

    monDiaporama.playImage();
//Fin Diapo

var canvas = new Canvas(); //Objet canvas
    canvas.init();
    
var formulaire = new Formulaire();//Objet formulaire
    formulaire.initForm();

var chrono2 = new Chrono2()
    chrono2.initChrono2();

let storage = new Storage();
    storage.initStorage(); 

//Map
var mapgenerator = new MapGenerator();
var mymap = mapgenerator.factory('mapdiv',[47.2162, -1.5492],15);
    mapgenerator.addLayerTo(mymap);

var ajax = new Ajax();
    ajax.requeteAjax();
