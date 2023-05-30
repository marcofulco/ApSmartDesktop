query['assortimentiArticoli.html'] = new Array;
query['assortimentiArticoli.html']['oggetti'] = new Array;
query['assortimentiArticoli.html']['oggetti']['txtID'] = "id";
query['assortimentiArticoli.html']['oggetti']['txtDescrizione'] = "descrizione";

query['assortimentiArticoli.html:listaAssortimenti']=new Array;
query['assortimentiArticoli.html:listaAssortimenti']['modelloRiga']=`<div class="row w100 h60p clrSfumatoScuro centraVerticalmente marg5Top testoNormale " id="codiceListaAssortimento.{CODICE}">
<div class="w100-40p" style="padding-left:5px"><div>{CODICE}</div><div>{DESCRIZIONE}</div></div>
<div class="w30p  row"><img src="img/rosse/cestino.svg" class="h30p" onclick="eliminaCodiceDaLista('{CODICE}')"></div>
</div>`;
query['assortimentiArticoli.html:listaAssortimenti']['oggetti']=new Array;
query['assortimentiArticoli.html:listaAssortimenti']['oggetti']['{CODICE}']='codice';
query['assortimentiArticoli.html:listaAssortimenti']['oggetti']['{DESCRIZIONE}']='descrizione';

query['ListaArticoli.html'] = new Array;
query['ListaArticoli.html']['modelloRiga'] = `<div class="row w100 h60p clrSfumatoScuro centraVerticalmente marg5Top testoNormale " id="{CODICE}" onclick="codiceAssortimento(this)">
<div class="w100-40p" style="padding-left:5px"><div>{CODICE}</div><div>{DESCRIZIONE}</div></div>
<div class="w30p  row"><img src="img/bianche/checkVuoto.svg" class="h30p"></div>
</div>`;

query['ListaArticoli.html']['OFFSET'] = 0;
query['ListaArticoli.html']['FETCH'] = 75;
query['ListaArticoli.html']['MAXFETCH'] = 0;

query['ListaArticoli.html']['oggetti'] = new Array;
query['ListaArticoli.html']['oggetti']['{CODICE}'] = 'CODICE';
query['ListaArticoli.html']['oggetti']['{DESCRIZIONE}'] = 'DESCRIZIONE';
var listaArticoli = new Array();

Filtri['ListaArticoli.html']=new Array;
Filtri['ListaArticoli.html']['txtRicercaCodice']='codice';
Filtri['ListaArticoli.html']['txtRicercaDescrizione']='ricerca';
Filtri['ListaArticoli.html']['cmbFamiglia0']='idFamiglia';
Filtri['ListaArticoli.html']['cmbFamiglia1']='idSFamiglia';
Filtri['ListaArticoli.html']['cmbFamiglia2']='idSFam1';
Filtri['ListaArticoli.html']['cmbFamiglia3']='idSFam2';
var parametriNC = {
    obbligatori:
        "txtDescrizione;",
    alternativi: "",
    alternativi1: "",
    nascosti: "",
};
var elencoInCaricamento = 0;
var skUtente = sessionStorage.getItem("skVarie.assortimentiArticoli");
var documento={};
window.addEventListener("load", function (event) {
    setTimeout(function () {
        var div = document.getElementById("divTitolo");

        if (skUtente != undefined) {
            div.innerHTML = "MODIFICA ";
        } else {
            div.innerHTML = "NUOVO  ";
        }

        div.innerHTML += "ASSORTIMENTO ARTICOLI";
        
        
        
        recuperaParametri();

        avviaCarDati('elencoFamiglie');
        
        // avviaCarDati('listaArticoli');
    }, 50);
});

function recuperaParametri() {
    var parametri = {
        tipoRisposta: "parametri",
        chiamante: "parametri",
        nomePagina: nomePagina,
        userName: "",
    };

    elencoInCaricamento = 1;

    inviaRichiestaCentralino("parametri", parametri, elaboraParametri);
}

