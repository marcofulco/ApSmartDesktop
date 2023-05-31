caricamentoForm(1);
var focusForm = 'ricercaArticoloVenditaBanco';
var quantità = 1;
var parametriDoc;
var risposte = 0;
var risposteCarDatiParametri = 7;
var codiciIva = new Array();
var decimaliPrezzi = 5;//valore default
var codiciRapidi = new Array();
var datiOperazioni = new Array();
var articoliPredefiniti = {};
var repartoIdIva = {};
var timer;
var documentoTmp;
var listaRientri = {};
var depositiArr = {};
var parametriTipiDocumenti = {};
var fncTmpAmministratore;//variabile per il passaggio della funzione per richiesta amministrazione
var invioRegistratoreCassa = false;
var parametriCasse = new Array();//array che colleziona tutti i parametri
var documentoIvaInclusa = true;
var xParametriCassa = { modSupermercato: false, modOffline: false };//oggetto che contiene i parametri della cassa

query['venditaBanco.html:PARAMETRI'] = new Array;
query['venditaBanco.html:PARAMETRI']['oggetti'] = new Array;
query['venditaBanco.html:PARAMETRI']['oggetti']['selezionaCassa'] = "id";
query['venditaBanco.html:PARAMETRI']['oggetti']['tipoCassa'] = "tipoCassa";
query['venditaBanco.html:PARAMETRI']['oggetti']['depositi'] = "depositi";
query['venditaBanco.html:PARAMETRI']['oggetti']['slcCausaleDoc'] = "slcCausaleDoc";
query['venditaBanco.html:PARAMETRI']['oggetti']['ipCassa'] = "ipCassa";
query['venditaBanco.html:PARAMETRI']['oggetti']['backendCassa'] = "backendCassa";
query['venditaBanco.html:PARAMETRI']['oggetti']['porta'] = "porta";
query['venditaBanco.html:PARAMETRI']['oggetti']['emettiSuonoCodiceErrato'] = 'emettiSuonoCodiceErrato';
query['venditaBanco.html:PARAMETRI']['oggetti']['parametriEsistenti'] = 'parametriEsistenti';
query['venditaBanco.html:PARAMETRI']['oggetti']['casseAmministratori'] = 'casseAmministratori';
query['venditaBanco.html:PARAMETRI']['oggetti']['upcaEan13'] = 'upcaEan13';
query['venditaBanco.html:PARAMETRI']['oggetti']['modificaDepositoRiga'] = 'modificaDepositoRiga';
query['venditaBanco.html:PARAMETRI']['oggetti']['modOffline'] = 'modOffline';
query['venditaBanco.html:PARAMETRI']['oggetti']['modSupermercato'] = 'modSupermercato';
query['venditaBanco.html:PARAMETRI']['oggetti']['matricolaCassa'] = 'matricolaCassa';


//ARRAY CREATA PER GESTIRE I CAMPI DELLA VENDITA A DETTAGLIO CON POPOLAZIONE DA FUNZIONE POPOLACAMPIBASEVEBA()
query['venditaBanco.html'] = new Array;
query['venditaBanco.html']['ricercaCodice'] = 'cercaCodiceVeBa(this)';
query['venditaBanco.html']['oggetti'] = new Array;
query['venditaBanco.html']['oggetti']['listaDocumentiVeBa'] = 'slcCausaleDoc';
query['venditaBanco.html']['oggetti']['listaPagamenti'] = '';
query['venditaBanco.html']['oggetti']['txtCodiceLotteria'] = '';
query['venditaBanco.html']['oggetti']['cmbClienti'] = '';
query['venditaBanco.html']['oggetti']['cmbAgente'] = '';

//OGGETTI RICHIESTA AMMINISTRATORE
query['venditaBanco.html']['oggettiAmministratore'] = new Array;
query['venditaBanco.html']['oggettiAmministratore']['btnAbbuono'] = "apriModalAb();apriFunzioni();";
query['venditaBanco.html']['oggettiAmministratore']['btnVari'] = "apriModalVarie();apriFunzioni();";


query['venditaBanco.html:RIGADOCUMENTO'] = new Array();
query['venditaBanco.html:RIGADOCUMENTO']['modelloRiga'] = rigaDocumentoVeBa;
query['venditaBanco.html:RIGADOCUMENTO']['oggetti'] = new Array;

query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{nrRiga}'] = 'riga';
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{quantità}'] = { campo: "qu", decimaliMax: 2, decimaliMin: 0 };;
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{codice}'] = 'codice';
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{prezzoUnitario}'] = { campo: "listino", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{importo}'] = { campo: "importo", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{piva}'] = { campo: "percIva", decimaliMax: 0, decimaliMin: 0 };
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{descrizione}'] = 'descrizione';
query['venditaBanco.html:RIGADOCUMENTO']['oggetti']['{coloreRiga}'] = 'coloreRiga';

query['venditaBanco.html:REPARTIIVA'] = new Array();
query['venditaBanco.html:REPARTIIVA']['modelloRiga'] = rigaRepartoIva;
query['venditaBanco.html:REPARTIIVA']['oggetti'] = new Array;
query['venditaBanco.html:REPARTIIVA']['oggetti']['{descrizione}'] = 'descrizione';
query['venditaBanco.html:REPARTIIVA']['oggetti']['{reparto}'] = 'reparto';
query['venditaBanco.html:REPARTIIVA']['oggetti']['{idIva}'] = 'idIva';

query['venditaBanco.html:RIGADOCUMENTOTMP'] = new Array();
query['venditaBanco.html:RIGADOCUMENTOTMP']['modelloRiga'] = rigaDocumentoTmp;
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti'] = new Array;

query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{riga}'] = 'riga';
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{quantità}'] = { campo: "qu", decimaliMax: 2, decimaliMin: 0 };;
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{codice}'] = 'codice';
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{listino}'] = { campo: "listino", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{importo}'] = { campo: "importo", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['venditaBanco.html:RIGADOCUMENTOTMP']['oggetti']['{descrizione}'] = 'descrizione';


var parametriNC = {

};

window.addEventListener("load", function (event) {
    setTimeout(function () {

        if (xOffLine == 'true') {
            res = localStorage.getItem("offLine." + nomePagina + ".parametri");
            elaboraParametri(res);

        } else {
            recuperaParametri();
        }
        caricaDocumento()
        if (!isEmpty(documento)) {
            for (var [k, v] of Object.entries(documento)) {
                identificativoDoc = k;

                break;
            }
        } else {
            creaDocumento();
        }

        // inizializzaDocumento();
        caricaScriptOffLine(()=>{
            apriDBOffLine(()=>{
                avviaCarDati("listaDocumentiVeBa");
                avviaCarDati("cmbAgente");
                avviaCarDati("codiciIva");
                avviaCarDati("articoliPredefinitiVeBa");
                avviaCarDati("depositi");
                avviaCarDati("listaPagamenti");
                avviaCarDati('registratoriCassa');
                
            });
            verificaDataUltimoAggiornamentoTabelle();
        });

        popolaVeBaDaDocumento();
        setTimeout(function () {
            focusCodiceArticolo();

        }, 500);
        
    }, 50);
});
document.getElementById("ricercaArticoloVenditaBanco").addEventListener("input", ()=>{
    ricercaCodiceListaVeBa(document.getElementById("ricercaArticoloVenditaBanco"));
});
function apriDBOffLine(callBack) {

    apriIndexedDB(nomeIndexedDB, callBack);
}

//funzioni per utilizzi vari


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

    decimaliPrezzi = parametriNC['decimaliPrezzi'];
    
}

function avviaCarDati(selectID) {
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
        case "listaDocumentiVeBa":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "documentiVendita",
                select: selectID,
                documentiVeBa:'1'
            };
            break;
        case "cmbClienti":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "listaClientiVeBa",
                select: selectID,
            };
            break;
        case "codiciIva":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "codiciIva",
                select: selectID,
            };
            break;
        case "articoliPredefinitiVeBa":
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "articoliPredefinitiVeBa",
                select: selectID,
            };
            break;
        case 'registratoriCassa':
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "registratoriCassa",
                select: selectID,
            };
            break;
        case 'depositi':
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "depositi",
                select: selectID,
            };
            break;
        case 'listaPagamenti':
            parametri = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "tesPagamenti",
                select: selectID,
            };
            break;
    }
    parametri.md5 = localStorage.getItem(selectID + ".md5");

    if (xOffLine == 'true') {
        res = { 'risposta': parametri.md5, 'parametri': parametri, 'error': '', 'md5': parametri.md5 };
        elaboraRisposta(JSON.stringify(res));
        return;
    }
    inviaRichiestaCentralino("query", parametri);
}
function apriImpostazioniPagina() {
    // if (xGruppoUtente != 'Amministratori' ) {
    //     return;
    // }
    show('modalParametri');
    document.getElementById('nav-toggle').checked = false;
}
function chiudiImpostazioniPagina() {
    hide('modalParametri');
}
function gestioneSelectTipoDocumento(operazione) {
    if (operazione == 'blocca') {
        document.getElementById('listaDocumentiVeBa').disabled = true;
    } else {
        document.getElementById('listaDocumentiVeBa').disabled = false;
    }
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
            if (risposte == risposteCarDatiParametri) {
                caricamentoForm(0);
            }
            if (parametri.select == 'registratoriCassa' && localStorage.getItem('listaParametriUtentiCassa.jSon') != undefined) {
                localStorage.removeItem('listaParametriUtentiCassa.jSon');
            }
            return "";
        }
    }
    // console.log(risp)
    data = verificaMd5(parametri.select, parametri, risp, data);
    switch (parametri.select) {
        case 'listaDocumentiVeBa':
        case 'cmbAgente':
        case 'depositi':
        case 'listaPagamenti':
        case 'codiciIva':
            popolaSelectDaJSON(data, parametri.select);
            break;
    }
    switch (parametri.select) {
        case 'listaDocumentiVeBa':
            popolaSelectDaJSON(data, 'slcCausaleDoc');
            parametriDoc = data;
            creaTipiDocumenti(data)
            break;
        case 'depositi':
            depositiArr = data;
            break;
        case 'codiciIva':
            creaCodiciIvaIndicizzati(data);
            break;
        case 'articoliPredefinitiVeBa':
            for (var a in data) {
                articoliPredefiniti[data[a]['CODICE']] = {
                    codice: data[a]['CODICE'],
                    descrizione: data[a]['DESCRIZIONE'],
                    piva: data[a]['PIVA'],
                    idiva: Number(data[a]['ID_IVA']),
                }
            }
            break;
        case 'registratoriCassa':
            localStorage.setItem('listaParametriUtentiCassa.jSon', JSON.stringify(data));
            break;
    }

    if (risposte >= risposteCarDatiParametri) {
        caricamentoForm(0);
        if (risposte == risposteCarDatiParametri) {
            if (localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != undefined && localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != '') {
                var impCassa = localStorage.getItem('cassaPredefinita.'+xIdConfigurazione);
                var input = document.getElementById('selezionaCassa');
                input.value = impCassa;
            }
        }
        caricaParametriCassa();
        
    }

}
function inserisciValore(input) {
    switch (input.value) {
        case 'cancel':
            var valTmp = document.getElementById(focusForm).value;
            document.getElementById(focusForm).value = valTmp.substring(0, valTmp.length - 1);
            break;
        default:
            if (input.value == ",") {
                var str = document.getElementById(focusForm).value;
                console.log(str)
                if (str.indexOf(".") == -1) {
                    console.log('dentro');
                    document.getElementById(focusForm).value = (document.getElementById(focusForm).value+'.' );
                }
            } else {
                if(document.getElementById(focusForm).value == "0.00"){
                    document.getElementById(focusForm).value='';
                }
                document.getElementById(focusForm).value = (document.getElementById(focusForm).value + ''+input.value);
            }
    }
    if(focusForm=='ricercaArticoloVenditaBanco'){
        ricercaCodiceListaVeBa(document.getElementById('ricercaArticoloVenditaBanco'));
        
    }else if(focusForm=='importoContanti' || focusForm=='importoPos' || focusForm=='importoAssegno' || focusForm=='importoCredito'){
        aggiornaResto();
    }
}
function clickBack() {
    if(xParametriCassa.modSupermercato==true){
        // location.href="login.html";
        document.getElementById('logOut').click();
        return;
    }
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="mainPage.html";
    }else{
        if (xTarget == "_blank") {
            window.close();
        } else {
            open("mainPage.html", xTarget);
        }
    }
    
}
function resetErrore(e) {
    e.setAttribute("style", "");
}
function cambiaFocusTastiera(input) {
    focusForm = input.id
}
function focusCodiceArticolo() {
    document.getElementById('ricercaArticoloVenditaBanco').focus();
}
function selezionaDaMenuScomparsa(e) {
    document.getElementById('ricercaArticoloVenditaBanco').value = e.getAttribute('codice');
    console.log(e.getAttribute('codice'));
    cercaCodiceVeBa(document.getElementById('ricercaArticoloVenditaBanco'));
}
function setQuantità() {
    var x = document.getElementById('ricercaArticoloVenditaBanco');
    quantità = x.value;
    document.getElementById('ricercaArticoloVenditaBanco').value = '';
    x.focus();
}
function creaCodiciIvaIndicizzati(data) {
    for (x in data) {
        codiciIva[data[x].id] = { 'id': data[x].id, 'descrizione': data[x].descrizione, 'piva': data[x].perc_iva };

    }
}
function creaTipiDocumenti(data) {
    parametriTipiDocumenti = {};
    for (x in data) {
        parametriTipiDocumenti[data[x].id] = {
            'id': data[x].id,
            'descrizione': data[x].descrizione,
            'genere': data[x].genere,
            'ftscontr': data[x].ftscontr,
            'gest_controparte': data[x].gest_controparte,
            'gestioneLotti': data[x].gestioneLotti,
            'ivaInc': data[x].ivaInc,
            'moduloStampa': data[x].moduloStampa
        };

    }
}
function ControllaParolaChiusura() {
    var txt = (document.getElementById('txtchiusura').value).toUpperCase();
    var combinazioneTemporanea=document.getElementById('combinazioneTemporanea').innerHTML;
    if (txt == combinazioneTemporanea) {
        
        if (xParametriCassa.modOffline == true) {
            caricaDocumentiSuServerDaIndex(document.getElementById('btnCaricaDocumenti'),(res)=>{
                richiamaModal('modalSm')
                datiRegCassa('chiusuraGiornaliera', true);
                apriFoglioCassa();
            });
        }else{
            richiamaModal('modalSm')
            datiRegCassa('chiusuraGiornaliera', true);
            apriFoglioCassa();
        }
    } else {
        document.getElementById('txtchiusura').classList.add('ricercaInvalida');
    }
}
function startFunzioniEnter() {
    var input = document.getElementById(focusForm);
    var fncEnter = input.getAttribute('fncEnter');
    eval(fncEnter);
}
function avviaRicercaLettoreBarcode(inputID) {
    var input = document.getElementById(inputID);
    ricerca = input.value;

    var fncEnter = input.getAttribute('fncEnter');
    eval(fncEnter)
}
function convertiNumeriPagamento(input) {
    if(input.value.indexOf(',')!=-1){
        input.value=input.value.replace(',','.');
    }
    if (input.value != '') {
        input.value = formattaNumeriInput(arrotonda(input.value, 2), 2, 2);
    } else {
        input.value = '0.00';
    }
}

function ricercaTabellaTimer(input, tbodyID) {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        ricercaSuTabella(input, tbodyID);
    }, 1000);
}
function ricercaSuTabella(input, tbodyID) {
    var input, filter, tr, tbody, i;
    filter = input.value.toUpperCase();
    //filter=inputID.toUpperCase();
    tbody = document.getElementById(tbodyID);
    tr = tbody.getElementsByTagName("li");
    for (i = 0; i < tr.length; i++) {
        if (tr[i].innerText.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
function setAttributeOnClick(select, idCampo, attributo) {
    var sel = select.getAttribute(attributo);
    var input = document.getElementById(idCampo);
    input.setAttribute(attributo, sel);
}
function apriModalVarie() {
    richiamaModal('modalSm', 'Inserisci varie');
}
function apriModalAb() {
    richiamaModal('modalSm', 'Inserisci abbuono');
}
function visualizzaInfoArticolo() {
    if (document.getElementById('informazioniArticolo').style.display == 'none') {
        var json = {};
        json.codiceArticolo = document.getElementById('codiceArticoloVeBaMod').value;
        json.deposito = recuperaDeposito();
        if (json.deposito == false) {
            return;
        }
        var obj = {
            tipoRisposta: "select",
            tipoQuery: "querySpecifica",
            nomeTabella: "infoArticolo",
            codiceArticolo: document.getElementById('codiceArticoloVeBaMod').value,
            deposito: recuperaDeposito()
        }
        inviaRichiestaCentralino("query", obj, function (dati) {
            var risp = JSON.parse(dati);

            document.getElementById('informazioniArticolo').style.display = 'block';
            document.getElementById('giacenzaArticoloRigaMod').innerText = arrotonda(risp.risposta[0].GIACENZA, 2);
            document.getElementById('umArticoloRigaMod').innerText = risp.risposta[0].UM;
            document.getElementById('disponibilitaArticoloRigaMod').innerText = arrotonda(risp.risposta[0].DISP, 2);
            document.getElementById('disponibilitaPresArticoloRigaMod').innerText = arrotonda(risp.risposta[0].DISPPRES, 2);
            document.getElementById('costoIcRigaMod').innerText = formattaNumeri(arrotonda(risp.risposta[0].COSTOSTDIC, 2), 2, 2);


        });
    } else {
        document.getElementById('informazioniArticolo').style.display = 'none';
    }
}
/************************************************************************************************************************/
/**********************************************SEZIONE PER PARAMETRI CASSA*****************************************************************/
/************************************************************************************************************************/

function caricaParametriCassa() {
    var input = document.getElementById('selezionaCassa');

    var cassaNonTrovata = true;
    if (localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != undefined && localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != '') {
        document.getElementById('chkImpCassa').checked = true;

    }

    parametriCasse = localStorage.getItem('listaParametriUtentiCassa.jSon');
    if (parametriCasse == undefined || parametriCasse == '' || parametriCasse == null) {
        return;
    }
    parametriCasse = JSON.parse(parametriCasse);
    for (var n in parametriCasse) {
        if (parametriCasse[n].UTENTE == input.value) {
            cassaNonTrovata = false;
            var parametriTmp = JSON.parse(parametriCasse[n].VALORE);

            try {
                for (var [k, v] of Object.entries(query['venditaBanco.html:PARAMETRI']['oggetti'])) {
                    if (document.getElementById(k).type == 'checkbox') {
                        document.getElementById(k).checked = parametriTmp[k];
                    }
                    else {
                        document.getElementById(k).value = parametriTmp[k];
                    }
                }

            } catch (e) {
                error.error(e);
            }

            document.getElementById('txtgruppoUtente').value = xGruppoUtente;
            if (parametriTmp.codiciRapidi != undefined) {

                codiciRapidi = parametriTmp.codiciRapidi;
                popolaCodiciRapidi();
            }
            if (parametriTmp.reparti != undefined && parametriTmp.reparti != '') {
                repartoIdIva = parametriTmp.reparti;
                popolaRepartiIva();
            }
            break;
        }
    }

    if (cassaNonTrovata == true) {
        apriImpostazioniPagina();
        return;
    }
    xParametriCassa = parametriTmp;
    popolaCampiBaseVeBa();


    if (xIdAgente != '' && xIdAgente > 0) {
        document.getElementById('divCambioDocumento').style.display = 'none';
        document.getElementById('cmbAgente').value = xIdAgente;
        document.getElementById('cmbAgente').disabled = true;
    }


    if (xParametriCassa['modOffline'] == true) {
        document.getElementById('btnAggiornaOffline').parentNode.classList.remove('hide');
        document.getElementById('btnCaricaDocumenti').parentNode.classList.remove('hide');
        var inputRicercaArticolo = document.getElementById('ricercaArticoloVenditaBanco');
        inputRicercaArticolo.setAttribute('filtro', '');//impostato così per evitare che filtrasse i codici aggiuntivi
        inputRicercaArticolo.setAttribute('timer', 0);
        localStorage.setItem("visualizzaOffLine", true);
        localStorage.setItem("offlineVenditaBanco", true); 
        var liDownloadTabelle=document.getElementById('aggiornaTabelleOfflineVeBa')
        if(liDownloadTabelle.classList.contains('hide')==true){
            liDownloadTabelle.classList.remove('hide');
        }
        if(xOffLine==false){
            var lista = 'clienti,parametri,codiciAggiuntivi,articoli';
            var input=document.getElementById('btnAggiornaOffline');
            input.disabled = true;
            input.classList.add('button--loading');
            var tmp=input.innerHTML;
            input.innerHTML='';
            aggiornaTabelleOffline(lista,true,()=>{
                    input.disabled = false;
                    input.classList.remove('button--loading');
                    input.innerHTML=tmp;
                })
        }      
        
            
        setInterval(function () {
            caricaDocumentiSuServerDaIndex(document.getElementById('btnCaricaDocumenti'));
        }, 600000)

    } else {
        if (document.getElementById('btnAggiornaOffline').parentNode.classList.contains('hide') == false) {
            document.getElementById('btnAggiornaOffline').parentNode.classList.add('hide');
        }
        if (document.getElementById('btnCaricaDocumenti').parentNode.classList.contains('hide') == false) {
            document.getElementById('btnCaricaDocumenti').parentNode.classList.add('hide');
        }
        var inputRicercaArticolo = document.getElementById('ricercaArticoloVenditaBanco');
        if (inputRicercaArticolo.getAttribute('filtro') == '') {
            inputRicercaArticolo.setAttribute('filtro', "DESCRIZIONE_' '_A.CODICE");
            inputRicercaArticolo.setAttribute('timer', 0);
        }
        localStorage.setItem("offlineVenditaBanco", false);
        var liDownloadTabelle=document.getElementById('aggiornaTabelleOfflineVeBa')
        if(liDownloadTabelle.classList.contains('hide')==false){
            liDownloadTabelle.classList.add('hide');
        }
    }
    if (xParametriCassa.modSupermercato == true) {
        document.getElementById('cmbAgente').disabled=true;
        document.getElementById('logoIntestazione').setAttribute('onclick',"location.href='venditaBanco.html'");
        document.getElementById('gestAccount').classList.add('hide');
        localStorage.setItem("modSupermercato."+xIdConfigurazione, true);
        document.getElementById('divBtnIvaInclusa').classList.add('hide');
        if(xGruppoUtente!='Amministratori'){
            document.getElementById('btnInvioRegCassa').disabled=true;
        }
        
    }else{
        document.getElementById('logoIntestazione').setAttribute('onclick',"location.href='index.html'");
        document.getElementById('gestAccount').classList.remove('hide');
        document.getElementById('cmbAgente').disabled=false;
        document.getElementById('divBtnIvaInclusa').classList.remove('hide');
        if (localStorage.getItem("modSupermercato."+xIdConfigurazione) != undefined && localStorage.getItem("modSupermercato."+xIdConfigurazione) != '') {
            localStorage.removeItem("modSupermercato."+xIdConfigurazione);
        }
        document.getElementById('btnInvioRegCassa').disabled=false;
    }
    
    if (xParametriCassa.casseAmministratori == true) {
        for (var [k, v] of Object.entries(query['venditaBanco.html']['oggettiAmministratore'])) {
            var obj = document.getElementById(k);
            obj.setAttribute('onclick', "richiestaAmministratore('" + v + "')");
        }
    } else {
        for (var [k, v] of Object.entries(query['venditaBanco.html']['oggettiAmministratore'])) {
            var obj = document.getElementById(k);
            obj.setAttribute('onclick', v);
        }
    }

 
}

function salvaParametriCassa() {
    if (recuperaValueElemento('selezionaCassa') != '') {
        var parametriCassa = {};
        if (document.getElementById('chkImpCassa').checked) {
            localStorage.setItem('cassaPredefinita.'+xIdConfigurazione, document.getElementById('selezionaCassa').value);

        } else {
            if (localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != undefined && localStorage.getItem('cassaPredefinita.'+xIdConfigurazione) != '') {
                localStorage.removeItem('cassaPredefinita.'+xIdConfigurazione);
            }

        }

        var jSon = {};
        for (var [k, v] of Object.entries(query['venditaBanco.html:PARAMETRI']['oggetti'])) {
            var input = document.getElementById(k);
            if (input.type == 'checkbox') {
                parametriCassa[k] = input.checked;
            } else {
                parametriCassa[k] = input.value;
            }
        }
        jSon.UTENTE = document.getElementById('selezionaCassa').value;

        parametriCassa.reparti = repartoIdIva;
        parametriCassa.codiciRapidi = codiciRapidi;
        jSon.PARAMETRO = 'parametriCassa'
        jSon.VALORE = JSON.stringify(parametriCassa);

        var parametri = {
            tipoRisposta: 'salva',
            tipoSalva: "parametriCasse",
            dati: jSon
        };

        inviaRichiestaCentralino('salva', parametri, function (dati) {
            var risp = JSON.parse(dati);
            if (!risp.risposta) {
                attivaAlert(2, dati.error, 'Errore modifica Reparti Db');
                return;
            }
            avviaCarDati('registratoriCassa');
            // caricaParametriCassa();
        });

    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'DESCRIZIONE CASSA VUOTA, IMPOSSIBILE SALVARE!');
    }
}

function aggiungiCodiceRapidoaLista() {
    var descrizione = document.getElementById('addDescrizioneArticoloRapido');
    var codice = document.getElementById('addCodiceArticoloRapido');
    aggiungiCodiceRapidoArray(codice.value, descrizione.value);
    descrizione.value = '';
    codice.value = '';
}
function aggiungiCodiceRapidoArray(codice, descrizione) {
    indiceVuoto = '';
    for (var c in codiciRapidi) {
        if (codiciRapidi[c].codice == '' && codiciRapidi[c].descrizione == '') {
            indiceVuoto = [c];
            break;
        }
    }
    if (indiceVuoto != '') {
        codiciRapidi[indiceVuoto].codice = codice;
        codiciRapidi[indiceVuoto].descrizione = descrizione;
    } else if (codiciRapidi.length < 10) {
        codiciRapidi.push({
            codice: codice,
            descrizione: descrizione,
            indice: codiciRapidi.length
        })
    }
    localStorage.setItem('codiciRapidi', JSON.stringify(codiciRapidi));
    popolaCodiciRapidi();
}
function popolaCodiciRapidi() {
    try {
        document.getElementById('listaPulsantiRapidi').innerHTML = '';
        document.getElementById('listaPulsantiFunzioni').innerHTML = '';
        var li = `<li>
            <div class="w10 row">Numero</div>
            <div class="w40 row" style="text-align:center">Codice</div>
            <div class="w45 row">Descrizione</div>
          </li>`;
        for (var i in codiciRapidi) {
            if (codiciRapidi[i].codice != '' && codiciRapidi[i].descrizione != '') {
                li += `<li>
  <div class="w10 row">${codiciRapidi[i].indice + 1}</div>
  <div class="w40 row" style="text-align:center">${codiciRapidi[i].codice}</div>
  <div class="w45 row">${codiciRapidi[i].descrizione}</div>
  <div class="w5 row" onclick="eliminaCodiceRapido(${[i]})">x</div>
</li>`
                var button = `
  <div class="row divTastieraFunzioni">
    <button value="${codiciRapidi[i].codice}" class="pulsanteTastieraImg pulsanteVeBa" onclick="inserisciValore(this);startFunzioniEnter();">
      <div style="font-size:30px">${codiciRapidi[i].indice + 1}</div>
      <div class="testoTroncato">${codiciRapidi[i].descrizione}</div>
    </button>
  </div>`

                document.getElementById('listaPulsantiFunzioni').innerHTML += button
            }

        }
        document.getElementById('listaPulsantiRapidi').innerHTML += li
    } catch (e) {
        console.error(e);
        attivaAlert(2, e, 'popola codici rapidi');
    }
}
function eliminaCodiceRapido(indice) {
    codiciRapidi[indice].codice = '';
    codiciRapidi[indice].descrizione = '';
    popolaCodiciRapidi();
    modificaCodiciRapidiDB();
}

//GESTIONE REPARTI SU IMPOSTAZIONI
function associaRepartoIva() {
    numeroReparto = document.getElementById('repartoCassa').value
    idIva = document.getElementById('codiciIva').value;
    if (repartoIdIva[idIva] == undefined) {
        repartoIdIva[idIva] = { 'reparto': numeroReparto, 'idIva': idIva, 'descrizione': codiciIva[idIva].descrizione };
        popolaRepartiIva();
        document.getElementById('codiciIva').value = '';
        document.getElementById('repartoCassa').value = '';
    } else {
        attivaAlert(2, 'Reparto già associato');
    }
}
function eliminaReparto(idIva) {
    delete repartoIdIva[idIva];
    popolaRepartiIva();
}
function popolaRepartiIva() {
    try {
        popolaElencoDaJson(repartoIdIva, 'listaReparti', 0, 'venditaBanco.html:REPARTIIVA', true, 0);
    } catch (e) {
        console.error(e);
        attivaAlert(2, e, 'popola reparti');
    }
}
/************************************************************************************************************************/
/**********************************************FUNZIONI VARIE VEBA********************************************************/
/************************************************************************************************************************/
function popolaCampiBaseVeBa() {
    // try {
    for (var [k, v] of Object.entries(query['venditaBanco.html']['oggetti'])) {
        if (xParametriCassa[v] != undefined) {
            document.getElementById(k).value = xParametriCassa[v];
        }
    }
    var doc = verificaTipoDocumento();
    if (doc.gestIncasso && document.getElementById('selezionaCassa').value != '') {
        invioCassa(document.getElementById('btnInvioRegCassa'), true);
    }



}

function verificaTipoDocumento(abilitaErrori = false, cambiaValoriVeBa = false) {
    var datiDoc = {};
    var n = document.getElementById('listaDocumentiVeBa').value;
    datiDoc.idTipo = n;
    
    if (n != 0) {
        if (n == parametriTipiDocumenti[n].id) {
            datiDoc.genere = parametriTipiDocumenti[n].genere;
            //GESTIONE SCONTRINO O NO
            if (parametriTipiDocumenti[n].ftscontr == 1 || parametriTipiDocumenti[n].genere == '11' || xParametriCassa.modSupermercato == true) {
                datiDoc.gestIncasso = true;
                
                if(parametriTipiDocumenti[n].genere == 0){
                    show('divListaPagamenti');
                    if(localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione) != undefined){
                        if(cambiaValoriVeBa==true){
                            document.getElementById('listaPagamenti').value =localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione)
                        }
                    }
                    document.getElementById('divRicercaCliente').classList.remove('hide');
                    hide('divtxtCodiceLotteria');
                }else{
                    hide('divListaPagamenti');
                    document.getElementById('listaPagamenti').value='';
                    document.getElementById('divRicercaCliente').classList.add('hide');
                    show('divtxtCodiceLotteria');
                }
                
                if (cambiaValoriVeBa) {
                    invioCassa(document.getElementById('btnInvioRegCassa'), true);
                }
            
                
            } else {
                datiDoc.gestIncasso = false;
                show('divListaPagamenti');
                if(localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione) != undefined){
                    document.getElementById('listaPagamenti').value =localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione)
                }
                hide('divtxtCodiceLotteria');
                if (cambiaValoriVeBa) {
                    invioCassa(document.getElementById('btnInvioRegCassa'), false, false);
                }
            }
            
            if (parametriTipiDocumenti[n].gest_controparte == 1) {
                show('divRicercaCliente');
                if ((document.getElementById('cmbClienti').getAttribute('idragionesociale') == undefined || document.getElementById('cmbClienti').getAttribute('idragionesociale') == '') && abilitaErrori == true) {
                    attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Selezionare un cliente valido');
                    return false;
                }
            }else{
                hide('divRicercaCliente');
            }

            if (parametriTipiDocumenti[n].moduloStampa != '') {
                datiDoc.stampaDoc = true;
            } else {
                datiDoc.stampaDoc = false;
            }
            datiDoc.deposito = parametriTipiDocumenti[n].depositoT;

            //RIGHE IVA INC O NO
            
            if (parametriTipiDocumenti[n].ivaInc == 1) {
                datiDoc.ivaInc = 1;
                documentoIvaInclusa = true;
                if(cambiaValoriVeBa==true){
                    movimentiIvaInclusa(true)
                    popolaVeBaDaDocumento();
                }
                
                document.getElementById('btnIvaInclusa').classList.add('pulsanteVeBaAttivo');
            } else {
                datiDoc.ivaInc = 0;
                documentoIvaInclusa = false;
                if(cambiaValoriVeBa==true){
                    movimentiIvaInclusa(false);
                    popolaVeBaDaDocumento();
                }
                
                document.getElementById('btnIvaInclusa').classList.remove('pulsanteVeBaAttivo');
            }

            if (parametriTipiDocumenti[n].gestioneLotti == 1) {
                datiDoc.gestioneLotti = true;
            } else {
                datiDoc.gestioneLotti = false;
            }

        }
    }
    return datiDoc;
}

