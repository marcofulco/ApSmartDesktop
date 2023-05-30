tipoAnagrafica=recuperaParametroHRef("CLIENTE");

var nomeS=document.getElementById("nomeScheda");
 
var parametriNC={"noPresaOrdini":0, "disattivaB2B":1, "abilitaExtraSconto":1, "abilitaIncasso":0,"abilitaPagamento":0,"noResoMerce":0, "TabAssortimento":0, "lblRicercaVeloce":"Ricerca Veloce", "abilitaRating":"hide"};

var daApriArticoli=0;
var IDDestinazionePredefinita=0;

if (tipoAnagrafica=="CLIENTE"){
    var idCliente=window.sessionStorage.getItem("idCliente");
    nomeS.innerHTML="SCHEDA CLIENTE";
} else if (tipoAnagrafica=="FORNITORE") {
    var idCliente=window.sessionStorage.getItem("idFornitore");
    nomeS.innerHTML="SCHEDA FORNITORE";
    document.getElementById("cmdEC").classList.add("hide");
    document.getElementById("cmdScad").classList.add("hide");
    document.getElementById("cmdIncassa").classList.add("hide");
    document.getElementById("cmdStat").classList.add("hide");
    document.getElementById("cmdECF").setAttribute("class","w20");
    document.getElementById("cmdScadF").setAttribute("class","w20");
    document.getElementById("cmdPaga").setAttribute("class","w20");
} else {
    var idCliente=window.sessionStorage.getItem("idFornitore");
    nomeS.innerHTML="SCHEDA ANAGRAFICA";
    document.getElementById("cmdArticoli").classList.add("hide");
    document.getElementById("cmdStat").classList.add("hide");
    document.getElementById("cmdECF").setAttribute("class","w20");
    document.getElementById("cmdScadF").setAttribute("class","w20");
    document.getElementById("cmdPaga").setAttribute("class","w20");
    document.getElementById("contSaldo").style.display="none";
    document.getElementById("divMetodoPagamento").setAttribute("class","hide");
    document.getElementById("divTipoAnagrafica").setAttribute("class","");
}

var nomeSession=nomePagina+"."+tipoAnagrafica+"."+idCliente;

window.addEventListener("load", function(event) {
    var script=document.createElement("script");
    script.setAttribute("src","componenti/elementiDestinazioni.js");
    document.body.appendChild(script);

    script.onload = function() {
        var script=document.createElement("script");
        script.setAttribute("src","componenti/elementiRubrica.js");
        document.body.appendChild(script);

        script.onload = function() {
            inizializzaArray();

            var idServer=sessionStorage.getItem("s");
            xNomeDestinazione = "nDestinazione."+idServer+"."+tipoAnagrafica+"."+idCliente;

            if (xOffLine=="true"){
                caricaScriptOffLine(apriDBOffLine);
            } else {
                recuperaParametri();
                recuperaStatoB2B();
            }
            
            document.getElementById("tabContatti").click();
            
        }
    }
});

