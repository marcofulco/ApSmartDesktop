query['incassa.html']=new Array;
query['incassa.html']['oggetti']=new Array;
query['incassa.html']['oggetti']['cmbConto']="IDConto";
query['incassa.html']['oggetti']['txtData']="Data";
query['incassa.html']['oggetti']['txtDataConsegna']="SCADENZARIBA";
query['incassa.html']['oggetti']['txtImporto']="Importo";
query['incassa.html']['oggetti']['txtAbbuono']="Abbuono";
query['incassa.html']['oggetti']['cmbContoSpese']="CENTRO_SPESE";
query['incassa.html']['oggetti']['txtImportoSpese']="SPESE";
query['incassa.html']['oggetti']['txtNote']="Note";
query['incassa.html']['oggetti']['txtNoteInterne']="NoteInt";

query['estrattoConto.html']=new Array;
query['estrattoConto.html']['OFFSET']=0;
query['estrattoConto.html']['FETCH']=100;
query['estrattoConto.html']['MAXFETCH']=0;
query['estrattoConto.html']['modelloRiga']=elementiIncassi;

query['estrattoConto.html']['oggetti']=new Array;
query['estrattoConto.html']['oggetti']['{DATAF}']="DATAF";
query['estrattoConto.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['estrattoConto.html']['oggetti']['{DESTIPO}']="DESTIPO";
query['estrattoConto.html']['oggetti']['{NUMERO}']="NUMERO";
query['estrattoConto.html']['oggetti']['{RESIDUO}']={"campo":"RESTO","deciamaliMax":2,"decimaliMin":2};
query['estrattoConto.html']['oggetti']['{ASSEGNATO}']="ASSEGNATO";
query['estrattoConto.html']['oggetti']['{IMPORTO}']="IMPORTO";
query['estrattoConto.html']['oggetti']['{DOCINC}']="DOCINC";
query['estrattoConto.html']['oggetti']['{ID}']="IDTes";
query['estrattoConto.html']['oggetti']['{TITLE}']="TITLE";
query['estrattoConto.html']['oggetti']['{NOTE}']="NOTE";
query['estrattoConto.html']['oggetti']['{IMMAGINE}']="IMMAGINE";
query['estrattoConto.html']['oggetti']['{TABELLA}']="TABELLA";

query['scadenziario.html']=new Array;
query['scadenziario.html']['OFFSET']=0;
query['scadenziario.html']['FETCH']=100;
query['scadenziario.html']['MAXFETCH']=0;
query['scadenziario.html']['modelloRiga']=elementiScadenziario;

query['scadenziario.html']['oggetti']=new Array;
query['scadenziario.html']['oggetti']['{DATAF}']="DATAF";
query['scadenziario.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['scadenziario.html']['oggetti']['{DESTIPO}']="GENEREF";
query['scadenziario.html']['oggetti']['{NUMERO}']="NUMEROF";
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
query['scadenziario.html']['oggetti']['{ASSEGNATO}']="ASSEGNATO";

var parametriNC={"nascosti":"", "conti":"", "visSpese":0, "maxAbbuono":0, "modificheGuajana":0, "noDDT":1};
var tipoElencoDoc="partite";
var elencoConti={};
tipoAnagrafica=recuperaParametroHRef("CLIENTE");

if (tipoAnagrafica=="CLIENTE"){
    var idCliente=sessionStorage.getItem('idCliente');
    var ragioneSociale=sessionStorage.getItem("ragioneSociale");
} else {
    var idCliente=sessionStorage.getItem('idFornitore');
    var ragioneSociale=sessionStorage.getItem("ragioneSocialeF");
}

var idModifica=0;

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var div=document.getElementById("divTitolo");        

        if (tipoAnagrafica=="CLIENTE"){
            div.innerHTML="INCASSO ";
        } else {
            div.innerHTML="PAGAMENTO ";
        }

        div.innerHTML+=ragioneSociale;

        valorizzaHTMLElemento("divSaldo", "Saldo € "+sessionStorage.getItem("saldo"));
        valorizzaHTMLElemento("divScaduto","Scaduto € "+sessionStorage.getItem("scaduto"));

        recuperaParametri();
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
            parametriNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    if (parametriNC.nascosti!=''){
        m=parametriNC.nascosti.split(";");
        for (x in m){
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) {
                
            }
        }
    }

    if (parametriNC.visSpese==0){
        document.getElementById("divSpese").classList.add("hide");
    }

    if (idModifica>0){
        document.getElementById("cmdElimina").classList.remove("hide");
    } else {
        document.getElementById("cmdElimina").classList.add("hide");
    }

    var lab=document.getElementById("pulsantiera").getElementsByTagName("a");
    var n=0;
    for (x in lab){
        if (x<=lab.length){
            c=lab[x].getAttribute("class");
            if (c.indexOf("hide")==-1){
                n+=1;
            }
        }
    }

    if (n>0){
        var varW=arrotonda(100/n,0);
        // console.log(n);
        for (x in lab){
            try {
                if (!lab[x].classList.contains("hide")){
                    lab[x].classList.add("w"+varW);
                }
            } catch (error) {
                
            }
        }
    }

    avviaCarDati("cmbConto");
    avviaCarDati("cmbContoSpese");
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbConto":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"contiIncPag", "select":selectID, "soloConti":parametriNC.conti};
        break;
        case "cmbContoSpese":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"contiIncPagSpese", "select":selectID};
        break;
    }   

    parametri.md5=localStorage.getItem(selectID+".md5");

    inviaRichiestaCentralino("query",parametri);
}

