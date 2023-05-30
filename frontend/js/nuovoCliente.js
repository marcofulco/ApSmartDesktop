query['nuovoCliente.html'] = new Array;
query['nuovoCliente.html']['oggetti'] = new Array;
query['nuovoCliente.html']['oggetti']['txtRagioneSociale'] = "RAGIONE_SOCIALE";
query['nuovoCliente.html']['oggetti']['txtIndirizzo'] = "INDIRIZZO";
query['nuovoCliente.html']['oggetti']['txtCAP'] = "CAP";
query['nuovoCliente.html']['oggetti']['txtLocalita'] = "LOCALITA";
query['nuovoCliente.html']['oggetti']['txtProv'] = "PROV";
query['nuovoCliente.html']['oggetti']['txtPiva'] = "PIVA";
query['nuovoCliente.html']['oggetti']['txtCF'] = "CF";
query['nuovoCliente.html']['oggetti']['txtSDI'] = "SDI";
query['nuovoCliente.html']['oggetti']['txtPEC'] = "PEC";
query['nuovoCliente.html']['oggetti']['txtTel'] = "TEL1";
query['nuovoCliente.html']['oggetti']['txtTel2'] = "TEL2";
query['nuovoCliente.html']['oggetti']['txtFax'] = "FAX";
query['nuovoCliente.html']['oggetti']['txtCellulare'] = "CEL";
query['nuovoCliente.html']['oggetti']['txteMail'] = "EMAIL";
query['nuovoCliente.html']['oggetti']['cmbPagamento'] = "PAGAMENTO";
query['nuovoCliente.html']['oggetti']['txtNote'] = "NOTE";
query['nuovoCliente.html']['oggetti']['txtNoteConsegna'] = "NOTECONSEGNA";
query['nuovoCliente.html']['oggetti']['cmbFamigliaCliFor'] = "RAGGRUPPAMENTO";
query['nuovoCliente.html']['oggetti']['txtBanca'] = "BANCA_DESCRIZIONE";
query['nuovoCliente.html']['oggetti']['txtPaese'] = "BANCA_PAESE";
query['nuovoCliente.html']['oggetti']['txtCIN'] = "BANCA_CIN";
query['nuovoCliente.html']['oggetti']['txtABI'] = "BANCA_ABI";
query['nuovoCliente.html']['oggetti']['txtCAB'] = "BANCA_CAB";
query['nuovoCliente.html']['oggetti']['txtCC'] = "CC";
query['nuovoCliente.html']['oggetti']['cmbListino'] = "Listino";
query['nuovoCliente.html']['oggetti']['cmbIva'] = "ID_IVA";
query['nuovoCliente.html']['oggetti']['txtListino'] = "Listino";
query['nuovoCliente.html']['oggetti']['cmbAgente'] = "COD_AGENTE";
query['nuovoCliente.html']['oggetti']['cmbNazione'] = "CODICENAZIONE";
query['nuovoCliente.html']['oggetti']['cmbVettore'] = "VETTORERIF";
query['nuovoCliente.html']['oggetti']['cmbMezzo'] = "MEZZOTRAS";
query['nuovoCliente.html']['oggetti']['txtIstat'] = "CODICEISTAT";
query['nuovoCliente.html']['oggetti']['cmbRegione'] = "REGIONE";
query['nuovoCliente.html']['oggetti']['txtFido'] = "FIDO";
query['nuovoCliente.html']['oggetti']['cmbPosizione'] = "POSIZIONE";
query['nuovoCliente.html']['oggetti']['txtPercTrasp'] = "PERCTRASPA";
query['nuovoCliente.html']['oggetti']['txtTrasporto'] = "TRASPORTOA";
query['nuovoCliente.html']['oggetti']['cmbDeposito'] = "IDDEPOSITO";
query['nuovoCliente.html']['oggetti']['txtRicercaAlternativa'] = "RICERCAALTERNATIVA";

var parametriNC = { "obbligatori": "txtRagioneSociale;txtIndirizzo;txtCAP;txtLocalita;txtProv;txteMail;", "alternativi": "txtPiva;txtCF;", "alternativi1": "txtSDI;txtPEC;", "nascosti": "divFido;", "ricercaPIVA": 0, "lblRicercaVeloce": "Ricerca Veloce" };

