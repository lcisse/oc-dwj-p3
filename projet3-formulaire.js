//La class formualaire
class Formulaire{
  constructor(){
      this.reservation = $("#reservation");
      this.fondMap = $("#fondMap");
      this.submit = $('#submit');
      this.input = $("input");
      this.reserver = $('#reserver');
      this.ConteneurCompteur = $("#ConteneurCompteur");
      this.valeurInputNom = $('#nom-client');
      this.valeurInputPrenom = $('#prenom-client');
  }
  
  blocReservCompteur(){
     this.reservation.css("display", "none");
     this.ConteneurCompteur.css("display", "none");
  }
  boutonReserver(){
     this.reservation.css("display", "block"); // afficher le canvas
     this.fondMap.css("display", "block"); //rentre la map non cliquable
  }

  boutonErase(){
     this.submit.prop('disabled', true); //rentre le bouton valider non cliquable en effacant la signature
  }

  boutonAnnuler(){
      this.reservation.css("display", "none"); //masquer le canvas
      this.ctx.clearRect(0, 0, document.getElementById('canvas-sign').width, document.getElementById('canvas-sign').height);//reunitialisation de la signature
      this.submit.prop('disabled', true); //rendre le bouton valider non cliquable
      this.fondMap.css("display", "none"); // enlever le bloc sur la map et le rendre cliquable
      this.input.prop('disabled', false);
  }

  boutonValider(){
      this.ConteneurCompteur.css("display", "block");
      this.reservation.css("display", "none"); //masquer le canvas
      this.reserver.prop('disabled', true);
      this.input.prop('disabled', true);
  }

  activationBoutonForm(){
      if( this.valeurInputNom.val().length >= 1 && this.valeurInputPrenom.val().length >= 1){
        console.log("code")
        this.reserver.prop('disabled', false);
      }else{
        this.reserver.prop('disabled', true);
        this.reservation.hide()
    }
  }

  empechForm(e){
       e.preventDefault();
  }

}
//Fin de la classe formulaire

var formulaire = new Formulaire();

formulaire.blocReservCompteur();
formulaire.activationBoutonForm();

$("#reserver").on("click", function(){
     formulaire.boutonReserver();   
})

$("#erase").on("click", function(){        
     formulaire.boutonErase();   
})

$("#annuler").on("click", function(){ //quand la revertion est annulée
     formulaire.boutonAnnuler();
})

$("#submit").on("click", function(){
     formulaire.boutonValider();
})

$('form').on('submit', function(e) {
     formulaire.empechForm(e);
});

//Fin instance de la classe formulaire