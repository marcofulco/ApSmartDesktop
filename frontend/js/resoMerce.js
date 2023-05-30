query['resoMerce.html'] = new Array;
query['resoMerce.html']['OFFSET'] = 0;
query['resoMerce.html']['FETCH'] = 75;
query['resoMerce.html']['MAXFETCH'] = 0;

query['resoMerce.html:LISTAARTICOLI'] = new Array;
query['resoMerce.html:LISTAARTICOLI']['OFFSET'] = 0;
query['resoMerce.html:LISTAARTICOLI']['FETCH'] = 250;
query['resoMerce.html:LISTAARTICOLI']['MAXFETCH'] = 0;
query['resoMerce.html:LISTAARTICOLI']['modelloRiga'] = rigaArticolo;
query['resoMerce.html:LISTAARTICOLI']['modelloRaggruppamento'] = rigaFattura;

query['resoMerce.html:LISTAARTICOLI']['oggetti'] = new Array;
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{CODICE}'] = "codice";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{CODICEFORN}'] = "codiceFornitore";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{DESCRIZIONE}'] = "descrizione";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{IMMAGINE}'] = "imgSrc";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{IMPORTO}'] = { campo: "importo", decimaliMax: 5, decimaliMin: 0 };
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{QUFORM}'] = { campo: "qu", decimaliMax: 5, decimaliMin: 0 };
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{PREZZONETTO}'] = "listino";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{IDMOV}'] = "idMovOrigReso";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{UM}'] = "um";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{RAGGRUPPAMENTO}'] = "RAGGRUPPAMENTO";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{DATADOC}'] = "DATADOC";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{DATADOC}'] = "DATADOC";
query['resoMerce.html:LISTAARTICOLI']['oggetti']['{ID}'] = "ID";


query['resoMerce.html'] = new Array;
query['resoMerce.html']['filtri'] = new Array;
query['resoMerce.html']['filtri']['numeroDDT'] = "";
query['resoMerce.html']['filtri']['dataDDT'] = "";
query['resoMerce.html']['filtri']['txtRicercaDescrizione'] = "";
query['resoMerce.html']['filtri']['txtRicercaCodiceFornitore'] = "";
Filtri['resoMerce.html']['GRMERC'] = "";
Filtri['resoMerce.html']['SGR_MERC'] = "";
Filtri['resoMerce.html']['SFAM1'] = "";
Filtri['resoMerce.html']['SFAM2'] = "";


query['rigaDocumentoReso'] = new Array;
query['rigaDocumentoReso']['oggetti'] = new Array;
query['rigaDocumentoReso']['modelloRiga'] = rigaDocumentoReso;
query['rigaDocumentoReso']['oggetti']['{CODICE}'] = "codice";
query['rigaDocumentoReso']['oggetti']['{CODICEFORN}'] = "codiceFornitore";
query['rigaDocumentoReso']['oggetti']['{DESCRIZIONE}'] = "descrizione";
query['rigaDocumentoReso']['oggetti']['{IMPORTO}'] = { campo: "importo", decimaliMax: 5, decimaliMin: 2 };;
query['rigaDocumentoReso']['oggetti']['{QU}'] = { campo: "qu", decimaliMax: 5, decimaliMin: 0 };
query['rigaDocumentoReso']['oggetti']['{MOTIVO}'] = "notaPrelievo";
query['rigaDocumentoReso']['oggetti']['{IDMOV}'] = "idMovOrigReso";
query['rigaDocumentoReso']['oggetti']['{UM}'] = "um";
query['rigaDocumentoReso']['oggetti']['{NOTAUFFICIO}'] = "notaUfficio";

query['rigaDocumentoReso']['oggetti']['{POSIZIONE}'] = "riga";
query['rigaDocumentoReso']['oggetti']['{riga}'] = "riga";


modalForm = new Array();
modalForm['resoMerce'] = new Array();
modalForm['resoMerce']['lblCodice'] = 'codice';
modalForm['resoMerce']['lblCodiceFornitore'] = 'codiceFornitore';
modalForm['resoMerce']['lblDescrizione'] = 'descrizione';
modalForm['resoMerce']['lblQu'] = { campo: "qu", decimaliMax: 5, decimaliMin: 0 };
modalForm['resoMerce']['lblPrezzo'] = 'listino';
modalForm['resoMerce']['lblImporto'] = { campo: "importo", decimaliMax: 5, decimaliMin: 0 };
modalForm['resoMerce']['motivoReso'] = 'notaPrelievo';
modalForm['resoMerce']['quReso'] = 'qu';
modalForm['resoMerce']['imgReso'] = 'imgSrc';
modalForm['resoMerce']['idMov'] = 'idMovOrigReso';
modalForm['resoMerce']['riga'] = 'riga';
modalForm['resoMerce']['notaAggiuntiva'] = 'descrizioneAggiuntiva';

query['documentiDiReso'] = new Array;
query['documentiDiReso']['oggetti'] = new Array;
// query['documentiDiReso']['modelloRaggruppamento'] = ;
query['documentiDiReso']['modelloRiga'] = documentiDiReso;
query['documentiDiReso']['oggetti']['{ORDINESTATO}'] = "ORDINESTATO";
// query['documentiDiReso']['oggetti']['{RAGGRUPPAMENTO}'] = "ID";
query['documentiDiReso']['oggetti']['{DATA}'] = "DATA";
query['documentiDiReso']['oggetti']['{STATODOCUMENTO}'] = "STATODOCUMENTO";
query['documentiDiReso']['oggetti']['{TOT_QU}'] = "TOT_QU";
query['documentiDiReso']['oggetti']['{NUMERO}'] = "NUMERO";
query['documentiDiReso']['oggetti']['{ID}'] = "ID";
query['documentiDiReso']['oggetti']['{TOTALE}'] = "TOTALE";
query['documentiDiReso']['oggetti']['{BTNDATIDDT}'] = "BTNDATIDDT";
query['documentiDiReso']['oggetti']['{BTNCOMPLETARESO}'] = "BTNCOMPLETARESO";
query['documentiDiReso']['oggetti']['{IDDDT}'] = "IDDDT";
query['documentiDiReso']['oggetti']['{BTNSTAMPADDT}'] = "BTNSTAMPADDT";


query['resoMerce.html:COMPARAZIONERESO'] = new Array;
query['resoMerce.html:COMPARAZIONERESO']['oggetti'] = new Array;
query['resoMerce.html:COMPARAZIONERESO']['modelloRiga'] = comparazioneReso;
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{CODICE}'] = "codice";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{DESCRIZIONE}'] = "descrizione";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{QURICHIESTA}'] = { campo: "origine", decimaliMin: 0, decimaliMax: 2 };
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{QUACCETTATA}'] = { campo: "qu", decimaliMin: 0, decimaliMax: 2 };
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{NOTAUFFICIO}'] = "notaUfficio";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{NOTAPRELIEVO}'] = "notaPrelievo";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{INFOCLIENTE}'] = "descrizioneAggiuntiva";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{IMMAGINE}'] = "imgSrc";
query['resoMerce.html:COMPARAZIONERESO']['oggetti']['{IMPORTO}'] = { campo: "importo", decimaliMin: 0, decimaliMax: 2 };