function inizializzaArray(){
    query['schedaCliente.html']=new Array;
    query['schedaCliente.html']['oggetti']=new Array;
    query['schedaCliente.html']['oggetti']['divRagioneSociale']="RAGIONE_SOCIALE";
    query['schedaCliente.html']['oggetti']['divID']="ID";
    query['schedaCliente.html']['oggetti']['divIndirizzo']="INDIRIZZO";
    query['schedaCliente.html']['oggetti']['aMap']="MAP:http://maps.apple.com/?address={CAMPO}";
    query['schedaCliente.html']['oggetti']['divLocalita']="LOCALITARICCA";
    query['schedaCliente.html']['oggetti']['divPIva']="PIVA";
    query['schedaCliente.html']['oggetti']['divCF']="CF";
    query['schedaCliente.html']['oggetti']['divSDI']="SDI";
    query['schedaCliente.html']['oggetti']['divPEC']="PEC";
    query['schedaCliente.html']['oggetti']['divTelefono1']="TEL1";
    query['schedaCliente.html']['oggetti']['aTelefono1']="TEL1:tel:{CAMPO}";
    query['schedaCliente.html']['oggetti']['wTelefono1']="TEL1:whatsapp://send/?phone=39{CAMPO}";
    query['schedaCliente.html']['oggetti']['divTelefono2']="TEL2";
    query['schedaCliente.html']['oggetti']['aTelefono2']="TEL2:tel:{CAMPO}";
    query['schedaCliente.html']['oggetti']['wTelefono2']="TEL2:whatsapp://send/?phone=39{CAMPO}";
    query['schedaCliente.html']['oggetti']['divCel']="CEL";
    query['schedaCliente.html']['oggetti']['aCel']="CEL:tel:{CAMPO}";
    query['schedaCliente.html']['oggetti']['wCel']="CEL:whatsapp://send/?phone=39{CAMPO}";
    query['schedaCliente.html']['oggetti']['divFax']="FAX";
    query['schedaCliente.html']['oggetti']['aFax']="FAX:tel:{CAMPO}";
    query['schedaCliente.html']['oggetti']['wFax']="FAX:whatsapp://send/?phone=39{CAMPO}";
    query['schedaCliente.html']['oggetti']['diveMail']="EMAIL";
    query['schedaCliente.html']['oggetti']['aeMail']="EMAIL:mailto:{CAMPO}";
    query['schedaCliente.html']['oggetti']['divPagamento']="DPAGAMENTO";
    query['schedaCliente.html']['oggetti']['divFido']="FIDO";
    query['schedaCliente.html']['oggetti']['divSaldo']="SALDO";
    query['schedaCliente.html']['oggetti']['lblBloccato']="BLOCCATO";
    query['schedaCliente.html']['oggetti']['cmdRubrica']="HIDERUB";
    query['schedaCliente.html']['oggetti']['cmdRubricaAdd']="HIDERUBADD";
    query['schedaCliente.html']['oggetti']['cmdDest']="HIDEDEST";
    query['schedaCliente.html']['oggetti']['cmdDestAdd']="HIDEDESTADD";
    query['schedaCliente.html']['oggetti']['divNote']="NOTE";
    query['schedaCliente.html']['oggetti']['divNoteConsegna']="NOTECONSEGNA";
    query['schedaCliente.html']['oggetti']['chkCliente']="CLIENTE";
    query['schedaCliente.html']['oggetti']['chkFornitore']="FORNITORE";
    query['schedaCliente.html']['oggetti']['chkAgente']="AGENTE";
    query['schedaCliente.html']['oggetti']['chkVettore']="VETTORE";
    query['schedaCliente.html']['oggetti']['chkAltro']="ALTRO";
    query['schedaCliente.html']['oggetti']['divIDIva']="ID_IVA";
    query['schedaCliente.html']['oggetti']['divDesIva']="DESIVA";
    query['schedaCliente.html']['oggetti']['divPercIva']="PERCIVA";
    query['schedaCliente.html']['oggetti']['divCodAgente']="COD_AGENTE";
    query['schedaCliente.html']['oggetti']['divAgente']="DAGENTE";
    query['schedaCliente.html']['oggetti']['divIDRaggruppamento']="RAGGRUPPAMENTO";
    query['schedaCliente.html']['oggetti']['divRaggruppamento']="DRAGGRUPPAMENTO";
    query['schedaCliente.html']['oggetti']['chkNoPromo']="NOPROMO";
    query['schedaCliente.html']['oggetti']['chkExtraSconto']="EXTRASCONTO";
    query['schedaCliente.html']['oggetti']['chkNoNetti']="NONETTI";
    query['schedaCliente.html']['oggetti']['divBanca']="BANCA_DESCRIZIONE";
    query['schedaCliente.html']['oggetti']['divPaese']="BANCA_PAESE";
    query['schedaCliente.html']['oggetti']['divCIN']="BANCA_CIN";
    query['schedaCliente.html']['oggetti']['divABI']="BANCA_ABI";
    query['schedaCliente.html']['oggetti']['divCAB']="BANCA_CAB";
    query['schedaCliente.html']['oggetti']['divCC']="CC";
    query['schedaCliente.html']['oggetti']['divIBAN']="IBAN";
    query['schedaCliente.html']['oggetti']['divListino']="DESLISTINO";
    query['schedaCliente.html']['oggetti']['divPosizione']="POSIZIONE";
    query['schedaCliente.html']['oggetti']['divPercTrasp']="PERCTRASPA";
    query['schedaCliente.html']['oggetti']['divSpTrasporto']="TRASPORTOA";
    query['schedaCliente.html']['oggetti']['divDeposito']="DESDEPOSITO";
    query['schedaCliente.html']['oggetti']['divDestPredefinita']="DESTPREDEFINITA";
    query['schedaCliente.html']['oggetti']['divScaduto']="SCADUTO";
    query['schedaCliente.html']['oggetti']['divRicercaAlternativa']="RICERCAALTERNATIVA";
    query['schedaCliente.html']['oggetti']['divClasse']="PL_CLASSE";
    query['schedaCliente.html']['oggetti']['divFidoMax']="PL_FIDO";
    query['schedaCliente.html']['oggetti']['divValutazione']="PL_VALUTAZIONE";
    query['schedaCliente.html']['oggetti']['divEventi']="PL_EVENTI";

    query['schedaCliente.html:rubrica']=new Array;
    query['schedaCliente.html:rubrica']['modelloRiga']=elementiRubrica;
    query['schedaCliente.html:rubrica']['modelloContenitore']=modalRubrica+modalRubricaAdd;

    query['schedaCliente.html:rubrica']['oggetti']=new Array;
    query['schedaCliente.html:rubrica']['oggetti']['{ID}']="ID";
    query['schedaCliente.html:rubrica']['oggetti']['{NOMINATIVO}']="NOMINATIVO";
    query['schedaCliente.html:rubrica']['oggetti']['{TELEFONO}']="TELEFONO";
    query['schedaCliente.html:rubrica']['oggetti']['{HIDETEL}']="HIDETEL";
    query['schedaCliente.html:rubrica']['oggetti']['{FAX}']="FAX";
    query['schedaCliente.html:rubrica']['oggetti']['{HIDEFAX}']="HIDEFAX";
    query['schedaCliente.html:rubrica']['oggetti']['{CELLULARE}']="CELLULARE";
    query['schedaCliente.html:rubrica']['oggetti']['{HIDECEL}']="HIDECEL";
    query['schedaCliente.html:rubrica']['oggetti']['{EMAIL}']="EMAIL";
    query['schedaCliente.html:rubrica']['oggetti']['{HIDEMAIL}']="HIDEMAIL";
    query['schedaCliente.html:rubrica']['oggetti']['{PECR}']="PECR";
    query['schedaCliente.html:rubrica']['oggetti']['{HIDEPECR}']="HIDEPECR";
    query['schedaCliente.html:rubrica']['oggetti']['{REPARTO}']="REPARTO";

    query['schedaCliente.html:destinazioni']=new Array;
    query['schedaCliente.html:destinazioni']['modelloRiga']=elementiDestinazioni;

    if (xIdCliente>0){
        query['schedaCliente.html:destinazioni']['modelloContenitore']=modalRubrica;
    } else {
        query['schedaCliente.html:destinazioni']['modelloContenitore']=modalRubrica+modalDestinazioniAdd;
    }

    query['schedaCliente.html:destinazioni']['oggetti']=new Array;
    query['schedaCliente.html:destinazioni']['oggetti']['{ID}']="ID";
    query['schedaCliente.html:destinazioni']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
    query['schedaCliente.html:destinazioni']['oggetti']['{TEL}']="TEL";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDETEL}']="HIDETEL";
    query['schedaCliente.html:destinazioni']['oggetti']['{FAX}']="FAX";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDEFAX}']="HIDEFAX";
    query['schedaCliente.html:destinazioni']['oggetti']['{INDIRIZZO}']="INDIRIZZO";
    query['schedaCliente.html:destinazioni']['oggetti']['{LOCALITA}']="LOCALITARICCA";
    query['schedaCliente.html:destinazioni']['oggetti']['{LOCALITAPULITA}']="LOCALITAPULITA";
    query['schedaCliente.html:destinazioni']['oggetti']['{CAP}']="CAP";
    query['schedaCliente.html:destinazioni']['oggetti']['{PROV}']="PROV";
    query['schedaCliente.html:destinazioni']['oggetti']['{MAP}']="MAP";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDELOC}']="HIDELOC";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESPAGAMENTO}']="DESPAGAMENTO";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESVETTORE}']="DESVETTORE";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESAGENTE}']="DESAGENTE";
    query['schedaCliente.html:destinazioni']['oggetti']['{CONTATTOD}']="CONTATTOD";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESDEPOSITO}']="DESDEPOSITO";
    query['schedaCliente.html:destinazioni']['oggetti']['{NOTED}']="NOTED";
    query['schedaCliente.html:destinazioni']['oggetti']['{EMAILD}']="EMAILD";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDEEMAIL}']="HIDEEMAIL";
    query['schedaCliente.html:destinazioni']['oggetti']['{PECD}']="PECD";
    query['schedaCliente.html:destinazioni']['oggetti']['{SDI_DEST}']="SDI_DEST";
    query['schedaCliente.html:destinazioni']['oggetti']['{NAZIONED}']="NAZIONED";
    query['schedaCliente.html:destinazioni']['oggetti']['{PAGAMENTOD}']="PAGAMENTOD";
    query['schedaCliente.html:destinazioni']['oggetti']['{VETTORED}']="VETTORED";
    query['schedaCliente.html:destinazioni']['oggetti']['{AGENTED}']="AGENTED";
    query['schedaCliente.html:destinazioni']['oggetti']['{DEPOSITOD}']="IDDEPOSITOD";
    query['schedaCliente.html:destinazioni']['oggetti']['{PREDEFINITA}']="PREDEFINITA";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESPREDEFINITA}']="DESPREDEFINITA";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESLISTINO}']="DESLISTINO";
    query['schedaCliente.html:destinazioni']['oggetti']['{LISTINODEST}']="listinoDest";
    query['schedaCliente.html:destinazioni']['oggetti']['{RAGGRUPPAMENTOD}']="RAGGRUPPAMENTOD";
    query['schedaCliente.html:destinazioni']['oggetti']['{DESRAGGRUPPAMENTOD}']="DESRAGGRUPPAMENTOD";
    
    query['schedaCliente.html:annotazioni']=new Array;
    query['schedaCliente.html:annotazioni']['modelloRiga']=elementiAnnotazioni;
    query['schedaCliente.html:annotazioni']['modelloContenitore']=modalRubrica+modalAnnotazioniAdd;

    query['schedaCliente.html:annotazioni']['oggetti']=new Array;
    query['schedaCliente.html:annotazioni']['oggetti']['{ID}']="ID";
    query['schedaCliente.html:annotazioni']['oggetti']['{DATA}']="DATA";
    query['schedaCliente.html:annotazioni']['oggetti']['{SCADENZA}']="SCADENZA";
    query['schedaCliente.html:annotazioni']['oggetti']['{DESINIT}']="DESINIT";

    query['schedaCliente.html:assortimenti']=new Array;
    query['schedaCliente.html:assortimenti']['modelloRiga']=`<div class="row w100-5p h60p clrSfumatoScuro centraVerticalmente marg5Top testoNormale " id="liAssortimento.{ID}" onclick="selezionaAssortimento(this)">
        <div id="codiceAss.{ID}" class="hide" style="padding-left:5px">{CODICEASS}</div>
        <div class="w100-40p" style="padding-left:5px">{DESCRIZIONE}</div>
        <div class="w30p row marg5Dx"><img id="img.{ID}" src="img/bianche/{SELEZIONATO}" class="h30p"></div>
        </div>`;
    query['schedaCliente.html:assortimenti']['modelloContenitore']=modalRubrica;

    query['schedaCliente.html:assortimenti']['oggetti']=new Array;
    query['schedaCliente.html:assortimenti']['oggetti']['{ID}']="ID";
    query['schedaCliente.html:assortimenti']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
    query['schedaCliente.html:assortimenti']['oggetti']['{CODICEASS}']="CODICEASS";
    query['schedaCliente.html:assortimenti']['oggetti']['{SELEZIONATO}']="SELEZIONATO";

    if (gRe!=''){
        query['schedaCliente.html']['oggetti']['wTelefono1']="TEL1:https://wa.me/39{CAMPO}";
        query['schedaCliente.html']['oggetti']['wTelefono2']="TEL2:https://wa.me/39{CAMPO}";
        query['schedaCliente.html']['oggetti']['wCel']="CEL:https://wa.me/39{CAMPO}";
        query['schedaCliente.html']['oggetti']['wFax']="FAX:https://wa.me/39{CAMPO}";
    }
}

