//le local storage
class Storage {
    constructor(){
        this.nom = 'nom';
        this.prenom = 'prenom';
        this.nomClient = $('#nom-client');
        this.prenomClient = $('#prenom-client');
    }

    getLocal(){
        let recupererNom = localStorage.getItem(this.nom);
        let recupererPrenom = localStorage.getItem(this.prenom); 
            this.nomClient.val(recupererNom);
            this.prenomClient.val(recupererPrenom);


            document.getElementById('visiteur').innerHTML = recupererPrenom + " " + recupererNom;

            
    }

    setNomPrenom(){
        this.nomClient.on('input',function(){
            localStorage.setItem(this.nom, $('#nom-client').val());
        }.bind(this))

        this.prenomClient.on('input',function(){
            localStorage.setItem(this.prenom, $('#prenom-client').val());
        }.bind(this))
    } 

    /*recupererReserv(){
        sessionStorage.setItem('reservation', $('#timer').html());

    }*/

    initStorage(){
        this.getLocal();
        this.setNomPrenom();
        //this.recupererReserv();
    }   
}
//Fin de la class local storage




