var query = [];
var parametriSO = { "visDataConsegna": 0, "modificheDenaro": 0, "modificheFerrara": 0, "noPrelevatoSuOrdini": 1, "modificheIceCube": 0, "statoOrdineDopoAvvisoVettore": 0, "emissioneDDT": 0 };

var primoAvvio = true;

recuperaParametri();

function recuperaParametri() {
    var parametri = { "tipoRisposta": "parametri", "chiamante": "parametri", "nomePagina": nomePagina, "userName": "" };
    inviaRichiestaCentralino("parametri", parametri, elaboraParametri);
}

function elaboraParametri(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    for (x in data) {
        if (!isNaN(Number(data[x]["valore"]))) {
            parametriSO[data[x]["parametro"]] = Number(data[x]["valore"]);
        } else {
            parametriSO[data[x]["parametro"]] = data[x]["valore"];
        }
    }

    if (parametriSO.modificheDenaro == 1) {
        document.getElementById("tabPreordini").innerHTML = "PREVENTIVI";
    }

    if (parametriSO.foglioDiCarico == 1) {
        document.getElementById('cmdFoglioDiCarico').classList.remove('hide');
    }

    gestLarghezzaPulsantiera('pulsantiera')
    caricaComponenti();
    if(parametriSO.iniziaConDataConsegnaOggi==1){
        document.getElementById("txtRicercaDataConsegna").value=oggiISO();
    }
}

function avviaCarDati(selectID) {
    var parametri = {};

    switch (selectID) {
        case "datiVettore":
            parametri = { tipoRisposta: "select", tipoQuery: "querySpecifica", nomeTabella: "datiVettore", select: selectID, idVettore: xIdVettore };

            break;
        case "cmbDeposito":
            parametri = { tipoRisposta: "select", tipoQuery: "querySpecifica", nomeTabella: "depositi", select: selectID };
            break;
    }

    parametri.md5 = localStorage.getItem(selectID + ".md5");

    inviaRichiestaCentralino("query", parametri);
}

function elaboraRisposta(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;


    if (risp.error != "") {
        return "";
    }

    if (Array.isArray(data)) {
        if (data[0] == 0) {
            return "";
        }
    }

    data = verificaMd5(parametri.select, parametri, risp, data);
    if (parametri.select == 'datiVettore') {
        idDepositoVettore = data[0].IDDEPOSITO;
        return;
    }

    if (parametri.select == "cmbDeposito") {
        var codiceArticolo = recuperaParametroHRef("", "codice");
        var deposito = recuperaParametroHRef("", "idDeposito");

        data = verificaMd5(parametri.select, parametri, risp, data);
        popolaSelectDaJSON(data, parametri.select, deposito);

        if (codiceArticolo != "") {
            valorizzaValueElemento("ricercaArticoloVenditaBanco", codiceArticolo);
        }
    }

    if (parametri.nomeQuery == "schedaCliente.html") {
        var idCliente=data[0].ID;
        sessionStorage.setItem("schedaCliente.html.CLIENTE." + parametri.idCliente + ".md5", risp.md5);
        sessionStorage.setItem("schedaCliente.html.CLIENTE." + parametri.idCliente + ".jSon", JSON.stringify(data));
        sessionStorage.setItem("idCliente", data[0].ID);
        sessionStorage.setItem("ragioneSociale", data[0].RAGIONE_SOCIALE)
        sessionStorage.setItem("idIva" + data[0].ID, data[0].ID_IVA);
        sessionStorage.setItem("percIva" + data[0].ID, data[0].PERCIVA);
        
        if(parametri.idDestinazione!=undefined){
            // console.log(parametri.idDestinazione);
            var parametri={"tipoQuery":"datiDestinazione","id":parametri.idDestinazione}; 

            inviaRichiestaCentralino("multiQuery",parametri,(res)=>{
                var risp=JSON.parse(res);
                var parametri=risp.parametri;
                var data=risp.risposta;
            
                if (risp.error!=''){
                    return "";
                }
            
                if(data[0]==0){
                    return "";
                }
            
                // IDDestinazionePredefinita=data.idDest;
                var idServer = sessionStorage.getItem("s");
                xNomeDestinazione = "nDestinazione."+idServer+".CLIENTE."+idCliente;
                localStorage.setItem(xNomeDestinazione,JSON.stringify(data));
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="ListaArticoli.html?tipoAnagrafica=CLIENTE";
                }else{
                    window.open("ListaArticoli.html?tipoAnagrafica=CLIENTE", "_self");
                }
                
            });
        }else{
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaArticoli.html?tipoAnagrafica=CLIENTE";
            }else{
                window.open("ListaArticoli.html?tipoAnagrafica=CLIENTE","_self");
            }
            
        }
        
    }
}

