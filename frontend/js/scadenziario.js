query['scadenziario.html']=new Array;
query['scadenziario.html']['OFFSET']=0;
query['scadenziario.html']['FETCH']=100;
query['scadenziario.html']['MAXFETCH']=0;
query['scadenziario.html']['modelloRiga']=elementiScadenziarioScheda;
query['scadenziario.html']['modelloIntestazione']=scadenziarioModelloIntestazione;
query['scadenziario.html']['modelloPiede']=scadenziarioModelloPiede;

query['scadenziario.html']['oggetti']=new Array;
query['scadenziario.html']['oggetti']['{DATAF}']="DATAF";
query['scadenziario.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['scadenziario.html']['oggetti']['{DESTIPO}']="GENEREF";
query['scadenziario.html']['oggetti']['{NUMERO}']="NUMERO";
query['scadenziario.html']['oggetti']['{IMPORTOF}']="IMPORTOF";
query['scadenziario.html']['oggetti']['{PAGATOF}']="PAGATOF";
query['scadenziario.html']['oggetti']['{SALDOF}']="SALDOF";
query['scadenziario.html']['oggetti']['{SCADENZAF}']="SCADENZAF";
query['scadenziario.html']['oggetti']['{ID}']="ID";
query['scadenziario.html']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['scadenziario.html']['oggetti']['{NOTE}']="NOTE";
query['scadenziario.html']['oggetti']['{IMMAGINE}']="IMMAGINE";
query['scadenziario.html']['oggetti']['{TABELLA}']="TABELLA";
query['scadenziario.html']['oggetti']['{IDTES}']="IDTES";
query['scadenziario.html']['oggetti']['{PAGAMENTOF}']="PAGAMENTOF";
query['scadenziario.html']['oggetti']['{DAGENTE}']="DAGENTE";

query['scadenziario.html:clienti']=new Array;
query['scadenziario.html:clienti']['OFFSET']=0;
query['scadenziario.html:clienti']['FETCH']=100;
query['scadenziario.html:clienti']['MAXFETCH']=0;
query['scadenziario.html:clienti']['modelloRiga']=elementiScadenziarioClienti;
query['scadenziario.html:clienti']['modelloIntestazione']=scadenziarioModelloIntestazioneClienti;
query['scadenziario.html:clienti']['modelloPiede']=scadenziarioModelloPiedeClienti;

query['scadenziario.html:clienti']['oggetti']=new Array;
query['scadenziario.html:clienti']['oggetti']['{CLIENTE}']="CLIENTE";
query['scadenziario.html:clienti']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['scadenziario.html:clienti']['oggetti']['{SCADEREF}']="SCADEREF";
query['scadenziario.html:clienti']['oggetti']['{SCADUTOF}']="SCADUTOF";
query['scadenziario.html:clienti']['oggetti']['{SCADUTO30F}']="SCADUTO30F";
query['scadenziario.html:clienti']['oggetti']['{SCADUTO60F}']="SCADUTO60F";
query['scadenziario.html:clienti']['oggetti']['{SCADUTO90F}']="SCADUTO90F";
query['scadenziario.html:clienti']['oggetti']['{SCADUTO120F}']="SCADUTO120F";
query['scadenziario.html:clienti']['oggetti']['{SCADUTOOLTREF}']="SCADUTOOLTREF";
query['scadenziario.html:clienti']['oggetti']['{HIDENOTECLI}']="HIDENOTECLI";

query['scadenziario.html:mese']=new Array;
query['scadenziario.html:mese']['OFFSET']=0;
query['scadenziario.html:mese']['FETCH']=100;
query['scadenziario.html:mese']['MAXFETCH']=0;
query['scadenziario.html:mese']['campoProgressivo']="SALDO";
query['scadenziario.html:mese']['modelloRiga']=elementiScadenziarioMese;
query['scadenziario.html:mese']['modelloIntestazione']=scadenziarioModelloIntestazioneMese;
query['scadenziario.html:mese']['modelloPiede']=scadenziarioModelloPiedeMese;

query['scadenziario.html:mese']['oggetti']=new Array;
query['scadenziario.html:mese']['oggetti']['{MESE}']="MESE";
query['scadenziario.html:mese']['oggetti']['{NR}']="NR";
query['scadenziario.html:mese']['oggetti']['{SALDOF}']="SALDOF";

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

query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";
query['ListaClienti.html']['modello2Righe']=elementiListaClientiFiltro;
query['ListaClienti.html']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this,\'{ID}\')">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['scadenziario.html:elencoTipoScad']=new Array;
query['scadenziario.html:elencoTipoScad']['modello1Riga']=elementiFiltriSceltaMultipla;

query['scadenziario.html:elencoTipo']=new Array;
query['scadenziario.html:elencoTipo']['modello1Riga']=elementiFiltriSceltaMultipla;

query['scadenziario.html:ordinamenti']=new Array;
query['scadenziario.html:ordinamenti']['modello1Riga']=elementiOrdinamento;

var xDataDa="";
var xDataA="";
var idCliente=0;
var idAgente=0;
var StatoOrdine="";
var ricerca="";
var filtroNumero=0;
var numeroDa=0;
var numeroA=0;
var serieDa="";
var serieA="";
var dataDocDa="";
var dataDocA="";
var dataIncDa="";
var dataIncA="";
var xFiltri=0;
var idTipo="";
var idTipoScad="";
var ragioneSociale="";
var idPagamento=0;
var xNomequery=nomePagina+":clienti";
var posizione="";

var posizioneScrool=0;
var elencoEC="";
var lblTotali="";

var parametriScadenziario={"campoRaggruppamentoMese":"S.SCADENZA","cmbPosizione":"", "visualizzaNote":0, "noDDT":1};

//PER POTER RIRPRISTINARE L'ORDINAMENTO DELL'ELENCO CLIENTI
var xOrdinamentoClienti="";
var xOrdinamentoMese="";
var yIdCliente=0;
var yRagSoc="";

tipoAnagrafica=recuperaParametroHRef("");

var idAppo=0;

var appo=window.sessionStorage.getItem("aIdCliente");
if (appo!=undefined){
    idAppo=appo;
    var idCliente=window.sessionStorage.getItem("idFornitore");
    var ragioneSociale=window.sessionStorage.getItem("ragioneSocialeF");
    if (tipoAnagrafica=="CLIENTE"){
        query['scadenziario.html']['modelloRiga']=elementiScadenziarioScheda;
        query['scadenziario.html:clienti']['modelloRiga']=elementiScadenziarioClientiScheda;
    } else if (tipoAnagrafica=="FORNITORE") {
        query['scadenziario.html']['modelloRiga']=elementiScadenziarioScheda;
        query['scadenziario.html:clienti']['modelloRiga']=elementiScadenziarioClientiScheda;
        valorizzaHTMLElemento("lblChkAcquisti","Includi Scadenze da Vendite");
    }
} else {
    if (tipoAnagrafica==""){
        tipoAnagrafica="CLIENTE";
    } else if (tipoAnagrafica=="CLIENTE"){
        idCliente=window.sessionStorage.getItem("idCliente");
        ragioneSociale=window.sessionStorage.getItem("ragioneSociale");
        query['scadenziario.html']['modelloRiga']=elementiScadenziarioScheda;
        query['scadenziario.html:clienti']['modelloRiga']=elementiScadenziarioClientiScheda;
    } else if (tipoAnagrafica=="FORNITORE") {
        idCliente=window.sessionStorage.getItem("idFornitore");
        ragioneSociale=window.sessionStorage.getItem("ragioneSocialeF");
        query['scadenziario.html']['modelloRiga']=elementiScadenziarioScheda;
        query['scadenziario.html:clienti']['modelloRiga']=elementiScadenziarioClientiScheda;
        valorizzaHTMLElemento("lblChkAcquisti","Includi Scadenze da Vendite");
    } else if (tipoAnagrafica=="FORNITORES") {
        tipoAnagrafica="FORNITORE"
        valorizzaHTMLElemento("lblChkAcquisti","Includi Scadenze da Vendite");
    }
}

variantePagina=":"+tipoAnagrafica;

if (ragioneSociale==undefined){
    ragioneSociale="";
}

var nomeStorage=nomePagina+"."+tipoAnagrafica;

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var d=document.getElementById("txtDataDa");
        d.value="";
        
        d=document.getElementById("txtDataA");
        d.value="";

        carDatiMov();
    }, 100);
});

