var parametriPrivacy=[];

window.addEventListener("load", function(event) {
    setTimeout( function() {
        recuperaParametri();
    }, 100);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 

    elencoInCaricamento=1;

    inviaRichiestaCentralino("parametri",parametri,elaboraRisposta,"divCorpo");
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriPrivacy[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriPrivacy[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    var contenuto=eval(parametriPrivacy["elementoPrivacy"]);
    if (contenuto!=undefined){
        valorizzaHTMLElemento("divPrivacy",contenuto);
    }
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="index.html";
    }else{
        window.open("login.html","_self");
    }
    
}

function salva(){
    if (recuperaCheckedElemento("chkPrivacy")==false){
        attivaAlert(2,"Accettare l'informativa Privacy per proseguire!");
        return;
    }

    var jSon={"id":xIdCliente,"PRIVACY":1};
    
    var parametri={"tipoSalva":"anagrafiche", "dati":jSon}; 

    inviaRichiestaCentralino("update",parametri,elaboraSalva);
}

function elaboraSalva(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        return "";
    }

    if (data==true){
        window.open("mainPage.html","_self");
    }
}