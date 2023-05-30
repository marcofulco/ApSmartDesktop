var decimaliPrezzi = 2;//valore default

query[nomePagina] = new Array;
query[nomePagina]['ricercaCodice'] = 'cercaCodice(this)';

query['elencoAssistenze'] = new Array;
query['elencoAssistenze']['OFFSET'] = 0;
query['elencoAssistenze']['FETCH'] = 25;
query['elencoAssistenze']['MAXFETCH'] = 0;
query['elencoAssistenze']['oggetti'] = new Array;
query['elencoAssistenze']['oggetti']['{RAGIONESOCIALE}'] = 'RAGIONESOCIALE';
query['elencoAssistenze']['oggetti']['{ID}'] = 'ID';
query['elencoAssistenze']['oggetti']['{ORAAPP}'] = 'ORAAPP';
query['elencoAssistenze']['oggetti']['{DATA}'] = 'DATA';
query['elencoAssistenze']['oggetti']['{TECNICO}'] = 'TECNICO';

query['schedaAssistenza'] = new Array;
query['schedaAssistenza']['oggetti'] = new Array;
query['schedaAssistenza']['oggetti']['txtRagioneSociale'] = 'RAGIONESOCIALE';
query['schedaAssistenza']['oggetti']['txtDifetto'] = 'DIFETTO';
query['schedaAssistenza']['oggetti']['txtDescrizione'] = 'DESCRIZIONE';
query['schedaAssistenza']['oggetti']['txtNote'] = 'NOTE';
query['schedaAssistenza']['oggetti']['elencoUtenti'] = 'TECNICO';
query['schedaAssistenza']['oggetti']['txtData'] = 'DATAISO';
query['schedaAssistenza']['oggetti']['txtOraApp'] = 'ORAAPP';
query['schedaAssistenza']['oggetti']['cmbTipoAssistenza'] = 'GENERE';
query['schedaAssistenza']['oggetti']['txtNumero'] = 'NUMERO';
query['schedaAssistenza']['oggetti']['txtSerie'] = 'SERIE';
query['schedaAssistenza']['oggetti']['contrattiClienteAssistenza'] = 'ID_CONTRATTOV';
query['schedaAssistenza']['oggetti']['chkUltimato'] = 'ULTIMATO';


query['listaMaterialeImpiegato'] = new Array;
query['listaMaterialeImpiegato']['oggetti'] = new Array;

