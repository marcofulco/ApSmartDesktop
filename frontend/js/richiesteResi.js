query['richiesteResi.html:listadocumenti'] = new Array;
query['richiesteResi.html:listadocumenti']['oggetti'] = new Array;
query['richiesteResi.html:listadocumenti']['oggetti']['{RAGIONESOCIALE}'] = 'RAGIONESOCIALE';
query['richiesteResi.html:listadocumenti']['oggetti']['{STATODOCUMENTO}'] = 'STATODOCUMENTO';
query['richiesteResi.html:listadocumenti']['oggetti']['{IDSTATODOCUMENTO}'] = 'IDSTATODOCUMENTO';
query['richiesteResi.html:listadocumenti']['oggetti']['{STATODOCUMENTODDT}'] = 'STATODOCUMENTODDT';
// query['richiesteResi.html:listadocumenti']['oggetti']['{TOTDOCUMENTO}'] = { campo: 'TOTDOCUMENTO', decimaliMax: 2, decimaliMin: 0 };
query['richiesteResi.html:listadocumenti']['oggetti']['{TOTIMPONIBILE}'] = { campo: 'TOTIMPONIBILE', decimaliMax: 2, decimaliMin: 2 };
query['richiesteResi.html:listadocumenti']['oggetti']['{DOCUMENTO}'] = 'DOCUMENTO';
query['richiesteResi.html:listadocumenti']['oggetti']['{DATAC}'] = 'DATAC';
query['richiesteResi.html:listadocumenti']['oggetti']['{RIGHE}'] = 'RIGHE';
query['richiesteResi.html:listadocumenti']['oggetti']['{ID}'] = 'ID';
query['richiesteResi.html:listadocumenti']['oggetti']['{IDRESO}'] = 'IDRESO';

query['richiesteResi.html:dettaglioDocumento'] = new Array;
query['richiesteResi.html:dettaglioDocumento']['oggetti'] = new Array;
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{DESCRIZIONE}']='descrizione'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{CODICE}']='codice'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{UM}']='um'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{PREZZO}']={ campo: 'listino', decimaliMax: 2, decimaliMin: 2 };
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{QU}']={ campo: 'qu', decimaliMax: 2, decimaliMin: 0 };
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{DOCUMENTORIF}']='notaUfficio'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{NOTECLI}']='descrizioneAggiuntiva'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{CAUSALERESO}']='notaPrelievo'
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{IDMOV}']={ campo: 'ID', nonFormattare: 1};
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{IMPORTO}']={ campo: 'importo', decimaliMax: 2, decimaliMin: 2 };
query['richiesteResi.html:dettaglioDocumento']['oggetti']['{ORIGINE}']={ campo: 'origine', decimaliMax: 2, decimaliMin: 0 };


query['listeMagazzino.html:json'] = new Array;
query['listeMagazzino.html:json']['oggetti'] = new Array;
query['listeMagazzino.html:json']['oggetti']['codiceArticolo'] = { campo: 'codice', obbligatorio: true };
query['listeMagazzino.html:json']['oggetti']['txtDescrizione'] = { campo: 'descrizione', obbligatorio: true };
query['listeMagazzino.html:json']['oggetti']['txtPrezzo'] = 'listino'
query['listeMagazzino.html:json']['oggetti']['txtPrezzo'] = 'prezzo'
query['listeMagazzino.html:json']['oggetti']['txtIdIva'] = 'idIva';
query['listeMagazzino.html:json']['oggetti']['txtPercIva'] = 'percIva';
query['listeMagazzino.html:json']['oggetti']['txtQuantità'] = 'qu';

query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";

query['richiesteresi.html:elencoStatoOrdine']=new Array;

query['ListaClienti.html']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';


