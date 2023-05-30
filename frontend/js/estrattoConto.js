query['estrattoConto.html']=new Array;
query['estrattoConto.html']['OFFSET']=0;
query['estrattoConto.html']['FETCH']=100;
query['estrattoConto.html']['MAXFETCH']=0;
query['estrattoConto.html']['campoProgressivo']="TOT_PAGAREF";
query['estrattoConto.html']['modelloRiga']=elementiEstrattoConto;

query['estrattoConto.html']['oggetti']=new Array;
query['estrattoConto.html']['oggetti']['{DATAF}']="DATAF";
query['estrattoConto.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['estrattoConto.html']['oggetti']['{DESTIPO}']="DESTIPO";
query['estrattoConto.html']['oggetti']['{NUMERO}']="NUMERO";
query['estrattoConto.html']['oggetti']['{TOT_PAGARED}']="TOT_PAGARED";
query['estrattoConto.html']['oggetti']['{TOT_PAGAREA}']="TOT_PAGAREA";
query['estrattoConto.html']['oggetti']['{TOT_PAGAREF}']="TOT_PAGAREF";
query['estrattoConto.html']['oggetti']['{IMPORTO}']="IMPORTO";
query['estrattoConto.html']['oggetti']['{DOCINC}']="DOCINC";
query['estrattoConto.html']['oggetti']['{ID}']="ID";
query['estrattoConto.html']['oggetti']['{TITLE}']="TITLE";
query['estrattoConto.html']['oggetti']['{NOTE}']="NOTE";
query['estrattoConto.html']['oggetti']['{IMMAGINE}']="IMMAGINE";
query['estrattoConto.html']['oggetti']['{TABELLA}']="TABELLA";

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

query['estrattoConto.html:incassi']=new Array;
query['estrattoConto.html:incassi']['OFFSET']=0;
query['estrattoConto.html:incassi']['FETCH']=100;
query['estrattoConto.html:incassi']['MAXFETCH']=0;
query['estrattoConto.html:incassi']['campoProgressivo']="TOT_PAGAREF";
query['estrattoConto.html:incassi']['modelloRiga']=elementiDettagliIncassi;
query['estrattoConto.html:incassi']['modelloContenitore']=modalECIncassi;

query['estrattoConto.html:incassi']['oggetti']=new Array;
query['estrattoConto.html:incassi']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['estrattoConto.html:incassi']['oggetti']['{DATA}']="DATA";
query['estrattoConto.html:incassi']['oggetti']['{NUMERO}']="NUMERO";
query['estrattoConto.html:incassi']['oggetti']['{IMPORTO}']="IMPORTO";

var parametriEC={"visualizzaNote":0,"visAScadere":1};

tipoAnagrafica=recuperaParametroHRef("CLIENTE");

var idAppo=0;

var appo=window.sessionStorage.getItem("aIdCliente");
if (appo!=undefined){
    idAppo=appo;
    var idCliente=window.sessionStorage.getItem("idFornitore");
    var ragioneSociale=window.sessionStorage.getItem("ragioneSocialeF");
} else {
    if (tipoAnagrafica=="CLIENTE"){
        var idCliente=window.sessionStorage.getItem("idCliente");
        var ragioneSociale=window.sessionStorage.getItem("ragioneSociale");
    } else {
        var idCliente=window.sessionStorage.getItem("idFornitore");
        var ragioneSociale=window.sessionStorage.getItem("ragioneSocialeF");
    }    
}

var lblInt=document.getElementById("lblIntestazione");
lblInt.innerHTML="E/C "+ragioneSociale;

var d=document.getElementById("txtDataDa");

var today = new Date();
var annoCor=today.getFullYear();

if (today > new Date(annoCor,2,31)){
    d.setAttribute("value",annoCor+"-01-01");
} else {
    d.setAttribute("value",(annoCor-1)+"-01-01");
}

d=document.getElementById("txtDataA");
d.setAttribute("value",oggiISO());

window.addEventListener("load", function(event) {
    setTimeout( function() {
        recuperaParametri()
    }, 50);
});

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
            parametriEC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriEC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    elencoInCaricamento=0;

    avviaCarDati();
}

function elencoECScroll(ec, pagina) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina+"."+tipoAnagrafica+"."+ec.getAttribute("name"),scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        avviaCarDati(false);
    }
}

function txtDataChange(d){
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        avviaCarDati();
    }, 1000);
}