function apriCalcolatrice() {
    if (document.getElementById('tastierinoNumerico').classList.contains('hideTastiera') == true) {
        document.getElementById('tastierinoNumerico').classList.remove('hideTastiera');
        if (document.getElementById('tastierinoFunzioni').classList.contains('hideTastieraFunzioni') == false) {
            document.getElementById('tastierinoFunzioni').classList.add('hideTastieraFunzioni');
        }
    } else {

        document.getElementById('tastierinoNumerico').classList.add('hideTastiera');
    }
}
function apriFunzioni() {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (vw < 480) {
        if (document.getElementById('tastierinoFunzioni').classList.contains('hideTastieraFunzioni') == true) {
            document.getElementById('tastierinoFunzioni').classList.remove('hideTastieraFunzioni')
            if (document.getElementById('tastierinoNumerico').classList.contains('hideTastiera') == false) {
                document.getElementById('tastierinoNumerico').classList.add('hideTastiera');

            }
        } else {
            document.getElementById('tastierinoFunzioni').classList.add('hideTastieraFunzioni')
        }
    }
}

function richiamaModal(idModal, nomeModal, var1 = '') {

    var modal = document.getElementById(idModal);
    var intestazioneModal = document.getElementById(idModal + 'intestazioneModal');
    var modalCorpo = document.getElementById(idModal + 'corpoModal')
    intestazioneModal.text = nomeModal

    document.getElementById(idModal + 'corpoModal').innerHTML = '';
    switch (nomeModal) {
        case "Ricerca Prezzo":
            var modalCorpoContent = `
      <div>
      <div id="divricercaPrezzoVeBa" name="divricercaPrezzoVeBa"
          class="has-float-label w100 marg5Top">
          <input 
            id="ricercaPrezzoVeBa" 
            name="ricercaPrezzoVeBa" 
            type="text"
            placeholder="Ricerca Prodotto.." 
            onfocus="cambiaFocusTastiera(this)"
            onkeydown="if (event.keyCode == 9 || event.keyCode==13){cercaCodiceVeBa(this)}"
            fncenter="cercaCodiceVeBa(document.getElementById('ricercaPrezzoVeBa'))"
            >
          <span 
          class="deleteicon"
          onclick="var input = getElementById('ricercaPrezzoVeBa'); input.value = ''; input.focus(); " ></span>
          <label id="lblRicerca" for="ricercaPrezzoVeBa">Ricerca Prodotto..</label>
        </div>
        <div id="resultRicercaPrezzoVeBa"></div>
      </div>
      `
            var functionInserimento = `cercaCodiceVeBa(document.getElementById('ricercaPrezzoVeBa'))`;
            var idFocus = 'ricercaPrezzoVeBa';
            var nomePulsanteConferma = 'Inserisci';
            break;
        case "Inserisci varie":
            var listaIva = '';
            for (var i in codiciIva) {
                if (codiciIva[i].id == articoliPredefiniti.VARI.idiva) {
                    listaIva += '<option value="' + codiciIva[i].id + '" selected="selected" >' + codiciIva[i].descrizione + '</option>';
                } else {
                    listaIva += '<option value="' + codiciIva[i].id + '">' + codiciIva[i].descrizione + '</option>';
                }

            }
            var modalCorpoContent = `
      <div id="divInserimentoVarieVeBa" name="divInserimentoVarieVeBa"
          class="row has-float-label w100 marg5Top">
          <input id="importoVarie" name="importoVarie" type="text"
            placeholder="Inserisci importo.." onfocus="cambiaFocusTastiera(this)">
          <span class="deleteicon"
            onclick="var input = getElementById('importoVarie'); input.value = ''; input.focus(); "></span>
          <label id="lblVerie" for="importoVarie">Inserisci importo..</label>
        </div>
        <div class="w100 rowDx">
            <div class="centraElemento w100">
              <div id="divSelezionaIVaVarie" name="divAgente" class="row has-float-label w100">
                <span class="selectDefault" id="0">Seleziona IVA</span>
                <label for="ivaInserimentoVarie">Seleziona IVA</label>
                <select id="ivaInserimentoVarie" name="ivaInserimentoVarie" class="selectBox">
                ${listaIva}
                </select>
              </div>
            </div>
          </div>
      `
            var functionInserimento = `inserimentoProdotti('importoVarie','VARI','ivaInserimentoVarie')`;
            var idFocus = 'importoVarie';
            var nomePulsanteConferma = 'Inserisci';
            break;
        case "Inserisci abbuono":
            var listaIva = '';
            for (var i in codiciIva) {
                if (codiciIva[i].id == articoliPredefiniti.AB.idiva) {
                    listaIva += '<option value="' + codiciIva[i].id + '" selected="selected" >' + codiciIva[i].descrizione + '</option>';
                } else {
                    listaIva += '<option value="' + codiciIva[i].id + '" >' + codiciIva[i].descrizione + '</option>';
                }

            }
            var modalCorpoContent = `
      <div id="divInserimentoAbbuonoVeBa" 
          class="row has-float-label w100 marg5Top">
          <input id="importoAbbuono" 
                name="importoAbbuono" 
                type="text"
                onkeypress="validateInput(event)"
                placeholder="Inserisci abbuono.." 
                onfocus="cambiaFocusTastiera(this)"
                >
          <span class="deleteicon"
            onclick="var input = getElementById('importoAbbuono'); input.value = ''; input.focus(); "></span>
          <label id="lblVerie" for="importoAbbuono">Inserisci importo..</label>
        </div>
        <div class="w100 rowDx">
            <div class="centraElemento w100 hide">
              <div id="divSelezionaIVaVarie " name="divAgente" class="row has-float-label w100">
                <span class="selectDefault" id="0">Seleziona IVA</span>
                <label for="ivaInserimentoAbbuono">Seleziona IVA</label>
                <select id="ivaInserimentoAbbuono" name="ivaInserimentoAbbuono" class="selectBox">
                ${listaIva}
                </select>
              </div>
            </div>
          </div>
      `
            // var functionInserimento = `inserimentoProdotti('importoAbbuono','AB','ivaInserimentoAbbuono')`;
            var functionInserimento = `generaRigheAbbuono(document.getElementById('importoAbbuono').value);richiamaModal('modalSm')`;
            var idFocus = 'importoAbbuono';
            var nomePulsanteConferma = 'Inserisci';
            break;
        case "Annulla scontrino":
            var modalCorpoContent = `
      <div>
      <div class="row has-float-label w50 marg5Top">
          <input id="txtNumeroScontrino" name="txtNumeroScontrino" type="text"
            placeholder="Inserisci dati scontrino.." onfocus="cambiaFocusTastiera(this)" onfocusout="richiamaScontrino(this)">
          <span class="deleteicon"
            onclick="var input = getElementById('txtNumeroScontrino'); input.value = ''; input.focus(); "></span>
          <label id="lblVerie" for="txtNumeroScontrino">Ndoc Nchiusura ggmmaa..</label>
        </div>
        
        <br>
        </div>
      `
            var functionInserimento = `annullaScontrino('txtNumeroScontrino')`;
            var idFocus = 'txtNumeroScontrino';
            var nomePulsanteConferma = 'Conferma';
            break;
        case "Ristampa scontrino":
            var modalCorpoContent = `
      <div>
      <div 
          class="row has-float-label w100 marg5Top">
          <input id="txtNumeroScontrino" name="txtNumeroScontrino" type="text"
            placeholder="Inserisci numero scontrino.." onfocus="cambiaFocusTastiera(this)">
          <span class="deleteicon"
            onclick="var input = getElementById('txtNumeroScontrino'); input.value = ''; input.focus(); "></span>
          <label id="lblVerie" for="txtNumeroScontrino">Inserisci numero scontrino..</label>
        </div>
        <br>
        <div 
          class="row has-float-label w100 marg5Top">
          <input id="txtDataScontrino" name="txtDataScontrino" type="text"
            placeholder="Inserisci data scontrino.." onfocus="cambiaFocusTastiera(this)">
          <span class="deleteicon"
            onclick="var input = getElementById('txtNumeroScontrino'); input.value = ''; input.focus(); "></span>
          <label id="lblVerie" for="txtDataScontrino">Inserisci data scontrino..</label>
        </div>
        <br>
        </div>
      `
            var functionInserimento = `ristampaScontrino('txtNumeroScontrino','txtDataScontrino')`;
            var idFocus = 'txtNumeroScontrino';
            var nomePulsanteConferma = 'Conferma';
            break;
        case "Pulisci schermata":
            var modalCorpoContent = `
      <div class="w100 h80p" style="font-size:24px; text-align:left; margin-top:10px;">
      Sei Sicuro di voler pulire la schermata? <br>
      <b>Tutti i campi e le righe verranno svuotate </b>
      </div>
      `
            var functionInserimento = `pulisciSchermataVeBa();richiamaModal('modalSm');`;
            var idFocus = '';
            var nomePulsanteConferma = 'Conferma';
            break;
        case "Pagamento":
            var totale = formattaNumeriInput(arrotonda(documento[identificativoDoc].totali.tDoc, 2), 2, 2);
            var modalCorpoContent = `
      <div>
      <div class="w100 h50p">
      <div id="divPagamentoVeBa" name="divPagamentoVeBa"
          class="row has-float-label w80 marg5Top h50p">
          <input id="importoContanti" name="importoContanti" type="text"
            placeholder="Inserisci contanti.." 
            onfocus="cambiaFocusTastiera(this)" 
            value="0" 
            onfocusin="if(this.value=='' || this.value==0)this.value=''" 
            onfocusout="convertiNumeriPagamento(this);aggiornaResto();" 
            onchange="convertiNumeriPagamento(this);aggiornaResto();"
            fncEnter="aggiornaResto()"
            onkeypress="validateInput(event)"
            >
          <span class="deleteicon"
            onclick="var input = getElementById('importoContanti'); input.value = ''; input.focus(); "></span>
          <label id="lblimportoContanti" for="importoContanti">Inserisci importo contanti..</label>
        </div>
        <div class="rowDx w20 h100 marg2Top">
          <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="gestBtnPagamento('importoContanti')">
          <img src="img/verde/cash.svg" style="height: 80%;">
          </button>
        </div>
        </div>
        <div class="w100 h50p marg10Top">
            <div id="divPagamentoVeBa" name="divPagamentoVeBa"
            class="row has-float-label w80 marg5Top h50p">
            <input id="importoPos" name="importoPos" type="text"
                placeholder="Inserisci pos.." 
                onfocus="cambiaFocusTastiera(this)" 
                value="0" 
                onfocusin="if(this.value=='' || this.value==0)this.value=''" 
                onfocusout="convertiNumeriPagamento(this)" 
                onchange="aggiornaResto()"
                fncEnter="aggiornaResto()"
                onkeypress="validateInput(event)"
                >
            <span class="deleteicon"
                onclick="var input = getElementById('importoPos'); input.value = ''; input.focus(); "></span>
            <label id="lblimportoPos" for="importoPos">Inserisci importo pos..</label>
            </div>
            <div class="rowDx w20 h100 marg2Top">
            <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="gestBtnPagamento('importoPos')">
            <img src="img/verde/wallet.svg" style="height: 80%;">
            </button>
            </div>
        </div>
        <div class="w100 h50p marg10Top">
            <div id="divPagamentoBuonoVeBa" name="divPagamentoBuonoVeBa"
            class="row has-float-label w80 marg5Top h50p">
            <input id="importoBuono" name="importoBuono" type="text"
                placeholder="Importo buono" 
                onfocus="cambiaFocusTastiera(this)" 
                value="${Number(document.getElementById('importoBuonoDaReso').innerHTML.replace(',','.'))}" 
                onfocusin="if(this.value=='' || this.value==0)this.value=''" 
                onfocusout="convertiNumeriPagamento(this)" 
                onchange="aggiornaResto()"
                fncEnter="aggiornaResto()"
                disabled
                >
            <span class="deleteicon"
                onclick="var input = getElementById('importoBuono'); input.value = ''; input.focus(); "></span>
            <label id="lblimportoBuono" for="importoBuono">Inserisci importo buono..</label>
            </div>
            <div class="rowDx w20 h100 marg2Top">
            <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="gestBtnPagamento('importoBuono')">
            <img src="img/verde/wallet.svg" style="height: 80%;">
            </button>
            </div>
        </div>
        <div class="w100 h50p marg10Top ${xParametriCassa.modSupermercato==true ? 'hide':''}" >
        <div id="divPagamentoVeBa" name="divPagamentoVeBa"
          class="row has-float-label w80 marg5Top h50p">
          <input id="importoAssegno" name="importoAssegno" type="text"
            placeholder="Inserisci assegno.."
            onfocus="cambiaFocusTastiera(this)"
            value="0.00" 
            onfocusin="if(this.value=='' || this.value==0)this.value=''" 
            onfocusout="convertiNumeriPagamento(this)" 
            onchange="aggiornaResto()"
            fncEnter="aggiornaResto()"
            onkeypress="validateInput(event)"
            >
          <span class="deleteicon"
            onclick="var input = getElementById('importoAssegno'); input.value = ''; input.focus(); "></span>
          <label id="lblimportoAssegno" for="importoAssegno">Inserisci importo assegno..</label>
        </div>
        <div class="rowDx w20 h100 marg2Top">
          <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="gestBtnPagamento('importoAssegno')">
          <img src="img/verde/assegno.svg" style="height: 80%;">
          </button>
        </div>
        </div>
        <div class="w100 h50p marg10Top ${xParametriCassa.modSupermercato==true ? 'hide':''}">
        <div id="divPagamentoVeBa" name="divPagamentoVeBa"
          class="row has-float-label w80 marg5Top h50p">
          <input id="importoCredito" name="importoCredito" type="text"
            placeholder="Inserisci credito.."
            onfocus="cambiaFocusTastiera(this)"
            value="0.00" 
            onfocusin="if(this.value=='' || this.value==0)this.value=''" 
            onfocusout="convertiNumeriPagamento(this)" 
            onchange="aggiornaResto()"
            fncEnter="aggiornaResto()"
            onkeypress="validateInput(event)"
            >
          <span class="deleteicon"
            onclick="var input = getElementById('importoCredito'); input.value = ''; input.focus(); "></span>
          <label id="lblimportoCredito" for="importoCredito">Inserisci importo credito..</label>
        </div>
        <div class="rowDx w20 h100 marg2Top">
          <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="gestBtnPagamento('importoCredito')">
          <img src="img/verde/credito.svg" style="height: 80%;">
          </button>
        </div>
        </div>
        <div class="row w100">
            <div class="w100 h100 h50p marg10Top">
                <div class="row centraVerticalemnte h100 cx" style="width:33%;">
                    <img src="img/banconote/200.png" class="h100" onclick="aggiungiEuro('200')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:33%">
                    <img src="img/banconote/100.jpg" class="h100" onclick="aggiungiEuro('100')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:33%">
                    <img src="img/banconote/50.jpg" class="h100" onclick="aggiungiEuro('50')">
                </div>
            </div>
            <div class="w100 h100 h50p marg20Top">
                <div class="row centraVerticalemnte h100 cx" style="width:33%">
                    <img src="img/banconote/20.jpeg" class="h100" onclick="aggiungiEuro('20')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:33%">
                    <img src="img/banconote/10.jpg" class="h100" onclick="aggiungiEuro('10')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:33%">
                    <img src="img/banconote/5.jpg" class="h100" onclick="aggiungiEuro('5')">
                </div>
            </div>
        </div>
        <br>
        <div class="row w100 ">
            <div class="w100 h100 h50p marg20Top">
                <div class="row centraVerticalemnte h100 cx" style="width:25%;">
                    <img src="img/banconote/2.png" class="h100" onclick="aggiungiEuro('2')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/1.png" class="h100" onclick="aggiungiEuro('1')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/050.png" class="h100" onclick="aggiungiEuro('0.50')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/020.png" class="h100" onclick="aggiungiEuro('0.20')">
                </div>
            </div>
            <div class="w100 h100 h50p marg20Top">
                
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/010.png" class="h100" onclick="aggiungiEuro('0.10')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/005.png" class="h100" onclick="aggiungiEuro('0.05')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/002.png" class="h100" onclick="aggiungiEuro('0.02')">
                </div>
                <div class="row centraVerticalemnte h100 cx" style="width:25%">
                    <img src="img/banconote/001.png" class="h100" onclick="aggiungiEuro('0.01')">
                </div>
            </div>
        </div>
        <div style="position:absolute; bottom:60px; height:40px; color:white;" class="w95">
        <div class="w70 row" style="position:relative; top:10%; font-size:24px; text-align:right;">Totale Resto : €</div>
        <div class="w30 row" style="position:relative; top:10%; font-size:24px; text-align:center;" id="totaleResto"></div>
        </div>
        </div>
      `
            var functionInserimento = `salvaDocumentoVeBa();gestioneSelectTipoDocumento()`;
            var idFocus = '';
            var nomePulsanteConferma = 'Conferma';

            break;
        case "Modifica Riga":

            var indiceRiga = var1;
            var datiDoc = verificaTipoDocumento(false, false);
            if (documento[identificativoDoc].prodotti.data[indiceRiga].gestioneLotti == true && datiDoc.gestioneLotti == true) {
                var rigaQuantità = 'hide';
                var rigaLotti = '';
            } else {
                var rigaQuantità = ``;
                var rigaLotti = 'hide'
            }
            var sconti = (documento[identificativoDoc].prodotti.data[indiceRiga].sconti).split('+');
            if (xParametriCassa.modificaDepositoRiga != undefined && xParametriCassa.modificaDepositoRiga == true) {
                var liDepositi = '';
                for (var x in depositiArr) {
                    liDepositi += `<option value="${depositiArr[x].id}" ${documento[identificativoDoc].prodotti.data[indiceRiga].deposito == depositiArr[x].id ? 'selected' : ''}>${depositiArr[x].descrizione}</option>`
                }
                var hideDepositi = "";
            } else {
                var liDepositi = '';
                var hideDepositi = "hide";
            }

            if (xParametriCassa.modSupermercato == true) {

            }
            var modalCorpoContent = `
    <div id="divModificaDatiRiga">
    <div style="overflow-y:auto;" class="corpoModalModificaRiga"> 
      <div class="w100 h50p">
        <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
          <input id="codiceArticoloVeBaMod" name="codiceArticoloVeBaMod" type="text" placeholder="Codice articolo"
            onfocus="cambiaFocusTastiera(this)" value="${documento[identificativoDoc].prodotti.data[indiceRiga].codice}" disabled>
    
          <label id="lblcodiceArticoloVeBaMod" for="codiceArticoloVeBaMod">Codice Articolo</label>
        </div>
    
      </div>
    
      <div class="w100 h50p">
        <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h80p">
          <textarea id="descrizioneArticoloVeBaMod" name="descrizioneArticoloVeBaMod" type="text" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''}
            placeholder="Descrizione articolo" onfocus="cambiaFocusTastiera(this)"
            style="height:100%;padding-right:20px;overflow-y:hidden;">${documento[identificativoDoc].prodotti.data[indiceRiga].descrizione}</textarea>
          <label id="lbldescrizioneArticoloVeBaMod" for="descrizioneArticoloVeBaMod">Descrizione Articolo</label>
        </div>
    
      </div>
      <br>
    
      <div class="w100 h50p">
        <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
          <input id="prezzoUnitarioVeBaMod" name="prezzoUnitarioVeBaMod" type="text" class="cx"
            placeholder="Prezzo unitario" onfocus="cambiaFocusTastiera(this)" onkeypress="validateInput(event)"
            value="${(documentoIvaInclusa ? formattaNumeriInput(arrotonda(documento[identificativoDoc].prodotti.data[indiceRiga].listino, 2), 2, 2) : formattaNumeriInput(arrotonda(documento[identificativoDoc].prodotti.data[indiceRiga].listino, 2), decimaliPrezzi, 2))}"
            onchange="aggiornaImportoRiga()" ${(xParametriCassa.modSupermercato == true && documento[identificativoDoc].prodotti.data[indiceRiga].qu>0) ? 'disabled' : ''}>

          <label id="lblprezzoUnitarioVeBaMod" for="prezzoUnitarioVeBaMod">Prezzo unitario</label>
        </div>
    
      </div>
      <br>

      
      <div class="w100 h50p ${rigaQuantità}" >
        <div class="w25 h100 row">
          <button style="display: block; margin: 0 auto;height:100%;" class="pulsanteVeba" onclick="diminuisciQuantità()">
            <img src="img/bianche/minus.svg" style="height:30px;width:30px;">
          </button>
        </div>
        <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w50 marg5Top h50p">
          <input id="quantitàVeBaMod" name="quantitàVeBaMod" type="number" inputmode="decimal" class="cx"
            placeholder="Quantità" onfocus="cambiaFocusTastiera(this)" value="${documento[identificativoDoc].prodotti.data[indiceRiga].qu}"
            style="text-align:center"
            onfocusout="if(this.value!='') {aggiornaImportoRiga()}">
          <span class="deleteicon"
            onclick="var input = getElementById('quantitàVeBaMod'); input.value = ''; input.focus(); "></span>
          <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">Quantità</label>
        </div>
        <div class="w25 h100 row">
          <button style="display: block; margin: 0 auto;height:100%;" class="pulsanteVeba" onclick="aumentaQuantità()">
            <img src="img/bianche/plus.svg" style="height:30px;width:30px;">
          </button>
        </div>
      </div>
      <div class="w100 h50p ${rigaLotti}">
          <div class="w25 h100 row">

        </div>
        <div id="divGestioneLotti" name="divGestioneLotti" class="row w50 marg5Top h50p">
          <input 
          id="txtQuLotti" 
          name="txtQuLotti" 
          type="button" 
          class="pulsanteVeBa w100 h100 centraElemento" 
          onclick="richiamaModal('modalBg');richiamaModal('modalMd', 'Seleziona Lotto',${indiceRiga});"
          value="Quantità  lotti : ${documento[identificativoDoc].prodotti.data[indiceRiga].qu}"
            >
            
          
        </div>
        <div class="w25 h100 row">

        </div>
      </div>

      <div class="row w100">
        <div class="row w20">
          <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
            <input id="sc1ModRiga" name="sc1ModRiga" type="number" inputmode="decimal" class="cx" placeholder="SC1"
              onfocus="cambiaFocusTastiera(this)" value="${sconti[0] != undefined ? sconti[0] : 0}"
              style="text-align:center" onchange="aggiornaImportoRiga()"
              onfocusin="if(this.value=='' || this.value==0)this.value=''")"
              onfocusout="convertiNumeriPagamento(this)" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''}
              >
            <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">SC1</label>
          </div>
        </div>
        <div class="row w20">
          <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
            <input id="sc2ModRiga" name="sc2ModRiga" type="number" inputmode="decimal" class="cx" placeholder="SC2"
              onfocus="cambiaFocusTastiera(this)" value="${sconti[1] != undefined ? sconti[1] : '0.00'}"
              onfocusin="if(this.value=='' || this.value==0)this.value=''")"
              onfocusout="convertiNumeriPagamento(this)"
              style="text-align:center" onchange="aggiornaImportoRiga()" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''}>
            <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">SC2</label>
          </div>
        </div>
        <div class="row w20">
          <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
            <input id="sc3ModRiga" name="sc3ModRiga" type="number" inputmode="decimal" class="cx" placeholder="SC3"
              onfocus="cambiaFocusTastiera(this)" value="${sconti[2] != undefined ? sconti[2] : '0.00'}"
              onfocusin="if(this.value=='' || this.value==0)this.value=''")"
              onfocusout="convertiNumeriPagamento(this)"
              style="text-align:center" onchange="aggiornaImportoRiga()" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''} >
            <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">SC3</label>
          </div>
        </div>
        <div class="row w20">
          <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
            <input id="sc4ModRiga" name="sc4ModRiga" type="number" inputmode="decimal" class="cx" placeholder="SC4"
              onfocus="cambiaFocusTastiera(this)" value="${sconti[3] != undefined ? sconti[3] : '0.00'}"
              onfocusin="if(this.value=='' || this.value==0)this.value=''")"
              onfocusout="convertiNumeriPagamento(this)"
              style="text-align:center" onchange="aggiornaImportoRiga()" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''}>
            <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">SC4</label>
          </div>
        </div>
        <div class="row w20">
          <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
            <input id="sc5ModRiga" name="sc5ModRiga" type="number" inputmode="decimal" class="cx" placeholder="SC5"
              onfocus="cambiaFocusTastiera(this)" value="${sconti[4] != undefined ? sconti[4] : '0.00'}"
              onfocusin="if(this.value=='' || this.value==0)this.value=''")"
              onfocusout="convertiNumeriPagamento(this)"
              style="text-align:center" onchange="aggiornaImportoRiga()" ${xParametriCassa.modSupermercato == true ? 'disabled' : ''}>
            <label id="lblquantitàVeBaMod" for="quantitàVeBaMod">SC5</label>
          </div>
        </div>
      </div>
      <br>
      <div class="w100 h50p">
        <div id="divPagamentoVeBa" name="divPagamentoVeBa" class="row has-float-label w100 marg5Top h50p">
          <input id="importoVeBaMod" name="importoVeBaMod" type="number" inputmode="decimal" class="cx"
            placeholder="Importo" onfocus="cambiaFocusTastiera(this)"
            value="${(formattaNumeriInput(arrotonda(documento[identificativoDoc].prodotti.data[indiceRiga].importo, 2), 2, 2))}" disabled>
    
          <label id="lblimportoVeBaMod" for="importoVeBaMod">Importo</label>
        </div>
      </div>
      <div class="w100 h50p ${hideDepositi}" >
        <div id="divDepositoRiga" name="divDepositoRiga" class="row has-float-label w100 marg5Top h50p">
            <select id="depositoRiga" value="${documento[identificativoDoc].prodotti.data[indiceRiga].deposito}">
            <option value=""></option>
            ${liDepositi}
            </select>
          <label id="lblDepositoRiga" for="depositoRiga">Deposito</label>
        </div>
      </div>
      <div class="row w100" style="display:none" id="informazioniArticolo">
        <div class="row w50">
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w60 separatore testoTroncato h20p">Costo Articolo</div>
              <div class="row w40 separatore dx"> ${formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indiceRiga].costo, 2), 2, 2)}</div>
            </div>
          </div>
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w60 separatore testoTroncato h20p">Costo Articolo IC</div>
              <div class="row w40 separatore dx" id="costoIcRigaMod">
                ${formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indiceRiga].costo, 2), 2, 2)}</div>
            </div>
          </div>
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w60 separatore">Um Articolo</div>
              <div class="row w40 separatore dx" id="umArticoloRigaMod"> </div>
            </div>
          </div>
        </div>
    
        <div class="row w50">
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w60 separatore testoTroncato h20p">Giacenza Articolo</div>
              <div class="row w40 separatore dx" id="giacenzaArticoloRigaMod"> </div>
            </div>
          </div>
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w80 separatore h20p">Disp. Articolo</div>
              <div class="row w20 separatore dx" id="disponibilitaArticoloRigaMod"> </div>
            </div>
          </div>
          <div class="w95 centraElemento">
            <div class="w100 ">
              <div class="row w80 separatore testoTroncato h20p">Disp. Pres. Articolo</div>
              <div class="row w20 separatore dx" id="disponibilitaPresArticoloRigaMod"> </div>
            </div>
          </div>
    
        </div>
      </div>
      </div>
      <div class="w100 h60p">
        <div class="w50 row centraElemento ${xParametriCassa.modSupermercato == true ? 'hide' : ''}">
          <button class="btnLg pulsanteVeBa" onclick="visualizzaInfoArticolo()">
            <img src="img/bianche/info.svg" class="btnInternoModal">
          </button>
        </div>
        <div class="${xParametriCassa.modSupermercato == true ? 'w100' : 'w50'} row centraElemento" >
          <button class="btnLg pulsanteVeBa"
            onclick="eliminaRiga(${indiceRiga});richiamaModal('modalBg');">
            <img src="img/rosse/cestino.svg" class="btnInternoModal">
          </button>
        </div>
      </div>
    </div>
    </div>
      `
            var functionInserimento = `modificaRiga(${indiceRiga})`;
            var idFocus = '';
            var nomePulsanteConferma = 'Salva';
            break;
        case "Gestione conti":
            var modalCorpoContent = `
      <div>
        <div class="w100 h60p">
        <button type="button" class="pulsanteVeBa w100" onclick="aggiungiConto();">
          <img src="img/bianche/plus.svg" class="imgPulsanti">
          <div>Aggiungi conto<div>
        </button>
        </div>
        <br>
        <label>Lista Conti</label>
        <div >
          <ul class="elencoR1 w100" id="listaDocumentiAttivi"></ul>
        </div>
      </div>
      `;
            var functionInserimento = '';
            var idFocus = '';
            var nomePulsanteConferma = '';
            break;
        case 'Richiama Documento':

            listaRientri = {};
            var modalCorpoContent = `
      <div>
  <div >
    <div class="row has-float-label col6 marg5Top">
      <input id="txtNumeroScontrino" name="txtNumeroScontrino" type="text" placeholder="Inserisci dati scontrino.."
        onfocus="cambiaFocusTastiera(this)" onchange="richiamaScontrino(this)">
      <span class="deleteicon"
        onclick="var input = getElementById('txtNumeroScontrino'); input.value = ''; input.focus(); "></span>
      <label id="lblVerie" for="txtNumeroScontrino">Ndoc Nchiusura ggmmaa..</label>
    </div>
    <div class="row has-float-label col6 marg5Top ${xParametriCassa.modSupermercato == true ? 'hide' : ''}">
      <input id="txtIdScontrino" name="txtIdScontrino" type="date" placeholder="Seleziona documento.."
        onfocus="cambiaFocusTastiera(this)"
        value="${oggiISO()}"
        onfocusin="attivaRicercaComboScomparsa(this,'listaDocumentiEmessi','ulListaScontrini')"
        onkeypress="attivaRicercaComboScomparsa(this,'listaDocumentiEmessi','ulListaScontrini')"
        filtro="data" onblur="nonChiudereComboScomparsa=false;comboScomparsaChiudi(this)" timer="10" comboAttiva="false">

      <label id="lblVerie" for="txtIdScontrino">Seleziona documento</label>
      <ul id="ulListaScontrini" inputid="txtIdScontrino"
        campo="data"        
        name=" ulListaScontrini" class="comboScomparsa elencoR1 testoNormale"
        onscroll="comboScomparsaScroll(this,'listaDocumentiEmessi','ulListaScontrini','txtIdScontrino')"
        onfocus="nonChiudereComboScomparsa=true;" onblur="nonChiudereComboScomparsa=false;">

      </ul>
    </div>
    <div class="row has-float-label w100 marg5Top">
      <input id="txtRicerca" name="txtRicerca" type="text" placeholder="Ricerca codice nel documento"
        onfocus="cambiaFocusTastiera(this)" onkeypress="ricercaTabellaTimer(this,'elencoRigheRichiamoScontrino')" 
        onkeydown="if (event.keyCode == 9 || event.keyCode==13){cercaCodiceVeBa(this);}" 
        >
      <span class="deleteicon"
        onclick="var input = getElementById('txtRicerca'); input.value = ''; input.focus(); "></span>
      <label id="lbltxtRicerca" for="txtRicerca">Ricerca codice</label>
    </div>
    <div style="height: calc(100% - 235px); overflow:auto!important;" class="row has-float-label w100 marg5Top">
      <ul id="elencoRigheRichiamoScontrino" class="elencoR1">
        </ul< </div>

    </div>
  </div>
  <div class="w95" style="position: absolute; bottom:70px;">
    <div class="row w25 centraElemento">
      <button class="pulsanteTastieraImg pulsanteVeBa" onclick="scontrinoDiCortesiaDaRichiamo()">
        <img src="img/bianche/gift.svg" class="imgPulsanti">
        <div>Sc. Cortesia</div>
      </button>
    </div>
    <div class="row w25 centraElemento">
      <button class="pulsanteTastieraImg pulsanteVeBa" onclick="stampaDocumentoDaRichiamo()">
        <img src="img/bianche/printer.svg" class="imgPulsanti">
        <div>Documento non fiscale</div>
      </button>
    </div>
    <div class="row w25 centraElemento">
        <button class="pulsanteTastieraImg pulsanteVeBa" onclick="stornaArticoliSelezionati()">
        <img src="img/bianche/change.svg" class="imgPulsanti">
        <div>Storna Articoli</div>
        </button>
    </div>
    <div class="row w25 centraElemento">
      <button class="pulsanteTastieraImg pulsanteVeBa" onclick="richiamaDocumentoSuVeBa()">
        <img src="img/bianche/enter.svg" class="imgPulsanti">
        <div>Richiama Documento</div>
      </button>
    </div>
  </div>
      `;

            var functionInserimento = 'annullaScontrino(\'txtNumeroScontrino\')';
            var idFocus = 'txtNumeroScontrino';
            var nomePulsanteConferma = 'Annulla Scontrino';
            break;
        case "Autorizzazione":
            var modalCorpoContent = `

        <div class="w100 rowDx">
            <div class="centraElemento w100">
              <div id="divListaAmministratori" name="" class="row has-float-label w100">
                <span class="selectDefault" id="0">Seleziona Amministratore</span>
                <label for="listaAmministratori">Seleziona Amministratore</label>
                <select id="listaAmministratori" name="listaAmministratori" class="selectBox">

                </select>
              </div>
            </div>
          </div>
          <form>
          <div id=""  class="row has-float-label w100 marg5Top">
          <span class="selectDefault" id="0">Inserisci password</span>
          <label for="passwordAmministratore">Inserisci password</label>
          <input id="passwordAmministratore"                  
                type="password"               
                onfocus="cambiaFocusTastiera(this)" value="">
        </div>
        </form>
      `
            var functionInserimento = `fncAutorizzazioneAmministrazione`;
            var idFocus = '';
            var nomePulsanteConferma = 'Conferma';
            break;
        case "Movimenti di Cassa":
            var dataOggi = oggiISO();
            var responsabile = document.getElementById('selezionaCassa').value;
            var op = ''
            for (n of parametriCasse) {
                if(n.UTENTE == responsabile){
                    op += '<option selected value="' + n.UTENTE + '">' + n.UTENTE + '</option>';
                }else{
                    op += '<option value="' + n.UTENTE + '">' + n.UTENTE + '</option>';
                }
                
            }
            var modalCorpoContent = `
      <div class="w100 h50p">
        <div class="row w50">
          <div id="divResponsabili" name="" class="row has-float-label w100">
            <span class="selectDefault" id="0">Seleziona responsabile</span>
            <label for="responsabile">Seleziona responsabile</label>
            <select id="responsabile" name="responsabile" class="selectBox" value="">
              ${op}
            </select> 
          </div>
      </div>
        <div class="row w50">
                <div id="divData" name="divData" class="has-float-label datePiker">
                  <input id="txtData" name="txtData" type="date" onfocusout="movimentiCassa()" value="${dataOggi}" style="">
                  <label for="txtData">Data</label>
                </div>
        </div>
      </div>
      <div style="" class="w100">
      <div>
        <div class="intestazioneGriglie clrScuro h30p">
          <div class="row w10">Ora</div>
          <div class="row w70">Descrizione</div>
          <div class="row w20">Importo</div>
        </div>
      </div>
        <ul id="elencoMovimentiDiCassa" class="elencoR1 noMarkerUl noMarkerUl " style="height: calc(100% - 205px); overflow-y:auto;">
         
        </ul>
      </div>
      <div>
      <div>
      <div class="row w50">
        <div class="row w95 centraElemento">
          <div class="w100 ">
            <div class="row w60 separatore">Saldo Contante</div>
            <div class="row w40 separatore dx" id="saldoContante"> 0,00</div>
          </div>
          <div class="w100 ">
            <div class="row w60 separatore">Saldo Assegni</div>
            <div class="row w40 separatore dx" id="saldoAssegni"> 0,00</div>
          </div>
          <div class="w100 ">
            <div class="row w60 separatore">Saldo POS</div>
            <div class="row w40 separatore dx" id="saldoPos"> 0,00</div>
          </div>
          <div class="row has-float-label w100  h40p">
          <input id="txtPrelievo" type="text" inputmode="text" placeholder="Importo Prelievo" onfocus="" value="">
          <label id="lbltxtPrelievo" for="txtPrelievo">Importo Prelievo</label>
      </div>

        </div>
      </div>
      </div>
      <div class="row w50">
        <div class="row w95 centraElemento">
            <div class="w100 ">
              <div class="row w60 separatore testoTroncato1">Prelievi Contante</div>
              <div class="row w40 separatore dx" id="prelieviContante"> 0,00</div>
            </div>
            <div class="w100 ">
              <div class="row w60 separatore">Prelievo Assegni</div>
              <div class="row w40 separatore dx" id="prelievoAssegni"> 0,00</div>
            </div>
            <div class="w100 ">
              <div class="row w60 separatore">Saldo credito</div>
              <div class="row w40 separatore dx" id="saldoFinanziaria"> 0,00</div>
            </div>
            
            <div class="w100 ">
              <div class="row w60 separatore padTop10">Totale di Cassa</div>
              <div class="row w40 separatore dx padTop10" id="totaleCassa"> 0,00</div>
            </div>
          </div>
        </div>
      </div>
      `
            var functionInserimento = `inserimentoMovimentiCassa('txtPrelievo',1,'responsabile');`;
            var idFocus = '';
            var nomePulsanteConferma = 'Prelievo';
            break;
        case "Foglio cassa":
            var dataOggi = oggiISO();
            var responsabile = document.getElementById('selezionaCassa').value;
            var op = ''
            for (n of parametriCasse) {
                if(n.UTENTE == responsabile){
                    op += '<option value="' + n.UTENTE + '" selected>' + n.UTENTE + '</option>';
                }else{
                    op += '<option value="' + n.UTENTE + '">' + n.UTENTE + '</option>';
                }
                
            }
            var modalCorpoContent = `
      <div>
        <div class="w100 h50p">
            <div class="row w50">
              <div id="divResponsabili" name="" class="row has-float-label w100">
                <span class="selectDefault" id="0">Seleziona responsabile</span>
                <label for="responsabile">Seleziona responsabile</label>
                <select id="responsabile" name="responsabile" class="selectBox" value="">
                  ${op}
                </select> 
              </div>
          </div>
          <div class="row w50">
                  <div id="divData" name="divData" class="has-float-label datePiker">
                    <input id="txtData" name="txtData" type="date" onfocusout="foglioCassa()" value="${dataOggi}" style="">
                    <label for="txtData">Data</label>
                  </div>
          </div>
        </div>
        <div class="h100-270p">
          <div class="row w33">
            <div class="w100 fasciaIntestazione " style="margin-bottom:0px; height:30px"><div class="cx">Contanti</div></div>
            <div class="row has-float-label w100  h40p">
                <input id="totContante" type="number" inputmode="decimal" placeholder="Contanti Scontrinato" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()">
                <label id="lbltotContante" for="totContante">Contanti Scontrinato</label>
            </div>
            <div class="row has-float-label w100  h40p">
                <input id="totPrelievi" type="number" inputmode="decimal" placeholder="Totale Prelievi" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()">
                <label id="lbltotPrelievi" for="totPrelievi">Totale Prelievi</label>
            </div>
            <div class="row has-float-label w100  h40p">
                <input id="saldoContante" type="number" inputmode="decimal" placeholder="Totale Prelievi" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()">
                <label id="lblsaldoContante" for="saldoContante">Saldo contante</label>
            </div>
          </div>
          <div class="row w33">
          <div class="w100 fasciaIntestazione " style="margin-bottom:0px; height:30px;"><div class="cx">Pos</div></div>
          <div class="row has-float-label w100  h40p">
              <input id="totPos" type="number" inputmode="decimal" placeholder="Pos Scontrinato" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()">
              <label id="lbltotPos" for="totPos">Pos Scontrinato</label>
          </div>
          </div>
          <div class="row w33">
          <div class="w100 fasciaIntestazione " style="margin-bottom:0px; height:30px;" ><div class="cx">Varie</div></div>
          <div class="row has-float-label w100  h40p">
              <input id="totAssegni" type="number" inputmode="decimal" placeholder="Totale Assegni" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()">
              <label id="lbltotAssegni" for="totAssegni">Totale assegni</label>
          </div>
          <div class="row has-float-label w100  h40p">
              <input id="totImportoAnnulli" type="number" inputmode="decimal" placeholder="Totale Annulli" onfocus="" value="" disabled>
              <label id="lbltotImportoAnnulli" for="totImportoAnnulli">Totale annulli</label>
          </div>
          <div class="row has-float-label w100  h40p">
              <input id="totImportoResi" type="number" inputmode="decimal" placeholder="Totale Resi" onfocus="" value="" disabled>
              <label id="lblTotResi" for="totImportoResi">Totale Resi</label>
          </div>
          <div class="row has-float-label w100  h40p hide">
              <input id="totBuoniSconto" type="number" inputmode="decimal" placeholder="Totale Buoni Sconto" onfocus="" value="" disabled>
              <label id="lbltotBuoniSconto" for="totBuoniSconto">Totale Buoni Sconto</label>
          </div>
            <div class="row has-float-label w100  h40p hide">
                <input id="totVari" type="number" inputmode="decimal" placeholder="Totale Vari" onfocus="" value="" disabled>
                <label id="lbltotVari" for="totVari">Totale Vari</label>
            </div>
          </div>
        </div>
        <div class="w100 row" >

          <div class="row w33" >
            <div class="row has-float-label w95  h40p" style="margin-top:0px">
                <input id="totBuoniIncassati" type="number" inputmode="decimal" placeholder="Buoni incassati" onfocus="" value="" disabled>
                <label id="lblTotBuoniIncassati" for="totBuoniIncassati">Buoni incassati</label>
            </div>
            <div class="row has-float-label w95  h40p" style="margin-top:0px">
                <input id="totContantiFatture" type="number" inputmode="decimal" placeholder="Contanti Fatture" onfocus="" value="" disabled>
                <label id="lbltotContantiFatture" for="totContantiFatture">Contanti Fatture</label>
            </div>
            <div class="row has-float-label w95  h40p" style="margin-top:5px">
                <input id="totaleContantiTmp" type="number" inputmode="decimal" placeholder="Totale Contanti" onfocus="" value="" disabled>
                <label id="lbltotaleContantiTmp" for="totaleContantiTmp">Totale Contanti</label>
            </div>
            <div class="row has-float-label w95  h40p" style="margin-top:35px">
              <input id="totContato" type="number" inputmode="decimal" placeholder="Importo contato" value="" onchange="aggiornaValoriFoglioCassa()" onfocus="cambiaFocusTastiera(this)">
              <label id="lbltotContato" for="totContato">Importo contato</label>
            </div>
          </div>

          <div class="row w33" >
            <div class="row w95">
                <div class="row has-float-label w70  h40p" style="margin-top:45px">
                    <input id="totPosFatture" type="number" inputmode="decimal" placeholder="Pos Fatture" onfocus="" value="" disabled>
                    <label id="lblTotPosFatture" for="totPosFatture">Pos Fatture</label>
                </div>
                <div class="row has-float-label w30  h40p" style="margin-top:45px">
                    <input id="totNumeroFatture" type="number" inputmode="decimal" placeholder="Numero Fatture" onfocus="" value="" disabled>
                    <label id="lbltotNumeroFatture" for="totNumeroFatture">N°</label>
                </div>
                <div class="row has-float-label w100  h40p" style="margin-top:5px">
                    <input id="totPosTmp" type="number" inputmode="decimal" placeholder="Pos Totale" onfocus="" value="" disabled>
                    <label id="lbltotPosTmp" for="totPosTmp">Pos Totale</label>
                </div>
                
            </div>
            <div class="row has-float-label w95  h40p" style="margin-top:35px">
              <input id="totDifferenza" type="number" inputmode="decimal" placeholder="Differenza" onfocus="" value="" onchange="aggiornaValoriFoglioCassa()" disabled>
              <label id="lbltotDifferenza" for="totDifferenza">Differenza</label>
            </div>
          </div>
          
          <div class="row w33">
            <div class="row has-float-label w95  h40p">
                    <input id="totScontrinato" type="number" inputmode="decimal" placeholder="Totale Scontrinato" onfocus="" value="0.00" onchange="aggiornaValoriFoglioCassa()">
                    <label id="lbltotScontrinato" for="totScontrinato">Totale Scontrinato</label>
            </div>
            <div class="row has-float-label w95  h40p">
                    <input id="totFattureIncassate" type="number" inputmode="decimal" placeholder="Fatture Incassate" onfocus="" value="0.00" onchange="aggiornaValoriFoglioCassa()">
                    <label id="lbltotFattureIncassate" for="totFattureIncassate">Fatture Incassate</label>
            </div>
            <div class="row has-float-label w95  h40p">
                    <input id="totAltriIncassi" type="number" inputmode="decimal" placeholder="Altri Incassi" onfocus="" value="0.00" onchange="aggiornaValoriFoglioCassa()">
                    <label id="lbltotAltriIncassi" for="totAltriIncassi">Altri Incassi</label>
            </div>
            <div class="row has-float-label w95  h40p">
                    <input id="totPagamenti" type="number" inputmode="decimal" placeholder="Pagamenti" onfocus="" value="0.00" onchange="aggiornaValoriFoglioCassa()">
                    <label id="lbltotPagamenti" for="totPagamenti">Pagamenti</label>
            </div>
            <div class="row has-float-label w95  h40p">
                <input id="totIncasso" type="number" inputmode="decimal" placeholder="Totale Incasso" onfocus="" value="0.00" onchange="aggiornaValoriFoglioCassa()">
                <label id="lblTotIncasso" for="totIncasso">Totale Incasso</label>
            </div>
          </div>
      </div>
      `
            var functionInserimento = `stampaFoglioRiepilogo()`;
            var idFocus = '';
            var nomePulsanteConferma = 'Stampa Riepilogo';
            break;
        case 'Conferma Chiusura':
            var modalCorpoContent = `
        <div class="w100">
          <div>
            <p>Digitare la seguente combinazione di numeri per confermare</p>
          </div>
          <div class="w100 cx testo40" id="combinazioneTemporanea">${(Math.random()*10000).toFixed(0)}</div>
          <div class="row has-float-label w95  h40p">
              <input id="txtchiusura" type="text" inputmode="text" placeholder="Scrivi la combinazione " onfocus="cambiaFocusTastiera(this)" value="">
              <label id="lblChiusura" for="txtchiusura">Scrivi la combinazione</label>
          </div>
        </div>`;

            var functionInserimento = `ControllaParolaChiusura()`;
            var idFocus = 'txtchiusura';
            var nomePulsanteConferma = 'Verifica';
            break;
        case 'Seleziona Lotto':
            var nrRiga = var1;
            carDatiLottiArticolo(documento[identificativoDoc].prodotti.data[nrRiga].codice);
            var listaLotti = documento[identificativoDoc].prodotti.data[nrRiga].movLotti;
            var li = '';
            for (var n in listaLotti) {

                if (!isEmpty(listaLotti[n])) {
                    li += aggiungiLotto(nrRiga, listaLotti[n].lotto, listaLotti[n].qu, listaLotti[n].scadenza, false, n);
                }
            }
            var modalCorpoContent = `
      <div id="divModificaLotti">
      <div class="w100 h60p" style="">
        <div class="row has-float-label col6 h40p marg10Top">
          <input id="txtCodiceLotto" type="text" inputmode="text" placeholder="Ricerca Lotto" onfocus="" value=""
            onkeypress="attivaRicercaComboScomparsa(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','tmpListaLottiVeBa.json')"
            onfocusin="attivaRicercaComboScomparsa(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','tmpListaLottiVeBa.json')"
            onblur="comboScomparsaChiudi(this)" timer="200" comboattiva="true" filtro="LOTTO">
          <label for="txtCodiceLotto">Codice Lotto</label>
          <ul id="ullistaLottiArticoloVeBa" campo="LOTTO" name="ullistaLottiArticoloVeBa"
            class="comboScomparsa elencoR1 testoNormale"
            onscroll="comboScomparsaScroll(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','txtCodiceLotto')"
            onfocus="nonChiudereComboScomparsa=true;" onblur="nonChiudereComboScomparsa=false;"
            inputid="txtCodiceLotto">
          </ul>
        </div>
        <div class="row col6 marg10Top">
            <div id="divtxtScadenza" name="divtxtScadenza" class="has-float-label datePiker row">
                <input id="txtScadenza" name="txtScadenza" type="date" onfocusout="" value="" style="">
                <label for="txtScadenza">Scadenza</label>
            </div>
            <div class="w100-datePiker row">
                <div class="row has-float-label w100-50p h40p">
                    <input id="txtQtaLotto" type="text" inputmode="text" placeholder="Quantità" onfocus="" value="">
                <label for="txtQtaLotto">Qta</label>
                </div>
                <div class="row w40p  h40p">
                    <button style="height: 100%; color:white; display: block; margin: 0 auto;" onclick="aggiungiLotto(${nrRiga},document.getElementById('txtCodiceLotto').value,document.getElementById('txtQtaLotto').value,document.getElementById('txtScadenza').value,true);" class="btnCustom">
                        <img src="img/Nere/add.svg" style="height: 80%;">
                    </button>
                </div>
            </div>    
        </div>
      </div>
      <div class="w100 h80p">
        <ul class="ulElenco elencoR2 w100-5p elencoBase" id="elencoLotti">
        ${li}
        </ul>
      </div>
    </div>
        `;

            var functionInserimento = ``;
            var idFocus = '';
            var nomePulsanteConferma = 'Salva';
            break;
    }
    document.getElementById(idModal + 'intestazioneModal').innerHTML = nomeModal
    if (functionInserimento == '' || nomePulsanteConferma == '') {
        hide(idModal + 'pulsanteConfermaModal');
    }
    else {
        document.getElementById(idModal + 'pulsanteConfermaModal').setAttribute('onclick', functionInserimento)
        document.getElementById(idModal + 'pulsanteConfermaModal').value = nomePulsanteConferma
        show(idModal + 'pulsanteConfermaModal');
    }

    modalCorpo.innerHTML += modalCorpoContent;
    if (modal.style.display == 'none' || modal.style.display == '') {
        modal.style.display = 'block';
        if (idFocus != '') {

            focus(idFocus);
        }
    } else {
        modal.style.display = 'none';
        focus('ricercaArticoloVenditaBanco');
    }

}

