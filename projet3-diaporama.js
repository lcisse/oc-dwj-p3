//le diaporama

class Diaporama{
    constructor(contenuDiaporama, imageArray, texteDiapo, slideInterval){
        this.contenuDiaporama = contenuDiaporama;
        this.imageArray = imageArray;
        this.texteDiapo = texteDiapo;
        this.slideInterval = slideInterval;
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

        /*stopImage() {
            console.log('la vie');
            clearInterval(this.slideInterval);
        }

        playImage() {
            console.log('la vie pourtant');
            //this.slideInterval = this.slideInterval;
        }*/

         
    }

var images =['image28','image35','carte2', 'image39', 'image38', 'image41'];


let monDiaporama = new Diaporama(
    document.getElementById("conteneur"), 
    images,
    ["Bienvenue !",
     "Utilisez également les flèches du clavier pour avancer ou réculer.",
     "Pour réserver, selectionnez une station à partir des marqueurs.",
     "Ensuite si un velo est disonible, remplissez le formulaire.", 
     "Enfin signez pour valider votre réservation.",
     "Nous vous souhaitons une bonne route."],
     slideIntervals    
    );

var slideIntervals = setInterval(monDiaporama.nextImage.bind(monDiaporama), 3000);

$('#gauche').on('click', function(event){
    monDiaporama.prewImage()
});

$('#droite').on('click', function(event){
    monDiaporama.nextImage()
});

$('#stop').on('click', function(event){
    //monDiaporama.stopImage()
    clearInterval(slideIntervals);
    
});

$('#play').on('click', function(event){
    //monDiaporama.playImage()
    slideIntervals = setInterval(monDiaporama.nextImage.bind(monDiaporama), 3000);
});

//Déplacer le diaporama avec les flèche du clavier
document.addEventListener("keydown", function(e){
    if(e.keyCode === 37){
        monDiaporama.prewImage();
    } else if(e.keyCode === 39){
                monDiaporama.nextImage();
            }
    });








/*
    ///////////////////////////////////////

var contenuDiaporama = document.getElementById("conteneur");

var image = ['image28','image35','carte2', 'image39', 'image38', 'image41'];

var texteDiapo = ["Bienvenue !",
                  "Utilisez également les flèches du clavier pour avancer ou réculer.",
                  "Pour réserver, selectionnez une station à partir des marqueurs.",
                  "Ensuite si un velo est disonible, remplissez le formulaire.", 
                  "Enfin signez pour valider votre réservation.",
                  "Nous vous souhaitons une bonne route."];

var slideInterval = setInterval(nextImage , 3000);

var i = image.length //+ slideInterval.length;

function nextImage(){
    	if (i<image.length) {
    		++i;
    	}else{
    		i = 1;
    	}
    	  contenuDiaporama.innerHTML = "<img src="+image[i-1]+".jpg>" + texteDiapo[i-1];
    }

function prewImage(){

    	if (i<image.length+1 && i>1) {
    		--i;
    	}else{
    		i = image.length;
    	}
    	  contenuDiaporama.innerHTML = "<img src="+image[i-1]+".jpg>" + texteDiapo[i-1];

    }

$('#gauche').on('click', function(event){
    prewImage()
});

$('#droite').on('click', function(event){
    nextImage()
});

function stopImage() {
        clearInterval(slideInterval);
    }

     function playImage() {
        slideInterval = setInterval(nextImage , 5000);
    }

$('#stop').on('click', function(event){
    stopImage()
});

$('#play').on('click', function(event){
    playImage()
});


//Déplacer le diaporama avec les flèche du clavier
document.addEventListener("keydown", function(e){
    if(e.keyCode === 37){
        prewImage();
    }
    else if(e.keyCode === 39){
        nextImage();
    }
    });

*/
