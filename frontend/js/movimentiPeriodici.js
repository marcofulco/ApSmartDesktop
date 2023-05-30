query['movimentiPeriodici.html']=new Array;
query['movimentiPeriodici.html']['OFFSET']=0;
query['movimentiPeriodici.html']['FETCH']=100;
query['movimentiPeriodici.html']['MAXFETCH']=0;
query['movimentiPeriodici.html']['modelloRiga']=elementiMovimentiPeriodici;

query['movimentiPeriodici.html']['oggetti']=new Array;
query['movimentiPeriodici.html']['oggetti']['{DATAF}']="DATA";
query['movimentiPeriodici.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['movimentiPeriodici.html']['oggetti']['{DESTIPO}']="DESTIPO";
query['movimentiPeriodici.html']['oggetti']['{NUMERO}']="NUMERO";
query['movimentiPeriodici.html']['oggetti']['{IMPONIBILE}']="IMPONIBILE";
query['movimentiPeriodici.html']['oggetti']['{IVA}']="IVA";
query['movimentiPeriodici.html']['oggetti']['{TOTALE}']="TOTALE";
query['movimentiPeriodici.html']['oggetti']['{ID}']="ID";
query['movimentiPeriodici.html']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['movimentiPeriodici.html']['oggetti']['{NOTE}']="NOTE";
query['movimentiPeriodici.html']['oggetti']['{IMMAGINE}']="IMMAGINE";
query['movimentiPeriodici.html']['oggetti']['{TABELLA}']="TABELLA";
query['movimentiPeriodici.html']['oggetti']['{TOTUTILE}']="TOTUTILE";
query['movimentiPeriodici.html']['oggetti']['{PERCUTILE}']="PERCUTILE";
query['movimentiPeriodici.html']['oggetti']['{NOUTILE}']="NOUTILE";

query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";
query['ListaClienti.html']['modello2Righe']=elementiListaClientiFiltro;
query['ListaClienti.html']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['movimentiPeriodici.html:elencoTipo']=new Array;
query['movimentiPeriodici.html:elencoTipo']['modello1Riga']=elementiFiltriSceltaMultipla;

query['movimentiPeriodici.html:ordinamenti']=new Array;
query['movimentiPeriodici.html:ordinamenti']['modello1Riga']=elementiOrdinamento;

var parametriMP = {dettaglioUDC:0, "nonFiltrareAzienda":0};

var xDataDa=sessionStorage.getItem("movimentiPeriodici.dataDa");
var xDataA=sessionStorage.getItem("movimentiPeriodici.dataA");
var idCliente=0;
var idAgente=0;
var StatoOrdine="";
var ricerca="";
var filtroNumero=0;
var numeroDa=0;
var numeroA=0;
var serieDa="";
var serieA="";
var xFiltri=0;
var idTipo="";

var nomeStorage=nomePagina;
var tabDefault="tabCliente";

var aIdCliente=recuperaParametroHRef("","idCliente");
if (aIdCliente!=""){
    idCliente=aIdCliente;
    document.getElementById("tabCliente").classList.add("hide");
    document.getElementById("tabAgente").classList.add("hide");
    tabDefault="tabTipo";
}

window.addEventListener("load", function(event) {
    recuperaParametri();
    var d=document.getElementById("txtDataDa");
    d.setAttribute("value",convertiDataItaEng(xDataDa));
    
    d=document.getElementById("txtDataA");
    d.setAttribute("value",convertiDataItaEng(xDataA));
    
});

function carDatiMov(){
    if (xIdAgente==0 && xIdCliente==0){
        AvviaCarDatiElencoClienti("elencoAgente","AGENTE",true,1);
    } else {
        document.getElementById("tabAgente").style.display="none";
    }

    if (xIdCliente==0){
        AvviaCarDatiElencoClienti("elencoCliente");
    } else {
        document.getElementById("tabCliente").style.display="none";
        tabDefault="tabNumero";
    }

    avviaCarDatiGenerico("elencoTipo","tipiVenditaMV");
    avviaCarDatiGenerico("slcGDocumento","generiDocVendita");
    document.getElementById(tabDefault).click();

    avviaCarDettagliDocumenti();
}

function elencoECScroll(ec, pagina) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina+"."+ec.getAttribute("name"),scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        avviaCarDettagliDocumenti(false);
    }
}