var risposte=0;

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    risposte+=1;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            if (risposte==2 && idModifica>0){
                carDatiAnag();
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);
    
    if(parametri.select=='cmbConto'){
            elencoConti={};
        for(var x in data){
            elencoConti[data[x].id]=data[x];
        }
    }
    if (parametri.select!="txtLocalita" && parametri.select!="cmbPosizione"){
        popolaSelectDaJSON(data,parametri.select);
    }

    if (parametri.select=="cmbNazione"){
        valorizzaValueElemento("cmbNazione","IT");    
    } else if (parametri.select=="cmbAgente"){
        if (xIdAgente>0){
            valorizzaValueElemento("cmbAgente",xIdAgente);
        }
    } 
   
    if (risposte==2){
        if (idModifica>0){
            carDatiIncasso();
        } else {
            valorizzaValueElemento("txtData",oggiISO());
            avviaCarDatiDoc();
        }
    }
}

function avviaCarDatiDoc(ricarica=true){ 
    tipoElencoDoc="partite";
    openPage("",document.getElementById("tabPartite"));

    valorizzaHTMLElemento("lblDivData","Data");

    if (ricarica==true){
        valorizzaCheckedElemento("chkTotalizza",false);
        document.getElementById("txtImporto").disabled=false;
        valorizzaValueElemento("txtDistribuito",0);
        distribuito=0;    
    }
    
    var maxFetch=0;

    if (query["estrattoConto.html"]['MAXFETCH']){
        maxFetch=query["estrattoConto.html"]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
    }

    if (query["estrattoConto.html"]['OFFSET']>maxFetch && maxFetch!=0) {
        return '';
    }

    var DataDa="20000101";
    var DataA="20401231";

    var aperti=1;

    if (ricarica){
        query["estrattoConto.html"]['OFFSET']=0;
    }

    var parametri={"tipoRisposta":"elenco","ricarica":ricarica,"tipoQuery":"estrattoConto",
                    "idCliente": idCliente,"aperti": aperti,"dataDa":DataDa,"dataA":DataA, "tipoAnagrafica":tipoAnagrafica,
                    "offSet":query["estrattoConto.html"]['OFFSET'],"fetch":query["estrattoConto.html"]['FETCH'],"chiamante":"estrattoConto", "noDDT": parametriNC.noDDT, "incasso":1
                };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraRispostaDoc);
}

function elaboraRispostaDoc(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    var ricarica=parametri["ricarica"];

    query["estrattoConto.html"]['OFFSET']+=query["estrattoConto.html"]['FETCH'];

    popolaElencoDaJson(data,"elencoPartite",0,"estrattoConto.html",ricarica,0);

    elencoInCaricamento=0;
}

