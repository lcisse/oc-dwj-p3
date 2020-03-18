    //class chrono
/*
    class Chrono1{
          constructor(){
                this.secondes = 60;
                this.minutes = 19;
                this.timerID = ''; 
          }
          
          chronoF(){
            this.secondes -= 1;
           
            if(this.secondes<1){
              this.minutes -= 1;
              this.secondes = 59;
            }
           
            if(this.minutes<10 && this.secondes<10){
              $("#timer").html("0"+this.minutes+" : 0"+this.secondes);
            }
            else if(this.minutes<10 && this.secondes>=10){
                $("#timer").html("0"+this.minutes+" : "+this.secondes);
            }
            else if(this.minutes>=10 && this.secondes<10){
                $("#timer").html(+this.minutes+" : 0"+this.secondes);
            }
            else if(this.minutes>=10 && this.secondes>10){
                $("#timer").html(+this.minutes+" : "+this.secondes);
            }

            if(this.minutes===0 && this.secondes===1){
                divCompteur.style.display = "none"; //Masquer le compteur en se retractant
                clearInterval(this.timerID);
                //divSurLaCarte.style.display = "none";
                $("#fondMap").css("display", "none");
                ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
                $('input').prop('disabled', false);
                $('#reserver').prop('disabled', false);
                alert("C'est la fin de votre réservation.");
            }
          }


          startF(){
              this.timerID = setInterval(this.chronoF.bind(this), 1000);
              this.secondes = 60;
              this.minutes = 19;
          }

          resetF(){
              clearInterval(this.timerID);
              $("#timer").html("00 : 00");
              this.reset = true;
              //divCompteur.style.display = "none"; //Masquer le compteur en se retractant
              $("#ConteneurCompteur").css("display", "none"); //Masquer le compteur en se retractant
              //divSurLaCarte.style.display = "none";
              $("#fondMap").css("display", "none");
              $('#submit').prop('disabled', true);

          }

          demarerChrono(){
             this.startF();          
          }

          stopChrono(){
            this.resetF();
            ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);
          }
    }

    // fin de la class chrono1
//instance dans ready
$(document).ready(function(){
   
  var objetChrono = new Chrono1();
      
      objetChrono.chronoF();
      objetChrono.startF();
      objetChrono.resetF();


      $("#submit").click(function(){
        objetChrono.demarerChrono();
      });

      $("#retact").click(function(){
        objetChrono.stopChrono();
        $("input").prop('disabled', false);
        $('#reserver').prop('disabled', false);
      });

});
*/
//fin chrono