function caricaComponenti() {
    var script = document.createElement("script");
    script.setAttribute("src", "componenti/modalStoricoOrdini.js");
    document.body.appendChild(script);

    script.onload = function () {
        var script = document.createElement("script");
        script.setAttribute("src", "componenti/elementiStatoOrdini.js");
        document.body.appendChild(script);

        script.onload = function () {
            var script = document.createElement("script");
            script.setAttribute("src", "componenti/elementiDettagliOrdini.js");
            document.body.appendChild(script);

            script.onload = function () {
                query['statoOrdini.html'] = new Array;
                query['statoOrdini.html']['OFFSET'] = 0;
                query['statoOrdini.html']['FETCH'] = 100;
                query['statoOrdini.html']['MAXFETCH'] = 0;
                query['statoOrdini.html']['modelloRiga'] = elementiStatoOrdiniDE;

                query['statoOrdini.html']['oggetti'] = new Array;
                query['statoOrdini.html']['oggetti']['{DATA}'] = "DATA";
                query['statoOrdini.html']['oggetti']['{DESCRIZIONE}'] = "DESCRIZIONE";
                query['statoOrdini.html']['oggetti']['{RAGIONE_SOCIALE}'] = "RAGIONE_SOCIALE";
                query['statoOrdini.html']['oggetti']['{DAGENTE}'] = "DAGENTE";
                query['statoOrdini.html']['oggetti']['{NUMERO}'] = "NUMERO";
                query['statoOrdini.html']['oggetti']['{NUMERONS}'] = "NUMERONS";
                query['statoOrdini.html']['oggetti']['{DSTATO}'] = "DSTATO";
                query['statoOrdini.html']['oggetti']['{RIGHE}'] = "RIGHE";
                query['statoOrdini.html']['oggetti']['{QU}'] = "QU";
                query['statoOrdini.html']['oggetti']['{TIMPORTO}'] = "TIMPORTO";
                query['statoOrdini.html']['oggetti']['{ID}'] = "ID";
                query['statoOrdini.html']['oggetti']['{IMMAGINE}'] = "IMMAGINE";
                query['statoOrdini.html']['oggetti']['{TABELLA}'] = "TABELLA";
                query['statoOrdini.html']['oggetti']['{RIGHEINEVASE}'] = "RIGHEINEVASE";
                query['statoOrdini.html']['oggetti']['{RIGHEEVASE}'] = "RIGHEEVASE";
                query['statoOrdini.html']['oggetti']['{QUEVASE}'] = "QUEVASE";
                query['statoOrdini.html']['oggetti']['{IMPORTOEVASO}'] = "IMPORTOEVASO";
                query['statoOrdini.html']['oggetti']['{RIGHETAGLIATE}'] = "RIGHETAGLIATE";
                query['statoOrdini.html']['oggetti']['{QUTAGLIATE}'] = "QUTAGLIATE";
                query['statoOrdini.html']['oggetti']['{IMPORTOTAGLIATO}'] = "IMPORTOTAGLIATO";
                query['statoOrdini.html']['oggetti']['{RIGHEPRELEVATE}'] = "RIGHEPRELEVATE";
                query['statoOrdini.html']['oggetti']['{RIGHENONPRELEVATE}'] = "RIGHENONPRELEVATE";
                query['statoOrdini.html']['oggetti']['{QUPRELEVATE}'] = "QUPRELEVATE";
                query['statoOrdini.html']['oggetti']['{IMPORTOPRELEVATO}'] = "IMPORTOPRELEVATO";
                query['statoOrdini.html']['oggetti']['{RIGHEDAEVADERE}'] = "RIGHEDAEVADERE";
                query['statoOrdini.html']['oggetti']['{QUDAEVADERE}'] = "QUDAEVADERE";
                query['statoOrdini.html']['oggetti']['{IMPORTODAEVADERE}'] = "IMPORTODAEVADERE";
                query['statoOrdini.html']['oggetti']['{DATAINITRA}'] = "DATAINITRA";
                query['statoOrdini.html']['oggetti']['{ORAINITRA}'] = "ORAINITRA";
                query['statoOrdini.html']['oggetti']['{hideProgrammazione}'] = "hideProgrammazione";
                query['statoOrdini.html']['oggetti']['{TRAKING}'] = "LINKTRAKING";
                query['statoOrdini.html']['oggetti']['{NOTEAB19}'] = "NOTEAB19";
                query['statoOrdini.html']['oggetti']['{hideTraking}'] = "HIDETRAKING";
                query['statoOrdini.html']['oggetti']['{IDSTATO}'] = "IDSTATO";
                query['statoOrdini.html']['oggetti']['{COLLI}'] = { "campo": "COLLI", "decimaliMax": 1, "decimaliMin": 0 };
                query['statoOrdini.html']['oggetti']['{DESTINAZIONE}'] = "DESTINAZIONE";
                query['statoOrdini.html']['oggetti']['{IDCLIENTE}'] = "IDCLIENTE";
                query['statoOrdini.html']['oggetti']['{IDDEST}'] = "IDDEST";
                query['statoOrdini.html']['oggetti']['{NOTEINTERNE}'] = "NOTEINTERNE";
                query['statoOrdini.html']['oggetti']['{NOTE}'] = "NOTE";
                query['statoOrdini.html']['oggetti']['{ORA}'] = "ORA";
                query['statoOrdini.html']['oggetti']['{hideRilievo}'] = "hideRilievo";
                query['statoOrdini.html']['oggetti']['{VETTORECONSEGNAIL}'] = "VETTORECONSEGNAIL";
                query['statoOrdini.html']['oggetti']['{VETTORECONSEGNAILORE}'] = "VETTORECONSEGNAILORE";

                query['statoOrdini.html:dettagli'] = new Array;
                query['statoOrdini.html:dettagli']['OFFSET'] = 0;
                query['statoOrdini.html:dettagli']['FETCH'] = 100;
                query['statoOrdini.html:dettagli']['MAXFETCH'] = 0;
                query['statoOrdini.html:dettagli']['campoProgressivo'] = "TOT_PAGAREF";
                query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliOrdiniDE;
                query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoOrdiniDE;
                query['statoOrdini.html:dettagli']['modelloFormModificaRiga'] = formInserimentoLotti;

                query['statoOrdini.html:dettagli']['oggetti'] = new Array;
                query['statoOrdini.html:dettagli']['oggetti']['{CODICE}'] = "CODICE";
                query['statoOrdini.html:dettagli']['oggetti']['{DESCRIZIONE}'] = "DESCRIZIONE";
                query['statoOrdini.html:dettagli']['oggetti']['{UM}'] = "UM";
                query['statoOrdini.html:dettagli']['oggetti']['{QU}'] = "QU";
                query['statoOrdini.html:dettagli']['oggetti']['{PREZZO}'] = "PREZZO";
                query['statoOrdini.html:dettagli']['oggetti']['{SC}'] = "SC";
                query['statoOrdini.html:dettagli']['oggetti']['{IMPORTO}'] = "IMPORTO";
                query['statoOrdini.html:dettagli']['oggetti']['{MARGINE}'] = "MARGINE";
                query['statoOrdini.html:dettagli']['oggetti']['{BR}'] = "BR";
                query['statoOrdini.html:dettagli']['oggetti']['{HIDEIMP}'] = "HIDEIMP";
                query['statoOrdini.html:dettagli']['oggetti']['{LARGHEZZAD}'] = "LARGHEZZAD";
                query['statoOrdini.html:dettagli']['oggetti']['{PERCINEVASE}'] = "PERCINEVASE";
                query['statoOrdini.html:dettagli']['oggetti']['{PERCEVASA}'] = "PERCEVASA";
                query['statoOrdini.html:dettagli']['oggetti']['{QUEVASA}'] = "QUEVASA";
                query['statoOrdini.html:dettagli']['oggetti']['{IMPORTOEVASO}'] = "IMPORTOEVASO";
                query['statoOrdini.html:dettagli']['oggetti']['{PERCTAGLIATE}'] = "PERCTAGLIATE";
                query['statoOrdini.html:dettagli']['oggetti']['{QUTAGLIATA}'] = "QUTAGLIATA";
                query['statoOrdini.html:dettagli']['oggetti']['{IMPORTOTAGLIATO}'] = "IMPORTOTAGLIATO";
                query['statoOrdini.html:dettagli']['oggetti']['{QUPRELEVATA}'] = "QUPRELEVATA";
                query['statoOrdini.html:dettagli']['oggetti']['{IMPORTOPRELEVATO}'] = "IMPORTOPRELEVATO";
                query['statoOrdini.html:dettagli']['oggetti']['{PERCNONPRELEVATE}'] = "PERCNONPRELEVATE";
                query['statoOrdini.html:dettagli']['oggetti']['{QUDAEVADERE}'] = "QUDAEVADERE";
                query['statoOrdini.html:dettagli']['oggetti']['{IMPORTODAEVADERE}'] = "IMPORTODAEVADERE";
                query['statoOrdini.html:dettagli']['oggetti']['{RIGA}'] = "RIGA";
                query['statoOrdini.html:dettagli']['oggetti']['{ID}'] = "ID";
                query['statoOrdini.html:dettagli']['oggetti']['{DOCUMENTOEVASIONE}'] = "DOCUMENTOEVASIONE";


                query['ListaClienti.html'] = new Array;
                query['ListaClienti.html']['OFFSET'] = 0;
                query['ListaClienti.html']['FETCH'] = 100;
                query['ListaClienti.html']['MAXFETCH'] = 0;
                query['ListaClienti.html']['COUNT'] = "id";
                query['ListaClienti.html']['textBoxRicerca'] = "txtRicercaCliente";
                query['ListaClienti.html']['modello2Righe'] = elementiListaClientiFiltro;
                query['ListaClienti.html']['modello1Riga'] = '<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

                query['statoOrdini.html:elencoStatoOrdine'] = new Array;
                query['statoOrdini.html:elencoStatoOrdine']['modello1Riga'] = elementiFiltriSceltaMultipla;

                query['statoOrdini.html:ordinamenti'] = new Array;
                query['statoOrdini.html:ordinamenti']['modello1Riga'] = elementiOrdinamento;



                var mese = new String(new Date().getMonth() + 1);
                var anno = new Date().getFullYear();

                if (mese.length == 1) {
                    mese = "0" + mese;
                }

                if (xIdCliente > 0 || parametriSO.modificheFerrara == 1) {
                    var t = document.getElementById("tabAperti");

                    if (parametriSO.modificheDenaro == 1 && xIdCliente > 0) {
                        t.classList.add("w100");
                        t.classList.remove("w30");
                        t.innerHTML = "STATO ORDINI";

                        document.getElementById("tabPreordini").classList.add("hide");
                        document.getElementById("pulsantiera").classList.add("hide");
                        document.getElementById("divCorpo").classList.add("posBottomA60p");
                        document.getElementById("divCorpo").classList.remove("posBottomA110p");
                    } else {
                        t.classList.add("w50");
                        t.classList.remove("w30");
                        t.innerHTML = "ORDINI";

                        document.getElementById("tabPreordini").classList.add("w50");
                        document.getElementById("tabPreordini").classList.remove("w25");

                        if (parametriSO.modificheFerrara == 1) {
                            document.getElementById("tabPreordini").innerHTML = "PREVENTIVI";
                        }
                        if (parametriSO.visualizzaSoloOrdini == 1) {
                            document.getElementById("tabPreordini").classList.add("hide");
                            document.getElementById("tabDaCompletare").classList.add("hide");
                            t.classList.add("w100");
                            t.classList.remove("w50");
                        }
                    }

                    document.getElementById("tabParzChiusi").classList.add("hide");
                    document.getElementById("tabChiusi").classList.add("hide");

                    query['statoOrdini.html']['modelloRiga'] = elementiStatoOrdiniPE;
                    query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliOrdiniPE;
                    query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoOrdiniPE;

                    var e = document.getElementById("intestazioneGriglia");
                    e.innerHTML = intestazioneStatoOrdiniPE;

                    var e = document.getElementById("rigaPiede");
                    e.innerHTML = piedeOrdiniPE;
                } else {
                    if (xIdVettore > 0) {
                        document.getElementById("tabPreordini").classList.add("hide");
                        document.getElementById("tabParzChiusi").classList.add("hide");
                        var x = document.querySelectorAll('.tablinkColonne');
                        for (var n = 0; n < (x.length); n++) {
                            x[n].classList.remove("w20");
                            x[n].classList.remove("w25");
                            x[n].classList.remove("w30");
                            x[n].classList.add("w50");
                            // x[n].style.width='33%!important';

                        }
                    }
                    var e = document.getElementById("intestazioneGriglia");
                    e.innerHTML = intestazioneStatoOrdiniDE;

                    var e = document.getElementById("rigaPiede");
                    e.innerHTML = piedeOrdiniDE;
                }

                document.getElementById("tabAperti").classList.add("tabLinkSelezionato");

                setTimeout(function () {
                    if (xIdCliente == 0 && xIdVettore == 0 && parametriSO.emissioneDDT == 0) {
                        var d = document.getElementById("txtDataDa");
                        d.value = convertiDataItaEng('01/' + mese + '/' + anno);
                    }

                    var d = document.getElementById("txtDataA");
                    d.value = oggiISO();

                    carDatiStorico()
                }, 100);
            }
        }
    }
}

var soloAperti = 1;
var soloParzChiusi = 0
var soloChiusi = 0;
var preordini = 0;
var xFiltri = 0;
var idCliente = 0;
var idAgente = 0;
var StatoOrdine = "";
var ricerca = "";
var filtroNumero = 0;
var numeroDa = 0;
var numeroA = 0;
var serieDa = "";
var serieA = "";
var visValore = 0;
var idDepositoVettore = '';
var nomeStorage = nomePagina;
var daCompletare = 0;

var tabDefault = "tabCliente";

var aIdCliente = recuperaParametroHRef("", "idCliente");
if (aIdCliente != "") {
    idCliente = aIdCliente;
    document.getElementById("tabCliente").classList.add("hide");
    document.getElementById("tabAgente").classList.add("hide");
    tabDefault = "tabStatoOrdine";
}

function carDatiStorico() {
    if (xIdAgente == 0 && xIdCliente == 0 && xIdVettore == 0) {
        AvviaCarDatiElencoClienti("elencoAgente", "AGENTE", true, 1);
    } else {
        document.getElementById("tabAgente").style.display = "none";
    }

    if (xIdCliente == 0 && xIdVettore == 0) {
        AvviaCarDatiElencoClienti("elencoCliente");
    } else {
        document.getElementById("tabCliente").style.display = "none";
        tabDefault = "tabStatoOrdine";
    }

    if (xIdVettore > 0) {
        avviaCarDati("datiVettore", "datiVettore");
    }

    avviaCarDati("cmbDeposito");

    avviaCarDatiGenerico("elencoStatoOrdine", "statoOrdini");

    document.getElementById(tabDefault).click();

    var daID = sessionStorage.getItem("carrelloDaAprire");

    if (daID != undefined) {
        sessionStorage.removeItem("carrelloDaAprire");
        sessionStorage.removeItem("carrello." + daID);
        document.getElementById("tabPreordini").click();
    } else {
        avviaCarStoricoOrdini();
    }
}

function elencoECScroll(ec, pagina) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina + "." + ec.getAttribute("name"), scrollPos);

    if (maxScroll - scrollPos < (maxScroll / 100) && elencoInCaricamento == 0) {
        avviaCarStoricoOrdini(false);
    }
}

function txtDataChange(d) {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1 = setTimeout(function () {
        avviaCarStoricoOrdini();
    }, 1000);
}

