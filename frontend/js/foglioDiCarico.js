var parametriNC = { "nascosti": "", "conti": "", "visSpese": 0, "maxAbbuono": 0, "modificheGuajana": 0 };

var idSelezionato;
var tabelle = {};
var listaUDC=new Array;
window.addEventListener("load", function (event) {
    setTimeout(function () {


        recuperaParametri();

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
    script.setAttribute("src", "componenti/elementiFoglioDiCarico.js");
    document.body.appendChild(script);

    script.onload = function () {
        query['foglioDiCarico.html'] = new Array;
        query['foglioDiCarico.html']['modelloRiga'] = modelloRigaFogliDiCarico;
        query['foglioDiCarico.html']['oggetti'] = new Array;
        query['foglioDiCarico.html']['oggetti']['{RAGIONESOCIALEVETTORE}'] = "RAGIONESOCIALEVETTORE";
        query['foglioDiCarico.html']['oggetti']['{TOTPALLETS}'] = { "campo": "TOTPALLETS", "deciamaliMax": 2, "decimaliMin": 0 };
        query['foglioDiCarico.html']['oggetti']['{DATAC}'] = "DATAC";
        query['foglioDiCarico.html']['oggetti']['{LISTAIDTES}'] = "LISTAIDTES";
        query['foglioDiCarico.html']['oggetti']['{NORDINI}'] = "NORDINI";
        query['foglioDiCarico.html']['oggetti']['{ID}'] = "ID";
        query['foglioDiCarico.html']['oggetti']['{OPERATORE}'] = "OPERATORE";
        query['foglioDiCarico.html']['oggetti']['{USERNAME}'] = "USERNAME";

        query['dettaglioFoglioDiCarico'] = new Array;
        query['dettaglioFoglioDiCarico']['modelloRiga'] = modelloRigaDettaglioFoglioDiCarico
        query['dettaglioFoglioDiCarico']['modelloRaggruppamento'] = modelloRaggruppamentoDettaglioFoglioDiCarico;
        query['dettaglioFoglioDiCarico']['modelloContenitore'] = modalDettaglioFoglioDiCarico;
        query['dettaglioFoglioDiCarico']['oggetti'] = new Array;
        query['dettaglioFoglioDiCarico']['oggetti']['{DESCRIZIONE}'] = 'DESCRIZIONE';
        query['dettaglioFoglioDiCarico']['oggetti']['{QU}'] = { campo: "QU", decimaliMax: 2, decimaliMin: 0 };
        query['dettaglioFoglioDiCarico']['oggetti']['{RAGGRUPPAMENTO}'] = "IDTES";
        query['dettaglioFoglioDiCarico']['oggetti']['{CODICE}'] = 'CODICE';
        query['dettaglioFoglioDiCarico']['oggetti']['{ORDINE}'] = 'ORDINE';
        query['dettaglioFoglioDiCarico']['oggetti']['{UM}'] = 'UM';
        query['dettaglioFoglioDiCarico']['oggetti']['{RAGIONE_SOCIALE}'] = 'RAGIONE_SOCIALE';
        query['dettaglioFoglioDiCarico']['oggetti']['{IDMOV}'] = 'IDMOV';
        query['dettaglioFoglioDiCarico']['oggetti']['{IDTES}'] = 'IDTES';
        query['dettaglioFoglioDiCarico']['oggetti']['{TOTQULOTTI}'] = 'TOTQULOTTI';
        query['dettaglioFoglioDiCarico']['oggetti']['{RIGADESCRITTIVA}'] = 'RIGADESCRITTIVA';

        query['dettaglioFoglioDiCarico:parametri']=new Array;
        query['dettaglioFoglioDiCarico:parametri']['modelloRiga']=`
        <div class="w100 row ">
            <label for="" id="lbl0" class="row w100 intestazione clrSfumatoScuro h45p">
                <div class="w100 padTop5">
                    <span class="row w100-70p testo16">{DESCRIZIONE}</span>
                    <input id="" name="0" type="checkbox" class="rowDx w25p h25p clrSfumatoChiaro marg10Dx toggle-button checkParamametro" descrizione="{DESCRIZIONE}">
                </div>
            </label>
        </div>
        `;
        query['dettaglioFoglioDiCarico:parametri']['oggetti']=new Array;
        query['dettaglioFoglioDiCarico:parametri']['oggetti']['{DESCRIZIONE}']='DESCRIZIONE';
        

        avviaCarDati('listaFogliDiCarico');
        avviaCarDati('documentiVendita');
        avviaCarDati('documentiAcquisti');
    }

}

function avviaCarDati(selectID) {
    var parametri;

    switch (selectID) {
        case "listaFogliDiCarico":
            parametri = { "tipoRisposta": "select", "tipoQuery": "foglioDiCarico", "nomeTabella": "foglioDiCarico", "select": selectID, "nomeVariabilie": nomePagina, "nomeQuery": "listaFogliDiCarico" };
            break;
        case "documentiVendita":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiVendita", "select": selectID };
            break;
        case "documentiAcquisti":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiAcquisti", "select": selectID };
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
            if(parametri.select=='listaFogliDiCarico'){
                document.getElementById('listaFogliDiCarico').innerHTML='';
            }
            return "";
        }
    }

    data = verificaMd5(parametri.select, parametri, risp, data);

    if (parametri.tipoRisposta == 'select') {
        popolaElencoDaJson(data, "listaFogliDiCarico", 0, "foglioDiCarico.html", true, 0);
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

function esci() {
    if (xTarget == "_blank") {
        window.close();
    } else {
        open("mainPage.html", xTarget);
    }
}

function Salva() {

}


function resetErrore(e) {
    e.setAttribute("style", "");
}
var foglioDiCarico;
var aperturaFoglio = false;
var listaIdOrdini;
function apriDettagliFoglioDiCarico(listaOrdini) {

    parametri = { "tipoRisposta": "select", "tipoQuery": "foglioDiCarico", "nomeTabella": "foglioDiCarico", "idOrdini": listaOrdini, "nomeQuery": "dettagliFoglioDiCarico" };
    inviaRichiestaCentralino("query", parametri, (resJ) => {
        var res = JSON.parse(resJ);
        var error = res.error;
        foglioDiCarico = res.risposta
        listaIdOrdini=listaOrdini;
        xRag='';
        apriModalDettagli('dettaglioFoglioDiCarico', '', foglioDiCarico, 0, true, '');
    })
}
var idMOvimenti = new Array();
function avviaEvasioneFoglioDiCarico() {
    xRag = '';
    hide('divCorpoLista');
    var parametri=foglioDiCarico[0].PARAMETRI;
    document.getElementById('elencoFoglioDiCarico').innerHTML='';
    if(parametri!=''){
        parametri=JSON.parse(parametri);
        popolaElencoDaJson(parametri,"elencoFoglioDiCarico",0,"dettaglioFoglioDiCarico:parametri",false,0);
    }
    popolaElencoDaJson(foglioDiCarico, "elencoFoglioDiCarico", 0, "dettaglioFoglioDiCarico", false, 0);
    show('divCorpoFoglioDiCarico');
    var pulsanti = document.querySelectorAll('.pulsanteFunzioneListaStatoOrdini');
    for (var x = 0; x < pulsanti.length; x++) {
        var idTes = pulsanti[x].getAttribute('id');
        pulsanti[x].classList.remove('hide')
        if (idMOvimenti.indexOf(idTes) == -1) {
            pulsanti[x].src = "img/bianche/checkVuoto.svg";
            var id = pulsanti[x].getAttribute('id');
            pulsanti[x].setAttribute("onclick", ``);

        } else {
            pulsanti[x].src = "img/bianche/cancel.svg";
            var id = pulsanti[x].getAttribute('id');
            pulsanti[x].setAttribute("onclick", `rimuoviDaCarico(this,'${id}')`);
        }
    }
    aperturaFoglio = true;
    aggiornaFoglioDiCarico('apertura',foglioDiCarico[0].IDFOGLIOCARICO,(res)=>{
        chiudiModalBox();
    })
    
}
function ricercaBarcodeFoglio(codiceIngresso, input = '',qu='') {
   
    if (codiceIngresso == '') {
        return;
    }
    if (input != '') {
        input.value = '';
    }
    if (idSelezionato == null || idSelezionato == '') {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Selezionare l\'ordine da evadere prima di iniziare l\'evasione!');
        return;
    }
 
    if (codiceIngresso.length <36 && codiceIngresso.indexOf('UDC')==-1 && qu=='' && codiceIngresso.substring(0,2)!='00') {
        //IF PER GESTIONE LOTTO VECCHIO (CON SCRITTA UDC NELL CODICE PALLET)
        var barcode = codiceIngresso.substring(3, 16);
        var lotto = codiceIngresso.substring(18, 28);

        var cartoni = codiceIngresso.substring(30, 33);
        // var scadenza = lotto.replace(/LA/g, '');
        var pos=lotto.indexOf("L");
            scadenzaTmp=lotto.substring(pos+2,pos+10)

            if(lotto.indexOf('-')!=-1){
                scadenzaTmp=scadenzaTmp.split("-");
            }else if(lotto.indexOf('/')!=-1){
                scadenzaTmp=scadenzaTmp.split("/");
            }

        var scadenza=scadenzaTmp[0]+'-'+scadenzaTmp[1]+'-20'+scadenzaTmp[2];
    }else if(codiceIngresso.length>=36 && qu!=''){
        //IF PER GESTIONE LOTTO NUOVO (SENZA SCRITTA UDC E CON QUANTITà SU CODICE PALLET)
        var barcode = codiceIngresso.substring(3, 16);
        var scadenzaTmp=codiceIngresso.substring(18,24);
        var lotto = codiceIngresso.substring(26,36)
        var cartoni = qu;
        
        var scadenza=scadenzaTmp.substring(0,2)+'-'+scadenzaTmp.substring(2,4)+'-20'+scadenzaTmp.substring(4,6);
        
    }else if(codiceIngresso.indexOf('UDC')!=-1 || codiceIngresso.substring(0,2)=='00'){
        //RICERCA LOTTO TRAMITE BARCODE PALLET 
        if(listaUDC.indexOf(codiceIngresso)==-1){
            var parametri = { 
                "tipoQuery": "foglioDiCarico", 
                "nomeQuery": "ricercaUDCLotto",
                'udc' :codiceIngresso
                };
            inviaRichiestaCentralino('query',parametri,(res)=>{
                var res=JSON.parse(res);
                var error=res.error;
                var risp=res.risposta;
                if(risp[0]!=0){
                    if(risp[0].CREATO==0){
                        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione UDC non confermato!')
                        return
                    }else{
                        listaUDC.push(codiceIngresso);
                        var quTmpUdcNew='';
                        //SE CODICE PALLET NUOVO, PRENDO LA QUANTITà DAL CODICE PALLET
                        if(codiceIngresso.substring(0,2)=='00'){
                            var quTmpUdcNew=codiceIngresso.substring(22,25);
                            
                        }
                        
                        
                        ricercaBarcodeFoglio(risp[0].LOTTO,'',quTmpUdcNew);
                        return;
                    }
                }else{
                    attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione udc non esistente!')
                    return
                }
            })
            return;
        }else{
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione UDC già presente nel carico!')
            return
        }
    } else{
        return;
    }

    if (lotto.indexOf("-")) {
        lottoR = lotto.replace(/-/g, "/");
    }
 
    var codiceTrovato = false;
    for (var x in foglioDiCarico) {
        
        if (foglioDiCarico[x].BARCODE == barcode && foglioDiCarico[x].TOTQULOTTI < foglioDiCarico[x].QU && idSelezionato == foglioDiCarico[x].IDTES) {
            var lottoTrovato=false;    
            var dif = Number(foglioDiCarico[x].QU) - Number(foglioDiCarico[x].TOTQULOTTI)
            var y = document.getElementById(foglioDiCarico[x].IDMOV);
            if (cartoni <= dif) {
                var quLottoRiga = cartoni;
                if (foglioDiCarico[x].movLotti == undefined) {
                    foglioDiCarico[x].movLotti = new Array();
                }
                if(foglioDiCarico[x].movLotti!=undefined && foglioDiCarico[x].movLotti.length>0){
                    for(var l in foglioDiCarico[x].movLotti){
                        if(foglioDiCarico[x].movLotti[l].lotto==lottoR && foglioDiCarico[x].movLotti[l].scadenza==scadenza){
                            foglioDiCarico[x].movLotti[l].qu=(Number(foglioDiCarico[x].movLotti[l].qu)+Number(quLottoRiga)).toString();
                            lottoTrovato=true;
                        }
                    }
                }
                if(lottoTrovato==false){
                    foglioDiCarico[x].movLotti.push({ 'qu': quLottoRiga, 'lotto': lottoR, 'scadenza': scadenza });
                }
                
                foglioDiCarico[x].TOTQULOTTI = Number(quLottoRiga) + Number(foglioDiCarico[x].TOTQULOTTI);
                if (cartoni == dif) {
                    y.src = "img/bianche/done.svg";
                }
                document.getElementById('quEvasa-' + foglioDiCarico[x].IDMOV).innerHTML = formattaNumeri(foglioDiCarico[x].TOTQULOTTI, 2, 0);
                cartoni = 0;
                codiceTrovato = true;
                break;
            } else {
                if (Number(cartoni) > 0) {
                    query['foglioDiCarico:QtaMaggiore'] = new Array();
                    query['foglioDiCarico:QtaMaggiore']['modalC-body'] = `
                    <div>
                        <div class="w100 clrSfumatoScuro normale cx h100p centraVerticalmente">Attenzione la quantità del pallets è maggiore rispetto a quella dell\'ordine selezionato, confermare la quantità che si sta evadendo</div>
                        <div class="w100 centraVerticalmente h100-100p">
                            <div id="divQta" name="divQta" class="h50p has-float-label marg5Top w70">
                                <input id="txtqtaVerificaPrelevamento" name="txtqtaVerificaPrelevamento" type="number" placeholder="Quantità" class="cx">
                                <span class="deleteicon"></span>
                                <label for="txtqtaVerificaPrelevamento">Quantità</label>
                            </div>
                        </div>
                    </div>`;
                    apriModalCustom('foglioDiCarico:QtaMaggiore', '', 'Attenzione', `creaCodiceQtaTmp('020${barcode}10${lotto}37')`)
                    document.getElementById('txtqtaVerificaPrelevamento').focus();
                    return;
                }
            }
            codiceTrovato = true;
        }
    }
    if (codiceTrovato == false) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione codice non appartenente all\'ordine selezionato!');
    }else{
        var res=verificaStatoOrdine(idSelezionato,false);
        if(res==true){
            deselezionaOrdineDaEvadere(idSelezionato,document.getElementById('ordine-'+idSelezionato));
        }
        document.getElementById('txtBarcode').focus();
        
    }


}
function creaCodiceQtaTmp(preCodice) {
    var qta = document.getElementById('txtqtaVerificaPrelevamento').value;
    chiudiModalCustom();
    if (qta != '')
        ricercaBarcodeFoglio(preCodice + qta.toString())
}
function elaboraRispostaPulisci(risp) {
    if (risp == 'Si') {
        foglioDiCarico = new Array();
        hide('divCorpoFoglioDiCarico');
        show('divCorpoLista');
        avviaCarDati('listaFogliDiCarico');
        idSelezionato == '';
        documento={};
        listaUDC=new Array();
        listaIdOrdini='';
    }
}
function selezionaOrdineDaEvadere(id, input) {
    if (aperturaFoglio == false) {
        return;
    }
    if (idSelezionato == '' || idSelezionato == null) {
        input.classList.add('selezionaRiga');
        var x = document.querySelectorAll('.movimento-' + id);
        for (var n = 0; n < x.length; n++) {
            x[n].classList.add('selezionaRiga');
        }
        idSelezionato = id;
        input.setAttribute('onclick', "deselezionaOrdineDaEvadere('" + id + "',this)");
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Completare l\'ordine in corso o deselezionarlo');
    }
}
function deselezionaOrdineDaEvadere(id, input) {
    input.classList.remove('selezionaRiga');
    var x = document.querySelectorAll('.movimento-' + id);
    for (var n = 0; n < x.length; n++) {
        x[n].classList.remove('selezionaRiga');
    }
    idSelezionato = '';
    input.setAttribute('onclick', "selezionaOrdineDaEvadere('" + id + "',this)");
    verificaStatoOrdine(id)
}