function cmbClientiSel() {
    
    var input = document.getElementById('cmbClienti');
    var idRagioneSociale = input.getAttribute("idragionesociale");
    if(idRagioneSociale==''){
        return;
    }
    if(xParametriCassa.modOffline==true){
        ciclaTabellaIndexedDBSemplice("destinazioni",idRagioneSociale,(res)=>{
            document.getElementById('destinazioniCliente').innerHTML = ''
            if(res.length==0){
                res=[0];
                hide('divDestinazioniCliente');
                return;
            }
            
            show('divDestinazioniCliente');
            var list = '<option></option>';
            for (var d of res) {
                if (d.ID != 0 && d.ID != '0') {
                    list += `<option value="${d.ID}" class="separatoreLi"><div>${d.LOCALITARICCA} - </div><div style="font-size:8px">${d.INDIRIZZO}</div></option>`
                }
            }

            document.getElementById('destinazioniCliente').innerHTML = list;
        },'','ID_ANAG');
        return;
    }
    
    var parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "destinazioniCliente",
        select: 'destinazioniCliente',
        idClienteDest: idRagioneSociale
    };
    inviaRichiestaCentralino("query", parametri, function (dati) {

        document.getElementById('destinazioniCliente').innerHTML = ''
        var risp = JSON.parse(dati);

        if (risp.risposta[0] != 0) {
            show('divDestinazioniCliente');
            var list = '<option></option>';
            for (var d of risp.risposta) {
                if (d.ID != 0 && d.ID != '0') {
                    list += `<option value="${d.ID}" class="separatoreLi"><div>${d.RAGIONE_SOCIALE} - </div><div style="font-size:8px">${d.INDIRIZZO}</div></option>`
                }
            }
            document.getElementById('destinazioniCliente').innerHTML = list;


        }
        if (risp.risposta[0].PAGAMENTO != undefined) {
            document.getElementById('listaPagamenti').value = risp.risposta[0].PAGAMENTO;
        }
        if (risp.risposta[0].AGENTE != undefined) {
            document.getElementById('cmbAgente').value = risp.risposta[0].AGENTE;
        }
    })
}
function cmbRegistratoriCassaSel(input) {
    var inputCassa = document.getElementById('selezionaCassa');
    // inputCassa.setAttribute("UTENTE", input.getAttribute("utente"))

    inputCassa.value = input.getAttribute("utente");

    caricaParametriCassa();

    show('btnEliminaCassa');
}
function cmbLottoArticolo(e) {
    var inp = document.getElementById('txtCodiceLotto');
    inp.value = e.getAttribute('lotto');
    var iscadenza = document.getElementById('txtScadenza');
    iscadenza.value = e.getAttribute('scadenza');
    document.getElementById('txtQtaLotto').focus();

}
function cmbScontriniEmessi(e) {
    var imp = e.getAttribute('IDTES');
    var obj = {
        'id': imp
    }
    richiamaScontrino(obj);
}
function apriFoglioCassa() {
    richiamaModal('modalBg', 'Foglio cassa');
    foglioCassa();
}
function eliminaCassaSelezionata() {
    attivaAlert(5, 'Sei sicuro di voler eliminare <u>' + recuperaValueElemento('selezionaCassa') + '</u>? ', 'rspEliminaCassaSelezionata_' + 'false')
}
function rspEliminaCassaSelezionata(risp) {
    if (risp == 'Si') {
        var input = document.getElementById('selezionaCassa');

        const parametri = { "tipoRisposta": "elimina", "tipoElimina": 'parametriDb', "UTENTE": input.value, 'PARAMETRO': 'parametriCassa' };
        inviaRichiestaCentralino("elimina", parametri, function (dati) {
            var risp = JSON.parse(dati);
            if (risp.risposta == false && risp.error != '') {
                attivaAlert(2, risp.error);
            } else {
                avviaCarDati('registratoriCassa');
                for (var [k, v] of Object.entries(query['venditaBanco.html:PARAMETRI']['oggetti'])) {
                    var input = document.getElementById(k)
                    if (input.type == 'checkbox') {
                        input.checked = false;
                    } else {
                        input.value = '';
                    }
                }
                var input = document.getElementById('selezionaCassa');
                input.setAttribute('UTENTE', '');
                input.focus();
            }
        });
    } else {
        chiudiModalAlert("rspEliminaCassaSelezionata")
    }
}
function cercaCodiceVeBa(input) {
    var inputBox = input
    var lottoTmp = '';
    input.classList.remove('ricercaInvalida')
    var codice = input.value.toUpperCase();

    if (xParametriCassa.upcaEan13 != undefined && xParametriCassa.upcaEan13 == true) {
        if (codice.length == 12 && codice.substring(0, 1) != '0') {
            codice = "0" + codice;
        }
    }
    if (codice.indexOf("$DOC") != -1) {
        richiamaModal('modalMd', 'Richiama Documento'); apriFunzioni();
        document.getElementById('txtNumeroScontrino').value = codice.replace(/ /g, '');
        richiamaScontrino(document.getElementById('txtNumeroScontrino'));
        input.value = '';
        return;

    }else if(codice.indexOf('$ABSCONTO')!=-1 && xParametriCassa.modSupermercato==true){
        gestionePulsanteAbSconto(codice);
        input.value = '';
        setTimeout(function () {
        input.focus();
        }, 100);
        return
    }else if(codice.indexOf('$BUONO')!=-1 && xParametriCassa.modSupermercato==true){
        gestionePulsanteBuono(codice);
        input.value = '';
        setTimeout(function () {
        input.focus();
        }, 100);
        return
    }else if(codice.indexOf('$AGENTE')!=-1){
        document.getElementById('cmbAgente').value = codice.replace('$AGENTE','');
        return
    }else if (codice.indexOf("$") != -1) {
        var codiceTmp = codice.split("$");
        codice = codiceTmp[0];
        lottoTmp = codiceTmp[1];
    }
    if (codice != undefined && codice != '') {
        var idCliente = document.getElementById('cmbClienti').getAttribute('idragionesociale');
        if (idCliente == null || isNaN(idCliente) || idCliente == '') {
            idCliente = 0;
        }
        var idAgente = document.getElementById('cmbAgente').value;
        if (idAgente == null || isNaN(idAgente) || idAgente == '') {
            idAgente = 0;
        }
        if (xParametriCassa['modOffline'] != undefined && xParametriCassa['modOffline'] == true) {
            leggiTabellaIndexedDBSemplice('dbArticoli', codice, function (datiArticolo) {
                if (datiArticolo.risposta[0] != 0) {
                    elaboraDatiCodiceArticolo(datiArticolo, inputBox, lottoTmp);
                } else {
                    leggiTabellaIndexedDBSemplice('codiciAggiuntivi', codice, function (datiArticolo) {
                        if (datiArticolo.risposta[0] != 0) {
                            var codice = datiArticolo.risposta.CODICEPRIMARIO;
                            leggiTabellaIndexedDBSemplice('dbArticoli', codice, function (datiArticolo) {
                                elaboraDatiCodiceArticolo(datiArticolo, inputBox, lottoTmp);
                            })
                        } else {
                            //in modo che la gestione dell'codice non trovato sia gestita sempre dall'elaboraizone
                            elaboraDatiCodiceArticolo(datiArticolo, inputBox, lottoTmp);
                        }
                    })
                }
            }
            )
        } else {
            var parametri = {
                "tipoRisposta": "select",
                "tipoQuery": "articoliVeBa",
                "codiceVeBa": codice,
                "nomeTabella": "articoloVeBa",
                "idCliente": idCliente,
                "idAgente": idAgente
            };

            inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
                var a = JSON.parse(dati);
                elaboraDatiCodiceArticolo(a, inputBox, lottoTmp);
            });
        }

    }

}
function carDatiLottiArticolo(articolo) {
    var obj = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "lottoArticolo",
        codiceArticolo: articolo,
        deposito: recuperaDeposito()
    }
    if (obj.deposito == false) {
        return;
    }
    inviaRichiestaCentralino("query", obj, function (dati) {
        var res = JSON.parse(dati)
        localStorage.setItem('tmpListaLottiVeBa.json', JSON.stringify(res.risposta));
    })
}
function elaboraDatiCodiceArticolo(dati, inputBox, lottoTmp = '') {
    if (dati.error != '') {
        return false;
    }
    if (dati.risposta[0] == 0) {
        inputBox.classList.add('ricercaInvalida');
        inputBox.value = '';
        inputBox.focus();
        if (inputBox.id == 'ricercaPrezzoVeBa') {
            if(document.getElementById('resultRicercaPrezzoVeBa')==null){
                if (xParametriCassa.emettiSuonoCodiceErrato) {
                    datiRegCassa('emettiSuono', true)
                }
                return;
            }
            document.getElementById('resultRicercaPrezzoVeBa').innerHTML = '';
            var divRes = `
<div class="w100 h80p ricercaInvalida " style="margin-top:10px">
  <div style="padding-top:24px; font-size:24px;">Articolo non trovato</div>
</div>
`;
            document.getElementById('resultRicercaPrezzoVeBa').innerHTML = divRes;
            document.getElementById('modalSmpulsanteConfermaModal').setAttribute('onclick', 'pulisciRicercaPrezzo()');
            document.getElementById('modalSmpulsanteConfermaModal').value = 'Pulisci';
        }
        if (xParametriCassa.emettiSuonoCodiceErrato) {
            datiRegCassa('emettiSuono', true)
        }
        return;
    }
    if (inputBox.id == 'ricercaArticoloVenditaBanco') {
        var rs = dati.risposta;
        inputBox.value = '';
        inputBox.focus();
        var datiDoc = verificaTipoDocumento(false, false);
        if (rs.GESTIONE_LOTTI == 1) {
            var gestioneLottiTmp = true;
        } else {
            var gestioneLottiTmp = false;
        }
        if (gestioneLottiTmp == true && datiDoc.gestioneLotti == true) {

            var obj = {
                tipoRisposta: "select",
                tipoQuery: "querySpecifica",
                nomeTabella: "lottoArticolo",
                codiceArticolo: rs.CODICE,
                deposito: recuperaDeposito(),
                'lottoVeBa': lottoTmp
            }
            if (obj.deposito == false) {
                return;
            }
            inviaRichiestaCentralino("query", obj, function (dati) {
                var res = JSON.parse(dati)
                if (lottoTmp != undefined && lottoTmp != '') {
                    var nrRiga = inserimentoRigaVeBa(true, true, rs.CODICE, rs.DESCRIZIONE, documentoIvaInclusa ? formattaNumeriInput(arrotonda(rs.PREZZOIVATO, 2), 2, 2) : formattaNumeriInput(arrotonda(rs.PREZZOLIVAESCL, decimaliPrezzi), decimaliPrezzi, decimaliPrezzi), rs.PIVA, rs.ID_IVA, quantità, rs.UM, arrotonda(rs.UCOSTO, 2), '', documentoIvaInclusa ? rs.PREZZOIVATO : rs.PREZZOLIVAESCL, rs.SC1, rs.SC2, rs.SC3, rs.SC4, rs.SC5, true);
                    if(nrRiga!=false){
                        aggiungiLotto(nrRiga, lottoTmp, quantità, res.risposta[0].SCADENZAHTML, true, '');
                    }
                    
                } else {
                    localStorage.setItem('tmpListaLottiVeBa.json', JSON.stringify(res.risposta));
                    quantità = 0;
                    var nrRiga = inserimentoRigaVeBa(true, true, rs.CODICE, rs.DESCRIZIONE, documentoIvaInclusa ? formattaNumeriInput(arrotonda(rs.PREZZOIVATO, 2), 2, 2) : formattaNumeriInput(arrotonda(rs.PREZZOLIVAESCL, decimaliPrezzi), decimaliPrezzi, decimaliPrezzi), rs.PIVA, rs.ID_IVA, quantità, rs.UM, arrotonda(rs.UCOSTO, 2), '', documentoIvaInclusa ? rs.PREZZOIVATO : rs.PREZZOLIVAESCL, rs.SC1, rs.SC2, rs.SC3, rs.SC4, rs.SC5, true);
                    if(nrRiga!=false){
                        richiamaModal('modalMd', 'Seleziona Lotto', nrRiga);
                    }
                }

                quantità = 1;
            })

        } else {
            var prezzo=documentoIvaInclusa ? rs.PREZZOIVATO : rs.PREZZOLIVAESCL;
            if(rs.QMAX!=undefined && rs.QMAX!='' && rs.QMAX>0){
                var resVerifica=verificaQuantitàMaxContratto(rs.CODICE,quantità,rs.QMAX);
                if(resVerifica==false){
                    prezzo=documentoIvaInclusa ? rs.LISTINORIFIVATO : rs.LISTINORIFIVAESCL;
                    rs.coloreRiga='clrTestoRosso'
                }
            }
            if(rs.ADATA!=undefined && rs.ADATA!='' && rs.ADATA!=null){
                var resVerificaData=verificaDataContratto(rs.ADATA);
                if(resVerificaData==false){
                    prezzo=documentoIvaInclusa ? rs.LISTINORIFIVATO : rs.LISTINORIFIVAESCL;
                    rs.coloreRiga='';
                }
            }
            inserimentoRigaVeBa(true, true, rs.CODICE, rs.DESCRIZIONE, arrotonda(prezzo,decimaliPrezzi), rs.PIVA, rs.ID_IVA, quantità, rs.UM, arrotonda(rs.UCOSTO, 2), '', prezzo, rs.SC1, rs.SC2, rs.SC3, rs.SC4, rs.SC5, gestioneLottiTmp,rs.coloreRiga);
            quantità = 1;
            return true;
        }

    } else if (inputBox.id == 'ricercaPrezzoVeBa') {
        document.getElementById('resultRicercaPrezzoVeBa').innerHTML = '';
        var rs = dati.risposta;
        var divRes = `
<div class="w100 h80p clrSfumatoScuro " style="font-size:24px;">
  Il prezzo dell'articolo indicato è ${formattaNumeri(arrotonda(rs.PREZZOIVATO, 2), 2, 2)}  vuoi inserirlo?
</div>
`;
        document.getElementById('resultRicercaPrezzoVeBa').innerHTML = divRes;
        var fnc = `document.getElementById('ricercaArticoloVenditaBanco').value='${rs.CODICE}';cercaCodiceVeBa(document.getElementById('ricercaArticoloVenditaBanco'));richiamaModal('modalSm');`

        document.getElementById('modalSmpulsanteConfermaModal').setAttribute('onclick', fnc);
        document.getElementById('modalSmpulsanteConfermaModal').value = 'Inserisci';
    }else if(inputBox.id=='txtRicerca' ){
        var rs = dati.risposta;
        inputBox.value=rs.CODICE;
        ricercaTabellaTimer(inputBox,'elencoRigheRichiamoScontrino');
    }

}
function aggiornaDatiArticoli(modificati = false) {
    var lista = 'codiciAggiuntivi,articoli,clienti';
    var input=document.getElementById('btnAggiornaOffline');
    input.disabled = true;
    input.classList.add('button--loading');
    var tmp=input.innerHTML;
    input.innerHTML='';
    aggiornaTabelleOffline(lista,modificati,()=>{
        input.disabled = false;
        input.classList.remove('button--loading');
        input.innerHTML=tmp;
    })
}

