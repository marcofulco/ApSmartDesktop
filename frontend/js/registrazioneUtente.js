query['nuovoCliente.html']=new Array;
query['nuovoCliente.html']['oggetti']=new Array;
query['nuovoCliente.html']['oggetti']['txtRagioneSociale']="RAGIONE_SOCIALE";
query['nuovoCliente.html']['oggetti']['txtIndirizzo']="INDIRIZZO";
query['nuovoCliente.html']['oggetti']['txtCAP']="CAP";
query['nuovoCliente.html']['oggetti']['txtLocalita']="LOCALITA";
query['nuovoCliente.html']['oggetti']['txtProv']="PROV";
query['nuovoCliente.html']['oggetti']['txtPiva']="PIVA";
query['nuovoCliente.html']['oggetti']['txtCF']="CF";
query['nuovoCliente.html']['oggetti']['txtSDI']="SDI";
query['nuovoCliente.html']['oggetti']['txtPEC']="PEC";
query['nuovoCliente.html']['oggetti']['txtTel']="TEL1";
query['nuovoCliente.html']['oggetti']['txtTel2']="TEL2";
query['nuovoCliente.html']['oggetti']['txtFax']="FAX";
query['nuovoCliente.html']['oggetti']['txtCellulare']="CEL";
query['nuovoCliente.html']['oggetti']['txteMail']="EMAIL";
query['nuovoCliente.html']['oggetti']['cmbPagamento']="PAGAMENTO";
query['nuovoCliente.html']['oggetti']['txtNote']="NOTE";
query['nuovoCliente.html']['oggetti']['txtNoteConsegna']="NOTECONSEGNA";
query['nuovoCliente.html']['oggetti']['cmbFamigliaCliFor']="RAGGRUPPAMENTO";
query['nuovoCliente.html']['oggetti']['cmbVettore']="VETTORERIF";
query['nuovoCliente.html']['oggetti']['cmbMezzo']="MEZZOTRAS";
query['nuovoCliente.html']['oggetti']['cmbDeposito']="IDDEPOSITO";
query['nuovoCliente.html']['oggetti']['txtBanca']="BANCA_DESCRIZIONE";
query['nuovoCliente.html']['oggetti']['txtPaese']="BANCA_PAESE";
query['nuovoCliente.html']['oggetti']['txtCIN']="BANCA_CIN";
query['nuovoCliente.html']['oggetti']['txtABI']="BANCA_ABI";
query['nuovoCliente.html']['oggetti']['txtCAB']="BANCA_CAB";
query['nuovoCliente.html']['oggetti']['txtCC']="CC";
query['nuovoCliente.html']['oggetti']['txtListino']="Listino";
query['nuovoCliente.html']['oggetti']['cmbAgente']="COD_AGENTE";
query['nuovoCliente.html']['oggetti']['cmbNazione']="CODICENAZIONE";
query['nuovoCliente.html']['oggetti']['txtIstat']="CODICEISTAT";
query['nuovoCliente.html']['oggetti']['cmbRegione']="REGIONE";
query['nuovoCliente.html']['oggetti']['txtFido']="FIDO";
query['nuovoCliente.html']['oggetti']['cmbPosizione']="POSIZIONE";
query['nuovoCliente.html']['oggetti']['chkPrivacy']="PRIVACY";
query['nuovoCliente.html']['oggetti']['chkMailMarketing']="MAILMARKETING";
query['nuovoCliente.html']['oggetti']['chkExtraSconto']="EXTRASCONTO";
query['nuovoCliente.html']['oggetti']['txtRicercaAlternativa']="RICERCAALTERNATIVA";

function onSubmit(token) {
    Salva(token);
}

var parametriNC={"obbligatori":"txtRagioneSociale;txtIndirizzo;txtCAP;txtLocalita;txtProv;txteMail;chkPrivacy;", 
                    "alternativi":"txtPiva;txtCF;", 
                    "alternativi1":"txtSDI;txtPEC;", 
                    "nascosti":"divFido;",
                    "idPagamento":0,"idRaggruppamento":0,"extraSconto":0, "privacy":"#", "idAssortimento":"", "inviaMailAttivazione":"",
                    "idVettore":0,"idMezzo":0,"idDeposito":0, "lblRicercaVeloce":"Ricerca Veloce"
                };

tipoAnagrafica=recuperaParametroHRef("CLIENTE");