query['resoMerce.html:famiglie'] = new Array;
query['resoMerce.html:famiglie']['modelloRigaAc'] = '<a class="accordion" href="#" onClick="apriChiudiAccordion(this);">{descrizione}</a><ul id="{ID}" class="panel w100 hCorpo scrool"><li><a id="{ID}" href="#" onclick="listaDaFamiglia(this)">{TUTTI}<img src="img/bianche/forward.svg"></a></li></ul>';
query['resoMerce.html:famiglie']['modelloRigaLi'] = '<li><a id="{ID}" href="#" onclick="listaDaFamiglia(this)">{descrizione}<img src="img/bianche/forward.svg"></a></li>';

var elencoInCaricamento = 0;
var listaMovimenti = {};
var risposte = 0;
var parametriTipoDocumento;
var listaResiInCorso = new Array();
var parTipoDoc;
// var allegatiDocumentoReso = {};
var idClienteReso;
var ricercaCodiceBarre;
var documentoTmp={};
var parametriNC = {
    obbligatori:
        "",
    alternativi: "",
    alternativi1: "",
    nascosti: "",
};
var tabelle={};
var skUtente = sessionStorage.getItem("skVarie.resoMerce");
window.addEventListener("load", function (event) {
    setTimeout(function () {
        
        recuperaParametri();
        if (xIdCliente == '' || xIdCliente == 0) {
            idClienteReso = sessionStorage.getItem('idCliente')
        } else {
            idClienteReso = xIdCliente;
        }
        if (idClienteReso == undefined || isNaN(idClienteReso)) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE NON È STATO SELEZIONATO NESSUN CLIENTE');
        } else {
            var skCli = JSON.parse(sessionStorage.getItem("schedaCliente.html.CLIENTE." + idClienteReso + ".jSon"));
            document.getElementById('ragSocCliente').innerHTML = `<div id="CLIENTE" class="w95 h40p testoTroncato1 padTop6">${skCli[0].RAGIONE_SOCIALE}</div>`;
            gestioneListaResi('recupera');
        }
        avviaCarDati("elencoFamiglia");
        avviaCarDati('documentiAcquisti');
        var div = document.getElementById("divTitolo");
        document.getElementById('txtDataDa').value = dataDaReso();
        document.getElementById('txtDataA').value = oggiISO();
        listaArticoliResoMerci(true);
        if (documento['documentoDiReso' + idClienteReso] == undefined) {
            creaDocumento('documentoDiReso' + idClienteReso)
            // inizializzaDocumento(true, true, 'documentoDiReso' + idClienteReso);
            gestioneListaResi('salva');
        } else {
            pulisciAllegatiTmpDocumento();
            if (documento['documentoDiReso' + idClienteReso].testata != undefined && documento['documentoDiReso' + idClienteReso].testata.id != undefined) {
                document.getElementById('nrDocumento').innerText = 'RICHIESTA RESO NR : ' + documento['documentoDiReso' + idClienteReso].testata.numero + `${documento['documentoDiReso' + idClienteReso].testata.serie != '' ? '/' + documento['documentoDiReso' + idClienteReso].testata.serie : ''}`
            }
            recuperaIdMovOrigResoDocumento();
        }
        
    })
})
function clickBack() {
    if (documento['documentoDiReso' + idClienteReso] != undefined) {
        for (var x in documento['documentoDiReso' + idClienteReso].prodotti.data) {
            if (!isEmpty(documento['documentoDiReso' + idClienteReso].prodotti.data[x])) {
                if(documento['documentoDiReso' + idClienteReso].prodotti.data[x].allegatiMovimento!=undefined){
                    if (documento['documentoDiReso' + idClienteReso].prodotti.data[x].allegatiMovimento.length > 0) {
                        attivaAlert(5, 'SEI SICURO DI VOLER USCIRE? SE SONO PRESENTI ALLEGATI APPENA CARICATI, ANDRANNO PERSI,INVIARE IL PRE-RESO PER SALVARLI', 'rspChiudiPaginaAllegati_');
                        return;
                    }
                }
                
            }
        }
    }
    if (xTarget == "_blank") {
        window.close();
    } else {
        if (xIdCliente > 0) {
            open("mainPage.html", xTarget);
        } else {
            open("schedaCliente.html?tipoAnagrafica=CLIENTE", xTarget);
        }
    }
}
function rspChiudiPaginaAllegati(risp) {
    if (risp == 'Si') {
        if (xTarget == "_blank") {
            window.close();
        } else {
            if (xIdCliente > 0) {
                open("mainPage.html", xTarget);
            } else {
                open("schedaCliente.html?tipoAnagrafica=CLIENTE", xTarget);
            }
        }
    }
}
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
    if (parametriNC['idDocumentoAccettazioneReso'] != undefined && idClienteReso != 0) {
        avviaCarDati('datiDocumentoReso');
        avviaCarDati('documentiResiCliente');
        avviaCarDati("slcListaVettori");
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione, id documento di reso non impostato');
    }
   
}
function avviaCarDati(selectID, creaMd5 = true) {
    var parametri = {};

    switch (selectID) {
        case "cmbAgente":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "Agenti",
                select: selectID,
            };
            break;
        case "datiDocumentoReso":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "datiDocumentoReso",
                select: selectID,
                idDocumentoAccettazioneReso: parametriNC['idDocumentoAccettazioneReso']
            };
            break;
        case "documentiResiCliente":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "documentiResiCliente",
                select: selectID,
                idDocumentoAccettazioneReso: parametriNC['idDocumentoAccettazioneReso'],
                idCliente: idClienteReso,
                xPercorsoImmagini: xPercorsoImmagini,
                idDest:0
            };
            break;
        case 'elencoFamiglia':
            parametri = {
                tipoQuery: "listaArticoli",
                "tipoRisposta": 'elencoFamiglia',
                "nomeQuery": 'resoMerce.html:famiglie',
                "tipoElenco": '99',
                "ricarica": true,
                "scrollTop": 0,
                "azienda": 0,
                "idCliente": idClienteReso,
                "percorsoImmagini": xPercorsoImmagini,
            };
            break;
        case "slcListaVettori":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"slcListaVettori", "select":selectID};
        break;
        case "documentiAcquisti":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiAcquisti", "select": selectID };
            break;
    }

    parametri.md5 = localStorage.getItem(selectID + ".md5");


    inviaRichiestaCentralino("query", parametri);
}
function elaboraRisposta(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    risposte += 1;

    if (risp.error != "") {
        return "";
    }

    if (Array.isArray(data)) {
        if (data[0] == 0) {
            return "";
        }
    }

    data = verificaMd5(parametri.select, parametri, risp, data);
    if (parametri.select == 'datiDocumentoReso') {
        parTipoDoc = data[0];
    }

    if (parametri.select == 'documentiResiCliente') {
        popolaElencoDaJson(data, 'corpoListaResiInCorso', 0, 'documentiDiReso', true, 0);
        xRag = "";
        listaResiInCorso = data;
        verificaPresenzaResiDaCompletare();
    }
    if (parametri.nomeQuery == 'resoMerce.html:famiglie') {

        popolaElencoDaJson(data, parametri.tipoRisposta, 99, parametri.nomeQuery, parametri.ricarica, parametri.scrollTop, "x");
    }
    if (parametri.select=='slcListaVettori'){
        popolaSelectDaJSON(data,'slcListaVettori');
    }
    if (parametri.tipoRisposta == 'object') {
        for (var x in data) {
            if (tabelle[parametri.nomeTabella] == undefined) {
                tabelle[parametri.nomeTabella] = {}
            }
            tabelle[parametri.nomeTabella][data[x].id] = data[x]
        }
    }
}
function dataDaReso() {
    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var dd = '01';
    var mm = '01';
    var yyyy = (today.getFullYear() - 2);

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}
function apriChiudiDocumentoReso() {
    var doc = document.getElementById('divDocumentoDiReso');
    var btn = document.getElementById('pulsanteAperturaDocumentoReso');

    if (doc.classList.contains('hideDocumentoDiReso')) {
        doc.classList.remove('hideDocumentoDiReso');
    } else {
        doc.classList.add('hideDocumentoDiReso');
    }
    var divListaResi = document.getElementById('divListaResiInCorso');
    if (!divListaResi.classList.contains('hide')) {
        divListaResi.classList.add('hide');
    }
    var divFiltri = document.getElementById('divFiltriRicercaDocumento');
    if (!divFiltri.classList.contains('hide')) {
        divFiltri.classList.add('hide');
    }
}
function apriFiltriArticoli() {
    var doc = document.getElementById('divFiltriRicercaDocumento');
    if (doc.classList.contains('hide')) {
        doc.classList.remove('hide');
    } else {
        doc.classList.add('hide');
    }
    var listaResiInCorso = document.getElementById('divListaResiInCorso');
    if (listaResiInCorso.classList.contains('hide')) {

    } else {
        listaResiInCorso.classList.add('hide');
    }

}
function apriListaResiInCorso() {
    var doc = document.getElementById('divListaResiInCorso');
    if (doc.classList.contains('hide')) {
        doc.classList.remove('hide');
    } else {
        doc.classList.add('hide');
    }

    var filtri = document.getElementById('divFiltriRicercaDocumento');
    if (filtri.classList.contains('hide')) {
    } else {
        filtri.classList.add('hide');
    }
}
function listaArticoliResoMerci(ricarica = true, listaidMovIn = '') {
    try {
        var listaidMov = listaidMovIn
        var maxFetch = 0;
        var tmpNomePagina = "resoMerce.html:LISTAARTICOLI";
        if (listaidMov == 'false') {
            return '';
        }
        if (query[tmpNomePagina]['MAXFETCH'] && listaidMov == '') {
            maxFetch = query[tmpNomePagina]['MAXFETCH'];
        }

        if (ricarica) {
            maxFetch = 0;
            // listaMovimenti = {};
        }

        if (query[tmpNomePagina]['OFFSET'] > maxFetch && maxFetch != 0 && listaidMov == '') {
            return '';
        }
        var da = document.getElementById("txtDataDa");
        var a = document.getElementById("txtDataA");

        var dataDa = dataDaReso()
        var dataA = "";

        if (da.value == "") {
            da.value = convertiDataItaEng(dataDa);
            da.setAttribute("value", convertiDataItaEng(dataDa));
        }

        if (isDate(da.value, da)) {
            dataDa = convertiDataEngIta(da.value);
        }

        if (isDate(a.value, a)) {
            dataA = convertiDataEngIta(a.value);
        }

        if (ricarica) {
            query[tmpNomePagina]['OFFSET'] = 0;
        }
        if (listaidMov == '') {
            var ricercaF = document.getElementById('txtRicercaCodiceFornitore').value;
            var descrizione = document.getElementById('txtRicercaDescrizione').value;
            var numeroFt = document.getElementById('txtNumeroFattura').value;
            var grMerc = Filtri[nomePagina]['GRMERC'];
            var sgrMerc = Filtri[nomePagina]['SGR_MERC'];
            var sFam1 = Filtri[nomePagina]['SFAM1'];
            var sFam2 = Filtri[nomePagina]['SFAM2'];
        } else {
            var ricercaF = '';
            var descrizione = '';
            var numeroFt = '';
            var grMerc = '';
            var sgrMerc = '';
            var sFam1 = '';
            var sFam2 = '';
            var dataDa = '';
            var dataA = '';
        }

        if (idClienteReso == '' || idClienteReso == 0) {
            throw "Id Cliente non impostato"
        }
        ivaInc = false
        tipoMov = '';
        obsoleti = true;
        idAgente = '0';
        desLibere = '';
        deposito = '';
        ordinamenti = 'Data Documento';
        idTipo = '0';

        var parametri = {
            "tipoRisposta": "dettagli", "tipoQuery": "situazioneArticoli", "nomeQuery": tmpNomePagina, "dataDa": dataDa, "dataA": dataA, "ricarica": ricarica,
            "offSet": query[tmpNomePagina]['OFFSET'], "fetch": query[tmpNomePagina]['FETCH'], "chiamante": "situazioneArticoli", "codice": '',
            "descrizione": '', "deposito": deposito, "ivaInc": ivaInc, "idAgente": idAgente, "idCliente": idClienteReso, "idTipo": idTipo, "ordinamento": ordinamenti, "numeroFt": numeroFt,
            "obsoleti": obsoleti, "tipoMov": tipoMov, "desLibere": desLibere, "resoMerce": 1, "saldi": "", "webImage": xPercorsoImmagini, 'grMerc': grMerc, 'sgrMerc': sgrMerc, 'sFam1': sFam1, 'sFam2': sFam2, 'ricerca': descrizione, 'ricercaF': ricercaF, 'codiceBarre': ricercaCodiceBarre, 'listaidMov': listaidMov,'idDest':'0'
        };

        elencoInCaricamento = 1;
        if (listaidMov != '') {
            parametri.offSet = 0;
            parametri.fetch = 100;
        }
        inviaRichiestaCentralino("query", parametri, (datiJson) => {
            var res = JSON.parse(datiJson);
            var dati = res.risposta;
            
            if (ricercaCodiceBarre != '') {
                ricercaCodiceBarre = '';
            }


            if (listaidMov == '') {
                query[tmpNomePagina]['OFFSET'] += query[tmpNomePagina]['FETCH'];
                popolaElencoDaJson(dati, 'listaStoricoArticoli', 0, 'resoMerce.html:LISTAARTICOLI', ricarica, 0)
            }
            for (var A of dati) {
                if (listaMovimenti[A.idMovOrigReso] == undefined) {
                    listaMovimenti[A.idMovOrigReso] = {
                        'qu': A.qu,
                        'listino': A.listino,
                        'importo': A.importo,
                        'codice': A.codice,
                        'codiceFornitore': A.codiceFornitore,
                        'descrizione': A.descrizione,
                        'RAGGRUPPAMENTO': A.RAGGRUPPAMENTO,
                        'DATA': A.DATADOC,
                        'imgSrc': A.imgSrc,
                        'idMovOrigReso': A.idMovOrigReso,
                        'um': A.um,
                        'idIva': A.idIva,
                        'percIva': A.percIva,
                        'RIFDOC': A.RAGGRUPPAMENTO + ' - ' + A.DATADOC,
                        'IDTES': A.ID,
                        'costoMedioM':A.COSTO
                    }

                    if (documento['documentoDiReso' + idClienteReso] != undefined && documento['documentoDiReso' + idClienteReso].prodotti.data.length > 0 && documento['documentoDiReso' + idClienteReso].testata != undefined && documento['documentoDiReso' + idClienteReso].testata.id == undefined) {
                        for (var n in documento['documentoDiReso' + idClienteReso].prodotti.data) {
                            if (documento['documentoDiReso' + idClienteReso].prodotti.data[n].idMovOrigReso == A.idMovOrigReso) {
                                listaMovimenti[A.idMovOrigReso].qu = Number(listaMovimenti[A.idMovOrigReso].qu) - Number(documento['documentoDiReso' + idClienteReso].prodotti.data[n].qu);
                            }
                        }
                    }
                }
            }
            elencoInCaricamento = 0;
        });
    } catch (e) {
        console.error(e);
    }
}