function salvaDocumentoOffline(documentoTmp='') {
    
    var doc = new Array;
    if(documentoTmp==''){
        if(documento[identificativoDoc].testata.identificativoOld!=undefined && documento[identificativoDoc].testata.identificativoOld!=''){
            rimuoviDatiDaIndexDB("documentiVeBa", documento[identificativoDoc].testata.identificativoOld,(res)=>{})
        }    
            if (documento[identificativoDoc].testata.identificativoVeBa != '') {
                console.log('identificativoVeBa',documento[identificativoDoc].testata.identificativoVeBa);
                documento[identificativoDoc].identificativo = documento[identificativoDoc].testata.identificativoVeBa;
            }else {
                documento[identificativoDoc].testata.identificativoVeBa=documento[identificativoDoc].identificativo;
            }
        doc.push(documento[identificativoDoc]);
        
    
    }else{
        doc.push(documentoTmp);
        
    }
    gestioneTabellaIndexDb('documentiVeBa', doc, elaboraRispostaSalvaDocumento, false, false);
    
    
}
var verificaInvioDocumentiInCorso = false;
var erroreCaricamentoDocumenti='';
function caricaDocumentiSuServerDaIndex(input = '',callBack='') {
    if (verificaInvioDocumentiInCorso == true) {
        return;
    }
    erroreCaricamentoDocumenti='';
    if (typeof input === 'object') {
        input.disabled = true;
        input.classList.add('button--loading');
        for(var i = 0; i < input.childNodes.length; i++){
            if(input.childNodes[i].tagName === "IMG"){
                input.childNodes[i].src="img/bianche/upload.svg";
                break
            }
        }
        var tmp=input.innerHTML;
        input.innerHTML='';
    }
    verificaInvioDocumentiInCorso = true;
    try {
        recuperaAllDataIndexDb("documentiVeBa", (documentiIndex) => {
            if(documentiIndex.risposta[0]==0){
                verificaInvioDocumentiInCorso=false;
                if (typeof input === 'object') {
                    input.disabled = false;
                    input.classList.remove('button--loading');
                    input.innerHTML=tmp;
                }
                if(callBack!=''){
                    callBack();
                }
                return;
            }
            var result=salvaDocumentiSuServer((dataj) => {
                
                
                if (typeof input === 'object') {
                    input.disabled = false;
                    input.classList.remove('button--loading');
                    input.innerHTML=tmp;
                }
                var data = JSON.parse(dataj);
                if (data.error != '') {
                    attivaAlert(2, data.error);  
                    verificaInvioDocumentiInCorso = false; 
                    return;
                }
                
                if(callBack!=''){
                    callBack();
                }
                
                if (data.risposta[0] != 0) {
                    
                    for (var x of data.risposta) {
                        try{
                        if (x.identificativoVeBa != undefined && x.identificativoVeBa != '') {
                            rimuoviDatiDaIndexDB("documentiVeBa", x.identificativoVeBa, (res) => {
                                verificaInvioDocumentiInCorso = false;
                                if (typeof input === 'object') {
                                    input.disabled = false;
                                    input.classList.remove('button--loading');
                                    input.innerHTML=tmp;
                                }
                            });
                        }
                        }catch(e){
                            console.error(e);
                        }
                    }
                    if(data.risposta.length==0){
                        verificaInvioDocumentiInCorso = false;
                    }
                }else{
                    verificaInvioDocumentiInCorso = false;
                }


            }, documentiIndex.risposta, 'caricamentoDati', true,(res)=>{
                erroreCaricamentoDocumenti=res;
                verificaInvioDocumentiInCorso = false;
                if (typeof input === 'object') {
                    input.disabled = false;
                    input.classList.remove('button--loading');
                    input.innerHTML=tmp;
                    for(var i = 0; i < input.childNodes.length; i++){
                        if(input.childNodes[i].tagName === "IMG"){
                            input.childNodes[i].src="img/attention.svg";
                            break
                        }
                    }
                }
            });
            if(result==false){
                verificaInvioDocumentiInCorso = false;
                if (typeof input === 'object') {
                    input.disabled = false;
                    input.classList.remove('button--loading');
                    input.innerHTML=tmp;
                    input.src="img/attention.svg";
                }
            }
        });
    } catch (e) {
        verificaInvioDocumentiInCorso = false;
        if (typeof input === 'object') {
            input.disabled = false;
            input.classList.remove('button--loading');
            input.innerHTML=tmp;
            input.src="img/attention.svg";
        }
        console.error(e)
    }
}
var timerRicerca;
function ricercaCodiceListaVeBa(input) {

    if (timerRicerca) {
        clearTimeout(timerRicerca);
    }
    if (input.value == '') {
        comboScomparsaChiudi(input)
        return;
    }
    timerRicerca = setTimeout(function () {
        if (xParametriCassa.modOffline == true) {
            if (input.value.length >= 2) {
                var listaCodiciAggiuntivi = new Array();
                var jsonList = new Array();

                ciclaTabellaIndexedDBSemplice('codiciAggiuntivi', input.value.toUpperCase(), function (codiciAggiuntivi) {
                    for (var x of codiciAggiuntivi) {
                        listaCodiciAggiuntivi.push(x.CODICEPRIMARIO);
                    }
                    ciclaTabellaIndexedDBSemplice('dbArticoli', input.value.toUpperCase(), function (codiciPrimari) {
                        for (var x of codiciPrimari) {
                            if (listaCodiciAggiuntivi.indexOf(x.CODICE) == -1) {
                                listaCodiciAggiuntivi.push(x.CODICE);
                            }

                        }
                        
                        var cont = 0;
                        for (var x of listaCodiciAggiuntivi) {
                            leggiTabellaIndexedDBSemplice('dbArticoli', x, (res) => {
                                cont++;
                                
                                if (res.risposta[0] != 0) {

                                    jsonList.push({
                                        "CODICE": res.risposta.CODICE.toString(),
                                        "DESCRIZIONE": res.risposta.DESCRIZIONE.toString(),
                                        "GIAC": '0'.toString()
                                    })
                                }
                                if (cont == listaCodiciAggiuntivi.length) {
                                    localStorage.setItem('jsonTmpArticoliVeBa.json', JSON.stringify(jsonList));
                                    attivaRicercaComboScomparsa(input, 'articoliVeBa', 'ulArticoliCodice', 'jsonTmpArticoliVeBa.json');
                                }
                            });

                        }



                    }, obj = { limite: 10 });
                }, obj = { limite: 10 });
            }
        } else {
            attivaRicercaComboScomparsa(input, 'articoliVeBa', 'ulArticoliCodice')
        }
    }, 500);
}
function aggiungiEuro(valore){
    if(valore==''){
        return '';
    }
    var input=document.getElementById('importoContanti')
    input.value=arrotonda(Number(input.value)+Number(valore),2);
    aggiornaResto();
}
function scrollMenuDown(idUl) {
    var menu = document.getElementById(idUl);
    // var scrollAmount = 400; // Imposta il valore di scorrimento (in pixel)
    
    menu.scrollTop += menu.scrollHeight;;
  }