function avviaCarDatiScad(ricarica=true){ 
    var nomeQuery="scadenziario.html";

    tipoElencoDoc="scadenze";
    openPage("",document.getElementById("tabScadenze"));

    valorizzaHTMLElemento("lblDivData","Scadenza");
    
    if (ricarica==true){
        valorizzaCheckedElemento("chkTotalizza",false);
        document.getElementById("txtImporto").disabled=false;
        valorizzaValueElemento("txtDistribuito",0);
        distribuito=0;    
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

    var dataDa="20000101";
    var dataA="20401231";

    var aperti=1;
    var noDDT=1;

    if (ricarica){
        query[nomeQuery]['OFFSET']=0;
    }

    var consideraDaAcquisti=0;

    var parametri={"tipoRisposta":"dettagli","tipoQuery":"scadenziario","nomeQuery":nomeQuery, "scadenzaDa":dataDa, "scadenzaA":dataA, "ricarica":ricarica,
                    "offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],"chiamante":"scadenziario","idCliente":idCliente,"soloAperti":aperti,"noDDT":noDDT, 
                    "nomeQuery":nomeQuery, "consideraDaAcquisti":consideraDaAcquisti,"campoRaggruppamentoMese":"S.SCADENZA","forzaOrdinamento":true, "xOrd":"",
                    "serieDa":"","idTipoScad":"","serieA":"","numeroDa":"","numeroA":"","idAgente":0, "inGenere":"","ordinamento":"",
                    "dataIncassoDa":"","dataIncassoA":"","dataDa":"", "dataA":"", "idPagamento":0,"posizione":"", "xOrd":"","incasso":1, "tipoAnagrafica":tipoAnagrafica
                };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraRispostaScad);
}

function elaboraRispostaScad(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    var ricarica=parametri["ricarica"];

    query[parametri.nomeQuery]['OFFSET']+=query[parametri.nomeQuery]['FETCH'];

    popolaElencoDaJson(data,"elencoPartite",0,parametri.nomeQuery,ricarica,0);

    elencoInCaricamento=0;
}

function carDatiIncasso(){
    jSonCli=window.sessionStorage.getItem("schedaCliente.html.CLIENTE."+idModifica+".jSon");

    if (jSonCli!=undefined){
        jSonCli=JSON.parse(jSonCli);
        popolaFormModificaDati(jSonCli[0] ,"nuovoCliente.html");

        if (xIdCliente>0 || xIdAgente>0){
            document.getElementById("txtRagioneSociale").disabled=true;
            document.getElementById("txtPiva").disabled=true;
            document.getElementById("txtCF").disabled=true;
            // document.getElementById("txtPEC").disabled=true;
            // document.getElementById("txtSDI").disabled=true;
            document.getElementById("cmbPagamento").disabled=true;
            document.getElementById("cmbFamigliaCliFor").disabled=true;

            if (xIdCliente>0){
                document.getElementById("txtNote").style.display=none;
            }
        }
    } else {
        idModifica=0;
    }   
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="index.html";
    }
    else{
        window.open('schedaCliente.html?tipoAnagrafica='+tipoAnagrafica,'_self');
    }
    
}