function apriDBOffLine(){
    apriIndexedDB(nomeIndexedDB,recuperaParametri);
}

function recuperaParametri(){
    if (xOffLine=="true"){
        res=localStorage.getItem("offLine."+nomePagina+".parametri");
        elaboraParametri(res);
    } else {
        var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
        inviaRichiestaCentralino("parametri",parametri,elaboraParametri);

        var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina+":destinazioni", "userName":""}; 
        inviaRichiestaCentralino("parametri",parametri,elaboraParametriDestinazioni);

        avviaCarDati("cmbPagamento");
        avviaCarDati("cmbNazione");
        avviaCarDati("cmbAgente");
        avviaCarDati("cmbDeposito");
        avviaCarDati("cmbVettore");
        avviaCarDati("cmbListino");
        
    }

    avviaCarDatiSchedaCliente();
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbListino":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"anagraficaListini", "select":selectID};
        break;
        case "cmbPagamento":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tesPagamenti", "select":selectID};
        break;
        case "cmbAgente":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"Agenti", "select":selectID};
        break;
        case "cmbNazione":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"nazione", "select":selectID};
        break;
        case "cmbDeposito":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"depositi", "select":selectID};
        break;
        case "cmbVettore":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"vettori", "select":selectID};
        break;
        case "verificaPresenzaResi":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"verificaPresenzaResi", "select":selectID,"idCliente":idCliente,"idDocumentoAccettazioneReso":parametriNC.idDocumentoAccettazioneReso};
        break;
    }   

    parametri.md5=localStorage.getItem(selectID+".md5");

    inviaRichiestaCentralino("query",parametri,elaboraCarDati);
}