//verifico e imposto l'ultima data di aggiornamento totale delle tabelle 
function verificaDataUltimoAggiornamentoTabelle(){
    var dataUltimoAggiornamentoTabelle=localStorage.getItem('dataUltimoAggiornamentoTabelle');
    if(dataUltimoAggiornamentoTabelle==null){
        localStorage.setItem('dataUltimoAggiornamentoTabelle',oggiISO());
        // downloadPulitoTabelle();
        aggiornaDatiArticoli(true)
    }else{
        var resControllo=isMoreThanOneDay(dataUltimoAggiornamentoTabelle,oggiISO());
        if(resControllo==true){
            localStorage.setItem('dataUltimoAggiornamentoTabelle',oggiISO());
            // downloadPulitoTabelle();
            aggiornaDatiArticoli(true)
        }
    }

}
function isMoreThanOneDay(date1, date2) {
    // Converto le date in oggetti Date di JavaScript
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calcolo la differenza in millisecondi
    const diff = Math.abs(d1 - d2);

    // Converto la differenza da millisecondi a giorni
    const diffInDays = diff / (1000 * 60 * 60 * 24);

    // Ritorno true se la differenza è maggiore di un giorno, false altrimenti
    return diffInDays >= 1;
}

function downloadPulitoTabelle(){
    
    var lista = 'clienti,parametri,codiciAggiuntivi,articoli,aggiornaTokenOnline';
    var input=document.getElementById('btnAggiornaOffline');
    input.disabled = true;
    input.classList.add('button--loading');
    var tmp=input.innerHTML;
    input.innerHTML='';
    aggiornaTabelleOffline(lista,false,()=>{
        input.disabled = false;
        input.classList.remove('button--loading');
        input.innerHTML=tmp;
    })
    avviaCarDati("listaDocumentiVeBa");
    avviaCarDati("depositi");
    avviaCarDati("listaPagamenti");
}
function inserimentoRigaVeBa(aggiornaDocumentoProdotti = true, aggiornaTotali = true, codice, descrizione, prezzoUnitario, piva, idIva, quantità = '', um, costo, rigaInput = '', prezzoIntero = '', sc1 = '0', sc2 = '0', sc3 = '0', sc4 = '0', sc5 = '0', gestioneLotti = false,coloreRiga='') {
    var importo = calcolaImporto(prezzoUnitario, quantità, sc1, sc2, sc3, sc4, sc5);
    try {
        if (aggiornaDocumentoProdotti) {
            var rigaMovimento = {
                'codice': codice,
                'descrizione': descrizione,
                'listino': prezzoUnitario,
                'percIva': Number(piva),
                'idIva': idIva,
                'qu': quantità,
                'importo': importo,
                'um': um,
                'costo': costo,
                'movIvaInc': documentoIvaInclusa,
                'prezzoIntero': prezzoIntero,
                'sconti': sc1 + '+' + sc2 + '+' + sc3 + '+' + sc4 + '+' + sc5,
                'gestioneLotti': gestioneLotti,
                'coloreRiga': coloreRiga
            }
            var nrRiga = aggiungiMovimento(rigaMovimento, '', identificativoDoc);
            if (isNaN(nrRiga)) {
                attivaAlert(xTipoAllert.CRITICO, 'Errore inserimento Riga ');
                return false;
            }
        } else {
            nrRiga = rigaInput;
        }
        // var dataTmp=documento[identificativoDoc].prodotti.data;
        
        if(documentoIvaInclusa==false){
            var importoVideo=importo*(1+(piva/100));
        }else{
            var importoVideo=importo;
        }
        var obj = {
            'tipo': 'visDatoDisplay',
            'dati': {
                'articolo': descrizione,
                'listino': formattaNumeri(arrotonda(importoVideo, 2), 2, 2)
            }
        }
        if (aggiornaTotali) {

            datiRegCassa(obj, true);
            aggiornaTotale(documento[identificativoDoc].totali, rigaMovimento, 1, null, null, null, documentoIvaInclusa);
            if(xParametriCassa.modSupermercato==true && aggiornaDocumentoProdotti==true)
            {
                var resVerifica=verificaTotaliIva();
                if(resVerifica==false){
                    eliminaRiga(nrRiga);
                    if(xParametriCassa.emettiSuonoCodiceErrato==true){
                        datiRegCassa('emettiSuono', true);
                    }
                    return;
                }
            
            }
        }

        aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
        popolaElencoDaJson(documento[identificativoDoc].prodotti.data, 'divRigheDocumento', 0, 'venditaBanco.html:RIGADOCUMENTO', true, 0);
        scrollMenuDown('divRigheDocumento');
        
        return nrRiga;
    } catch (e) {
        console.error(e);
        attivaAlert(2, e + ' fncinserimentoRiga()', 'INSERIMENTO RIGA VEBA');
    }
}
function aggiungiLotto(rigaRif, lotto, quantità, scadenza, aggiungiADocumento = true, nrRigaLotto = '') {
    try {
        var lotto = lotto;
        var scadenza = scadenza;
        if (lotto == '') {

            attivaAlert(xTipoAllert.ESCLAMAZIONE, "ATTENZIONE, CAMPO LOTTO VUOTO");
            return;
        }
        if (scadenza == '' || !isDate(scadenza)) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "ATTENZIONE, CAMPO SCADENZA VUOTO O ERRATO");
            return;

        }
        if (quantità == '') {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "ATTENZIONE, CAMPO QUANTITA VUOTO O ERRATO");
            return;
        }
        if (aggiungiADocumento) {
            var obj = {
                'lotto': lotto,
                'quantità': quantità,
                'scadenza': scadenza
            }

            var nMovLotto = aggiungiMovimentiLotti(obj, rigaRif, identificativoDoc);
            modificaRigaLotti(rigaRif);
        } else {
            var nMovLotto = nrRigaLotto;
        }

        var li = `<li id="lotto-${nMovLotto}" name="" class="w100-10p clrSfumatoChiaro elementiGriglia marg5Bottom tableStyle testoNero " onclick="">
  <div class="padTop5 testoNormale">
        <div class="row w100-30p">
            <div class="row w100-100p col6" >
                <div id="lotto" class="w100 testoTroncato1">Lotto - ${lotto}</div>
                <div class="w100 testoTroncato1">Scadenza - ${scadenza}</div>
            </div>
            <div class="row w80p col6">Quantità : ${quantità}</div>
        </div>    
        <div class="w30p row padTop5">
            <img src="img/Nere/cestino.svg" style="height:45px;position:initial;" onclick="rimuoviMovimentoLotto(${rigaRif},${nMovLotto})">
        </div>
  </div>
  
</li>`;
        if (aggiungiADocumento) {
            document.getElementById('elencoLotti').innerHTML += li;

        } else {
            return li;
        }
        pulisciCampiLotto();
    } catch (e) {
        console.error(e);
        attivaAlert(xTipoAllert.ESCLAMAZIONE, e);
    }


}
function pulisciCampiLotto() {
    document.getElementById('txtScadenza').value = '';
    document.getElementById('txtCodiceLotto').value = '';
    document.getElementById('txtQtaLotto').value = '';
}
function rimuoviMovimentoLotto(riferimentoRiga, riferimentoLotto) {
    documento[identificativoDoc].prodotti.data[riferimentoRiga].movLotti[riferimentoLotto] = {};
    modificaRigaLotti(riferimentoRiga);
    var x = document.getElementById('lotto-' + riferimentoLotto);
    x.remove();

}
function modificaRigaLotti(indice) {
    aggiornaTotale(documento[identificativoDoc].totali, documento[identificativoDoc].prodotti.data[indice], -1, null, null, null, documento[identificativoDoc].prodotti.data[indice].movIvaInc);
    var quTmp = 0;
    for (var l in documento[identificativoDoc].prodotti.data[indice].movLotti) {
        if (!isEmpty(documento[identificativoDoc].prodotti.data[indice].movLotti[l]) && documento[identificativoDoc].prodotti.data[indice].movLotti[l] != undefined) {
            quTmp += Number(formattaNumeriInput(arrotonda(documento[identificativoDoc].prodotti.data[indice].movLotti[l].qu, 2), 2, 2))
        }
    }
    documento[identificativoDoc].prodotti.data[indice].qu = Number(quTmp);
    var sc = (documento[identificativoDoc].prodotti.data[indice].sconti).split("+");
    documento[identificativoDoc].prodotti.data[indice].importo = calcolaImporto(documento[identificativoDoc].prodotti.data[indice].listino, documento[identificativoDoc].prodotti.data[indice].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
    document.getElementById('quantitàRiga-' + indice).innerText = (documento[identificativoDoc].prodotti.data[indice].qu);
    document.getElementById('importoRiga-' + indice).innerText = (formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indice].importo, 2), 2, 2));
    aggiornaTotale(documento[identificativoDoc].totali, documento[identificativoDoc].prodotti.data[indice], 1, null, null, null, documentoIvaInclusa);
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
}
function aggiornaTotaleVideo(importo) {
    if(importo==-0){
        importo=0;
    }
    var importoBuono=0
    if(xParametriCassa.modSupermercato==true){
        importoBuono=Number(document.getElementById('importoBuonoDaReso').innerHTML);   
        importoBuono=isNaN(importoBuono)?0:importoBuono;
    }
    document.getElementById('totaleDocumentoVenditaBanco').innerHTML = formattaNumeri(importo-importoBuono, 2, 2);
}

function eliminaRiga(indice) {
    if(documento[identificativoDoc].prodotti.data[indice].codice=='AB'){
        var importoBuono=documento[identificativoDoc].prodotti.data[indice].importo;
        if(documento[identificativoDoc].prodotti.data[indice].movIvaInc==false){
            importoBuono=importoBuono*(1+arrotonda(documento[identificativoDoc].prodotti.data[indice].percIva/100,2));
        }
        importoBuono=importoBuono*-1;
        document.getElementById('importoBuonoSconto').innerHTML=arrotonda(Number(document.getElementById('importoBuonoSconto').innerHTML)+Number(arrotonda(importoBuono,2)),2);
    }
    aggiornaTotale(documento[identificativoDoc].totali, documento[identificativoDoc].prodotti.data[indice], -1, null, null, null, documento[identificativoDoc].prodotti.data[indice].movIvaInc);
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
    documento[identificativoDoc].prodotti.data[indice] = {};
    documentoLocal();
    popolaElencoDaJson(documento[identificativoDoc].prodotti.data, 'divRigheDocumento', 0, 'venditaBanco.html:RIGADOCUMENTO', true, 0);
    
  
}
function modificaRiga(indice) {
    if (document.getElementById('quantitàVeBaMod').value == '' || document.getElementById('quantitàVeBaMod').value == 0 || document.getElementById('quantitàVeBaMod').value == isNaN || document.getElementById('quantitàVeBaMod').value > 1000) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Inserire una quantità valida');
        return;
    }
    if(documento[identificativoDoc].prodotti.data[indice].codice=='AB'){
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Non è possibile modificare il buono sconto');
        return;
    }
    aggiornaImportoRiga();  
    if (documento[identificativoDoc].prodotti.data[indice].listino != document.getElementById('prezzoUnitarioVeBaMod').value) {
        documento[identificativoDoc].prodotti.data[indice].prezzoIntero = formattaNumeriInput(arrotonda(document.getElementById('prezzoUnitarioVeBaMod').value, 5), 5, 5);
    }
    aggiornaTotale(documento[identificativoDoc].totali, documento[identificativoDoc].prodotti.data[indice], -1, null, null, null, documento[identificativoDoc].prodotti.data[indice].movIvaInc);
    documento[identificativoDoc].prodotti.data[indice].codice = document.getElementById('codiceArticoloVeBaMod').value
    documento[identificativoDoc].prodotti.data[indice].descrizione = document.getElementById('descrizioneArticoloVeBaMod').value
    documento[identificativoDoc].prodotti.data[indice].listino = document.getElementById('prezzoUnitarioVeBaMod').value
    documento[identificativoDoc].prodotti.data[indice].qu = document.getElementById('quantitàVeBaMod').value
    documento[identificativoDoc].prodotti.data[indice].sconti = document.getElementById('sc1ModRiga').value + '+' + document.getElementById('sc2ModRiga').value + '+' + document.getElementById('sc3ModRiga').value + '+' + document.getElementById('sc4ModRiga').value + '+' + document.getElementById('sc5ModRiga').value;
    documento[identificativoDoc].prodotti.data[indice].importo = document.getElementById('importoVeBaMod').value;
    if (document.getElementById('depositoRiga').value != '') {
        documento[identificativoDoc].prodotti.data[indice].deposito = document.getElementById('depositoRiga').value;
    }

    document.getElementById('codiceRiga-' + indice).innerHTML = documento[identificativoDoc].prodotti.data[indice].codice;
    document.getElementById('descrizioneRiga-' + indice).innerHTML = documento[identificativoDoc].prodotti.data[indice].descrizione;
    document.getElementById('prezzoUnitarioRiga-' + indice).innerHTML = (documentoIvaInclusa ? formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indice].listino, 2), 2, 2) : formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indice].listino, decimaliPrezzi), decimaliPrezzi, 2));
    document.getElementById('importoRiga-' + indice).innerHTML = formattaNumeri(arrotonda(documento[identificativoDoc].prodotti.data[indice].importo, 2), 2, 2);
    document.getElementById('quantitàRiga-' + indice).innerHTML = documento[identificativoDoc].prodotti.data[indice].qu;
    aggiornaTotale(documento[identificativoDoc].totali, documento[identificativoDoc].prodotti.data[indice], 1, null, null, null, documentoIvaInclusa);
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
    richiamaModal('modalBg');
    documentoLocal();
}
function aumentaQuantità() {
    var input = document.getElementById('quantitàVeBaMod');
    input.value = Number(input.value) + 1;
    aggiornaImportoRiga();
}
function diminuisciQuantità() {

    var input = document.getElementById('quantitàVeBaMod');

    if (Number(input.value) - 1 == -1) {
        attivaAlert(5, 'Sei sicuro di voler scendere sotto 0? <u>l\'importo andrà in negativo</u>', 'rspDiminuisciQuantità_' + 'false')
    } else {
        input.value = Number(input.value) - 1;
        aggiornaImportoRiga();
    }


}
function rspDiminuisciQuantità(risp) {
    if (risp == 'Si') {
        var input = document.getElementById('quantitàVeBaMod');
        input.value = Number(input.value) - 1;
        aggiornaImportoRiga();
    } else {
        chiudiModalAlert("rispDiminuisciQuantità")
    }
}
function aggiornaImportoRiga() {
    var listino = document.getElementById('prezzoUnitarioVeBaMod').value;
    var qta = document.getElementById('quantitàVeBaMod').value;
    var sc1 = document.getElementById('sc1ModRiga').value;
    var sc2 = document.getElementById('sc2ModRiga').value;
    var sc3 = document.getElementById('sc3ModRiga').value;
    var sc4 = document.getElementById('sc4ModRiga').value;
    var sc5 = document.getElementById('sc5ModRiga').value;
    var importo = calcolaImporto(listino, qta, sc1, sc2, sc3, sc4, sc5);
    document.getElementById('importoVeBaMod').value = importo;
}
function pulisciSchermataVeBa() {
    // inizializzaDocumento(true, false);
    delete documento[identificativoDoc]
    creaDocumento();
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
    document.getElementById('divRigheDocumento').innerHTML = '';
    hide('divDestinazioniCliente')
    for (var [k, v] of Object.entries(query['venditaBanco.html']['oggetti'])) {
        if (xParametriCassa[v] != undefined) {
            document.getElementById(k).value = xParametriCassa[v];
        } else {
            document.getElementById(k).value = '';
        }
    }
    document.getElementById('cmbClienti').removeAttribute('idragionesociale');
    document.getElementById('btnRichiamaDocumento').classList.remove('pulsanteVeBaAttivo');
    if(localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione)!=undefined){
        document.getElementById('listaPagamenti').value=localStorage.getItem('tipoPagamentoPredefinito.'+xIdConfigurazione);
    }
    
    // document.getElementById('ricercaArticoloVenditaBanco').value='';
    popolaCampiBaseVeBa();
    if(xParametriCassa.modSupermercato==true){
        if(document.getElementById('btnBuonoScontrino').classList.contains('pulsanteVeBaAttivo')){
            document.getElementById('btnBuonoScontrino').classList.remove('pulsanteVeBaAttivo');
            document.getElementById('importoBuonoDaReso').innerHTML=0;
        }
        if(document.getElementById('btnBuonoScontoScontrino').classList.contains('pulsanteVeBaAttivo')){
            document.getElementById('btnBuonoScontoScontrino').classList.remove('pulsanteVeBaAttivo');
            document.getElementById('importoBuonoSconto').innerHTML=0;
        }
    }
}
function pulisciRicercaPrezzo() {
    var input = document.getElementById('ricercaPrezzoVeBa');
    input.value = '';
    document.getElementById('resultRicercaPrezzoVeBa').innerHTML = '';
    input.focus();
    var btn=document.getElementById('modalSmpulsanteConfermaModal')
    btn.value='Inserisci';
    btn.setAttribute('onclick',"cercaCodiceVeBa(document.getElementById(\'ricercaPrezzoVeBa\'))")
}
function gestBtnPagamento(btnCorrispondente) {
    
    var a = document.getElementById(btnCorrispondente).value;
    var restante = (documento[identificativoDoc].totali.tDoc - (Number(recuperaValueElemento('importoContanti')) + Number(recuperaValueElemento('importoPos')) + Number(recuperaValueElemento('importoAssegno')) + Number(recuperaValueElemento('importoCredito')) + Number(recuperaValueElemento('importoBuono')))) - Number(recuperaValueElemento(btnCorrispondente));
    var restante = (Math.round(restante * 100)) / 100;
    if(btnCorrispondente=='importoBuono'){
        if(a>0){
            document.getElementById(btnCorrispondente).value = 0;    
        }else{
            document.getElementById(btnCorrispondente).value = Number(document.getElementById('importoBuonoDaReso').innerHTML.replace(/,/g, '.'));
        }
        aggiornaResto()
        return;
    }
    if (a == documento[identificativoDoc].totali.tDoc || a > 0) {

        document.getElementById(btnCorrispondente).value = 0
        document.getElementById(btnCorrispondente).focus();
    } else if ((a == 0 || a < documento[identificativoDoc].totali.tDoc) && restante > 0) {
        document.getElementById(btnCorrispondente).value = formattaNumeriInput(arrotonda(restante, 2), 2, 2);
    }
    aggiornaResto()
}
function aggiornaValoriFoglioCassa() {
    var contanti = Number((document.getElementById('totContante').value).replace(/,/g, '.'));
    var prelievi = Number((document.getElementById('totPrelievi').value).replace(/,/g, '.'));

    var pos = Number((document.getElementById("totPos").value).replace(/,/g, '.'));
    var assegni = Number((document.getElementById("totAssegni").value).replace(/,/g, '.'));
    var totScontrinato = Number((document.getElementById("totScontrinato").value).replace(/,/g, '.'));
    var totFattureIncassate = Number((document.getElementById("totFattureIncassate").value).replace(/,/g, '.'));
    var totAltriIncassi = Number((document.getElementById("totAltriIncassi").value).replace(/,/g, '.'));
    var totPagamenti = Number((document.getElementById("totPagamenti").value).replace(/,/g, '.'));
    var totAnnulli=Number((document.getElementById("totImportoAnnulli").value).replace(/,/g, '.'));
    var totResi=Number((document.getElementById("totImportoResi").value).replace(/,/g, '.'));
    var saldoContante = (contanti - prelievi);
    document.getElementById('saldoContante').value = formattaNumeriInput(arrotonda(saldoContante, 2), 2, 2);

    // var totContato = saldoContante + pos + assegni;
    // document.getElementById("totContato").value = formattaNumeriInput(arrotonda(totContato, 2), 2, 2);
    var totBuoniIncassati=Number((document.getElementById("totBuoniIncassati").value).replace(/,/g, '.'));
    if(totAnnulli<0){
        totAnnulli=totAnnulli*-1;
    }
    var totIncasso = (totScontrinato + totFattureIncassate + totAltriIncassi ) - (Number(totPagamenti)+Number(totAnnulli)+Number(totBuoniIncassati)) ;
    //totale incassato teorico
    
    document.getElementById('totIncasso').value = formattaNumeriInput(arrotonda(totIncasso, 2), 2, 2);

    // document.getElementById("totDifferenza").value = formattaNumeriInput(arrotonda((totIncasso - totContato), 2), 2, 2);
    document.getElementById("totDifferenza").value=arrotonda(Number(document.getElementById("totContato").value)-totIncasso);
}
function aggiornaResto() {
    var contanti = Number(recuperaValueElemento('importoContanti'));
    var pos = Number(recuperaValueElemento('importoPos'));
    var assegni = Number(recuperaValueElemento('importoAssegno'));
    var credito = Number(recuperaValueElemento('importoCredito'));
    var buono=Number(recuperaValueElemento('importoBuono'));
    var totalePagamento = contanti + pos + assegni + credito+buono;
    var resto = totalePagamento - documento[identificativoDoc].totali.tDoc;

    if (resto > 0) {
        document.getElementById('totaleResto').innerHTML = formattaNumeri(arrotonda(resto, 2), 2, 2);
        document.getElementById('RestoPrecedente').innerHTML = 'Resto P. ' + formattaNumeri(arrotonda(resto, 2), 2, 2);
    } else {
        document.getElementById('totaleResto').innerHTML = '0,00';
        document.getElementById('RestoPrecedente').innerHTML = '';
    }

}
function inserimentoProdotti(idImporto, tipo = '', idIva) {
    var percIva = codiciIva[recuperaValueElemento(idIva)].piva;
    var idIva = recuperaValueElemento(idIva);
    inserimentoRigaVeBa(true, true, articoliPredefiniti[tipo].codice, articoliPredefiniti[tipo].descrizione, Number(recuperaValueElemento(idImporto)), Number(percIva), idIva, 1, 'NR', 0, '', Number(recuperaValueElemento(idImporto)), '0', '0', '0', '0', '0', false);
    richiamaModal('modalSm')
}