var parametriNC = { "nascosti": "", "conti": "", "visSpese": 0, "maxAbbuono": 0, "modificheGuajana": 0 };
var datiArticolo = '';
var tabelle = {};
var idDocumento;
var nomeStorage=nomePagina;
var ricerca="";
var idAgente=0;
var soloAperti=1;
var soloParzChiusi=0
var soloChiusi=0;
var preordini=0;
var xFiltri=0;
var idCliente=0;
var idAgente=0;
var StatoOrdine="";
var ricerca="";
var filtroNumero=0;
var numeroDa=0;
var numeroA=0;
var serieDa="";
var serieA="";
var visValore=0;
var idDepositoVettore='';
var nomeStorage=nomePagina;
var daCompletare=0;
var movimentiDocumentoReso=new Array();
window.addEventListener("load", function (event) {
    setTimeout(function () {

        recuperaParametri();
        

        var script = document.createElement("script");
        script.setAttribute('src', "componenti/elementiListaResi.js");
        document.body.appendChild(script);
        script.onload = function () {
            query['richiesteResi.html:listadocumenti']['modelloRiga']=elementoRichiesaReso;
            
            avviaCarRichiesteResi();
        }

        var script = document.createElement("script");
        script.setAttribute('src', "componenti/elementiListaClientiFiltro.js");
        document.body.appendChild(script);
        script.onload = function () {
            query['ListaClienti.html']['modello2Righe']=elementiListaClientiFiltro;
        }

        var script = document.createElement("script");
        script.setAttribute('src', "componenti/elementiFiltriSceltaMultipla.js");
        document.body.appendChild(script);
        script.onload = function () {
            query['richiesteresi.html:elencoStatoOrdine']['modello1Riga']=elementiFiltriSceltaMultipla;
            avviaCarDatiGenerico("elencoStatoOrdine","statoPreventiviA");
            AvviaCarDatiElencoClienti("elencoAgente","AGENTE",true,1);
            avviaCarDati('documentiAcquisti');
            avviaCarDati('documentiVendita');
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
        case "documentiAcquisti":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiAcquisti", "select": selectID };
            break;
        case "documentiVendita":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiVendita", "select": selectID };
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

function pulisciForm() {
    for (var [k, v] of Object.entries(query['listeMagazzino.html']['oggetti'])) {
        document.getElementById(k).value = '';
    }
    document.getElementById('codiceArticolo').focus();
    document.getElementById('txtQuantità').value = '';
}


function avviaCarRichiesteResi(tipoCarDati='listaRichiesteDiReso',idTes=''){
    
var dataDa="";
var dataA="";

var da=recuperaValueElemento('txtDataDa');
var a=recuperaValueElemento('txtDataA');


if (isDate(da.value,da)){
    dataDa=convertiDataEngIta(da.value);
} else {
    var mese=new String(new Date().getMonth()+1);
    var anno=new Date().getFullYear();

    if (mese.length==1){
        mese="0"+mese;
    }

    if (xIdCliente==0 && xIdVettore==0  && parametriNC.emissioneDDT==0){
        da.value=convertiDataItaEng('01/'+mese+'/'+anno);
        dataDa=convertiDataEngIta(da.value);
    }
}

if (isDate(a.value,a)){
    dataA=convertiDataEngIta(a.value);
}
// var inputidCliente=document.getElementById('txtRicercaCliente');
// var idCliente=inputidCliente.getAttribute('idRagioneSociale')==undefined ? '':inputidCliente.getAttribute('idRagioneSociale');
var serieDa=document.getElementById('txtRicercaSerieDa').value;
var serieA=document.getElementById('txtRicercaSerieA').value;
var numeroDa=document.getElementById('txtRicercaNumeroDa').value;
var numeroA=document.getElementById('txtRicercaNumeroA').value;
// var idTes=''

    var parametri={"tipoRisposta":tipoCarDati,"tipoQuery":"richiesteDiReso","nomeQuery":tipoCarDati, "dataDa":dataDa, "dataA":dataA, 
        "chiamante":"richiestaResi","idCliente":idCliente,"idAgente":idAgente,"soloChiusi":soloChiusi,"soloParzChiusi":soloParzChiusi,"soloAperti":soloAperti,"statoDocumento":StatoOrdine,"serieDa":serieDa,
        "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,'idTes':idTes
    };

elencoInCaricamento=1;

inviaRichiestaCentralino("query",parametri,(resJ)=>{
    var res=JSON.parse(resJ);
    var data=res.risposta;
    if(data[0]==0){
        return;
    }
    if(tipoCarDati=='listaRichiesteDiReso'){
        popolaElencoDaJson(data,"elencoDocumenti",0,'richiesteResi.html:listadocumenti',1,0);
    }else if(tipoCarDati=='documentiResoGeneratiDaDDT'){
        for(var x in data){
            // for(var y in documento['richiestaReso'].prodotti.data){
            //     if(data[x].ID==documento['richiestaReso'].prodotti.data[y].ID && data[x].QURESA!=0){
            //         documento['richiestaReso'].prodotti.data[y]={};
            //     }
            // }
            if(document.getElementById('cmbTipoDocumentoGenerato-'+data[x].ID)!=undefined){
                
                if(data[x].QURESA!=0){       
                    var div=document.getElementById('documentoGenerato-'+data[x].ID);
                    if(div==undefined){
                        return;
                    }
                    div.innerText=data[x].DOCUMENTORESO;
                    div.classList.remove('hide');
                    hide('cmbTipoDocumentoGenerato-'+data[x].ID);
                }
            }
            if(data[x].QURESA!=0){       
                var div=document.getElementById('documentoGenerato-'+data[x].ID);
                if(div==undefined){
                    return;
                }
                div.innerText=data[x].DOCUMENTORESO;
                div.classList.remove('hide');
            }
        }
    }
    
},"body");
}
function txtRicercaChange(input,ulID,sottoQuery,righe) {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        xRag="";
        
        ricerca=input.value;

        AvviaCarDatiElencoClienti("elencoCliente");

        clearTimeout(timer1); 
        
        inputID=input.getAttribute("id");

        salvaFiltro(inputID,tipoAnagrafica);
    }, 1000);
}
function AvviaCarDatiElencoClienti(tipoRisposta,tipoAnagrafica="CLIENTE",ricarica=true,righe=2,scrollTop=0){
    var nomeQuery="ListaClienti.html";
    var nomeSession=nomePagina+"."+tipoRisposta;
    
    var maxFetch=0;
    
    if (query[nomeQuery]['MAXFETCH']){
        maxFetch=query[nomeQuery]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
    }

    if (query[nomeQuery]['OFFSET']>=maxFetch && maxFetch!=0) {
        return '';
    }

    if (ricarica){
        query[nomeQuery]['OFFSET']=0;
    }

    var parametri={"tipoQuery":"listaClienti","tipoRisposta":tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca, "tipoElenco":righe, 
        "ricarica":ricarica, "azienda":0,"idCliente":0,"idAgente":0,"localita":"","prov":"",
        "idZona":0,"idFamiglia":0,"aperti":0,"offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],
        "chiamante":tipoRisposta, "tipoAnagrafica":tipoAnagrafica, "nomeSession":nomeSession
        }; 

    var md5=sessionStorage.getItem(nomeSession+".md5");
    if (md5!=undefined){
        parametri.md5=md5;
    }

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraRispostaClienti);
}
function elaboraRispostaClienti(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    elencoInCaricamento=0;

    if (risp.error!=''){
        return "";
    }

    var nomeSession=parametri.nomeSession;

    if (parametri.md5==risp.md5){
        data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));
    } else {
        sessionStorage.setItem(nomeSession+".md5",risp.md5);
        sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
    }

    if (parametri.tipoRisposta=="elencoCliente"){
        sessionStorage.setItem(nomeSession+".offSet",parametri.offSet);
        query[parametri.nomeQuery]['OFFSET']+=query[parametri.nomeQuery]['FETCH'];
    }

    popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop);
}
function listaDaCliente(a,id,descrizione){
    if (idCliente>0){
        xFiltri-=1;
    }
    idCliente=id; //a.getAttribute("ID");
    avviaCarRichiesteResi();
    document.getElementById("lblFiltroCliente").innerHTML="Selezione: "+descrizione;
    document.getElementById("tabCliente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoCliente","","","",nomeStorage);
}
function eliminaFiltroCliente(a){
    if (idCliente>0) {
        idCliente=0;
        avviaCarRichiesteResi();
        document.getElementById("lblFiltroCliente").innerHTML="Selezione: ";
        document.getElementById("tabCliente").removeAttribute("style");
        
        xFiltri-=1

        if (xFiltri==0){
            document.getElementById("cmdFiltri").removeAttribute("style");
        }

        eliminaStato(nomeStorage+".elencoCliente.id");
        eliminaStato(nomeStorage+".elencoCliente.descrizioneId");
    }
}
function listaDaAgente(a){
    if (idAgente>0){
        xFiltri-=1;
    }
    idAgente=a.getAttribute("ID");
    avviaCarRichiesteResi();
    document.getElementById("lblFiltroAgente").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("tabAgente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoAgente","","","",nomeStorage);
}

