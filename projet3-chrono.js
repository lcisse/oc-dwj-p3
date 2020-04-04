//class chrono
class Chrono2 {
  constructor(context) {
    this.dureeInit = 60 * 20;
    this.ctx = context;
  }

  decrement() {
    this.dureeInit -= 1;
  }

  start() {
    var handle = setInterval(function () {
      this.decrement()
      $("#timer").html(this.getMinute() + ':' + this.getSeconde());
      this.styleChrono();
      this.finReservation();
    }.bind(this), 1000);

    return handle
  }

  styleChrono() {

    let minute = this.getMinute()
    let seconde = this.getSeconde()

    if (minute < 10) {
      minute = "0" + minute
    }

    if (seconde < 10) {
      seconde = "0" + seconde
    }

    this.updateTimer(minute,seconde)
  }

  updateTimer(minute,seconde){
    $("#timer").html(minute + " : " + seconde);
  }

  finReservation() {
    if (this.getMinute() === 0 && this.getSeconde() === 0) {
      $("#ConteneurCompteur").css("display", "none");
      clearInterval(handle);
      $("#fondMap").css("display", "none");
      ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
      $('#submit').prop('disabled', true); //remettre le bonton valider non cliquable
      $('input').prop('disabled', false);
      $('#reserver').prop('disabled', false);
      $("#finReservation").css("display", "block");
      this.dureeInit = 60 * 20;
      setTimeout(function () {
        document.getElementById("finReservation").style.display = "none";
      }, 10000);
    }
  }

  getMinute() {
    return Math.floor(this.dureeInit / 60);
  }

  getSeconde() {
    return (this.dureeInit % 60);
  }

  stop(handle) {
    console.log(this)
    clearInterval(handle);
    this.dureeInit = 60 * 20;

    //$("#timer").html("00 : 00");
    this.updateTimer('00','00')

    $("#ConteneurCompteur").css("display", "none"); //Masquer le compteur en se retractant
    $("#fondMap").css("display", "none");
    this.ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);
    $('#submit').prop('disabled', true);
    $('input').prop('disabled', false);
    $('#reserver').prop('disabled', false);

  }
}
//Fin de la classe

//Début de l'exécution du script global
$(document).ready(function () {

  var canvas = new Canvas(); //Objet canvas
  canvas.init();

  var context = canvas.getContext();
  var chrono2 = new Chrono2(context)
  chrono2.getMinute()
  chrono2.getSeconde()
  chrono2.styleChrono()

  $("#submit").click(function () {
    handle = chrono2.start()
  });

  $("#retact").click(function () {
    chrono2.stop(handle)
  }.bind(chrono2))

  chrono2.finReservation();
});

//fin chrono