function aggiungiConto() {
    // inizializzaDocumento(true);
    creaDocumento();
    popolaVeBaDaDocumento();
    pulisciSchermataVeBa();
    richiamaModal('modalMd');
    // selezionaDocumento(listaDocumenti.length);
}
function richiamaDocumentoSuVeBa() {
    if (!isEmpty(documentoTmp)) {
        // if(xParametriCassa.modSupermercato==true){
        //     delete documentoTmp.testata.id;
        //     delete documentoTmp.testata.identificativoVeBa;
        //     delete documentoTmp.testata.numero;
        // }
        var tmpId = documento[identificativoDoc].identificativo;
        
        documento[identificativoDoc] = documentoTmp;
        documento[identificativoDoc].identificativo = tmpId;
        documentoTmp = {}
        popolaVeBaDaDocumento();
        popolaTestataVeBa();

        document.getElementById('btnRichiamaDocumento').classList.add('pulsanteVeBaAttivo')
        richiamaModal('modalMd');
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'SELEZIONARE UN DOCUMENTO VALIDO');
    }
}

function listaConti() {
    document.getElementById('listaDocumentiAttivi').innerHTML = '';
    var li = ``;

    for (var [k, v] of Object.entries(documento)) {
        li += `<li>
    <a class="">
        <div class="row w100-70p" onclick="selezionaDocumento('${k}');popolaVeBaDaDocumento();richiamaModal('modalMd');">
            <div id="45" name="lc45" class="row w85">${v.prodotti.data.length} - Totale Documento € ${formattaNumeri(arrotonda(v.totali.tDoc, 2), 2, 2)} </div>
        </div>
        <div class="row w70p marg5Top" onclick="">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="attivaAlert(5,'Sei sicuro di voler eliminare il documento selezionato?','rspEliminaDocumento_'+'${k}')" style="display:block; margin:5px auto;">
        </div>
    </a>
</li>`;

    }
    document.getElementById('listaDocumentiAttivi').innerHTML = li;
}
function popolaVeBaDaDocumento() {
    document.getElementById('divRigheDocumento').innerHTML = '';
    popolaElencoDaJson(documento[identificativoDoc].prodotti.data, 'divRigheDocumento', 0, 'venditaBanco.html:RIGADOCUMENTO', true, 0);
    scrollMenuDown('divRigheDocumento');
    if(documento[identificativoDoc].totali.stringaBuono!=undefined ){
        gestionePulsanteBuono(documento[identificativoDoc].totali.stringaBuono)
    }else{
        gestionePulsanteBuono('')
    }
    if(documento[identificativoDoc].totali.totaleBuonoSconto!=undefined ){
        gestionePulsanteAbSconto(documento[identificativoDoc].totali.totaleBuonoSconto)
    }else{
        gestionePulsanteAbSconto('')
    }
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);    
    
}
function popolaTestataVeBa() {
    if (documento[identificativoDoc].testata != undefined) {
        if (documento[identificativoDoc].testata.idCliente != undefined && documento[identificativoDoc].testata.idCliente != '') {

            document.getElementById('cmbClienti').setAttribute('idragionesociale', documento[identificativoDoc].testata.idCliente)
        }
        if (documento[identificativoDoc].testata.idTipo != undefined && documento[identificativoDoc].testata.idTipo != '') {

            cambiaSelezioneSelect("listaDocumentiVeBa", documento[identificativoDoc].testata.idTipo);
        }
        if (documento[identificativoDoc].testata.ragioneSociale != undefined && documento[identificativoDoc].testata.ragioneSociale != '') {

            document.getElementById('cmbClienti').value = documento[identificativoDoc].testata.ragioneSociale;
        }
        if (documento[identificativoDoc].testata.idPagamento != undefined && documento[identificativoDoc].testata.idPagamento != '') {
            document.getElementById('listaPagamenti').value = documento[identificativoDoc].testata.idPagamento;
        }
        if (documento[identificativoDoc].testata.idAgente != undefined && documento[identificativoDoc].testata.idAgente != '') {
            document.getElementById('cmbAgente').value = documento[identificativoDoc].testata.idAgente;
        }
        if (documento[identificativoDoc].testata.idDest != undefined && documento[identificativoDoc].testata.idDest != 0) {
            document.getElementById('destinazioniCliente').value = documento[identificativoDoc].testata.idDest;
            document.getElementById('divDestinazioniCliente').style.display = 'block';
        }
    }
}
function rspEliminaDocumento(risp, id) {
    if (risp == 'Si') {
        // eliminaDocumento(id);

        cont=0;
        for (var [k, v] of Object.entries(documento)) {
            cont++;
        }
        if(id==identificativoDoc){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'NON è POSSIBILE ELIMINARE IL DOCUMENTO SELEZIONATO POICHè ATTIVO'.toUpperCase());
            return;
        }
        if(cont>1){
            delete documento[id];
            listaConti();
        }
        
    } else {
        chiudiModalAlert("rspEliminaDocumento")
    }
}
function richiestaAmministratore(callback) {
    if (xGruppoUtente != 'Amministratori') {
        var parametri = {
            "tipoRisposta": "select",
            "tipoQuery": "elencoAmministratori",
            "idConfigurazione": xIdConfigurazione,
            "nomeTabella": "elencoAmministratori",
        };
        fncTmpAmministratore = callback;
        inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
            var resp = JSON.parse(dati)
            richiamaModal('modalSm', 'Autorizzazione');
            var list = ''
            for (var n of resp.risposta) {
                list += '<option value="' + n.username + '" email="' + n.email + '" onclick="setAttributeOnClick(this,\'listaAmministratori\',\'email\')">' + n.username + '</option>'
            }
            document.getElementById('listaAmministratori').innerHTML = list;
            show('modalSmpulsanteConfermaModal');
            document.getElementById('modalSmpulsanteConfermaModal').setAttribute('onclick', 'confermaAmministratore();richiamaModal(\'modalSm\');')
        })
    } else {
        fncTmpAmministratore = callback;
        eval(fncTmpAmministratore);
    }
}
function confermaAmministratore() {
    var parametri = {
        "tipoRisposta": "select",
        "tipoQuery": "autorizzazioneAmministratore",
        "idConfigurazione": xIdConfigurazione,
        'idDispositivo': xIdDispositivo,
        'userName': document.getElementById('listaAmministratori').value,
        'password': document.getElementById('passwordAmministratore').value,
        "nomeTabella": "autorizzazioneAmministratore",
    };
    inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
        var ris = JSON.parse(dati);
        if (ris.risposta.result) {
            eval(fncTmpAmministratore);
        }
    });

}

//SALVATAGGIO DOCUMENTO
function controlloDocumentoVeBa() {
    try {
        var documentoVuoto = true;
        var movimentiLottiVuoti = false;
        var doc = verificaTipoDocumento(true,false);
        if (doc == false) {
            return false;
        }
        for (var n in documento[identificativoDoc].prodotti.data) {
            if (documento[identificativoDoc].prodotti.data[n].qu == 0) {
                eliminaRiga(n)
            }
            if (!isEmpty(documento[identificativoDoc].prodotti.data[n])) {
                var documentoVuoto = false;
            }
            if (documento[identificativoDoc].prodotti.data[n].gestioneLotti == true && doc.gestioneLotti == true) {

                movimentiLottiVuoti = true;
                var rifCodiceNoLottoTmp = documento[identificativoDoc].prodotti.data[n].codice;
                for (var l in documento[identificativoDoc].prodotti.data[n].movLotti) {
                    if (!isEmpty(documento[identificativoDoc].prodotti.data[n].movLotti[l])) {

                        var movimentiLottiVuoti = false;

                        break;
                    }
                }
            }

        }
        if (documentoVuoto) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione Documento vuoto!');
            return;
        }
        if (documento[identificativoDoc].totali.tDoc < 0) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Impossibile salvare un documento con totale in negativo');
            return;
        }
        var idTipo = document.getElementById('listaDocumentiVeBa').value;
        if (idTipo == '' || idTipo == undefined || idTipo == '0') {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "Causale Documento non selezionata!");
            return;
        }
      

        if (xParametriCassa.depositi == undefined && document.getElementById('depositi').value == '' && doc.deposito == 0) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "Selezionare un deposito valido");
            return;
        }
        if (movimentiLottiVuoti == true) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, "Presente articolo che gestisce lotti ,senza alcun lotto selezionato riferimento codice: " + rifCodiceNoLottoTmp);
            return;
        }

        if (doc.gestIncasso) {
            richiamaModal('modalBg', 'Pagamento');
            visualizzaTotaleDisplay();
            document.getElementById('importoContanti').focus();
            // gestioneSelectTipoDocumento('blocca');
        } else {

            salvaDocumentoVeBa();
        }
    } catch (e) {
        console.error(e);
        attivaAlert(2, 'Impossibile emettere il documento <br>' + e);
    }
}
var controlloSalvaDocumento=false;
function salvaDocumentoVeBa() {

    try {
        if(controlloSalvaDocumento==true){
            return;
        }else {
            controlloSalvaDocumento=true;
        }
        var doc = verificaTipoDocumento();
        if (doc == false) {
            controlloSalvaDocumento=false;
            return false;
        }
        if (xParametriCassa.depositi != undefined) {
            var deposito = xParametriCassa.depositi;
        } else if (document.getElementById('depositi').value != '') {
            var deposito = document.getElementById('depositi').value;
        } else if (doc.deposito != 0) {
            var deposito = doc.deposito;
        } else {
            var deposito = '';
        }
        if(document.getElementById('importoPos')!=null){
            if(Number( (document.getElementById('importoPos').value).replace(/,/,''))!=0){
                if(Number( (document.getElementById('importoPos').value).replace(/,/,''))>documento[identificativoDoc].totali.tDoc){
                    attivaAlert(xTipoAllert.ESCLAMAZIONE, "Importo Pos superiore al totale documento!");
                    controlloSalvaDocumento=false;
                    return;
                }
            }
        }
        
        var tstVeBa = {
            genere: doc.genere,
            idTipo: doc.idTipo,
            idAgente: document.getElementById('cmbAgente').value,
            idCliente: document.getElementById('cmbClienti').getAttribute('idragionesociale'),
            deposito: deposito,
            ivaInc: doc.ivaInc
        }
        if (doc.gestIncasso == false || (xParametriCassa.modSupermercato==true && doc.genere==0)) {
            var pagamento = document.getElementById('listaPagamenti').value;
            if (pagamento == '') {
                pagamento = 0
            }
            tstVeBa.idPagamento = pagamento;
            localStorage.setItem('tipoPagamentoPredefinito.'+xIdConfigurazione,document.getElementById('listaPagamenti').value);
        }
        if (document.getElementById('destinazioniCliente').value != '' && document.getElementById('destinazioniCliente').value != 0) {
            tstVeBa.idDest = document.getElementById('destinazioniCliente').value;
        }
        txtContanti = document.getElementById('importoContanti');
        
        if (txtContanti != null) {
            if(isNumber(document.getElementById('importoContanti').value)==false){
                attivaAlert(xTipoAllert.ESCLAMAZIONE, "Importo Contanti non valido!");
                controlloSalvaDocumento=false;
                return;
            }
            tstVeBa.contanti = document.getElementById('importoContanti').value;
            var totaleResto=Number(document.getElementById('totaleResto').innerText.replace(/,/,'.'));
            if(totaleResto>0 && tstVeBa.contanti>0 && isNaN(totaleResto)==false){
                tstVeBa.contanti=tstVeBa.contanti-totaleResto;
            }
        } else {
            tstVeBa.contanti = 0;
        }
        if (txtContanti != null) {
            tstVeBa.contantiCassa = document.getElementById('importoContanti').value;
        } else {
            tstVeBa.contantiCassa = 0;
        }
        txtAssegni = document.getElementById('importoAssegno');
        if (txtAssegni != null) {
            tstVeBa.assegni = document.getElementById('importoAssegno').value;
        } else {
            tstVeBa.assegni = 0;
        }

        txtPos = document.getElementById('importoPos');
        if (txtPos != null) {
            if(isNumber(document.getElementById('importoPos').value)==false){
                attivaAlert(xTipoAllert.ESCLAMAZIONE, "Importo Pos non valido!");
                controlloSalvaDocumento=false;
                return;
            }
            tstVeBa.pos = document.getElementById('importoPos').value;
        } else {
            tstVeBa.pos
        }

        txtCredito = document.getElementById('importoCredito')
        if (txtCredito != null) {
            if(isNumber(document.getElementById('importoCredito').value)==false){
                attivaAlert(xTipoAllert.ESCLAMAZIONE, "Importo Credito non valido!");
                controlloSalvaDocumento=false;
                return;
            }
            tstVeBa.credito = document.getElementById('importoCredito').value
        } else {
            tstVeBa.credito = 0;
        }
        txtBuono = document.getElementById('importoBuono')
        if (txtBuono != null) {
            if(isNumber(document.getElementById('importoBuono').value)==false){
                attivaAlert(xTipoAllert.ESCLAMAZIONE, "Importo Buono non valido!");
                controlloSalvaDocumento=false;
                return;
            }
            tstVeBa.buono = document.getElementById('importoBuono').value
        } else {
            tstVeBa.buono = 0;
        }

        if(Number(tstVeBa.contanti)==0 && Number(tstVeBa.assegni)==0 && Number(tstVeBa.pos)==0 && Number(tstVeBa.credito)==0 && Number(tstVeBa.buono)==0){
            tstVeBa.contanti=documento[identificativoDoc].totali.tDoc;
            tstVeBa.contantiCassa=documento[identificativoDoc].totali.tDoc;
        }else if((Number(tstVeBa.contantiCassa)+Number(tstVeBa.assegni)+Number(tstVeBa.pos)+Number(tstVeBa.credito)+Number(tstVeBa.buono)) <Number(documento[identificativoDoc].totali.tDoc)){
            var totPagamento=(Number(tstVeBa.contantiCassa)+Number(tstVeBa.assegni)+Number(tstVeBa.pos)+Number(tstVeBa.credito)+Number(tstVeBa.buono));
            attivaAlert(xTipoAllert.ESCLAMAZIONE, `<div>Importo Pagamenti inferiore al totale documento!</div><div>Tot Documento : ${formattaNumeri(documento[identificativoDoc].totali.tDoc,2,2)} </div> <div>Tot Pagato : ${formattaNumeri(totPagamento,2,2)}</div>`);
            controlloSalvaDocumento=false;
            return
        }
        var generaBuonoPerDiffereza=false;
       if(tstVeBa.buono>0){
        //x generare buono reso per differenza
            var totDocumento=Number(documento[identificativoDoc].totali.tDoc);
            var totCash=Number(tstVeBa.contantiCassa)+Number(tstVeBa.assegni)+Number(tstVeBa.pos)+Number(tstVeBa.credito);
            if((Number(totCash)+Number(tstVeBa.buono))>totDocumento){
                if(xParametriCassa.modSupermercato==true){
                    // var resto=Number(totDocumento)-(Number(totCash)+Number(tstVeBa.buono));
                    var totDocumento=Number(totDocumento)-Number(totCash);
                    var diffBuono=totDocumento-Number(tstVeBa.buono);
                    if(diffBuono<0){
                        generaBuonoPerDiffereza=true;
                        var restoDif=arrotonda(Number(diffBuono),2);
                        tstVeBa.buono=Number(tstVeBa.buono)+Number(restoDif);
                    }
                }
            }
            tstVeBa.credito=tstVeBa.buono;
            tstVeBa.idConto6=parametriNC.contoCreditiClienti;
       }
       
        if (document.getElementById('selezionaCassa').value != '') {
            tstVeBa.responsabile = document.getElementById('selezionaCassa').value;
        } 
        if (documento[identificativoDoc].testata != undefined) {
            if (documento[identificativoDoc].testata.identificativoVeBa != undefined && documento[identificativoDoc].testata.identificativoVeBa != '') {
                tstVeBa.identificativoVeBa = documento[identificativoDoc].testata.identificativoVeBa;
            }
            if (documento[identificativoDoc].testata.data != undefined && documento[identificativoDoc].testata.data != '') {
                tstVeBa.data = documento[identificativoDoc].testata.data;
            }
            if (documento[identificativoDoc].testata.mezzo != undefined && documento[identificativoDoc].testata.mezzo != '') {
                tstVeBa.mezzo = documento[identificativoDoc].testata.mezzo;
            }
            if (documento[identificativoDoc].testata.noteMagazzino != undefined && documento[identificativoDoc].testata.noteMagazzino != '') {
                tstVeBa.noteMagazzino = documento[identificativoDoc].testata.noteMagazzino;
            }
            if (documento[identificativoDoc].testata.noteUfficio != undefined && documento[identificativoDoc].testata.noteUfficio != '') {
                tstVeBa.noteUfficio = documento[identificativoDoc].testata.noteUfficio;
            }
            if (documento[identificativoDoc].testata.noteVettore != undefined && documento[identificativoDoc].testata.noteVettore != '') {
                tstVeBa.noteVettore = documento[identificativoDoc].testata.noteVettore;
            }
        }
        aggiungiTestata(tstVeBa, identificativoDoc);


        if (invioRegistratoreCassa) {
            if (documento[identificativoDoc].testata.identificativoVeBa.length == 18) {
                attivaAlert(5, 'Sei sicuro di voler riemettere lo scontrino?', 'rspForzaRiemettiScontrino_' + `${doc.gestIncasso}`)
            } else {
                    var msg='';
                    var copie=1;
                    var scontrinoFiscale=false
                    switch (doc.genere){
                         case '0':
                            var msg='SEGUIRA FATTURA ELETTRONICA';
                            var copie=2;
                            var scontrinoFiscale=false;
                            break;
                        case '3':
                            var copie=1;
                            var scontrinoFiscale=false;
                            if(xParametriCassa.modSupermercato==true){
                                var msg='SEGUIRA FATTURA ELETTRONICA ';
                                var copie=2;
                            }
                            break;
                        case '11':
                            var copie=1;
                            var scontrinoFiscale=true;
                            break;
                        default:
                            var scontrinoFiscale=false;
                            var copie=1;
                            var msg='';
                            break;
                        
                    }
                    if(generaBuonoPerDiffereza==true){
                        elaboraDocumentoCassa(true, scontrinoFiscale,'',msg,copie,()=>{setTimeout(() => {
                            generaBuonoReso(restoDif);
                        }, 2000)});
                    }else{
                        elaboraDocumentoCassa(true, scontrinoFiscale,'',msg,copie);
                    }

            }
        }
        else {
            if (xParametriCassa.modOffline == true) {
                salvaDocumentoOffline();
            } else {
                salvaDocumentoSuServer();
            }

        }
        controlloSalvaDocumento=false;
    } catch (e) {
        controlloSalvaDocumento = false;
        console.error(e);
        attivaAlert(2, 'Impossibile emettere il documento <br>' + e);
        return false
    }

}
function rspForzaRiemettiScontrino(risp, docFiscale) {
    if (risp == "Si") {
        elaboraDocumentoCassa(true, docFiscale);
    } else {
        chiudiModalAlert("rspForzaRiemettiScontrino")
    }
}
function recuperaDeposito() {
    var deposito = '';
    if (xParametriCassa.depositi != undefined) {
        deposito = xParametriCassa.depositi;
    } else if (document.getElementById('depositi').value != '') {
        deposito = document.getElementById('depositi').value;
    } else {
        var doc = verificaTipoDocumento(false);
        if (doc != 0 && doc.deposito != undefined && doc.deposito != '') {
            deposito = doc.deposito;
        }
    }
    if (deposito == '') {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, "Attenzione Deposito non selezionato!");
        return false;
        // throw "Deposito non selezionato!";
    }
    return deposito


}
function elaboraRispostaSalvaDocumento(data) {
    
    var input = document.getElementById('ricercaArticoloVenditaBanco');
    var modal = document.getElementById('modalBg');
    if (xParametriCassa.modOffline == true) {
        var risp = { "error": "", "risposta": { "idTes": "" } };
    } else {
        var risp = JSON.parse(data);
    }

    if (risp.error == '') {
        var doc = verificaTipoDocumento(false);
        if (doc.stampaDoc && doc.gestIncasso == false) {
            if (risp.risposta.idTes != '') {
                stampa(risp.risposta.idTes);
            }

        } else {
            input.focus();
        }
        pulisciSchermataVeBa();
        aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
        document.getElementById('divRigheDocumento').innerHTML = '';

        if (modal.style.display != 'none' || modal.style.display != '') {
            modal.style.display = 'none';
        }


    } else {
        attivaAlert(2, data.error, 'ERRORE SALVATAGGIO');
    }
}

