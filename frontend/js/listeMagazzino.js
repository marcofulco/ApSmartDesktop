query['listeMagazzino.html'] = new Array;
query['listeMagazzino.html']['ricercaCodice']='cercaCodice(this)';
query['listeMagazzino.html']['oggetti'] = new Array;
query['listeMagazzino.html']['oggetti']['codiceArticolo'] = 'CODICE';
query['listeMagazzino.html']['oggetti']['txtDescrizione'] = 'DESCRIZIONE';
query['listeMagazzino.html']['oggetti']['txtContratto'] = 'NOMECONTRATTO';
query['listeMagazzino.html']['oggetti']['txtPrezzo'] = 'PREZZO'
query['listeMagazzino.html']['oggetti']['txtCosto'] = 'UCOSTO';
query['listeMagazzino.html']['oggetti']['txtGiacenza'] = 'GIACENZA';
query['listeMagazzino.html']['oggetti']['txtDisponibilità'] = 'DISP';
query['listeMagazzino.html']['oggetti']['txtIdIva'] = 'ID_IVA';
query['listeMagazzino.html']['oggetti']['txtPercIva'] = 'PIVA';
query['listeMagazzino.html']['oggetti']['txtLotto'] = 'lotto';

query['listeMagazzino.html:json'] = new Array;
query['listeMagazzino.html:json']['oggetti'] = new Array;
query['listeMagazzino.html:json']['oggetti']['codiceArticolo'] = { campo: 'codice', obbligatorio: true };
query['listeMagazzino.html:json']['oggetti']['txtDescrizione'] = { campo: 'descrizione', obbligatorio: true };
query['listeMagazzino.html:json']['oggetti']['txtPrezzo'] = 'listino'
query['listeMagazzino.html:json']['oggetti']['txtPrezzo'] = 'prezzo'
query['listeMagazzino.html:json']['oggetti']['txtIdIva'] = 'idIva';
query['listeMagazzino.html:json']['oggetti']['txtPercIva'] = 'percIva';
query['listeMagazzino.html:json']['oggetti']['txtQuantità'] = 'qu';
query['listeMagazzino.html:json']['oggetti']['txtLotto'] = { campo: 'lotto', lotto: true };


query['listeMagazzino.html:listaMagazzino'] = new Array;

query['listeMagazzino.html:listaMagazzino']['oggetti'] = new Array;
query['listeMagazzino.html:listaMagazzino']['oggetti']['{codice}'] = 'codice';
query['listeMagazzino.html:listaMagazzino']['oggetti']['{descrizione}'] = 'descrizione';
query['listeMagazzino.html:listaMagazzino']['oggetti']['{riga}'] = 'riga';
query['listeMagazzino.html:listaMagazzino']['oggetti']['{qu}'] = { campo: 'qu', decimaliMax: 2, decimaliMin: 0 };

var parametriNC = { "nascosti": "", "conti": "", "visSpese": 0, "maxAbbuono": 0, "modificheGuajana": 0 };
var datiArticolo = '';
var tabelle = {};
var idDocumento;
window.addEventListener("load", function (event) {
    setTimeout(function () {

        recuperaParametri();
        caricaDocumento();
        valorizzaContatoreRighe(0);
    }, 50);
});

function recuperaParametri() {
    var parametri = { "tipoRisposta": "parametri", "chiamante": "parametri", "nomePagina": nomePagina, "userName": "" };

    elencoInCaricamento = 1;

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
            parametriNC[data[x]["parametro"]] = Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]] = data[x]["valore"];
        }
    }

    if (parametriNC.nascosti != '') {
        m = parametriNC.nascosti.split(";");
        for (x in m) {
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) {

            }
        }
    }
    var script = document.createElement("script");
    script.setAttribute('src', "componenti/elementiListaMagazzino.js");
    document.body.appendChild(script);
    script.onload = function () {
        query['listeMagazzino.html:listaMagazzino']['modelloRiga'] = modelloRigaModalListaMagazzino;
        query['listeMagazzino.html:listaMagazzino']['modelloContenitore'] = modalListaMagazzino;
    }
}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "cmbConto":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "contiIncPag", "select": selectID, "soloConti": parametriNC.conti };
            break;
        case "documentiAcquisti":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiAcquisti", "select": selectID };
            break;
        case "elencoUtentiAp":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "elencoUtentiAp", "select": selectID };
            break;
        case "documentiVendita":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiVendita", "select": selectID };
            break;
        case "lottiArticolo":
            var parametri = {
                "tipoRisposta": "json", "tipoQuery": "querySpecifica", "nomeTabella": "lottoArticolo", "codiceArticolo": datiArticolo['CODICE'], "deposito": parametriNC['deposito']
            }
            break;
    }

    parametri.md5 = localStorage.getItem(selectID + ".md5");

    inviaRichiestaCentralino("query", parametri);
}