function avviaCarStoricoOrdini(ricarica = true) {
    var maxFetch = 0;

    if (query[nomePagina]['MAXFETCH']) {
        maxFetch = query[nomePagina]['MAXFETCH'];
    }

    if (ricarica) {
        maxFetch = 0;
    }

    if (query[nomePagina]['OFFSET'] > maxFetch && maxFetch != 0) {
        return '';
    }

    var da = document.getElementById("txtDataDa");
    var a = document.getElementById("txtDataA");
    var dataConsegnaInput= document.getElementById("txtRicercaDataConsegna");
    var dataDa = "";
    var dataA = "";
    var dataConsegna = "";
    if (isDate(da.value, da)) {
        dataDa = convertiDataEngIta(da.value);
    } else {
        var mese = new String(new Date().getMonth() + 1);
        var anno = new Date().getFullYear();

        if (mese.length == 1) {
            mese = "0" + mese;
        }

        if (xIdCliente == 0 && xIdVettore == 0 && parametriSO.emissioneDDT == 0) {
            da.value = convertiDataItaEng('01/' + mese + '/' + anno);

            dataDa = convertiDataEngIta(da.value);
        }
    }
    if(isDate(dataConsegnaInput.value)){
        dataConsegna = convertiDataEngIta(dataConsegnaInput.value);
    }
    if (isDate(a.value, a)) {
        dataA = convertiDataEngIta(a.value);
    }

    if (ricarica) {
        query[nomePagina]['OFFSET'] = 0;
    }

    var ordinamenti = document.getElementById("lblOrdinamento").innerHTML.replace(/, /g, ',').replace(/ DESC/g, ':');

    if (ordinamenti == '') {
        document.getElementById("cmdOrdinamento").removeAttribute("style");
    } else {
        document.getElementById("cmdOrdinamento").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    }

    if (xIdCliente > 0 || parametriSO.modificheFerrara == 1) {
        soloChiusi = 0;
        soloParzChiusi = 0;
        soloAperti = 0;
    }
    if (xIdVettore > 0) {
        var idVettore = xIdVettore;
    } else {
        var idVettore = 0;
    }

    if (primoAvvio == true) {
        var codiceArticolo = recuperaParametroHRef("", "codice");
        var deposito = recuperaParametroHRef("", "idDeposito");
    } else {
        var codiceArticolo = recuperaValueElemento("ricercaArticoloVenditaBanco");
        var deposito = recuperaValueElemento("cmbDeposito");
    }
    var listaClientiLocal = '';
    if (daCompletare == 1) {
        var listaClientiLocal = verificaPresenzaOrdiniDaCompletare();

        if (listaClientiLocal.length == 0) {
            valorizzaHTMLElemento("elencoEC", "");
            return;
        }
    }

    primoAvvio = false;

    var parametri = {
        "tipoRisposta": "storicoOrdini", "tipoQuery": "statisticheClienti", "nomeQuery": nomePagina, "dataDa": dataDa, "dataA": dataA, "ricarica": ricarica,
        "offSet": query[nomePagina]['OFFSET'], "fetch": query[nomePagina]['FETCH'], "chiamante": "storicoOrdini", "azienda": 0, "idAgente": idAgente,
        "idCliente": idCliente, "soloChiusi": soloChiusi, "soloParzChiusi": soloParzChiusi, "soloAperti": soloAperti, "statoDocumento": StatoOrdine, "serieDa": serieDa,
        "serieA": serieA, "numeroDa": numeroDa, "numeroA": numeroA, "ordinamento": ordinamenti, "preordini": preordini, "modificheDenaro": parametriSO.modificheDenaro,
        "modificheFerrara": parametriSO.modificheFerrara, "modificheIceCube": parametriSO.modificheIceCube, "idVettore": idVettore,
        "statoOrdineDopoAvvisoVettore": parametriSO.statoOrdineDopoAvvisoVettore, "codiceArticolo": codiceArticolo, "deposito": deposito, 'daCompletare': daCompletare, 'listaClientiLocal': listaClientiLocal,"dataConsegna":dataConsegna
    };

    elencoInCaricamento = 1;

    inviaRichiestaCentralino("query", parametri, elaboraStoricoOrdini, "body");
}

function elaboraStoricoOrdini(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;
    var ordinamenti = risp.ordinamenti;

    if (risp.error != '') {
        return "";
    }

    switch (parametri["tipoRisposta"]) {
        case "storicoOrdini":

            var ul = document.getElementById("elencoEC");
            var li = "";
            var ricarica = parametri["ricarica"];
            var dataDa = parametri["dataDa"];
            var dataA = parametri["dataA"];

            if (ricarica) {
                xProgressivo = 0;
            }

            query[nomePagina]['OFFSET'] += query[nomePagina]['FETCH'];
            popolaListaOrdinamenti(ordinamenti, 'elencoOrdinamento', 'cmdOrdinamento', nomePagina + ':ordinamenti');
            popolaElencoDaJson(data, "elencoEC", 0, nomePagina, ricarica, 0);

            if (ricarica) {
                parametri.tipoRisposta = "saldo";
                parametri.saldi = "SALDI";

                // var parametri={"tipoRisposta":"saldo","saldi":"SALDI","tipoQuery":"statisticheClienti","nomeQuery":nomePagina, 
                // "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,"offSet":0,"fetch":0,"chiamante":"storicoOrdini","azienda":parametri.azienda,
                // "idAgente":parametri.idAgente,"idCliente":parametri.idCliente,"soloChiusi":parametri.soloChiusi,"soloParzChiusi":parametri.soloParzChiusi,
                // "soloAperti":parametri.soloAperti,"statoDocumento":parametri.statoDocumento,"serieDa":parametri.serieDa,
                // "serieA":parametri.serieA,"numeroDa":parametri.numeroDa,"numeroA":parametri.numeroA,"preordini":preordini,"idVettore":xIdVettore
                // };
                nrPallets = '';
                nrPalletsSelezionato = 0;
                idOrdiniSelezionato = new Array();
                datiVettore = {};
                inviaRichiestaCentralino("query", parametri, elaboraStoricoOrdini);
            } else {
                elencoInCaricamento = 0;
            }

            if (parametri.daCompletare == 1) {
                for (var x in parametri.listaClientiLocal) {
                    for (var [k, v] of Object.entries(parametri.listaClientiLocal[x])) {
                        try {
                            var dest='.'+'0';
                            if(v.idDest!=undefined){
                                dest='.'+v.idDest;
                            }
                            document.getElementById('QU.' + k+dest).innerHTML = v.qu;
                            document.getElementById('TOTIMP.' + k+dest).innerHTML = formattaNumeri(listaDocumentiDaCompletare[k+dest].totali.totale, 2, 2);
                            document.getElementById('TOTIVA.' + k+dest).innerHTML = formattaNumeri(listaDocumentiDaCompletare[k+dest].totali.tIva, 2, 2);
                            document.getElementById('TOT.' + k+dest).innerHTML = formattaNumeri(listaDocumentiDaCompletare[k+dest].totali.tDoc, 2, 2);
                        } catch (error) {
                            // return;
                        }
                    }
                }
            }
            break;
        case "saldo":
            var righe = 0;
            var qu = 0;
            var importo = 0;
            var nr = 0;
            var righeEvase = 0;
            var quEvasa = 0;
            var importoEvaso = 0;
            var righeDaEvadere = 0;
            var quDaEvadere = 0;
            var importoDaEvadere = 0;
            var righeTagliate = 0;
            var quTagliata = 0;
            var importoTagliato = 0;
            var righeInevase = 0;
            var righePrelevate = 0;
            var quPrelevata = 0;
            var importoPrelevato = 0;
            var tColli = 0;

            if (data[0] != 0) {
                for (n in data) {
                    nr += Number(data[n].NUMERO);
                    righe += Number(data[n].RIGHE);
                    qu += Number(data[n].QU);
                    importo += Number(data[n].TIMPORTO);
                    righeEvase += Number(data[n].RIGHEEVASE);
                    righePrelevate += Number(data[n].RIGHEPRELEVATE);
                    quPrelevata += Number(data[n].QUPRELEVATE);
                    quEvasa += Number(data[n].QUEVASE);
                    importoEvaso += Number(data[n].TIMPORTOEVASO);
                    importoPrelevato += Number(data[n].IMPORTOPRELEVATO);
                    righeTagliate += Number(data[n].RIGHETAGLIATE);
                    quTagliata += Number(data[n].QUTAGLIATE);
                    importoTagliato += Number(data[n].TIMPORTOTAGLIATO);
                    righeInevase += Number(data[n].RIGHEINEVASE);
                    righeDaEvadere += Number(data[n].RIGHEDAEVADERE);
                    quDaEvadere += Number(data[n].QUDAEVADERE);
                    importoDaEvadere += Number(data[n].TIMPORTODAEVADERE);
                    tColli += Number(data[n].TCOLLI);
                }
            }

            if (parametriSO.righeOrdiniUgualeQu == 0) {
                var tRighe = righe;
                var tRigheT = righeTagliate;
                var tRigheE = righeEvase;
                var tRigheP = righePrelevate;
                var tRigheDE = righeDaEvadere;
            } else {
                var tRighe = qu;
                var tRigheT = quTagliata;
                var tRigheE = quEvasa;
                var tRigheP = quPrelevata;
                var tRigheDE = quDaEvadere;
            }

            var colli = "";

            if (parametriSO.modificheIceCube == 1) {
                colli = " (" + formattaNumeri(tColli, 1, 0) + " plt)";
            }

            valorizzaHTMLElemento("nr", nr);
            valorizzaHTMLElemento("nrP", nr);
            valorizzaHTMLElemento("righe", formattaNumeri(tRighe, 1, 0) + colli);
            valorizzaHTMLElemento("righeG", formattaNumeri(tRighe, 1, 0) + colli);
            valorizzaHTMLElemento("tImporto", formattaNumeri(importo, 2, 2));
            valorizzaHTMLElemento("tImportoG", formattaNumeri(importo, 2, 2));
            valorizzaHTMLElemento("righeTagliate", formattaNumeri(tRigheT, 1, 0));
            valorizzaHTMLElemento("righeTagliateG", formattaNumeri(tRigheT, 1, 0));
            valorizzaHTMLElemento("tImportoTagliato", formattaNumeri(importoTagliato, 2, 2));
            valorizzaHTMLElemento("tImportoTagliatoG", formattaNumeri(importoTagliato, 2, 2));
            valorizzaHTMLElemento("righeEvase", formattaNumeri(tRigheE, 1, 0));
            valorizzaHTMLElemento("righeEvaseG", formattaNumeri(tRigheE, 1, 0));
            valorizzaHTMLElemento("tImportoEvaso", formattaNumeri(importoEvaso, 2, 2));
            valorizzaHTMLElemento("tImportoEvasoG", formattaNumeri(importoEvaso, 2, 2));
            valorizzaHTMLElemento("righePrelevate", formattaNumeri(tRigheP, 1, 0));
            valorizzaHTMLElemento("righePrelevateG", formattaNumeri(tRigheP, 1, 0));
            valorizzaHTMLElemento("tImportoPrelevato", formattaNumeri(importoPrelevato, 2, 2));
            valorizzaHTMLElemento("tImportoPrelevatoG", formattaNumeri(importoPrelevato, 2, 2));
            valorizzaHTMLElemento("righeDaEvadere", formattaNumeri(tRigheDE, 1, 0));
            valorizzaHTMLElemento("righeDaEvadereG", formattaNumeri(tRigheDE, 1, 0));
            valorizzaHTMLElemento("tImportoDaEvadere", formattaNumeri(importoDaEvadere, 2, 2));
            valorizzaHTMLElemento("tImportoDaEvadereG", formattaNumeri(importoDaEvadere, 2, 2));

            var percEvasa = "";
            var percEvasaG = "";
            var percDaEvadere = "";
            var percDaEvadereG = "";
            var percPrelevato = "";
            var percPrelevatoG = "";

            if (importo != 0) {
                perc = 100 * importoEvaso / importo;

                percEvasaG = " (" + formattaNumeri(perc, 1, 0) + "% evasi)";
                percEvasa = " (" + formattaNumeri(perc, 1, 0) + "%)";
                percDaEvadereG = " (" + formattaNumeri(100 - perc, 1, 0) + "% da Evadere)";
                percDaEvadere = " (" + formattaNumeri(100 - perc, 1, 0) + "%)";
            }

            if (importo != 0) {
                perc = 100 * importoPrelevato / importo;

                percPrelevatoG = " (" + formattaNumeri(perc, 1, 0) + "% prelevati)";
                percPrelevato = " (" + formattaNumeri(perc, 1, 0) + "%)";
            }

            valorizzaHTMLElemento("percDaEvadere", percDaEvadere);
            valorizzaHTMLElemento("percDaEvadereG", percDaEvadereG);
            valorizzaHTMLElemento("percEvaso", percEvasa);
            valorizzaHTMLElemento("percEvasoG", percEvasaG);
            valorizzaHTMLElemento("percPrelevato", percPrelevato);
            valorizzaHTMLElemento("percPrelevatoG", percPrelevatoG);

            elencoInCaricamento = 0;
            break;
    }
}

