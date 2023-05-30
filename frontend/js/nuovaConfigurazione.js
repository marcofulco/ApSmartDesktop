query['nuovaConfigurazione.html']=new Array;
query['nuovaConfigurazione.html']['oggetti']=new Array;
query['nuovaConfigurazione.html']['oggetti']['txtIdConfigurazione']="id";
query['nuovaConfigurazione.html']['oggetti']['txtDescrizione']="descrizione";
query['nuovaConfigurazione.html']['oggetti']['txtchiaveAttivazione']="chiaveAttivazione";
query['nuovaConfigurazione.html']['oggetti']['txtdbServer']="dbServer";
query['nuovaConfigurazione.html']['oggetti']['txtdbName']="dbName";
query['nuovaConfigurazione.html']['oggetti']['txtdvUserName']="dbUserName";
query['nuovaConfigurazione.html']['oggetti']['txtdbPwd']="dbPwd";
query['nuovaConfigurazione.html']['oggetti']['txtpercorsoImmagini']="percorsoImmagini";
query['nuovaConfigurazione.html']['oggetti']['txtpercorsoAllegati']="percorsoAllegati";
query['nuovaConfigurazione.html']['oggetti']['txtazienda']="azienda";
query['nuovaConfigurazione.html']['oggetti']['txtmultiAzienda']="multiAzienda";
query['nuovaConfigurazione.html']['oggetti']['txtdeposito']="deposito";
query['nuovaConfigurazione.html']['oggetti']['txtlistinoTipo']="listinoTipo";
query['nuovaConfigurazione.html']['oggetti']['txtlistino']="listino";
// query['nuovaConfigurazione.html']['oggetti']['txtutenteVariazione']="utenteVariazione";
query['nuovaConfigurazione.html']['oggetti']['txtimgLogo']="imgLogo";
query['nuovaConfigurazione.html']['oggetti']['txtpercorsoUploadImmagini']="percorsoUploadImmagini";
query['nuovaConfigurazione.html']['oggetti']['txtserverFTPImmagini']="serverFTPImmagini";
query['nuovaConfigurazione.html']['oggetti']['txtuserFTPImmagini']="userFTPImmagini";
query['nuovaConfigurazione.html']['oggetti']['txtpwdFTPImmagini']="pwdFTPImmagini";
query['nuovaConfigurazione.html']['oggetti']['txtpercorsoUploadImmaginiWeb']="percorsoUploadImmaginiWeb";
query['nuovaConfigurazione.html']['oggetti']['txtserverFTPImmaginiWeb']="serverFTPImmaginiWeb";
query['nuovaConfigurazione.html']['oggetti']['txtuserFTPImmaginiWeb']="userFTPImmaginiWeb";
query['nuovaConfigurazione.html']['oggetti']['txtpwdFTPImmaginiWeb']="pwdFTPImmaginiWeb";
query['nuovaConfigurazione.html']['oggetti']['txtLinkBackend']="xUrlBase";
// query['nuovaConfigurazione.html']['oggetti']['']="";


var utentiMenu=new Array();

query['nuovaConfigurazione.html:UTENTIMENU']=new Array;
query['nuovaConfigurazione.html:UTENTIMENU']['modelloRiga']=elementoMenu;
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']=new Array;
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{descrizione}']="descrizione";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{utente}']="utente";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{menu}']="menu";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{gruppoUtenti}']="gruppoUtenti";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{riga}']="riga";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{rapido}']="rapido";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{abilita}']="abilita";
query['nuovaConfigurazione.html:UTENTIMENU']['oggetti']['{pulsantiera}']="pulsantiera";

query['nuovaConfigurazione.html:UTENTIMENUADD']=new Array;
query['nuovaConfigurazione.html:UTENTIMENUADD']['modelloRiga']=elementoMenu;
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']=new Array;
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['cmbListaPagineAdd']="idMenu";
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['txtUtentiAdd']="utente";
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['txtPosizioneRapidoAdd']="rapido"
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['txtPosizionePulsantieraAdd']="pulsantiera"
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['chkAbilitaMenu']="abilita"
query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['cmbGruppoAdd']="idGruppoUtenti";
// query['nuovaConfigurazione.html:UTENTIMENUADD']['oggetti']['cmbGruppoAdd']="idGruppoUtenti";

var utentiPagine=new Array();

