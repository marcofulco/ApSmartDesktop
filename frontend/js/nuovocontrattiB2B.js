query[nomePagina] = new Array;
// query[nomePagina]['ricercaCodice'] = 'cercaCodice(this)';
query[nomePagina]['oggetti'] = new Array;
query[nomePagina]['oggetti']['txtDescrizione'] = 'DESCRIZIONE';
query[nomePagina]['oggetti']['txtDataDa'] = 'DATADA';
query[nomePagina]['oggetti']['txtDataA'] = 'DATAA';
query[nomePagina]['oggetti']['cmbTipoSoggettoInteressato'] = 'TIPO';
// query[nomePagina]['oggetti']['slcFamiglie'] = 'IDFAMIGLIA';
query[nomePagina]['oggetti']['slcUM'] = 'UM';
query[nomePagina]['oggetti']['txtQuantitàMinima'] = 'QUMIN';
query[nomePagina]['oggetti']['txtID'] = 'ID';


query[nomePagina + ':listaScontiCassa'] = new Array;
query[nomePagina + ':listaScontiCassa']['oggetti'] = new Array;
query[nomePagina + ':listaScontiCassa']['oggetti']['{finoA}'] = 'finoA';
query[nomePagina + ':listaScontiCassa']['oggetti']['{percentualeScontoCassa}'] = { campo: 'percentualeScontoCassa', decimaliMax: 2, decimaliMin: 0 };


query[nomePagina + ':listaScontiTrasporto'] = new Array;
query[nomePagina + ':listaScontiTrasporto']['oggetti'] = new Array;
query[nomePagina + ':listaScontiTrasporto']['oggetti']['{finoA}'] = 'finoA';
query[nomePagina + ':listaScontiTrasporto']['oggetti']['{percentualeScontoTrasporto}'] = { campo: 'percentualeScontoTrasporto', decimaliMax: 2, decimaliMin: 0 };

query[nomePagina + ':elencoSoggetto'] = new Array;
query[nomePagina + ':elencoSoggetto']['OFFSET'] = 0;
query[nomePagina + ':elencoSoggetto']['FETCH'] = 100;
query[nomePagina + ':elencoSoggetto']['MAXFETCH'] = 0;


query[nomePagina + ':elencoSoggetto']['oggetti'] = new Array;
query[nomePagina + ':elencoSoggetto']['oggetti']['{descrizione}'] = "descrizione";
query[nomePagina + ':elencoSoggetto']['oggetti']['{id}'] = "id";

query[nomePagina + ':tabellaScontiCassa'] = new Array;
query[nomePagina + ':tabellaScontiCassa']['OFFSET'] = 0;
query[nomePagina + ':tabellaScontiCassa']['FETCH'] = 100;
query[nomePagina + ':tabellaScontiCassa']['MAXFETCH'] = 0;
query[nomePagina + ':tabellaScontiCassa']['oggetti'] = new Array;
query[nomePagina + ':tabellaScontiCassa']['oggetti']['{quantita}'] = { campo: 'quantita', decimaliMax: 2, decimaliMin: 0 };
query[nomePagina + ':tabellaScontiCassa']['oggetti']['{sconto}'] = { campo: 'sconto', decimaliMax: 2, decimaliMin: 0 };
query[nomePagina + ':tabellaScontiCassa']['oggetti']['{id}'] = { campo: 'id', decimaliMax: 0, decimaliMin: 0 };

query[nomePagina + ':formtabellaScontiCassa'] = new Array;
query[nomePagina + ':formtabellaScontiCassa']['oggetti'] = new Array;
query[nomePagina + ':formtabellaScontiCassa']['oggetti']['txtAddQuantità'] = 'quantita';
query[nomePagina + ':formtabellaScontiCassa']['oggetti']['txtAddSconto'] = 'sconto';