function Salva(verificaMaggiore=true,verificaVecchi=true,verificaData=true){
    var idConto=recuperaValueElemento("cmbConto");
    var data=recuperaValueElemento("txtData");
    var importoSpese=recuperaValueElemento("txtImportoSpese");
    var idContoSpese=recuperaValueElemento("cmbContoSpese");
    importo=Number(recuperaValueElemento("txtImporto"));
    abbuono=Number(recuperaValueElemento("txtAbbuono"));

    if (parametriNC.maxAbbuono!=0){
        if (abbuono>Number(parametriNC.maxAbbuono)){
            attivaAlert(xTipoAllert.CRITICO,"Importo Abbuono Eccessivo (Max € "+formattaNumeri(parametriNC.maxAbbuono,2,2)+").<br>Impossibile Proseguire.");
            return;    
        }
    }

    if (verificaDistribuito()==false){
        attivaAlert(xTipoAllert.CRITICO,"Valore Distribuito Superiore a Valore da Distribuire!<br>Impossibile Proseguire.");
        return;
    }

    if (verificaMaggiore==true){
        if (verificaDistribuito(true)==false){
            attivaAlert(xTipoAllert.DOMANDASINO,"Non è stato distribuito l'intero importo!<br>Vuoi Proseguire comunque?","elaboraRispostaSiNoVM_");
            return;
        }
    }

    if (idConto==0 || idConto==''){
        attivaAlert(xTipoAllert.CRITICO,"Non è stato indicato un Conto Finanziario per l'incasso!<br>Impossibile Proseguire.");
        return;
    }

    if(isEmpty(immaginiCaricate) && getSelectedSelectText("cmbConto").toLowerCase().indexOf("assegn")>=0 && parametriNC.modificheGuajana==1){
        attivaAlert(xTipoAllert.CRITICO,"Non è stato acquisita l'immagine dell'assegno!<br>Impossibile Proseguire.");
        return;
    }

    var txtData=document.getElementById("txtData");

    if (isDate(data,txtData)==false){
        attivaAlert(xTipoAllert.CRITICO,"Data Non Valida!<br>Impossibile Proseguire.");
        return;
    }

    if (importoSpese!=0){
        if (idContoSpese==0 || idContoSpese==''){
            attivaAlert(xTipoAllert.CRITICO,"Non è stato indicato una Contropartita Valida per le spese Bancarie/Postali!<br>Impossibile Proseguire.");
            return;
        }
    }

    if (idContoSpese!=0 && idContoSpese!='' && importoSpese==0){
        attivaAlert(xTipoAllert.CRITICO,"Non è stato indicato un importo per le spese Bancarie/Postali ma è stato indicata una contropartita!<br>Impossibile Proseguire.");
        return;
    }
    if(elencoConti[idConto]!=undefined && elencoConti[idConto].CASSA==1 && elencoConti[idConto].MINUTAVERSAMENTO==0){
        var oggi=oggiISO().split("-");
        var dataIn=data.split("-");
        var d1=new Date(oggi[2],oggi[1]-1,oggi[0]);
        var d2=new Date(dataIn[2],dataIn[1]-1,dataIn[0]);
        var r1=d1.getTime();
        var r2=d2.getTime();
        if(verificaData==true && r2>r1){
            attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione! Hai selezionato una data successiva a quella ordierna per incasso CONTANTI. Vuoi proseguire?',"elaboraRispostaSiNoDataContanti_");
            return;
        }
    }
    var jSon={"testata":{}};

    for (x in query['incassa.html']['oggetti']){
        jSon.testata[query['incassa.html']['oggetti'][x]]=recuperaValueElemento(x);
    }

    jSon.testata.id=idModifica;
    jSon.testata.Residuo=arrotonda(daDistribuire,2)-arrotonda(distribuito,2);
    jSon.testata.Cliente=idCliente;

    jSon.documenti=[];

    var ul=document.getElementById("elencoPartite");
    var liS=ul.getElementsByTagName("li");

    var i=0;
    var trovato=false;
    var dareAvviso=false;

    for (x=0;x<liS.length;x++){
        if (tipoElencoDoc=="partite"){
            var id=liS[x].id.split(".")[1];
            var assegnato=Number(recuperaHTMLElemento("assegnato."+id).replace(".","").replace(",","."));
            
            if (assegnato!=0){
                trovato=true;
                jSon.documenti[i]={"idDoc":id, "idScad":0, "importo":assegnato};
                i++;
            } else if (trovato==false){
                dareAvviso=true;
            }
        } else {
            var id=liS[x].id.split(".")[1];
            var idDoc=recuperaHTMLElemento("idDoc."+id);
            var assegnato=Number(recuperaHTMLElemento("assegnato."+id).replace(".","").replace(",","."));
            
            if (assegnato!=0){
                trovato=true;
                jSon.documenti[i]={"idDoc":idDoc, "idScad":id, "importo":assegnato};
                i++;
            }  else if (trovato==false){
                dareAvviso=true;
            }
        }
    }

    if (verificaVecchi==true){
        if (dareAvviso==true){
            attivaAlert(xTipoAllert.DOMANDASINO,"Non sono state selezionate partite meno recenti!<br>Vuoi Proseguire comunque?","elaboraRispostaSiNoVecchi_");
            return;
        }
    }

    if (importo==0 && abbuono==0 && trovato==false){
        attivaAlert(xTipoAllert.CRITICO,"Non è stato indicato un importo e/o abbuono e non è stato selezionato nessun documento!<br>Impossibile Proseguire.");
        return;
    }

    tipo="salva";
    if (idModifica>0){
        tipo="update";
    }

    if (tipoAnagrafica=="CLIENTE"){
        var tabella="incassi";
    } else {
        var tabella="pagamenti";
    }

    var parametri={"tipoRisposta":tipo,"tipoSalva":"incassiPagamenti", "dati":jSon, "tabella":tabella};
    if(!isEmpty(immaginiCaricate)){
        var nomiImmagini=new Array;
        for(var[k,n] of Object.entries(immaginiCaricate)){
            nomiImmagini.push(n.name);
        }
        jSon.immagini=nomiImmagini;
        caricaImmagini(()=>{
            inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalva);    
        },true);
    }else{
            inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalva);
    }
    
}