function apriModalReso(idMov, posizioneArray = '') {

    var modalReso = document.getElementById('modalResoDocumento');
    if (posizioneArray == '') {
        popolaFormDatiObj(listaMovimenti[idMov], modalForm['resoMerce']);

    } else {
        var x =
            popolaFormDatiObj(documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray], modalForm['resoMerce']);
        document.getElementById('lblQu').innerText = Number(listaMovimenti[idMov].qu) + Number(documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray].qu);
        // if (documento.prodotti.data[posizioneArray].allegatiMovimento != undefined && documento.prodotti.data[posizioneArray].allegatiMovimento != '' && documento.prodotti.data[posizioneArray].allegatiMovimento.length > 0) {

        var ul = document.getElementById("elencoAllegatiReso");
        for (var [k, v] of Object.entries(documento['documentoDiReso' + idClienteReso].allegati)) {
            if ((v.ID_TAB != undefined && v.ID_TAB == documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray].ID && v.TABELLA == 'MOVIMENTI') || (v.name != undefined && (documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray].allegatiMovimento).indexOf(v.name) != -1)) {


                if ((v.name != undefined && (documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray].allegatiMovimento).indexOf(v.name) != -1)) {
                    allegatiResoTmp[k] = v;
                    var elementiAllegati = `<li id="emAt.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
                                                        <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
                                                            <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
                                                            {NOMEFILE}
                                                        </a>
                                                        <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviAllegatoMovimento(\'{NOMEFILE}\',\'{URL}\')"/>
                                                    </li>`;
                    ul.innerHTML += elementiAllegati.replace(/{URL}/g, k).replace(/{NOMEFILE}/g, v.name).replace(/ hide/g, '');
                } else if (v.ID_TAB != undefined && v.ID_TAB == documento['documentoDiReso' + idClienteReso].prodotti.data[posizioneArray].ID && v.TABELLA == 'MOVIMENTI') {

                    var elementiAllegati = `<li id="emAt.{IMMAGINESRC}" name="{IMMAGINESRC}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom">
                                                        <a id="a.{IMMAGINESRC}" href="#" class="w100-45p clrSfumatoScuro" onclick="apriImmaginiMultiple(\'MOVIMENTI\',\'\',\'{IDIMMAGINE}\')">
                                                            <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
                                                            {NOMEIMMAGINE}
                                                        </a>
                                                        <img id="del.{NOMEIMMAGINE}" class="rowDx marg5Top marg5Dx hide" title="Vedi Allegato caricato" src="img/noImg.svg" />
                                                    </li>`;
                    ul.innerHTML += elementiAllegati.replace(/{IMMAGINESRC}/g, v.IMMAGINESRC).replace(/{NOMEIMMAGINE}/g, v.NOMEIMMAGINE).replace(/{ID_TAB}/g, v.ID_TAB).replace(/{IDIMMAGINE}/g, v.IDIMMAGINE).replace(/ hide/g, '');
                }

            }

        }
        // }

    }

    modalReso.style.display = 'block';
}
function apriModaldatiDDT(idTes) {
    var obj={
        'id':idTes,
        'av':'A'
    }
    richiamaDocumento(obj,(res)=>{
        documentoTmp=res.risposta
        document.getElementById('modalInserimentoDatiDDT').style.display = 'block';
        popolaElencoDaJson(documentoTmp.prodotti.data, 'listaArticoliAccettatiResoMerci', 0, 'resoMerce.html:COMPARAZIONERESO', true, 0)
    })
   

}
function chiudiModaldatiDDT() {
    document.getElementById('modalInserimentoDatiDDT').style.display = 'none';
    document.getElementById('idTesReso').value = '';
    document.getElementById('numeroDDT').value = '';
    document.getElementById('dataDDT').value = '';
    document.getElementById('slcModalitàReso').value = '';
    document.getElementById('idTesOrigineReso').value = '';

}
function chiudiModalReso() {
    var modal = document.getElementById('modalResoDocumento');
    modal.style.display = 'none';
    pulisciAllegattiMovimentoTmp();
    document.getElementById('riga').value = '';
}
function elencoArticoliScroll(ec, pagina, txtRicerca = "") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    // window.sessionStorage.setItem(nomeStorage+".elencoArticoli.scroolTop", scrollPos);

    if ((maxScroll * 90 / 100) < scrollPos && elencoInCaricamento == 0) {
        listaArticoliResoMerci(false);
    }
}