query[nomePagina + ':tabellaScontiTrasporto'] = new Array;
query[nomePagina + ':tabellaScontiTrasporto']['OFFSET'] = 0;
query[nomePagina + ':tabellaScontiTrasporto']['FETCH'] = 100;
query[nomePagina + ':tabellaScontiTrasporto']['MAXFETCH'] = 0;
query[nomePagina + ':tabellaScontiTrasporto']['oggetti'] = new Array;
query[nomePagina + ':tabellaScontiTrasporto']['oggetti']['{quantita}'] = { campo: 'quantita', decimaliMax: 2, decimaliMin: 0 };
query[nomePagina + ':tabellaScontiTrasporto']['oggetti']['{sconto}'] = { campo: 'sconto', decimaliMax: 2, decimaliMin: 0 };
query[nomePagina + ':tabellaScontiTrasporto']['oggetti']['{id}'] = { campo: 'id', decimaliMax: 0, decimaliMin: 0 };

query[nomePagina + ':formtabellaScontiTrasporto'] = new Array;
query[nomePagina + ':formtabellaScontiTrasporto']['oggetti'] = new Array;
query[nomePagina + ':formtabellaScontiTrasporto']['oggetti']['txtAddQuantitàTrasporto'] = 'quantita';
query[nomePagina + ':formtabellaScontiTrasporto']['oggetti']['txtAddScontoTrasporto'] = 'sconto';