query['nuovaConfigurazione.html:UTENTIPAGINE']=new Array;
query['nuovaConfigurazione.html:UTENTIPAGINE']['modelloRiga']=elementoUtentePagina;
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']=new Array;
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{descrizione}']="nomePagina";
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{autorizzazioni}']="autorizzazioni";
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{utente}']="utente";
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{pagina}']="pagina";
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{gruppoUtenti}']="gruppoUtenti";
query['nuovaConfigurazione.html:UTENTIPAGINE']['oggetti']['{riga}']="riga";

query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']=new Array();
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['modelloRiga']=elementoUtentePagina;
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']=new Array;
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['chkLettura']="lettura";
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['chkScrittura']="scrittura";
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['chkModifica']="modifica"
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['chkCancellazione']="cancellazione"
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['txtListaPagine']="nomePagina"
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['txtUtentiAdd']="utente";
query['nuovaConfigurazione.html:FORMAUTORIZZAZIONI']['oggetti']['cmbGruppoAutorizzazione']="idGruppoUtenti";

var parametriPagine=new Array();

query['nuovaConfigurazione.html:PARAMETRIPAGINA']=new Array;
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['modelloRiga']=elementoParametroPagina;
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']=new Array;
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{nomePagina}']="nomePagina";
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{parametro}']="parametro";
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{valore}']="valore";
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{gruppoUtenti}']="gruppoUtenti";
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{utente}']="utente";
query['nuovaConfigurazione.html:PARAMETRIPAGINA']['oggetti']['{riga}']="riga";

query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']=new Array;
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['modelloRiga']=elementoConfigurazione;
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['modelloContenitore']=modalRubrica;
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['oggetti']=new Array;
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['oggetti']['{descrizione}']="descrizione";
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['oggetti']['{id}']="id";
query['nuovaConfigurazione.html:ELENCOCONFIGURAZIONI']['oggetti']['{dbServer}']="dbServer";

query['nuovaConfigurazione.html:FORMPARAMETRI']=new Array();
query['nuovaConfigurazione.html:FORMPARAMETRI']['modelloRiga']=elementoParametroPagina;
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']=new Array;
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['cmbGruppoParametriPagina']="idGruppoUtenti";
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['txtUtentiAddParametriPagina']="utente";
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['txtListaPagineParametriPagina']="nomePagina";
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['txtValoreParametro']="valore";
query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['txtParametroPagina']="parametro";
// query['nuovaConfigurazione.html:FORMPARAMETRI']['oggetti']['riga']="riga";

var gruppoUtenti={};
var listaPagine={};
var gruppoUtentiArr=new Array;
var listaPagineArr=new Array;
var liXAddD;
var parametriNC={"obbligatori":"txtDescrizione;txtdbServer;txtdbName;txtdvUserName;txtdbPwd", "alternativi":"", "alternativi1":"", "nascosti":";"};