function elaboraCarDati(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            return "";
        }
    }
    
    if(parametri.select=='verificaPresenzaResi'){
        var list='Sono presenti a sistema le seguenti richieste di reso <br>';
        for(var x in data){
            list+=data[x].doc+'<br>';
        }
        attivaAlert(xTipoAllert.INFORMAZIONE,list);
        return;
    }
    data=verificaMd5(parametri.select,parametri,risp,data);
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    var cmd;

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

    if (parametriNC.abilitaRating!="hide"){
        document.getElementById("rating").classList.remove("hide");
    }

    if (parametriNC["noPresaOrdini"]==1 && tipoAnagrafica!="ANAGRAFICA"){
        document.getElementById("cmdArticoli").style.display="none";
        var div=document.getElementById("divPiede");
        var m=div.getElementsByTagName("a");
        try {
            for (x in m){
                m[x].classList.replace("w20","w25") ;
             }
        } catch (error) {
            
        }
    }

    cmd=document.getElementById("cmdResoMerce");

    if (parametriNC["noResoMerce"]==1 || tipoAnagrafica!="CLIENTE"){
        cmd.parentNode.removeChild(cmd);
    } else {
        cmd.classList.remove("hide");
    }

    if (parametriNC["disattivaB2B"]==1 || xIdCliente>0){
        cmd=document.getElementById("divAttivaB2B");
        cmd.parentNode.removeChild(cmd);
        query['schedaCliente.html:rubrica']['modelloRiga']=elementiRubrica.replace(/{hideAttivaB2B}/g,"hide");
        query['schedaCliente.html:destinazioni']['modelloRiga']=elementiDestinazioni.replace(/{hideAttivaB2B}/g,"hide");
    }

    if (parametriNC["abilitaExtraSconto"]==0 || xIdCliente>0){
        var cmd=document.getElementById("chkExtraSconto");
        cmd.disabled=true;
    }

    cmd=document.getElementById("cmdIncassa");

    if (parametriNC["abilitaIncasso"]==0 || xIdCliente>0 || tipoAnagrafica=="ANAGRAFICA"|| tipoAnagrafica=="FORNITORE"){
        cmd.parentNode.removeChild(cmd);
    } else {
        cmd.classList.remove("hide");
    }

    cmd=document.getElementById("cmdPaga");

    if (parametriNC["abilitaPagamento"]==0 || xIdCliente>0 || tipoAnagrafica=="ANAGRAFICA" || tipoAnagrafica=="CLIENTE"){
        cmd.parentNode.removeChild(cmd);
    } else {
        cmd.classList.remove("hide");
    }

    cmd=document.getElementById("cmdAssortimenti");

    if (parametriNC.TabAssortimento==0 || xIdCliente>0){    
        cmd.parentNode.removeChild(cmd);
    } else {
        cmd.classList.remove("hide");
    }

    if (xIdCliente>0){
        var cmd=document.getElementById("cmdModificaAnag");
        cmd.parentNode.removeChild(cmd);

        cmd=document.getElementById("cmdAnnotazioni");
        cmd.parentNode.removeChild(cmd);

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
                    if (lab[x].getAttribute("class").indexOf("hide")==-1){
                        lab[x].setAttribute("class","w"+varW);
                    }
                } catch (error) {
                    
                }
            }
        }
    }
    
    if (parametriNC.visualizzaImmagini!=undefined && parametriNC.visualizzaImmagini==1){
        var cmd=document.getElementById('cmdImmaginiAssociate');
        cmd.classList.remove("hide");
    } else {
        var cmd=document.getElementById('cmdImmaginiAssociate');
        cmd.parentNode.removeChild(cmd);
    }

    if(parametriNC.avvisoResoMerce==1){
        avviaCarDati("verificaPresenzaResi");
    }

    valorizzaHTMLElemento("lblRicercaVeloce",parametriNC.lblRicercaVeloce);
}

