//le diaporama

class Diaporama{
    constructor(contenuDiaporama, imageArray, texteDiapo){
        this.contenuDiaporama = contenuDiaporama;
        this.imageArray = imageArray;
        this.texteDiapo = texteDiapo;
        this.slideInterval = "";
        this.i = this.imageArray.length; 
        } 
        
        nextImage(){
        if (this.i < this.imageArray.length) {
            ++ this.i;
        } else {
            this.i = 1;
        }
          this.contenuDiaporama.innerHTML = "<img src=" + this.imageArray[this.i-1]+".jpg>" + this.texteDiapo[this.i-1];
        }

        prewImage(){

            if (this.i < this.imageArray.length + 1 && this.i > 1) {
                -- this.i;
            } else {
                this.i = this.imageArray.length;
            }
              this.contenuDiaporama.innerHTML = "<img src=" + this.imageArray[this.i-1]+".jpg>" + this.texteDiapo[this.i-1];
        }

        stopImage() {
            clearInterval(this.slideInterval);
        }

        playImage() {
            this.slideInterval = setInterval(this.nextImage.bind(this) , 5000);
        }

        flecheClavier(e){
            if(e.keyCode === 37){
                this.prewImage();
            }else if(e.keyCode === 39){
                this.nextImage();
            }
        }         
}
//Fin de la classe diapo

var images =['image28','image35','carte2', 'image39', 'imagek', 'image41'];
var message =  ["Bienvenue !",
     "Utilisez également les flèches du clavier pour avancer ou réculer.",
     "Pour réserver, selectionnez une station à partir des marqueurs.",
     "Ensuite si un velo est disonible, remplissez le formulaire.", 
     "Enfin signez pour valider votre réservation.",
     "Nous vous souhaitons une bonne route."]

let monDiaporama = new Diaporama(
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