query['schedaAssistenza:RigaMateriale'] = new Array();
query['schedaAssistenza:RigaMateriale']['oggetti'] = new Array;
query['schedaAssistenza:RigaMateriale']['oggetti']['{riga}'] = 'riga';
query['schedaAssistenza:RigaMateriale']['oggetti']['{quantità}'] = { campo: "qu", decimaliMax: 2, decimaliMin: 0 };;
query['schedaAssistenza:RigaMateriale']['oggetti']['{codice}'] = 'codice';
query['schedaAssistenza:RigaMateriale']['oggetti']['{prezzoUnitario}'] = { campo: "listino", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['schedaAssistenza:RigaMateriale']['oggetti']['{importo}'] = { campo: "importo", decimaliMax: decimaliPrezzi, decimaliMin: 2 };
query['schedaAssistenza:RigaMateriale']['oggetti']['{piva}'] = { campo: "percIva", decimaliMax: 0, decimaliMin: 0 };
query['schedaAssistenza:RigaMateriale']['oggetti']['{descrizione}'] = 'descrizione';

query[nomePagina + ':elencoRangeDataOra'] = new Array;
query[nomePagina + ':elencoRangeDataOra']['oggetti'] = new Array;
query[nomePagina + ':elencoRangeDataOra']['oggetti']['{id}'] = { campo: 'id', decimaliMax: 0, decimaliMin: 0 };
query[nomePagina + ':elencoRangeDataOra']['oggetti']['{data}'] = { campo: 'data', formattaData: 1 };
query[nomePagina + ':elencoRangeDataOra']['oggetti']['{oraInizio}'] = 'oraInizio';
query[nomePagina + ':elencoRangeDataOra']['oggetti']['{oraFine}'] = 'oraFine';

query[nomePagina + ':formElencoRangeDataOra'] = new Array;
query[nomePagina + ':formElencoRangeDataOra']['oggetti'] = new Array;
query[nomePagina + ':formElencoRangeDataOra']['oggetti']['txtDataLavoro'] = 'data';
query[nomePagina + ':formElencoRangeDataOra']['oggetti']['txtOraInizio'] = 'oraInizio';
query[nomePagina + ':formElencoRangeDataOra']['oggetti']['txtOraFine'] = 'oraFine';

query[nomePagina + ':formModificaMateriale'] = new Array;
query[nomePagina + ':formModificaMateriale']['oggetti'] = new Array;
query[nomePagina + ':formModificaMateriale']['oggetti']['txtQuantitàMateriale'] = 'qu';
query[nomePagina + ':formModificaMateriale']['oggetti']['txtPrezzoUnitario'] = 'listino';
query[nomePagina + ':formModificaMateriale']['oggetti']['txtCodiceMateriale'] = 'codice';
query[nomePagina + ':formModificaMateriale']['oggetti']['txtDescrizioneMateriale'] = 'descrizione';


var xParametri = {};
var ricerca = "";
var tabelle = {};
var tabellaRangeOrario = new Array;

window.addEventListener("load", function (event) {
    var script = document.createElement("script");
    script.setAttribute('src', "componenti/elementiListaAssistenze.js");
    document.body.appendChild(script);
    script.onload = function () {
        query['listaMaterialeImpiegato']['modelloRiga'] = modelloRigaModalListaMagazzino;
        query['elencoAssistenze']['modelloRiga'] = elementiElencoAssistenze;
        query['schedaAssistenza:RigaMateriale']['modelloRiga'] = rigaDocumentoVeBa;
        query[nomePagina + ':elencoRangeDataOra']['modelloRiga'] = elementoGrigliaRangeDataOra;
        recuperaParametri();
    }


});

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
            xParametri[data[x]["parametro"]] = Number(data[x]["valore"]);
        } else {
            xParametri[data[x]["parametro"]] = data[x]["valore"];
        }
    }
    if (nomePagina == 'listaAssistenze.html') {
        avviaCarDatiElencoAssistenze('elencoAssistenze');
        if (getValoreParametroHref('idAssistenza') != '') {
            var idAssistenza = getValoreParametroHref('idAssistenza');
            if (idAssistenza != null) {
                if (idAssistenza.indexOf('#') != -1) {
                    idAssistenza = idAssistenza.substring(0, idAssistenza.indexOf('#'));
                }
             stampaRapportoAssistenza(idAssistenza);
            }
        }
    } else if (nomePagina == 'assistenza.html') {
        avviaCarDati('elencoUtenti');
        avviaCarDati('documentiVendita');
        creaDocumento('schedaAssistenza');

    }


}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "elencoUtenti":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "elencoUtenti", "select": selectID };
            break;
        case 'slcTipologia':
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case 'documentiVendita':
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiVendita", "select": selectID };
            break;
        case 'contrattiClienteAssistenza':
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "contrattiClienteAssistenza", "select": selectID , "idCliente": document.getElementById('txtRagioneSociale').getAttribute('idragionesociale') };
            break;
    }

    parametri.md5 = localStorage.getItem(selectID + ".md5");

    inviaRichiestaCentralino("query", parametri);
}
var risposte = 0;
var risposteMax = 2;
var tabelle = {};
function elaboraRisposta(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;
    risposte++;
    if (risp.error != '') {
        return "";
    }
    
    
    var nomeSession = nomeSessionJson(parametri);
    var nomeOS = nomeSessionOffSet(parametri);

    if (parametri.md5 == risp.md5) {
        data = JSON.parse(sessionStorage.getItem(nomeSession + ".jSon"));
    } else {
        sessionStorage.setItem(nomeSession + ".md5", risp.md5);
        sessionStorage.setItem(nomeSession + ".jSon", JSON.stringify(data));
    }
    if(data[0]==0){
        return;
    }
    if (risposte == risposteMax) {
        if (getValoreParametroHref('idAssistenza') != '') {
            var idAssistenza = getValoreParametroHref('idAssistenza');
            if (idAssistenza != null) {
                if (idAssistenza.indexOf('#') != -1) {
                    idAssistenza = idAssistenza.substring(0, idAssistenza.indexOf('#'));
                }
                apriSchedaAssistenza('apriSchedaAssistenza', idAssistenza);
            }
        }
    }
    if (parametri.tipoRisposta == "elencoClienti") {
        sessionStorage.setItem(nomeOS + ".offSet", parametri.offSet);
        query[nomePaginaTabella]['OFFSET'] += query[nomePaginaTabella]['FETCH'];
    }
    if (parametri.tipoRisposta == 'select') {
        popolaSelectDaJSON(data, parametri.select);
        return;
    } else if (parametri.tipoRisposta == 'object') {
        for (var x in data) {
            if (tabelle[parametri.nomeTabella] == undefined) {
                tabelle[parametri.nomeTabella] = {}
            }
            tabelle[parametri.nomeTabella][data[x].id] = data[x]
        }
        return;
    }
    popolaElencoDaJson(data, parametri.tipoRisposta, parametri.tipoElenco, parametri.nomeQuery, parametri.ricarica, parametri.scrollTop);

    elencoInCaricamento = 0;
}


