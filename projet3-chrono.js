    //class chrono
 class Chrono2{
  constructor(){
    this.dureeInit = 60 * 20;
  }

  decrement(){
      this.dureeInit -= 1;
  }

  start(){
    var handle = setInterval(function(){
        this.decrement()
       // console.log(this.dureeInit)
        //console.log(this.getMinute() + ':' + this.getSeconde());
       $("#timer").html(this.getMinute() + ':' + this.getSeconde());
       this.styleChrono();
       this.finReservation();
    }.bind(this), 1000);

    return handle
  }

  styleChrono(){
    if(this.getMinute() <10 && this.getSeconde()<10){
        $("#timer").html("0"+this.getMinute() +" : 0"+this.getSeconde());
        }
        else if(this.getMinute() <10 && this.getSeconde()>=10){
          $("#timer").html("0"+this.getMinute() +" : "+this.getSeconde());
        }
        else if(this.getMinute() >=10 && this.getSeconde()<10){
          $("#timer").html(+this.getMinute() +" : 0"+this.getSeconde());
        }
        else if(this.getMinute() >=10 && this.getSeconde()>10){
          $("#timer").html(+this.getMinute() +" : "+this.getSeconde());
        }
  }

  finReservation(){
    if(this.getMinute()===0 && this.getSeconde()===0){
        $("#ConteneurCompteur").css("display", "none");
        clearInterval(handle);
        $("#fondMap").css("display", "none");
        ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
        $('#submit').prop('disabled', true); //remettre le bonton valider non cliquable
        $('input').prop('disabled', false);
        $('#reserver').prop('disabled', false);
        //alert("C'est la fin de votre réservation.");
        $("#finReservation").css("display", "block");
        this.dureeInit = 60 * 20;
        setTimeout(function(){
            document.getElementById("finReservation").style.display = "none";
        }, 10000);
    }
    //alert(this.getSeconde());
  }

  getMinute(){
    return Math.floor(this.dureeInit / 60) ;
  }

  getSeconde(){
    return (this.dureeInit % 60) ;
  }

 stop(handle){
  clearInterval(handle);
  this.dureeInit = 60 * 20;
  $("#timer").html("00 : 00");
  $("#ConteneurCompteur").css("display", "none"); //Masquer le compteur en se retractant
  $("#fondMap").css("display", "none");
  this.ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);
  $('#submit').prop('disabled', true);
  $('input').prop('disabled', false);
  $('#reserver').prop('disabled', false);
 }
}



  //Début de l'exécution du script global
$(document).ready(function(){

  var chrono2 = new Chrono2()
  //var handle = null;

  var min = chrono2.getMinute()
  var sec = chrono2.getSeconde()
      
      chrono2.styleChrono();
      //chrono2.finReservation();

  $("#submit").click(function(){
    handle = chrono2.start()
    //chrono2.finReservation();
  });

  $("#retact").click(function(){
    chrono2.stop(handle)
  })

  chrono2.finReservation();


  /*$("#retact").click(function(){
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
  });*/


});





//  ancien chrono    
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