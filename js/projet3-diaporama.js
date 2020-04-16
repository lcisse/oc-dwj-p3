//le diaporama
class Diaporama{
    constructor(conteneurDiaporama, imageArray, texteDiapo){
        this.conteneurDiaporama = conteneurDiaporama;
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
          this.conteneurDiaporama.innerHTML = "<img src=" + this.imageArray[this.i-1]+".jpg>" + this.texteDiapo[this.i-1];
        }

        prewImage(){

            if (this.i < this.imageArray.length + 1 && this.i > 1) {
                -- this.i;
            } else {
                this.i = this.imageArray.length;
            }
              this.conteneurDiaporama.innerHTML = "<img src=" + this.imageArray[this.i-1]+".jpg>" + this.texteDiapo[this.i-1];
        }

        stopImage() {
            clearInterval(this.slideInterval);
        }

        playImage() {
            this.slideInterval = setInterval(this.nextImage.bind(this) , 5000);
            this.clicBouton();
        }

        flecheClavier(e){
            if(e.keyCode === 37){
                this.prewImage();
            }else if(e.keyCode === 39){
                this.nextImage();
            }
        }

        clicBouton(){
            $('#gauche').on('click', function(event){
                this.prewImage();
            }.bind(this));

            $('#droite').on('click', function(event){
                this.nextImage();
            }.bind(this));

            $('#stop').on('click', function(event){
               this.stopImage();
            }.bind(this));

            $('#play').on('click', function(event){
                this.playImage();
            }.bind(this));

            //Déplacer le diaporama avec les flèche du clavier
            $(document).on("keydown", function(e){
                this.flecheClavier(e);
            }.bind(this));
        }         
}
//Fin de la classe diapo