tipoAnagrafica = recuperaParametroHRef("CLIENTE");
var idModifica = recuperaParametroHRef(0, "id");

window.addEventListener("load", function (event) {
    if (getParamValue('modRichiamo') != false) {
        document.getElementById("divTestaSuperiore").remove();
        var corpo = document.getElementById('divCorpo');
        corpo.classList.remove('posTopA105p');
        corpo.classList.add('posTopA60p');
        var x = document.getElementById('divBase');
        x.style.setProperty('top', '0px', 'important');
    }

    setTimeout(function () {
        document.getElementById("tabContatti").click();

        var div = document.getElementById("divTitolo");

        if (idModifica > 0) {
            div.innerHTML = "MODIFICA ";
        } else {
            div.innerHTML = "NUOVO ";
            valorizzaValueElemento("txtListino", xListino);
        }

        div.innerHTML += tipoAnagrafica;

        if (xIdAgente > 0 || xIdCliente > 0) {
            document.getElementById("cmbAgente").disabled = true;
        }

        recuperaParametri();
        avviaCarDati("cmbFamigliaCliFor");
        avviaCarDati("cmbPagamento");
        avviaCarDati("txtLocalita");
        avviaCarDati("cmbPosizione");
        avviaCarDati("cmbNazione");
        avviaCarDati("cmbRegione");
        avviaCarDati("cmbAgente");
        avviaCarDati("cmbListino");
        avviaCarDati("cmbDeposito");
        avviaCarDati("cmbIva");
        avviaCarDati("cmbVettore");

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

    if (xIdCliente > 0) {
        document.getElementById("divFido").classList.add("hide");
    }
    if (localStorage.getItem("modSupermercato."+xIdConfigurazione) != undefined && localStorage.getItem("modSupermercato."+xIdConfigurazione) == "true") {
        parametriNC.obbligatori = "txtRagioneSociale;txtIndirizzo;txtCAP;txtLocalita;txtProv;"
        parametriNC.alternativi2 = "";
        document.getElementById("txtListino").value=0;
        document.getElementById("txtListino").disabled=true;
    }
    document.getElementById("txtRicercaAlternativa").setAttribute("placeholder", parametriNC.lblRicercaVeloce);
    valorizzaHTMLElemento("lblRicercaVeloce", parametriNC.lblRicercaVeloce);
    if (parametriNC.ricercaPIVA == 1) {
        document.getElementById('ricercaDatiAnagrafici').classList.remove('hide');
    }
}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "cmbPagamento":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "tesPagamenti", "select": selectID };
            break;
        case "cmbFamigliaCliFor":
            var soloPerApp = 0;

            if (idModifica == 0 && xIdAgente > 0) {
                soloPerApp = 1;
            }

            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "RaggruppamentoCliFor", "select": selectID, "soloPerApp": soloPerApp };
            break;
        case "cmbAgente":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "Agenti", "select": selectID };
            break;
        case "txtLocalita":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "localita", "select": selectID };
            break;
        case "cmbPosizione":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "posizione", "select": selectID };
            break;
        case "cmbNazione":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "nazione", "select": selectID };
            break;
        case "cmbRegione":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "regione", "select": selectID };
            break;
        case "cmbListino":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "anagraficaListini", "select": selectID };
            break;
        case "cmbDeposito":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "depositi", "select": selectID };
            break;
        case "cmbIva":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "codiciIva", "select": selectID };
            break;
        case "cmbVettore":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "vettori", "select": selectID };
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
            if (risposte == 11 && idModifica > 0) {
                carDatiAnag();
            }

            return "";
        }
    }

    data = verificaMd5(parametri.select, parametri, risp, data);

    if (parametri.select != "txtLocalita" && parametri.select != "cmbPosizione") {
        popolaSelectDaJSON(data, parametri.select);
    }

    if (parametri.select == "cmbListino") {
        if (data[0] != 0) {
            document.getElementById("divNumListino").classList.add("hide");
            document.getElementById("divListino").classList.remove("hide");

            if (!idModifica > 0) {
                valorizzaValueElemento("cmbListino", xListino);
            }
        }
    }

    if (parametri.select == "cmbNazione") {
        valorizzaValueElemento("cmbNazione", "IT");
    } else if (parametri.select == "cmbAgente") {
        if (xIdAgente > 0) {
            valorizzaValueElemento("cmbAgente", xIdAgente);
        }
    }

    if (risposte == 11 && idModifica > 0) {
        carDatiAnag();
    } else if (risposte == 11) {
        carDatiPredefiniti();
    }
}