function eliminaFiltroAgente(a){
    if (idAgente>0) {
        idAgente=0;
        avviaCarRichiesteResi();
        document.getElementById("lblFiltroAgente").innerHTML="Selezione: ";
        document.getElementById("tabAgente").removeAttribute("style");
        
        xFiltri-=1

        if (xFiltri==0){
            document.getElementById("cmdFiltri").removeAttribute("style");
        }

        eliminaStato(nomeStorage+".elencoAgente.id");
        eliminaStato(nomeStorage+".elencoAgente.descrizioneId");
    }
}

function listaDaSceltaMultipla(tipo,id){
    if (StatoOrdine!=""){
        xFiltri-=1;
    }

    StatoOrdine="";

    var ul=document.getElementById("elencoStatoOrdine");
    var chk=ul.getElementsByTagName("input");
    for (i=0;i<chk.length;i++){
        if (chk[i].checked){
            StatoOrdine+=chk[i].getAttribute("name")+",";
        }
    }

    if (StatoOrdine!=""){
        StatoOrdine=StatoOrdine.substring(0,StatoOrdine.length-1);
    }
    
    avviaCarRichiesteResi();

    if (StatoOrdine!=""){
        document.getElementById("tabStatoOrdine").style.border="3px solid rgba("+xColoreSecondario+", 1)";
        document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";

        xFiltri+=1
    } else {
        document.getElementById("tabStatoOrdine").removeAttribute("style");
    }

    if (xFiltri==0){
        document.getElementById("cmdFiltri").removeAttribute("style");
    }
}