function apriImmagine(img, modalName, hideMultiImg = 'hide', nrImg = 0, codice = '', HIDDENALLEGATOTECNICO = 'hide', allegatiWeb = '', codiceForn = '', car1 = '', car2 = '', car3 = '', opzioni = '', linkRaggruppamento = '') {
    modal = document.getElementById(modalName);
    var modalImg = document.getElementById("img1");
    var captionText = document.getElementById("captionImg");

    attivaTouchZoom(modalImg);

    var src = img.src;
    var appo = src.split("&");
    for (x in appo) {
        var c = appo[x].split("=");
        if (c[0] == "thumb") {
            var reg = new RegExp('&' + appo[x], 'g');
            src = src.replace(reg, '');
        }
    }

    try {
        var sw = document.getElementById("bw");
        sw.innerHTML = "1/" + nrImg;
        if (nrImg != 1) {
            sw.style.display = "block"
            sw = document.getElementById("bwI");
            sw.setAttribute("onclick", "cambiaImmagineMouse('" + codice + "',-1,true)");
            sw.style.display = "block"
            sw = document.getElementById("bwA");
            sw.style.display = "block"
            sw.setAttribute("onclick", "cambiaImmagineMouse('" + codice + "',1,true)");
        } else {
            sw.style.display = "none"
            sw = document.getElementById("bwI");
            sw.style.display = "none"
            sw = document.getElementById("bwA");
            sw.style.display = "none"
        }

        modalImg.setAttribute("maxImg", nrImg);
        modalImg.setAttribute("actualImg", img.getAttribute("actualImg"));
        modalImg.setAttribute("nrImg", 1);

        sw = document.getElementById("cmdAllegatoM");
        if (HIDDENALLEGATOTECNICO == '') {
            sw.style.display = "block";
            sw.setAttribute("onclick", "apriAllegato('" + allegatiWeb + "','divFrame','xFrame');")
        } else {
            sw.style.display = "none";
        }

        sw = document.getElementById("cmdOpzioniM");
        if (opzioni == '') {
            sw.style.display = "block";
            sw.setAttribute("onclick", "apriOpzioni('" + codice + "');")
        } else {
            sw.style.display = "none";
        }

        sw = document.getElementById("spCodiceM");
        sw.innerHTML = codice;
        sw = document.getElementById("spCodiceF");
        sw.innerHTML = " - " + codiceForn;
    } catch (error) {

    }

    modalImg.src = src.replace(/&crop=1/g, "");

    var c1 = "";
    var c2 = "";
    var c3 = "";

    if (car1 != "") {
        c1 = "<br><br><b>Caratteristica 1:</b> " + car1;
    }

    if (car2 != "") {
        c2 = "<br><br><b>Caratteristica 2:</b> " + car2;
    }

    if (car3 != "") {
        c3 = "<br><br><b>Caratteristica 3:</b> " + car3;
    }

    var dLink = document.getElementById("divLinkFam");
    dLink.innerHTML = "";

    if (linkRaggruppamento != '') {
        var m = linkRaggruppamento.split("}");
        for (x in m) {
            var v = m[x].split("§");

            if (v[0] != "0" && v[0] != "") {
                dLink.innerHTML += `<a href="#" class="row pulsante sx marg2Dx testo16 marg2Bottom" onclick="listaDaRaggruppamento('${v[0]}',\`${v[1]}\`,'${v[2]}')">${v[1]}</a>`;
            }
        }
    }

    captionText.innerHTML = img.getAttribute("datiImg") + c1 + c2 + c3;
    modal.style.display = "block";
}
function rspRichiamoDocumentoDaCompletare(risp) {
    if (risp == "Si") {
        insRigaDocumentoReso(false);
    } else {
        chiudiModalReso();
        var doc = document.getElementById('divListaResiInCorso');
        if (doc.classList.contains('hide')) {
            doc.classList.remove('hide');

        }
    }
}
function insRigaDocumentoReso(controlloDocumentoEsistente = true) {
    var idMov = document.getElementById('idMov').value;
    var riga = document.getElementById('riga').value;
    var allegatiResoMovimento = new Array;
    var notaAggiuntiva = document.getElementById('notaAggiuntiva').value;
    var motivoReso = document.getElementById('motivoReso').value;
    var documentoVuoto = true;
    try {
        if (riga != '') {
            var quTmp = Number(documento['documentoDiReso' + idClienteReso].prodotti.data[riga].qu);
        } else {
            var quTmp = 0
        }
        if (motivoReso == 0) {
            throw "SELEZIONARE UN MOTIVO VALIDO NELL'ELENCO VISUALIZZATO";
        }
        if (Number(document.getElementById('quReso').value) > ((Number(listaMovimenti[idMov].qu)) + quTmp)) {
            throw "IMPOSSIBILE RENDERE UNA QUANTITA MAGGIORE RISPETTO A QUELLA FATTURATA";
        }
        if (Object.keys(allegatiResoTmp).length > 2) {
            throw "ATTENZIONE, È POSSIBILE INSERIRE MASSIMO 2 FOTO/DOCUMENTI PER SINGOLO MOVIMENTO RESO";
        }
        if (motivoReso == 'Merce difettosa' || motivoReso == 'Assistenza' || motivoReso=='Assistenza a  fornitore') {
            if (notaAggiuntiva == '' || (notaAggiuntiva.replace(/ /g, '')) == '') {
                throw "ATTENZIONE, AGGIUNGERE QUALCHE COMMENTO NELLE NOTE AGGIUNTIVE";
            }
        }
        for (var x in documento['documentoDiReso' + idClienteReso].prodotti.data) {
            if (!isEmpty(documento['documentoDiReso' + idClienteReso].prodotti.data[x])) {
                documentoVuoto = false;
                break;
            }
        }

        if (controlloDocumentoEsistente == true && documentoVuoto == true) {
            for (var doc of listaResiInCorso) {
                if (doc.ORDINE == 0) {
                    attivaAlert(5, 'Attenzione, sono presenti documenti di reso da completare , sei sicuro di voler iniziare un nuovo documento?', 'rspRichiamoDocumentoDaCompletare_}')
                    return;
                    break;
                }
            }
        }
        if (riga != '') {
            listaMovimenti[idMov].qu = Number(listaMovimenti[idMov].qu) + Number(documento['documentoDiReso' + idClienteReso].prodotti.data[riga].qu);
            aggiornaTotale(documento['documentoDiReso' + idClienteReso].totali, documento['documentoDiReso' + idClienteReso].prodotti.data[riga], -1, null, null, null, false);
        }
        if (!isEmpty(allegatiResoTmp)) {
            for (var [k, v] of Object.entries(allegatiResoTmp)) {
                allegatiResoMovimento.push(v.name);
                documento['documentoDiReso' + idClienteReso].allegati[k] = v;
            }
        }

        var mov = {
            'idMovOrigReso': document.getElementById('idMov').value,
            'codice': listaMovimenti[idMov].codice,
            'codiceFornitore': listaMovimenti[idMov].codiceFornitore,
            'qu': document.getElementById('quReso').value,
            'notaUfficio': 'Documento riferimento : ' + listaMovimenti[idMov].RIFDOC,
            'notaPrelievo': document.getElementById('motivoReso').value,
            'descrizione': listaMovimenti[idMov].descrizione,
            'UM': listaMovimenti[idMov].um,
            'listino': formattaNumeriInput(listaMovimenti[idMov].listino, 5, 2),
            'importo': calcolaImporto(formattaNumeriInput(listaMovimenti[idMov].listino, 5, 2), Number(document.getElementById('quReso').value), '0', '0', '0', '0', '0'),
            'idIva': listaMovimenti[idMov].idIva,
            'percIva': listaMovimenti[idMov].percIva,
            'um': listaMovimenti[idMov].um,
            'allegatiMovimento': allegatiResoMovimento,
            'imgSrc': listaMovimenti[idMov].imgSrc,
            'descrizioneAggiuntiva': notaAggiuntiva,
            'origine': document.getElementById('quReso').value,
            'spuntati': 0,
            'costoMedioM':listaMovimenti[idMov].costoMedioM
        }
        console.log(mov)
        var n = aggiungiMovimento(mov, riga,'documentoDiReso' + idClienteReso);
        listaMovimenti[idMov].qu = Number(listaMovimenti[idMov].qu) - document.getElementById('quReso').value;

        aggiornaTotale(documento['documentoDiReso' + idClienteReso].totali, mov, 1, null, null, null, false);
        chiudiModalReso();
        gestioneListaResi('salva');

    } catch (e) {
        console.log(e);
        attivaAlert(xTipoAllert.ESCLAMAZIONE, e);
    }
}
function diminuisciQuantità() {
    if (document.getElementById('quReso').value - 1 > 0) {
        document.getElementById('quReso').value = Number(document.getElementById('quReso').value) - 1;
    }
}
function aumentaQuantità() {
    if (document.getElementById('riga').value != '') {
        var tmpQu = Number(documento['documentoDiReso' + idClienteReso].prodotti.data[document.getElementById('riga').value].qu)
    } else {
        var tmpQu = 0;
    }
    if (Number(document.getElementById('quReso').value) + 1 <= (Number(listaMovimenti[document.getElementById('idMov').value].qu) + tmpQu)) {
        document.getElementById('quReso').value = Number(document.getElementById('quReso').value) + 1;
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'IMPOSSIBILE RENDERE UNA QUANTITA MAGGIORE RISPETTO A QUELLA VENDUTA');
    }

}
function eliminaRigaDocumentoReso(n) {
    aggiornaTotale(documento['documentoDiReso' + idClienteReso].totali, documento['documentoDiReso' + idClienteReso].prodotti.data[n], -1, null, null, null, false);
    listaMovimenti[documento['documentoDiReso' + idClienteReso].prodotti.data[n].idMovOrigReso].qu = Number(listaMovimenti[documento['documentoDiReso' + idClienteReso].prodotti.data[n].idMovOrigReso].qu) + Number(documento['documentoDiReso' + idClienteReso].prodotti.data[n].qu);
    documento['documentoDiReso' + idClienteReso].prodotti.data[n] = {};
    gestioneListaResi('salva');
}
function gestioneListaResi(operazione) {
    if (operazione == 'salva') {
        // localStorage.setItem('Documento-documentoDiReso' + idClienteReso, JSON.stringify(documento));
    } else if (operazione == 'recupera') {
        // if (localStorage.getItem('Documento-documentoDiReso' + idClienteReso) != undefined) {
        //     documento = JSON.parse(localStorage.getItem('Documento-documentoDiReso' + idClienteReso));
        //     identificativoDoc = 'documentoDiReso' + idClienteReso;
        // }
        caricaDocumento();
    }
    if (documento['documentoDiReso' + idClienteReso] != undefined) {
        popolaElencoDaJson(documento['documentoDiReso' + idClienteReso].prodotti.data, 'corpoDocumentoReso', 0, 'rigaDocumentoReso', true, 0);

    }
    aggiornaTotaliVideo();
}
function allegaFotoRiga(input) {
    try {
        inputElement = document.getElementById(input);
        inputElement.addEventListener("change", conservaFoto, false);

        inputElement.click();
    } catch (error) {
        console.log(error);
    }
}
var allegatiResoTmp = {};
// documento.allegati = new Array();

