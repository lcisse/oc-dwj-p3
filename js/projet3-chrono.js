//class chrono
class Chrono2 {
  constructor() {
    this.dureeInit = 60 * 20;
  }

  decrement() {
    this.dureeInit -= 1;
  }

  start() {
    var handle = setInterval(function () {
      this.decrement()
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


    //session storage decompte
    let stockerDecompte = sessionStorage.getItem('decompte');
    sessionStorage.setItem('decompte', minute + " : " + seconde);
    if(stockerDecompte){
       document.getElementById('decompte').innerHTML = stockerDecompte;
    }
  }

  finReservation(handle) {
    if (this.getMinute() === 0 && this.getSeconde() === 0) {
      $("#ConteneurCompteur").css("display", "none");
      clearInterval(handle);
      $("#fondMap").css("display", "none");
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
    clearInterval(handle);
    this.dureeInit = 60 * 20;
    this.updateTimer('00','00')
    $("#ConteneurCompteur").css("display", "none"); //Masquer le compteur en se retractant
    $("#fondMap").css("display", "none");
    $('#submit').prop('disabled', true);
    $('input').prop('disabled', false);
    $('#reserver').prop('disabled', false);

  }

  clicValider(){
    $("#submit").click(function () {
        this.handle = this.start()
    }.bind(this));
  }

  clicRetact(){
    $("#retact").click(function () {
        this.stop(this.handle)
    }.bind(this))
  }

  initChrono2(){
    this.clicValider();
    this.clicRetact();
  }
}
//Fin de la classe