function avviaCarDati(ricarica=true,tipoStampa='elenco'){ 
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

    var DataDa=da.value.replace(/-/g,"");
    var DataA=a.value.replace(/-/g,"");

    if (!isDate(DataDa,da)){
        return;
    } 

    if (!isDate(DataA,a)){
        return;
    }

    var aperti=document.getElementById("chkAperti").checked;

    if (aperti){
        aperti=1;
        DataDa="20000101";
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
        query[nomePagina]['OFFSET']=0;
    }

    if (parametriEC.visAScadere==0){
        DataA=oggiISO();
    }

    var parametri={"tipoRisposta":"elenco","ricarica":ricarica,"tipoQuery":"estrattoConto",
                    "idCliente": idCliente,"aperti": aperti,"dataDa":DataDa,"dataA":DataA, "tipoAnagrafica":tipoAnagrafica,
                    "offSet":query[nomePagina]['OFFSET'],"fetch":query[nomePagina]['FETCH'],"chiamante":"estrattoConto", "noDDT":noDDT,"maxFetchRpt":query[nomePagina]['MAXFETCH']
                };

    elencoInCaricamento=1;
    if(tipoStampa=='elenco'){
        inviaRichiestaCentralino("query",parametri);
    }else if(tipoStampa=='report'){
        obj={
            'filtri':parametri
        }
        stampaReport(obj);
    }
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    switch (parametri["tipoRisposta"]){
        case "elenco":
            var ul=document.getElementById("elencoEC");
            var li="";   
            var ricarica=parametri["ricarica"];
            var aperti=parametri["aperti"];
            var DataDa=parametri["dataDa"];
            var DataA=parametri["dataA"];

            if (ricarica){
                xProgressivo=0;
            }

            query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];

            popolaElencoDaJson(data,"elencoEC",0,nomePagina,ricarica,0,xProgressivo);

            if(ricarica){
                var parametri={"tipoRisposta":"saldo","ricarica":ricarica,"tipoQuery":"estrattoConto", "noDDT": parametri.noDDT,
                    "idCliente": idCliente,"aperti": aperti,"dataDa":DataDa,"dataA":DataA, "tipoAnagrafica":tipoAnagrafica,
                    "offSet":0,"fetch":0,"saldi":"SALDI"
                };

                inviaRichiestaCentralino("query",parametri);

                var skCliente=sessionStorage.getItem("schedaCliente.html.CLIENTE."+idCliente+".jSon");
                if (skCliente!=undefined && xIdCliente==0 && parametriEC.visualizzaNote!=0){
                    skCliente=JSON.parse(skCliente);

                    if (skCliente[0].NOTE!=''){
                        var e=document.getElementById("elencoEC");
                        e.innerHTML="<li class=\"w100-15p clrSfondoArancione elementiGriglia marg5Bottom tableStyle AStyle testoNormale\">"+skCliente[0].NOTE+"</li>"+e.innerHTML;
                    }
                }
            } else {
                elencoInCaricamento=0;
            }

            break;
        case "saldo":
            var tot=0;
            var dare=0;
            var avere=0;

            if(data[0]!=0){
                for (n in data){ 
                    tot+=Number(data[n].TOT_PAGAREF);
                    dare+=Number(data[n].TOT_PAGARED);
                    avere+=Number(data[n].TOT_PAGAREA);
                }
            }
            
            document.getElementById("dare").innerHTML=formatter.format(dare);
            document.getElementById("avere").innerHTML=formatter.format(avere);
            document.getElementById("saldoG").innerHTML=formatter.format(tot);
            document.getElementById("saldoP").innerHTML=formatter.format(tot);

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
    var descrizione=divDes[3].innerHTML;

    descrizione=descrizione.replace("'","").replace("%","").replace("&","");
    
    if (tag=="I"){
        if (tipoAnagrafica=="CLIENTE"){
            tabella="TES_VENDITE";
        } else {
            tabella="TES_ACQUISTI";
        }
        nomeQuery=nomePagina+":incassi";
    } else {
        tabella="MOVIMENTI";
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

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"querySpecifica","idDocumento": id,"tabella":tabella, "nomeTabella":nomeQuery, "desDoc":descrizione.replace(/&/g,"e"),
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"dettEstrattoConto", "tipoAnagrafica":tipoAnagrafica,
                    "ricarica":ricarica
                };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraDettagli);
}

function elaboraDettagli(res){
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

function tornaIndietro(){
    var xTipo=tipoAnagrafica;
    if (idAppo>0){
        xTipo="ANAGRAFICA";
        sessionStorage.removeItem("aIdCliente");
    }
    open("schedaCliente.html?tipoAnagrafica="+xTipo,"_self");
}
function stampaReportEC(){
    avviaCarDati(true,'report');
}