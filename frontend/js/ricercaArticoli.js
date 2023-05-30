query['ricercaArticoli.html:filtri'] = new Array;
query['ricercaArticoli.html:filtri']['oggetti'] = new Array;
query['ricercaArticoli.html:filtri']['oggetti']['codiceArticolo'] = 'CODICE';
query['ricercaArticoli.html:filtri']['oggetti']['txtDescrizione'] = 'DESCRIZIONE';
query['ricercaArticoli.html:filtri']['oggetti']['slcFamiglie'] = 'FAMIGLIA';
query['ricercaArticoli.html:filtri']['oggetti']['slcFamiglie0'] = 'SFAMIGLIA0'
query['ricercaArticoli.html:filtri']['oggetti']['slcFamiglie1'] = 'SFAMIGLIA1';
query['ricercaArticoli.html:filtri']['oggetti']['slcFamiglie2'] = 'SFAMIGLIA2';
query['ricercaArticoli.html:filtri']['oggetti']['slcTipologia'] = 'TIPOLOGIA';
query['ricercaArticoli.html:filtri']['oggetti']['slcTipologia2'] = 'TIPOLOGIA2';
query['ricercaArticoli.html:filtri']['oggetti']['slcFornitoreAbituale'] = 'FORNITORE';
query['ricercaArticoli.html:filtri']['oggetti']['slcAzienda'] = 'AZIENDA';
query['ricercaArticoli.html:filtri']['oggetti']['slcDeposito'] = 'DEPOSITO';
query['ricercaArticoli.html:filtri']['oggetti']['chkServizi'] = 'SERVIZI';
query['ricercaArticoli.html:filtri']['oggetti']['chkObsoleti'] = 'OBSOLETI';
query['ricercaArticoli.html:filtri']['oggetti']['chkGiac1'] = 'GIAC1';
query['ricercaArticoli.html:filtri']['oggetti']['chkGiac0'] = 'GIAC0';

query['ricercaArticoli.html:lista'] = new Array;
query['ricercaArticoli.html:lista']['OFFSET'] = 0;
query['ricercaArticoli.html:lista']['FETCH'] = 100;
query['ricercaArticoli.html:lista']['MAXFETCH'] = 0;
query['ricercaArticoli.html:lista']['oggetti'] = new Array;
query['ricercaArticoli.html:lista']['oggetti']['{CODICE}'] = 'CODICE';
query['ricercaArticoli.html:lista']['oggetti']['{DESCRIZIONE}'] = 'DESCRIZIONE';
query['ricercaArticoli.html:lista']['oggetti']['{LISTINORIF}'] = { campo: 'LISTINORIF', decimaliMax: 2, decimaliMin: 2 };
query['ricercaArticoli.html:lista']['oggetti']['{PREZZOLIVAESCL}'] = { campo: 'PREZZOLIVAESCL', decimaliMax: 2, decimaliMin: 2 };
query['ricercaArticoli.html:lista']['oggetti']['{UCOSTO}'] = { campo: 'UCOSTO', decimaliMax: 2, decimaliMin: 2 };
query['ricercaArticoli.html:lista']['oggetti']['{GIACENZA}'] = { campo: 'GIACENZA', decimaliMax: 2, decimaliMin: 0 };
query['ricercaArticoli.html:lista']['oggetti']['{DISP}'] = { campo: 'DISP', decimaliMax: 2, decimaliMin: 0 };

var parametriNC = { "nascosti": "", "conti": "", "visSpese": 0, "maxAbbuono": 0, "modificheGuajana": 0 };
var datiArticolo = '';
var tabelle = {};
var elencoInCaricamento=0;
var codiceSelezionato='';