function listaDaNumero(){
    if (timer1) {
        clearTimeout(timer1);
    }
    
    timer1=setTimeout(function() { 
        if (filtroNumero>0){
            xFiltri-=1;
        }

        numeroDa=document.getElementById("txtRicercaNumeroDa").value;
        numeroA=document.getElementById("txtRicercaNumeroA").value;
        serieDa=document.getElementById("txtRicercaSerieDa").value;
        serieA=document.getElementById("txtRicercaSerieA").value;

        filtroNumero=0;

        if (numeroDa!="" || numeroA!="" || serieDa!="" || serieA!=""){
            filtroNumero=1
        } 
        
        avviaCarRichiesteResi();

        if (filtroNumero>0) {
            document.getElementById("tabNumero").style.border="3px solid rgba("+xColoreSecondario+", 1)";
            document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";

            xFiltri+=1
        } else {
            document.getElementById("tabNumero").removeAttribute("style");
        }

        if (xFiltri==0){
            document.getElementById("cmdFiltri").removeAttribute("style");
        }
    }, 1000);
}
function apriModalDettaglioDocumento(){
    var parametri={"tipoRisposta":"listaRichiesteDiReso","tipoQuery":"listaRichiesteDiReso","nomeQuery":'listaRichiesteDiReso', "dataDa":dataDa, "dataA":dataA, 
        "chiamante":"richiestaResi","idCliente":idCliente,"idAgente":idAgente,"soloChiusi":soloChiusi,"soloParzChiusi":soloParzChiusi,"soloAperti":soloAperti,"statoDocumento":StatoOrdine,"serieDa":serieDa,
        "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,
    };

    

    inviaRichiestaCentralino("query",parametri,(resJ)=>{
        var res=JSON.parse(resJ);
        var data=res.risposta;
        if(data[0]==0){
            return;
        }
        apriModalDettagli('richiesteResi.html:dettaglioDocumento','',data);
        popolaElencoDaJson(data,"elencoDocumenti",0,'richiesteResi.html:listadocumenti',1,0);
    },"body");
}
function selezionaDettaglioReso(input,id){

    
    for(var x in documento['richiestaReso'].prodotti.data){
        if(documento['richiestaReso'].prodotti.data[x].ID==id){
            var div=document.getElementById('dettaglioReso-'+id);
            // div.classList.add('hide');
            input.src="img/bianche/done.svg"
            input.setAttribute('onclick',`deselezionaDettaglioReso(this,'${id}')`);
            documento['richiestaReso'].prodotti.data[x].qu=documento['richiestaReso'].prodotti.data[x].origine;
            // documento['richiestaReso'].prodotti.data[x].origine=0;
        }
    }
}
function deselezionaDettaglioReso(input,id){
    
    for(var x in documento['richiestaReso'].prodotti.data){
        if(documento['richiestaReso'].prodotti.data[x].ID==id){
            var div=document.getElementById('dettaglioReso-'+id);
            // div.classList.remove('hide');
            input.src="img/bianche/checkVuoto.svg"
            input.setAttribute('onclick',`selezionaDettaglioReso(this,'${id}')`);
            documento['richiestaReso'].prodotti.data[x].origine=documento['richiestaReso'].prodotti.data[x].qu;
            documento['richiestaReso'].prodotti.data[x].qu=0;
        }
    }
    
    
}