var risposte = 0;

function elaboraRisposta(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    risposte += 1;

    if (risp.error != '') {
        return "";
    }

    if (Array.isArray(data)) {
        if (data[0] == 0) {
            return "";
        }
    }


    data = verificaMd5(parametri.select, parametri, risp, data);

    if (parametri.tipoRisposta == 'object') {
        for (var x in data) {
            if (tabelle[parametri.nomeTabella] == undefined) {
                tabelle[parametri.nomeTabella] = {}
            }
            tabelle[parametri.nomeTabella][data[x].id] = data[x]
        }
    }

    if (risposte == 3) {

    }
}

function esci() {
    if (xTarget == "_blank") {
        window.close();
    } else {
        open("mainPage.html", xTarget);
    }
}


function resetErrore(e) {
    e.setAttribute("style", "");
}
function selezionaDaMenuScomparsa(e) {
    document.getElementById('codiceArticolo').value = e.getAttribute('codice');
    cercaCodice(document.getElementById('codiceArticolo'))
}


function pulisciCampi() {
    document.getElementById('codiceArticolo').value = '';
    document.getElementById('txtQuantità').value = '';
    document.getElementById('descrizione').innerHTML = '';

}
function ricercaCodice(input) {
    var codiceIngresso = input.value.trim();
    if (codiceIngresso == '') {
        input.value = '';
        return;
    }

}



function controlloQuantità(input) {
    if (input.value != '') {

        if (isNaN(input.value)) {
            input.value = '';
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione campo quantità non valido!');
            input.focus()
        }
    }
}

function cercaCodice(input) {
    if (input.value == '') {
        return;
    }
    var codice = input.value;
    var parametri = {
        "tipoRisposta": "select",
        "tipoQuery": "articoliVeBa",
        "codiceVeBa": codice,
        "nomeTabella": "articoloVeBa",
        "idCliente": '0',
        "idAgente": '0',
    };

    inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
        var dati = JSON.parse(dati);
        var data = dati.risposta;
        if (data[0] != 0) {
            popolaFormModificaDati(data, 'listeMagazzino.html');
            document.getElementById('txtQuantità').focus();
        } else {
            attivaAlert(xTipoAllert.DOMANDASINO, 'Codice non trovato!<br> Vuoi Associare il codice :'+input.value+' ad un articolo già anagrafato?','rispAssociaCodice_'+input.value);
            input.value = '';
            input.focus();
        }
    })
}
function gestQuantità(valore, id) {
    var input = document.getElementById(id);
    input.value = Number(input.value) + Number(valore);
}
function pulisciForm() {
    for (var [k, v] of Object.entries(query['listeMagazzino.html']['oggetti'])) {
        document.getElementById(k).value = '';
    }
    document.getElementById('codiceArticolo').focus();
    document.getElementById('txtQuantità').value = '';
    document.getElementById('txtBarcode').value='';
    if(document.getElementById('divAssociazioneBarcode').classList.contains('hide')==true){
        document.getElementById('divAssociazioneBarcode').classList.add('hide');
    }
    
}