var skConfigurazione=sessionStorage.getItem("skConfigurazione");

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var div=document.getElementById("divTitoloCB");

        if (skConfigurazione!=undefined){
            div.innerHTML="MODIFICA ";
            // document.getElementById("txtUserName").disabled=true;
        } else {
            div.innerHTML="NUOVA ";
        }

        div.innerHTML+="CONFIGURAZIONE";

        recuperaParametri();
        avviaCarDati("cmbGruppo");
        // avviaCarDati("cmbServer");
        avviaCarDati("cmbListaPagine");
        avviaCarDati("dtlListaUtenti");
        avviaCarDati("dtlListaPagine");
        avviaCarDati("dtlParametriPagina");
        avviaCarDati("dtlLinkBackend");
        
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
        case "cmbListaPagine":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaMenuApSmart", "select":selectID, "db":"login"};
        break;
        case "dtlListaUtenti":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaUtentiApSmart", "select":selectID, "db":"login"};
        break;
        case "dtlListaPagine":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaPagineApSmart", "select":selectID, "db":"login"};
        break;
        case "dtlParametriPagina":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaparametriApSmart", "select":selectID, "db":"login"};
        break;
        case "dtlLinkBackend":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"dtlLinkBackend", "select":selectID, "db":"login"};
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
            
            if (risposte==5 && skConfigurazione!=undefined){
                carDatiAnag();
            }

            return "";
        }
    }
    if (risposte==5 && skConfigurazione!=undefined){
        console.log('dentro cardati');
        carDatiAnag();
    }
    data=verificaMd5(parametri.select,parametri,risp,data);

    switch(parametri.select){
        case 'dtlListaUtenti':
        case 'dtlListaPagine':
        case 'dtlParametriPagina':
        case 'dtlLinkBackend':
            popolaDatalist(data,parametri.select);
            return;
    }

    if (parametri.select!="cmbServer" && parametri.select!='cmbListaPagine'){
        // popolaSelectDaJSON(data,parametri.select);
    }
    if(parametri.select=='cmbGruppo'){
        for(var n in data){
            gruppoUtenti[data[n].id]=data[n].descrizione
        }
        gruppoUtenti[0]='Tutti'
        gruppoUtentiArr=data;
    }
    if(parametri.select=='cmbListaPagine'){
        for(var n in data){
            listaPagine[data[n].id]=data[n].descrizione
        }
        listaPagineArr=data;
    }

    
    
}
function carDatiAnag(){
    jSonCli=JSON.parse(skConfigurazione);
    utentiMenu=jSonCli.utentiMenu;
    utentiPagine=jSonCli.utentiPagine;
    parametriPagine=jSonCli.parametriPagine;
    
    popolaFormModificaDati(jSonCli.configurazioneBase ,'nuovaConfigurazione.html');
    popolaElencoDaJson(utentiMenu, 'utentiMenu', 0, 'nuovaConfigurazione.html:UTENTIMENU', true, 0);
    popolaElencoDaJson(utentiPagine, 'elencoPagineAutorizzate', 0, 'nuovaConfigurazione.html:UTENTIPAGINE', true, 0);
    popolaElencoDaJson(parametriPagine, 'elencoParametri', 0, 'nuovaConfigurazione.html:PARAMETRIPAGINA', true, 0);
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href='listaConfigurazioni.html';
    }else{
        window.open('listaConfigurazioni.html','_self');
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
    var jSon={};

    jSon['configurazioneBase']={};
    for (x in query['nuovaConfigurazione.html']['oggetti']){
        if (x!="elencoServer"){
            jSon['configurazioneBase'][query['nuovaConfigurazione.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }
    jSon['utentiMenu']=utentiMenu;
    jSon['utentiPagine']=utentiPagine;
    jSon['parametriPagine']=parametriPagine;
    var parametri={
        "tipoRisposta":"salva",
        "tipoSalva":"configurazioneApSmart",
        "dati":jSon};
    inviaRichiestaCentralino('salva',parametri,elaboraRispostaSalvaConfigurazione);
}

function elaboraRispostaSalvaConfigurazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio della configurazione","fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}
function salvaMenu(riga=''){

    var mov={
        'descrizione':listaPagine[recuperaValueElemento('cmbListaPagineAdd')],
        'idMenu':recuperaValueElemento('cmbListaPagineAdd'),
        'gruppoUtenti':gruppoUtenti[recuperaValueElemento('cmbGruppoAdd')],
        'idGruppoUtenti':recuperaValueElemento('cmbGruppoAdd'),
        'utente':recuperaValueElemento('txtUtentiAdd'),
        'abilita':recuperaValueElemento('chkAbilitaMenu').toString(),
        'rapido':recuperaValueElemento('txtPosizioneRapidoAdd').toString(),
        'pulsantiera':recuperaValueElemento('txtPosizionePulsantieraAdd').toString(),
    }
    if(riga==''){
        utentiMenu.push(mov);
        utentiMenu[utentiMenu.length-1].riga=(utentiMenu.length-1).toString();
    }else{
        for(var [k,v] of Object.entries(mov)){
            utentiMenu[riga][k]=v
        }
    }
    popolaElencoDaJson(utentiMenu, 'utentiMenu', 0, 'nuovaConfigurazione.html:UTENTIMENU', true, 0);
}
function aggiungiMenu(){
    if (document.getElementById("divAddD")==undefined){
        var ul=document.getElementById("utentiMenu");
        ul.innerHTML+=elementoLiUtenteMenuXAdd;

        var li=document.getElementById("liXAddMenu");
        li.innerHTML=elementoUtenteMenuAdd;
        popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoAdd');  
        popolaSelectDaJSON(listaPagineArr,'cmbListaPagineAdd')

        ul.scrollTop=ul.scrollHeight;
        
    }
}
function eliminaUtenteMenu(riga){
    utentiMenu[riga]={};
    popolaElencoDaJson(utentiMenu, 'utentiMenu', 0, 'nuovaConfigurazione.html:UTENTIMENU', true, 0);
}
function apriModificaUtenteMenu(riga){

    if (document.getElementById("divAddD")==undefined){

                var li=document.getElementById("li."+riga);
                liOrigD=li.innerHTML;
                li.innerHTML=elementoUtenteMenuAdd;

                document.getElementById("cmdSalvaD").setAttribute("onclick","salvaMenu('"+riga+"')");
                document.getElementById("cmdAnnullaD").setAttribute("onclick","annullaAddUtenteMenu('"+riga+"')");
                popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoAdd');  
                popolaSelectDaJSON(listaPagineArr,'cmbListaPagineAdd')
                popolaFormModificaDati(utentiMenu[riga],"nuovaConfigurazione.html:UTENTIMENUADD");
                
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaDestinazione");
    }
} 
function annullaAddUtenteMenu(id=''){
	globalClickButton=true;
	globalModificaInCorso=false;

    if (id==''){
        var e=document.getElementById("liXAddMenu");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("li."+id);
        e.innerHTML=liOrigD;
    }
}
function salvaAutorizzazione(riga=''){
    var autorizzazioni='';
    if(recuperaValueElemento('chkLettura')==1){
        autorizzazioni+='Lettura,'
    }
    if(recuperaValueElemento('chkScrittura')==1){
        autorizzazioni+='Scrittura,'
    }
    if(recuperaValueElemento('chkModifica')==1){
        autorizzazioni+='Modifica,'
    }
    if(recuperaValueElemento('chkCancellazione')==1){
        autorizzazioni+='Elimina,'
    }
    if(autorizzazioni.length>0){
        autorizzazioni=autorizzazioni.substring(0,autorizzazioni.length-1);
    }
    var mov={
        'nomePagina':recuperaValueElemento('txtListaPagine'),
        'gruppoUtenti':gruppoUtenti[recuperaValueElemento('cmbGruppoAutorizzazione')],
        'idGruppoUtenti':recuperaValueElemento('cmbGruppoAutorizzazione').toString(),
        'utente':recuperaValueElemento('txtUtenti'),
        'lettura':recuperaValueElemento('chkLettura').toString(),
        'scrittura':recuperaValueElemento('chkScrittura').toString(),
        'modifica':recuperaValueElemento('chkModifica').toString(),
        'cancellazione':recuperaValueElemento('chkCancellazione').toString(),
        'autorizzazioni':autorizzazioni
    }
    // if(mov.nomePagina==''){
    //     attivaAlert(xTipoAllert.ESCLAMAZIONE,'MANCANZA NOME PAGINA PARAMETRI');
    //     return;
    // }
    
    if(riga==''){
    utentiPagine.push(mov);
    utentiPagine[utentiPagine.length-1].riga=(utentiPagine.length-1).toString();
    }else{
        for(var [k,v] of Object.entries(mov)){
            utentiPagine[riga][k]=v
        }
    }
    
    popolaElencoDaJson(utentiPagine, 'elencoPagineAutorizzate', 0, 'nuovaConfigurazione.html:UTENTIPAGINE', true, 0);
}
function eliminaUtentePagina(riga){
    utentiPagine[riga]={};
    popolaElencoDaJson(utentiPagine, 'elencoPagineAutorizzate', 0, 'nuovaConfigurazione.html:UTENTIPAGINE', true, 0);
}
function aggiungiParametro(riga=''){

    var mov={
        'nomePagina':recuperaValueElemento('txtListaPagineParametriPagina'),
        'gruppoUtenti':gruppoUtenti[recuperaValueElemento('cmbGruppoParametriPagina')],
        'idGruppoUtenti':recuperaValueElemento('cmbGruppoParametriPagina'),
        'utente':recuperaValueElemento('txtUtentiAddParametriPagina'),
        'parametro':recuperaValueElemento('txtParametroPagina'),
        'valore':recuperaValueElemento('txtValoreParametro')
    }
    // if(mov.nomePagina==''){
    //     attivaAlert(xTipoAllert.ESCLAMAZIONE,'MANCANZA NOME PAGINA PARAMETRI');
    //     return;
    // }
    if(riga==''){
        parametriPagine.push(mov);
        parametriPagine[parametriPagine.length-1].riga=(parametriPagine.length-1).toString();
    }else{
        for(var [k,v] of Object.entries(mov)){
            parametriPagine[riga][k]=v
        }
    }
    popolaElencoDaJson(parametriPagine, 'elencoParametri', 0, 'nuovaConfigurazione.html:PARAMETRIPAGINA', true, 0);
}

function eliminaParametroPagina(riga){
    parametriPagine[riga]={};
    popolaElencoDaJson(parametriPagine, 'elencoParametri', 0, 'nuovaConfigurazione.html:PARAMETRIPAGINA', true, 0);
}
function apriModalImport(){
    parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaConfigurazioniBase", "db":"login"};
    inviaRichiestaCentralino("query",parametri,(res)=>{
        var risp=JSON.parse(res);
        var parametri=risp.parametri;
        var data=risp.risposta;
        apriModalDettagli('nuovaConfigurazione.html:ELENCOCONFIGURAZIONI','importa configurazione da altra configurazione già esistente, VERRANNO CANCELLATE TUTTE LE INFO FINO AD ORA CARICARE!',data,0,true,'IMPORT DA ALTRA CONFIGURAZIONE');
    });
   
}
function caricaConfigurazione(id){
    var parametri={
        "tipoQuery":"listaConfigurazioni",
        "tipoRisposta":"schedaUtente",
        "nomeQuery":"listaConfigurazioni.html:schedaConfigurazione",
        "id":id,
        "chiamante":"schedaUtente",
        "offSet":0,
        "fetch":0,
        "ricerca":'',
        "db":"login"}; 

    elencoInCaricamento=1;

    inviaRichiestaCentralino("multiQuery",parametri,(res)=>{
        var risp=JSON.parse(res);
        var parametri=risp.parametri;
        var data=risp.risposta;
        skConfigurazione=JSON.stringify(data);
        var idTmp=document.getElementById('txtIdConfigurazione').value;
        carDatiAnag();
        document.getElementById('txtIdConfigurazione').value=idTmp;
        document.getElementById('txtDescrizione').value='';
        document.getElementById('txtchiaveAttivazione').value='';
        chiudiModalBox();
    })
}
function formAutorizzazione(riga=''){
    if (document.getElementById("divAddAutorizzazione")==undefined){
            if(riga==''){
            var ul=document.getElementById("elencoPagineAutorizzate");
            ul.innerHTML+=elementoAutorizzazioniXAdd;

            var li=document.getElementById("liXAddAutorizzazione");
            li.innerHTML=elementoAutorizzazioni;
            popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoAutorizzazione');  
            // popolaSelectDaJSON(listaPagineArr,'cmbListaPagineAutorizzazione')

            ul.scrollTop=ul.scrollHeight;
        }else{
            var li=document.getElementById("liAutorizzazione."+riga);
            liOrigD=li.innerHTML;
            li.innerHTML=elementoAutorizzazioni;

            document.getElementById("cmdSalvaDAutorizzazioni").setAttribute("onclick","salvaAutorizzazione('"+riga+"')");
            document.getElementById("cmdAnnullaDAutorizzazioni").setAttribute("onclick","annullaFormAutorizzazione('"+riga+"')");
            popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoAutorizzazione');  
            popolaFormModificaDati(utentiPagine[riga],"nuovaConfigurazione.html:FORMAUTORIZZAZIONI");
        }
    }else{
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaDestinazione");
    }
}
function annullaFormAutorizzazione(id=''){
	globalClickButton=true;
	globalModificaInCorso=false;

    if (id==''){
        var e=document.getElementById("liXAddAutorizzazione");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("liAutorizzazione."+id);
        e.innerHTML=liOrigD;
    }
}

function formParametroPagina(riga=''){
    if (document.getElementById("divAddParametriPagina")==undefined){
            if(riga==''){
            var ul=document.getElementById("elencoParametri");
            ul.innerHTML+=elementoFormParametriPaginaXAdd;

            var li=document.getElementById("liXAddParametriPagina");
            li.innerHTML=elementoFormParametriPagina;
            popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoParametriPagina');  

            ul.scrollTop=ul.scrollHeight;
        }else{
            var li=document.getElementById("liParametroPagina."+riga);
            liOrigD=li.innerHTML;
            li.innerHTML=elementoFormParametriPagina;

            document.getElementById("cmdSalvaFormParametri").setAttribute("onclick","aggiungiParametro('"+riga+"')");
            document.getElementById("cmdAnnullaFormParametri").setAttribute("onclick","annullaFormParametroPagina('"+riga+"')");
            popolaSelectDaJSON(gruppoUtentiArr,'cmbGruppoParametriPagina');  
            popolaFormModificaDati(parametriPagine[riga],"nuovaConfigurazione.html:FORMPARAMETRI");
        }
    }else{
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaDestinazione");
    }
}
function annullaFormParametroPagina(id=''){
	globalClickButton=true;
	globalModificaInCorso=false;

    if (id==''){
        var e=document.getElementById("liXAddParametriPagina");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("liParametroPagina."+id);
        e.innerHTML=liOrigD;
    }
}