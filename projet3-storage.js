//le local storage
/*class Storage {
    constructor(nomClient, prenomClient, nom, prenom,input, activerBoutonReservation){
        this.nomClient = nomClient;
        this.prenomClient = prenomClient;
        this.nom = nom;
        this.prenom = prenom;
        this.input = input;
        this.activerBoutonReservation = activerBoutonReservation;
        //this.value = value;
    }

    init = function(){
                this.nomClient.val(localStorage.getItem(this.nom))
                this.prenomClient.val(localStorage.getItem(this.prenom))
    }
    
    stocker(){

                this.nomClient.on(this.input,function(){
                    this.activerBoutonReservation
                    localStorage.setItem(this.nom,this.value)
                    console.log("salut la famille");
                })


                this.prenomClient.on(this.input,function(){
                    this.activerBoutonReservation
                    localStorage.setItem(this.prenom,this.value)
                    console.log("salut la famille");
                })

    }
}


let storage = new Storage(
        $('#nom-client'),
        $('#prenom-client'),
        'nom',
        'prenom',
        'input',
        activateButton(),
        //this.value
    )

//var init = function(){
            storage.init();
            //}

storage.localStorage();


*/

class Storage {
    constructor(){

    }

    stocker(key, value){
        localStorage.setItem(key, value)
                
    }
    
    lire(key){
       localStorage.getItem(key) 
    }
}

var storageFormulaire = new Storage();


    
    $('#nom-client').on('input',function(){
                activateButton()
                storageFormulaire.stocker('nom',this.value)
            })
    
    $('#prenom-client').on('input',function(){
                activateButton()
                storageFormulaire.stocker('prenom',this.value)
            })

var init = function(){
                $('#nom-client').val(storageFormulaire.lire('nom'))
                $('#prenom-client').val(storageFormulaire.lire('prenom'))
            }

/*
    ///////////////////////////////////////
var init = function(){
                $('#nom-client').val(localStorage.getItem('nom'))
                $('#prenom-client').val(localStorage.getItem('prenom'))
            }


            $('#nom-client').on('input',function(){
                    activateButton()
                    localStorage.setItem('nom',this.value)
            })

           $('#prenom-client').on('input',function(){
                    activateButton()
                    localStorage.setItem('prenom',this.value)
            })*/