function elaboraParametriDestinazioni(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    var cmd;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriDNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriDNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }
}

function apriArticoli(e,resoMerce=false,domandaDest=true,domandaFido=true){
    var idIva=document.getElementById("divIDIva");
    sessionStorage.setItem("idIva"+idCliente,idIva.innerHTML);

    var percIva=document.getElementById("divPercIva");
    sessionStorage.setItem("percIva"+idCliente,percIva.innerHTML);

    var bl=document.getElementById("lblBloccato");

    if (domandaFido==true && resoMerce==false){
        var scaduto=Number(recuperaHTMLElemento("divScaduto").replace(".","").replace(",","."));
        var fido=Number(recuperaHTMLElemento("divFido").replace(".","").replace(",","."));

        if (fido>0) {
            if (fido<scaduto){
                attivaAlert(xTipoAllert.DOMANDASINO,"Il cliente ha uno scaduto superiore al Fido accordato!<br>Vuoi proseguire?","elaboraRispostaFido_"+e); 
                return;
            }
        }
    }

    if (document.getElementById("cmdDest").classList.contains("hide")===false && domandaDest==true && resoMerce==false && IDDestinazionePredefinita==0){
        attivaAlert(xTipoAllert.DOMANDASINO,"Il cliente ha delle destinazioni diverse!<br>Vuoi Selezionarne una?","elaboraRispostaDestinazione_"+e);
        return;
    }

    if (bl.innerHTML=="BLOCCATO") {
        attivaAlert(2,"Il "+tipoAnagrafica.toLowerCase+" risulta bloccato per motivi amministrativi!<br>Contattatre l'amministrazione.<br>Impossibile Proseguire.","clientebloccato")
    } else {
        var comando="tipoAnagrafica="+tipoAnagrafica;
        if (resoMerce){
            comando+="&resoMerce=1";
        }
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="ListaArticoli.html?"+comando;
        }else{
            window.open("ListaArticoli.html?"+comando,"_self");
        }
        
    }
}