function elaboraRispostaSiNoVecchi(risp){
    if(risp=='Si'){
        Salva(false,false);
    }
}

function elaboraRispostaSiNoVM(risp){
    if(risp=='Si'){
        Salva(false);
    }
}

function elaboraRispostaSalva(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0 || data==false){
        attivaAlert(0,"Errore durante il salvataggio!","fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}
 
function valorizzaAltriCampiLocalita(){
    s=document.getElementById("txtLocalita");

    var jLoc=JSON.parse(localStorage.getItem("txtLocalita.jSon"));

    if (jLoc!=undefined){
        for (x in jLoc){
            if (jLoc[x].id==s.value){
                valorizzaValueElemento("txtCAP",jLoc[x].cap);
                valorizzaValueElemento("txtProv",jLoc[x].pr);
                valorizzaValueElemento("cmbRegione",jLoc[x].regione);
                valorizzaValueElemento("txtIstat",jLoc[x].istat);
                return;
            }
        }
    }
}

function elencoPartiteScroll(ec, pagina) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    window.sessionStorage.setItem(nomePagina+"."+tipoAnagrafica+"."+ec.getAttribute("name"),scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        if (tipoElencoDoc=="partite"){
            avviaCarDatiDoc(false);
        } else {
            avviaCarDatiScad(false);
        }
        
    }
}

var daDistribuire=0;
var distribuito=0;
var importo=0;
var abbuono=0;

function assegnaDaDistribuire(){
    importo=Number(recuperaValueElemento("txtImporto"));
    abbuono=Number(recuperaValueElemento("txtAbbuono"));

    daDistribuire=importo+abbuono;

    valorizzaValueElemento("txtDaDistribuire",formattaNumeriInput(daDistribuire,2,2));

    verificaDistribuito();
}

function assegnaAbbuono(){
    var chkTotalizza=recuperaCheckedElemento("chkTotalizza");

    if (chkTotalizza){
        importo=Number(recuperaValueElemento("txtImporto"));
        importo+=abbuono;
        abbuono=Number(recuperaValueElemento("txtAbbuono"));
        importo-=abbuono;
        valorizzaValueElemento("txtImporto",formattaNumeriInput(importo,2,2));
    }

    assegnaDaDistribuire();
}

function chkTotalizzaClick(e){
    document.getElementById("txtImporto").disabled=e.checked;
}

function verificaDistribuito(maggiore=false){
    if (arrotonda(daDistribuire,2)<arrotonda(distribuito,2)){
        document.getElementById("txtDistribuito").classList.add("clrContornoRosso");
        return false;
    } else if (maggiore==false) {
        document.getElementById("txtDistribuito").classList.remove("clrContornoRosso");
        return true;
    } else if (arrotonda(daDistribuire,2)>arrotonda(distribuito,2)){
        return false;
    } else {
        return true;
    }
}

function assegnaResiduo(id,importo=""){
    if (importo==""){
        var residuo=Number(recuperaHTMLElemento("residuo."+id).replace(".","").replace(",","."));
    } else {
        var residuo=importo;
    }

    var assegnato=Number(recuperaHTMLElemento("assegnato."+id).replace(".","").replace(",","."));
    var chkTotalizza=recuperaCheckedElemento("chkTotalizza");

    if (chkTotalizza){
        var valImporto=Number(recuperaValueElemento("txtImporto"));

        if (assegnato!=0){
            valorizzaHTMLElemento("assegnato."+id,"0,00");
            document.getElementById("li."+id).classList.remove("DPStyle");
            distribuito-=assegnato;
            daDistribuire-=assegnato;
            valImporto-=assegnato;
        } else {
            distribuito+=residuo;
            valImporto+=residuo;
            daDistribuire+=residuo;
            valorizzaHTMLElemento("assegnato."+id,formattaNumeri(residuo,2,2));
            document.getElementById("li."+id).classList.add("DPStyle");
        }

        valorizzaValueElemento("txtDaDistribuire",formattaNumeriInput(daDistribuire,2,2));
        valorizzaValueElemento("txtImporto",formattaNumeriInput(valImporto,2,2));
    } else {
        var residuoDistr=daDistribuire-distribuito;

        if (assegnato!=0){
            valorizzaHTMLElemento("assegnato."+id,"0,00");
            document.getElementById("li."+id).classList.remove("DPStyle");
            distribuito-=assegnato;
        } else {
            if (residuoDistr==0){
                return;
            }

            if (residuo<=residuoDistr){
                valorizzaHTMLElemento("assegnato."+id,formattaNumeri(residuo,2,2));
                distribuito+=residuo;
            } else {
                valorizzaHTMLElemento("assegnato."+id,formattaNumeri(residuoDistr,2,2));
                distribuito+=residuoDistr;
            }

            document.getElementById("li."+id).classList.add("DPStyle");
        }
    }

    valorizzaValueElemento("txtDistribuito",formattaNumeriInput(distribuito,2,2));
    verificaDistribuito();
}

function pagaTutti(annulla=false){
    var ul=document.getElementById("elencoPartite");
    var liS=ul.getElementsByTagName("li");

    for (x=0;x<liS.length;x++){
        var id=liS[x].id.split(".")[1];
        var assegnato=Number(recuperaHTMLElemento("assegnato."+id).replace(".","").replace(",","."));
        if ((assegnato==0 && annulla==false) || (assegnato!=0 && annulla==true)){
            assegnaResiduo(id);
        }
    }
}

function apriModalAllegati(){
    var li='';
    for(var [k,v] of  Object.entries(immaginiCaricate)){
        if(!isEmpty(k)){
        var elementiAllegati = `
                <li id="imgLi.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
                    <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
                        <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
                        {NOMEFILE}
                    </a>
                    <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide cursoreBtn" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviImmagine(\'{NOMEFILE}\',\'{URL}\')"/>
                </li>`;
                        li += elementiAllegati.replace(/{URL}/g, k).replace(/{NOMEFILE}/g, v.name).replace(/ hide/g, '');
        }
    }
    query['incassa.html:allegati']=new Array;
    query['incassa.html:allegati']['modalC-body']='<div ><ul id="listaAllegati" class="row w100-5p h300p  elencoR1">'+li+'</ul></div>';
// query['incassa.html:allegati']['modalC-head']='';
    query['incassa.html:allegati']['modalC-footer']=`
        <div class="h50p clrSfumatoChiaro w100" style="border-radius:0px 0px 10px 10px ">
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                <input type="button" class="pulsanteVeBa w100 h90" value="Nuovo Allegato" onclick="allegaImmagine('flImmagineCaricata',false,'listaAllegati')">
                </div>
            </div>
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                    <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom()">
                </div>
            </div>
        </div>`;
    apriModalCustom('incassa.html:allegati','','Allegati incasso','allegaImmagine(\'flImmagineCaricata\',false,\'listaAllegati\')')
}
function elaboraRispostaSiNoDataContanti(risp){
if(risp.toLowerCase()=='si'){
    Salva(true,true,false);
}
}