function carDatiAnag() {
    jSonCli = window.sessionStorage.getItem("schedaCliente.html.CLIENTE." + idModifica + ".jSon");

    if (jSonCli != undefined) {
        jSonCli = JSON.parse(jSonCli);
        popolaFormModificaDati(jSonCli[0], "nuovoCliente.html");

        if (xIdCliente > 0 || xIdAgente > 0) {
            document.getElementById("txtRagioneSociale").disabled = true;
            document.getElementById("txtPiva").disabled = true;
            document.getElementById("txtCF").disabled = true;
            document.getElementById("cmbPagamento").disabled = true;
            document.getElementById("cmbIva").disabled = true;
            document.getElementById("cmbFamigliaCliFor").disabled = true;
            document.getElementById("txtPercTrasp").disabled = true;
            document.getElementById("txtTrasporto").disabled = true;

            if (xIdCliente > 0) {
                document.getElementById("txtNote").style.display = none;
            }
        }
    } else {
        idModifica = 0;
    }
}

function esci() {
    if (getParamValue('modRichiamo') != false) {
        var x = (location.href).split('/');
        var link = location.href.replace(x[x.length - 1], `ListaClienti.html?ListaClienti.html?tipoAnagrafica=ANAGRAFICA&modRichiamo=${xIdDispositivo}`);
        if (typeof modElectron != 'undefined' && modElectron == true) {
            location.href = link;
        } else {
            window.open(link, '_self');
        }

        return;
    }
    if (localStorage.getItem('objNuovoCli') == 'vuoto') {
        localStorage.setItem('objNuovoCli', 'chiuso');
        window.close();
    } else {
        if (idModifica > 0) {
            if (typeof modElectron != 'undefined' && modElectron == true) {
                location.href = 'schedaCliente.html?tipoAnagrafica=' + tipoAnagrafica;
            } else {
                window.open('schedaCliente.html?tipoAnagrafica=' + tipoAnagrafica, '_self');
            }

        } else {
            if (typeof modElectron != 'undefined' && modElectron == true) {
                location.href = 'ListaClienti.html?tipoAnagrafica=' + tipoAnagrafica;
            } else {
                window.open('ListaClienti.html?tipoAnagrafica=' + tipoAnagrafica, '_self');
            }
        }
    }


}