function conservaFoto(evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    const fileList = this.files;

    for (i = 0; i < files.length; i++) {
        url = URL.createObjectURL(files[i]);
        allegatiResoTmp[url] = renameFile(fileList[i], Date.now() + '-' + files[i].name);

        var obj = {
            'tipo': 'movimento',
            'file': url
        }
        var ul = document.getElementById("elencoAllegatiReso");
        var elementiAllegati = `<li id="emAt.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
        <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
            <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
            {NOMEFILE}
        </a>
        <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviAllegatoMovimento(\'{NOMEFILE}\',\'{URL}\')"/>
    </li>`;
        ul.innerHTML += elementiAllegati.replace(/{URL}/g, url).replace(/{NOMEFILE}/g, allegatiResoTmp[url].name).replace(/ hide/g, '');
    }
}
function rimuoviAllegatoMovimento(nomeFile, url) {
    var li = document.getElementById("emAt." + nomeFile);
    li.parentNode.removeChild(li);
    delete allegatiResoTmp[url];
    if (documento['documentoDiReso' + idClienteReso].allegati[url].ID != undefined && documento['documentoDiReso' + idClienteReso].allegati[url].ID != '') {
        documento['documentoDiReso' + idClienteReso].allegati[url].daEliminare = true;
    };
}