function elaboraParametri(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != "") {
        return "";
    }

    for (x in data) {
        if (!isNaN(Number(data[x]["valore"]))) {
            parametriNC[data[x]["parametro"]] = Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]] = data[x]["valore"];
        }
    }

    if (parametriNC.nascosti != "") {
        m = parametriNC.nascosti.split(";");
        for (x in m) {
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) { }
        }
    }

    if (xIdCliente > 0) {
        document.getElementById("divFido").classList.add("hide");
    }

    carDatiAnag();
}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "listaArticoli":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "listaArticolixAssortimento",
                select: selectID,
            };
            break;
        case "elencoFamiglie":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "elencoFamiglie",
                select: selectID,
            };
            break;
        case "codiciAssortimento":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "codiciAssortimento",
                select: selectID,
                idAssortimento:recuperaValueElemento('txtID')
            };
            break;
    }

    parametri.md5 = localStorage.getItem(selectID + ".md5");

    inviaRichiestaCentralino("query", parametri);
}

var risposte = 0;
var elencoFamiglie = new Array;
function elaboraRisposta(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    risposte += 1;

    if (risp.error != "") {
        return "";
    }


    data = verificaMd5(parametri.select, parametri, risp, data);
    if (parametri.tipoRisposta == 'elencoArticoli') {

        query['ListaArticoli.html']['OFFSET'] += parametri.fetch;
        popolaElencoDaJson(data, 'listaArticoli', 0, 'ListaArticoli.html', parametri.ricarica, parametri.scrollTop)
        elencoInCaricamento = 0;
        verificaPresenzaCodici();
        return;
    }
    if (parametri.select == 'elencoFamiglie') {
        elencoFamiglie = data;
        scompattaFamiglia(0);
    }
    if(parametri.select=='codiciAssortimento'){
        documento.prodotti.data=data;
        for(var x in data){
            documento.prodotti.index[data[x].codice]=x
        }
        popolaListaAssortimenti()
    }
    if(risposte==2){
        AvviaCarDatiElencoArticoli(true,0,0);
    }
}

function carDatiAnag() {
    //   jSonCli = window.sessionStorage.getItem(
    //     "schedaCliente.html.CLIENTE." + idModifica + ".jSon"
    //   );
    
    jSonCli = window.sessionStorage.getItem("skVarie.assortimentiArticoli");
    documento.prodotti={};
    documento.prodotti.data=new Array;
    documento.prodotti.index ={};
    documento.assortimento={};
    if (jSonCli != undefined) {
        jSonCli = JSON.parse(jSonCli);
        popolaFormModificaDati(jSonCli[0], "assortimentiArticoli.html");
        documento.assortimento.id=recuperaValueElemento('txtID');
        documento.assortimento.descrizione=recuperaValueElemento('txtDescrizione');
        avviaCarDati('codiciAssortimento');
    } else {
        idModifica = 0;
    }
    gestLocalStorage('recupera');
}

function esci() {
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listaVarie.html?tabella=assortimentiArticoli";
    }else{
        window.open("listeVarie.html?tabella=assortimentiArticoli", "_self");
    }
    
}

function Salva() {
    var v;
    var errori = false;
    var campi = "";
    var e;
    var campiAl;
    var r;

    for (x in parametriNC) {
        if (x == "obbligatori") {
            v = parametriNC.obbligatori.split(";");
            for (i = 0; i < v.length - 1; i++) {
                if (recuperaValueElemento(v[i]) == "") {
                    errori = true;
                    e = document.getElementById(v[i]);
                    e.setAttribute(
                        "style",
                        "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
                    );
                    campi += e.getAttribute("placeholder") + "<br>";
                }
            }
        } else if (x.indexOf("alternativi") >= 0) {
            r = 0;
            campiAl = [""];

            v = parametriNC[x].split(";");
            for (i = 0; i < v.length - 1; i++) {
                if (recuperaValueElemento(v[i]) == "") {
                    r += 1;
                    campiAl[r] = v[i];
                } else {
                    r = 0;
                    break;
                }
            }

            if (r > 0) {
                for (i = 1; i <= r; i++) {
                    errori = true;
                    e = document.getElementById(campiAl[i]);
                    e.setAttribute(
                        "style",
                        "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
                    );
                    campi += e.getAttribute("placeholder") + "<br>";
                }
            }
        }
    }

    if (errori) {
        attivaAlert(
            2,
            "Non sono stati valorizzati i seguenti Campi Obbligatori:<br>" + campi,
            "erroriCampi"
        );
        return;
    }

    // var jSon = {};

    // for (x in query["assortimentiArticoli.html"]["oggetti"]) {
    //     jSon[query["assortimentiArticoli.html"]["oggetti"][x]] = recuperaValueElemento(x);
    // }
    documento.assortimento.descrizione=recuperaValueElemento('txtDescrizione');
    documento.assortimento.id=recuperaValueElemento('txtID');
    tipo = "salva";

    var parametri = { tipoRisposta: tipo, tipoSalva: "assortimentoArticoli", dati: documento };
    inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);
}