function elaboraRispostaDestinazione(risp,id=0){
    if (risp=="Si"){
        daApriArticoli=1;
        apriDestinazioni();
    } else {
        localStorage.removeItem(xNomeDestinazione);
        apriArticoli(id,false,false,false);
    }
}

function elaboraRispostaFido(risp,id=0){
    if (risp=="Si"){
        apriArticoli(id,false,true,false);
    }
}

function avviaCarDatiSchedaCliente(){
    if (idCliente>0) {
        var parametri={"nomeQuery":nomePagina,"tipoRisposta":"schedaCliente","idCliente":idCliente,
                        "tipoQuery":"schedaClienti","chiamante":"schedaCliente","tipoAnagrafica":tipoAnagrafica
                        }; 

        if (xOffLine=="true"){
            parametri.campoID="idCliente";

            leggiTabellaIndexedDB("clienti",parametri,"",elaboraRisposta);
        } else {
            var md5=sessionStorage.getItem(nomeSession+".md5");
            if (md5!=undefined){
                parametri.md5=md5;
            }
            
            inviaRichiestaCentralino("query",parametri,elaboraRisposta,"body");
        }
    }
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            return "";
        }
    }

    if (parametri.md5==risp.md5){
        data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));
    } else {
        sessionStorage.setItem(nomeSession+".md5",risp.md5);
        sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
    }

    try {
        switch (data[0].PL_IDCLASSE){
            case "1":
                document.getElementById("divSemaforo").style.backgroundColor="red";
                break;
            case "2":
                document.getElementById("divSemaforo").style.backgroundColor="orange";
                break;
            case "4":
                document.getElementById("divSemaforo").style.backgroundColor="green";
                break;
            case "6":
                document.getElementById("divSemaforo").style.backgroundColor="black";
                break;
            default:
                document.getElementById("divSemaforo").style.backgroundColor="white";
                break;
        }
    } catch (error) {
        
    }
    
    try {
        popolaFormDati(data);

        var chkNoPromo=document.getElementById("divChkNoPromo");
        var chkNoNetti=document.getElementById("divChkNoNetti");
        var chkExtraSconto=document.getElementById("divChkExtraSconto");

        if (data[0].HIDENOPROMO!=''){
            chkNoPromo.classList.add(data[0].HIDENOPROMO);
            chkNoNetti.classList.add(data[0].HIDENOPROMO);
            chkExtraSconto.classList.add(data[0].HIDENOPROMO);
            document.getElementById("divNoteInterne").classList.add(data[0].HIDENOPROMO);
        }
        
        chkNoPromo=document.getElementById("chkNoPromo");
        chkNoPromo.setAttribute('onclick','chkClick(this)');
        chkNoNetti=document.getElementById("chkNoNetti");
        chkNoNetti.setAttribute('onclick','chkClick(this)');
        chkExtraSconto=document.getElementById("chkExtraSconto");
        chkExtraSconto.setAttribute('onclick','chkClick(this)');

        if (data[0].PRESENZANOTECLI!=''){
            var cmdAnnotazioni=document.getElementById("cmdAnnotazioni");
            cmdAnnotazioni.classList.add("blink_text");
        }

        var idDest=recuperaHTMLElemento("divDestPredefinita");

        if (idDest!="0" && idDest!=undefined){
            carDatiDestinazione(idDest);
        }
        creaMenuLaterale('pulsantiera');
    } catch (error) {
        
    }
}

function carDatiDestinazione(idDest){
    var parametri={"tipoQuery":"datiDestinazione","id":idDest}; 

    inviaRichiestaCentralino("multiQuery",parametri,elaboraDatiDestinazione);
}

function elaboraDatiDestinazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        return "";
    }
    IDDestinazionePredefinita=data.idDest;
    localStorage.setItem(xNomeDestinazione,JSON.stringify(data));
}

function tornaElenco(){
    open("ListaClienti.html?tipoAnagrafica="+tipoAnagrafica,"_self");
}