function carDatiMov(){
    var tabDefault="tabCliente";

    if (xIdAgente==0 && xIdCliente==0 && tipoAnagrafica!="FORNITORE"){
        AvviaCarDatiElencoClienti("elencoAgente","AGENTE",true,1);
    } else {
        document.getElementById("tabAgente").style.display="none";
    }

    if (xIdCliente==0 && ragioneSociale==""){
        AvviaCarDatiElencoClienti("elencoCliente");
    } else {
        document.getElementById("tabCliente").style.display="none";
        tabDefault="tabNumero";
    }

    if (tipoAnagrafica=="FORNITORE"){
        document.getElementById("tabCliente").innerHTML="Fornitore";

        if (ragioneSociale!=""){
            document.getElementById("lblIntestazione").innerHTML="SCADUTO "+ragioneSociale;
        } else {
            document.getElementById("lblIntestazione").innerHTML="SCADUTO FORNITORI";
        }
    } else {
        if (ragioneSociale!=""){
            document.getElementById("lblIntestazione").innerHTML="SCADUTO "+ragioneSociale;
        } else {
            document.getElementById("lblIntestazione").innerHTML="SCADUTO CLIENTI";
        }
    }

    avviaCarDatiGenerico("cmbPosizione","posizione");
    avviaCarDatiGenerico("elencoTipo","generiDocumento");
    avviaCarDatiGenerico("elencoTipoScad","tipiScadenze");
    avviaCarDatiPagamenti("cmbPagamento");

    document.getElementById(tabDefault).click();

    recuperaParametri();
}

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 

    elencoInCaricamento=1;

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
            parametriScadenziario[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriScadenziario[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    if (parametriScadenziario.cmbPosizione!=""){
        valorizzaValueElemento("cmbPosizione",parametriScadenziario.cmbPosizione);
        posizione=parametriScadenziario.cmbPosizione;
    }

    document.getElementById("chkAperti").checked=true;

    if (parametriScadenziario.modificheIceCube==1){
        document.getElementById("chkAcquisti").checked=true;
    }

    if (parametriScadenziario.noDDT==1){
        document.getElementById("chkNoDDT").checked=true;
    }

    elencoInCaricamento=0;

    avviaCarDettagliDocumenti();
}

function elencoECScroll(ec, pagina) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina+"."+ec.getAttribute("name"),scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        avviaCarDettagliDocumenti(false,xNomequery);
    }
}