function elaboraRispostaSalvaCarrello(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != "") {
        return "";
    }

    if (data[0] == 0) {
        attivaAlert(0, "Errore durante il salvataggio ", "fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e) {
    e.setAttribute("style", "");
}

function espandiListaArticoli() {
    var data = listaArticoli;

    popolaElencoDaJson(data, 'listaArticoli', 0, 'ListaArticoli.html', true, 0)
}

function AvviaCarDatiElencoArticoli(ricarica = true, righe = 0, scrollTop = 0) {
    var nomeQuery = 'ListaArticoli.html';


    var maxFetch = 0;

    if (query[nomeQuery]['MAXFETCH']) {
        maxFetch = query[nomeQuery]['MAXFETCH'];
    }

    if (ricarica) {
        maxFetch = 0;
    }

    if (query[nomeQuery]['OFFSET'] >= maxFetch && maxFetch != 0) {
        return '';
    }

    if (ricarica) {
        query[nomeQuery]['OFFSET'] = 0;
    }
    var tipoRisposta = 'elencoArticoli'
    var appoNoSconti = 0;

    soloDisponibili = 0;
    soloVendutiClienteCorrente = 0;
    inEliminazione = 0;
    idFamiglia = 0;
    idSFamiglia = 0;
    idSFam1 = 0;
    idSFam2 = 0;
    inPromo = 0;
    scalaSconti = 0;
    promoScala = 0;
    nuovo = 0;
    fuoriCatalogo = 0;
    noSconti = 0;
    ricerca = '';
    ricercaF = '';
    var idCliente = 0;
    var cIdDest = 0;
    var idTipologia = '';
    var codice = '';
    for(var [k,v] of Object.entries(Filtri['ListaArticoli.html'])){
        eval(v+" = '"+recuperaValueElemento(k)+"';");
    }
    var tNoPromo = 0;
    var tNoNetti = 0;

    try {
        tNoPromo = skCli[0].NOPROMO;
        tNoNetti = skCli[0].NONETTI;
    } catch (error) {

    }

    var parametri = {
        "tipoQuery": "listaArticoli", "tipoRisposta": tipoRisposta, "nomeQuery": nomeQuery, "ricerca": ricerca, "ricercaF": ricercaF, "tipoElenco": righe,
        "ricarica": ricarica, "scrollTop": scrollTop, "azienda": 0, "idCliente": idCliente, "idDest": cIdDest, "idAgente": 0, "idFamiglia": idFamiglia, "idSFamiglia": idSFamiglia,
        "idSFam1": idSFam1, "idSFam2": idSFam2, "idTipologia": idTipologia, "idFornitore": '', "soloDisponibili": 0,
        "soloVendutiClienteCorrente": 0, "idAssortimento": '', "codice": codice, "inEliminazione": 0,
        "offSet": query[nomeQuery]['OFFSET'], "fetch": query[nomeQuery]['FETCH'], "chiamante": tipoRisposta, "percorsoImmagini": xPercorsoImmagini,
        "decimaliPrezzi": 2, "hDescrizione": 40, "hContainer": '', "hLi": '', "hContainerNP": '', "hLiNP": '', "idIvaCliente": 0,
        "percIvaCliente": 22, "inPromo": 0, "nuovo": 0, "fuoriCatalogo": 0, "noPromo": 0, "scalaSconti": 0,
        "primaApertura": 0, "promoScala": 0, "noSconti": 0, "noNetti": 0, "codiceBarre": '', "idDeposito": 0
    };
    elencoInCaricamento = 1;
    inviaRichiestaCentralino("query", parametri, elaboraRisposta, "body");
}
function elencoArticoliScroll(ec, pagina, txtRicerca = "") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    // window.sessionStorage.setItem(nomeStorage+".elencoArticoli.scroolTop", scrollPos);
    if ((maxScroll * 90 / 100) < scrollPos && elencoInCaricamento == 0) {
        AvviaCarDatiElencoArticoli(false);
    }
}
function scompattaFamiglia(livello = 0) {
    for(var y=livello;y<=3;y++){
        if(y!=0){
            var slc=document.getElementById('cmbFamiglia'+y)
            slc.innerHTML='<option value="0"></option>';
        }
        
    }
    var data = new Array;
    var lastId = '';
    for (var x in elencoFamiglie) {
        if(lastId==elencoFamiglie[x]['ID'+livello]){
            continue;
        }
        if(livello==0 || recuperaValueElemento('cmbFamiglia'+(livello-1))==elencoFamiglie[x]['ID'+(livello-1)]){
            if(elencoFamiglie[x]['ID'+livello]!='' && elencoFamiglie[x]['D'+livello]!=''){
                data.push({
                    'id': elencoFamiglie[x]['ID'+livello],
                    'descrizione': elencoFamiglie[x]['D'+livello]
                })
                if (lastId !=elencoFamiglie[x]['ID'+livello]) {
                    lastId = elencoFamiglie[x]['ID'+livello];
                } 
            }
        }
    }
    if(data.length>0){
        popolaSelectDaJSON(data,'cmbFamiglia'+livello);
    }
}
function eliminaTuttiFiltri(){
    for(var[k,v] of Object.entries(Filtri['ListaArticoli.html'])){
        document.getElementById(k).value='';
    }

    for(var y=1;y<=3;y++){
        if(y!=0){
            var slc=document.getElementById('cmbFamiglia'+y)
            slc.innerHTML='<option value="0"></option>';
        }
        
    }
    AvviaCarDatiElencoArticoli(true,0,0);
}
function apriListaAssortimento(input){
    if(input.classList.contains('taskSelezionata')){
        hide('navBar')
        input.classList.remove('taskSelezionata');
    }else{
        show('navBar');
        input.classList.add('taskSelezionata');
    }
    
    
}
function chiudiListaAssortimento(){
    hide('navBar');
}
function codiceAssortimento(input,selezionaTutti=false,deselezionaTutti=false){
    var codice=input.id;
    var descrizione=input.childNodes[1].childNodes[1].textContent;
    if(documento.prodotti.index[codice]==undefined || selezionaTutti==true){
        var img=input.childNodes[3].childNodes[0]
        img.src="img/bianche/done.svg";
        documento.prodotti.data.push(
            {'codice':codice,
            'descrizione':descrizione
    })
        documento.prodotti.index[codice]=documento.prodotti.data.length-1;
    }else{
        if(deselezionaTutti==true || selezionaTutti==false){
            console.log('elimina')
            var img=input.childNodes[3].childNodes[0]
            img.src="img/bianche/checkVuoto.svg";
            documento.prodotti.data[documento.prodotti.index[codice]]={};
            delete documento.prodotti.index[codice];
        }
    }
    gestLocalStorage('salva');
}
function verificaPresenzaCodici(){
    for(var [k,v] of Object.entries(documento.prodotti.index)){
        var nodo=document.getElementById(k);
        if(nodo!=undefined){
            var img=nodo.childNodes[3].childNodes[0]
            img.src="img/bianche/done.svg";
        }
    }
}
function gestLocalStorage(tipo='salva'){
    if(tipo=='salva'){
        localStorage.setItem('tmpListaAssortimento',JSON.stringify(documento));
    }else if(tipo=='recupera'){
        if(localStorage.getItem('tmpListaAssortimento')!=undefined){
            var x =JSON.parse(localStorage.getItem('tmpListaAssortimento'));
            if(x.assortimento.id==recuperaValueElemento('txtID')){
                documento=x;
            }else{
                localStorage.removeItem('tmpListaAssortimento');
            }
        }

    }
    popolaListaAssortimenti();
}
function selezionaListaCorrente(){
    var nodo=document.getElementById('listaArticoli');
    for(var x=0; x<nodo.childNodes.length;x++){
            codiceAssortimento(nodo.childNodes[x],true,false);
    }
}
function deselezionaListaCorrente(){
    var nodo=document.getElementById('listaArticoli');
    for(var x=0; x<nodo.childNodes.length;x++){
            codiceAssortimento(nodo.childNodes[x],false,true);
    }
}
function popolaListaAssortimenti(){
    popolaElencoDaJson(documento.prodotti.data,'listaAssortmentoInCorso',0,'assortimentiArticoli.html:listaAssortimenti',true,0)
}
function eliminaCodiceDaLista(codice){
    if(documento.prodotti.index[codice]!=undefined){
        if(document.getElementById(codice)!=undefined){
            
            codiceAssortimento(document.getElementById(codice),false,false);
        }else{
            documento.prodotti.data[documento.prodotti.index[codice]]={};
            delete documento.prodotti.index[codice];
        }
        
        
    }
    popolaListaAssortimenti();
}