function apriEstrattoConto(zTipo=tipoAnagrafica){
    if (tipoAnagrafica=="ANAGRAFICA"){
        window.sessionStorage.setItem("aIdCliente",idCliente);
    }

    open("estrattoConto.html?tipoAnagrafica="+zTipo,"_self");
}

function aggiungiAnnotazioni(){
    data=[0];

    apriModalDettagli(nomePagina+":annotazioni",document.getElementById("divRagioneSociale").innerHTML,data,0,true,"ANNOTAZIONI");
    aggiungiLiA();
}

function apriAnnotazioni(){
    var parametri={"nomeQuery":nomePagina+":annotazioni","tipoRisposta":"Annotazioni","idCliente":idCliente,
                    "tipoQuery":"schedaClienti","chiamante":"annotazioni"
                    }; 

    inviaRichiestaCentralino("query",parametri,elaboraApriRubrica);
}

function apriRubrica(){
    var parametri={"nomeQuery":nomePagina+":rubrica","tipoRisposta":"Rubrica","idCliente":idCliente,
                    "tipoQuery":"schedaClienti","chiamante":"rubrica"
                    }; 

    inviaRichiestaCentralino("query",parametri,elaboraApriRubrica);
}

var jSonModal;

function elaboraApriRubrica(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        if (parametri.nomeQuery==nomePagina+":annotazioni"){
            aggiungiAnnotazioni();
            return;
        } else {
            return "";
        }
    }

    sessionStorage.setItem(nomeSession+"."+parametri.tipoRisposta+".md5",risp.md5);
    sessionStorage.setItem(nomeSession+"."+parametri.tipoRisposta+".jSon",JSON.stringify(data));

    jSonModal=data;

    if (parametri.nomeQuery==nomePagina+":rubrica"){
        var titolo="RUBRICA";
    } else if (parametri.nomeQuery==nomePagina+":destinazioni"){
        var titolo="DESTINAZIONI";
    } else if (parametri.nomeQuery==nomePagina+":assortimenti"){
        var titolo="ASSORTIMENTI";
    } else {
        var titolo="ANNOTAZIONI";
    }

    apriModalDettagli(parametri.nomeQuery,document.getElementById("divRagioneSociale").innerHTML,data,0,true,titolo);
}

function aggiungiRubrica(){
    data=[0];

    apriModalDettagli(nomePagina+":rubrica",document.getElementById("divRagioneSociale").innerHTML,data,0,true,"RUBRICA");
    aggiungiLiR();
}

function apriDestinazioni(){
    var parametri={"nomeQuery":nomePagina+":destinazioni","tipoRisposta":"destinazioni","idCliente":idCliente,
                    "tipoQuery":"schedaClienti","chiamante":"destinazioni"
                    }; 

    inviaRichiestaCentralino("query",parametri,elaboraApriRubrica);
}

function aggiungiDestinazione(){
    data=[0];

    apriModalDettagli(nomePagina+":destinazioni",document.getElementById("divRagioneSociale").innerHTML,data,0,true,"DESTINAZIONI");
    aggiungiLiD();
}


function apriScadenziario(zTipo=tipoAnagrafica){
    if (tipoAnagrafica=="ANAGRAFICA"){
        window.sessionStorage.setItem("aIdCliente",idCliente);
    }
    
    open("scadenziario.html?tipoAnagrafica="+zTipo,"_self");
}

function chkClick(e){
    var valore=0;

    if (e.checked){
        valore=1;
    }

    var jSon={"id":idCliente};
    
    if (e.id=="chkNoPromo"){
        jSon.NOPROMO=valore;
    } else if (e.id=="chkNoNetti"){
        jSon.NONETTI=valore;
    } else {
        jSon.EXTRASCONTO=valore;
    }

    var parametri={"tipoSalva":"anagrafiche", "dati":jSon}; 

    inviaRichiestaCentralino("update",parametri,elaboraChkClick);
}

function elaboraChkClick(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        return "";
    }

    var jSon=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));

    if (parametri.dati.NOPROMO!=undefined){
        jSon[0].NOPROMO=parametri.dati.NOPROMO;
    } else if (parametri.dati.NONETTI!=undefined){
        jSon[0].NONETTI=parametri.dati.NONETTI;
    } else {
        jSon[0].EXTRASCONTO=parametri.dati.EXTRASCONTO;
    }
    
    sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(jSon));
}

function apriModificaAnagrafica(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="nuovoCliente.html?tipoAnagrafica="+tipoAnagrafica+"&id="+idCliente;
    }else{
        window.open("nuovoCliente.html?tipoAnagrafica="+tipoAnagrafica+"&id="+idCliente,"_self");
    }
    
}