function dettaglioReso(idMov){
    query['noteRigaReso']=new Array();
    query['noteRigaReso']['modalC-body']=`<div class="padTop10">
            <div class="has-float-label w100 h80p">
                <textarea style="height:100%" id="note"></textarea>
            </div>
        </div>`;
    apriModalCustom('noteRigaReso','','Note reso',"aggiungiNoteDescrizioneAggiuntive('"+idMov+"')",0,1);
}
function apriDettagliDocumenti(idTes,idReso,statoDocumento){
    var obj={
        'id':idTes,
        'av':'A'
    }
    richiamaDocumento(obj,(rs)=>{
        documento['richiestaReso']=rs.risposta;
        // var statoDocumento=Number(documento['richiestaReso'].testata.statoDocumento);
        
        if(idTes==idReso){
            switch (Number(statoDocumento)){
                case 0:
                case 1:
                    query['richiesteResi.html:dettaglioDocumento']['modelloRiga']=elementiDettagliRichiestaReso;
                    query['richiesteResi.html:dettaglioDocumento']['modelloContenitore']=modalStoricoOrdiniDE;
                break;
                case 3:
                case 4:
                case 5:
                    query['richiesteResi.html:dettaglioDocumento']['modelloRiga']=elementiDettagliRichiestaResoGenerazioneDocumenti;
                    query['richiesteResi.html:dettaglioDocumento']['modelloContenitore']=modalGenerazioneDocumentiDiReso;
                break;
                case 2:
                case 6:
                    // attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione non è possibile modificare un reso già completato','body');
                    query['richiesteResi.html:dettaglioDocumento']['modelloRiga']=elementiDettagliRichiestaResoSoloVisione;
                    query['richiesteResi.html:dettaglioDocumento']['modelloContenitore']=modalSoloVisione;
                    break;
    
            }
        }else{
                    query['richiesteResi.html:dettaglioDocumento']['modelloRiga']=elementiDettagliRichiestaResoGenerazioneDocumenti;
                    query['richiesteResi.html:dettaglioDocumento']['modelloContenitore']=modalGenerazioneDocumentiDiReso;
        }
        

        var obi={'idTes':idTes}
        var testo='Reso n. '+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc+' - '+documento['richiestaReso'].testata.ragioneSociale
        documento['richiestaReso'].testata.tmpIdTesReso=idReso;
        apriModalDettagli('richiesteResi.html:dettaglioDocumento',testo,documento['richiestaReso'].prodotti.data,idReso,true);
        avviaCarRichiesteResi('documentiResoGeneratiDaDDT',idTes);
    })
}
function elaboraRichiestaDiReso(){
    var statoReso=parametriNC.statoResoConforme;
    cont=0;
    for(var x in documento['richiestaReso'].prodotti.data){
        if(documento['richiestaReso'].prodotti.data[x].qu==0){
            documento['richiestaReso'].prodotti.data[x].qu=1;
            documento['richiestaReso'].prodotti.data[x].tipoContabileArt=99;
            documento['richiestaReso'].prodotti.data[x].segnoGiac=0;
            documento['richiestaReso'].prodotti.data[x].LFT=-9;
            statoReso=parametriNC.statoResoParzialmenteAccettato
            cont++;
        }
    }
    if(cont==documento['richiestaReso'].prodotti.data.length){
        statoReso=parametriNC.statoResoNonConforme
    }
    documento['richiestaReso'].testata.data=convertiDataSql(documento['richiestaReso'].testata.data)
    documento['richiestaReso'].testata.statoDocumento=statoReso;
    salvaDocumentoSuServer((res)=>{
        chiudiModalBox();
        avviaCarRichiesteResi();
        documento={};
        attivaAlert(xTipoAllert.SUCCESSO,'Richiesta completata');
    },'richiestaReso')
}
function generaDocumentiDiReso(risp){
    if(risp.toLowerCase()=='no'){
        return;
    }
    var verificaDocumentiCreati=false;
    if(documento['richiestaReso'].testata.statoDocumento==0 || documento['richiestaReso'].testata.statoDocumento==1){
        attivaAlert(xTipoAllert.ATTENZIONE,'Attenzione non è possibile generare documenti di reso se la spunta non è stata ultimata');
        return;
    }
    creaDocumento('documentoOrdine');
    creaDocumento('documentoNC');
    creaDocumento('documentoNCNOIVA');
    creaDocumento('documentoNCEP');
    
    var idCliente=documento['richiestaReso'].testata.idCliente;
    var deposito=documento['richiestaReso'].testata.deposito;
    var idTesReso=documento['richiestaReso'].testata.tmpIdTesReso;
    for(var x in documento['richiestaReso'].prodotti.data){
        var input=document.getElementById('cmbTipoDocumentoGenerato-'+documento['richiestaReso'].prodotti.data[x].ID);
        documento['richiestaReso'].prodotti.data[x].tipoContabileArt='';
        documento['richiestaReso'].prodotti.data[x].segnoGiac='';
        if(input.value==1){
            documento['richiestaReso'].prodotti.data[x].listino='0';
            var importo=calcolaImporto(documento['richiestaReso'].prodotti.data[x].listino,documento['richiestaReso'].prodotti.data[x].qu,'0','0','0','0','0');
            documento['richiestaReso'].prodotti.data[x].importo=importo;
            documento['richiestaReso'].prodotti.data[x].idMovOrig=documento['richiestaReso'].prodotti.data[x].ID;
            documento['documentoOrdine'].prodotti.data.push(documento['richiestaReso'].prodotti.data[x]);
            verificaDocumentiCreati=true;
        }else if(input.value==2){
            documento['richiestaReso'].prodotti.data[x].idMovOrig=documento['richiestaReso'].prodotti.data[x].ID;
            documento['documentoNC'].prodotti.data.push(documento['richiestaReso'].prodotti.data[x]);
            aggiornaTotale(documento['documentoNC'].totali,documento['richiestaReso'].prodotti.data[x],1,null,null,null,false)
            verificaDocumentiCreati=true;
        }else if(input.value==3){
            documento['richiestaReso'].prodotti.data[x].idMovOrig=documento['richiestaReso'].prodotti.data[x].ID;
            documento['documentoNCEP'].prodotti.data.push(documento['richiestaReso'].prodotti.data[x]);
            aggiornaTotale(documento['documentoNCEP'].totali,documento['richiestaReso'].prodotti.data[x],1,null,null,null,false)
            verificaDocumentiCreati=true;
        }else if(input.value==4){
            documento['richiestaReso'].prodotti.data[x].idMovOrig=documento['richiestaReso'].prodotti.data[x].ID;
            documento['richiestaReso'].prodotti.data[x].idIva=parametriNC.idIvaNotaDiCreditoEsente ;
            documento['richiestaReso'].prodotti.data[x].percIva=0;
            documento['documentoNCNOIVA'].prodotti.data.push(documento['richiestaReso'].prodotti.data[x]);
            aggiornaTotale(documento['documentoNCNOIVA'].totali,documento['richiestaReso'].prodotti.data[x],1,null,null,null,false)
            verificaDocumentiCreati=true;
        }
    }
    if(verificaDocumentiCreati==false){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione non è stato selezionato nessun documento da generare!');
        return
    }
    if(documento['documentoOrdine'].prodotti.data.length>0){
        var objO = {
            'genere': tabelle['documentiVendita'][parametriNC.idDocumentoOrdine].genere,
            'idTipo': parametriNC.idDocumentoOrdine,
            'idCliente': idCliente,
            'AV': 'V',
            'note':'Da Vs DDT n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc
        };
        aggiungiTestata(objO,'documentoOrdine')
    }else{
        delete documento['documentoOrdine'];
    }
     if(documento['documentoNC'].prodotti.data.length>0){
        var idIvaDocumentoNc='';
        var percIvaDocumentoNc='';
        for(var x of documento['documentoNC'].prodotti.data){
            if(x!={}){  
                idIvaDocumentoNc=x.idIva;
                percIvaDocumentoNc=x.percIva;
                break;
            }
        }
        var objM={
            'descrizione':'Da DDT Vs n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc,
            'idIva':idIvaDocumentoNc,
            'percIva':percIvaDocumentoNc
        };
        aggiungiMovimento(objM,'','documentoNC');

        var obj = {
            'genere': tabelle['documentiVendita'][parametriNC.idDocumentoNotaDiCredito].genere,
            'idTipo': parametriNC.idDocumentoNotaDiCredito ,
            'idCliente': idCliente,
            'deposito': deposito,
            'AV': 'V',
        };
        aggiungiTestata(obj,'documentoNC')
    }else{
        delete documento['documentoNC'];
    }
    if(documento['documentoNCNOIVA'].prodotti.data.length>0){
        var objNCNOIVA={
            'descrizione':'Da DDT Vs n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc,
            'idIva':parametriNC.idIvaNotaDiCreditoEsente,
            'percIva':'0'
        };
        aggiungiMovimento(objNCNOIVA,'','documentoNCNOIVA');
        var objTNOIVA = {
            'genere': tabelle['documentiVendita'][parametriNC.idDocumentoNotaDiCreditoNoIva].genere,
            'idTipo': parametriNC.idDocumentoNotaDiCreditoNoIva,
            'idCliente': idCliente,
            'deposito': deposito,
            'AV': 'V',
            'note':'Da DDT n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc
        };
        aggiungiTestata(objTNOIVA,'documentoNCNOIVA')
    }else{
        delete documento['documentoNCNOIVA'];
    }
    if(documento['documentoNCEP'].prodotti.data.length>0){
        var idIvaDocumentoNCEP='';
        var percIvaDocumentoNCEP='';
        for(var x of documento['documentoNCEP'].prodotti.data){
            if(x!={}){  
                idIvaDocumentoNCEP=x.idIva;
                percIvaDocumentoNCEP=x.percIva;
                break;
            }
        }
        var objMNCEP={
            'descrizione':'Da DDT Vs n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc,
            'idIva':idIvaDocumentoNCEP,
            'percIva':percIvaDocumentoNCEP
        };
        aggiungiMovimento(objMNCEP,'','documentoNCEP');
        var objTNCEP = {
            'genere': tabelle['documentiVendita'][parametriNC.idDocumentoNotaDiCreditoEsercizioPrecedente].genere,
            'idTipo': parametriNC.idDocumentoNotaDiCreditoEsercizioPrecedente,
            'idCliente': idCliente,
            'deposito': deposito,
            'AV': 'V',
            'note':'Da DDT n.'+documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc
        };
        aggiungiTestata(objTNCEP,'documentoNCEP')
    }else{
        delete documento['documentoNCEP'];
    }
    var testoDDT=documento['richiestaReso'].testata.numero+' del '+documento['richiestaReso'].testata.dataDoc;
    delete documento['richiestaReso'];
    
    salvaDocumentiSuServer((resJ)=>{
        try{
            var res=JSON.parse(resJ)
            delete documento['documentoNCNOIVA'];
            delete documento['documentoNC'];
            delete documento['documentoOrdine'];
            delete documento['richiestaReso'];
        }catch{
            var res=resJ;
        }
        
        var data=res.risposta
        var listaDocGenerati='';
        var testoMail='Gentile Cliente, in allegato i documenti generati in merito al Vostro DDT numero '+testoDDT;
        for(var x in data){
            listaDocGenerati+=data[x].idTes+',';
            
            testoMail+=' \n '+data[x].numero+'/'+data[x].serie+'  '
        }
        testoMail+=`\n Cordiali Saluti \n ${xNomeMittente} \n Responsabile Resi`;
        listaDocGenerati=listaDocGenerati.slice(0,-1);
        stampa(listaDocGenerati,'V','',testoMail)
        attivaAlert(xTipoAllert.DOMANDASINO,'<div>Documenti generati correttamente, Vuoi chiudere il reso ?</div>','chiudiReso_'+idTesReso)
        chiudiModalBox();
    })
}
function aggiungiNoteDescrizioneAggiuntive(idMov){
    var obj={
        'idMov':idMov,
        'note':document.getElementById('note').value
    }
    var parametri={"tipoRisposta":"update","tipoSalva":"aggiornaDescrizioneAggiuntiva", "dati":obj};
    inviaRichiestaCentralino("update",parametri,(res)=>{
        var res=JSON.parse(res)
        document.getElementById('descrizioneAggiuntiva-'+idMov).innerText=res.risposta;
        for(var x in documento['richiestaReso'].prodotti.data){
            if(documento['richiestaReso'].prodotti.data[x].ID==idMov){
                documento['richiestaReso'].prodotti.data[x].descrizioneAggiuntiva=res.risposta;
                break;
            }
        }
        chiudiModalCustom();
    });
}
function chiudiReso(risp,idTes){
    
    if(risp.toLowerCase()=='no'){
        chiudiModalBox();
        avviaCarRichiesteResi();
    }else{
        var jSon={
            'idTes':idTes,
            'statoDocumento':parametriNC.statoDocumentoResoCompletato,
            'descrizioneStato':listaStatoOrdini[parametriNC.statoDocumentoResoCompletato],
            'av':'A'
        }
        
        var parametri = {
            tipoRisposta: "update",
            tipoSalva: "cambiaStatoDocumento", dati: jSon 
        };
    
        inviaRichiestaCentralino("update", parametri, (res)=>{
            chiudiModalBox();
            avviaCarRichiesteResi();
        })
    }
}

