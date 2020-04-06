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