function txtDataChange(d){
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        avviaCarDettagliDocumenti();
    }, 1000);
}

function avviaCarDettagliDocumenti(ricarica=true,tipoRichiesta='elenco'){
    var maxFetch=0;

    if (query[nomePagina]['MAXFETCH']){
        maxFetch=query[nomePagina]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
    }

    if (query[nomePagina]['OFFSET']>maxFetch && maxFetch!=0) {
        return '';
    }
    
    var da=document.getElementById("txtDataDa");
    var a=document.getElementById("txtDataA");

    var dataDa="";
    var dataA="";
    var dataConsegna = "";
    var genereDocumento=document.getElementById('slcGDocumento').value;
    var statoDocumento=document.getElementById('slcStatoDocumento').value;
    var responsabile=document.getElementById('txtRicercaResponsabile').value;
    var dataConsegnaInput= document.getElementById("txtRicercaDataConsegna");
    var noteDocumento=document.getElementById('txtRicercaNoteDocumento').value;
    if(isDate(dataConsegnaInput.value)){
        dataConsegna = convertiDataEngIta(dataConsegnaInput.value);
    }
    if (isDate(da.value,da)){
        dataDa=convertiDataEngIta(da.value);
    }
    
    if (isDate(a.value,a)){
        dataA=convertiDataEngIta(a.value);
    }
    if(noteDocumento.replace(/ /,'')!=""){
        noteDocumento=noteDocumento;
    }

    if (ricarica){
        query[nomePagina]['OFFSET']=0;
    }

    var ordinamenti=document.getElementById("lblOrdinamento").innerHTML.replace(/, /g,',').replace(/ DESC/g,':');

    if (ordinamenti==''){
        document.getElementById("cmdOrdinamento").removeAttribute("style");
    } else {
        document.getElementById("cmdOrdinamento").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"grafici","nomeQuery":nomePagina, "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,
                    "offSet":query[nomePagina]['OFFSET'],"fetch":query[nomePagina]['FETCH'],"chiamante":"movimentiPeriodici","serieDa":serieDa,
                    "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,"idAgente":idAgente,"idCliente":idCliente, "idTipo":idTipo,"ordinamento":ordinamenti,
                    "genereDocumento":genereDocumento,"statoDocumento":statoDocumento,"responsabile":responsabile, "nonFiltrareAzienda":parametriMP.nonFiltrareAzienda, "maxFetchRpt":query[nomePagina]['MAXFETCH'],"dataConsegna":dataConsegna,
                    "noteDocumento":noteDocumento
                };

    for(var [k,v] of Object.entries(parametri)){
        if(parametriMP[k]!=undefined){
            parametri[k]=parametriMP[k];
        }
    }

    if (tipoRichiesta=='elenco'){
        elencoInCaricamento=1;
        inviaRichiestaCentralino("query",parametri,elaboraDettagli);
    } else if(tipoRichiesta='report'){
            
        var obj={'filtri':{'parametri':parametri}}
        //non funzionante
        stampaReport(obj);
    }
}