function attivaB2B(eMail='',idDest=0){
    id=idCliente;
    if (eMail!=''){
        id+=";"+eMail+";"+idDest;
    }
    attivaAlert(5,"Sei sicuro di voler Attivare l'accesso B2B al Cliente?","rispAttivaB2B_"+id);
}

function rispAttivaB2B(risp,id){
    var eMail="";
    var idDest=0;

    if (risp=="Si"){
        var pv=id.indexOf(";");
        var NomeElementoeMail="diveMail";

        if (pv>0){
            eMail=id.split(";");
            NomeElementoeMail=eMail[1];
            idDest=eMail[2];
        } 
        
        eMail=recuperaHTMLElemento(NomeElementoeMail);
        
        var ragioneSociale=recuperaHTMLElemento("divRagioneSociale");

        if (eMail==''){
            attivaAlert(2,"Indirizzo Mail Cliente Assente!<br>Impossibile Proseguire con l'attivazione del B2B.","erroreB2B");
            return;
        }
        
        if (validazioneEmail(NomeElementoeMail,true,true)==false){
            attivaAlert(2,"Indirizzo Mail Cliente Non Valido!<br>Impossibile Proseguire con l'attivazione del B2B.","erroreB2B");
            return;
        }

        var jSon={"userName":eMail, "nome":ragioneSociale, "idCliente":idCliente, "idDest":idDest};
        var parametri={"tipoSalva":"attivaB2B", "dati":jSon}; 

        inviaRichiestaCentralino("nuovoUtente",parametri,elaboraAttivaB2B);
    } else {
        chiudiModalAlert("rispEliminaPreordine");
    }
}

function elaboraAttivaB2B(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        return "";
    }

    attivaAlert(4,"Attivazione Eseguita Correttamente.<br>E' stata inviata una mail al cliente per la prima attivazione.","okB2B");
    return;
}

function apriGrafici(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="graficiAnagrafiche.html?tipoAnagrafica="+tipoAnagrafica;
    }else{
        window.open("graficiAnagrafiche.html?tipoAnagrafica="+tipoAnagrafica,"_self");   
    }
    
}

function apriIncassa(e,tipo=''){
    if (tipo==""){
        tipo=tipoAnagrafica;
    }
    
    sessionStorage.setItem("saldo",recuperaHTMLElemento("divSaldo"));
    sessionStorage.setItem("scaduto",recuperaHTMLElemento("divScaduto"));
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="incassa.html?tipoAnagrafica="+tipo;
    }else{
        window.open("incassa.html?tipoAnagrafica="+tipo,"_self");   
    }
    
}

function apriAssortimenti(){
    var parametri={"nomeQuery":nomePagina+":assortimenti","tipoRisposta":"assortimenti","idCliente":idCliente,
                    "tipoQuery":"schedaClienti","chiamante":"assortimenti"
                    }; 

    inviaRichiestaCentralino("query",parametri,elaboraApriRubrica);
}

function selezionaAssortimento(e){
    var id=e.id.split(".")[1];
    var codiceAss=recuperaHTMLElemento("codiceAss."+id);
    var img=document.getElementById("img."+id)
    
    var appo=img.src.split("/")
    var tipoImg=appo[appo.length-1];
    
    if (tipoImg=="done.svg"){
        tipoOperazione="elimina";
    } else {
        tipoOperazione="salva";
    }

    var jSon={"cliente":idCliente, "codiceAss":codiceAss};
    
    var parametri={"tipoSalva":"assortimentiAnagrafiche", "tipoElimina":"assortimentiAnagrafiche", "dati":jSon, "tipoOperazione":tipoOperazione, "id":id}; 

    inviaRichiestaCentralino(tipoOperazione,parametri,elaboraselezionaAssortimento);
}

function elaboraselezionaAssortimento(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    var img=document.getElementById("img."+parametri.id)
    
    if (parametri.tipoOperazione=="elimina"){
        img.src="img/bianche/checkVuoto.svg";
    } else {
        img.src="img/bianche/done.svg";
    }
}
function apriImmaginiAnagrafica(){
    apriImmaginiMultiple('ANAGRAFICHE',idCliente)
}

function recuperaStatoB2B(){
    var parametri;
    parametri={"tipoRisposta":"StatoB2B","tipoQuery":"querySpecifica","db":"login","nomeTabella":"statoB2B", "idClienteB2B":idCliente};
    inviaRichiestaCentralino("query",parametri,elaboraRecuperaStatoB2B);
}

function elaboraRecuperaStatoB2B(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    var cmd;

    if (risp.error!=''){
        return "";
    }

    if (data[0].id!=undefined){
        try {
            document.getElementById("cmdStatoB2B").classList.remove("hide");   
        } catch (error) {
            
        }
    }
}

function avvisoB2B(){
    attivaAlert(4,"B2B Attivo!","AvvisoB2B");
}