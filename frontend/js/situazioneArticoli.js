query['situazioneArticoli.html']=new Array;
query['situazioneArticoli.html']['OFFSET']=0;
query['situazioneArticoli.html']['FETCH']=100;
query['situazioneArticoli.html']['MAXFETCH']=0;

query['situazioneArticoli.html']['oggetti']=new Array;
query['situazioneArticoli.html']['oggetti']['{DATA}']="DATA";
query['situazioneArticoli.html']['oggetti']['{DATADOC}']="DATADOC";
query['situazioneArticoli.html']['oggetti']['{CODICE}']="CODICE";
query['situazioneArticoli.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['situazioneArticoli.html']['oggetti']['{DESTIPO}']="DESTIPO";
query['situazioneArticoli.html']['oggetti']['{NUMERO}']="NUMERO";
query['situazioneArticoli.html']['oggetti']['{IMPORTO}']="IMPORTO";
query['situazioneArticoli.html']['oggetti']['{QU}']="QU";
query['situazioneArticoli.html']['oggetti']['{PREZZONETTO}']="PREZZONETTO";
query['situazioneArticoli.html']['oggetti']['{ID}']="ID";
query['situazioneArticoli.html']['oggetti']['{ID_MOV}']="ID_MOV";
query['situazioneArticoli.html']['oggetti']['{AV}']="AV";
query['situazioneArticoli.html']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['situazioneArticoli.html']['oggetti']['{UM}']="UM";
query['situazioneArticoli.html']['oggetti']['{DDEPOSITO}']="DDEPOSITO";
query['situazioneArticoli.html']['oggetti']['{DESESTESATIPO}']="DESESTESATIPO";
query['situazioneArticoli.html']['oggetti']['{CS}']="CS";

query['estrattoConto.html:dettagli']=new Array;
query['estrattoConto.html:dettagli']['OFFSET']=0;
query['estrattoConto.html:dettagli']['FETCH']=100;
query['estrattoConto.html:dettagli']['MAXFETCH']=0;
query['estrattoConto.html:dettagli']['campoProgressivo']="TOT_PAGAREF";

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

query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";
query['ListaClienti.html']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['situazioneArticoli.html:elencoTipo']=new Array;

query['situazioneArticoli.html:ordinamenti']=new Array;

var idCliente=0;
var idAgente=0;
var StatoOrdine="";
var ricerca="";
var filtroNumero=0;
var codice="";
var descrizione="";
var deposito=0;
var desLibere=0;
var tipoMov="";
var obsoleti=false;
var ivaInc=false;
var xFiltri=0;
var idTipo="";

var nomeStorage=nomePagina;

window.addEventListener("load", function(event) {     
    query['situazioneArticoli.html']['modelloRiga']=elementiSituazioneArticoli;
    query['estrattoConto.html:dettagli']['modelloRiga']=elementiDettagliDocumenti;
    query['estrattoConto.html:dettagli']['modelloContenitore']=modalECDocumenti;
    query['ListaClienti.html']['modello2Righe']=elementiListaClientiFiltro;
    query['situazioneArticoli.html:elencoTipo']['modello1Riga']=elementiFiltriSceltaMultipla;
    query['situazioneArticoli.html:ordinamenti']['modello1Riga']=elementiOrdinamento;
    
    carDatiMov();
});

function carDatiMov(){
    var tabDefault="tabNumero";

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

    avviaCarDatiGenerico("elencoTipo","generiDocumento");
    avviaCarDatiGenerico("cmbDeposito","depositi",elaboraRispostaDepositi);

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

function avviaCarDettagliDocumenti(ricarica=true){
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

    var dataDa=convertiDataEngIta(oggiISO().substring(0,8)+"01");
    var dataA="";

    if (da.value==""){
        da.value=convertiDataItaEng(dataDa);
        da.setAttribute("value",convertiDataItaEng(dataDa));
    }

    if (isDate(da.value,da)){
        dataDa=convertiDataEngIta(da.value);
    }
    
    if (isDate(a.value,a)){
        dataA=convertiDataEngIta(a.value);
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

    var idDest=0;

    if (idCliente!=0){
        idDest=recuperaValueElemento("cmbDestinazione");
    }

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"situazioneArticoli","nomeQuery":nomePagina, "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,
                    "offSet":query[nomePagina]['OFFSET'],"fetch":query[nomePagina]['FETCH'],"chiamante":"situazioneArticoli","codice":codice,
                    "descrizione":descrizione,"deposito":deposito,"ivaInc":ivaInc,"idAgente":idAgente,"idCliente":idCliente, "idTipo":idTipo,"ordinamento":ordinamenti,
                    "obsoleti":obsoleti, "tipoMov":tipoMov, "desLibere":desLibere, "idDest":idDest
                };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraDettagli);
}

function elaboraDettagli(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    var ordinamenti=risp.ordinamenti;

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
                // var parametri={"tipoRisposta":"saldo","tipoQuery":"situazioneArticoli","nomeQuery":nomePagina, "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,
                //     "offSet":0,"fetch":0,"chiamante":"movimentiPeriodici","saldi":"SALDI","serieDa":serieDa,
                //     "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,"idAgente":idAgente,"idCliente":idCliente, "idTipo":idTipo
                // };

                parametri.tipoRisposta="saldo";
                parametri.saldi="SALDI";
                parametri.offSet=0;
                parametri.fetch=0;

                inviaRichiestaCentralino("query",parametri,elaboraDettagli);
            } else {
                elencoInCaricamento=0;
            }

            break;
        case "saldo":
            var carichi=0;
            var scarichi=0;
            var quCarichi=0;
            var quScarichi=0;
            var impCarichi=0;
            var impScarichi=0;
            var tot=0;
            var impTot=0;
            var nr=0;

            if(data[0]!=0){
                for (n in data){ 
                    carichi+=Number(data[n].NUMEROCAR);
                    scarichi+=Number(data[n].NUMEROSCAR);
                    quCarichi+=Number(data[n].QUCAR);
                    quScarichi+=Number(data[n].QUSCAR);
                    impCarichi+=Number(data[n].IMPORTOCAR);
                    impScarichi+=Number(data[n].IMPORTOSCAR);
                }
            }
            
            tot=quCarichi-quScarichi;
            impTot=impScarichi-impCarichi;
            nr=carichi+scarichi;

            valorizzaHTMLElemento("desCarichiG",formattaNumeri(carichi,0,0)+' Carichi');
            valorizzaHTMLElemento("desCarichi",formattaNumeri(carichi,0,0)+' Carichi');
            valorizzaHTMLElemento("desScarichiG",formattaNumeri(scarichi,0,0)+' Scarichi');
            valorizzaHTMLElemento("desScarichi",formattaNumeri(scarichi,0,0)+' Scarichi');
            valorizzaHTMLElemento("desTotG",formattaNumeri(nr,0,0)+' Totali');
            valorizzaHTMLElemento("desTot",formattaNumeri(nr,0,0)+' Totali');
            valorizzaHTMLElemento("carichiQuG",formattaNumeri(quCarichi,3,0));
            valorizzaHTMLElemento("carichiQu",formattaNumeri(quCarichi,3,0));
            valorizzaHTMLElemento("scarichiQuG",formattaNumeri(quScarichi,3,0));
            valorizzaHTMLElemento("scarichiQu",formattaNumeri(quScarichi,3,0));
            valorizzaHTMLElemento("totaliQuG",formattaNumeri(tot,3,0));
            valorizzaHTMLElemento("totaliQu",formattaNumeri(tot,3,0));
            valorizzaHTMLElemento("carichiVG",formattaNumeri(impCarichi,2,2));
            valorizzaHTMLElemento("carichiV",formattaNumeri(impCarichi,2,2));
            valorizzaHTMLElemento("scarichiVG",formattaNumeri(impScarichi,2,2));
            valorizzaHTMLElemento("scarichiV",formattaNumeri(impScarichi,2,2));
            valorizzaHTMLElemento("totaliVG",formattaNumeri(impTot,2,2));
            valorizzaHTMLElemento("totaliV",formattaNumeri(impTot,2,2));

            elencoInCaricamento=0;
            break;
    }
}