window.addEventListener("load", function (event) {
    setTimeout(function () {
        avviaCarDati("slcTipologia");
        avviaCarDati("slcTipologia2");
        avviaCarDati("slcDeposito");
        avviaCarDati("slcFamiglie");
        avviaCarDati("slcSottoFamiglie");
        avviaCarDati("slcFornitoreAbituale");
        
        recuperaParametri();

        var script = document.createElement("script");
        script.setAttribute('src', "componenti/elementiRicercaArticoli.js");
        document.body.appendChild(script);
        script.onload = function () {
            document.getElementById('testataElencoArticoli').innerHTML = testataRicercaArticoli;
            query['ricercaArticoli.html:lista']['modelloRiga'] = rigaElencoArticoli;

            apriFiltri();
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

    // var script = document.createElement("script");
    // document.body.appendChild(script);
    // script.onload = function () {

    // }
}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "cmbConto":
            parametri = { "tipoRisposta": "select", "tipoQuery": "querySpecifica", "nomeTabella": "contiIncPag", "select": selectID, "soloConti": parametriNC.conti };
            break;
        case "elencoUtentiAp":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "elencoUtentiAp", "select": selectID };
            break;
        case 'slcTipologia':
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case 'slcTipologia2':
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case 'slcDeposito':
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case "slcFamiglie":
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case "slcSottoFamiglie":
            parametri = { "tipoRisposta": "array", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
            break;
        case "slcFornitoreAbituale":
            parametri = { "tipoRisposta": "select", "tipoQuery": "ricercaElencoArticoli", "nomeQuery": selectID, "select": selectID };
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


function pulisciCampi() {

}
function AvviaCarDatiRicercaArticoli(ricarica = true, righe = 0, scrollTop = 0) {
    var nomeQuery = 'ricercaArticoli.html:lista';

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
    document.getElementById('btnFiltriRicercaArticoli').classList.remove('filtroSelezionato');
    if (ricarica) {
        query[nomeQuery]['OFFSET'] = 0;
    }
    var parametri = {
        "offSet": query[nomeQuery]['OFFSET'], "fetch": query[nomeQuery]['FETCH'], "tipoQuery": "ricercaElencoArticoli", "nomeTabella": "ricercaElencoArticoli", "nomeQuery": "elencoArticoli", "select": "elencoArticoli"
    }

    var filtroImpostato=false;
    for (var [k, v] of Object.entries(query['ricercaArticoli.html:filtri']['oggetti'])) {
        parametri[v] = recuperaValueElemento(k);
        var filtro = document.getElementById(k);
        if(filtroImpostato==false){
            if(filtro.type=="checkbox" && recuperaValueElemento(k)==1){
                document.getElementById('btnFiltriRicercaArticoli').classList.add('filtroSelezionato');
                filtroImpostato=true;
            }else if(recuperaValueElemento(k)!=''){
                document.getElementById('btnFiltriRicercaArticoli').classList.add('filtroSelezionato');
                filtroImpostato=true;
            } 
        }
        
            
        
    }
    
    elencoInCaricamento=1;
    apriFiltri(true)
    inviaRichiestaCentralino("query", parametri, (resj) => {
        var res = JSON.parse(resj);
        var data = res.risposta;
        elencoInCaricamento=0;
        
        if (data[0] != 0) {
            query[nomeQuery]['OFFSET'] += parametri.fetch;
            popolaElencoDaJson(data, 'elencoArticoli', 0, nomeQuery, ricarica, ricarica);
        } else {
            document.getElementById('elencoArticoli').innerHTML = '';
        }
    });
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
function pulisciForm() {
    for (var [k, v] of Object.entries(query['ricercaArticoli.html:filtri']['oggetti'])) {
        var input=document.getElementById(k);
        if(input.type=='checkbox'){
            input.checked=false;
        }else{
            input.value = '';
        }
    }
    document.getElementById('btnFiltriRicercaArticoli').classList.remove('filtroSelezionato');
}
function apriFiltri(chiudiForzatamente=false) {
    var x = document.getElementById('divFiltri')

    var agg=document.getElementById("cmdProduzione");
    var cmdAnnulla=document.getElementById("cmdAnnullaRicerca");
    var cmdCerca=document.getElementById("cmdFoglioDiCarico");
    var pulisci=document.getElementById("cmdPulisci");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if(chiudiForzatamente==true){
        x.classList.add('hideFiltriRicercaArticoli');
        agg.classList.remove('hide');
        cmdAnnulla.classList.remove('hide');
        if(vw<1440){
            cmdCerca.classList.add('hide');
            pulisci.classList.add('hide');
        }
        
        return;
    }
    if (x.classList.contains('hideFiltriRicercaArticoli') == true) {
        x.classList.remove('hideFiltriRicercaArticoli');
        agg.classList.add('hide');
        cmdAnnulla.classList.add('hide');
        cmdCerca.classList.remove('hide');
        pulisci.classList.remove('hide');
    } else {
        x.classList.add('hideFiltriRicercaArticoli');
        agg.classList.remove('hide');
        cmdAnnulla.classList.remove('hide');
        if(vw<1440){
            cmdCerca.classList.add('hide');
            pulisci.classList.add('hide');
        }
    }

}

function elencoArticoliScroll(ec, pagina, txtRicerca = "") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    // window.sessionStorage.setItem(nomeStorage+".elencoArticoli.scroolTop", scrollPos);

    if ((maxScroll * 90 / 100) < scrollPos && elencoInCaricamento == 0) {
        console.log('dentro');
        AvviaCarDatiRicercaArticoli(false)
    }
}

function aggiungiCodiceArticolo(){
    if(codiceSelezionato==''){
        attivaAlert(xTipoAllert.INFORMAZIONE,'Nessun articolo selezionato');
        return;
    }
    var obj={
        'codice':codiceSelezionato
    }
    
    obj.token=xTkCom;
    window.parent.postMessage(JSON.stringify(obj), '*');
    return
}

function avviChiudiModalCustom(){
    var obj={
        'codice':""
    }
    obj.token=xTkCom;
    window.parent.postMessage(JSON.stringify(obj), '*');
    return
}

function selezionaRiga(input){
    if(codiceSelezionato!=''){
        var exList=document.getElementById(codiceSelezionato);
        if(exList!=null || exList!=undefined){
            exList.classList.remove('selectDiv');
            exList.classList.remove('heightAuto');
        }
    }
    input.classList.add('selectDiv');
    input.classList.add('heightAuto');
    codiceSelezionato=input.id;
}