elencoInCaricamento = 0;
function avviaCarDatiElencoAssistenze(tipoCarDati, ricarica = false) {
    ricerca = "";

    var statoAssistenza = document.getElementById("btnStatoAssistenza").getAttribute('statoAssistenza');
    if (elencoInCaricamento == 1 && ricarica==false) {
        return;
    }
    if (elencoInCaricamento == 0) {
        elencoInCaricamento = 1
    }
    var idCliente = document.getElementById("cmbClienti").getAttribute('idragionesociale');
    if (idCliente == null || idCliente == undefined) {
        // idCliente='';
    }
    
    var interventoInterno=document.getElementById("interventoInterno");
    var interventoEsterno=document.getElementById("interventoEsterno");
    var teleassistenza=document.getElementById("teleassistenza");
    
    var genereAssistenze='';
    if(interventoInterno.checked==true){
        genereAssistenze+='0,';
    }
    if(interventoEsterno.checked==true){
        genereAssistenze+='1,';
    }
    if(teleassistenza.checked==true){
        genereAssistenze+='2,';
    }
    if(genereAssistenze!=''){
        genereAssistenze=genereAssistenze.substring(0,genereAssistenze.length-1);
    }
    var dataDa=document.getElementById("txtDataDa").value;
    var dataA=document.getElementById("txtDataA").value;
    if(dataDa!=''){
        dataDa=convertiDataEngIta(dataDa);
    }
    if(dataA!=''){
        dataA=convertiDataEngIta(dataA);
    }
    var nomeQuery = tipoCarDati;
    if (ricarica == true) {
        query[nomeQuery]['MAXFETCH'] = 0;
        query[nomeQuery]['OFFSET'] = 0;
    }
    if (query[nomeQuery]['OFFSET'] >= query[nomeQuery]['MAXFETCH'] && query[nomeQuery]['MAXFETCH'] != 0) {
        return '';
    }
    var parametri = { "tipoQuery": "assistenza", "tipoRisposta": tipoCarDati, "nomeQuery": nomeQuery, 'offSet': query[nomeQuery]['OFFSET'], 'fetch': query[nomeQuery]['FETCH'], 'statoAssistenza': statoAssistenza, 'idCliente': idCliente ,'genereAssistenza':genereAssistenze,
        'dataDa':dataDa,'dataA':dataA};


    inviaRichiestaCentralino("query", parametri, (resj) => {
        var res = JSON.parse(resj);
        var data = res.risposta;
        var parametriRisp = res.parametri;
        elencoInCaricamento = 0;

        if (data[0] != 0) {
            query[nomeQuery]['OFFSET'] += parametri.fetch;
            popolaElencoDaJson(data, tipoCarDati, 0, nomeQuery, ricarica, ricarica);
        } else {
            document.getElementById(tipoCarDati).innerHTML = '';
        }
    });

}

function clickBack() {
    if (xTarget == "_blank") {
        window.close();
    } else {
        if (nomePagina == 'assistenza.html') {
            open("listaAssistenze.html", xTarget);
        } else {
            open("mainPage.html", xTarget);
        }

    }
}