function apriDettagliDocumenti(li, ricarica = true) {
    if (xImmagineAperta) {
        xImmagineAperta = false;
        return;
    }

    var id = li.getAttribute("id");
    var nomeQuery = "";

    var div = li.getElementsByTagName("div");
    var divDes = div[0].getElementsByTagName("div");
    var descrizione = divDes[1].innerHTML.replace(/<br>/g, " ");

    try {
        var nodoRagSoci = document.getElementById('ragioneSociale.' + id);
        var d = nodoRagSoci.innerText;
        if (d != "") {
            descrizione += "<br>" + d;
        }
    } catch (error) {

    }

    descrizione = descrizione.replace("'", "").replace("%", "").replace("&", "");

    tabella = "MOVIMENTI";
    nomeQuery = nomePagina + ":dettagli";

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
    // if(daCompletare==1){
    //     return 
    // }
    var codiceArticolo = recuperaValueElemento("ricercaArticoloVenditaBanco");

    var parametri = {
        "tipoRisposta": "dettagli", "tipoQuery": "statisticheClienti", "nomeQuery": nomeQuery, "dataDa": "", "dataA": "", "ricarica": ricarica,
        "offSet": query[nomeQuery]['OFFSET'], "fetch": query[nomeQuery]['FETCH'], "chiamante": "dettaglioStoricoOrdini", "azienda": 0, "idAgente": 0,
        "idCliente": 0, "soloChiusi": 0, "soloParzChiusi": 0, "soloAperti": 1, "statoDocumento": "", "idTes": id, "desDoc": descrizione.replace(/&/g, "e"), "serieDa": "",
        "serieA": "", "numeroDa": 0, "numeroA": 0, "preordini": preordini, "modificheDenaro": parametriSO.modificheDenaro,
        "modificheFerrara": parametriSO.modificheFerrara, 'daCompletare': daCompletare, 'listaClientiLocal': '', 'codiceArticolo': codiceArticolo
    };

    elencoInCaricamento = 1;

    inviaRichiestaCentralino("query", parametri, elaboraDettagliDocumento);
}

function elaboraDettagliDocumento(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    elencoInCaricamento = 0;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        return "";
    }

    sessionStorage.setItem(parametri.nomeQuery + ".offSet", parametri.offSet);
    query[parametri.nomeQuery]['OFFSET'] += query[parametri.nomeQuery]['FETCH'];

    apriModalDettagli(parametri.nomeQuery, parametri.desDoc, data, parametri.idTes, parametri.ricarica);
}

function tabClick(elmnt) {
    //Nascondo tutti gli elementi con class="tabcontent"
    var i, tablinks;

    //Rimuovo il colore di background
    tablinks = document.getElementsByClassName("tablinkColonne");
    // for (i=0; i<tablinks.length; i++){
    //     tablinks[i].setAttribute("style","");
    // }
    if (tablinks.length > 0) {
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    } else {
        tablinks = document.getElementsByClassName("tablinkColonne");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    }

    //Aggiungo uno specifico colore al pulsante usato per aprire il contenuto
    // elmnt.style.background = "rgb("+xColoreScuro+")";
    elmnt.classList.add("tabLinkSelezionato");

    var e = document.getElementById("intestazioneGriglia");
    var r = document.getElementById("rigaPiede");
    if (elmnt.getAttribute('id') == 'tabDaCompletare') {
        hide('pulsantiera');
        document.getElementById('txtDataDa').disabled = true;
        document.getElementById('txtDataA').disabled = true;
        hide('cmdAggiorna')
        hide('divPiede');
    } else {
        // document.getElementById('pulsantiera').classList.remove('hide');
        show('pulsantiera')
        document.getElementById('txtDataDa').disabled = false;
        document.getElementById('txtDataA').disabled = false;
        // document.getElementById('cmdAggiorna').classList.remove('hide');
        show('cmdAggiorna')
        show('divPiede')
        // document.getElementById('divPiede').classList.remove('hide');
    }
    if (elmnt.getAttribute("id") == "tabAperti" && xIdCliente == 0 && parametriSO.modificheFerrara == 0) {
        soloAperti = 1;
        soloParzChiusi = 0;
        soloChiusi = 0;
        preordini = 0;
        daCompletare = 0;
        query['statoOrdini.html']['modelloRiga'] = elementiStatoOrdiniDE;
        query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliOrdiniDE;
        query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoOrdiniDE;
        e.innerHTML = intestazioneStatoOrdiniDE;
        r.innerHTML = piedeOrdiniDE;
    } else if (elmnt.getAttribute("id") == "tabParzChiusi" || (elmnt.getAttribute("id") == "tabAperti" && (xIdCliente > 0 || parametriSO.modificheFerrara == 1))) {
        soloAperti = 0;
        soloParzChiusi = 1;
        soloChiusi = 0;
        preordini = 0;
        daCompletare = 0;
        query['statoOrdini.html']['modelloRiga'] = elementiStatoOrdiniPE;
        query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliOrdiniPE;
        query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoOrdiniPE;
        e.innerHTML = intestazioneStatoOrdiniPE;
        r.innerHTML = piedeOrdiniPE;
    } else if (elmnt.getAttribute("id") == "tabChiusi") {
        soloAperti = 0;
        soloParzChiusi = 0;
        soloChiusi = 1;
        preordini = 0;
        daCompletare = 0;
        query['statoOrdini.html']['modelloRiga'] = elementiStatoOrdini;
        query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliOrdini;
        query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoOrdini;
        e.innerHTML = intestazioneStatoOrdini;
        r.innerHTML = piedeOrdini;
    } else if (elmnt.getAttribute('id') == 'tabDaCompletare') {
        soloAperti = 0;
        soloParzChiusi = 0;
        soloChiusi = 0;
        preordini = 0;
        daCompletare = 1;
        query['statoOrdini.html']['modelloRiga'] = elementoRigaOrdineDaCompletare;
        query['statoOrdini.html:dettagli']['modelloRiga'] = '';
        query['statoOrdini.html:dettagli']['modelloContenitore'] = '';
        e.innerHTML = intestazioneStatoOrdiniDaCompletare;
        r.innerHTML = '';

    } else {
        soloAperti = 0;
        soloChiusi = 0;
        preordini = 1;
        daCompletare = 0;
        query['statoOrdini.html']['modelloRiga'] = elementiPreOrdini;
        e.innerHTML = intestazionePreOrdini;
        r.innerHTML = piedePreOrdini;
        query['statoOrdini.html:dettagli']['modelloRiga'] = elementiDettagliPreOrdini;
        query['statoOrdini.html:dettagli']['modelloContenitore'] = modalStoricoPreOrdini;
    }

    avviaCarStoricoOrdini();
}

function listaDaCliente(a, id, descrizione) {
    if (idCliente > 0) {
        xFiltri -= 1;
    }
    idCliente = id; //a.getAttribute("ID");
    avviaCarStoricoOrdini();
    document.getElementById("lblFiltroCliente").innerHTML = "Selezione: " + descrizione;
    document.getElementById("tabCliente").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    document.getElementById("cmdFiltri").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    xFiltri += 1

    segnaStato(a, "elencoCliente", "", "", "", nomeStorage);
}

function eliminaFiltroCliente(a) {
    if (idCliente > 0) {
        idCliente = 0;
        avviaCarStoricoOrdini();
        document.getElementById("lblFiltroCliente").innerHTML = "Selezione: ";
        document.getElementById("tabCliente").removeAttribute("style");

        xFiltri -= 1

        if (xFiltri == 0) {
            document.getElementById("cmdFiltri").removeAttribute("style");
        }

        eliminaStato(nomeStorage + ".elencoCliente.id");
        eliminaStato(nomeStorage + ".elencoCliente.descrizioneId");
    }
}

function listaDaAgente(a) {
    if (idAgente > 0) {
        xFiltri -= 1;
    }
    idAgente = a.getAttribute("ID");
    avviaCarStoricoOrdini();
    document.getElementById("lblFiltroAgente").innerHTML = "Selezione: " + a.innerHTML.substring(0, a.innerHTML.indexOf('<img'));
    document.getElementById("tabAgente").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    document.getElementById("cmdFiltri").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    xFiltri += 1

    segnaStato(a, "elencoAgente", "", "", "", nomeStorage);
}

function eliminaFiltroAgente(a) {
    if (idAgente > 0) {
        idAgente = 0;
        avviaCarStoricoOrdini();
        document.getElementById("lblFiltroAgente").innerHTML = "Selezione: ";
        document.getElementById("tabAgente").removeAttribute("style");

        xFiltri -= 1

        if (xFiltri == 0) {
            document.getElementById("cmdFiltri").removeAttribute("style");
        }

        eliminaStato(nomeStorage + ".elencoAgente.id");
        eliminaStato(nomeStorage + ".elencoAgente.descrizioneId");
    }
}

function listaDaSceltaMultipla(tipo, id) {
    if (StatoOrdine != "") {
        xFiltri -= 1;
    }

    StatoOrdine = "";

    var ul = document.getElementById("elencoStatoOrdine");
    var chk = ul.getElementsByTagName("input");
    for (i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            StatoOrdine += chk[i].getAttribute("name") + ",";
        }
    }

    if (StatoOrdine != "") {
        StatoOrdine = StatoOrdine.substring(0, StatoOrdine.length - 1);
    }

    avviaCarStoricoOrdini();

    if (StatoOrdine != "") {
        document.getElementById("tabStatoOrdine").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
        document.getElementById("cmdFiltri").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";

        xFiltri += 1
    } else {
        document.getElementById("tabStatoOrdine").removeAttribute("style");
    }

    if (xFiltri == 0) {
        document.getElementById("cmdFiltri").removeAttribute("style");
    }
}