if (recuperaParametroHRef("","uR")!=""){
    xUserCom=recuperaParametroHRef("","uR");
    xTkCom=recuperaParametroHRef("","tR");
    xDB=recuperaParametroHRef("","dbR");
    xIdDispositivo=recuperaParametroHRef("","idR");
    xIdAgente=recuperaParametroHRef("","agR");
    xLogoIntestazione=recuperaParametroHRef("","imgR");
    xListino=recuperaParametroHRef("0","lisR");

    history.replaceState(null, document.querySelector("title").innerText, window.location.pathname)

    localStorage.setItem("uR",xUserCom);
    localStorage.setItem("tR",xTkCom);
    localStorage.setItem("dbR",xDB);
    localStorage.setItem("idR",xIdDispositivo);
    localStorage.setItem("agR",xIdAgente);
    localStorage.setItem("imgR",xLogoIntestazione);
    localStorage.setItem("lisR",xListino);
} else {
    xUserCom=localStorage.getItem("uR");
    xTkCom=localStorage.getItem("tR");
    xDB=localStorage.getItem("dbR");
    xIdDispositivo=localStorage.getItem("idR");
    xIdAgente=localStorage.getItem("agR");
    xLogoIntestazione=localStorage.getItem("imgR");
    xListino=localStorage.getItem("lisR");
}

if (!(document.location.protocol=="http:" || document.location.protocol=="https:") || document.URL.indexOf('localhost')>0){
    div = document.createElement("input");
    div.id = "noCaptcha"; 
    div.setAttribute("name","noCaptcha"); 
    div.setAttribute("hidden",""); 
    div.value=gRe;
    document.getElementById("divPiede").appendChild(div);
    
    var btn=document.getElementById("btReCaptcha");
    btn.parentNode.removeChild(btn);
    document.getElementById("btNoCaptcha").classList.remove("hide");  
} else {
    var btn=document.getElementById("btNoCaptcha");
    btn.parentNode.removeChild(btn);

    var script=document.createElement("script");
    script.setAttribute("src","https://www.google.com/recaptcha/api.js");
    document.body.appendChild(script);
}

var idModifica=0;

window.addEventListener("load", function(event) {
    setTimeout( function() {
        document.getElementById("tabContatti").click();
        valorizzaValueElemento("txtListino",xListino);
        
        if (xIdAgente>0 || xIdCliente>0){
            document.getElementById("cmbAgente").disabled=true;
        }

        recuperaParametri();
        avviaCarDati("cmbFamigliaCliFor");
        avviaCarDati("cmbPagamento");
        avviaCarDati("txtLocalita");
        avviaCarDati("cmbPosizione");
        avviaCarDati("cmbNazione");
        avviaCarDati("cmbRegione");
        avviaCarDati("cmbAgente");
        avviaCarDati("cmbVettore");
        avviaCarDati("cmbDeposito");
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

    if (parametriNC.privacy!="#"){
        document.getElementById("aPrivacy").setAttribute("href",parametriNC.privacy);
    }

    document.getElementById("txtRicercaAlternativa").setAttribute("placeholder",parametriNC.lblRicercaVeloce);
    valorizzaHTMLElemento("lblRicercaVeloce",parametriNC.lblRicercaVeloce);
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbPagamento":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tesPagamenti", "select":selectID};
        break;
        case "cmbFamigliaCliFor":
            var soloPerApp=0;

            if (idModifica==0 && xIdAgente>0){
                soloPerApp=1;
            }

            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"RaggruppamentoCliFor", "select":selectID, "soloPerApp":soloPerApp};
        break;
        case "cmbAgente":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"Agenti", "select":selectID};
        break;
        case "txtLocalita":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"localita", "select":selectID};
        break;
        case "cmbPosizione":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"posizione", "select":selectID};
        break;
        case "cmbNazione":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"nazione", "select":selectID};
        break;
        case "cmbRegione":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"regione", "select":selectID};
        break;
        case "cmbVettore":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"vettori", "select":selectID};
        break;
        case "cmbDeposito":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"depositi", "select":selectID};
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
            if (risposte==9){
                carDatiAnag();
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);

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

    if (risposte==9){
        carDatiAnag();
    }
}

function carDatiAnag(){
    valorizzaValueElemento("txtSDI","0000000");

    var jSon=JSON.parse(localStorage.getItem(xUserCom+".jSonDati"));

    if (jSon!=undefined){
        popolaFormModificaDati(jSon ,"nuovoCliente.html");
    }

    if (xIdAgente>0){
        valorizzaValueElemento("cmbAgente",xIdAgente);
    }

    if (parametriNC.idPagamento>0){
        valorizzaValueElemento("cmbPagamento",parametriNC.idPagamento);
    }

    if (parametriNC.idRaggruppamento>0){
        valorizzaValueElemento("cmbFamigliaCliFor",parametriNC.idRaggruppamento);
    }

    if (parametriNC.idDeposito>0){
        valorizzaValueElemento("cmbDeposito",parametriNC.idDeposito);
    }

    if (parametriNC.idVettore>0){
        valorizzaValueElemento("cmbVettore",parametriNC.idVettore);
    }

    if (parametriNC.idMezzo>0){
        valorizzaValueElemento("cmbMezzo",parametriNC.idMezzo);
    }

    if (parametriNC.extraSconto>0){
        valorizzaCheckedElemento("chkExtraSconto",parametriNC.extraSconto);
    }
}