function assistenzeAperteChiuse(button) {
    if (button.getAttribute('statoAssistenza') == '0') {
        var img = button.getElementsByTagName("img")[0];
        img.src = 'img/bianche/checkVuoto.svg';
        button.setAttribute('statoAssistenza', '1');
    } else {
        var img = button.getElementsByTagName("img")[0];
        img.src = 'img/bianche/check.svg';
        button.setAttribute('statoAssistenza', '0');
    }
    avviaCarDatiElencoAssistenze("elencoAssistenze", true);
}
function elencoAssistenzeScroll(ec, pagina, txtRicerca = "") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    // window.sessionStorage.setItem(nomeStorage+".elencoArticoli.scroolTop", scrollPos);

    if ((maxScroll * 90 / 100) < scrollPos && elencoInCaricamento == 0) {

        avviaCarDatiElencoAssistenze("elencoAssistenze", false);
    }
}
function nomeSessionJson(parametri) {
    if (parametri.tipoRisposta == "elencoClienti") {
        return nomePagina + "." + tipoAnagrafica + "." + parametri.tipoRisposta + "." + parametri.ricerca + "." + parametri.localita + "." + parametri.prov + "." + parametri.idZona + "." + parametri.idFamiglia + "." + parametri.aperti + "." + parametri.idAgente + "." + parametri.offSet;
    } else {
        return nomePagina + "." + tipoAnagrafica + "." + parametri.tipoRisposta;
    }
}