function listaDaNumero() {
    if (timer1) {
        clearTimeout(timer1);
    }

    timer1 = setTimeout(function () {
        if (filtroNumero > 0) {
            xFiltri -= 1;
        }

        numeroDa = document.getElementById("txtRicercaNumeroDa").value;
        numeroA = document.getElementById("txtRicercaNumeroA").value;
        serieDa = document.getElementById("txtRicercaSerieDa").value;
        serieA = document.getElementById("txtRicercaSerieA").value;

        filtroNumero = 0;

        if (numeroDa != "" || numeroA != "" || serieDa != "" || serieA != "") {
            filtroNumero = 1
        }

        avviaCarStoricoOrdini();

        if (filtroNumero > 0) {
            document.getElementById("tabNumero").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
            document.getElementById("cmdFiltri").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";

            xFiltri += 1
        } else {
            document.getElementById("tabNumero").removeAttribute("style");
        }

        if (xFiltri == 0) {
            document.getElementById("cmdFiltri").removeAttribute("style");
        }
    }, 1000);
}

function clickBack() {
    if (xTarget == "_blank") {
        window.close();
    } else {
        if(typeof modElectron!='undefined' && modElectron==true){
            if (aIdCliente == "") {
                location.href="mainPage.html";
            } else {
                location.href="graficiAnagrafiche.html?tipoAnagrafica=CLIENTE";
            }
        }else{
            if (aIdCliente == "") {
                open("mainPage.html", xTarget);
            } else {
                open("graficiAnagrafiche.html?tipoAnagrafica=CLIENTE", xTarget);
            }
        }
    }
}

function AvviaCarDatiElencoClienti(tipoRisposta, tipoAnagrafica = "CLIENTE", ricarica = true, righe = 2, scrollTop = 0) {
    var nomeQuery = "ListaClienti.html";
    var nomeSession = nomePagina + "." + tipoRisposta;

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

    var parametri = {
        "tipoQuery": "listaClienti", "tipoRisposta": tipoRisposta, "nomeQuery": nomeQuery, "ricerca": ricerca, "tipoElenco": righe,
        "ricarica": ricarica, "azienda": 0, "idCliente": 0, "idAgente": 0, "localita": "", "prov": "",
        "idZona": 0, "idFamiglia": 0, "aperti": 0, "offSet": query[nomeQuery]['OFFSET'], "fetch": query[nomeQuery]['FETCH'],
        "chiamante": tipoRisposta, "tipoAnagrafica": tipoAnagrafica, "nomeSession": nomeSession
    };

    var md5 = sessionStorage.getItem(nomeSession + ".md5");
    if (md5 != undefined) {
        parametri.md5 = md5;
    }

    elencoInCaricamento = 1;

    inviaRichiestaCentralino("query", parametri, elaboraRispostaClienti);
}

function elaboraRispostaClienti(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    elencoInCaricamento = 0;

    if (risp.error != '') {
        return "";
    }

    var nomeSession = parametri.nomeSession;

    if (parametri.md5 == risp.md5) {
        data = JSON.parse(sessionStorage.getItem(nomeSession + ".jSon"));
    } else {
        sessionStorage.setItem(nomeSession + ".md5", risp.md5);
        sessionStorage.setItem(nomeSession + ".jSon", JSON.stringify(data));
    }

    if (parametri.tipoRisposta == "elencoCliente") {
        sessionStorage.setItem(nomeSession + ".offSet", parametri.offSet);
        query[parametri.nomeQuery]['OFFSET'] += query[parametri.nomeQuery]['FETCH'];
    }

    popolaElencoDaJson(data, parametri.tipoRisposta, parametri.tipoElenco, parametri.nomeQuery, parametri.ricarica, parametri.scrollTop);
}

function elencoClientiScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina + ".elencoCliente.scroolTop", scrollPos);

    if (maxScroll - scrollPos < (maxScroll / 100) && elencoInCaricamento == 0) {
        AvviaCarDatiElencoClienti("elencoCliente", "CLIENTE", false);
    }
}

function dettaglioOrdiniScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina + ".dettaglioOrdini.scroolTop", scrollPos);

    if (maxScroll - scrollPos < (maxScroll / 100) && elencoInCaricamento == 0) {
        var md = document.getElementById("myStorico");
        var idTes = md.getAttribute("idTes");
        var li = document.getElementById(idTes);
        apriDettagliDocumenti(li, false);
    }
}

function txtRicercaChange(input, ulID, sottoQuery, righe) {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1 = setTimeout(function () {
        xRag = "";

        ricerca = input.value;

        AvviaCarDatiElencoClienti("elencoCliente");

        clearTimeout(timer1);

        inputID = input.getAttribute("id");

        salvaFiltro(inputID, tipoAnagrafica);
    }, 1000);
}

function cambiaOrdinamento() {
    document.getElementById('nav-toggleL').checked = false;
    avviaCarStoricoOrdini()
}

function eliminaPreordine(e, id, nr, data) {
    xImmagineAperta = true;
    attivaAlert(5, "Sei sicuro di voler eliminare il PreOrdine nr. " + nr + " del " + data, "rispEliminaPreordine_" + id);
}

function rispEliminaPreordine(risp, id) {
    if (risp == "Si") {
        avviaEliminaPreordine(id);
    } else {
        chiudiModalAlert("rispEliminaPreordine");
    }
}

function avviaEliminaPreordine(id) {
    var parametri = { "tipoRisposta": "elimina", "tipoElimina": "ordine", "dati": id };
    inviaRichiestaCentralino("elimina", parametri, elaboraEliminaPreordine);
}

function elaboraEliminaPreordine(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        attivaAlert(0, "Errore durante l'eliminazione del documento", "fineElimina");
        return "";
    }

    attivaAlert(4, "Eliminazione PreOrdine Nr. " + data.numero + " " + data.serie + " Avvenuta con Successo", "fineElimina");

    avviaCarStoricoOrdini();
}

function apriModificaPreOrdine(id) {
    var parametri = { "tipoRisposta": "documento", "tipoQuery": "preOrdini", "chiamante": "modificaOrdini", "percorsoImmagini": xPercorsoImmagini, "id": id };

    elencoInCaricamento = 1;
    xImmagineAperta = true;

    inviaRichiestaCentralino("multiQuery", parametri, elaboraRigheOrdine);
}

function elaboraRigheOrdine(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        attivaAlert(0, "Errore durante il caricamento dei dati del documento", "fineElimina");
        return "";
    }

    var ragsoc = "NESSUN CLIENTE SELEZIONATO";

    try {
        ragsoc = data.skCliente[0].RAGIONE_SOCIALE;
    } catch (error) {

    }

    sessionStorage.setItem("ragioneSociale", ragsoc)
    sessionStorage.setItem("carrello." + parametri.id, _toJSONString(data));
    sessionStorage.setItem("carrelloDaAprire", parametri.id);
    sessionStorage.setItem("idCliente", data.testata.idCliente);
    sessionStorage.setItem("schedaCliente.html.CLIENTE." + data.testata.idCliente + ".jSon", _toJSONString(data.skCliente));

    window.open("ListaArticoli.html?tipoAnagrafica=CLIENTE", "_self");
}

function modalCambiaStatoOrdine(idOrdine, statoOrdine,forzaChiusuraOrdine=0) {
    var nodo = document.querySelector('#tabChiusi');
    var nodoSelezionato = ''
    var nodoSelezionato = nodo.classList.contains('tabLinkSelezionato');
    if (parametriSO.cambiaStatoOrdine == undefined || parametriSO.cambiaStatoOrdine == 0) {
        if (xGruppoUtente != 'Amministratori' && (xIdVettore == 0 || nodoSelezionato != true)) {
            return;
        }
    }
    xImmagineAperta = true;
    var listOption = '';
    for (var x of statoOrdiniArray) {
        listOption += `<option value="${x.id}" ${statoOrdine == x.id ? "selected" : ''}>${x.d1}</option>`;
    }
    var divForzaChiusura='';
    if(forzaChiusuraOrdine==1){
        var divForzaChiusura=`
        <div class="row">
            <div id="divForzaChiusura" class="row h30p w100 marg10Top marg10Sx">
                <input id="chkForzaChiusura" name="chkForzaChiusura" type="checkbox" class="w30p h30p" onclick="controlloChiusuraOrdine(this)">
                <label for="chkForzaChiusura" class="intestazione posTop-5p clrTestoNero">Forza Chiusura</label>
            </div>
        </div>`
    }
    query['modificaStatoOrdini'] = new Array();
    query['modificaStatoOrdini']['modalC-body'] = `<div class="padTop10">
            <div class="has-float-label w100">
                <select id="slcSceltaStato" placeholder="Cambio Stato ordine" onchange="">
                    ${listOption}
                </select>
                <label for="slcSceltaStato">Cambio Stato ordine</label>
            </div>
            ${divForzaChiusura}
        </div>`;
    apriModalCustom('modificaStatoOrdini', '', 'Modifica stato ordini', "cambiaStatoOrdine('" + idOrdine + "')", 0);
}

function cambiaStatoOrdine(idOrdine) {
    var nuovoStato = recuperaValueElemento('slcSceltaStato');
    var jSon = {
        'idTes': idOrdine,
        'statoDocumento': nuovoStato,
        'descrizioneStato': listaStatoOrdini[nuovoStato],
        'av':'V'
    }
    if(document.getElementById('chkForzaChiusura')!=null){
        jSon.forzaChiusura=document.getElementById('chkForzaChiusura').checked;
        if(jSon.forzaChiusura==true){
            jSon.forzaChiusura=1;
        }else{
            jSon.forzaChiusura=0;
        }
    }
    var parametri = {
        tipoRisposta: "update",
        tipoSalva: "cambiaStatoDocumento", 
        dati: jSon
    };

    inviaRichiestaCentralino("update", parametri, (res) => {
        var risp = JSON.parse(res);
        var error = risp.error;
        if (error != '') {
            attivaAlert(xTipoAllert.CRITICO, error);
            return;
        }
        var nodi = document.querySelectorAll('.tablinkColonne')

        for (var x = 0; x < nodi.length; x++) {
            if (nodi[x].classList.contains('tabLinkSelezionato')) {
                tabClick(nodi[x]);
                break;
            }
        }
        chiudiModalCustom();
    });
}

var ordineTmp;

function inizioEvasioneOrdineVettoreGestLotti() {
    var script = document.createElement('script');
    script.src = "js/documento.js";
    document.body.appendChild(script);

    script.onload = () => {
        var modal = document.getElementById("myStorico");
        var idTes = modal.getAttribute('idtes')
        var obj = {
            'av': 'V',
            'id': idTes,
            'importDocumento': true
        }

        richiamaDocumento(obj, res => {
            if (res.error != '') {
                attivaAlert(xTipoAllert.CRITICO, res.error);
                return;
            }
            console.log(res.risposta)
            documento = res.risposta;
            for (var x of documento.prodotti.data) {
                if (x.codice != '' && x.gestioneLotti == 1) {
                    document.querySelector('#gestioneLottiRighe-' + x.idMovOrig).classList.remove('hide')
                }
            }

            if (parametriSO.emissioneDDT == 1) {
                idDepositoVettore = documento.skCliente[0].IDDEPOSITO;
            }

            var btn = document.getElementById('btnModalEvasioneOrdineVettore');
            btn.innerText = 'Genera DDT';
            var onclick = `attivaAlert(5,"Attenzione, sei sicuro di voler generare il DDT ?","generaDDTVettori_")`
            btn.setAttribute('onCLick', onclick);
        });
    }
}