function esci(){
    location.href='login.html';
}

function Salva(token=''){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    if (token!=''){
        var jSon={};

        for (x in query['nuovoCliente.html']['oggetti']){
            jSon[query['nuovoCliente.html']['oggetti'][x]]=recuperaValueElemento(x);
        }

        localStorage.setItem(xUserCom+".jSonDati",JSON.stringify(jSon));
    }

    for (x in parametriNC){
        if (x=="obbligatori") {
            v=parametriNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        } else if (x.indexOf("alternativi")>=0) {
            r=0;
            campiAl=[""];

            v=parametriNC[x].split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    r+=1;
                    campiAl[r]=v[i];
                } else {
                    r=0;
                    break;
                }
            }

            if (r>0){
                for (i=1;i<=r;i++){
                    errori=true;
                    e=document.getElementById(campiAl[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        }
    }

    if (errori){
        attivaAlert(2,"Non sono stati valorizzati i seguenti Campi Obbligatori:<br>"+campi,"erroriCampi");
        return;
    }

    if (recuperaValueElemento("txtPiva")!=""){
        if (!controllaPartitaIVA(recuperaValueElemento("txtPiva"))){
            e=document.getElementById("txtPiva");
            e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
            attivaAlert(2,"Partita Iva non corretta!","erroriCampi");
            return;
        }
    }
    
    if (recuperaValueElemento("txtCF")!=""){
        if (recuperaValueElemento("txtCF").length==11){
            if (!controllaPartitaIVA(recuperaValueElemento("txtCF"))){
                e=document.getElementById("txtCF");
                e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2,"Codice Fiscale non corretto!","erroriCampi");
                return;
            }
        } else {
            if (!controllaCodiceFiscale(recuperaValueElemento("txtCF"))){
                e=document.getElementById("txtCF");
                e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2,"Codice Fiscale non corretto!","erroriCampi");
                return;
            }
        }
    }

    if (recuperaValueElemento("txtSDI")!=""){
        if (recuperaValueElemento("txtSDI").length!=6 && recuperaValueElemento("txtSDI").length!=7){
            e=document.getElementById("txtSDI");
            e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
            attivaAlert(2,"Codice SDI non valido. Lunghezza compresa tra 6 e 7 caratteri!","erroriCampi");
            return;
        }
    }

    if (recuperaValueElemento("txtPEC")!=""){
        if (!validazioneEmail("txtPEC")){
            return;
        }
    }

    if (recuperaValueElemento("txteMail")!=""){
        if (!validazioneEmail("txteMail")){
            return;
        }
    }

    if (recuperaValueElemento("txtListino")==""){
        e=document.getElementById("txtListino");
        e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        attivaAlert(2,"Valore Campo Listino Non Valido!","erroriCampi");
        return;
    }

    var jSon={};

    for (x in query['nuovoCliente.html']['oggetti']){
        jSon[query['nuovoCliente.html']['oggetti'][x]]=recuperaValueElemento(x);
    }

    jSon.CLIENTE=1;

    if (xIdAgente>0){
        jSon.CREATODAAGENTE=1;
    }
    
    if (jSon.FIDO==""){
        jSon.FIDO="0";
    }
    
    jSon.verificaEsistenzaAnagrafica=1;
    
    tipo="salva";
    
    var parametri={"tipoRisposta":tipo,"tipoSalva":"anagrafiche", "dati":jSon,"app":gRe,"captchaToken":token,"idAssortimento":parametriNC.idAssortimento};
    inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalvaCarrello,'','reloadPagina');
}

function elaboraRispostaSalvaCarrello(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0 || data=="false"){
        attivaAlert(0,"Errore durante il salvataggio del Cliente","fineSalva","","",'reloadPagina');
        return "";
    }

    var id=data;
    
    eMail=recuperaValueElemento("txteMail");
    
    var ragioneSociale=recuperaValueElemento("txtRagioneSociale");

    var jSon={"userName":eMail, "nome":ragioneSociale, "idCliente":id};
    var parametri={"tipoSalva":"attivaB2B", "dati":jSon}; 

    inviaRichiestaCentralino("nuovoUtente",parametri,elaboraAttivaB2B);
}

function elaboraAttivaB2B(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        location.reload();
        return "";
    }

    if(data[0]==0){
        location.reload();
        return "";
    }

    if (parametriNC.inviaMailAttivazione!=""){
        inviaSegnalazioneViaMail("Nuovo Cliente B2B: "+recuperaValueElemento("txtRagioneSociale")+" - "+recuperaValueElemento("txteMail"),parametriNC.inviaMailAttivazione, "Nuovo Cliente B2B","Avviso Attivazione B2B",false);    
    }

    attivaAlert(4,"Abbiamo inviato una email con le istruzioni per la prima attivazione.<br>Clicca il link che hai ricevuto per procedere. Grazie.","okB2B",'','',"esci");
    
    return;
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