function verificaStatoOrdine(id,attivaMessaggi=true) {
    var statoOrdine;
    for (var x in foglioDiCarico) {
        if (foglioDiCarico[x].IDTES == id) {
            if (foglioDiCarico[x].TOTQULOTTI < foglioDiCarico[x].QU && foglioDiCarico[x].RIGADESCRITTIVA=='') {
                attivaMessaggi==true ? attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Attenzione, ordine non completamente evaso'):'';
                var stato = document.getElementById('stato-' + id);
                stato.src = "img/grafiche/parzialeN.svg";
                stato.classList.remove('hide');
                statoOrdine = false;
                return false
                break;
            } else {
                continue;
            }
        }
    }
    if (statoOrdine != false) {
        var stato = document.getElementById('stato-' + id);
        stato.src = "img/grafiche/disponibileN.svg";
        stato.classList.remove('hide');
        return true
    }

}
function generaDocumenti(risp) {
    if(risp=='No'){    
        return;
    }
    documento={};
    var idTipoDocScarico = parametriNC['idTipoDocScarico'];
    var idTipoDocCarico = parametriNC['idTipoDocCarico'];
    var idTipoDocVendita = parametriNC['idTipoDocVendita'];
    var idTipoDocTrasferimento = parametriNC['idTipoDocTrasferimento']
    var idAnagraficaAzienda = parametriNC['idAnagraficaAzienda'];
    var idDeposito = parametriNC['idDepositoPredefinito'];
    if(idTipoDocScarico==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idTipoDocScarico non impostato');
        return;
    }
    if(idTipoDocCarico==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idTipoDocCarico non impostato');
        return;
    }
    if(idTipoDocVendita==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idTipoDocVendita non impostato');
        return;
    }
    if(idTipoDocTrasferimento==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idTipoDocTrasferimento non impostato');
        return;
    }
    if(idAnagraficaAzienda==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idAnagraficaAzienda non impostato');
        return;
    }
    if(idDeposito==undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione idDeposito non impostato');
        return;
    }
    var parametri=document.querySelectorAll('.checkParamametro');
    for(var p=0;p<parametri.length;p++){
        
        var ch=parametri[p].checked;
        if(ch==false){
            var descr=parametri[p].getAttribute('descrizione');
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'<div>Attenzione, controllo non confermato!</div><div><i><u>'+descr+'</u></i></div>');
            return;
        }
    }
        var artProdotti = {};
        for (var x in foglioDiCarico) {
            
            if (foglioDiCarico[x].TOTQULOTTI > 0 || foglioDiCarico[x].RIGADESCRITTIVA=='hide') {
                   
                if(foglioDiCarico[x].IDA != 0 && foglioDiCarico[x].PREDEFINITA==1){
                    //MI CREO UN OGGETTO CHE CONTENGA TUTTE LE SOMME DEGLI ARTICOLI PRODOTTI DA SOTTO AZIENDE
                    if(artProdotti[foglioDiCarico[x].CODICE]==undefined){
                        artProdotti[foglioDiCarico[x].CODICE] = {
                            'codice': foglioDiCarico[x].CODICE,
                            'descrizione': foglioDiCarico[x].DESCRIZIONE,
                            'idIva': foglioDiCarico[x].IDIVAART,
                            'um': foglioDiCarico[x].UM,
                            'prezzo': 0,
                            'qu': 0,
                            'importo': 0,
                            'IDA': foglioDiCarico[x].IDA,
                            'IDF': foglioDiCarico[x].IDF,
                            'percIva': foglioDiCarico[x].PIVAART,
                            'pIvaF':foglioDiCarico[x].PIVAF
                        }
                    }
                    if (artProdotti[foglioDiCarico[x].CODICE].movLotti == undefined) {
                        artProdotti[foglioDiCarico[x].CODICE].movLotti = new Array;
                    }
                    artProdotti[foglioDiCarico[x].CODICE].prezzo = foglioDiCarico[x].COSTO;

                    artProdotti[foglioDiCarico[x].CODICE].qu += Number(foglioDiCarico[x].TOTQULOTTI);
                    artProdotti[foglioDiCarico[x].CODICE].importo += Number(calcolaImporto(foglioDiCarico[x].COSTO, foglioDiCarico[x].TOTQULOTTI));
                    artProdotti[foglioDiCarico[x].CODICE].movLotti = (artProdotti[foglioDiCarico[x].CODICE].movLotti.concat(foglioDiCarico[x].movLotti))
                }
                    if (documento['DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE] == undefined && foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO==0) {
                        creaDocumento('DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE);//CREAZIONE DOCUMENTO DI VENDITA E CHIUSURA ORDINE
                        if(Number(foglioDiCarico[x].SCCASSA)>0){
                            documento['DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE].totali.scCassa=Number(foglioDiCarico[x].SCCASSA);
                        }
                        
                        var obj = {
                            'genere': tabelle['documentiVendita'][idTipoDocVendita].genere,
                            'idTipo': idTipoDocVendita,
                            'idCliente': foglioDiCarico[x].IDCLIENTE,
                            'AV': 'V',
                            'deposito': idDeposito,
                            'idDest':foglioDiCarico[x].DESTINAZIONE,
                            'idDocImport':new Array,
                            'idVettore':foglioDiCarico[x].IDVETTORE,
                            'noteInterne':foglioDiCarico[x].NOTEINT,
                            'noteUfficio':foglioDiCarico[x].NOTE,
                            'idPagamento':foglioDiCarico[x].PAGAMENTO,
                            'idAzienda':foglioDiCarico[x].AZIENDA,
                            'dataSpedizione':oggiISO(),
                            'oraSpedizione':ora(),
                            'mezzo':2,
                            'aspetto':foglioDiCarico[x].ASPETTO,
                            'causale':foglioDiCarico[x].CAUSALE,
                            
                        }
                        aggiungiTestata(obj, 'DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE)
                    }else if(documento['DocumentoTrasferimento-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO]==undefined && foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO>0){
                        creaDocumento('DocumentoTrasferimento-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO);//CREAZIONE DOCUMENTO DI TRASFERIMENTO A DEPOSITO E CHIUSURA
                        if(Number(foglioDiCarico[x].SCCASSA)>0){
                            documento['DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE].totali.scCassa=Number(arrotonda(foglioDiCarico[x].SCCASSA,2));
                        }
                        var obj = {
                            'genere': tabelle['documentiVendita'][idTipoDocTrasferimento].genere,
                            'idTipo': idTipoDocTrasferimento,
                            'idCliente': foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO,
                            'AV': 'V',
                            'deposito': idDeposito,
                            'idDocImport':new Array,
                            'idVettore':foglioDiCarico[x].IDVETTORE,
                            'noteInterne':foglioDiCarico[x].NOTEINT,
                            'noteUfficio':foglioDiCarico[x].NOTE,
                            'idPagamento':foglioDiCarico[x].PAGAMENTO,
                            'idAzienda':foglioDiCarico[x].AZIENDA,
                            'idBanca':foglioDiCarico[x].BANCA,
                            'ID_FATT':'-1',
                            'dataSpedizione':oggiISO(),
                            'oraSpedizione':ora(),
                            'mezzo':2,
                            'aspetto':foglioDiCarico[x].ASPETTO,
                            'causale':foglioDiCarico[x].CAUSALE
                        }
                        aggiungiTestata(obj, 'DocumentoTrasferimento-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO)
                    }
                    
                    var quTmp=((foglioDiCarico[x].TOTQULOTTI==0 && foglioDiCarico[x].RIGADESCRITTIVA=='hide') ? 1:foglioDiCarico[x].TOTQULOTTI);
                    var movIn = {
                        'descrizione': foglioDiCarico[x].DESCRIZIONE,
                        'codice': foglioDiCarico[x].CODICE,
                        'idIva': foglioDiCarico[x].ID_IVA,
                        'um': foglioDiCarico[x].UM,
                        'percIva': foglioDiCarico[x].PERC_IVA,
                        'listino': foglioDiCarico[x].PREZZO,
                        'qu': quTmp,
                        'sconti':foglioDiCarico[x].SC1+'+'+foglioDiCarico[x].SC2+'+'+foglioDiCarico[x].SC3+'+'+foglioDiCarico[x].SC4+'+'+foglioDiCarico[x].SC5,
                        'importo': calcolaImporto(foglioDiCarico[x].PREZZO, quTmp,foglioDiCarico[x].SC1,foglioDiCarico[x].SC2,foglioDiCarico[x].SC3,foglioDiCarico[x].SC4,foglioDiCarico[x].SC5),
                        'idDocImport':foglioDiCarico[x].IDTES,
                        'idMovOrig':foglioDiCarico[x].IDMOV,
                    }
                    //if per aggiungere prodotti e idtes a documento o di vendita o trasferimento per idazienda
                    if(foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO==0){
                        var nomeDocumentoTmp='DocumentoVendita-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDCLIENTE;
                    }else if(foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO>0){
                        var nomeDocumentoTmp='DocumentoTrasferimento-'+foglioDiCarico[x].AZIENDA+'-'+foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO;
                    }
                    
                    documento[nomeDocumentoTmp].testata.idDocImport.push(foglioDiCarico[x].IDTES);
                    
                    var c = aggiungiMovimento(movIn, '', nomeDocumentoTmp);
                    if(foglioDiCarico[x].movLotti!=undefined){
                        documento[nomeDocumentoTmp].prodotti.data[c].movLotti = foglioDiCarico[x].movLotti;
                    }
                    aggiornaTotale(documento[nomeDocumentoTmp].totali, documento[nomeDocumentoTmp].prodotti.data[c], 1);
                    documento[nomeDocumentoTmp].totali.tPeso=Number(documento[nomeDocumentoTmp].totali.tPeso)+Number(formattaNumeriInput(Number(quTmp)*Number(foglioDiCarico[x].PESO_SPECIFICO),2,0));
                    documento[nomeDocumentoTmp].totali.tColli+=Number(foglioDiCarico[x].QUUNITARIA>0 ? Number(Number(quTmp)/Number(foglioDiCarico[x].QUUNITARIA)):0)
                    
                    if(foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO>0){
                        // CREO MOVIMENTO DI TRASFERIMENTO PER DEPOSITO DI DESTINAZIONE
                        var movInTrasferimento = {
                            'descrizione': foglioDiCarico[x].DESCRIZIONE,
                            'codice': foglioDiCarico[x].CODICE,
                            'idIva': foglioDiCarico[x].ID_IVA,
                            'um': foglioDiCarico[x].UM,
                            'percIva': foglioDiCarico[x].PERC_IVA,
                            'listino': 0,
                            'qu': quTmp*-1,
                            'deposito':foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO,
                            'composto':-1,
                            'importo':'0'
                        }

                        var m = aggiungiMovimento(movInTrasferimento, '', nomeDocumentoTmp);
                        var movLottiTmp=new Array;
                        for(var lotto in foglioDiCarico[x].movLotti){
                            movLottiTmp[lotto]={};
                            movLottiTmp[lotto].qu=foglioDiCarico[x].movLotti[lotto].qu*-1;
                            movLottiTmp[lotto].lotto=foglioDiCarico[x].movLotti[lotto].lotto;
                            movLottiTmp[lotto].scadenza=foglioDiCarico[x].movLotti[lotto].scadenza;
                        }
                        
                        documento[nomeDocumentoTmp].prodotti.data[m].movLotti = movLottiTmp;
                        // documento[foglioDiCarico[x].IDCLIENTE].testata.idTipo=idTipoDocTrasferimento;
                        // documento[foglioDiCarico[x].IDCLIENTE].testata.idAnagraficaAzienda=foglioDiCarico[x].IDDEPOSITOTRASFERIMENTO;
                        // documento[foglioDiCarico[x].IDCLIENTE].testata.destinazione='';
                        // documento[foglioDiCarico[x].IDCLIENTE].testata.genere=tabelle['documentiVendita'][idTipoDocTrasferimento].genere;


                    }
            }
          
        }
        for (var [k, v] of Object.entries(documento)) {
            
        }
        // console.log(artProdotti)
        var idScarichi = new Array;
        var idCarichi = new Array;
        var pIvaF={};
        for (var [k, v] of Object.entries(artProdotti)) {
            //CREO ARRAY PER DISTINGUERE I DOCUMENTI DI CARICO E I DOCUMENTI DI SCARICO
            if (documento['Scarico-'+v.IDA] == undefined) {
                creaDocumento('Scarico-'+v.IDA);
                idScarichi.push('Scarico-'+v.IDA);
            }
            if (documento['Carico-'+v.IDF] == undefined) {
                creaDocumento('Carico-'+v.IDF);
                idCarichi.push('Carico-'+v.IDF);
                pIvaF[v.IDF]=v.pIvaF
            }
            
            var movIn = {
                'descrizione': v.descrizione,
                'codice': v.codice,
                'idIva': v.idIva,
                'um': v.um,
                'percIva': v.percIva,
                'listino': v.prezzo,
                'qu': v.qu,
                'importo': v.importo,
            }

            var r = aggiungiMovimento(movIn, '', 'Scarico-'+v.IDA);
            documento['Scarico-'+v.IDA].prodotti.data[r].movLotti = v.movLotti;
            aggiornaTotale(documento['Scarico-'+v.IDA].totali, documento['Scarico-'+v.IDA].prodotti.data[r], 1);

            var x = aggiungiMovimento(movIn, '', 'Carico-'+v.IDF);
            documento['Carico-'+v.IDF].prodotti.data[x].movLotti = v.movLotti;
            aggiornaTotale(documento['Carico-'+v.IDF].totali, documento['Carico-'+v.IDF].prodotti.data[x], 1);


        }

        for (var [k, n] of Object.entries(documento)) {
            if (idScarichi.indexOf(k) != -1) {
                var idAzienda=k.split("-");
                var obj = {
                    'genere': tabelle['documentiVendita'][idTipoDocScarico].genere,
                    'idTipo': idTipoDocScarico,
                    'idCliente': idAnagraficaAzienda,
                    'AV': 'V',
                    'note': 'creazioneAutomatica',
                    'idAzienda': idAzienda[1],
                    'deposito': idDeposito
                }
                aggiungiTestata(obj, k)
            } else if (idCarichi.indexOf(k) != -1) {
                var idCliente=k.split("-");
                var obj = {
                    'genere': tabelle['documentiAcquisti'][idTipoDocCarico].genere,
                    'idTipo': idTipoDocCarico,
                    'idCliente': idCliente[1],
                    'AV': 'A',
                    'note': 'creazioneAutomatica',
                    'deposito': idDeposito,
                    'pIvaFornitoreArticolo':pIvaF[idCliente[1]]
                }
                aggiungiTestata(obj, k)
            } 

            
                
        }
        var jSon=documento
        if(isEmpty(documento)){
            attivaAlert(0, "Nessuna Riga Documento Presente! ", "salvaDocumentosuServer");
            return;
        }
        for(var [k,v] of Object.entries(documento)){
            if(v.prodotti.data.length==0){
                attivaAlert(0, "Nessuna Riga Documento Presente! - "+k, "salvaDocumentosuServer");
                return;
            }
        }
        var parametri = { 
            "tipoRisposta": "salva", 
            "tipoSalva": "multiDocumenti", 
            "dati": jSon,
            'idFoglioDiCarico':foglioDiCarico[0].IDFOGLIOCARICO,
            'statoDocumento':parametriNC.statoDocumentoEvaso,
            'listaIdOrdini':listaIdOrdini
         };
        inviaRichiestaCentralino("salva", parametri,(resJ)=>{
            var res=JSON.parse(resJ);
            var error=res.error;
            var data=res.risposta;
            if(error==''){
                    var listaDocumentiEmessi='';
                    for(var x in data){

                        if(data[x].AV=='V' && (data[x].idTipo==idTipoDocTrasferimento|| data[x].idTipo==idTipoDocVendita)){
                            // console.log(listaDocumentiEmessi)
                            listaDocumentiEmessi+=data[x].idTes+','
                        }
                        
                    }
                    // console.log(listaDocumentiEmessi)
                    listaDocumentiEmessi=listaDocumentiEmessi.slice(0,-1);
                    elaboraRispostaPulisci('Si'); 
                    if(listaDocumentiEmessi!=''){ 
                        stampa(listaDocumentiEmessi,'V')
                    }
                    
            }
        } );




}
function aggiornaFoglioDiCarico(tipo,idFoglioDiCarico,callback=''){
    var jSon={
        'tipo':tipo,
        "idFoglioDiCarico":idFoglioDiCarico,
        'listaIdOrdini':listaIdOrdini,
        'statoDocumento':parametriNC.statoDocumentoPreparazione
    }
    var parametri = { 
        "tipoRisposta": "update", 
        "tipoSalva": "foglioDiCarico", 
        "dati": jSon,

     };
    inviaRichiestaCentralino("update", parametri, (res)=>{
        if(callback!=''){
            callback(res)
        }
    });
}

console.log("Articolo 013->020803293763020510LA31-05-2537100");
console.log("Articolo 043->020803293763062510LD22-06-2437100");
console.log("Articolo 043->020803293763062510LA23-06-2437100");
console.log("Articolo 043->020803293763062510LC28-06-2437100");
console.log("Articolo 043->020803293763062510LD28-06-2437100");
console.log("Articolo 035->020803293763051910LA31-05-2537100");
console.log("Articolo 016->020803293763025010LA31-05-2537100");
function apriDettaglioLotti(idMovimento){
    var lotti=new Array;
    for(var x in foglioDiCarico){
        if(foglioDiCarico[x].IDMOV==idMovimento){
            lotti=foglioDiCarico[x].movLotti;
            break;
        }
    }
    for(var x in lotti){
        lotti[x].index=x;
        lotti[x].idMovimento=idMovimento;
    }
    
    query['dettagliLotti']=new Array;
    query['dettagliLotti']['oggetti']=new Array;
    query['dettagliLotti']['oggetti']['{lotto}']='lotto';
    query['dettagliLotti']['oggetti']['{scadenza}']='scadenza';
    query['dettagliLotti']['oggetti']['{qu}']='qu';
    query['dettagliLotti']['oggetti']['{index}']='index';
    query['dettagliLotti']['oggetti']['{idMovimento}']='idMovimento';
    query['dettagliLotti']['modalC-body']=`
    <div class="clrScuro  w100 h35p marg5Top normale testo14">
        <div class="w50 row">
            <div class="h50 padSx5">Lotto</div>
            <div class="h50 padSx5">Scadenza</div>
        </div>
        <div class="w50-40p h100 row centraVerticalmente">
            Quantità
        </div>
    </div>`;
    query['dettagliLotti']['modelloRiga']=`
    <div class="clrSfumatoScuro w100 h65p marg5Top normale testo15" id="lotto-{index}">
        <div class="w50 row">
            <div class="h50 padSx5">{lotto}</div>
            <div class="h50 padSx5">{scadenza}</div>
        </div>
        <div class="w50-40p h100 row centraVerticalmente">
            {qu}
        </div>
        <div class="w35p row centraVerticalmente h100">
            <img class="rowDx w30p cursoreBtn" src="img/bianche/edit.svg" onclick="modificaLotto({idMovimento},{index})">
        </div>
    </div>
    `;
    apriModalCustom('dettagliLotti',lotti,'Lotti Riga','',1);
}
function eliminaLottoMovimento(Risp,idList){
    if(Risp=='Si'){
        var id=idList.split(",");
        for(var x in foglioDiCarico){
            if(foglioDiCarico[x].IDMOV==id[0]){
                var qu=foglioDiCarico[x].movLotti[id[1]].qu;
                foglioDiCarico[x].TOTQULOTTI-=qu
                foglioDiCarico[x].movLotti.splice(id[1],1);
                chiudiModalCustom();
                document.getElementById('quEvasa-' + foglioDiCarico[x].IDMOV).innerHTML = formattaNumeri(foglioDiCarico[x].TOTQULOTTI, 2, 0);
                verificaStatoOrdine(foglioDiCarico[x].IDTES,false);
                break;
            }
        }
        
    }
}
function controlloFoglioDiCarico(){
    var controlloDocumentiAperti=true;
    var lastId='';
    for(var x in foglioDiCarico){
        if(lastId!=foglioDiCarico[x].IDTES){
            lastId=foglioDiCarico[x].IDTES;
            if(verificaStatoOrdine(foglioDiCarico[x].IDTES,false)==false){
                controlloDocumentiAperti=false;
                
            }
        }
    }
    if(controlloDocumentiAperti==false){
        attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione PRESENZA ORDINI NON TOTALMENTE EVASI ,sei sicuro di voler generare i DDT dai lotti prelevati?','generaDocumenti_');
    }else{
        attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione sei sicuro di voler generare i DDT dai lotti prelevati?','generaDocumenti_');
    }
    
}
function modificaLotto(idMovimento,riga){
    if(document.getElementById('formModificaLotti')!=undefined){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione completare la modifica precedenemente avviata!');
        return;
    }
    query['formModificaLotto']=new Array;
    query['formModificaLotto']['oggetti']=new Array;
    query['formModificaLotto']['oggetti']['lottoSelezionato']='lotto';
    query['formModificaLotto']['oggetti']['scedenzaLottoSelezionato']='scadenza';
    query['formModificaLotto']['oggetti']['quantitàLottoSelezionato']='qu';
    var div=document.getElementById("lotto-"+riga);
    div.classList.remove('h65p');
    div.classList.add('h180p');
    div.id='formModificaLotti';
    divOrigD=div.innerHTML;
    div.innerHTML=`
    <div class="w100 h160p clrSfumatoScuro">
        <div id="" class="w60 row has-float-label">
            <span class="selectDefault" id="">Lotto</span>
            <label id="lbllottoSelezionato" for="lottoSelezionato" class="posTop-5p clrTestoNero">Lotto Selezionato</label>
            <input id="lottoSelezionato" name="lottoSelezionato" type="text" class="w100">
        </div>
        <div id="" class="w40 row has-float-label">
            <span class="selectDefault" id="">Quantità</span>
            <label id="lblquantitàLottoSelezionato" for="quantitàLottoSelezionato" class="posTop-5p clrTestoNero">Quantità</label>
            <input id="quantitàLottoSelezionato" name="quantitàLottoSelezionato" type="text" class="w100">    
        </div>
        <div id="" class="w100 row has-float-label">
            <span class="selectDefault" id="">Scadenza</span>
            <label id="lblscedenzaLottoSelezionato" for="scedenzaLottoSelezionato" class="posTop-5p clrTestoNero">Scadenza</label>
            <input id="scedenzaLottoSelezionato" name="scedenzaLottoSelezionato" type="date" class="w100">
            
        </div>

        <div class="pulsantiera">
            <a id="cmdSalvaLotto" href="#" class="w50" title="Salva" onclick="SalvaLotto({idMovimento},{riga})"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnulla" href="#" class="w50" title="Annulla" onclick="chiudiModalCustom()"><img src="img/bianche/annulla.svg"/></a>
        </div>
    </div>
    `;
    var lotto={};
    for(var k in foglioDiCarico){
        if(foglioDiCarico[k].IDMOV==idMovimento){
            lotto=foglioDiCarico[k]['movLotti'][riga];
            break;
        }
    }
    var scadenza=lotto.scadenza.split('-');
    lotto.scadenza=scadenza[2]+'-'+scadenza[1]+'-'+scadenza[0];

    document.getElementById("cmdSalvaLotto").setAttribute("onclick","SalvaLotto("+idMovimento+","+riga+")");
    document.getElementById("cmdAnnulla").setAttribute("onclick","chiudiModalCustom()");
    popolaFormModificaDati(lotto,"formModificaLotto");
    lotto.scadenza=scadenza[0]+'-'+scadenza[1]+'-'+scadenza[2];
}
function SalvaLotto(idMovimento,riga){
    var lotto=recuperaValueElemento('lottoSelezionato');
    var scadenzaTmp=recuperaValueElemento('scedenzaLottoSelezionato');
    var qu=recuperaValueElemento('quantitàLottoSelezionato');
    var scadenza=scadenzaTmp.split('-');
    for(var k in foglioDiCarico){
        if(foglioDiCarico[k].IDMOV==idMovimento){
            var quTmp= Number(foglioDiCarico[k].movLotti[riga].qu)
            var quTmpTot=Number(foglioDiCarico[k].TOTQULOTTI-quTmp);
            var idOrdineTmp=foglioDiCarico[k].IDTES;
            if((Number(quTmpTot)+Number(qu))<=Number(foglioDiCarico[k].QU)){
                foglioDiCarico[k].movLotti[riga].lotto=lotto;
                foglioDiCarico[k].movLotti[riga].scadenza=scadenza[2]+'-'+scadenza[1]+'-'+scadenza[0];
                foglioDiCarico[k].movLotti[riga].qu=qu; 
                foglioDiCarico[k].TOTQULOTTI=Number(Number(quTmpTot)+Number(qu));
                var quantitàNew=Number(foglioDiCarico[k].TOTQULOTTI);
            }else{
                attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione la quantità prelevata non può essere maggiore rispetto a quella ordinata!');
                return;
            }
            
            break;
        }
    }
    verificaStatoOrdine(idOrdineTmp,true)
    chiudiModalCustom();
    document.getElementById('quEvasa-'+idMovimento).innerText=quantitàNew;
}
function forzaChiusuraFoglioDiCarico(risp='no'){
    if(risp=='Si'){
        var parametri = { 
            "tipoRisposta": "elimna", 
            "tipoElimina": "foglioDiCarico", 
            "dati": foglioDiCarico[0].IDFOGLIOCARICO,
    
         };
        inviaRichiestaCentralino("elimina", parametri, (res)=>{
            foglioDiCarico=new Array;
            chiudiModalBox();
            avviaCarDati('listaFogliDiCarico');
        });
    }else if(risp=='no'){
    }else{
        attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione Sei sicuro di voler eliminare il foglio di carico?','forzaChiusuraFoglioDiCarico_');
    }
    
}