function elaboraDettagli(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    var ordinamenti=risp.ordinamenti;
    var genereDocumento=document.getElementById('slcGDocumento').value;
    var statoDocumento=document.getElementById('slcStatoDocumento').value;
    if (risp.error!=''){
        return "";
    }
    
    switch (parametri["tipoRisposta"]){
        case "dettagli":
            var ul=document.getElementById("elencoEC");
            var li="";   
            var ricarica=parametri["ricarica"];
            var dataDa=parametri["dataDa"];
            var dataA=parametri["dataA"];

            if (ricarica){
                xProgressivo=0;
            }

            query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];

            popolaListaOrdinamenti(ordinamenti,'elencoOrdinamento','cmdOrdinamento',nomePagina+':ordinamenti');
            popolaElencoDaJson(data,"elencoEC",0,nomePagina,ricarica,0);

            if(ricarica){
                // var parametri={"tipoRisposta":"saldo","tipoQuery":"grafici","nomeQuery":nomePagina, "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,
                //     "offSet":0,"fetch":0,"chiamante":"movimentiPeriodici","saldi":"SALDI","serieDa":serieDa,
                //     "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,"idAgente":idAgente,"idCliente":idCliente, "idTipo":idTipo,"genereDocumento":genereDocumento,"statoDocumento":statoDocumento
                // };
                parametri.tipoRisposta="saldo";
                parametri.saldi="SALDI";
                
                for(var [k,v] of Object.entries(parametri)){
                    if(parametriMP[k]!=undefined){
                        parametri[k]=parametriMP[k];
                    }
                }
                inviaRichiestaCentralino("query",parametri,elaboraDettagli);
            } else {
                elencoInCaricamento=0;
            }

            break;
        case "saldo":
            var tot=0;
            var imponibile=0;
            var iva=0;
            var nr=0;
            var media="";
            var mediaP="";
            var utile=0;
            var pUtile=0;

            if(data[0]!=0){
                for (n in data){ 
                    tot+=Number(data[n].TOTALE);
                    imponibile+=Number(data[n].TOT_IMPONIBILE);
                    iva+=Number(data[n].TOT_IVA);
                    nr+=Number(data[n].NR);
                    utile+=Number(data[n].TUTILE);
                }
            }
            if (nr!=0){
                media=" (media "+formatter.format(tot/nr)+")";
                mediaP=" ("+formatter.format(tot/nr)+")";
            } else {
                media="";
            }

            if (imponibile!=0){
                pUtile=utile*100/imponibile;
            }
            
            document.getElementById("nr").innerHTML=nr;
            document.getElementById("nrP").innerHTML=nr;
            document.getElementById("media").innerHTML=media;
            document.getElementById("mediaP").innerHTML=mediaP;
            document.getElementById("imponibile").innerHTML=formatter.format(imponibile);
            document.getElementById("imponibileG").innerHTML=formatter.format(imponibile);
            document.getElementById("iva").innerHTML=formatter.format(iva);
            document.getElementById("saldoG").innerHTML=formatter.format(tot);
            document.getElementById("saldoP").innerHTML=formatter.format(tot);

            if (utile!=0){
                document.getElementById("tUtile").innerHTML=formatter.format(utile)+" / "+formattaNumeri(pUtile,1,0)+"%";
            }

            elencoInCaricamento=0;
            break;
    }
}

function apriDettagliDocumenti(li, ricarica=true){
    if (xImmagineAperta){
        xImmagineAperta=false;
        return;
    }

    if (statoModalitaFirma){
        xIdDaStampare=li.getAttribute("id");
        stampa();
        return;
    }
    
    var id=li.getAttribute("id");
    var tabella="";
    var nomeQuery="";

    var div=li.getElementsByTagName("div");
    var divDes=div[0].getElementsByTagName("div");
    var descrizione=divDes[1].innerHTML.replace("<br>","");

    var d=div[12].innerHTML;

    if (d!=""){
        descrizione+="<br>"+d;
    }

    descrizione=descrizione.replace("'","").replace("%","").replace("&","");
    
    tabella="MOVIMENTI";
    nomeQuery="estrattoConto.html:dettagli";
    
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

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"querySpecifica","idDocumento": id,"tabella":tabella, "nomeTabella":nomeQuery,"desDoc":descrizione.replace(/&/g,"e"),
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"dettEstrattoConto", "ricarica":ricarica
                };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraDettagliDocumento);
}

function elaboraDettagliDocumento(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    elencoInCaricamento=0;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        return "";
    }

    sessionStorage.setItem(parametri.nomeTabella+".offSet",parametri.offSet);
    query[parametri.nomeTabella]['OFFSET']+=query[parametri.nomeTabella]['FETCH'];

    apriModalDettagli(parametri.nomeTabella,parametri.desDoc,data,parametri.idDocumento,parametri.ricarica);
    if(parametriMP.testoEmail!=undefined && parametriMP.testoEmail){
        var x =document.getElementById('cmdPDF');
        x.childNodes[0].setAttribute('onclick',`stampaCustomMovimentiPeriodici()`);
    }
}