function pulisciAllegattiMovimentoTmp() {
    allegatiResoTmp = {}
    document.getElementById('elencoAllegatiReso').innerHTML = '';
}
function inviaRichiestaReso(stato) {
    try {
        var documentoVuoto = true;

        for (var x of documento['documentoDiReso' + idClienteReso].prodotti.data) {
            if (!isEmpty(x)) {
                documentoVuoto = false
                break;
            }
        }
        if (documentoVuoto == true) {
            throw 'LISTA RESI VUOTA O NON VALIDA';
        }

        if (parTipoDoc == undefined || parTipoDoc == '' || isEmpty(parTipoDoc)) {
            throw 'ATTENZIONE PARAMETRI TIPO DOCUMENTO NON VALIDI';
        }

        var obj = {
            'genere': parTipoDoc.GENERE,
            'idTipo': parTipoDoc.ID,
            'idCliente': idClienteReso,
            'deposito': parTipoDoc.IDDEPOSITO,
            'AV': 'A',
            'protocollo': parTipoDoc.SERIE_NUM,
            'statoDocumento': stato
        };
        aggiungiTestata(obj,'documentoDiReso' + idClienteReso);
        var allegatiDaCaricare = {};
        for (var [k, v] of Object.entries(documento['documentoDiReso' + idClienteReso].allegati)) {
            if (v.name != undefined && v.ID == undefined) {
                allegatiDaCaricare[k] = v;
            }
        }

        if (isEmpty(allegatiDaCaricare)) {
            salvaDocumentoSuServer('','documentoDiReso' + idClienteReso);
        } else {

            FileResoUpload(allegatiDaCaricare);
        }
    } catch (e) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, e);
    }
}
function aggiornaTotaliVideo() {
    if (documento['documentoDiReso' + idClienteReso] != undefined) {
        document.getElementById('divTotaleC').innerText = '€ ' + formattaNumeri(documento['documentoDiReso' + idClienteReso].totali.totaleMerce, 2, 2);
        document.getElementById('divTotaleIvaC').innerText = '€ ' + formattaNumeri(documento['documentoDiReso' + idClienteReso].totali.tIva, 2, 2);
        document.getElementById('divTotaleDocC').innerText = '€ ' + formattaNumeri(documento['documentoDiReso' + idClienteReso].totali.tDoc, 2, 2);
    }
}
function elaboraRispostaSalvaDocumento(data) {
    var risp = JSON.parse(data);
    if (risp.error == '') {
        stampa(risp.risposta.idTes, 'A');
    }
    pulisciCampi();
    // inizializzaDocumento(true, false, 'documentoDiReso');
    creaDocumento('documentoDiReso' + idClienteReso);
    gestioneListaResi('salva');
    listaArticoliResoMerci(true);
    attivaAlert(xTipoAllert.SUCCESSO, 'RICHIESTA INVIATA CORRETTAMENTE');
}
function pulisciCampi() {
    for (var [k, v] of Object.entries(query[nomePagina]['filtri'])) {
        if (document.getElementById(k).type == 'checkbox') {
            document.getElementById(k).checked = false
        }
        else {
            document.getElementById(k).value = ''
        }
    }
    document.getElementById('nrDocumento').innerText = 'RICHIESTA RESO'
}
function ricercaConTimer() {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1 = setTimeout(() => {
        listaArticoliResoMerci(true)
        clearTimeout(timer1);
    }, 1500);
}
function eliminaTuttiFiltri() {
    document.getElementById('txtDataDa').value = dataDaReso();
    document.getElementById('txtDataA').value = oggiISO();
    document.getElementById('txtNumeroFattura').value = '';
    document.getElementById('txtRicercaDescrizione').value = '';
    document.getElementById('txtRicercaCodiceFornitore').value = '';
    listaArticoliResoMerci(true);
}
function inviaDatiDDTReso() {
    
        if (document.getElementById('numeroDDT').value == '') {
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'INSERIRE UN NUMERO DDT VALIDO');
            return;
        }
        if (document.getElementById('dataDDT').value == '' || isDate(document.getElementById('dataDDT').value)==false) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'INSERIRE UNA DATA VALIDA PER IL DDT');
            return;
        }
        if (document.getElementById('slcModalitàReso').value == '' ) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'INSERIRE UN METODO DI TRASPORTO VALIDO');
            return;
        }
        

        parametri = {
            tipoRisposta: "select",
            tipoQuery: "querySpecifica",
            nomeTabella: "verificaPresenzNumeroFattura",
            idCliente: documentoTmp.testata.idCliente,
            numeroDocumento:document.getElementById('numeroDDT').value
        };
        inviaRichiestaCentralino("query", parametri,(datiJson)=>{
        var res = JSON.parse(datiJson);
        if(res.risposta[0]!=0 && res.risposta[0].NUMERO!=undefined){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione DDT già registrato, cambiare numero al DDT');
            return;
        }
        var idTmp=documentoTmp.testata.id
       
        documento['documentoDDTperResoTMP']=JSON.parse(JSON.stringify(documentoTmp));
        documento['documentoDDTperResoTMP'].testata={};
        var obj={
            'genere':tabelle['documentiAcquisti'][parametriNC.idDDTResoCliente].genere,
            'idDocImport':[idTmp],
            'idTipo':parametriNC.idDDTResoCliente,
            'data':convertiDataSql(document.getElementById('dataDDT').value),
            'numero':document.getElementById('numeroDDT').value,
            'noteInterne':document.getElementById('slcModalitàReso').value,
            'AV':'A',
            'idCliente':idClienteReso
        }
        if(obj.noteInterne=='Mezzo Vettore'){
            obj.idVettore=document.getElementById('slcListaVettori').value;
        }
        aggiungiTestata(obj,'documentoDDTperResoTMP')
        var contRigaVuota=0;
        for(var x in documento['documentoDDTperResoTMP'].prodotti.data){
            if(documento['documentoDDTperResoTMP'].prodotti.data[x].qu==0){
                documento['documentoDDTperResoTMP'].prodotti.data[x]={};
                contRigaVuota++
            }else{
                documento['documentoDDTperResoTMP'].prodotti.data[x].idMovOrig=documento['documentoDDTperResoTMP'].prodotti.data[x].ID;
                documento['documentoDDTperResoTMP'].prodotti.data[x].ID='';
                documento['documentoDDTperResoTMP'].prodotti.data[x].idMovOrigReso=0;
            }
        }
        

        if(contRigaVuota==documento['documentoDDTperResoTMP'].prodotti.data.length){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione nessun articolo è conforme per il reso!');
            return;
        }
        
        salvaDocumentoSuServer((resJ)=>{
            var res=JSON.parse(resJ);
    var parametri = {
                "tipoRisposta": "",
                "tipoQuery": "datiDDTResoMerce",
                "datiDDT": res.risposta.idTes,
                "nomeTabella": "datiDDTResoMerce",
                "idTes": idTmp,
                "modalitaReso":document.getElementById('slcModalitàReso').value
                
            };
            stampa(res.risposta.idTes,'A');
            inviaRichiestaCentralino("multiQuery", parametri, function (datiJson) {
                avviaCarDati('documentiResiCliente');
                chiudiModaldatiDDT();
                attivaAlert(xTipoAllert.SUCCESSO, 'DDT INVIATO CORRETTAMENTE');    
            })
        },'documentoDDTperResoTMP');
    });
    
}
function rspAlertAggiuntaResoFattura(risp, dati) {
    if (risp == "Si") {
        for (var [k, v] of Object.entries(listaMovimenti)) {
            if (v.IDTES == dati && v.qu > 0) {

                var mov = {
                    'idMovOrigReso': v.idMovOrigReso,
                    'codice': v.codice,
                    'codiceFornitore': v.codiceFornitore,
                    'qu': v.qu.toString(),
                    'notaUfficio': v.RIFDOC,
                    'descrizione': v.descrizione,
                    'um': v.um,
                    'UM': v.um,
                    'listino': formattaNumeriInput(v.listino, 5, 2),
                    'importo': calcolaImporto(formattaNumeriInput(v.listino, 5, 2), v.qu, '0', '0', '0', '0', '0'),
                    'idIva': v.idIva,
                    'percIva': v.percIva,
                    'imgSrc': v.imgSrc
                }

                var n = aggiungiMovimento(mov,'','documentoDiReso' + idClienteReso);
                listaMovimenti[v.idMovOrigReso].qu = 0;
                aggiornaTotale(documento['documentoDiReso' + idClienteReso].totali, mov, 1, null, null, null, false);
            }
        }
        gestioneListaResi('salva');
    } else {

    }

}
function rspRichiamoDocumento(risp, dati) {
    if (risp == "Si") {
        var obj = {
            'id': dati,
            'av': 'A'
        }
        richiamaDocumento(obj, function (res) {
            documento['documentoDiReso' + idClienteReso] = res.risposta;
            gestioneListaResi('salva');
            apriListaResiInCorso();
            document.getElementById('nrDocumento').innerText = 'RICHIESTA RESO NR : ' + documento['documentoDiReso' + idClienteReso].testata.numero + `${documento['documentoDiReso' + idClienteReso].testata.serie != '' ? '/' + documento['documentoDiReso' + idClienteReso].testata.serie : ''}`
            var doc = document.getElementById('divDocumentoDiReso');
            if (doc.classList.contains('hideDocumentoDiReso')) {
                doc.classList.remove('hideDocumentoDiReso');
            }
            recuperaIdMovOrigResoDocumento();
        });
    } else {

    }
}
function convertiImportoToString() {
    for (var x in documento['documentoDiReso' + idClienteReso].prodotti.data) {
        if (!isEmpty(documento['documentoDiReso' + idClienteReso].prodotti.data[x])) {
            documento['documentoDiReso' + idClienteReso].prodotti.data[x].importo = (documento['documentoDiReso' + idClienteReso].prodotti.data[x].importo).toString();
        }
    }
}