function apriMovimentiCassa() {
    richiamaModal('modalBg', 'Movimenti di Cassa');
    movimentiCassa();
    apriFunzioni();
}
function inserimentoMovimentiCassa(idImporto, tipo = 1, idResponsabile) {
    var importo = document.getElementById(idImporto).value;
    if (tipo == 0) {
        var descrizione = "FONDO CASSA";
    } else if (tipo == 1) {
        var descrizione = "Prelievo da Cassa";
    } else if (tipo == 2) {
        var descrizione = "Prelievo da Cassa per Chiusura di Fine serata ";
    }
    var deposito = recuperaDeposito();
    if (deposito == false) {
        return;
    }
    var json = {
        'importo': Number(importo) * -1,
        'contanti': Number(importo) * -1,
        'tipo': tipo,
        'data': oggiISO(),
        'deposito': deposito,
        'descrizione': descrizione,
        "utente": document.getElementById(idResponsabile).value,
    }
    var parametri = {
        "tipoRisposta": "salva",
        "tipoSalva": "movimentiCassa",
        "dati": json
    };

    inviaRichiestaCentralino("salva", parametri, function (res) {
        var dati = JSON.parse(res);
        if (dati.error != '') {
            attivaAlert(2, dati.error);
        } else {
            document.getElementById(idImporto).value = '';
            movimentiCassa();
        }
    })
}
function movimentiCassa() {
    try {
        document.getElementById('elencoMovimentiDiCassa').innerHTML = '';
        var deposito = recuperaDeposito();
        if (deposito == false) {
            // attivaAlert(xTipoAllert.ESCLAMAZIONE,"Selezionare un deposito valido!");
            return;
        }

        var parametri = {
            "tipoRisposta": "select",
            "tipoQuery": "movimentiCassa",
            "data": convertiDataEngIta(document.getElementById('txtData').value),
            "nomeTabella": "movimentiCassa",
            "responsabile": document.getElementById('responsabile').value,
            'deposito': deposito
        };
        inviaRichiestaCentralino("query", parametri, function (dati) {
            var res = JSON.parse(dati);
            if (res.error == '') {
                var list = ``;
                var totaleIncasso = 0;
                var contante = 0;
                var pos = 0;
                var assegni = 0;
                var credito = 0;
                var prelcontante = 0;
                var prelassegni = 0;
                for (var m of res.risposta) {
                    if (m != 0) {

                        list += `
                                <li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle IStyle marg1Top" style="padding-top:5px;padding-bottom:10px;">
                                <div>
                                <div class="row w10">${m.Orario}</div>
                                <div class="row w70">${m.DESCRIZIONE}</div>
                                <div class="row w20 ${m.DESCRIZIONE.indexOf("Scontrino") == -1 ? "separatore" : ""}separatore dx">${m.IMPORTO}</div>
                                <div>
                                `;
                        if (m.DESCRIZIONE.indexOf("Incasso") == -1) {
                            list += `
                                <div>
                                ${Number(m.CONTANTE.replace(/,/g, '.')) > 0 ? '<div class="row w80 cx">Contanti :</div><div class="row w20">' + m.CONTANTE + '</div>' : ''}
                                ${Number(m.POS.replace(/,/g, '.')) > 0 ? '<div class="row w80 cx">Pos :</div><div class="row w10">' + m.POS + '</div>' : ''}
                                ${Number(m.ASSEGNI.replace(/,/g, '.')) > 0 ? '<div class="row w80 cx">Assegni :</div><div class="row w20">' + m.ASSEGNI + '</div>' : ''}
                                ${Number(m.CREDITO.replace(/,/g, '.')) > 0 ? '<div class="row w80 cx">Credito :</div><div class="row w20 dx">' + m.CREDITO + '</div>' : ''}
                                </div>`
                        }
                        list += `</li>`;
                        if (Number(m.CONTANTE.replace(/,/g, '.')) == 0 && Number(m.POS.replace(/,/g, '.')) == 0 && Number(m.ASSEGNI.replace(/,/g, '.')) == 0 && Number(m.CREDITO.replace(/,/g, '.')) == 0) {
                            tmpIncasso = Number(m.IMPORTO.replace(/,/g, '.'));
                        } else {
                            tmpIncasso = 0;
                        }
                        if (Number(m.IMPORTO.replace(/,/g, '.')) > 0) {
                            totaleIncasso += Number(m.IMPORTO.replace(/,/g, '.'));
                        }
                        
                        contante += Number(arrotonda(m.CONTANTE.replace('.','').replace(',','.'), 2)) + Number(tmpIncasso);
                        pos += Number(m.POS.replace(/,/g, '.'));
                        assegni += Number(m.ASSEGNI.replace(/,/g, '.'));
                        credito += Number(m.CREDITO.replace(/,/g, '.'));
                        prelcontante += Number(m.PRELCONTANTE.replace(/,/g, '.'));
                        prelassegni += Number(m.PRELASSEGNI.replace(/,/g, '.'));

                    }
                }
                document.getElementById('saldoContante').innerHTML = formattaNumeri(arrotonda(contante, 2), 2, 2);
                document.getElementById('saldoAssegni').innerHTML = formattaNumeri(arrotonda(assegni, 2), 2, 2);
                document.getElementById('saldoPos').innerHTML = formattaNumeri(arrotonda(pos, 2), 2, 2);
                document.getElementById('totaleCassa').innerHTML = formattaNumeri(arrotonda(totaleIncasso, 2), 2, 2);
                document.getElementById('prelieviContante').innerHTML = formattaNumeri(arrotonda(prelcontante, 2), 2, 2);
                document.getElementById('prelievoAssegni').innerHTML = formattaNumeri(arrotonda(prelassegni, 2), 2, 2);
                document.getElementById('saldoFinanziaria').innerHTML = formattaNumeri(arrotonda(credito, 2), 2, 2);
                document.getElementById('elencoMovimentiDiCassa').innerHTML = list
                scrollMenuDown('elencoMovimentiDiCassa');
            }

        })
    } catch (e) {
        var tipo = xTipoAllert.ESCLAMAZIONE
        attivaAlert(tipo, e);
        console.error(e + ' - Movimenti di cassa')
    }
}
function foglioCassa() {
    var deposito = recuperaDeposito();
    if (deposito == false) {
        // attivaAlert(xTipoAllert.ESCLAMAZIONE,"Attenzione Deposito non selezionato!");
        return;
    }
    var parametri = {
        "tipoRisposta": "select",
        "tipoQuery": "foglioCassa",
        "data": convertiDataEngIta(document.getElementById('txtData').value),
        "nomeTabella": "foglioCassa",
        "responsabile": document.getElementById('responsabile').value,
        'deposito': deposito
    };
    inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
        var res = JSON.parse(dati);
        var totSommaConti = 0;
        var totIncasso = 0;

        if (res.risposta.totaliConti.length > 0) {
            document.getElementById('totPos').value = formattaNumeriInput(arrotonda(res.risposta.totaliConti[0].pos, 2), 2, 2);
            document.getElementById('totAssegni').value = formattaNumeriInput(arrotonda(res.risposta.totaliConti[0].assegni, 2), 2, 2);
            document.getElementById('totContante').value = formattaNumeriInput(arrotonda(res.risposta.totaliConti[0].Contante, 2), 2, 2);
            document.getElementById('totPrelievi').value = formattaNumeriInput((arrotonda(res.risposta.prelevato.Prelievi, 2) * -1), 2, 2);
            var totaleContanteTmp=formattaNumeriInput(arrotonda(Number(res.risposta.totaliConti[0].Contante) + Number(res.risposta.totFatture.CONTANTIFATTURE), 2), 2, 2);
            document.getElementById('totaleContantiTmp').value=totaleContanteTmp;
            var totPosTmp=formattaNumeriInput(arrotonda(Number(res.risposta.totaliConti[0].pos) + Number(res.risposta.totFatture.POSFATTURE), 2),2,2);
            document.getElementById('totPosTmp').value=totPosTmp;
        } else {
            document.getElementById('totPos').value = formattaNumeriInput(0, 2, 2);
            document.getElementById('totAssegni').value = formattaNumeriInput(0, 2, 2);
            document.getElementById('totContante').value = formattaNumeriInput(0, 2, 2);
            document.getElementById('totPrelievi').value = formattaNumeriInput(0, 2, 2);
            document.getElementById('totaleContantiTmp').value=0;
            document.getElementById('totPosTmp').value=0;
        }
        
        document.getElementById('totContantiFatture').value=formattaNumeriInput(arrotonda(res.risposta.totFatture.CONTANTIFATTURE, 2), 2, 2);
        document.getElementById('totPosFatture').value=formattaNumeriInput(arrotonda(res.risposta.totFatture.POSFATTURE, 2), 2, 2);
        document.getElementById('totNumeroFatture').value=formattaNumeriInput(arrotonda(res.risposta.totFatture.VOLTE, 0), 0, 0);
        document.getElementById('totFattureIncassate').value = formattaNumeriInput(arrotonda(res.risposta.totFatture.FATTURA, 2), 2, 2);
        if(res.risposta.totResiAnnulliGiorno!=undefined){
            document.getElementById('totImportoAnnulli').value = formattaNumeriInput(arrotonda(res.risposta.totResiAnnulliGiorno.IMPORTOANNULLI, 2), 2, 2);
            document.getElementById('totImportoResi').value = formattaNumeriInput(arrotonda(res.risposta.totResiAnnulliGiorno.IMPORTORESI, 2), 2, 2);
        }
        if(res.risposta.totImportoAB!=undefined){
            document.getElementById('totBuoniSconto').value = formattaNumeriInput(arrotonda(res.risposta.totImportoAB.IMPORTO, 2), 2, 2);
        }
        if(res.risposta.totImportoVari!=undefined){
            document.getElementById('totVari').value = formattaNumeriInput(arrotonda(res.risposta.totImportoVari.TOTVARI, 2), 2, 2);
        }
        if(res.risposta.totImportoBuoniIncassati!=undefined){
            document.getElementById('totBuoniIncassati').value=formattaNumeriInput(arrotonda(res.risposta.totImportoBuoniIncassati.IMPORTO, 2), 2, 2);
        }

       

        document.getElementById('totScontrinato').value = formattaNumeriInput(arrotonda(res.risposta.scontrinato.IMPORTO, 2), 2, 2);
        document.getElementById('totPagamenti').value = formattaNumeriInput(arrotonda(res.risposta.pagamenti.IMPORTO, 2), 2, 2);
        aggiornaValoriFoglioCassa();
        document.getElementById('totContato').focus();
    })
}



/******************************************************************************************************* */

/*************************************GESTIONE REGISTRATORE DI CASSA************************************ */

/******************************************************************************************************* */
var controlloInvioInCorso = false;
function elaboraDocumentoCassa(invioDb = false, documentoFiscale = true, documentoFnc = '', rigaAggiuntiva = '',copie=1,callBackAggiuntiva='') {
    if (controlloInvioInCorso == true) {
        return;
    }
    controlloInvioInCorso = true;
    if (documentoFnc == '') {
        var tstVeBa = documento[identificativoDoc].testata
        var listaArticoli = documento[identificativoDoc].prodotti.data;
        var totali=documento[identificativoDoc].totali;
    } else {
        var tstVeBa = documentoFnc.testata
        var listaArticoli = documentoFnc.prodotti.data;
        var totali=documentoFnc.totali;
    }
    var codiceLotteria = document.getElementById('txtCodiceLotteria').value;
    var datiDoc=parametriTipiDocumenti[recuperaValueElemento('listaDocumentiVeBa')];
  

    if (codiceLotteria != '' && documentoFiscale) {
        var obj = {
            'tipo': 'codiceLotteria',
            'dati': {
                'codiceLotteria': codiceLotteria
            }
        }
        datiRegCassa(obj);
    }
    if (documentoFiscale == false) {
        var obj = {
            'tipo': 'documentoNonFiscale',
            'dati': {
                'tipoDocumento': 'generico'
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'stampaIntestazione',
        }
        datiRegCassa(obj);
    }
    if(datiDoc.gest_controparte==1 && documentoFiscale==false){
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Spett.le :'
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': recuperaValueElemento('cmbClienti')
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': ''
            }
        }
        datiRegCassa(obj);
    }
    //creazione corpo scontrino
    for (var n in listaArticoli) {
        if (!isEmpty(listaArticoli[n])) {
            var obj = {
                'tipo': 'rigaDocumento',
                'dati': {
                    'articolo': listaArticoli[n].descrizione,
                    'quantità': formattaNumeri(arrotonda(listaArticoli[n].qu, 2), 2, 2),
                    
                    'listino': formattaNumeri( listaArticoli[n].movIvaInc==true ? arrotonda(listaArticoli[n].listino, 2) : arrotonda( listaArticoli[n].listino * arrotonda( (1+(listaArticoli[n].percIva/100)),2) ,2) , 2, 2),
                    'reparto': (repartoIdIva[listaArticoli[n].idIva] != undefined ? repartoIdIva[listaArticoli[n].idIva].reparto : '')
                }
            }
            datiRegCassa(obj);
            var sc = (listaArticoli[n].sconti).split('+');
            var tmpPrezzo = formattaNumeriInput(arrotonda(listaArticoli[n].listino, 2), 2, 2);

            if (documentoFiscale) {

                var totSconto = Number(calcolaImporto(formattaNumeriInput(arrotonda(listaArticoli[n].listino, 2), 2, 2), Number(listaArticoli[n].qu), sc[0], sc[1], sc[2], sc[3], sc[4]))
                var totale = Number(formattaNumeriInput(arrotonda(listaArticoli[n].listino, 2), 2, 2)) * Number(formattaNumeriInput(arrotonda(listaArticoli[n].qu, 2), 2, 2));
                if (arrotonda(totale - totSconto, 2) > 0) {
                    var obj = {
                        'tipo': 'rigaDocumento',
                        'dati': {
                            'articolo': 'SCONTO',
                            'quantità': 1,
                            'listino': arrotonda(totale - totSconto, 2),
                            'reparto': (repartoIdIva[listaArticoli[n].idIva] != undefined ? repartoIdIva[listaArticoli[n].idIva].reparto : '')
                        }
                    }
                    datiRegCassa(obj);
                }
            }

        }
    }

    if (documentoFiscale) {
        //creazione pagamento scontrino
        if (tstVeBa.pos > 0) {
            var obj = {
                'tipo': 'pagamentoDocumento',
                'dati': {
                    'pos': document.getElementById('importoPos').value,
                }
            }
            datiRegCassa(obj);
        }
        
        if (tstVeBa.contantiCassa > 0) {
            var contantiTmp=document.getElementById('importoContanti').value;
            
            if(contantiTmp==0){
                contantiTmp=tstVeBa.contantiCassa;
            }
            
            var obj = {
                'tipo': 'pagamentoDocumento',
                'dati': {
                    'contanti':contantiTmp ,
                }
            }
            datiRegCassa(obj);
            
        }
        if (tstVeBa.assegni > 0) {
            var obj = {
                'tipo': 'pagamentoDocumento',
                'dati': {
                    'assegni': tstVeBa.assegni,
                }
            }
            datiRegCassa(obj);
        }

        if (tstVeBa.credito > 0 && tstVeBa.idConto6=='') {
            var obj = {
                'tipo': 'pagamentoDocumento',
                'dati': {
                    'credito': tstVeBa.credito,
                }
            }
            datiRegCassa(obj);
        }
        if (tstVeBa.buono > 0) {
            var obj = {
                'tipo': 'pagamentoDocumento',
                'dati': {
                    'buono': tstVeBa.buono,
                    'testo':'Buono '+Number(totali.numeroDocumentoReso)+' del '+totali.dataDocumentoReso
                }
            }
            datiRegCassa(obj);
        }
    }
    if (rigaAggiuntiva != '') {
        var obj = {
            'tipo': 'rigaAggiuntiva',
            'dati': {
                'testo': rigaAggiuntiva,
            }
        }
        datiRegCassa(obj);
    }
    if(documentoFiscale==false && xParametriCassa.modSupermercato==true){
        var obj = {
            'tipo': 'barcodeGenerico',
            'dati': {
                'testo': '$DOC'+documento[identificativoDoc].identificativo+'$MATR'+xParametriCassa.matricolaCassa,
            }
        }
        datiRegCassa(obj);
    }
    //chiudo scontrino
    var obj = {
        'tipo': 'chiudiDocumento'
    }
    if (documentoFiscale) {
        var pulsanteScontrinoCortesia = document.getElementById('btnScontrinoCortesia').classList.contains('pulsanteVeBaAttivo');
    } else {
        pulsanteScontrinoCortesia = false;
    }
    if (pulsanteScontrinoCortesia) {
        datiRegCassa(obj, true, invioDb, stampaScontrinoCortesia);
    } else {
        if(copie==1){
            datiRegCassa(obj, true, invioDb,()=>{
                if(callBackAggiuntiva!=''){
                    callBackAggiuntiva();
                }
            });
        }else{
            var tmpDatiOperazioni=JSON.stringify(datiOperazioni);
            datiRegCassa(obj, true, false,(res)=>{
                datiOperazioni=JSON.parse(tmpDatiOperazioni);
                datiRegCassa(obj, true, invioDb);
               
            });
        }
        
    }
}

function datiRegCassa(objInput, invioImmediato = false, invioDb = false, callback,callBackErrore='') {
    if (invioRegistratoreCassa) {
        var objSend = {};
        if (objInput.tipo == undefined) {
            objSend.tipo = objInput;
        } else {
            objSend.tipo = objInput.tipo;
        }
        if (objInput.dati == undefined) {
            objSend.dati = '';
        } else {
            objSend.dati = objInput.dati;
        }
        datiOperazioni.push(objSend)
        if (invioImmediato) {
            if (xParametriCassa.ipCassa != '' && xParametriCassa.porta != '' && xParametriCassa.tipoCassa != '') {
                var jSonRichiesta = {
                    'parametriCassa': {
                        'destinazione': xParametriCassa.ipCassa,
                        'porta': xParametriCassa.porta,
                        'tipoCassa': xParametriCassa.tipoCassa,
                        'matricola': xParametriCassa.matricolaCassa
                    },
                    'datiOperazioni': datiOperazioni
                };

                fetch(xParametriCassa.backendCassa + "centralino.php", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: 'jSonRichiesta=' + (JSON.stringify(jSonRichiesta)).replace(/&/g, '')
                })
                    .then(res => res.text()) //res.json()
                    .then(function (phpRes) {
                        datiOperazioni = new Array();
                        controlloInvioInCorso = false;
                        var x = JSON.parse(phpRes);
                        if(x.alert!=undefined && x.alert!=''){
                            attivaAlert(xTipoAllert.INFORMAZIONE, x.alert,'Messaggio cassa');
                        }
                        if (x.error != '') {
                            if(callBackErrore!=''){
                                callBackErrore(x);
                            }
                            attivaAlert(xTipoAllert.ESCLAMAZIONE, x.error, 'Errore invio dati cassa');
                            
                        } else if (invioDb) {
                            console.log(documento[identificativoDoc].testata.identificativoVeBa);
                            if(documento[identificativoDoc].testata.identificativoVeBa!=''){

                                documento[identificativoDoc].testata.identificativoOld=documento[identificativoDoc].testata.identificativoVeBa;
                            }
                            if(x.data.datiDocumento.chiusura!='' && x.data.datiDocumento.numero!='' && x.data.datiDocumento.data!=''){
                                documento[identificativoDoc].testata.identificativoVeBa = '$DOC' + x.data.datiDocumento.chiusura + '' + x.data.datiDocumento.numero + '' + x.data.datiDocumento.data+'$MATR' + xParametriCassa.matricolaCassa ;
                                documento[identificativoDoc].testata.protocollo = x.data.datiDocumento.numero
                            }else{
                                documento[identificativoDoc].testata.identificativoVeBa='$DOC'+documento[identificativoDoc].identificativo+'$MATR'+xParametriCassa.matricolaCassa;
                            }
                            if (xParametriCassa.modOffline == true) {
                                salvaDocumentoOffline();
                            } else {
                                salvaDocumentoSuServer();
                            }

                        }
                        if (callback != undefined) {
                            callback(x);
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                        attivaAlert(2, error, 'Errore invio dati cassa');
                        if(callBackErrore!=''){
                            callBackErrore(x);
                        }
                    });

            } else {
                if (invioDb) {
                    if (xParametriCassa.modOffline == true) {
                        salvaDocumentoOffline();
                    } else {
                        salvaDocumentoSuServer();
                    }
                }
                if (callback != undefined) {
                    callback();
                }
            }
        }
    }
}
var annulloInCorso=false;
function annullaScontrino(datiScr) {
    try{
    if(annulloInCorso==true){
        return;
    }
    annulloInCorso=true;
    var input = document.getElementById(datiScr);
    if (input.value != '' && input.value.length >= 18) {
        var obj = {
            'tipo': 'verificaAnnullaDocumento',
            'dati': {
                'rifScontrino': input.value,
            }
        }
        datiRegCassa(obj, true, false, function (risp) {
            if (risp.error == '') {
                var value = input.value;
                var obj = {
                    'identificativoVeBa': value
                }
                richiamaDocumento(obj, function (dati) {
                    annulloInCorso=false;
                    var documentoTmp = dati.risposta;
                    documentoTmp.testata.data = oggiISO();
                    delete documentoTmp.testata.id;
                    delete documentoTmp.testata.numero;
                    delete documentoTmp.testata.serie;
                    documentoTmp.testata.noteInterne=documentoTmp.testata.identificativoVeBa;
                    delete documentoTmp.testata.identificativoVeBa;
                    if(document.getElementById('selezionaCassa').value!=''){
                        documentoTmp.testata.responsabile=document.getElementById('selezionaCassa').value;
                    }
                    documentoTmp.testata.note='ANNULLOSCONTRINO';
                    
                    for (var n in documentoTmp.prodotti.data) {
                        aggiornaTotale(documentoTmp.totali, documentoTmp.prodotti.data[n], -1, null, null, null, documentoTmp.prodotti.data[n].movIvaInc);
                        documentoTmp.prodotti.data[n].qu = documentoTmp.prodotti.data[n].qu * -1;
                        documentoTmp.prodotti.data[n].importo = documentoTmp.prodotti.data[n].importo * -1;
                        aggiornaTotale(documentoTmp.totali, documentoTmp.prodotti.data[n], 1, null, null, null, documentoTmp.prodotti.data[n].movIvaInc);
                        if (documentoTmp.prodotti.data[n].gestioneLotti != undefined && documentoTmp.prodotti.data[n].gestioneLotti == true) {
                            for (var l in documentoTmp.prodotti.data[n].movLotti) {
                                if (!isEmpty(documentoTmp.prodotti.data[n].movLotti[l])) {
                                    documentoTmp.prodotti.data[n].movLotti[l].qu = documentoTmp.prodotti.data[n].movLotti[l].qu * -1;
                                }
                            }
                        }
                    }
                    if(xParametriCassa.modOffline == true){
                        documentoTmp.identificativo=Date.now();
                        documentoTmp.testata.identificativoVeBa=documentoTmp.identificativo;
                        salvaDocumentoOffline(documentoTmp);
                    }else{
                        var parametri = { "tipoRisposta": "salva", "tipoSalva": "documento", "dati": documentoTmp };
                        inviaRichiestaCentralino("salva", parametri, function (dati) {
                            var risp = JSON.parse(dati);
                            if (risp.error == '') {
                                richiamaModal('modalMd');
                                documentoTmp = new Array();
                                listaRientri = {};
                            }
                        });
                    }
                   

                }, xParametriCassa.modOffline);
            }
        },()=>{annulloInCorso=false;});

    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE , RICHIAMARE LO SCONTRINO CORRETTAMENTE');
    }
}catch(err){
    attivaAlert(xTipoAllert.ERRORE, 'ERRORE ANNULLO SCONTRINO'+err.message);
    annulloInCorso=false;
}
}

