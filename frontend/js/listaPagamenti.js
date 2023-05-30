const tagListaPagamentiHtml = 'listaPagamenti.html';
query[tagListaPagamentiHtml]=new Array;
query[tagListaPagamentiHtml]['OFFSET']=0;
query[tagListaPagamentiHtml]['FETCH']=100;
query[tagListaPagamentiHtml]['MAXFETCH']=0;
query[tagListaPagamentiHtml]['COUNT']="id";
query[tagListaPagamentiHtml]['textBoxRicerca']="txtRicercaCliente";
query[tagListaPagamentiHtml]['numeroModello']=1;
query[tagListaPagamentiHtml]['modello1Riga']=elementiListaPagamenti;

var parametriNC={};
var ricerca="";

window.addEventListener("load", function(event) {
    recuperaParametri();
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "id":"", "userName":""}; 
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
            parametriNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }
    
    carDatiListaClienti();
}

function elencoClientiScroll(ec, pagina, txtRicerca="") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".elenco"+tipoAnagrafica+".scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        AvviaCarDatiElencoClienti("elencoClienti","",false);
    }
}

var timer1;

function txtRicercaChange(input,ulID,sottoQuery,righe) {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        xRag="";
        
        ricerca=input.value;

        AvviaCarDatiElencoClienti("elencoClienti")

        clearTimeout(timer1); 
        
        inputID=input.getAttribute("id");

        salvaFiltro(inputID,tipoAnagrafica);
    }, 1000);
}

function AvviaCarDatiElencoClienti(tipoRisposta,sottoQuery="",ricarica=true,righe=2,scrollTop=0){
    var nomeQuery=new String (nomePagina);
    
    if (sottoQuery!=''){
        nomeQuery+=":"+sottoQuery;
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

    let tipoElenco = 2;
    if (query[nomeQuery]['numeroModello']) {
        tipoElenco = parseInt(query[nomeQuery]['numeroModello']);
    }

    var parametri={"tipoQuery":"listaPagamenti","tipoRisposta":tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca, "tipoElenco":tipoElenco, 
        "ricarica":ricarica, "scrollTop":scrollTop,"offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":tipoRisposta
        }; 

    var nomeSession=nomeSessionJson(parametri);

    var md5=sessionStorage.getItem(nomeSession+".md5");
    if (md5!=undefined){
        parametri.md5=md5;
    }

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri);
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    var nomeSession=nomeSessionJson(parametri);
    var nomeOS=nomeSessionOffSet(parametri);

    if (parametri.md5==risp.md5){
        data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));
    } else {
        sessionStorage.setItem(nomeSession+".md5",risp.md5);
        sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
    }

    if (parametri.tipoRisposta=="elencoClienti"){
        sessionStorage.setItem(nomeOS+".offSet",parametri.offSet);
        query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];
    }

    popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop);

    elencoInCaricamento=0;
}

function nomeSessionJson(parametri){
    return nomePagina+"."+parametri.tipoRisposta+"."+parametri.ricerca+"."+parametri.offSet;
}

function nomeSessionOffSet(parametri){
    return nomePagina+"."+parametri.tipoRisposta+"."+parametri.ricerca;
}

function carDatiListaClienti(){    
    ricerca="";
    
    var filter=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".filter");
    var scroolTop=window.sessionStorage.getItem(nomePagina+".elenco"+tipoAnagrafica+".scroolTop");

    if (filter) {
        ricerca=filter;
        var txtRicerca=document.getElementById("txtRicercaCliente");
        txtRicerca.setAttribute("value",filter);
    }

    var tipoRisposta="elencoClienti";
    var parametri={"tipoQuery":"listaPagamenti","tipoRisposta":tipoRisposta,"ricerca":ricerca,"nomeQuery":nomePagina,"tipoElenco":"elencoClienti",
        "scrollTop":scroolTop,"chiamante":tipoRisposta, "tipoElenco":2
        }; 

    var nomeOS=nomeSessionOffSet(parametri);
    os=sessionStorage.getItem(nomeOS+".offSet");

    if (os>0){
        while (query[nomePagina]['OFFSET']<=os){
            parametri.offSet=query[nomePagina]['OFFSET'];
            var nomeSession=nomeSessionJson(parametri);
            parametri.ricarica=(query[nomePagina]['OFFSET']==0);

            data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));

            query[nomePagina]['OFFSET']+=query[nomePagina]['FETCH'];

            popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop); 
        }

        if (scroolTop>0) {
            var ulCliente=document.getElementById("elencoClienti");
            ulCliente.scrollTop=scroolTop;
        }
    } else {
        AvviaCarDatiElencoClienti("elencoClienti","",(scroolTop>0),2,scroolTop);
    }
}

function apriSchedaPagamento(id) {
    console.log(id);
    if (id != '') {
        var parametri = {
            "tipoQuery": "listaPagamenti",
            "tipoRisposta": "schedaPagamento",
            "nomeQuery": nomePagina+":schedaPagamento",
            "id": id,
            "userName": '',
            "chiamante": "schedaPagamento",
            "offSet": 0,
            "fetch": 0,
            "ricerca": ''
        }; 

        elencoInCaricamento=1;

        inviaRichiestaCentralino("multiQuery", parametri, elaboraApriScheda);
    } else {
        sessionStorage.removeItem("skPagamento");
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="nuovoPagamenti.html";
        }else{
            window.open("nuovoPagamenti.html","_self");    
        }
        
    }
}

function elaboraApriScheda(res) {
    console.log('elaboraApriScheda => ', res);
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data[0]==0){
        return;
    }

    sessionStorage.setItem("skPagamento",JSON.stringify(data));

    window.open("nuovoPagamenti.html","_self");
}

function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        open ("mainPage.html",xTarget);
    }
}