function listaDaCliente(a,id,descrizione){
    if (idCliente>0){
        xFiltri-=1;
    }
    idCliente=id; 
    avviaCarDettagliDocumenti();

    document.getElementById("lblFiltroCliente").innerHTML="Selezione: "+descrizione;
    document.getElementById("tabCliente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoCliente","","","",nomeStorage);
}

function eliminaFiltroCliente(a){
    if (idCliente>0) {
        idCliente=0;
        avviaCarDettagliDocumenti();
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
    avviaCarDettagliDocumenti();

    document.getElementById("lblFiltroAgente").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("tabAgente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoAgente","","","",nomeStorage);
}

function eliminaFiltroAgente(a){
    if (idAgente>0) {
        idAgente=0;
        avviaCarDettagliDocumenti();
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
    if (idTipo!=""){
        xFiltri-=1;
    }

    idTipo="";

    var ul=document.getElementById("elencoTipo");
    var chk=ul.getElementsByTagName("input");
    for (i=0;i<chk.length;i++){
        if (chk[i].checked){
            idTipo+=chk[i].getAttribute("name")+",";
        }
    }

    if (idTipo!=""){
        idTipo=idTipo.substring(0,idTipo.length-1);
    }

    avviaCarDettagliDocumenti();

    if (idTipo!=""){
        document.getElementById("tabTipo").style.border="3px solid rgba("+xColoreSecondario+", 1)";
        document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";

        xFiltri+=1
    } else {
        document.getElementById("tabTipo").removeAttribute("style");
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
        numeroDa=document.getElementById("txtRicercaNumeroDa").value;
        numeroA=document.getElementById("txtRicercaNumeroA").value;
        serieDa=document.getElementById("txtRicercaSerieDa").value;
        serieA=document.getElementById("txtRicercaSerieA").value;

        filtroNumero=0;

        if (numeroDa!="" || numeroA!="" || serieDa!="" || serieA!=""){
            filtroNumero=1
        } 
        
        avviaCarDettagliDocumenti();

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
function listaDaGenereDocumento(){
    avviaCarDettagliDocumenti();
}
function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        if (aIdCliente==""){
            open ("mainPage.html",xTarget);
        } else {
            open ("graficiAnagrafiche.html?tipoAnagrafica=CLIENTE",xTarget);
        }        
    }
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

    elencoInCaricamento=0;
}

function elencoClientiScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".elencoCliente.scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        AvviaCarDatiElencoClienti("elencoCliente","CLIENTE",false);
    }
}

function dettaglioOrdiniScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".dettaglioOrdini.scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        var md=document.getElementById("myStorico");
        var idTes=md.getAttribute("idTes");
        var li=document.getElementById(idTes);
        apriDettagliDocumenti(li,false);
    }
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

function cambiaOrdinamento(){
    document.getElementById('nav-toggleL').checked=false; 
    avviaCarDettagliDocumenti()
}

var statoModalitaFirma=false;

