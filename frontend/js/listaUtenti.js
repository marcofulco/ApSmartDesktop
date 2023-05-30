query['listaUtenti.html']=new Array;
query['listaUtenti.html']['OFFSET']=0;
query['listaUtenti.html']['FETCH']=100;
query['listaUtenti.html']['MAXFETCH']=0;
query['listaUtenti.html']['COUNT']="id";
query['listaUtenti.html']['textBoxRicerca']="txtRicercaCliente";
query['listaUtenti.html']['modelloRiga']=elementiListaUtenti;

query['listaUtenti.html']['oggetti']=new Array;
query['listaUtenti.html']['oggetti']['{ID}']="id";
query['listaUtenti.html']['oggetti']['{descrizione1}']="d1";
query['listaUtenti.html']['oggetti']['{descrizione2}']="d2";
query['listaUtenti.html']['oggetti']['{ultimaAttivita}']="ultimaAttivita";

var parametriNC={"visMandante":0};
var ricerca="";

var tmr = setInterval(recuperaUtentiConnessi, 20000);

window.addEventListener("load", function(event) {
    recuperaParametri();
    recuperaUtentiConnessi();
});

function recuperaUtentiConnessi(){
    var parametri={"tipoQuery":"listaUtenti","tipoRisposta":"utentiAttivi","nomeQuery":"utentiAttivi","chiamante":"utentiAttivi","ricerca":false,"db":"login"}; 
    inviaRichiestaCentralino("query",parametri,elaborarecuperaUtentiConnessi);
}

function elaborarecuperaUtentiConnessi() {
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data[0]!=undefined){
        valorizzaHTMLElemento("divAttivi","Utenti Attivi<br>"+data[0].nr);
    } else {
        valorizzaHTMLElemento("divAttivi","Utenti Attivi<br>0");
    }
}

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
    inviaRichiestaCentralino("parametri",parametri,elaboraParametri);
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }
    
    carDatiListaClienti();
}

function elencoClientiScroll(ec, pagina, txtRicerca="") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".elenco"+tipoAnagrafica+".scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        AvviaCarDatiElencoClienti("elencoClienti","",false);
    }
}

var timer1;

function txtRicercaChange(input,ulID,sottoQuery,righe) {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        xRag="";
        
        ricerca=input.value;

        AvviaCarDatiElencoClienti("elencoClienti")

        clearTimeout(timer1); 
        
        inputID=input.getAttribute("id");

        salvaFiltro(inputID);
    }, 1000);
}

function carAttivi(){
    AvviaCarDatiElencoClienti("elencoClienti","",true,0,0,1);
}

function AvviaCarDatiElencoClienti(tipoRisposta,sottoQuery="",ricarica=true,righe=0,scrollTop=0, utilizzo=0){
    var nomeQuery=new String (nomePagina);
    
    if (sottoQuery!=''){
        nomeQuery+=":"+sottoQuery;
    }

    var maxFetch=0;
    
    if (query[nomeQuery]['MAXFETCH']){
        maxFetch=query[nomeQuery]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
    }

    if (query[nomeQuery]['OFFSET']>=maxFetch && maxFetch!=0) {
        return '';
    }

    if (ricarica){
        query[nomeQuery]['OFFSET']=0;
    }

    var parametri={"tipoQuery":"listaUtenti","tipoRisposta":tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca, "tipoElenco":righe, 
            "ricarica":ricarica, "scrollTop":scrollTop,"offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":tipoRisposta,"db":"login",
            "utilizzo":utilizzo
        }; 

    var nomeSession=nomeSessionJson(parametri);

    var md5=sessionStorage.getItem(nomeSession+".md5");
    if (md5!=undefined){
        parametri.md5=md5;
    }

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri);
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    var nomeSession=nomeSessionJson(parametri);
    var nomeOS=nomeSessionOffSet(parametri);

    if (parametri.md5==risp.md5){
        data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));
    } else {
        sessionStorage.setItem(nomeSession+".md5",risp.md5);
        sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
    }

    if (parametri.tipoRisposta=="elencoClienti"){
        sessionStorage.setItem(nomeOS+".offSet",parametri.offSet);
        query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];
    }

    popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop);

    elencoInCaricamento=0;
}

function nomeSessionJson(parametri){
    return nomePagina+"."+parametri.tipoRisposta+"."+parametri.ricerca+"."+parametri.offSet;
}

