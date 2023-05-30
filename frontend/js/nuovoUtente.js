query['nuovoUtente.html']=new Array;
query['nuovoUtente.html']['oggetti']=new Array;
query['nuovoUtente.html']['oggetti']['txtUserName']="userName";
query['nuovoUtente.html']['oggetti']['txtNome']="nome";
query['nuovoUtente.html']['oggetti']['txtCognome']="cognome";
query['nuovoUtente.html']['oggetti']['txteMail']="eMail";
query['nuovoUtente.html']['oggetti']['cmbGruppo']="idGruppoUtenti";
query['nuovoUtente.html']['oggetti']['cmbTipoUrlApiLogin']="tipoUrlApiLogin";
query['nuovoUtente.html']['oggetti']['elencoServer']="server";

query['nuovoUtente.html:elencoServer']=new Array;
query['nuovoUtente.html:elencoServer']['OFFSET']=0;
query['nuovoUtente.html:elencoServer']['FETCH']=100;
query['nuovoUtente.html:elencoServer']['MAXFETCH']=0;
query['nuovoUtente.html:elencoServer']['COUNT']="id";
query['nuovoUtente.html:elencoServer']['modelloRiga']=elementiNuovoServer;
query['nuovoUtente.html:elencoServer']['oggetti']=new Array;
query['nuovoUtente.html:elencoServer']['oggetti']['{ID}']="ID";
query['nuovoUtente.html:elencoServer']['oggetti']['{dConfigurazione}']="dConfigurazione";
query['nuovoUtente.html:elencoServer']['oggetti']['{azienda}']="azienda";
query['nuovoUtente.html:elencoServer']['oggetti']['{deposito}']="deposito";
query['nuovoUtente.html:elencoServer']['oggetti']['{idAgente}']="idAgente";
query['nuovoUtente.html:elencoServer']['oggetti']['{idVettore}']="idVettore";
query['nuovoUtente.html:elencoServer']['oggetti']['{idCliente}']="idCliente";
query['nuovoUtente.html:elencoServer']['oggetti']['{idConfigurazione}']="idConfigurazione";
query['nuovoUtente.html:elencoServer']['oggetti']['{listino}']="listino";
query['nuovoUtente.html:elencoServer']['oggetti']['{listinoTipo}']="listinoTipo";
query['nuovoUtente.html:elencoServer']['oggetti']['{descrizioneS}']="descrizioneS";

query['nuovoUtente.html:elencoServerM']=new Array;
query['nuovoUtente.html:elencoServerM']['oggetti']=new Array;
query['nuovoUtente.html:elencoServerM']['oggetti']['txtIDServer']="ID";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtDesServer']="dConfigurazione";
query['nuovoUtente.html:elencoServerM']['oggetti']['cmbServer']="idConfigurazione";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtAzienda']="azienda";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtDeposito']="deposito";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtAgente']="idAgente";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtVettore']="idVettore";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtCliente']="idCliente";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtListino']="listino";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtListinoTipo']="listinoTipo";
query['nuovoUtente.html:elencoServerM']['oggetti']['txtDescrizioneS']="descrizioneS";

var parametriNC={"obbligatori":"txtUserName;txtNome;txteMail;cmbGruppo;", "alternativi":"", "alternativi1":"", "nascosti":";"};

var skUtente=sessionStorage.getItem("skUtente");

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var div=document.getElementById("divTitolo");
        
        if (skUtente!=undefined){
            div.innerHTML="MODIFICA ";
            document.getElementById("txtUserName").disabled=true;
        } else {
            div.innerHTML="NUOVO ";
        }

        div.innerHTML+="UTENTE";

        recuperaParametri();
        avviaCarDati("cmbGruppo");
        avviaCarDati("cmbServer");

    }, 50);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 

    elencoInCaricamento=1;

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

    if (parametriNC.nascosti!=''){
        m=parametriNC.nascosti.split(";");
        for (x in m){
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) {
                
            }
        }
    }
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbGruppo":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"gruppiUtenti", "select":selectID, "db":"login"};
        break;
        case "cmbServer":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"configurazioniBase", "select":selectID, "db":"login"};
        break;
    }   

    parametri.md5=localStorage.getItem(selectID+".md5");

    inviaRichiestaCentralino("query",parametri);
}

var risposte=0;

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    risposte+=1;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            if (risposte==6 && idModifica>0){
                carDatiAnag();
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);

    if (parametri.select!="cmbServer"){
        popolaSelectDaJSON(data,parametri.select);
    }
    
    if (risposte==2 && skUtente!=undefined){
        carDatiAnag();
    }
}

function carDatiAnag(){
    jSonCli=JSON.parse(skUtente);
    popolaFormModificaDati(jSonCli ,"nuovoUtente.html");
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listaUtenti.html";
    }else{
        window.open('listaUtenti.html','_self');
    }
    
}

function Salva(){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    for (x in parametriNC){
        if (x=="obbligatori") {
            v=parametriNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        } else if (x.indexOf("alternativi")>=0) {
            r=0;
            campiAl=[""];

            v=parametriNC[x].split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    r+=1;
                    campiAl[r]=v[i];
                } else {
                    r=0;
                    break;
                }
            }

            if (r>0){
                for (i=1;i<=r;i++){
                    errori=true;
                    e=document.getElementById(campiAl[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        }
    }

    if (errori){
        attivaAlert(2,"Non sono stati valorizzati i seguenti Campi Obbligatori:<br>"+campi,"erroriCampi");
        return;
    }

    if (recuperaValueElemento("txteMail")!=""){
        if (!validazioneEmail("txteMail")){
            return;
        }
    }

    var tipoSalva="update";

    if (skUtente!=undefined){
        var jSon=JSON.parse(skUtente);
    } else {
        var jSon={};
        jSon.tipoSalva="salva";
    }

    if (jSon.tipoSalva!=undefined){
        tipoSalva=jSon.tipoSalva;
        delete jSon["tipoSalva"];
    }

    for (x in query['nuovoUtente.html']['oggetti']){
        if (x!="elencoServer"){
            jSon[query['nuovoUtente.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }

    var parametri={"tipoRisposta":tipoSalva,"tipoSalva":"utentiWeb", "dati":jSon};
    inviaRichiestaCentralino(tipoSalva,parametri,elaboraRispostaSalvaUtente);
}

function elaboraRispostaSalvaUtente(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio dell'Utente","fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}
 
function valorizzaAltriCampiLocalita(){
    s=document.getElementById("cmbLocalita");

    var jLoc=JSON.parse(localStorage.getItem("cmbLocalita.jSon"));

    if (jLoc!=undefined){
        for (x in jLoc){
            if (jLoc[x].id==s.value){
                valorizzaValueElemento("txtCAP",jLoc[x].cap);
                valorizzaValueElemento("txtProv",jLoc[x].pr);
                valorizzaValueElemento("cmbRegione",jLoc[x].regione);
                valorizzaValueElemento("txtIstat",jLoc[x].istat);
                return;
            }
        }
    }
}