function apriDettagliDocumenti(li, ricarica=true){
    if (xImmagineAperta){
        xImmagineAperta=false;
        return;
    }
    
    var id=li.getAttribute("id");
    var av=id.substring(0,1);
    id=id.substring(1);
    var tabella="";
    var nomeQuery="";

    var div=li.getElementsByTagName("div");
    var divDes=div[0].getElementsByTagName("div");
    var descrizione=recuperaHTMLElemento("desEstesaTipo."+id);

    // var d=div[12].innerHTML;

    // if (d!=""){
    //     descrizione+="<br>"+d;
    // }

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

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"querySpecifica","AV":av,"idDocumento": id,"tabella":tabella, "nomeTabella":nomeQuery,"desDoc":descrizione.replace(/&/g,"e"),
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
}

function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        open ("mainPage.html",xTarget);
    }
}

function listaDaCliente(a,id,descrizione){
    if (idCliente>0){
        xFiltri-=1;
    }
    idCliente=id; 
    avviaCarDatiGenerico("cmbDestinazione","listaDestinazioni");
    avviaCarDettagliDocumenti();

    document.getElementById("lblFiltroCliente").innerHTML="Selezione: "+descrizione;
    document.getElementById("tabCliente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    var el=document.getElementById("elencoCliente");
    el.classList.add("posBottomA155p");
    el.classList.remove("posBottomA120p");

    el=document.getElementById("divDestinazione");
    el.classList.remove("hide");

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

        var el=document.getElementById("elencoCliente");
        el.classList.remove("posBottomA155p");
        el.classList.add("posBottomA120p");

        el=document.getElementById("divDestinazione");
        el.classList.add("hide");
        
        valorizzaValueElemento("cmbDestinazione","0");
        valorizzaHTMLElemento("cmbDestinazione",'<option value="0">Seleziona Destinazione</option>');

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
        codice=recuperaValueElemento("txtRicercaCodice").replace('+','_');
        descrizione=recuperaValueElemento("txtRicercaDescrizione").replace('+','_');
        deposito=recuperaValueElemento("cmbDeposito");
        desLibere=recuperaValueElemento("cmbDesLibere");
        tipoMov=recuperaValueElemento("cmbTipoMovimento");
        obsoleti=recuperaCheckedElemento("chkObsoleti");
        ivaInc=recuperaCheckedElemento("chkIvaInc");

        filtroNumero=0;

        if (codice!="" || descrizione!="" || deposito!=0 || desLibere!="" || tipoMov!="" || obsoleti || ivaInc){
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

function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        open ("mainPage.html",xTarget);
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

function elaboraRispostaDepositi(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        return "";
    }

    popolaSelectDaJSON(data,parametri.select);
}