function aggiungi() {
    
    var qta = document.getElementById('txtQuantità').value;
    if (qta == isNaN || qta > 9999 || qta=='') {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione valore non valido nel campo quantità!');
        return;
    }
    if (documento['listaMagazzino'] == undefined) {
        creaDocumento('listaMagazzino');
    }
    var obj = {};
    var res = recuperaValoriJson(obj, 'listeMagazzino.html:json');
    if (res == false) {
        return;
    }
    aggiungiMovimento(obj, '', 'listaMagazzino');
    valorizzaContatoreRighe(1);
    aggiornaTotale(documento['listaMagazzino'].totali, obj, 1, '', '', '', false)
    pulisciForm();
}
function apriLista() {
    if(documento['listaMagazzino']==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione nessun articolo all\'interno della lista');
        return;
    }
    apriModalDettagli('listeMagazzino.html:listaMagazzino', '', documento['listaMagazzino'].prodotti.data, 0, true, '');
}
function inviaLista(Risp) {
    if (Risp.toLowerCase() == 'si') {
        var test = { 'genere': '0' }
        aggiungiTestata(test, 'listaMagazzino');
        var carrelloJson = documento['listaMagazzino'];
        var parametri = { "tipoRisposta": "salva", "tipoSalva": "listaMagazzino", "dati": carrelloJson };
        inviaRichiestaCentralino("salva", parametri, (res) => {
            var res = JSON.parse(res);
            var data = res.risposta;
            var str = data.numero + '/' + data.serie;
            attivaAlert(xTipoAllert.SUCCESSO, '<div>Lista salvata con successo!</div><div>Numero Lista :<strong>' + str + '</strong></div>');
            chiudiModalBox();
            creaDocumento('listaMagazzino');
            document.getElementById('contatoreRighe').innerText='0';
        });
    }
}
function eliminaRiga(risp, nRiga) {
    if (risp.toLowerCase() == 'si') {
        aggiornaTotale(documento['listaMagazzino'].totali, documento['listaMagazzino'].prodotti.data[nRiga], -1, '', '', '', false)
        documento['listaMagazzino'].prodotti.data[nRiga] = {};
        popolaElencoDaJson(documento['listaMagazzino'].prodotti.data, 'elencoDettagli', 0, 'listeMagazzino.html:listaMagazzino', true, true, false);
        valorizzaContatoreRighe(-1);
        documentoLocal();
    }
}
function valorizzaContatoreRighe(valore) {
    if(documento['listaMagazzino']==undefined){
        return false;
    }
    var campo = document.getElementById('contatoreRighe');
    var n = campo.innerText.trim();

    if (n == '') {
        var cont = 0;
        for (var x of documento['listaMagazzino'].prodotti.data) {
            if (x.codice != undefined) {
                cont++;
            }
        }

        document.getElementById('contatoreRighe').innerText = Number(cont);
    }else{
        var n = document.getElementById('contatoreRighe').innerText.trim();
        document.getElementById('contatoreRighe').innerText = Number(n) + Number(valore);
    }
    // console.log(document.getElementById('contatoreRighe').innerText);
    campo.classList.remove('hide');
    
}
function avviaRicercaLettoreBarcode(inputID) {
    var input = document.getElementById(inputID);
    cercaCodice(input);
}
function eliminaLista(risp){
    if (risp.toLowerCase() == 'si') {
        documento['listaMagazzino'].prodotti.data=new Array;
        creaDocumento('listaMagazzino');
        chiudiModalBox();
        document.getElementById('contatoreRighe').innerText = 0;
    }
}
function rispAssociaCodice(risp,codiceBarre){
    if (risp.toLowerCase() == 'si') {
        document.getElementById('txtBarcode').value=codiceBarre;
        apriModalRicercaArticoli('codiceArticolo');
        document.getElementById('divAssociazioneBarcode').classList.remove('hide');
    }
}
function associaBarcode(idCodiceArticolo,idBarcodeArticolo){
    var codice=document.getElementById(idCodiceArticolo).value;
    var barcode=document.getElementById(idBarcodeArticolo).value;
    if(codice=='' || barcode==''){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione codice articolo o barcode non selezionato!');
        return;
    }
    var dati={
        'codiceArticolo':codice,
        'codiceAggiuntivo':barcode,
    }
    var parametri={"tipoRisposta":"salva","tipoSalva":"associaBarcodeAggiuntivo", "dati":dati};
    inviaRichiestaCentralino("salva",parametri,(res)=>{
        attivaAlert(xTipoAllert.SUCCESSO,'Codice associato con successo!');
        document.getElementById(idBarcodeArticolo).value='';
        document.getElementById('divAssociazioneBarcode').classList.add('hide');
    });
}