function apriFormInserimentoLotto(id) {
    query['statoOrdini.html:dettaglioRigaLotti'] = new Array;
    query['statoOrdini.html:dettaglioRigaLotti']['modelloRiga'] = dettaglioLottiRiga;
    query['statoOrdini.html:dettaglioRigaLotti']['campoProgressivo'] = '';
    query['statoOrdini.html:dettaglioRigaLotti']['oggetti'] = new Array;
    query['statoOrdini.html:dettaglioRigaLotti']['oggetti']['{LOTTO}'] = 'lotto';
    query['statoOrdini.html:dettaglioRigaLotti']['oggetti']['{SCADENZA}'] = 'scadenza';
    query['statoOrdini.html:dettaglioRigaLotti']['oggetti']['{QU}'] = 'qu';
    query['statoOrdini.html:dettaglioRigaLotti']['oggetti']['{RIGA}'] = 'riga';

    var codiceArticolo = documento.prodotti.data[documento.prodotti.indexID[id]].codice;
    var parametri = { "tipoRisposta": "elenco", "tipoQuery": "querySpecifica", "nomeTabella": "lottoArticolo", "codiceArticolo": codiceArticolo, "deposito": idDepositoVettore };

    inviaRichiestaCentralino("query", parametri, (res) => {
        var risp = JSON.parse(res);
        localStorage.setItem('tmpListaLottiVeBa.json', JSON.stringify(risp.risposta));
        if (document.getElementById('formInserimentoLotti') == undefined) {
            var nodo = document.getElementById('formInserimentoLotti-' + id);
            nodo.innerHTML = query['statoOrdini.html:dettagli']['modelloFormModificaRiga'];
            document.getElementById('txtIDMov').value = id;
            movTemp = documento.prodotti.data[documento.prodotti.indexID[id]].movLotti;
            popolaElencoDaJson(movTemp, 'listaLotti', 0, 'statoOrdini.html:dettaglioRigaLotti');

        } else {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'COMPLETARE L\'INSERIMENTO DEI LOTTI');
        }
    });

}

function chiudiInserimentoLotti() {
    var nodo = document.getElementById('formInserimentoLotti');
    nodo.parentNode.innerHTML = '';
}

function cmbLottoArticolo(e) {
    var inp = document.getElementById('txtCodiceLotto');
    inp.value = e.getAttribute('lotto');
    var iscadenza = document.getElementById('txtScadenzaLotto');
    iscadenza.value = e.getAttribute('scadenza');
    document.getElementById('txtQu').focus();

}

var movTemp = new Array();

function aggiungiRigalotto() {
    var lotto = document.getElementById('txtCodiceLotto').value;
    var scadenza = document.getElementById('txtScadenzaLotto').value;
    var qu = document.getElementById('txtQu').value;
    var idMov = document.getElementById('txtIDMov').value;

    if (lotto == '' || scadenza == '' || qu == '' || Number(qu) <= 0 || lotto.replace(/ /g, '') == '') {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione campo vuoto non valido!');
        return;
    }

    var mov = {
        'lotto': lotto,
        'scadenza': scadenza,
        'qu': qu
    }

    // aggiungiMovimentiLotti(mov,documento.prodotti.indexID[idMov])
    movTemp.push(mov);
    movTemp[movTemp.length - 1].riga = (movTemp.length - 1).toString();
    popolaElencoDaJson(movTemp, 'listaLotti', 0, 'statoOrdini.html:dettaglioRigaLotti');
    document.getElementById('txtCodiceLotto').value = '';
    document.getElementById('txtScadenzaLotto').value = '';
    document.getElementById('txtQu').value = '';
}

function salvaLotti(risp = 'Si', forzaQuantità = false) {
    if (risp == 'Si' || risp == '') {
        if (recuperaValueElemento('txtCodiceLotto') != '' && recuperaValueElemento('txtScadenzaLotto') != '' && recuperaValueElemento('txtQu') != '' && risp != 'Si') {
            attivaAlert(5, "Attenzione, sei sicuro di voler salvare ? i campi risultano compilati  ma non sono stati salvati", "salvaLotti_");
            return;
        }

        if (movTemp.length == 0) {
            chiudiInserimentoLotti();
            return;
        }

        var quTotPrelevate = 0;
        var idMov = recuperaValueElemento('txtIDMov');
        var quOrdinata = Number(document.getElementById('ordinati-' + idMov).innerText);

        for (var x of movTemp) {
            if (!isEmpty(x)) {
                quTotPrelevate += Number(x.qu);
            }
        }

        if (quTotPrelevate < quOrdinata && forzaQuantità == false) {
            attivaAlert(5, "Attenzione, sei sicuro di voler prelevare una quantità minore rispetto a quella ordinata ?", "rspQuMinore_" + idMov);
            return;
        }

        if (quTotPrelevate > quOrdinata && forzaQuantità == false) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "Attenzione, non è possibile prelevare una quantità maggiore rispetto a quella ordinata !");
            return;
        }

        aggiornaTotale(documento.totali, documento.prodotti.data[documento.prodotti.indexID[idMov]], -1, null, null, null, false);

        if (forzaQuantità == true) {
            documento.prodotti.data[documento.prodotti.indexID[idMov]].qu = quTotPrelevate;
        }

        documento.prodotti.data[documento.prodotti.indexID[idMov]].movLotti = movTemp;
        movTemp = new Array;

        chiudiInserimentoLotti();

        var sc = (documento.prodotti.data[documento.prodotti.indexID[idMov]].sconti).split("+");
        documento.prodotti.data[documento.prodotti.indexID[idMov]].importo = calcolaImporto(documento.prodotti.data[documento.prodotti.indexID[idMov]].listino, documento.prodotti.data[documento.prodotti.indexID[idMov]].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);

        aggiornaTotale(documento.totali, documento.prodotti.data[documento.prodotti.indexID[idMov]], 1, null, null, null, false);

        documento.prodotti.data[documento.prodotti.indexID[idMov]].deposito = idDepositoVettore;
        var campi = document.querySelectorAll('#prelevati-' + idMov);

        for (var x = 0; x < campi.length; x++) {
            campi[x].innerText = quTotPrelevate.toString();
        }

        var campi = document.querySelectorAll('#tagliati-' + idMov);

        for (var x = 0; x < campi.length; x++) {
            campi[x].innerText = quOrdinata - quTotPrelevate.toString();
        }
    }
}
function rspQuMinore(risp, idMov) {
    if (risp == 'Si') {
        documento.prodotti.data[documento.prodotti.indexID[idMov]].forzaChiusuraOrdine = documento.prodotti.data[documento.prodotti.indexID[idMov]].qu;
        salvaLotti('Si', true);

    }
}
function eliminaRigaLotto(riga) {
    movTemp[riga] = {};
    popolaElencoDaJson(movTemp, 'listaLotti', 0, 'statoOrdini.html:dettaglioRigaLotti');
}
function generaDDTVettori(risp) {
    if (risp == 'Si') {
        if (parametriSO.tipoDocumentoDDTVettore == undefined && parametriSO.tipoDocumentoDDTVettore == isNaN) {
            attivaAlert(xTipoAllert.CRITICO, 'tipo documento ddt vettore non impostato in parametri! (tipoDocumentoDDTVettore)');
            return;
        }
        var totQu = 0;

        for (var x of documento.prodotti.data) {
            if (!isEmpty(x)) {
                if (x.codice != '') {
                    var quLotto = 0;
                    for (var n in x.movLotti) {
                        if (!isEmpty(x.movLotti[n]) && x.movLotti[n].qu > 0) {
                            quLotto += Number(x.movLotti[n].qu);
                        }
                    }
                    totQu += Number(quLotto);

                    if (quLotto == 0 && x.qu > 0) {
                        attivaAlert(xTipoAllert.DOMANDASINO, 'attenzione, sono presenti articoli non evasi, non verranno inseriti nel DDT, vuoi proseguire?', 'eliminaRigheNonEvase_');
                        return;
                    }
                }
            }

        }
        if (totQu == 0) {
            attivaAlert(xTipoAllert.CRITICO, 'attenzione, non è stato selezionato alcun lotto nel documento!');
            return;
        }

        datiTipoDocumento(parametriSO.tipoDocumentoDDTVettore, 'V', (res) => {
            var risp = JSON.parse(res);
            var risposta = risp.risposta;
            documento.testata.genere = risposta[0].genere;
            documento.testata.idTipo = parametriSO.tipoDocumentoDDTVettore;
            documento.testata.data = oggiISO()
            documento.testata.deposito = idDepositoVettore;

            if (parametriSO.modelloMailDDT != undefined) {
                documento.testata.modelloMailDDT = parametriSO.modelloMailDDT;
            }

            if (parametriSO.mailDestinatarioDDT != undefined) {
                documento.testata.mailDestinatarioDDT = parametriSO.mailDestinatarioDDT;
            }
            valorizzaDatiAccompagnatori();
            salvaDocumentosuServer();
        })

    }
}
function eliminaRigheNonEvase(risp) {
    if (risp == 'Si') {
        var tmpDocumento = documento.prodotti.data;
        var cont = 0;
        for (var x in tmpDocumento) {
            var quLotto = 0;
            if (!isEmpty(tmpDocumento[x])) {
                if (tmpDocumento[x].codice != '') {
                    for (var n in tmpDocumento[x].movLotti) {
                        if (!isEmpty(tmpDocumento[x].movLotti[n]) && tmpDocumento[x].movLotti[n].qu > 0) {
                            quLotto += tmpDocumento[x].movLotti[n].qu;
                        }
                    }
                    if (quLotto == 0) {
                        tmpDocumento[x] = {};
                        cont++
                    }
                } else {
                    cont++;
                }
            } else {
                cont++;
            }

        }
        if (cont == (documento.prodotti.data.length)) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'attenzione , non è stato evaso alcun articolo!');
            return;
        } else {

            documento.prodotti.data = tmpDocumento;
            generaDDTVettori('Si');
        }
    }
}
function elaboraRispostaSalvaDocumento(res) {
    var risp = JSON.parse(res);
    if (risp.error == '') {
        stampa(risp.risposta.idTes, "V", risp.risposta.mailDestinatario, risp.risposta.modelloMail);
        documento = '';
        chiudiModalBox();
        aggiornaListaOrdini();
    } else {
        attivaAlert(2, data.error, 'ERRORE SALVATAGGIO');
    }
}