function nomeSessionOffSet(parametri) {
    if (parametri.tipoRisposta == "elencoClienti") {
        return nomePagina + "." + tipoAnagrafica + "." + parametri.tipoRisposta + "." + parametri.ricerca + "." + parametri.localita + "." + parametri.prov + "." + parametri.idZona + "." + parametri.idFamiglia + "." + parametri.aperti + "." + parametri.idAgente;
    } else {
        return nomePagina + "." + tipoAnagrafica + "." + parametri.tipoRisposta;
    }
}
function apriSchedaAssistenza(e, idAssistenza) {
    if (idAssistenza != '') {
        var nomeQuery = "schedaAssistenza";
        var parametri = { "tipoQuery": "assistenza", "tipoRisposta": "schedaAssistenza", "nomeQuery": nomeQuery, 'idAssistenza': idAssistenza };
        inviaRichiestaCentralino("query", parametri, (resj) => {
            var res = JSON.parse(resj);
            var data = res.risposta;
            var parametriRisp = res.parametri;
            if (data[0] == 0) {
                attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Assistenza non trovata', '');
                return;
            }
            if (nomePagina == 'assistenza.html') {
                console.log(data[0])
                popolaFormModificaDati(data[0], 'schedaAssistenza');
                document.getElementById('txtRagioneSociale').setAttribute('idRagioneSociale', data[0].IDRAGIONESOCIALE);
                if (data[0].IDTES > 0) {
                    var obj = {
                        'id': data[0].IDTES,
                        'av': 'V',
                    }
                    richiamaDocumento(obj, (res) => {
                        var data = res.risposta;
                        documento['schedaAssistenza'] = data;
                        var elencoMateriale = new Array;
                        for (var x of documento['schedaAssistenza'].prodotti.data) {
                            if (x.codice != '') {
                                elencoMateriale.push(x);
                            } else {
                                document.getElementById('txtAssistenza').value += x.descrizione;
                                if (x.datiPorteMVP != '') {
                                    try {
                                        tabellaRangeOrario = JSON.parse(x.datiPorteMVP);
                                        popolaElencoDaJson(tabellaRangeOrario, 'elencoRangeDataOra', 0, nomePagina + ':elencoRangeDataOra', true, 0);
                                    } catch {
                                        tabellaRangeOrario = new Array;
                                    }
                                }
                            }
                        }
                        popolaElencoDaJson(elencoMateriale, 'elencoMateriale', 0, 'schedaAssistenza:RigaMateriale', true, true);
                        aggiornaTotaliVideo();
                    });
                } 
                ricercaContrattoCliente();
                
            } else {
                query[nomePagina + ':schedaAssistenza'] = new Array;
                query[nomePagina + ':schedaAssistenza']['modalC-head'] = 'Scheda Assistenza';
                // query[nomePagina + ':schedaAssistenza']['styleModalBody'] = 'height:calc(100% - 50px);';
                query[nomePagina + ':schedaAssistenza']['classModal'] = "modalCMedio";
                query[nomePagina + ':schedaAssistenza']['modalC-body'] = `
            <div class="w100 marg5Top normale test20 clrBase">
                <div class="w100 clrScuro">
                    <span class="padSx4">${data[0].RAGIONESOCIALE}</span>
                </div>
                <br>
                <div class="w100 clrScuro">
                    <span class="padSx4">Segnalazione :</span>
                </div>
                <br>
                <div class="w100 ">
                    <span class="padSx4">${data[0].DIFETTO}</span>
                </div>
                <br>
                <div class="w100 clrScuro">
                    <span class="padSx4">Note :</span>
                </div> 
                <div class="w100 ">
                    <span class="padSx4">${data[0].NOTE}</span>
                </div>
                <br>
                <div class="w100">
                    <div class="padSx4">
                        <div class="">Indirizzo : <span>${data[0].INDIRIZZO}</span></div>
                        <div>Appuntamento : ${data[0].DATA}  ${data[0].ORAAPP}</div>
                        <br>
                        <div>Tecnico : ${data[0].TECNICO} </div>
                    </div>
                </div>
            </div>
            `;
                query[nomePagina + ':schedaAssistenza']['modalC-footer'] = `
        <div class="h50p clrSfumatoChiaro w100" style="border-radius:0px 0px 10px 10px ">
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                    <input type="button" class="pulsanteVeBa w100 h90" value="Lavorazione" onclick="assistenza('${idAssistenza}')">
                </div>
            </div>
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                    <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom()">
                </div>
            </div>
        </div>
        `;
                apriModalCustom(nomePagina + ":schedaAssistenza", data[0], 'Scheda assistenza',);
            }
        })
    }
}
function assistenza(idAssistenza = '') {
    if (idAssistenza != '') {
        var link = "assistenza.html" + '?idAssistenza=' + idAssistenza;
    } else {
        var link = "assistenza.html";
    }
    open(link, xTarget);
}
function tabClick(input) {
    var corpotestata = document.getElementById('divCorpoTestata');
    var corpoAvanzamento = document.getElementById('divCorpoLavorazione');
    var corpoMateriale = document.getElementById('divCorpoMateriale');
    if (corpotestata.classList.contains('hide') == false) {
        corpotestata.classList.add('hide');
    }
    if (corpoAvanzamento.classList.contains('hide') == false) {
        corpoAvanzamento.classList.add('hide');
    }
    if (corpoMateriale.classList.contains('hide') == false) {
        corpoMateriale.classList.add('hide');
    }

    var tabLink = input.parentNode.getElementsByTagName('button');
    for (var i = 0; i < tabLink.length; i++) {
        tabLink[i].classList.remove('tabLinkSelezionato');
    }

    if (input.id == 'tabTestata') {
        corpotestata.classList.remove('hide');
    } else if (input.id == 'tabAssistenza') {
        corpoAvanzamento.classList.remove('hide');
    } else if (input.id == 'tabMateriale') {
        corpoMateriale.classList.remove('hide');
    }
    input.classList.add('tabLinkSelezionato');

}
function salva() {
    if (xParametri.idIvaPredefinita == undefined) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Iva predefinita non impostata', '');
        return;
    }
    if (xParametri.idDocAssistenza == undefined) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Documento assistenza non impostato', '');
        return;
    }
    if (document.getElementById("divAddDataOra") != undefined) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Completare la modifica della data e ora', '')
        return
    }
    if (document.getElementById("divModificaMateriale") != undefined) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Completare la modifica del materiale utilizzato', '')
        return
    }
    
    var idAssistenza = getValoreParametroHref('idAssistenza');
    if (idAssistenza != null && idAssistenza.indexOf('#') != -1) {
        idAssistenza = idAssistenza.substring(0, idAssistenza.indexOf('#'));
    }


    var obj = {};
    recuperaValoriJson(obj, 'schedaAssistenza')

    if (idAssistenza != null) {
        obj.ID = idAssistenza;
    }
    var idCliente = document.getElementById('txtRagioneSociale').getAttribute('idRagioneSociale');
    if (idCliente == null) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Cliente non trovato', '');
        return;
    }
    obj.CLIENTE = idCliente;
    if (obj.ORAAPP != null) {
        obj.ORAAPP = obj.ORAAPP.replace(/:/g, '.');
    }
    if (documento['schedaAssistenza'] != undefined) {
        // var documentoTmp=JSON.parse(JSON.stringify(documento['schedaAssistenza']));


        if (documento['schedaAssistenza'].testata != undefined) {
            documento['schedaAssistenza'].testata.data = convertiDataEngIta(documento['schedaAssistenza'].testata.data);
        }
        for (var x in documento['schedaAssistenza'].prodotti.data) {
            if (documento['schedaAssistenza'].prodotti.data[x].codice == '') {
                documento['schedaAssistenza'].prodotti.data[x] = {};
            }
        }
        var tabellaRangeOrarioTmp = new Array;
        var contTabella=0;
        for (var x in tabellaRangeOrario) {
            if (isEmpty(tabellaRangeOrario[x]) == false && tabellaRangeOrario[x]!={}) {
                tabellaRangeOrarioTmp.push( {
                    'data':tabellaRangeOrario[x].data,
                    'oraInizio':tabellaRangeOrario[x].oraInizio,
                    'oraFine':tabellaRangeOrario[x].oraFine,
                    'id':tabellaRangeOrarioTmp.length
                    }
                    );//ripulisco da eventuali elementi vuoti
                contTabella++;
            }
        }
        if(contTabella>2){
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Non è possibile inserire più di due intervalli di orario', '');
            return
        }
        var lavorazione = recuperaValueElemento('txtAssistenza');
        if (lavorazione != '' && lavorazione != ' ') {
            var mov = {
                "codice": '',
                "descrizione": recuperaValueElemento('txtAssistenza'),
                "qu": 1,
                'idIva': xParametri.idIvaPredefinita,
                'listino': 0,
                'percIva': 22,
                'um': 'NR',
                'importo': calcolaImporto(0, 1, '0', '0', '0', '0', '0'),
                'datiPorteMVP': JSON.stringify(tabellaRangeOrarioTmp),
                'chiave':1
            }
            var n = aggiungiMovimento(mov, '', 'schedaAssistenza');
        }
        var objTes = {
            'idCliente': idCliente,
            'idTipo': xParametri.idDocAssistenza,
            'genere': tabelle['documentiVendita'][xParametri.idDocAssistenza].genere,
            'AV': 'V'
        };
        aggiungiTestata(objTes, 'schedaAssistenza');
        obj.documento = documento['schedaAssistenza'];
    }
    var parametri = {
        "tipoRisposta": "salva",
        "tipoSalva": "assistenza",
        "dati": obj,
    };
    inviaRichiestaCentralino('salva', parametri, (res) => {
        var res = JSON.parse(res);
        if (res.risposta == 0) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Errore salvataggio', '');
            return;
        }
        var idAssistenzaTmp = res.risposta;
        
        window.location.href='listaAssistenze.html?idAssistenza='+idAssistenzaTmp;
    })
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
        var gestIva=false;
        if(tabelle['documentiVendita'][xParametri.idDocAssistenza].ivaInc=='1'){
            gestIva=true;
        }
        if (data[0] != 0) {
            var mov = {
                "codice": data.CODICE,
                "descrizione": data.DESCRIZIONE,
                "qu": 1,
                'idIva': data.ID_IVA,
                'listino': (gestIva==false ? data.PREZZOLIVAESCL:data.PREZZO),
                'percIva': data.PIVA,
                'um': data.UM,
                
            }
            mov.importo = calcolaImporto(mov.listino, 1, '0', '0', '0', '0', '0')
            var n = aggiungiMovimento(mov, '', 'schedaAssistenza');

            aggiornaTotale(documento['schedaAssistenza'].totali, documento['schedaAssistenza'].prodotti.data[n], 1,null,null,null,gestIva);
            input.value = '';
            gestioneListaMateriale();
            aggiornaTotaliVideo();
        } else {
            attivaAlert(xTipoAllert.DOMANDASINO, 'Codice non trovato!<br> Vuoi Associare il codice :' + input.value + ' ad un articolo già anagrafato?', 'rispAssociaCodice_' + input.value);
            input.value = '';
            input.focus();
        }
    })
}
var liOrigRangeDataOra = '';
function formInserimentoRangeDataOra(riga = '') {
    if (document.getElementById("divAddDataOra") == undefined) {
        if (riga == '') {
            var ul = document.getElementById("elencoRangeDataOra");
            ul.innerHTML += elementoLiFormInserimentoRangeDataOra;

            var li = document.getElementById("liXAddRigaRangeDataOra");
            li.innerHTML = elementoFormInserimentoRangeDataOra;
            document.getElementById('txtDataLavoro').value = oggiISO();
            setTimeout(function () {
                ul.scrollTop = ul.scrollHeight;
            }, 100);
        } else {
            var li = document.getElementById("liRigaRangeDataOra." + riga);
            liOrigRangeDataOra = li.innerHTML;

            li.innerHTML = elementoFormInserimentoRangeDataOra;

            document.getElementById("btnInseriementoRigaRangeDataOra").setAttribute("onclick", "inserisciRigaRangeDataOra('" + riga + "')");
            document.getElementById("btnAnnullaInserimentoRangeDataOra").setAttribute("onclick", "annullaAddRigaRangeDataOra('" + riga + "')");
            popolaFormModificaDati(tabellaRangeOrario[riga], nomePagina + ':formElencoRangeDataOra');
        }
    } else {
        attivaAlert(0, "Concludere la modifica in Corso!", "apriModificaDestinazione");
    }
}
function inserisciRigaRangeDataOra(riga = '') {
    var data = document.getElementById('txtDataLavoro').value;
    var oraInizio = document.getElementById('txtOraInizio').value;
    var oraFine = document.getElementById('txtOraFine').value;

    if (data == '' || oraInizio == '' || oraFine == '') {
        attivaAlert(2, 'Non sono stati inseriti tutti i dati', 'erroriCampi');
        return;
    }
    if (riga == '') {
        var id = tabellaRangeOrario.length;
        tabellaRangeOrario.push({ "data": convertiDataSql(data), oraInizio: oraInizio, oraFine: oraFine, id: id });

    } else {
        tabellaRangeOrario[riga].data = data;
        tabellaRangeOrario[riga].oraInizio = oraInizio;
        tabellaRangeOrario[riga].oraFine = oraFine;
    }
    popolaElencoDaJson(tabellaRangeOrario, 'elencoRangeDataOra', 0, nomePagina + ':elencoRangeDataOra', true, 0);
    var ul = document.getElementById("elencoRangeDataOra");
    setTimeout(function () {
        ul.scrollTop = ul.scrollHeight;
    }, 100);
}
function annullaAddRigaRangeDataOra(id = '') {
    if (id == '') {
        var e = document.getElementById("liXAddRigaRangeDataOra");
        e.parentNode.removeChild(e);
    } else {
        var e = document.getElementById("liRigaRangeDataOra." + id);
        e.innerHTML = liOrigRangeDataOra;
        // popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    }
}
function eliminaRigaRageDataOra(riga) {
    tabellaRangeOrario[riga] = {};
    popolaElencoDaJson(tabellaRangeOrario, 'elencoRangeDataOra', 0, nomePagina + ':elencoRangeDataOra', true, 0);
}
var liOrigMateriale = '';
function formModificaMateriale(riga = '') {
    if (document.getElementById("divModificaMateriale") == undefined) {
        if (riga == '') {
            var ul = document.getElementById("elencoMateriale");
            ul.innerHTML += elementoLiFormModificaMateriale;

            var li = document.getElementById("liXAddRigaRangeDataOra");
            li.innerHTML = elementoFormModificaMateriale;

            setTimeout(function () {
                ul.scrollTop = ul.scrollHeight;
            }, 100);
        } else {
            var li = document.getElementById("liRigaMateriale." + riga);
            liOrigMateriale = li.innerHTML;

            li.innerHTML = elementoFormModificaMateriale;

            document.getElementById("btnModificaMateriale").setAttribute("onclick", "modificaMateriale('" + riga + "')");
            document.getElementById("btnAnnullaModificaMateriale").setAttribute("onclick", "annullaModificaMateriale('" + riga + "')");
            popolaFormModificaDati(documento['schedaAssistenza'].prodotti.data[riga], nomePagina + ':formModificaMateriale');
        }
    } else {
        attivaAlert(0, "Concludere la modifica in Corso!", "apriModificaDestinazione");
    }
}
function annullaModificaMateriale(riga = '') {
    if (riga == '') {
        var e = document.getElementById("liXAddRigaRangeDataOra");
        e.parentNode.removeChild(e);
    } else {
        var e = document.getElementById("liRigaMateriale." + riga);
        e.innerHTML = liOrigMateriale;
        // popolaElencoDaJson(tabellaScontiCassa, 'elencoScontiCassa', 0, nomePagina + ':tabellaScontiCassa', true, 0);
    }
}
function modificaMateriale(riga = '') {
    var codice = document.getElementById('txtCodiceMateriale').value;
    var descrizione = document.getElementById('txtDescrizioneMateriale').value;
    var quantità = document.getElementById('txtQuantitàMateriale').value;
    var prezzo = document.getElementById('txtPrezzoUnitario').value;

    if (codice == '' || descrizione == '' || quantità == '') {
        attivaAlert(2, 'Non sono stati inseriti tutti i dati', 'erroriCampi');
        return;
    }
    var datiMovimento = documento['schedaAssistenza'].prodotti.data[riga];
    aggiornaTotale(documento['schedaAssistenza'].totali, documento['schedaAssistenza'].prodotti.data[riga], -1);
    documento['schedaAssistenza'].prodotti.data[riga].descrizione = descrizione;
    documento['schedaAssistenza'].prodotti.data[riga].qu = quantità;
    documento['schedaAssistenza'].prodotti.data[riga].importo = calcolaImporto(prezzo, quantità);

    aggiornaTotale(documento['schedaAssistenza'].totali, documento['schedaAssistenza'].prodotti.data[riga], 1);
    gestioneListaMateriale();
    aggiornaTotaliVideo();
}
function gestioneListaMateriale() {
    var elencoMateriale = new Array;
    for (var x of documento['schedaAssistenza'].prodotti.data) {
        if (x.codice != '') {
            elencoMateriale.push(x);
        }
    }
    popolaElencoDaJson(elencoMateriale, 'elencoMateriale', 0, 'schedaAssistenza:RigaMateriale', true, true);
}
function eliminaRigaMateriale(riga) {
    aggiornaTotale(documento['schedaAssistenza'].totali, documento['schedaAssistenza'].prodotti.data[riga], -1);
    documento['schedaAssistenza'].prodotti.data[riga] = {};
    gestioneListaMateriale();
    aggiornaTotaliVideo();
}
function selezionaDaMenuScomparsa(e) {
    document.getElementById('codiceArticolo').value = e.getAttribute('codice');
    cercaCodice(document.getElementById('codiceArticolo'));
}
function stampaRapportoAssistenza(idAssistenza) {
    // var idAssistenza = getValoreParametroHref('idAssistenza');
    // if (idAssistenza != null && idAssistenza.indexOf('#') != -1) {
    //     idAssistenza = idAssistenza.substring(0, idAssistenza.indexOf('#'));
    // }
    var parametri = { 'idAssistenza': idAssistenza };

    var obj = {
        'filtri': parametri,
        "tipoReport": "rapportoAssistenza",
    }

    stampaReport(obj)
}
function ricercaContrattoCliente() {

    avviaCarDati('contrattiClienteAssistenza');
}

function cambiaTipoIntervento(input){
    var tipoIntervento = document.getElementById('cmbTipoIntervento');
    if(input.value!=0){
        tipoIntervento.value = 'Intervento Con Contratto';
    }else{
        tipoIntervento.value = 'Intervento Fuori Contratto';
    }
}
function aggiornaTotaliVideo(){
    var divTotaleMaterialeDivMateriale=document.getElementById('totaleMaterialeDivMateriale');
    var divTotaleMaterialeDivManodopera=document.getElementById('strTotManodopera');
    var divMateriale=document.getElementById('strMateriale');
    var strImponibile=document.getElementById('strImponibile');
    var strTotPagare=document.getElementById('strTotPagare');
    if(documento['schedaAssistenza']!=undefined){
        var totaleMateriale=0;
        var totaleManodopera=0;
        for(var x in documento['schedaAssistenza'].prodotti.data){
            if(isEmpty(documento['schedaAssistenza'].prodotti.data[x])==false){
                if(documento['schedaAssistenza'].prodotti.data[x].codice!=''){
                    totaleMateriale+=Number(documento['schedaAssistenza'].prodotti.data[x].importo);
                }else{
                    totaleManodopera+=Number(documento['schedaAssistenza'].prodotti.data[x].importo);
                }
            }
        }
        console.error(totaleMateriale);
        divTotaleMaterialeDivMateriale.innerText=formattaNumeri(totaleMateriale,2,2);
        divMateriale.innerText=formattaNumeri(totaleMateriale,2,2);
        divTotaleMaterialeDivManodopera.innerText=formattaNumeri(totaleManodopera,2,2);
        strImponibile.innerText=formattaNumeri(documento['schedaAssistenza'].totali.totale,2,2);
        strTotPagare.innerText=formattaNumeri(documento['schedaAssistenza'].totali.tDoc,2,2);

        
    }
}
function eliminaScheda(risp,id){
    if(risp.toLowerCase()=='si'){
        const parametri={"tipoRisposta":"elimina", "tipoElimina":"schedaAssistenza", "id":id};
    inviaRichiestaCentralino("elimina", parametri, (res)=>{
        var risp=JSON.parse(res);
        var parametri=risp.parametri;
        var data=risp.risposta;
    
        if (risp.error!=''){
            return "";
        }
        
        avviaCarDatiElencoAssistenze('elencoAssistenze',true);
    });
    }
}
function avviaRicercaLettoreBarcode(inputID) {
    var input = document.getElementById(inputID);
    cercaCodice(input);
}