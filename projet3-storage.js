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