function txtDataChange(d){
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        avviaCarDettagliDocumenti(true,xNomequery);
    }, 1000);
}

function avviaCarDettagliDocumenti(ricarica=true,nomeQuery=nomePagina+":clienti",forzaOrdinamento=false, xOrd=""){
    if (nomeQuery=="scadenziario.html:clienti" && elencoEC!=""){
        document.getElementById("elencoEC").innerHTML=elencoEC;
        document.getElementById("piedeGriglia").innerHTML=lblTotali;
        document.getElementById("elencoEC").scrollTop=posizioneScrool;
        elencoEC="";
        lblTotali="";
        posizioneScrool=0;
        
        return;
    }
    
    var maxFetch=0;

    if (query[nomeQuery]['MAXFETCH']){
        maxFetch=query[nomeQuery]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
    }

    if (query[nomeQuery]['OFFSET']>maxFetch && maxFetch!=0) {
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

    var aperti=document.getElementById("chkAperti").checked;

    if (aperti){
        aperti=1;
    } else {
        aperti=0;
    }

    var noDDT=document.getElementById("chkNoDDT").checked;

    if (noDDT){
        noDDT=1;
    } else {
        noDDT=0;
    }

    if (ricarica){
        query[nomeQuery]['OFFSET']=0;
    }

    var consideraDaAcquisti=document.getElementById("chkAcquisti").checked;

    if (consideraDaAcquisti){
        consideraDaAcquisti=1;
    } else {
        consideraDaAcquisti=0;
    }

    var ordinamenti=document.getElementById("lblOrdinamento").innerHTML.replace(/, /g,',').replace(/ DESC/g,':');

    if (ordinamenti==''){
        document.getElementById("cmdOrdinamento").removeAttribute("style");
    } else {
        document.getElementById("cmdOrdinamento").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"scadenziario","nomeQuery":nomeQuery, "scadenzaDa":dataDa, "scadenzaA":dataA, "ricarica":ricarica,
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"scadenziario","serieDa":serieDa,"idTipoScad":idTipoScad,
                    "serieA":serieA,"numeroDa":numeroDa,"numeroA":numeroA,"idAgente":idAgente,"idCliente":idCliente, "inGenere":idTipo,"ordinamento":ordinamenti,
                    "dataIncassoDa":dataIncDa,"dataIncassoA":dataIncA,"noDDT":0,"soloAperti":aperti,"noDDT":noDDT, "tipoAnagrafica":tipoAnagrafica,
                    "dataDa":dataDocDa, "dataA":dataDocA, "idPagamento":idPagamento,"nomeQuery":nomeQuery, "posizione":posizione, "consideraDaAcquisti":consideraDaAcquisti,
                    "campoRaggruppamentoMese":parametriScadenziario["campoRaggruppamentoMese"],"forzaOrdinamento":forzaOrdinamento, "xOrd":xOrd, "visualizzaNote":parametriScadenziario.visualizzaNote
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

            query[parametri.nomeQuery]['OFFSET']+=query[parametri.nomeQuery]['FETCH'];

            popolaListaOrdinamenti(ordinamenti,'elencoOrdinamento','cmdOrdinamento',nomePagina+':ordinamenti',parametri.forzaOrdinamento,parametri.xOrd);
            popolaElencoDaJson(data,"elencoEC",0,parametri.nomeQuery,ricarica,0,xProgressivo);

            document.getElementById("intestazioneGriglia").innerHTML=query[parametri.nomeQuery]["modelloIntestazione"];

            if(ricarica){
                document.getElementById("piedeGriglia").innerHTML=query[parametri.nomeQuery]["modelloPiede"];
                
                parametri.tipoRisposta="saldo";
                parametri.saldi="SALDI";

                inviaRichiestaCentralino("query",parametri,elaboraDettagli);

                if (parametri.nomeQuery!="scadenziario.html:clienti" && parametriScadenziario.visualizzaNote!=0){
                    if (data!=[0]){
                        if (data[0].NOTECLI!='' && xIdCliente==0){
                            var e=document.getElementById("elencoEC");
                            e.innerHTML="<li class=\"w100-15p clrSfondoArancione elementiGriglia marg5Bottom tableStyle AStyle testoNormale\">"+data[0].NOTECLI+"</li>"+e.innerHTML;
                        }
                    }
                }
            } else {
                elencoInCaricamento=0;
            }

            break;
        case "saldo":
            var scadere=0;
            var scaduto30=0;
            var scaduto60=0;
            var scaduto90=0;
            var scaduto120=0;
            var scadutoOltre=0;
            var scaduto=0;

            if(data[0]!=0){
                switch (parametri.nomeQuery){
                    case nomePagina+':clienti':
                        for (n in data){ 
                            scadere+=Number(data[n].TSCADERE);
                            scaduto30+=Number(data[n].TSCADUTO30);
                            scaduto60+=Number(data[n].TSCADUTO60);
                            scaduto90+=Number(data[n].TSCADUTO90);
                            scaduto120+=Number(data[n].TSCADUTO120);
                            scadutoOltre+=Number(data[n].TSCADUTOOLTRE);
                            scaduto+=Number(data[n].TSCADUTO);
                        }

                        valorizzaHTMLElemento("tScadere",formatter.format(scadere));
                        valorizzaHTMLElemento("tScaduto30",formatter.format(scaduto30));
                        valorizzaHTMLElemento("tScaduto60",formatter.format(scaduto60));
                        valorizzaHTMLElemento("tScaduto90",formatter.format(scaduto90));
                        valorizzaHTMLElemento("tScaduto120",formatter.format(scaduto120));
                        valorizzaHTMLElemento("tScadutoOltre",formatter.format(scadutoOltre));
                        valorizzaHTMLElemento("tScaduto",formatter.format(scaduto));
                        valorizzaHTMLElemento("tScadereG",formatter.format(scadere));
                        valorizzaHTMLElemento("tScadutoG",formatter.format(scaduto));
                    break;
                    case nomePagina+':mese':
                        for (n in data){ 
                            scadere+=Number(data[n].TNR);
                            scaduto30+=Number(data[n].TSALDO);
                        }

                        valorizzaHTMLElemento("nrP",scadere);
                        valorizzaHTMLElemento("tImporto",formatter.format(scaduto30));
                        valorizzaHTMLElemento("nrPG",scadere);
                        valorizzaHTMLElemento("tImportoG",formatter.format(scaduto30));
                    break;
                    case nomePagina:
                        for (n in data){ 
                            scadere+=Number(data[n].NR);
                            scaduto30+=Number(data[n].TIMPORTO);
                            scaduto60+=Number(data[n].TPAGATO);
                            scaduto90+=Number(data[n].TSALDO);
                        }

                        valorizzaHTMLElemento("nrP",scadere+" ");
                        valorizzaHTMLElemento("tImporto",formatter.format(scaduto30));
                        valorizzaHTMLElemento("tPagato",formatter.format(scaduto60));
                        valorizzaHTMLElemento("tSaldo",formatter.format(scaduto90));
                        valorizzaHTMLElemento("nrPG",scadere+" ");
                        valorizzaHTMLElemento("tImportoG",formatter.format(scaduto30));
                        valorizzaHTMLElemento("tSaldoG",formatter.format(scaduto90));
                    break;
                }
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
    
    var id=li.getAttribute("name");
    var tabella="";
    var nomeQuery="";

    var div=li.getElementsByTagName("div");
    var divDes=div[0].getElementsByTagName("div");
    var descrizione=divDes[1].innerHTML.replace("<br>","");

    var d=div[14].innerHTML;

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
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"dettEstrattoConto", "ricarica":ricarica, 
                    "tipoAnagrafica":tipoAnagrafica
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

function listaDaMese(mese){
    xOrdinamentoMese=document.getElementById("lblOrdinamento").innerHTML;
    document.getElementById("lblOrdinamento").innerHTML="";
    document.getElementById("cmdBackTipo").setAttribute("onclick","eliminaFiltroMese(this)");
    document.getElementById("cmdBackTipo").setAttribute("class",document.getElementById("cmdBackTipo").getAttribute("class").replace(/hide/g,''));

    xNomequery=nomePagina;

    var da;
    var a;

    if (parametriScadenziario["campoRaggruppamentoMese"]=="S.SCADENZA"){
        da=document.getElementById("txtDataDa");        
        a=document.getElementById("txtDataA");
        da.value=mese.replace(/\./g,'-')+"-01";
        a.value=convertiDataItaEng(ultimoGiornoMeseIta(mese.substring(0,4), mese.substring(5,7)));
    } else {
        da=document.getElementById("txtDataDocDa");        
        a=document.getElementById("txtDataDocA");
        da.value=mese.replace(/\./g,'-')+"-01";
        a.value=convertiDataItaEng(ultimoGiornoMeseIta(mese.substring(0,4), mese.substring(5,7)));
        dataDocDa=convertiDataEngIta(da.value);
        dataDocA=convertiDataEngIta(a.value);
    }

    avviaCarDettagliDocumenti(true,nomePagina,true);
}

function eliminaFiltroMese(e){
    if (parametriScadenziario["campoRaggruppamentoMese"]=="S.SCADENZA"){
        document.getElementById("txtDataDa").value="";
        document.getElementById("txtDataA").value="";
    } else {
        document.getElementById("txtDataDocDa").value="";
        document.getElementById("txtDataDocA").value="";
        dataDocDa="";
        dataDocA="";
    }

    xNomequery=nomePagina+":mese";

    document.getElementById("lblOrdinamento").innerHTML=xOrdinamentoMese;
    document.getElementById("cmdBackTipo").setAttribute("onclick","eliminaFiltroClienteElenco(this)");

    avviaCarDettagliDocumenti(true,nomePagina+':mese',true,xOrdinamentoMese);
}

function listaDaClienteElenco(a,id,descrizione){
    yIdCliente=idCliente;
    idCliente=id;

    posizioneScrool=document.getElementById("elencoEC").scrollTop;
    elencoEC=document.getElementById("elencoEC").innerHTML;
    lblTotali=document.getElementById("piedeGriglia").innerHTML;

    xNomequery=nomePagina+":mese";
    xOrdinamentoClienti=document.getElementById("lblOrdinamento").innerHTML;
    document.getElementById("lblOrdinamento").innerHTML="";
    document.getElementById("cmdBackTipo").setAttribute("onclick","eliminaFiltroClienteElenco(this)");
    document.getElementById("cmdBackTipo").setAttribute("class",document.getElementById("cmdBackTipo").getAttribute("class").replace(/hide/g,''));
    document.getElementById("lblIntestazione").innerHTML="SCADUTO "+descrizione;

    avviaCarDettagliDocumenti(true,nomePagina+':mese',true);
}

function eliminaFiltroClienteElenco(a){
    idCliente=yIdCliente;

    xNomequery=nomePagina+":clienti";
    document.getElementById("lblOrdinamento").innerHTML=xOrdinamentoClienti;
    document.getElementById("cmdBackTipo").setAttribute("onclick","clickBack()");
    document.getElementById("cmdBackTipo").setAttribute("class",document.getElementById("cmdBackTipo").getAttribute("class")+" hide");

    if (idCliente>0 && ragioneSociale==""){
        listaDaCliente(document.getElementsByTagName("a"),idCliente,yRagSoc,true,xOrdinamentoClienti)
    } else {
        document.getElementById("lblIntestazione").innerHTML="SCADUTO "+tipoAnagrafica.substring(0,tipoAnagrafica.length-1)+"I";
        avviaCarDettagliDocumenti(true,xNomequery,true,xOrdinamentoClienti);
    }
}

function listaDaCliente(a,id,descrizione,forzaOrdinamento=false,xOrd=""){
    if (idCliente>0){
        xFiltri-=1;
    }

    yRagSoc=descrizione;
    idCliente=id;

    avviaCarDettagliDocumenti(true,xNomequery,forzaOrdinamento,xOrd);

    document.getElementById("lblIntestazione").innerHTML="SCADUTO "+descrizione;
    document.getElementById("lblFiltroCliente").innerHTML="Selezione: "+descrizione;
    document.getElementById("tabCliente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoCliente","","","",nomeStorage);
}

function eliminaFiltroCliente(a){
    if (idCliente>0) {
        idCliente=0;

        avviaCarDettagliDocumenti(true,xNomequery);
        
        document.getElementById("lblFiltroCliente").innerHTML="Selezione: ";
        document.getElementById("tabCliente").removeAttribute("style");
        document.getElementById("lblIntestazione").innerHTML="SCADUTO "+tipoAnagrafica.substring(0,tipoAnagrafica.length-1)+"I";

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
    avviaCarDettagliDocumenti(true,xNomequery);

    document.getElementById("lblFiltroAgente").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("tabAgente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    xFiltri+=1

    segnaStato(a, "elencoAgente","","","",nomeStorage);
}

function eliminaFiltroAgente(a){
    if (idAgente>0) {
        idAgente=0;
        avviaCarDettagliDocumenti(true,xNomequery);
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
    var ul=document.getElementById(tipo+"."+id).parentNode;

    switch (ul.getAttribute("id")){
        case "elencoTipo":
            if (idTipo!=""){
                xFiltri-=1;
            }
        
            idTipo="";
        
            var chk=ul.getElementsByTagName("input");
            for (i=0;i<chk.length;i++){
                if (chk[i].checked){
                    idTipo+=chk[i].getAttribute("name")+",";
                }
            }
        
            if (idTipo!=""){
                idTipo=idTipo.substring(0,idTipo.length-1);
            }
        
            avviaCarDettagliDocumenti(true,xNomequery);
        
            if (idTipo!=""){
                document.getElementById("tabTipo").style.border="3px solid rgba("+xColoreSecondario+", 1)";
                document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
        
                xFiltri+=1
            } else {
                document.getElementById("tabTipo").removeAttribute("style");
            }
        
            break;
        case "elencoTipoScad":
            if (idTipoScad!=""){
                xFiltri-=1;
            }
        
            idTipoScad="";
            
            var chk=ul.getElementsByTagName("input");
            for (i=0;i<chk.length;i++){
                if (chk[i].checked){
                    idTipoScad+=chk[i].getAttribute("name")+",";
                }
            }
        
            if (idTipoScad!=""){
                idTipoScad=idTipoScad.substring(0,idTipoScad.length-1);
            }
            
            avviaCarDettagliDocumenti(true,xNomequery);
        
            if (idTipoScad!=""){
                document.getElementById("tabTipoScad").style.border="3px solid rgba("+xColoreSecondario+", 1)";
                document.getElementById("cmdFiltri").style.border="3px solid rgba("+xColoreSecondario+", 1)";
        
                xFiltri+=1
            } else {
                document.getElementById("tabTipoScad").removeAttribute("style");
            }

            break;
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
        if (numeroDa!="" || numeroA!="" || serieDa!="" || serieA!="" || dataDocDa!="" || dataDocA!="" || dataIncDa!="" || dataIncA!="" || idPagamento>0){
            xFiltri-=1
        } 

        numeroDa=document.getElementById("txtRicercaNumeroDa").value;
        numeroA=document.getElementById("txtRicercaNumeroA").value;
        serieDa=document.getElementById("txtRicercaSerieDa").value;
        serieA=document.getElementById("txtRicercaSerieA").value;
        
        dataDocDa="";
        dataDocA="";
        dataIncDa="";
        dataIncA="";

        var da=document.getElementById("txtDataDocDa");
        var a=document.getElementById("txtDataDocA");

        if (isDate(da.value,da)){
            dataDocDa=convertiDataEngIta(da.value);
        }
        
        if (isDate(a.value,a)){
            dataDocA=convertiDataEngIta(a.value);
        }
        
        da=document.getElementById("txtDataIncDa");
        a=document.getElementById("txtDataIncA");

        if (isDate(da.value,da)){
            dataIncDa=convertiDataEngIta(da.value);
        }
        
        if (isDate(a.value,a)){
            dataIncA=convertiDataEngIta(a.value);
        }

        s=document.getElementById("cmbPagamento");
        idPagamento=s.value;

        posizione=recuperaValueElemento("cmbPosizione");

        filtroNumero=0;

        if (numeroDa!="" || numeroA!="" || serieDa!="" || serieA!="" || dataDocDa!="" || dataDocA!="" || dataIncDa!="" || dataIncA!="" || idPagamento>0){
            filtroNumero=1
        } 
        
        avviaCarDettagliDocumenti(true,xNomequery);

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
        if (ragioneSociale==""){
            open ("mainPage.html",xTarget);
        } else {
            var xTipo=tipoAnagrafica;
            if (idAppo>0){
                xTipo="ANAGRAFICA";
                sessionStorage.removeItem("aIdCliente");
            }
            open ("schedaCliente.html?tipoAnagrafica="+xTipo,xTarget);
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
        AvviaCarDatiElencoClienti("elencoCliente",tipoAnagrafica,false);
    }
}

function dettaglioOrdiniScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".dettaglioOrdini.scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        var md=document.getElementById("myStorico");
        var idTes=md.getAttribute("idTes");
        var li=document.getElementsByName(idTes);
        apriDettagliDocumenti(li[0],false);
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
    avviaCarDettagliDocumenti(true,xNomequery)
}

function changeSelectPaginaCorrente(el){
    listaDaNumero();
}

function avviaCarDatiPagamenti(selectID){
    var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tesPagamenti", "select":selectID};
    inviaRichiestaCentralino("query",parametri,elaborarispostaPagamenti);
}

function elaborarispostaPagamenti(res){
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