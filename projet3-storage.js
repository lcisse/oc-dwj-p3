//le local storage
class Storage {
    constructor(){
        this.nom = 'nom';
        this.prenom = 'prenom';
        this.nomClient = $('#nom-client');
        this.prenomClient = $('#prenom-client');
    }

    getLocal(){
        this.nomClient.val(localStorage.getItem(this.nom))
        this.prenomClient.val(localStorage.getItem(this.prenom))
    }    
}
//Fin de la class local storage

let storage = new Storage();

$(document).ready(function(){
    storage.getLocal(); 
})

$('#nom-client').on('input',function(){
    formulaire.activationBoutonForm();
    localStorage.setItem('nom',this.value);
})

$('#prenom-client').on('input',function(){
   formulaire.activationBoutonForm();
   localStorage.setItem('prenom',this.value);
})