function FileResoUpload(allegatiAggiuntivi) {
    var r = 0;
    var formData = new FormData();
    for (x in allegatiAggiuntivi) {
        r++;
        formData.append(xIdDispositivo + '§' + xTkCom + '§' + xUserCom.replace(/\./g,"__") + "§" + xIdConfigurazione + "§" + r, allegatiAggiuntivi[x]);
    }

    var parametri = { "chiamante": "FileUpload" };

    inviaRichiestaCentralinoUploadFile(formData, parametri, function (res) {
        var risp = JSON.parse(res);
        var parametri = risp.parametri;
        var data = risp.risposta;

        if (risp.error != '') {
        } else if (data == 'ok') {
            salvaDocumentosuServer();
            // allegatiDocumentoReso = {};
        }

    });
}


function listaDaFamiglia(a) {
    var xID = a.getAttribute("ID");
    var p = xID.indexOf(":");
    var xFiltri = 0;
    /*if (Filtri[nomePagina]['GRMERC'] != "" || Filtri[nomePagina]['SGR_MERC'] != "" || Filtri[nomePagina]['SFAM1'] != "" || Filtri[nomePagina]['SFAM2'] != "") {
        xFiltri -= 1;
    }*/

    Filtri[nomePagina]['GRMERC'] = "";
    Filtri[nomePagina]['SGR_MERC'] = "";
    Filtri[nomePagina]['SFAM1'] = "";
    Filtri[nomePagina]['SFAM2'] = "";

    // xRag = "";

    if (p > 0) {
        Filtri[nomePagina][xID.substring(p + 1, 1000)] = xID.substring(0, p);
    } else {
        Filtri[nomePagina]['GRMERC'] = xID;
    }

    listaArticoliResoMerci(ricarica = true);

    // if (vw < 1200) {
    //     document.getElementById("nav-toggleF").checked = false;
    // }

    document.getElementById("lblFiltroFamiglia").innerHTML = "Selezione: " + a.innerHTML.substring(0, a.innerHTML.indexOf('<img'));
    document.getElementById("tabFamiglia").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";
    // document.getElementById("cmdFiltri").style.border = "3px solid rgba(" + xColoreSecondario + ", 1)";



}
function eliminaFiltroFamiglia() {
    Filtri[nomePagina]['GRMERC'] = "";
    Filtri[nomePagina]['SGR_MERC'] = "";
    Filtri[nomePagina]['SFAM1'] = "";
    Filtri[nomePagina]['SFAM2'] = "";
    listaArticoliResoMerci(ricarica = true);
    document.getElementById("lblFiltroFamiglia").innerHTML = "Selezione: ";
    document.getElementById("tabFamiglia").removeAttribute("style");
}
function pulisciDocumentoCampi() {
    pulisciCampi();
    // inizializzaDocumento(true, false, 'documentoDiReso');
    creaDocumento('documentoDiReso' + idClienteReso);
    gestioneListaResi('salva');
    listaMovimenti = {};
    listaArticoliResoMerci(true);
}
function avviaRicercaLettoreBarcode(inputID) {
    var input = document.getElementById(inputID);
    ricercaCodiceBarre = input.value;

    listaArticoliResoMerci(ricarica = true);
}
function recuperaIdMovOrigResoDocumento() {
    var listaId = new Array();
    for (var x of documento['documentoDiReso' + idClienteReso].prodotti.data) {
        if(!isEmpty(x)){
            listaId.push(x.idMovOrigReso);
        }
    }
    if (listaId == '') {
        listaId = false;
    }
    listaArticoliResoMerci(true, listaId.toString());
}
function verificaPresenzaResiDaCompletare() {
    if (listaResiInCorso != '') {
        document.getElementById('btnResiInCorso').classList.add('blink_text');
    }
}

