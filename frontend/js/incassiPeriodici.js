query['incassiPeriodici.html']=new Array;
query['incassiPeriodici.html']['OFFSET']=0;
query['incassiPeriodici.html']['FETCH']=100;
query['incassiPeriodici.html']['MAXFETCH']=0;
query['incassiPeriodici.html']['modelloRiga']=elementiIncassiPeriodici;

query['incassiPeriodici.html']['oggetti']=new Array;
query['incassiPeriodici.html']['oggetti']['{DATAF}']="DATAF";
query['incassiPeriodici.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['incassiPeriodici.html']['oggetti']['{CONTO}']="CONTO";
query['incassiPeriodici.html']['oggetti']['{DATACREAZIONEF}']="DATACREAZIONEF";
query['incassiPeriodici.html']['oggetti']['{IMPORTO}']={"campo":"IMPORTO","deciamaliMax":2,"decimaliMin":2};
query['incassiPeriodici.html']['oggetti']['{ABBUONO}']={"campo":"ABBUONO","deciamaliMax":2,"decimaliMin":2};
query['incassiPeriodici.html']['oggetti']['{ID}']="ID";
query['incassiPeriodici.html']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['incassiPeriodici.html']['oggetti']['{NOTE}']="NOTE";
query['incassiPeriodici.html']['oggetti']['{IMMAGINE}']="IMMAGINE";
query['incassiPeriodici.html']['oggetti']['{TABELLA}']="TABELLA";
query['incassiPeriodici.html']['oggetti']['{DOCINC}']="DOCINC";

query['incassiPeriodici.html:incassi']=new Array;
query['incassiPeriodici.html:incassi']['OFFSET']=0;
query['incassiPeriodici.html:incassi']['FETCH']=100;
query['incassiPeriodici.html:incassi']['MAXFETCH']=0;
query['incassiPeriodici.html:incassi']['campoProgressivo']="TOT_PAGAREF";
query['incassiPeriodici.html:incassi']['modelloRiga']=elementiDettagliIncassi;
query['incassiPeriodici.html:incassi']['modelloContenitore']=modalECIncassi;

query['incassiPeriodici.html:incassi']['oggetti']=new Array;
query['incassiPeriodici.html:incassi']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['incassiPeriodici.html:incassi']['oggetti']['{DATA}']="DATA";
query['incassiPeriodici.html:incassi']['oggetti']['{NUMERO}']="NUMERO";
query['incassiPeriodici.html:incassi']['oggetti']['{SCADENZA}']="SCADENZA";
query['incassiPeriodici.html:incassi']['oggetti']['{IMPORTOSCAD}']="IMPORTOSCAD";
query['incassiPeriodici.html:incassi']['oggetti']['{GG}']="GG";

query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";
query['ListaClienti.html']['modello2Righe']=elementiListaClientiFiltro;
query['ListaClienti.html']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['incassiPeriodici.html:elencoTipo']=new Array;
query['incassiPeriodici.html:elencoTipo']['modello1Riga']=elementiFiltriSceltaMultipla;

query['incassiPeriodici.html:ordinamenti']=new Array;
query['incassiPeriodici.html:ordinamenti']['modello1Riga']=elementiOrdinamento;

var parametriSO={"visAScadere":1};

tipoAnagrafica=recuperaParametroHRef("CLIENTE");
if (tipoAnagrafica=="CLIENTE"){
    valorizzaHTMLElemento("lblIntestazione","LISTA INCASSI");
} else {
    valorizzaHTMLElemento("lblIntestazione","LISTA PAGAMENTI");
    var e=document.getElementById("divChkManoAgente");
    e.classList.add("hide");
    e=document.getElementById("divCorpo");
    e.classList.remove("posTopAFlexInc");
    e.classList.add("posTopA213p");
}

var xDataDa=sessionStorage.getItem("incassiPeriodici.dataDa");
var xDataA=sessionStorage.getItem("incassiPeriodici.dataA");
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

window.addEventListener("load", function(event) {
    setTimeout( function() {
        if (isDate(xDataDa)){
            valorizzaValueElemento("txtDataIncDa",convertiDataItaEng(xDataDa));
        } else {
            var today = new Date();
            var annoCor=today.getFullYear();

            if (today > new Date(annoCor,2,31)){
                valorizzaValueElemento("txtDataDa",annoCor+"-01-01");
            } else {
                valorizzaValueElemento("txtDataDa",(annoCor-1)+"-01-01");
            }
        }
        
        if (isDate(xDataA)){
            d=document.getElementById("txtDataIncA");
            d.setAttribute("value",convertiDataItaEng(xDataA));
        }

        if (tipoAnagrafica=="CLIENTE" && xDataDa==undefined && xDataA==undefined){
            var e=document.getElementById("chkManoAgente");
            e.checked=(localStorage.getItem(nomePagina+":"+tipoAnagrafica+".chkManoAgente")=="true");
        }

        recuperaParametri();
    }, 100);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
    inviaRichiestaCentralino("parametri",parametri,elaboraParametri);
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriSO[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriSO[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    carDatiMov();
}

function carDatiMov(){
    var tabDefault="tabCliente";

    if (xIdAgente==0 && xIdCliente==0){
        AvviaCarDatiElencoClienti("elencoAgente","AGENTE",true,1);
        avviaCarDatiGenerico("elencoTipo","contiIncPag");
    } else {
        document.getElementById("tabAgente").style.display="none";
        document.getElementById("tabTipo").style.display="none";
    }

    if (xIdCliente==0){
        AvviaCarDatiElencoClienti("elencoCliente");
    } else {
        document.getElementById("tabCliente").style.display="none";
        tabDefault="tabNumero";
    }

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

    if (isDate(da.value,da)){
        dataDa=convertiDataEngIta(da.value);
    }
    
    if (isDate(a.value,a)){
        dataA=convertiDataEngIta(a.value);
    }

    var da=document.getElementById("txtDataIncDa");
    var a=document.getElementById("txtDataIncA");

    var dataIncDa="";
    var dataIncA="";

    if (isDate(da.value,da)){
        dataIncDa=convertiDataEngIta(da.value);
    }
    
    if (isDate(a.value,a)){
        dataIncA=convertiDataEngIta(a.value);
    }

    var manoAgente=recuperaCheckedElemento("chkManoAgente");
    if (manoAgente){
        manoAgente=1;
    } else {
        manoAgente=0;
    }

    var nonAnticipati=recuperaCheckedElemento("chkNonAnticipati");
    if (nonAnticipati){
        nonAnticipati=1;
    } else {
        nonAnticipati=0;
    }

    var anticipati=recuperaCheckedElemento("chkAnticipati");
    if (anticipati){
        anticipati=1;
    } else {
        anticipati=0;
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

    if (parametriSO.visAScadere==0){
        dataIncA=oggiISO();
    }

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"incassiPeriodici","nomeQuery":nomePagina, "dataDa":dataDa, "dataA":dataA, "ricarica":ricarica,
                    "offSet":query[nomePagina]['OFFSET'],"fetch":query[nomePagina]['FETCH'],"chiamante":"movimentiPeriodici","serieDa":serieDa,
                    "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,"idAgente":idAgente,"idCliente":idCliente, "idConto":idTipo,"ordinamento":ordinamenti,
                    "manoAgente":manoAgente, "dataIncDa":dataIncDa, "dataIncA":dataIncA, "tipoAnagrafica":tipoAnagrafica, "maxFetchRpt":query[nomePagina]['MAXFETCH'],
                    "nonAnticipati":nonAnticipati, "anticipati":anticipati
                };

    if (tipoRichiesta=='elenco'){
        elencoInCaricamento=1;        
        inviaRichiestaCentralino("query",parametri,elaboraDettagli);
    } else if(tipoRichiesta=='report'){
        var dettagliIncassi={"tipoRisposta":"dettagli","tipoQuery":"incassiPeriodici", "nomeQuery":'incassiPeriodici.html:incassi',
                            "offSet":0,"fetch":100,"chiamante":"dettEstrattoConto", "tipoAnagrafica":'CLIENTE'        
                            };
        var obj={
            'filtri':{'incassi':parametri,'dettagliIncassi':dettagliIncassi}
        }
        stampaReport(obj);
    }
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
                parametri.tipoRisposta="saldo";
                inviaRichiestaCentralino("query",parametri,elaboraDettagli);
            } else {
                elencoInCaricamento=0;
            }

            break;
        case "saldo":
            var tImporto=0;
            var tAbbuono=0;
            var contante=0;
            var nr=0;
            var ab=0;
            var abP=0;
            var altro=0;

            if(data[0]!=0){
                for (n in data){ 
                    tImporto+=Number(data[n].TIMPORTO);
                    tAbbuono+=Number(data[n].TABBUONO);
                    contante+=Number(data[n].CONTANTI);
                    ab+=Number(data[n].ASSEGNI);
                    abP+=Number(data[n].ASSEGNIP);
                    altro+=Number(data[n].ALTRO);
                    nr+=Number(data[n].NR);
                }
            }

            if (tipoAnagrafica=="CLIENTE"){
                nr=nr+" incassi";
            } else {
                nr=nr+" pagamenti";
            }

            valorizzaHTMLElemento("importo",formattaNumeri(tImporto,2,2));
            valorizzaHTMLElemento("importoG",formattaNumeri(tImporto,2,2));
            valorizzaHTMLElemento("abbuono",formattaNumeri(tAbbuono,2,2));
            valorizzaHTMLElemento("abbuonoG",formattaNumeri(tAbbuono,2,2));
            valorizzaHTMLElemento("contanti","€ "+formattaNumeri(contante,2,2));
            valorizzaHTMLElemento("assegni","a/b "+formattaNumeri(ab,2,2));
            valorizzaHTMLElemento("scadenza","scad. "+formattaNumeri(abP,2,2));
            valorizzaHTMLElemento("altro","altro "+formattaNumeri(altro,2,2));
            valorizzaHTMLElemento("nr",nr);
            valorizzaHTMLElemento("nrP",nr);

            elencoInCaricamento=0;
            break;
    }
}

function apriDettagliDocumenti(li,ricarica=true){
    if (xImmagineAperta){
        xImmagineAperta=false;
        return;
    }
    
    var id=li.getAttribute("id");
    var tag=li.getAttribute("tag");
    var tabella="";
    var nomeQuery="";

    var div=li.getElementsByTagName("div");
    var divDes=div[0].getElementsByTagName("div");
    var descrizione=recuperaHTMLElemento("descrizione."+id).replace("<br>"," ")+"<br>"+recuperaHTMLElemento("cliente."+id);

    descrizione=descrizione.replace("'","").replace("%","").replace("&","");
    
    if (tag=="I"){
        nomeQuery=nomePagina+":incassi";
    } else {
        nomeQuery=nomePagina+":dettagli";
    }

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

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"incassiPeriodici","id": id, "nomeQuery":nomeQuery, "desDoc":descrizione.replace(/&/g,"e"),
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"dettEstrattoConto", "tipoAnagrafica":tipoAnagrafica,
                    "ricarica":ricarica
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

    sessionStorage.setItem(parametri.nomeQuery+".offSet",parametri.offSet);
    query[parametri.nomeQuery]['OFFSET']+=query[parametri.nomeQuery]['FETCH'];

    apriModalDettagli(parametri.nomeQuery,parametri.desDoc,data,parametri.id,parametri.ricarica);
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

function chkClick(e){
    if (e.id=="chkNonAnticipati"){
        document.getElementById("chkAnticipati").checked=false;
    } else if (e.id=="chkAnticipati"){
        document.getElementById("chkNonAnticipati").checked=false;
    }

    localStorage.setItem(nomePagina+":"+tipoAnagrafica+".chkManoAgente",e.checked);
    avviaCarDettagliDocumenti();
}