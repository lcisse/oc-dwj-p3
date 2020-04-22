//class chrono
class Chrono2 {
  constructor() {
    this.dureeInit = 60 * 20;
    this.decompte = 0;
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
    sessionStorage.setItem('timer', minute + " : " + seconde);
    sessionStorage.setItem('decompte1', this.decompte);    
  }

  getDecompte(){
    $(document).ready(function () { 
    let stockerDecompte = sessionStorage.getItem('decompte1');
    let getMinutSecond = sessionStorage.getItem('timer');
      if(stockerDecompte){
          $("#timer").html(getMinutSecond);      
      }
    })

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
        this.decompte = 1;
    }.bind(this));
  }

  clicRetact(){
    $("#retact").click(function () {
        this.stop(this.handle)
    }.bind(this))
  }

  initChrono2(){
    this.clicValider();
    this.getDecompte();
    this.clicRetact();
  }
}
//Fin de la classe