function nomeSessionOffSet(parametri){
    return nomePagina+"."+parametri.tipoRisposta+"."+parametri.ricerca;
}

function carDatiListaClienti(){    
    ricerca="";
    
    var filter=window.sessionStorage.getItem(nomePagina+".filter");
    var scroolTop=window.sessionStorage.getItem(nomePagina+".elenco.scroolTop");

    if (filter) {
        ricerca=filter;
        var txtRicerca=document.getElementById("txtRicercaCliente");
        txtRicerca.setAttribute("value",filter);
    }

    var tipoRisposta="elencoClienti";
    var parametri={"tipoQuery":"listaUtenti","tipoRisposta":tipoRisposta,"ricerca":ricerca,"nomeQuery":nomePagina,"tipoElenco":"elencoClienti",
        "scrollTop":scroolTop,"chiamante":tipoRisposta, "tipoElenco":0,"db":"login"
        }; 

    var nomeOS=nomeSessionOffSet(parametri);
    os=sessionStorage.getItem(nomeOS+".offSet");

    if (os>0){
        while (query[nomePagina]['OFFSET']<=os){
            parametri.offSet=query[nomePagina]['OFFSET'];
            var nomeSession=nomeSessionJson(parametri);
            parametri.ricarica=(query[nomePagina]['OFFSET']==0);

            data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));

            query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];

            popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop); 
        }

        if (scroolTop>0) {
            var ulCliente=document.getElementById("elencoClienti");
            ulCliente.scrollTop=scroolTop;
        }
    } else {
        AvviaCarDatiElencoClienti("elencoClienti","",(scroolTop>0),0,scroolTop);
    }
}

function apriSchedaCliente(e,idCli,ragSoc){
    if (idCli!=''){
        var parametri={"tipoQuery":"listaUtenti",
        "tipoRisposta":"schedaUtente",
        "nomeQuery":nomePagina+":schedaUtente",
        "userName":idCli,
        "chiamante":"schedaUtente","offSet":0,"fetch":0,"ricerca":'',"db":"login"}; 

        elencoInCaricamento=1;

        inviaRichiestaCentralino("multiQuery",parametri,elaboraApriScheda);
    } else {
        sessionStorage.removeItem("skUtente");
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="nuovoUtente.html";
        }else{
            window.open("nuovoUtente.html","_self");
        }
        
    }
}

function elaboraApriScheda(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data[0]==0){
        return;
    }

    sessionStorage.setItem("skUtente",JSON.stringify(data));

    window.open("nuovoUtente.html","_self");
}

function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        open ("mainPage.html",xTarget);
    }
}

function mailReset(userName,toAdmin=false){
    if (toAdmin==false){
        sessionStorage.setItem("utenteAttiva",userName);
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="passwordDimenticata.html?bp=listaUtenti.html";
        }else{
            window.open("passwordDimenticata.html?bp=listaUtenti.html","_self");
        }
    } else {
        fetch(xUrlPHP+"php/googleReCaptcha.php", {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "*/*",
                "Origin":"null"
            },
            body: 'txtUserName='+userName+'&bp=listaUtenti.html&noCaptcha='+gRe+'&g-recaptcha-response=&toAdmin=1'
        })
        .then(res=>res)
        .then(function (phpRes) {
            attivaAlert(xTipoAllert.SUCCESSO,"eMail di Reset inviata all'Amministratore!",);    
        });
    }
}

function eliminaUtente(e,userName,descrizione) {
    if (userName!=''){
        attivaAlert(5,"Sei sicuro di voler eliminare l'utente "+descrizione+"?","rispEliminaUtente_"+userName);        
    }
}

function rispEliminaUtente(risp, userName) {
    if (risp=="Si") {
        avviaEliminaUtente(userName);
    } else {
        chiudiModalAlert("rispEliminaUtente."+userName);
    }
}

function avviaEliminaUtente(userName) {
    const parametri={"tipoRisposta":"elimina", "tipoElimina":"utentiWeb", "dati":userName};
    inviaRichiestaCentralino("elimina", parametri, elaboraEliminaUtente);
}

function elaboraEliminaUtente(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante l'eliminazione dell'utente'","fineElimina");
        return "";
    }

    AvviaCarDatiElencoClienti("elencoClienti","",true);
}