function modalCambiaStatoOrdine(idOrdine,statoOrdine){

    var listOption='';
    for(var x of statoOrdiniArray){
        listOption+=`<option value="${x.id}" ${statoOrdine==x.id ? "selected":''}>${x.d1}</option>`;
    }

    query['modificaStatoOrdini']=new Array();
    query['modificaStatoOrdini']['modalC-body']=`<div class="padTop10">
            <div class="has-float-label w100">
                <select id="slcSceltaStato" placeholder="Cambio Stato ordine" onchange="">
                    ${listOption}
                </select>
                <label for="slcSceltaStato">Cambio Stato ordine</label>
            </div>
        </div>`;
    apriModalCustom('modificaStatoOrdini','','Modifica stato ordini',"cambiaStatoOrdine('"+idOrdine+"')",0);
}

function cambiaStatoOrdine(idTes){
    var nuovoStato=recuperaValueElemento('slcSceltaStato');
    var jSon={
        'idTes':idTes,
        'statoDocumento':nuovoStato,
        'descrizioneStato':listaStatoOrdini[nuovoStato],
        'av':'A'
    }
    
    var parametri = {
        tipoRisposta: "update",
        tipoSalva: "cambiaStatoDocumento", dati: jSon 
    };

    inviaRichiestaCentralino("update", parametri, (res)=>{
        var risp=JSON.parse(res);
        var error=risp.error;
        if(error!=''){
            attivaAlert(xTipoAllert.CRITICO,error);
            return;
        }

        avviaCarRichiesteResi();
        chiudiModalCustom();
    });
}
function modalCambiaQuantitàAccettata(idMovimento,quta){

    // for(var x in documento['richiestaReso'].prodotti.data){
    //     if(documento['richiestaReso'].prodotti.data[x].ID==idMovimento){
    //         quta=documento['richiestaReso'].prodotti.data[x].qu;
    //     }
    // }
    query['modificaQuantitàOrdine']=new Array();
    query['modificaQuantitàOrdine']['modalC-body']=`
    <div class="padTop10">
        <div id="divCambiaQuantità" name="divCambiaQuantità" class="row has-float-label w60">
            <input id="txtCambiaQuantitàReso" name="txtCambiaQuantitàReso" type="text" placeholder="Quantità" value="${quta}">
            <span class="deleteicon" onclick="var input = getElementById('txtCambiaQuantitàReso'); input.value = ''; input.focus();"></span>
            <label for="txtCambiaQuantitàReso">Quantità</label>
        </div>
    </div>`;
    apriModalCustom('modificaQuantitàOrdine','','Modifica quantità',"cambiaQuantitàReso('"+idMovimento+"')",0,true);
}
function cambiaQuantitàReso(idMovimento){
    if(document.getElementById('txtCambiaQuantitàReso').value=='' || document.getElementById('txtCambiaQuantitàReso').value<=0){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione non è possibile impostare una quantità uguale o minore a 0!');
        return;
    }
    for(var x in documento['richiestaReso'].prodotti.data){
            if(documento['richiestaReso'].prodotti.data[x].ID==idMovimento){
                documento['richiestaReso'].prodotti.data[x].qu=document.getElementById('txtCambiaQuantitàReso').value;
            }
        }
    document.getElementById('quta-'+idMovimento).innerText=document.getElementById('txtCambiaQuantitàReso').value;
    chiudiModalCustom();
}