function Salva() {
    var v;
    var errori = false;
    var campi = "";
    var e;
    var campiAl;
    var r;
    var valoreVerifica = "";

    for (x in parametriNC) {
        if (x == "obbligatori") {
            v = parametriNC.obbligatori.split(";")
            for (i = 0; i < v.length - 1; i++) {
                e = document.getElementById(v[i]);

                if (e.tagName == "SELECT") {
                    valoreVerifica = "0"
                }

                if (recuperaValueElemento(v[i]) == valoreVerifica) {
                    errori = true;

                    e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi += e.getAttribute("placeholder") + '<br>';
                }
            }
        } else if (x.indexOf("alternativi") >= 0) {
            r = 0;
            campiAl = [""];

            v = parametriNC[x].split(";")
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
                    e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi += e.getAttribute("placeholder") + '<br>';
                }
            }
        }
    }

    if (errori) {
        attivaAlert(2, "Non sono stati valorizzati i seguenti Campi Obbligatori:<br>" + campi, "erroriCampi");
        return;
    }

    if (recuperaValueElemento("cmbNazione") == "IT") {
        if (recuperaValueElemento("txtPiva") != "") {
            if (!controllaPartitaIVA(recuperaValueElemento("txtPiva"))) {
                e = document.getElementById("txtPiva");
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Partita Iva non corretta!", "erroriCampi");
                return;
            }
        }

        if (recuperaValueElemento("txtCF") != "") {
            if (recuperaValueElemento("txtCF").length == 11) {
                if (!controllaPartitaIVA(recuperaValueElemento("txtCF"))) {
                    e = document.getElementById("txtCF");
                    e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    attivaAlert(2, "Codice Fiscale non corretto!", "erroriCampi");
                    return;
                }
            } else {
                if (!controllaCodiceFiscale(recuperaValueElemento("txtCF"))) {
                    e = document.getElementById("txtCF");
                    e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    attivaAlert(2, "Codice Fiscale non corretto!", "erroriCampi");
                    return;
                }
            }
        }

        if (recuperaValueElemento("txtSDI") != "") {
            if (recuperaValueElemento("txtSDI").length != 6 && recuperaValueElemento("txtSDI").length != 7) {
                e = document.getElementById("txtSDI");
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Codice SDI non valido. Lunghezza compresa tra 6 e 7 caratteri!", "erroriCampi");
                return;
            }
        }
    } else {
        if (recuperaValueElemento("txtSDI") != "XXXXXXX") {
            e = document.getElementById("txtSDI");
            e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
            attivaAlert(2, "Codice SDI non valido. Per i clienti con nazionalità estera va impostato XXXXXXX!", "erroriCampi");
            return;
        }
    }

    if (recuperaValueElemento("txtPEC") != "") {
        if (!validazioneEmail("txtPEC")) {
            return;
        }
    }

    if (recuperaValueElemento("txteMail") != "") {
        if (!validazioneEmail("txteMail")) {
            return;
        }
    }

    if (recuperaValueElemento("txtListino") == "") {
        e = document.getElementById("txtListino");
        e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        attivaAlert(2, "Valore Campo Listino Non Valido!", "erroriCampi");
        return;
    }

    var jSon = {};

    for (x in query['nuovoCliente.html']['oggetti']) {
        jSon[query['nuovoCliente.html']['oggetti'][x]] = recuperaValueElemento(x);
    }

    jSon.NAZIONE = getSelectedSelectText("cmbNazione");

    jSon.CLIENTE = 1;

    if (xIdAgente > 0) {
        jSon.CREATODAAGENTE = 1;
    }

    if (jSon.FIDO == "") {
        jSon.FIDO = "0";
    }

    jSon.id = idModifica;

    if (recuperaValueElemento("cmbNazione") == "IT") {
        jSon.verificaEsistenzaAnagrafica = 1;
    }

    tipo = "salva";
    if (idModifica > 0) {
        tipo = "update";
    }

    if (jSon.PERCTRASPA == undefined) {
        jSon.PERCTRASPA = 0;
    }

    if (jSon.PERCTRASPA == "") {
        jSon.PERCTRASPA = 0;
    }

    if (jSon.TRASPORTOA == undefined) {
        jSon.TRASPORTOA = 0;
    }

    if (jSon.TRASPORTOA == "") {
        jSon.TRASPORTOA = 0;
    }

    var parametri = { "tipoRisposta": tipo, "tipoSalva": "anagrafiche", "dati": jSon };
    inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);
}

function elaboraRispostaSalvaCarrello(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0 || data == false) {
        attivaAlert(0, "Errore durante il salvataggio del Cliente", "fineSalva");
        return "";
    }

    var id = data;

    if (idModifica > 0) {
        id = idModifica;
    }

    if (tipoAnagrafica == "CLIENTE") {
        window.sessionStorage.setItem("idCliente", id);
        window.sessionStorage.setItem("ragioneSociale", recuperaValueElemento("txtRagioneSociale"));
    } else {
        window.sessionStorage.setItem("idFornitore", id);
        window.sessionStorage.setItem("ragioneSocialeF", recuperaValueElemento("txtRagioneSociale"));
    }
    // if(localStorage.getItem('objNuovoCli')=='vuoto'){
    //     var obj={
    //         "ID" : id,
    //         "ragioneSociale" : recuperaValueElemento("txtRagioneSociale")
    //     }
    //     console.log(obj)
    //     localStorage.setItem("objNuovoCli",JSON.stringify(obj));
    //     console.log(localStorage.getItem('objNuovoCli'));
    //     window.close();
    // }
    if (getParamValue('modRichiamo') != false) {

        var obj = {
            'id': id,
            'ragioneSociale': recuperaValueElemento("txtRagioneSociale")
        }
        obj.token = xTkCom;
        window.parent.postMessage(JSON.stringify(obj), '*');
        return
    }
    if (typeof modElectron != 'undefined' && modElectron == true) {
        location.href = "sschedaCliente.html?tipoAnagrafica=" + tipoAnagrafica;
    } else {
        window.open("schedaCliente.html?tipoAnagrafica=" + tipoAnagrafica, "_self");
    }

}