function aggiornaListaOrdini() {
    var nodi = document.querySelectorAll('.tablinkColonne')

    for (var x = 0; x < nodi.length; x++) {
        if (nodi[x].classList.contains('tabLinkSelezionato')) {
            tabClick(nodi[x]);
            break;
        }
    }
}
function riportaOrdineInPreordine(risp, idOrdine) {
    var datiJson = {
        'idOrdine': idOrdine
    }
    if (risp == 'Si') {
        var parametri = { "tipoRisposta": "update", "tipoSalva": "cambioOrdineInPreordine", "dati": datiJson };
        inviaRichiestaCentralino("update", parametri, (res) => {
            var risp = JSON.parse(res);
            var error = risp.error;
            var risposta = risp.risposta;
            if (error == '') {
                apriModificaPreOrdine(idOrdine);
            }

        });
    }
}
function allertCambioDomento(ID) {
    // attivaAlert(5,"Attenzione, sei sicuro di voler prelevare una quantità minore rispetto a quella ordinata ?","rspQuMinore_"+idMov);
    xImmagineAperta = true;
    attivaAlert(xTipoAllert.DOMANDASINO, "Attenzione sei sicuro di voler riportare l\'ordine in Preordine", "riportaOrdineInPreordine_" + ID);
}

function selezionaDaMenuScomparsa(e) {
    var inp = document.getElementById("ricercaArticoloVenditaBanco");

    inp.value = e.getAttribute("codice");

    avviaCarStoricoOrdini();
}

function changeSelectPaginaCorrente() {
    avviaCarStoricoOrdini();
}
function openModalFoglioCarico() {
    query['statoOrdini.html:foglioCarico'] = new Array
    // query['statoOrdini.html:foglioCarico']['OFFSET']=0;
    // query['statoOrdini.html:foglioCarico']['FETCH']=100;
    // query['statoOrdini.html:foglioCarico']['MAXFETCH']=0;
    query['statoOrdini.html:foglioCarico']['styleModal'] = 'height:800px;';
    query['statoOrdini.html:foglioCarico']['modelloRiga'] = `
    <div class="clrSfumatoScuro h50p w100 row marg2Top normale">
        <div class="w90 padSx5 testo16">{RAGSOC}</div>
        <div class="w100 centraVerticalmente testo14 posBottomA5p"><div class="w45 row padSx5 ">Ordine : {NUMERO}</div><div class="w50 row"> Quantità : {QTA}</div></div>
    </div>`;
    query['statoOrdini.html:foglioCarico']['modalC-body'] = `
    <div class="w100 row">
        <div class="has-float-label row w70 marg10Top">
            <input id="cmbListaVettori" type="text" placeholder="Seleziona Vettore" autocomplete="off"
            filtro="RAGIONE_SOCIALE" ul="ulVettori"
            onfocusin="attivaRicercaComboScomparsa(this,'listaVettori','ulVettori')"
            onkeyup="attivaRicercaComboScomparsa(this,'listaVettori','ulVettori')"
            onblur="comboScomparsaChiudi(this)" idVettore=""
            timer="10"
            comboAttiva="true"
            >
            <label for="cmbListaVettori" >Seleziona vettore</label>
            <span class="deleteicon" onclick="var input = getElementById('cmbListaVettori'); input.value = ''; input.focus(); input.setAttribute('idVettore','')"></span>
            <ul id="ulVettori" inputid="cmbListaVettori" name="cmbListaVettori"
            class="comboScomparsa elencoR1 testoNormale"
            onfocus="nonChiudereComboScomparsa=true;"
            onblur="nonChiudereComboScomparsa=false;"
            >
            
        </div>
    </div>
    <div class="w100 row">
        <div class="has-float-label row w70 marg10Top">
            <input id="txtNrPallets" type="number" placeholder="Imposta pallets per il carico" onkeypress="resetErrore(this)" ${(nrPallets != 0 && nrPallets != '') ? "disabled" : ''}>
            <label for="txtNrPallets" >Imposta pallets per il carico</label>
        </div>
        <div class="has-float-label row w30 marg10Top cx normale testo16" id="nrPalletsCaricati">
            
        </div>
    </div>
    <div class="w100 row ${idOrdiniSelezionato.length == 0 ? 'hide' : ''}">
        <label for="chkVerificaPulizia" id="lbl0" class="row w98 intestazione clrSfumatoScuro h45p">
            <div class="w100 padTop5">
                <span class="row w100-70p testoTroncato1">Verifica Pulizia camion</span>
                <input id="chkVerificaPulizia" name="0" type="checkbox" class="rowDx w25p h25p clrSfumatoChiaro marg10Dx toggle-button">
            </div>
        </label>
    </div>
    <div class="w100 row ${idOrdiniSelezionato.length == 0 ? 'hide' : ''}">
        <label for="temperaturaCamion" id="lbl0" class="row w98 intestazione clrSfumatoScuro h45p">
            <div class="w100 padTop5">
                <div class="w80 row"><span class="row testoTroncato1">Verifica temperatura camion</span></div>
                <div class="w20 row"><input id="temperaturaCamion" type="number" placeholder="Temp." class="w90 dx"></div>
            </div>
        </label>
    </div>
    <div class="w98 row h25p clrScuro centraVerticalmente intestazione marg10Top">
        Lista Ordini
    </div>
    `;
    if (idOrdiniSelezionato.length == 0) {
        var piedeFoglioDiCarico = `
        <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
            <input type="button" class="pulsanteVeBa w100 h90" value="Inizia" onclick="impostaParametriFoglioCarico()">
        </div>
    </div>
    <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
            <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom()">
        </div>
    </div>
        `;
    } else {
        var piedeFoglioDiCarico = `
        <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
            <input type="button" class="pulsanteVeBa w100 h90" value="Conferma" onclick="attivaAlert(5,'Sei sicuro di voler inviare il foglio di carico al magazzino?','rispInvioFoglio_');">
        </div>
    </div>
    <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
            <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom()">
        </div>
    </div>
        `;
    }
    var piedeFoglioDiCarico
    query['statoOrdini.html:foglioCarico']['modalC-footer'] = piedeFoglioDiCarico;
    query['statoOrdini.html:foglioCarico']['oggetti'] = new Array;
    query['statoOrdini.html:foglioCarico']['oggetti']['{NUMERO}'] = 'NUMERO';
    query['statoOrdini.html:foglioCarico']['oggetti']['{QTA}'] = 'QTA';
    query['statoOrdini.html:foglioCarico']['oggetti']['{RAGSOC}'] = 'RAGIONE_SOCIALE';
    query['statoOrdini.html:foglioCarico']['styleModal'] = "width:80%;max-width:100%;height:60%;max-height:100%;";
    apriModalCustom('statoOrdini.html:foglioCarico', idOrdiniSelezionato, 'Foglio di carico', '', 1)
    document.getElementById('txtNrPallets').value = nrPallets;
    valorizzaHTMLElemento('nrPalletsCaricati', 'Quantità selezionata ' + formattaNumeri(nrPalletsSelezionato, 2, 0));
    if (!isEmpty(datiVettore)) {
        document.getElementById('cmbListaVettori').value = datiVettore.nomeVettore;
        document.getElementById('cmbListaVettori').setAttribute('idvettore', datiVettore.idVettore);
    }
}
var nrPallets = '';
var nrPalletsSelezionato = 0;
var idOrdiniSelezionato = new Array();
var datiVettore = {}
var idOrdini = new Array;
function impostaParametriFoglioCarico() {
    nrPallets = Number(document.getElementById('txtNrPallets').value);
    if (nrPallets == isNaN || nrPallets == 0) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE IMMETTERE UN VALORE VALIDO NELLA QUANTITÀ PALLETS');
        return;
    }
    var vet = document.getElementById('cmbListaVettori');
    if (vet.value == '' || vet.getAttribute('idvettore') == '') {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE IMPOSTARE VETTORE O SELEZIONARE CORRETTAMENTE DALLA LISTA SOTTOSTANTE AL CAMPO');
        return;
    }
    var parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "idOrdiniFoglioDiCarico"
    };
    inviaRichiestaCentralino("query", parametri, (resJ) => {
        var res = JSON.parse(resJ);
        var error = res.error;
        var data = res.risposta;
        idOrdini = new Array;
        for (var x in data) {
            idOrdini.push(data[x].IDTES)
        }
        var pulsanti = document.querySelectorAll('.pulsanteFunzioneListaStatoOrdini');
        for (var x = 0; x < pulsanti.length; x++) {
            var idTes = pulsanti[x].getAttribute('id');
            pulsanti[x].classList.remove('hide');
            if (idOrdini.indexOf(idTes) == -1) {
                pulsanti[x].src = "img/bianche/checkVuoto.svg";
                var id = pulsanti[x].getAttribute('id');
                pulsanti[x].setAttribute("onclick", `selezionaOrdineFoglioCarico(this,'${id}')`);
            } else {
                pulsanti[x].src = "img/bianche/cancel.svg";
                var id = pulsanti[x].getAttribute('id');
                pulsanti[x].setAttribute("onclick", `eliminaOrdineDaFoglioDiCarico(this,'${id}')`);
            }
        }
        chiudiModalCustom();
        aggionaNumeroPalletsDisponibili('visualizza');
    })


}
function aggionaNumeroPalletsDisponibili(operazione) {
    var x = document.getElementById('contatorePallets');
    if (operazione == 'visualizza') {
        x.classList.remove('hide');
    } else {
        x.classList.add('hide');
    }
    x.innerText = formattaNumeri(Number(nrPallets) - Number(nrPalletsSelezionato), 2, 0);
}
function selezionaOrdineFoglioCarico(input, id) {

    xImmagineAperta = true;
    // console.log(input.getAttribute('qta'));
    var qta = formattaNumeriInput(input.getAttribute('qta'), 2, 0)
    if ((nrPalletsSelezionato + Number(qta)) <= nrPallets) {
        parametri = { tipoRisposta: "select", tipoQuery: "querySpecifica", nomeTabella: "controlloPresenzaIdDepositoDestinazioni", "idTes": id };
        inviaRichiestaCentralino("query", parametri, (res) => {
            var res = JSON.parse(res);
            var risp = res.risposta;
            if (risp[0].IDDEPOSITO != 0) {
                input.src = "img/bianche/done.svg"
                input.setAttribute('onclick', `deselezionaOrdineFoglioCarico(this,'${id}')`);
                var numero = input.getAttribute('numero');
                var ragionesociale = input.getAttribute('ragionesociale');
                idOrdiniSelezionato.push({ 'NUMERO': numero, 'QTA': qta, "ID": id, "RAGIONE_SOCIALE": ragionesociale });
                nrPalletsSelezionato += Number(qta);
                aggionaNumeroPalletsDisponibili('visualizza');
            } else {
                attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione , deposito non impostato nella destinazione dell\'ordine selezionato<br> Destinazione ordine : ' + risp[0].DESTINAZIONE);
            }

        })


    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE NR PALLETS DISPONIBILI INFERIORE A QUELLA IMPOSTATA <BR> QUANTITÀ IMPOSTATA : ' + nrPallets + '<br> QUANTITÀ DISPONIBILE ' + formattaNumeri((Number(nrPallets) - Number(nrPalletsSelezionato)), 2, 0))
    }
}
function deselezionaOrdineFoglioCarico(input, id) {
    xImmagineAperta = true;
    input.src = "img/bianche/checkVuoto.svg"
    // console.log(input.getAttribute('qta'));
    var qta = input.getAttribute('qta').replace(/,/, '.');
    input.setAttribute('onclick', `selezionaOrdineFoglioCarico(this,'${id}')`);
    for (var x in idOrdiniSelezionato) {
        if (idOrdiniSelezionato[x].ID == id) {
            delete idOrdiniSelezionato[x];
            break;
        }
    }
    // delete idOrdiniSelezionato[idOrdiniSelezionato.indexOf((id))]
    nrPalletsSelezionato -= Number(qta);
    // if (isNaN(nrPalletsSelezionato)) nrPalletsSelezionato = 0;
    aggionaNumeroPalletsDisponibili('visualizza');
}
function rispInvioFoglio(risp) {
    if (risp == 'Si') {
        query['statoOrdini.html:parametrifoglioCarico'] = new Array;
        query['statoOrdini.html:parametrifoglioCarico']['chkVerificaPulizia'] = 'Verifica Pulizia camion';
        query['statoOrdini.html:parametrifoglioCarico']['temperaturaCamion'] = 'Verifica temperatura camion : ';
        var parametriFoglioDiCarico = new Array;
        for (var [k, v] of Object.entries(query['statoOrdini.html:parametrifoglioCarico'])) {
            var input = document.getElementById(k);
            if (input.type == 'checkbox' && input.checked == true) {
                parametriFoglioDiCarico.push({ 'DESCRIZIONE': v })
            } else if ((input.type == 'number' || input.type == 'text') && input.value != '') {
                parametriFoglioDiCarico.push({ 'DESCRIZIONE': v + recuperaValueElemento(k) });
            }

        }
        var jSon = {
            "idOrdini": idOrdiniSelezionato,
            "numeroPostiPallets": nrPallets,
            "idVettore": document.getElementById('cmbListaVettori').getAttribute('idVettore'),
            "parametri": JSON.stringify(parametriFoglioDiCarico)
        }
        var parametri = { tipoRisposta: "salva", tipoSalva: "foglioDiCarico", dati: jSon };
        inviaRichiestaCentralino("salva", parametri, (res) => {
            var res = JSON.parse(res);
            var error = res.error;
            var data = res.risposta;
            if (error == '') {
                attivaAlert(xTipoAllert.SUCCESSO, 'Foglio di carico creato con successo!');
                nrPallets = '';
                nrPalletsSelezionato = 0;
                idOrdiniSelezionato = new Array();
                datiVettore = {}
                avviaCarStoricoOrdini();
                chiudiModalCustom();
                aggionaNumeroPalletsDisponibili('chiudi');
            }
        });
    } else {

    }
}
function cmbClientiSel(input) {
    try {
        var idRagioneSociale = input.getAttribute("codice");
    } catch (e) {
        var idRagioneSociale = input.ID
    }
    document.getElementById('cmbListaVettori').setAttribute("idVettore", idRagioneSociale);
    datiVettore.idVettore = idRagioneSociale;
    datiVettore.nomeVettore = document.getElementById('cmbListaVettori').value;
}
function eliminaOrdineDaFoglioDiCarico(input, id) {
    xImmagineAperta = true;
    var parametri = { tipoRisposta: "elimina", tipoElimina: "ordineFoglioDiCarico", dati: id };
    inviaRichiestaCentralino("elimina", parametri, (resJ) => {
        var res = JSON.parse(resJ);
        var error = res.error;
        var data = res.risposta;
        if (error == '') {
            input.src = "img/bianche/checkVuoto.svg";
            input.setAttribute("onclick", `selezionaOrdineFoglioCarico(this,'${id}')`);
        }
    })
}
var listaDocumentiDaCompletare = {};
function verificaPresenzaOrdiniDaCompletare(listaClienti) {
    var idServer = sessionStorage.getItem("s");
    var listaIdClienti = [];
    listaDocumentiDaCompletare = {};
    for (var x = 0; x < localStorage.length; x++) {
        var tmp = localStorage.key(x);
        if (tmp.indexOf('carrello6.' + idServer + '.CLIENTE.') != -1) {
            var tmpLocal = JSON.parse(localStorage.getItem(localStorage.key(x)));
            if (tmpLocal.prodotti.data.length > 0) {
                var idDest = '';
                var jsonTmpDest = (localStorage.key(x)).split('carrello6.' + idServer + '.CLIENTE.');
                if (jsonTmpDest[1].indexOf('.') != -1) {
                    var jsonTmp = jsonTmpDest[1].split('.');
                    idDest = jsonTmp[1];
                    jsonTmp = jsonTmp[0];
                } else {
                    var jsonTmp = jsonTmpDest[1];

                }
                var objTmp = {
                    [jsonTmp]: { 'qu': tmpLocal.prodotti.data.length }
                }
                var strDest='.0';
                if (idDest != '') {
                    objTmp[jsonTmp]['idDest'] = idDest;
                    strDest='.'+idDest;
                }
                listaIdClienti.push(objTmp);
                
                listaDocumentiDaCompletare[jsonTmp+strDest] = tmpLocal;
            }



            // listaOrdiniDaCompletare.push(JSON.parse(tmpLocal));
            // console.log(tmpLocal);
        }
    }
    return listaIdClienti;
    // for(var [k,v] in Object.entries(localStorage)){
    //     console.log(k);
    //     console.log(v);
    //     // localStorage.getItem(localStorage.key(k))
    // }
}