var parametriNC = { "nascosti": "", "conti": "", "visSpese": 0, "maxAbbuono": 0, "modificheGuajana": 0, 'obbligatori': 'txtDataDa;txtDataA;txtDescrizione;cmbTipoSoggettoInteressato;slcUM;txtQuantitàMinima;' };
var tabelle = {};
var tabellaScontiCassa = new Array;
var liOrigD;
var tabellaScontiTrasporto = new Array;
var liOrigTrasporto;
var sk;
var idModifica;
const session = {
    key: 'skVarie.ContrattiB2B',
    setItems(value) {
        sessionStorage.setItem(this.key, JSON.stringify(value));
    },
    getItems() {
        return JSON.parse(sessionStorage.getItem(this.key));
    },
    clearItems() {
        sessionStorage.removeItem(this.key);
    }
}
window.addEventListener("load", function (event) {
    selezioneTipologiaSoggetto(document.getElementById('cmbTipoSoggettoInteressato'));
    setTimeout(function () {
        var script = document.createElement("script");
        script.setAttribute('src', "componenti/elementinuovoContrattiB2B.js");
        document.body.appendChild(script);
        script.onload = function () {
            query[nomePagina]['modelloRiga'] = modelloRigaModalListaMagazzino;
            query[nomePagina]['modelloContenitore'] = modalListaMagazzino;
            query[nomePagina + ':elencoSoggetto']['modelloRiga'] = elementiComboScomparsaFamiglia;
            query[nomePagina + ':tabellaScontiCassa']['modelloRiga'] = elementoGrigliaListaSconto;
            query[nomePagina + ':tabellaScontiTrasporto']['modelloRiga'] = elementoGrigliaListaScontoTrasporto;
            avviaCarDati("slcFamiglie");
            avviaCarDati("slcSottoFamiglie");
            avviaCarDati("cmbFamigliaCliFor");
            avviaCarDati("cmbAgente");
            avviaCarDati("cmbClienti");
            sk = session.getItems();
            var div = document.getElementById("divTitolo");

            if (sk != undefined) {
                idModifica = sk[0].ID;
                div.innerHTML = "MODIFICA ";
            } else {
                div.innerHTML = "NUOVO ";
            }

            div.innerHTML += "CONTRATTO B2B";
            recuperaParametri();
        }


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

}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "slcFamiglie":
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case "slcSottoFamiglie":
            parametri = { "tipoRisposta": "array", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case "cmbFamigliaCliFor":
            parametri = { "tipoRisposta": "array", "tipoQuery": "querySpecifica", "nomeTabella": "RaggruppamentoCliFor", "select": selectID };
            break;
        case "cmbAgente":
            parametri = { "tipoRisposta": "array", "tipoQuery": "querySpecifica", "nomeTabella": "Agenti", "select": selectID };
            break;
        case "cmbClienti":
            parametri = { "tipoRisposta": "array", "tipoQuery": "querySpecifica", "nomeTabella": "clienti", "select": selectID };
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
    } else if (parametri.tipoRisposta == 'select') {
        popolaSelectDaJSON(data, parametri.select)
    } else if (parametri.tipoRisposta == 'array') {
        tabelle[parametri.select] = data;
    }
    if (parametri.select == "slcFamiglie") {
        tabelle[parametri.select] = data;
    }
    if (risposte == 5 && sk != undefined) {
        carDatiAnag();
    }
}

function carDatiAnag() {
    risposte = 0;

    var parametri = { "tipoQuery": "listeVarie", "tipoRisposta": "scheda", "nomeQuery": "listeVarie.html:schedaContrattiRigheB2B", "id": idModifica, "chiamante": "scheda", "offSet": 0, "fetch": 0, "ricerca": '' };

    inviaRichiestaCentralino("query", parametri, elaboraCarDatiAnag);
}

function elaboraCarDatiAnag(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (Array.isArray(data)) {
        if (data[0] == 0) {
            visualizzaRiferimento(sk[0].TIPO, sk[0].IDRIF);
            popolaFormModificaDati(sk[0], nomePagina);
            return "";
        }
    }

    sk[0].righe = data;

    visualizzaRiferimento(sk[0].TIPO, sk[0].IDRIF);
    popolaFormModificaDati(sk[0], nomePagina);
    for (var x in sk[0].righe) {
        var riga = {
            "sconto": Number(sk[0].righe[x].sconto),
            "quantita": Number(sk[0].righe[x].quantita),
        }
        if (sk[0].righe[x].tipo == 1) {
            riga.id = tabellaScontiCassa.length;
            tabellaScontiCassa.push(riga);
        } else if (sk[0].righe[x].tipo == 2) {
            riga.id = tabellaScontiTrasporto.length;
            tabellaScontiTrasporto.push(riga);
        }
    }
    
    scompattaFamiglia(sk[0].IDFAMIGLIA, sk[0].LIVELLOFAMIGLIA);
    popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    popolaElencoDaJson(tabellaScontiTrasporto, 'elencoScontiTrasporto', 0, nomePagina + ':tabellaScontiTrasporto', true, 0);

}
function visualizzaRiferimento(tipo, idRiferimento) {
    var input = document.getElementById('txtSoggetto')
    input.setAttribute('idRiferimento', idRiferimento)
    var tabellaRiferimento;
    switch (tipo) {
        case "0":
            return;
            break;
        case "1":
            tabellaRiferimento = tabelle['cmbAgente'];
            break;
        case "2":
            tabellaRiferimento = tabelle['cmbFamigliaCliFor'];
            break;
        case "3":
            tabellaRiferimento = tabelle['cmbClienti'];
            break;
    }

    for (var x of tabellaRiferimento) {
        if (x.id == idRiferimento) {
            input.value = x.descrizione;
            break;
        }
    }
}

function esci() {
    if (xTarget == "_blank") {
        window.close();
    } else {
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href = "listeVarie.html?tabella=ContrattiB2B";
        }else{
            window.open("listeVarie.html?tabella=ContrattiB2B", xTarget);
        }
        
    }
}


function resetErrore(e) {
    e.setAttribute("style", "");
}



function controlloQuantità(input) {
    if (input.value != '') {

        if (isNaN(input.value)) {
            input.value = '';
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione campo quantita non valido!');
            input.focus()
        }
    }
}

function gestQuantità(valore, id) {
    var input = document.getElementById(id);
    input.value = Number(input.value) + Number(valore);
}
function pulisciForm() {
    for (var [k, v] of Object.entries(query[nomePagina]['oggetti'])) {
        try {
            document.getElementById(k).value = '';
        } catch (e) {
            console.log(k);
        }

    }


}

function popolaSelectFamiglie(input) {
    var famiglie = tabelle['slcSottoFamiglie'];
    // var famigliaSelezionata=document.getElementById('slcFamiglie'+livelloCorrente).value;
    var famigliaSelezionata = input.value;
    var livelloCorrente = Number(input.getAttribute('livello'));
    var famigliaDest = [];
    popolaSelectDaJSON(famigliaDest, 'slcFamiglie' + (livelloCorrente + 1));
    popolaSelectDaJSON(famigliaDest, 'slcFamiglie' + (livelloCorrente + 2));
    popolaSelectDaJSON(famigliaDest, 'slcFamiglie' + (livelloCorrente + 3));
    for (var x of famiglie) {
        if (livelloCorrente < 0) {
            if (x.idgr == famigliaSelezionata && (livelloCorrente + 1) == (x.livello)) {

                famigliaDest.push(x);
            }
        } else {
            if (x.idpadre == famigliaSelezionata && (livelloCorrente + 1) == (x.livello)) {

                famigliaDest.push(x);
            }
        }

    }
    popolaSelectDaJSON(famigliaDest, 'slcFamiglie' + (livelloCorrente + 1));
}
function selezioneTipologiaSoggetto(input) {
    var value = input.value;
    var ul = '';
    var soggetto = document.getElementById('txtSoggetto');
    soggetto.disabled = false;
    soggetto.setAttribute('idRiferimento', '');
    soggetto.value = '';
    switch (value) {
        case "0":
            document.getElementById('txtSoggetto').value = '';
            document.getElementById('txtSoggetto').disabled = true;
            break;
        case "1":
            ul = 'ulAgenti';
            var data = tabelle['cmbAgente'];
            var json = 'cmbAgente';
            break;
        case "2":
            ul = 'ulFamigliaCliFor';
            var data = tabelle['cmbFamigliaCliFor'];
            var json = 'cmbFamigliaCliFor';
            break;
        case "3":
            ul = 'ulClienti';
            var data = tabelle['cmbClienti'];
            var json = 'cmbClienti';
            break;
    }
    soggetto.setAttribute('onkeyup', `attivaRicercaComboScomparsa(this,'${nomePagina}:elencoSoggetto','ulListeSoggetto','${json}.jSon')`)

}
function selezionaSoggettoDaLista(input) {
    var div = document.getElementById('txtSoggetto');
    div.value = input.innerText;
    div.setAttribute('idRiferimento', input.getAttribute('idRiferimento'));
}
function salva(risp) {
    if (risp.toLowerCase() == 'si') {
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

        var objDati = {};
        objDati.testataContratto = {};
        recuperaValoriJson(objDati.testataContratto, nomePagina);
        if (isDate(objDati.testataContratto.DATADA, document.getElementById('txtDataDa')) == false) {
            attivaAlert(
                2,
                'Attenzione, la data di inizio non è valida',
                "erroriCampi"
            );
            return;
        }
        if (isDate(objDati.testataContratto.DATAA, document.getElementById('txtDataA')) == false) {
            attivaAlert(
                2,
                'Attenzione, la data di fine non è valida',
                "erroriCampi"
            );
            return;
        }
        if (document.getElementById('cmbTipoSoggettoInteressato').value != 0) {
            objDati.testataContratto.IDRIF = document.getElementById('txtSoggetto').getAttribute('idRiferimento');
            if (objDati.testataContratto.IDRIF == '') {
                attivaAlert(2, 'Non è stato selezionato nessun soggetto', 'erroriCampi');
                return;
            }
        }
        var idFamiglia = '';
        var cont = 2;
        var livello = 2;
        do {
            var x = document.getElementById('slcFamiglie' + cont);
            if (x.value != '') {
                idFamiglia = x.value;
                livello = x.getAttribute('livello');
            }
            if (cont === '') {
                break;
            }
            cont = cont - 1;
            if (cont === -1) {
                cont = '';
            }
        } while (idFamiglia == '');

        if (idFamiglia == '') {
            attivaAlert(2, 'Non è stata selezionata nessuna famiglia', 'erroriCampi');
            return;
        }
        objDati.testataContratto.IDFAMIGLIA = idFamiglia;
        objDati.testataContratto.LIVELLOFAMIGLIA = livello;

        var controlloQuantitàTabellaScontiCassa = false
        for (var x in tabellaScontiCassa) {
            if (isEmpty(tabellaScontiCassa[x]) == false) {
                controlloQuantitàTabellaScontiCassa = true;
                break;
            }
        }
        if (controlloQuantitàTabellaScontiCassa == false) {
            attivaAlert(2, 'Non è stato inserito nessuno sconto!', 'erroriCampi');
            return;
        }
        objDati.tabellaScontiCassa = tabellaScontiCassa;
        objDati.tabellaScontiTrasporto = tabellaScontiTrasporto;
        if (objDati.testataContratto.ID == '') {
            delete objDati.testataContratto.ID;
        }
        var parametri = { tipoRisposta: "salva", tipoSalva: "contrattiB2B", dati: objDati };
        inviaRichiestaCentralino("salva", parametri, (res) => {
            attivaAlert(xTipoAllert.SUCCESSO, 'Contratto salvato con successo!');
            setTimeout(function () {
                window.open("listeVarie.html?tabella=ContrattiB2B", xTarget);
            }, 1000)
        });

    }
}

function inserisciRigaSconto(riga = '') {
    var quantita = document.getElementById('txtAddQuantità').value;
    var sconto = document.getElementById('txtAddSconto').value;
    if (quantita == '' || sconto == '') {
        attivaAlert(2, 'Non sono stati inseriti tutti i dati', 'erroriCampi');
        return;
    }
    var txtQuantitàMinima = document.getElementById('txtQuantitàMinima');

    if (Number(quantita) < Number(txtQuantitàMinima.value)) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'La quantità minima è ' + txtQuantitàMinima.value, 'erroriCampi');
        return;
    }
    if (riga == '') {
        var id = tabellaScontiCassa.length;
        tabellaScontiCassa.push({ quantita: quantita, sconto: sconto, id: id });

    } else {
        tabellaScontiCassa[riga].quantita = quantita;
        tabellaScontiCassa[riga].sconto = sconto;
    }
    popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    var ul = document.getElementById("elencoScontiCassa");
    setTimeout(function () {
        ul.scrollTop = ul.scrollHeight;
    }, 100);
}
function annullaAddScontoRiga(id = '') {

    if (id == '') {
        var e = document.getElementById("liXAddRigaSconto");
        e.parentNode.removeChild(e);
    } else {
        var e = document.getElementById("liRigaSconto." + id);
        e.innerHTML = liOrigD;
        // popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    }
}
function formInserimentoRigaSconto(riga = '') {
    if (document.getElementById("divAddD") == undefined) {
        if (riga == '') {
            var ul = document.getElementById("elencoScontiCassa");
            ul.innerHTML += elementoLiRigaScontoxAdd;

            var li = document.getElementById("liXAddRigaSconto");
            li.innerHTML = elementoRigaScontoAdd;
            setTimeout(function () {
                ul.scrollTop = ul.scrollHeight;
            }, 100);
        } else {
            var li = document.getElementById("liRigaSconto." + riga);
            liOrigD = li.innerHTML;

            li.innerHTML = elementoRigaScontoAdd;

            document.getElementById("btnInseriementoRigaSconto").setAttribute("onclick", "inserisciRigaSconto('" + riga + "')");
            document.getElementById("btnAnnullaInserimentoSconto").setAttribute("onclick", "annullaAddScontoRiga('" + riga + "')");
            popolaFormModificaDati(tabellaScontiCassa[riga], nomePagina + ':formtabellaScontiCassa');
        }
    } else {
        attivaAlert(0, "Concludere la modifica in Corso!", "apriModificaDestinazione");
    }
}
function eliminaRigaSconto(riga) {
    // tabellaScontiCassa.splice(riga,1);
    tabellaScontiCassa[riga] = {};
    popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
}
function eliminaRigaScontoTrasporto(riga) {
    // tabellaScontiCassa.splice(riga,1);
    tabellaScontiTrasporto[riga] = {};
    popolaElencoDaJson(tabellaScontiTrasporto, 'elencoScontiTrasporto', 0, nomePagina + ':tabellaScontiTrasporto', true, 0);
}
function formInserimentoRigaScontoTrasporto(riga = '') {
    if (document.getElementById("divAddScontoTrasporto") == undefined) {
        if (riga == '') {
            var ul = document.getElementById("elencoScontiTrasporto");
            ul.innerHTML += elementoLiRigaScontoTrasportoxAdd;

            var li = document.getElementById("liXAddRigaScontoTrasporto");
            li.innerHTML = elementoRigaScontoTrasportoAdd;
            setTimeout(function () {
                ul.scrollTop = ul.scrollHeight;
            }, 100);
        } else {
            var li = document.getElementById("liRigaScontoTrasporto." + riga);
            liOrigTrasporto = li.innerHTML;

            li.innerHTML = elementoRigaScontoTrasportoAdd;

            document.getElementById("btnInseriementoRigaScontoTrasporto").setAttribute("onclick", "inserisciRigaScontoTrasporto('" + riga + "')");
            document.getElementById("btnAnnullaInserimentoScontoTrasporto").setAttribute("onclick", "annullaAddScontoRigaTrasporto('" + riga + "')");
            popolaFormModificaDati(tabellaScontiTrasporto[riga], nomePagina + ':formtabellaScontiTrasporto');
        }
    } else {
        attivaAlert(0, "Concludere la modifica in Corso!", "apriModificaDestinazione");
    }
}
function inserisciRigaScontoTrasporto(riga = '') {
    var quantita = document.getElementById('txtAddQuantitàTrasporto').value;
    var sconto = document.getElementById('txtAddScontoTrasporto').value;
    if (quantita == '' || sconto == '') {
        attivaAlert(2, 'Non sono stati inseriti tutti i dati', 'erroriCampi');
        return;
    }
    if (riga == '') {
        var id = tabellaScontiTrasporto.length;
        tabellaScontiTrasporto.push({ quantita: quantita, sconto: sconto, id: id });

    } else {
        tabellaScontiTrasporto[riga].quantita = quantita;
        tabellaScontiTrasporto[riga].sconto = sconto;
    }
    popolaElencoDaJson(tabellaScontiTrasporto, 'elencoScontiTrasporto', 0, nomePagina + ':tabellaScontiTrasporto', true, 0);
    var ul = document.getElementById("elencoScontiTrasporto");
    setTimeout(function () {
        ul.scrollTop = ul.scrollHeight;
    }, 100);
}
function scompattaFamiglia(idFamiglia, livello) {
        
    if (idFamiglia != 0) {
        do {
            if (livello == -1) {
                var livelloCampo = document.getElementById("slcFamiglie");
                for (var y of tabelle['slcFamiglie']) {
                    if (y.id == idFamiglia) {
                        livelloCampo.value = idFamiglia;
                        break
                    }

                }
            } else {

                var livelloCampo = document.getElementById("slcFamiglie" + livello);
                for (var y of tabelle['slcSottoFamiglie']) {
                    var famigliaDest = new Array;
                    for (var z of tabelle['slcSottoFamiglie']) {
                        if (z.livello == livello) {
                            famigliaDest.push(z);
                        }

                    }

                    if (y.livello == livello && y.id == idFamiglia) {
                        // console.log(famigliaDest)
                        popolaSelectDaJSON(famigliaDest, 'slcFamiglie' + (livello));
                        livelloCampo.value = idFamiglia;
                        idFamiglia = y.idgr;
                        break;
                    }
                }
            }
            livello--;
        } while (livello != -2)
    }
}
function annullaAddScontoRigaTrasporto(id='') {
    if (id == '') {
        var e = document.getElementById("liXAddRigaScontoTrasporto");
        e.parentNode.removeChild(e);
    } else {
        var e = document.getElementById("liRigaScontoTrasporto." + id);
        e.innerHTML = liOrigTrasporto;
        // popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    }
}