function resetErrore(e) {
    e.setAttribute("style", "");
}

function valorizzaAltriCampiLocalita() {
    s = document.getElementById("txtLocalita");

    var jLoc = JSON.parse(localStorage.getItem("txtLocalita.jSon"));

    if (jLoc != undefined) {
        for (x in jLoc) {
            if (jLoc[x].id == s.value) {
                valorizzaValueElemento("txtCAP", jLoc[x].cap);
                valorizzaValueElemento("txtProv", jLoc[x].pr);
                valorizzaValueElemento("cmbRegione", jLoc[x].regione);
                valorizzaValueElemento("txtIstat", jLoc[x].istat);
                return;
            }
        }
    }
}

function changeSelectPaginaCorrente(s) {
    switch (s.id) {
        case "cmbListino":
            valorizzaValueElemento("txtListino", s.value);
            break;
    }
}

function carDatiPredefiniti() {
    if (parametriNC.cmbPagamento != undefined) {
        cambiaSelezioneSelect("cmbPagamento", parametriNC.cmbPagamento);
        document.getElementById("cmbPagamento").disabled = true;
    }

    if (parametriNC.cmbDeposito != undefined) {
        cambiaSelezioneSelect("cmbDeposito", parametriNC.cmbDeposito);
        document.getElementById("cmbDeposito").disabled = true;
    }

    if (parametriNC.cmbIva != undefined) {
        cambiaSelezioneSelect("cmbIva", parametriNC.cmbIva);
        document.getElementById("cmbIva").disabled = true;
    }

    if (parametriNC.cmbNazione != undefined) {
        cambiaSelezioneSelect("cmbNazione", parametriNC.cmbNazione);
        document.getElementById("cmbNazione").disabled = true;
    }

    if (parametriNC.txtSDI != undefined) {
        valorizzaValueElemento("txtSDI", parametriNC.txtSDI);
        document.getElementById("txtSDI").disabled = true;
    }

    if (parametriNC.cmbListino != undefined) {
        cambiaSelezioneSelect("cmbListino", parametriNC.cmbListino);
        document.getElementById("cmbListino").disabled = true;
    }

    if (parametriNC.cmbFamigliaCliFor != undefined) {
        cambiaSelezioneSelect("cmbFamigliaCliFor", parametriNC.cmbFamigliaCliFor);
        document.getElementById("cmbFamigliaCliFor").disabled = true;
    }

    if (parametriNC.txtProv != undefined) {
        valorizzaValueElemento("txtProv", parametriNC.txtProv);
        document.getElementById("txtProv").disabled = true;
    }

    if (parametriNC.cmbMezzo != undefined) {
        cambiaSelezioneSelect("cmbMezzo", parametriNC.cmbMezzo);
        document.getElementById("cmbMezzo").disabled = true;
    }

    if (parametriNC.cmbVettore != undefined) {
        cambiaSelezioneSelect("cmbVettore", parametriNC.cmbVettore);
        document.getElementById("cmbVettore").disabled = true;
    }
}
function controllaPartitaIVA(pi) {
    if (pi == '') return false;
    else if (!/^[0-9]{11}$/.test(pi)) return false;
    else {
        var s = 0;
        for (i = 0; i <= 9; i += 2) {
            s += pi.charCodeAt(i) - '0'.charCodeAt(0);
        }
        for (i = 1; i <= 9; i += 2) {
            var c = 2 * (pi.charCodeAt(i) - '0'.charCodeAt(0));
            if (c > 9) c = c - 9;
            s += c;
        }
        var controllo = (10 - s % 10) % 10;
        if (controllo != pi.charCodeAt(10) - '0'.charCodeAt(0)) return false;
        else {
            
            return true
        };
    }
}
// function controllaPartitaIVA(piva) {
//     if(piva==''){
//         return;
//     }