function apriDettagliDocumentiDaLocal(idCliente, idDestinazione = 0) {
    var stridDestinazione = '';
    var idServer = sessionStorage.getItem("s");
    if (idDestinazione != 0) {
        stridDestinazione = '.' + idDestinazione;
    }
    var str = 'carrello6.' + idServer + '.CLIENTE.' + idCliente + stridDestinazione;
    var tmpDocumento = localStorage.getItem(str);
    if (tmpDocumento != undefined) {
        tmpData = JSON.parse(tmpDocumento);
        tmpData = tmpData.prodotti.data;
    }
    var modalDettaglioDocumento = `<div class="posTopA w100">
            <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            DETTAGLI ORDINI DA COMPLETARE 
                <span class="close" onclick="chiudiModalBox();">&times;</span>
            </div>
            <!--<div class="clrBase h60p cel"></div>-->
            
        </div>
        <div class="posTopA45p posBottomA10p w100 centraElemento">
            <div class="posTopA5p intestazioneGriglie clrScuro w99 h30p padTop5 padBot10 tableStyle">
                <div class="row w25 testoNormale " style="padding-left:5px">Codice</div>
                <div class="row w70-120p testoNormale">Descrizione</div>
                <div class="row w60p testoNormale cx">Qu</div>
                <div class="row w60p testoNormale cx">Importo</div>
            </div>
            <ul id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA60p posBottomA w98">

            </ul>
            
        </div>
        <div class="pulsantiera posLeftA5p posBottomA10p">
        <a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Completa Ordine" onclick="domandaCompletaOrdine('${str}')"><img src="img/bianche/ok.svg"></a>
        </div>`;
    var rigaDettaglioDocumenti = `
        <li class="row w95 h40p clrSfumatoScuro centraVerticalmente marg5Top testoNormale ">
            <div class="w25 row" style="padding-left:5px">{CODICE}</div>
            <div class="w70-120p row" style="padding-left:5px">{DESCRIZIONE}</div>
            <div class="w60p row cx">{QU}</div>
            <div class="w60p row cx">{IMPORTO}</div>
        </li>
        `;
    query['statoOrdini.html:dettagliModalDocumentiLocal'] = new Array;
    query['statoOrdini.html:dettagliModalDocumentiLocal']['modelloRiga'] = rigaDettaglioDocumenti;
    query['statoOrdini.html:dettagliModalDocumentiLocal']['modelloContenitore'] = modalDettaglioDocumento;
    query['statoOrdini.html:dettagliModalDocumentiLocal']['oggetti'] = new Array;
    query['statoOrdini.html:dettagliModalDocumentiLocal']['oggetti']['{CODICE}'] = 'codice';
    query['statoOrdini.html:dettagliModalDocumentiLocal']['oggetti']['{DESCRIZIONE}'] = 'descrizione';
    query['statoOrdini.html:dettagliModalDocumentiLocal']['oggetti']['{QU}'] = { campo: "qu", decimaliMax: 2, decimaliMin: 0 };
    query['statoOrdini.html:dettagliModalDocumentiLocal']['oggetti']['{IMPORTO}'] = { campo: "importo", decimaliMax: 2, decimaliMin: 0 };

    apriModalDettagli('statoOrdini.html:dettagliModalDocumentiLocal', '', tmpData, 0, true, 'DETTAGLI ORDINI DA COMPLETARE');
}

function completaOrdine(risp, strKeyDocumento) {
    if (risp.toLowerCase() == 'si') {
        var idServer = sessionStorage.getItem("s");


        var documentostr = strKeyDocumento.split('carrello6.' + idServer + '.CLIENTE.');
        if (documentostr[1].indexOf('.') != -1) {
            var documento = documentostr[1].split('.');
            var idDestinazione = documento[1];
            var idCliente = documento[0];
        } else {
            var idCliente = documentostr[1];
        }
        var parametri = {
            "nomeQuery": "schedaCliente.html", "tipoRisposta": "schedaCliente", "idCliente": idCliente,
            "tipoQuery": "schedaClienti", "chiamante": "schedaCliente", "tipoAnagrafica": "CLIENTE"
        };
        if (idDestinazione != undefined) {
            parametri['idDestinazione'] = idDestinazione;
        }
        console.log(idCliente);
        console.log(idDestinazione);
        inviaRichiestaCentralino("query", parametri, elaboraRisposta);
    }
}

function domandaCompletaOrdine(strKeyDocumento) {
    attivaAlert(xTipoAllert.DOMANDASINO, 'Attenzione vuoi completare l\'ordine?', 'completaOrdine_' + strKeyDocumento);
}

function controlloChiusuraOrdine(input){
    attivaAlert(xTipoAllert.DOMANDASINO, 'Sei sicuro di voler chiudere l\'ordine?', 'verificaChiusuraOrdine_');
}
function verificaChiusuraOrdine(risp){
    if(risp.toLowerCase()=='si'){
        document.getElementById('chkForzaChiusura').checked=true;
    }else{
        document.getElementById('chkForzaChiusura').checked=false;
    }
}