function modalitaFirma(){
    var cmd=document.getElementById("cmdModalitaFirma");

    if (statoModalitaFirma){
        statoModalitaFirma=false;
        cmd.classList.remove("clrScuro");
    } else {
        statoModalitaFirma=true;
        cmd.classList.add("clrScuro");
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
            parametriMP[data[x]["parametro"]] = Number(data[x]["valore"]);
        } else {
            parametriMP[data[x]["parametro"]] = data[x]["valore"];
        }
    }
    if(parametriMP['modalitaFirma']!=undefined &&parametriMP['modalitaFirma']==1){
        document.getElementById('cmdModalitaFirma').click()
    }
    if(parametriMP.iniziaConDataConsegnaOggi==1){
        document.getElementById("txtRicercaDataConsegna").value=oggiISO();
    }
    var script=document.createElement("script");
    script.setAttribute("src","componenti/elementiDettagliDocumenti.js");
    document.body.appendChild(script);

    script.onload = function() {
        query['estrattoConto.html:dettagli']=new Array;
        query['estrattoConto.html:dettagli']['OFFSET']=0;
        query['estrattoConto.html:dettagli']['FETCH']=100;
        query['estrattoConto.html:dettagli']['MAXFETCH']=0;
        query['estrattoConto.html:dettagli']['campoProgressivo']="TOT_PAGAREF";
        query['estrattoConto.html:dettagli']['modelloRiga']=elementiDettagliDocumenti;
        query['estrattoConto.html:dettagli']['modelloContenitore']=modalECDocumenti;

        query['estrattoConto.html:dettagli']['oggetti']=new Array;
        query['estrattoConto.html:dettagli']['oggetti']['{CODICE}']="CODICE";
        query['estrattoConto.html:dettagli']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
        query['estrattoConto.html:dettagli']['oggetti']['{UM}']="UM";
        query['estrattoConto.html:dettagli']['oggetti']['{QU}']="QU";
        query['estrattoConto.html:dettagli']['oggetti']['{PREZZO}']="PREZZO";
        query['estrattoConto.html:dettagli']['oggetti']['{SC}']="SC";
        query['estrattoConto.html:dettagli']['oggetti']['{IMPORTO}']="IMPORTO";
        query['estrattoConto.html:dettagli']['oggetti']['{MARGINE}']="MARGINE";
        query['estrattoConto.html:dettagli']['oggetti']['{BR}']="BR";
        query['estrattoConto.html:dettagli']['oggetti']['{HIDEIMP}']="HIDEIMP";
        query['estrattoConto.html:dettagli']['oggetti']['{LARGHEZZAD}']="LARGHEZZAD";
        query['estrattoConto.html:dettagli']['oggetti']['{ID}']="ID";

        carDatiMov();
    }
}

query['dettaglioUDC']= new Array;
query['dettaglioUDC']['modalC-body']=``;
// query['dettaglioUDC']['modalC-head']='';
// query['dettaglioUDC']['modalC-footer']='';

function apriDettaglioUDC(id){
    if(Number(id)!=999999){
        var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","dettaglioUDC": id,"tabella":"dettaglioUDC", "nomeTabella":"dettaglioUDC"}
        inviaRichiestaCentralino('query',parametri,(res)=>{
            var risp=JSON.parse(res)
            var risposta=risp.risposta;
            var error=risp.error;
            if(risposta[0]==0){
                attivaAlert(xTipoAllert.ESCLAMAZIONE,'Nessun UDC per questo articolo selezionato')
                return;
            }
            if(risposta!=''){
                query['dettaglioUDC']['modalC-body']=`
                <div >
                <br>
                <div class="intestazione clrSfumatoScuro row w98"><div class="w50 row">UDC PRIMARIO : </div><div class="w50 row cx">${risposta[0]['UDC']}</div></div>
                <div class="row w100 h20p"></div>
                ${risposta[0]['UDC2']!=0 ? '<div class=" intestazione clrSfumatoScuro row w98"><div class="w50 row">UDC SECONDARIO : </div><div class="w50 row cx">'+risposta[0]['UDC2']+'</div></div>':''}
            </div>`;
                apriModalCustom('dettaglioUDC','','DETTAGLIO IMBALLAGGIO ARTICOLO','','',true);
            }
        })
    }
}

function elencoStatoDocumento(input){
    var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","genereDocumento": input.value,"tabella":"elencoStatoDocumento", "nomeTabella":"elencoStatoDocumento"}
    inviaRichiestaCentralino('query',parametri,(res)=>{
        var risp=JSON.parse(res)
        var risposta=risp.risposta;
        var error=risp.error;
        var select =document.getElementById('slcStatoDocumento');
        
            var primoElemento=select[0];
            select.innerHTML='';
            select.appendChild(primoElemento)
        
        if(risposta[0]==0){
            return;
        }
        var slc=document.getElementById('slcStatoDocumento');

        popolaSelectDaJSON(risposta,'slcStatoDocumento','');
    })
}
function stampaCustomMovimentiPeriodici(){
    var testoEmail='';
    if(parametriMP.testoEmail!=undefined && parametriMP.testoEmail){
        testoEmail=parametriMP.testoEmail;
    }
    stampa(0,'V','',testoEmail)
}