//     // Verifica che la partita IVA sia una stringa di 11 caratteri numerici
//     if (!/^\d{11}$/.test(piva)) {
//        attivaAlert(0,"La partita IVA contiene valori non validi","fineSalva");
//       return false;
//     }


//     // Calcolo la somma ponderata dei primi 10 caratteri
//     let somma = 0;
//     for (let i = 0; i < 10; i++) {
//       const cifra = parseInt(piva.charAt(i), 10);

//       // Per le posizioni pari, moltiplica la cifra per 2, altrimenti per 1
//       const moltiplicatore = i % 2 === 0 ? 2 : 1;
//       const prodotto = cifra * moltiplicatore;

//       // Se il prodotto è maggiore di 9, sottrai 9 per ottenere un numero a una cifra
//       const contributo = prodotto > 9 ? prodotto - 9 : prodotto;

//       somma += contributo;
//     }

//     // Calcola il resto della divisione della somma per 10
//     const resto = somma % 10;

//     // Calcola il check digit (11 - resto) % 10
//     const checkDigit = (11 - resto) % 10;

//     // Confronta il check digit calcolato con l'ultimo carattere della partita IVA
//     if(checkDigit === parseInt(piva.charAt(10), 10) ){
//         attivaAlert(0,"La partita IVA non è valida","fineSalva");
//         return false;
//     }else{
//         if(parametriNC.ricercaPIVA==1){
//             recuperaDatiAnagraficiDaPiva(piva);
//         }

//     }
//   }
function recuperaDatiAnagraficiDaPiva(piva) {
    console.log(piva)
    var res=controllaPartitaIVA(piva);
    if(res==false){
        attivaAlert(0,"La partita IVA non è valida","fineSalva");
        return;
    }
    parametri = {
        "tipoQuery": "recuperoDatiAnagraficiDaPIVA",
        "nomeTabella": "recuperoDatiAnagraficiDaPIVA",
        'PIVA': piva
    };
    inviaRichiestaCentralino("multiQuery", parametri, (res) => {
        var risp = JSON.parse(res);
        var error = risp.error;
        var risposta = risp.risposta;
        if (error == '' && risposta[0] != 0) {
            query['datiAnagrafici'] = new Array;
            query['datiAnagrafici']['oggetti'] = new Array;
            query['datiAnagrafici']['oggetti']['txtRagioneSociale'] = "denominazione";
            query['datiAnagrafici']['oggetti']['txtIndirizzo'] = "indirizzo";
            query['datiAnagrafici']['oggetti']['txtCAP'] = "cap";
            query['datiAnagrafici']['oggetti']['txtLocalita'] = "comune";
            query['datiAnagrafici']['oggetti']['txtProv'] = "provincia";
            query['datiAnagrafici']['oggetti']['txtPiva'] = "piva";
            query['datiAnagrafici']['oggetti']['txtCF'] = "cf";
            query['datiAnagrafici']['oggetti']['txtSDI'] = "codice_destinatario";
            // $query['datiAnagrafici']['oggetti']['txtPEC']="PEC";
            var risp = risposta.data;
            popolaFormDatiObj(risp, query['datiAnagrafici']['oggetti']);
            var jLoc = JSON.parse(localStorage.getItem("txtLocalita.jSon"));

            if (jLoc != undefined) {
                for (x in jLoc) {
                    if (jLoc[x].id == risp.comune) {
                        valorizzaValueElemento("txtCAP", jLoc[x].cap);
                        valorizzaValueElemento("txtProv", jLoc[x].pr);
                        valorizzaValueElemento("cmbRegione", jLoc[x].regione);
                        valorizzaValueElemento("txtIstat", jLoc[x].istat);
                        return;
                    }
                }
            }


        }
    })
}