function veirifcaMezzoReso(input){
    if(input.value=='Mezzo Vettore'){
        show('divslcListaVettori');
    }else{
        hide('divslcListaVettori');
    }
}
function apriModalMovimentiResi(idTes) {
    parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "dettaglioDocumentoDiResoCompletato",
        idTes:idTes
    };
    inviaRichiestaCentralino("query", parametri,(datiJson)=>{
        var res=JSON.parse(datiJson);
        var data=res.risposta;
        if(data[0]==0){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Nessun articolo è stato acettato');
            return;
        }
        query['resomerce.html:storicoReso']=new Array;
        query['resomerce.html:storicoReso']['oggetti'] = new Array;
        query['resomerce.html:storicoReso']['oggetti']['{DESCRIZIONE}']='DESCRIZIONE'
        query['resomerce.html:storicoReso']['oggetti']['{CODICE}']='CODICE'
        query['resomerce.html:storicoReso']['oggetti']['{UM}']='UM'
        query['resomerce.html:storicoReso']['oggetti']['{IMPORTO}']={ campo: 'IMPORTO', decimaliMax: 2, decimaliMin: 2 };
        query['resomerce.html:storicoReso']['oggetti']['{QUACCETTATA}']={ campo: 'QUACCETTATA', decimaliMax: 2, decimaliMin: 0 };
        query['resomerce.html:storicoReso']['oggetti']['{QURICHIESTA}']={ campo: 'QURICHIESTA', decimaliMax: 2, decimaliMin: 0 };
        query['resomerce.html:storicoReso']['oggetti']['{QUDDT}']={ campo: 'QUDDT', decimaliMax: 2, decimaliMin: 0 };
        query['resomerce.html:storicoReso']['oggetti']['{QURESA}']={ campo: 'QURESA', decimaliMax: 2, decimaliMin: 0 };
        query['resomerce.html:storicoReso']['oggetti']['{DESCRIZIONEAGGIUNTIVA}']='DESCRIZIONEAGGIUNTIVA';
        query['resomerce.html:storicoReso']['oggetti']['{NOTAUFFICIO}']='notaUfficio';
        query['resomerce.html:storicoReso']['oggetti']['{CAUSALERESO}']='notaPrelievo';
        query['resomerce.html:storicoReso']['oggetti']['{DOCRESO}']='DOCRESO';
        query['resomerce.html:storicoReso']['modelloRiga']=elementiDettagliRichiestaResoSoloVisione;
        query['resomerce.html:storicoReso']['modelloContenitore']=modalSoloVisione;
        var testo=`
        <div>Richiesta di reso : ${data[0].DOCRICHIESTA}</div>
        <div>${data[0].DDT!='' ? 'DDT : '+data[0].DDT:''}</div>`;
        apriModalDettagli('resomerce.html:storicoReso',testo,data);
    })

}