function visualizzaTotaleDisplay() {
    var totalePagare = arrotonda(documento[identificativoDoc].totali.tDoc, 2)
    if(xParametriCassa.modSupermercato==true){
        totalePagare=Number(totalePagare)-Number( document.getElementById('importoBuonoDaReso').innerHTML.replace(',','.') );
    }
    var obj = {
        'tipo': 'visDatoDisplay',
        'dati': {
            'totale': formattaNumeri(totalePagare,2,2)

        }
    }
    datiRegCassa(obj, true);
}
function richiamaScontrino(input) {


    if (input.value != undefined && input.value != '' && input.value.length >=18) {
        var obj = {
            'identificativoVeBa': input.value
        }
        setTimeout(function () {
        document.getElementById('txtRicerca').focus();
        }, 1000);
    } else if (input.id != undefined && input.id != '') {
        var obj = {
            'id': input.id
        }
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, "Errore ricerca documento");
        return
    }

    richiamaDocumento(obj, function (dati) {

        documentoTmp = dati.risposta;
        popolaElencoDaJson(documentoTmp.prodotti.data, 'elencoRigheRichiamoScontrino', 0, 'venditaBanco.html:RIGADOCUMENTOTMP', true, 0);

        if (documentoTmp.testata.identificativoVeBa != undefined && documentoTmp.testata.identificativoVeBa.length == 18 && documentoTmp.testata.identificativoVeBa) {
            document.getElementById('txtNumeroScontrino').value = documentoTmp.testata.identificativoVeBa;
        }
    }, xParametriCassa.modOffline);

}
function stornaArticoliSelezionati(){
    for (var n in documentoTmp.prodotti.data) {
        var input = recuperaValueElemento('quReintegroAnnulloScontrino-' + n)
        if (input != '' && input > 0) {
            if (!isEmpty(documentoTmp.prodotti.data[n])) {

                //aggiungo il prodotto alla lista del documento, con valore negativo
                var rs = documentoTmp.prodotti.data[n];
                var sc=rs.sconti.split('+');
                for(var x =sc.length; x<5;x++){
                    sc.push('0');
                }
                inserimentoRigaVeBa(true, true, rs.codice, rs.descrizione, arrotonda(rs.listino,decimaliPrezzi), rs.percIva, rs.idIva, input*-1, rs.um, arrotonda(rs.costo, 2), '', rs.listino, sc.SC1, sc.SC2, sc.SC3, sc.SC4, sc.SC5, rs.gestioneLotti);
            }
                        
        }else{
            documentoTmp.prodotti.data[n] = {};
        } 
    }
    richiamaModal('modalMd');
}
function resoDaScontrino() {
    var obj = {
        'tipo': 'resoDaScontrino',
        'dati': {
            'rifScontrino': recuperaValueElemento('txtNumeroScontrino')
        }
    }
    datiRegCassa(obj, true, false, function (dati) {
        if (dati.error == '') {
            documentoTmp.testata.data = oggiISO();
            delete documentoTmp.testata.id
            delete documentoTmp.testata.numero;
            delete documentoTmp.testata.serie;
            documentoTmp.testata.noteInterne=documentoTmp.testata.identificativoVeBa;
            delete documentoTmp.testata.identificativoVeBa;
            documentoTmp.testata.note='RESOSCONTRINO';
            for (var n in documentoTmp.prodotti.data) {
                var input = recuperaValueElemento('quReintegroAnnulloScontrino-' + n)
                if (input != '' && input > 0) {

                    if (!isEmpty(documentoTmp.prodotti.data[n])) {
                        var obj = {
                            'tipo': 'rigaDocumento',
                            'dati': {
                                'articolo': documentoTmp.prodotti.data[n].descrizione,
                                'quantità': formattaNumeri(recuperaValueElemento('quReintegroAnnulloScontrino-' + n), 2, 2),
                                'listino': formattaNumeri(arrotonda(documentoTmp.prodotti.data[n].listino, 2), 2, 2),
                                'reparto': repartoIdIva[documentoTmp.prodotti.data[n].idIva].reparto
                            }
                        }
                        datiRegCassa(obj);
                    }
                    
                    if(document.getElementById('selezionaCassa').value!=''){
                        documentoTmp.testata.responsabile=document.getElementById('selezionaCassa').value;
                    }
                    
                    aggiornaTotale(documentoTmp.totali, documentoTmp.prodotti.data[n], -1, null, null, null, documentoTmp.prodotti.data[n].movIvaInc);
                    documentoTmp.prodotti.data[n].qu = documentoTmp.prodotti.data[n].qu * -1;
                    documentoTmp.prodotti.data[n].importo = documentoTmp.prodotti.data[n].importo * -1;
                    aggiornaTotale(documentoTmp.totali, documentoTmp.prodotti.data[n], 1, null, null, null, documentoTmp.prodotti.data[n].movIvaInc);
                    if (documentoTmp.prodotti.data[n].gestioneLotti != undefined && documentoTmp.prodotti.data[n].gestioneLotti == true) {
                        for (var l in documentoTmp.prodotti.data[n].movLotti) {
                            if (!isEmpty(documentoTmp.prodotti.data[n].movLotti[l])) {
                                documentoTmp.prodotti.data[n].movLotti[l].qu = documentoTmp.prodotti.data[n].movLotti[l].qu * -1;
                            }
                        }
                    }
                } else {
                    aggiornaTotale(documentoTmp.totali, documentoTmp.prodotti.data[n], -1, null, null, null, documentoTmp.prodotti.data[n].movIvaInc);
                    documentoTmp.prodotti.data[n] = {};
                }
            }

            var obj = {
                'tipo': 'chiudiDocumento'
            }
            datiRegCassa(obj, true, false, function (res) {
                if (res.error == '') {
                    if(xParametriCassa.modSupermercato==true){
                            generaBuonoReso(documentoTmp.totali.tDoc)
                            documentoTmp.testata.credito=documentoTmp.totali.tDoc;
                            if(parametriNC.contoCreditiClienti!=undefined && parametriNC.contoCreditiClienti!=''){
                                documentoTmp.testata.idConto6=parametriNC.contoCreditiClienti;
                            }else{
                                attivaAlert(xTipoAllert.ESCLAMAZIONE, "Conto crediti clienti non impostato");
                            }
                            
                        }
                    if(xParametriCassa.modOffline == true){
                        documentoTmp.identificativo=Date.now();
                        documentoTmp.testata.identificativoVeBa=documentoTmp.identificativo;
                        salvaDocumentoOffline(documentoTmp);
                    }else{
                        var parametri = { "tipoRisposta": "salva", "tipoSalva": "documento", "dati": documentoTmp };
                        inviaRichiestaCentralino("salva", parametri, function (dati) {
                            var risp = JSON.parse(dati);
                            if (risp.error == '') {
                                richiamaModal('modalMd');
                                documentoTmp = new Array();
                                listaRientri = {};
                            }
                        });
                    }


                }
            });

        }
    });
    //COMPLETARE CON INVIO DATI ALLA CASSA
    //SE LA CASSA NON HA ALCUN ERRORE, INVIARE NUOVO DOCUMENTO A SERVER

}
function selezionaRigaReso(id, totQta) {
    var input = document.getElementById(id);
    if (input.value == totQta) {
        input.value = 0;
    } else {
        input.value = totQta;
    }
}
function controlloInputRichiamoScontrino(id) {
    var input = document.getElementById(id);
    if (input.value != '' && !isNaN(input.value) && input.value != 0) {
        document.getElementById('modalMdpulsanteConfermaModal').value = 'Reso da scontrino';
        document.getElementById('modalMdpulsanteConfermaModal').setAttribute('onclick', 'resoDaScontrino()')
        listaRientri[input.id] = input.value;
    } else if (input.value < 0) {
        attivaAlert(2, 'Inserire solo valori positivi')
        input.value = 0;
    } else {
        if (listaRientri[input.id] != undefined) {
            delete listaRientri[input.id];
        }
        if (isEmpty(listaRientri)) {
            document.getElementById('modalMdpulsanteConfermaModal').value = 'Annulla scontrino';
            document.getElementById('modalMdpulsanteConfermaModal').setAttribute('onclick', 'annullaScontrino(\'txtNumeroScontrino\')')
        }
        input.value = 0;
    }
}

function invioCassa(input, forzaAbilita = 'no', avvisoCassa = true) {
    if (recuperaValueElemento('selezionaCassa') != '') {
        if (forzaAbilita != 'no') {

            if (forzaAbilita == true) {
                input.classList.remove('pulsanteVeBa')
                input.classList.add('pulsanteVeBaAttivo');
                invioRegistratoreCassa = true;
            } else {
                input.classList.remove('pulsanteVeBaAttivo')
                input.classList.add('pulsanteVeBa');
                invioRegistratoreCassa = false;
            }
        } else {

            if (input.classList.contains('pulsanteVeBaAttivo')) {
                input.classList.remove('pulsanteVeBaAttivo')
                input.classList.add('pulsanteVeBa');
                invioRegistratoreCassa = false;
            } else {
                input.classList.remove('pulsanteVeBa')
                input.classList.add('pulsanteVeBaAttivo');
                invioRegistratoreCassa = true;
            }
        }
    } else {
        if (avvisoCassa == true) {
            attivaAlert(2, 'Non è stata selezionata alcuna cassa nei parametri')
        }
    }
}
function stampaScontrinoCortesia(x, daDocumento) {
    if (daDocumento == 'richiamoScontrino') {
        var listaArticoli = documentoTmp.prodotti.data;
    } else {
        var listaArticoli = documento[identificativoDoc].prodotti.data;
    }
    var obj = {
        'tipo': 'documentoNonFiscale',
        'dati': {
            'tipoDocumento': 'generico'
        }
    }
    datiRegCassa(obj);
    var obj = {
        'tipo': 'stampaIntestazione',
    }
    datiRegCassa(obj);

    //creazione corpo scontrino
    var obj = {
        'tipo': 'rigaDocumento',
        'dati': {
            'articolo': '',
            'quantità': '',
            'listino': '',
            'reparto': ''
        }
    }
    datiRegCassa(obj);
    for (var n in listaArticoli) {
        if (!isEmpty(listaArticoli[n])) {
            var obj = {
                'tipo': 'rigaDocumento',
                'dati': {
                    'articolo': listaArticoli[n].descrizione,
                    'quantità': formattaNumeri(arrotonda(listaArticoli[n].qu, 2), 2, 2),
                    'listino': '',
                    'reparto': ''
                }
            }
            datiRegCassa(obj);
        }
    }
    var obj = {
        'tipo': 'rigaDocumento',
        'dati': {
            'articolo': '',
            'quantità': '',
            'listino': '',
            'reparto': ''
        }
    }
    datiRegCassa(obj);
    //chiudo scontrino
    var obj = {
        'tipo': 'chiudiDocumento',
        'dati': {
            'chiusura': x.data.datiDocumento.chiusura,
            'data': x.data.datiDocumento.data,
            'numero': x.data.datiDocumento.numero
        }
    }
    datiRegCassa(obj, true);
    var input = document.getElementById('btnScontrinoCortesia');
    attivaScontrinoCortesia(input);

}
function attivaScontrinoCortesia(input) {
    if (input.classList.contains('pulsanteVeBaAttivo')) {
        input.classList.remove('pulsanteVeBaAttivo')
        input.classList.add('pulsanteVeBa');
    } else {
        input.classList.remove('pulsanteVeBa')
        input.classList.add('pulsanteVeBaAttivo');
    }
}
function scontrinoDiCortesiaDaRichiamo() {
    var serialeScontrino = document.getElementById('txtNumeroScontrino').value;
    if (serialeScontrino == '' && documentoTmp) {
        serialeScontrino = documentoTmp.testata.identificativoVeBa
    }
    if (serialeScontrino != '') {
        var x = {
            data: {
                datiDocumento: {
                    chiusura: serialeScontrino.substring(0, 4),
                    numero: serialeScontrino.substring(4, 8),
                    data: serialeScontrino.substring(8, 14),

                }
            }
        }
        stampaScontrinoCortesia(x, 'richiamoScontrino')
    }
}
function stampaDocumentoDaRichiamo() {
    if (documentoTmp != undefined && documentoTmp != '') {
        elaboraDocumentoCassa(false, false, documentoTmp);
    }
}

function stampaFoglioRiepilogo(){
    var obj = {
        'tipo': 'documentoNonFiscale',
        'dati': {
            'tipoDocumento': 'generico'
        }
    }
    datiRegCassa(obj);
    var obj = {
        'tipo': 'stampaIntestazione',
    }
    datiRegCassa(obj);
    
    var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Totale Scontrinato : '+formattaNumeriInput(document.getElementById('totScontrinato').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': '      Di Cui :',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Contante : '+formattaNumeriInput(document.getElementById('totContante').value,2,2)+' ',
            }
        }
      datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Pos : '+formattaNumeriInput(document.getElementById('totPos').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': ' ',
            }
        }
        datiRegCassa(obj);
            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'Importo Scontrini Annullati : '+formattaNumeriInput(document.getElementById('totImportoAnnulli').value,2,2)+' ',
                }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Importo Resi/Buoni Generati : '+formattaNumeriInput(document.getElementById('totImportoResi').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Importo Buoni da reso incassati : '+formattaNumeriInput(document.getElementById('totBuoniIncassati').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Importo Buoni sconto: '+formattaNumeriInput(document.getElementById('totBuoniSconto').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Importo Vari: '+formattaNumeriInput(document.getElementById('totVari').value,2,2)+' ',
            }
        }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': ' ',
            }
        }
            datiRegCassa(obj);
        var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'Totale Fatturato : '+formattaNumeriInput(document.getElementById('totFattureIncassate').value,2,2)+' ',
                }
        }
            datiRegCassa(obj);
            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': '      Di Cui :',
                }
        }
            datiRegCassa(obj);
            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'Contante : '+formattaNumeriInput(document.getElementById('totContantiFatture').value,2,2)+' ',
                }
        }
        datiRegCassa(obj);
            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'Pos : '+formattaNumeriInput(document.getElementById('totPosFatture').value,2,2)+' ',
                }
        }
            datiRegCassa(obj);

        var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'Numero Fatture : '+formattaNumeriInput(document.getElementById('totNumeroFatture').value,0,0)+' ',
                }
        }
            datiRegCassa(obj);

            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': ' ',
                }
        }
            datiRegCassa(obj);
    var totaleContante=formattaNumeriInput(arrotonda(Number(document.getElementById('totContantiFatture').value)+Number(document.getElementById('totContante').value),2),2,2);
            var obj = {
                'tipo': 'rigaGenerica',
                'dati': {
                    'testo': 'TOTALE CONTANTE : '+totaleContante,
                }
            }
        var totalePos=formattaNumeriInput(arrotonda(Number(document.getElementById('totPosFatture').value)+Number(document.getElementById('totPos').value),2),2,2);
        datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'TOTALE POS : '+totalePos,
            }
        }
        datiRegCassa(obj);
    var obj = {
            'tipo': 'chiudiDocumento'
        }
        
        datiRegCassa(obj, true, '');
}   
function verificaTotaliIva(documentoTmp=''){
    if(documentoTmp==''){
        var castellettoIva=documento[identificativoDoc].totali.castellettoIva;
    }else{
        var castellettoIva=documentoTmp.totali.castellettoIva;
    }
    for(var x in castellettoIva){
        console.log(castellettoIva[x])
        if(castellettoIva[x].totIva<0){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,"Attenzione l'iva non può andare in negativo!");
            return false;
        }
    }
    return true;

}
function gestionePulsanteAbSconto(stringaIngresso){
    
    if(stringaIngresso=='' || stringaIngresso==0){
        
        var input=document.getElementById('importoBuonoSconto');
        input.innerHTML=0;
        var btn=document.getElementById('btnBuonoScontoScontrino');
        if(btn.classList.contains('pulsanteVeBaAttivo')==true){
            btn.classList.remove('pulsanteVeBaAttivo')
        }
        return;
    }
    stringaIngresso=stringaIngresso.toString();
    if(stringaIngresso.indexOf('$ABSCONTO')!=-1){
    var importoBuono=stringaIngresso.substring( (stringaIngresso.indexOf('$ABSCONTO')+9) ,17);
        importoBuono=arrotonda((importoBuono/100),2)
    }else{
        importoBuono=stringaIngresso;
    }
    var input=document.getElementById('importoBuonoSconto');
    input.innerHTML=importoBuono;
    var btn=document.getElementById('btnBuonoScontoScontrino');
    btn.classList.add('pulsanteVeBaAttivo')
    if(documento[identificativoDoc].totali.totaleBuonoSconto==undefined){
        documento[identificativoDoc].totali.totaleBuonoSconto=0;
    }
    documento[identificativoDoc].totali.totaleBuonoSconto+=Number(importoBuono);
}
  function generaRigheAbbuono(importoIvatoDaDistribuire,documentoTmp=''){
    for(var x in documento[identificativoDoc].prodotti.data){
        if(documento[identificativoDoc].prodotti.data[x].codice=='AB'){
            eliminaRiga(documento[identificativoDoc].prodotti.data[x].riga);
        }
    }
    if(importoIvatoDaDistribuire==''){
        var importoIvatoDaDistribuire=document.getElementById('importoBuonoSconto').innerHTML;
        if(importoIvatoDaDistribuire==0){
            return
        }
    }
    
    if(documentoTmp==''){
        var castellettoIvaTmp=documento[identificativoDoc].totali.castellettoIva;
    }else{
        var castellettoIvaTmp=documentoTmp.totali.castellettoIva;
    }
    
    if(castellettoIvaTmp.length==0){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,"Verificare presenza articoli!");
        return;
    }
    for(var x in castellettoIvaTmp){
        //ordino per percentuale iva decrescente
        var castellettoIva=castellettoIvaTmp.sort(function(a, b){return b.percIva-a.percIva});
    }
    var abbuoni=[];
    var cont=0;
    do{
        if(importoIvatoDaDistribuire==0){
            break;
        }
        if(importoIvatoDaDistribuire>Number(castellettoIva[cont].totImponibile)+Number(castellettoIva[cont].totIva)){
            abbuoni.push({
                'imponibile':castellettoIva[cont].totImponibile,
                'iva':castellettoIva[cont].totIva,
                'percIva':castellettoIva[cont].percIva,
                'idIva':castellettoIva[cont].idIva,
            })
            importoIvatoDaDistribuire=importoIvatoDaDistribuire-(castellettoIva[cont].totImponibile+castellettoIva[cont].totIva);
        }else{

            var imponibileDaDistribuire=arrotonda(importoIvatoDaDistribuire/(1+castellettoIva[cont].percIva/100),2);
            var ivaDaDistribuire=arrotonda(importoIvatoDaDistribuire-imponibileDaDistribuire,2);
            abbuoni.push({
                'imponibile':imponibileDaDistribuire,
                'iva':ivaDaDistribuire,
                'percIva':castellettoIva[cont].percIva,
                'idIva':castellettoIva[cont].idIva,
            })
            importoIvatoDaDistribuire=0;
        }
        cont++;

    }while(cont<castellettoIva.length);
    
    
    for(var x in abbuoni){
        inserimentoRigaVeBa(true,true,'AB','ABBUONO',documentoIvaInclusa ? abbuoni[x].imponibile+abbuoni[x].iva:abbuoni[x].imponibile,abbuoni[x].percIva,abbuoni[x].idIva,-1,'NR',0,'','','','','','','',false,'');
        // inserimentoRigaVeBa(true, true, 'ABRESO', 'ABBUONO DA RESO PRECEDENTE', documentoIvaInclusa ? arrotonda(rs.PREZZOIVATO, 2) : arrotonda(rs.PREZZOLIVAESCL, decimaliPrezzi), rs.PIVA, rs.ID_IVA, quantità, rs.UM, arrotonda(rs.UCOSTO, 2), '', documentoIvaInclusa ? rs.PREZZOIVATO : rs.PREZZOLIVAESCL, rs.SC1, rs.SC2, rs.SC3, rs.SC4, rs.SC5, gestioneLottiTmp,rs.coloreRiga);
    }
    document.getElementById('importoBuonoSconto').innerHTML=arrotonda(importoIvatoDaDistribuire,2);
    documento[identificativoDoc].totali.totaleBuonoSconto=importoIvatoDaDistribuire;
    if(importoIvatoDaDistribuire>0){
        document.getElementById('btnBuonoScontoScontrino').classList.add('pulsanteVeBaAttivo');
    }else{
        document.getElementById('btnBuonoScontoScontrino').classList.remove('pulsanteVeBaAttivo');
    }
    documentoLocal();
    return abbuoni;
  }
  function gestionePulsanteBuono(stringaIngresso){
    if(stringaIngresso==''){
        
        var input=document.getElementById('importoBuonoDaReso');
        input.innerHTML=0;
        var btn=document.getElementById('btnBuonoScontrino');
        if(btn.classList.contains('pulsanteVeBaAttivo')==true){
            btn.classList.remove('pulsanteVeBaAttivo')
        }
        return;
    }
    // var importoBuono=stringaIngresso.substring(stringaIngresso.indexOf('$BUONO')+6,(stringaIngresso.indexOf('$MATR')-10));
    var importoBuono=stringaIngresso.substring(stringaIngresso.indexOf('$BUONO')+6,16);
    // var numeroData=stringaIngresso.substring(stringaIngresso.indexOf('$MATR')-12,(stringaIngresso.indexOf('$MATR')))
    var numeroData=stringaIngresso.substring(16);
    var datiReso={};
    datiReso.numero=numeroData.substring(0,4);
    datiReso.data=numeroData.substring(4,12);
    // datiReso.matricola=stringaIngresso.substring(stringaIngresso.indexOf('$MATR')+5,(stringaIngresso.indexOf('$MATR')+16))
    if(isWithin30Days(datiReso.data)==false){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,"Buono reso scaduto!");
        return false;
    }
    datiReso.importo=arrotonda((importoBuono/100),2)

    var input=document.getElementById('importoBuonoDaReso');
    input.innerHTML=datiReso.importo
    var btn=document.getElementById('btnBuonoScontrino');
    btn.classList.add('pulsanteVeBaAttivo')
    documento[identificativoDoc].totali.numeroDocumentoReso=datiReso.numero;
    documento[identificativoDoc].totali.dataDocumentoReso=datiReso.data;
    documento[identificativoDoc].totali.stringaBuono=stringaIngresso;
    aggiornaTotaleVideo(documento[identificativoDoc].totali.tDoc);
  }


  function generaBuonoReso(importo){
    if(Number(importo)<0){
        importo=importo*-1;
    }
    var obj = {
        'tipo': 'documentoNonFiscale',
        'dati': {
            'tipoDocumento': 'generico'
        }
    }
    datiRegCassa(obj);
    var obj = {
        'tipo': 'stampaIntestazione',
    }
    datiRegCassa(obj);
 
 
      datiRegCassa(obj);
        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Buono per reso merce',
            }
    }
        datiRegCassa(obj);

        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': ' ',
            }
    }
        datiRegCassa(obj);

        var obj = {
            'tipo': 'rigaGenerica',
            'dati': {
                'testo': 'Valore Euro '+formattaNumeri(importo,2,2)
            }
    }
        datiRegCassa(obj);
        var obj = {
            'tipo': 'barcodeBuonoReso',
            'dati': {
                'testo': importo
            }
    }
        datiRegCassa(obj);

    var obj = {
            'tipo': 'chiudiDocumento'
        }
        
        datiRegCassa(obj, true, '');
}   


function isWithin30Days(inputDate) {
    // Converte l'input in un oggetto Date
    const [day, month, year] = inputDate.split('.');
    const date = new Date(`${year.padStart(4, '20')}-${month}-${day}`);
  
    // Ottiene la data corrente e la data 30 giorni fa
    const currentDate = new Date();
    const date30DaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
  
    // Confronta la data di input con la data 30 giorni fa
    if (date > date30DaysAgo && date <= currentDate) {
      return true;
    } else {
      return false;
    }
  }
  function verificaQuantitàMaxContratto(codice,quDaInserire,quMaxContratto=''){
    var doc=documento[identificativoDoc].prodotti.data;
    var quantita=quDaInserire;
    for(var x in doc){
        
        if(doc[x].codice==codice){
            quantita=Number(quantita)+Number(doc[x].qu);
            if(Number(quantita)>Number(quMaxContratto)){
                return false;
            }        
        }
    }
    
    if(Number(quantita)>Number(quMaxContratto)){
        return false;
    }else{
        return true;
    }
  }
  function verificaDataContratto(dataContratto){
        //verifico se la data del contratto è valida, se è valida ritorno true altrimenti false
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let dataContrattoC = new Date(dataContratto);
        return (dataContrattoC >= today);
  }
         
  function arrotondaNew(valore, decimali) {
    let numero = new Decimal(valore);
    return numero.toFixed(decimali, Decimal.ROUND_HALF_UP);
}
function validateInput(event) {
    var char = String.fromCharCode(event.which);
  
    // Se il carattere non è un numero o una virgola, annulla l'evento
    if (!/^[\d,.]*$/.test(char)) {
      event.preventDefault();
    }
  }
  function tmpR(){
    obj={
        id:891696
    }
    richiamaDocumento(obj,(res)=>{
        documento[identificativoDoc]=res.risposta;
    })
  }
function listaDocumentiOffline(){
    recuperaAllDataIndexDb('documentiVeBa',(res)=>{
        chiudiImpostazioniPagina();
        var rs=res.risposta;
        if(rs[0]==0){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,"Non ci sono documenti offline");
            return;
        }
        var lista=[];
        for(var i in rs){
            var obj={
                identificativo:rs[i].identificativo.toString(),
                totale:rs[i].totali.tDoc,
            }
            lista.push(obj);
        }
        query['listaDocumentiOffline']=new Array();
        query['listaDocumentiOffline']['oggetti']=new Array();
        query['listaDocumentiOffline']['oggetti']['{identificativo}']='identificativo';
        query['listaDocumentiOffline']['oggetti']['{totale}']={campo:'totale',tipo:'numero',decimaliMax:2};
        query['listaDocumentiOffline']['modelloRiga']=elementiDocumentiOffline;
        query['listaDocumentiOffline']['modelloContenitore']=modalVisualizzaDocumentiOffline;
        apriModalDettagli('listaDocumentiOffline',erroreCaricamentoDocumenti,lista);
    })
    
  }
function richiamaDocumentoOfflineSuVeBa(identificativo){
    leggiTabellaIndexedDBSemplice('documentiVeBa',identificativo,(res)=>{
        chiudiModalBox();
        documento[identificativoDoc]=res.risposta;
        popolaVeBaDaDocumento();
        invioCassa(document.getElementById('btnInvioRegCassa'), false);
    });
}

