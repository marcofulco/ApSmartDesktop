query['ListaClienti.html']=new Array;
query['ListaClienti.html']['OFFSET']=0;
query['ListaClienti.html']['FETCH']=100;
query['ListaClienti.html']['MAXFETCH']=0;
query['ListaClienti.html']['COUNT']="id";
query['ListaClienti.html']['textBoxRicerca']="txtRicercaCliente";


query['ListaClienti.html:localita']=new Array;
query['ListaClienti.html:localita']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaLocalita(this)">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['ListaClienti.html:province']=new Array;
query['ListaClienti.html:province']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaProv(this)">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['ListaClienti.html:zone']=new Array;
query['ListaClienti.html:zone']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaZona(this)">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['ListaClienti.html:famiglie']=new Array;
query['ListaClienti.html:famiglie']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaFamiglia(this)">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

query['ListaClienti.html:agente']=new Array;
query['ListaClienti.html:agente']['modello1Riga']='<li><a id="{ID}" href="#" onclick="listaDaAgente(this)">{descrizione1}<img src="img/bianche/forward.svg"></a></li>';

var parametriNC={"visMandante":0};

var localita="";
var prov="";
var idZona=0;
var idFamiglia=0;
var idAgente=0;
var aperti=0;
var ricerca="";
var mandante=0;
var filtroPivaCf=false;
tipoAnagrafica=recuperaParametroHRef("CLIENTE");

window.addEventListener("load", function(event) {
    
    if(getParamValue('modRichiamo')!=false){
        document.getElementById("divTestaSuperiore").remove();
        var corpo=document.getElementById('divCorpo');
        corpo.classList.remove('posTopA122p');
        corpo.classList.add('posTopA60p');
        // hide('cmdNuovoCliente');
        var nuovoCli=document.getElementById('cmdNuovoCliente');
        nuovoCli.setAttribute('href','nuovoCliente.html?modRichiamo='+xIdDispositivo);
        setTimeout(() => {
            document.getElementById('txtRicercaCliente').focus();
        }, 500);
        
        var x=document.getElementById('divBase');
        x.style.setProperty('top','0px','important');
        
    }
    if (xOffLine=="true"){
        caricaScriptOffLine(apriDBOffLine);
    } else {
        recuperaParametri();
    }
   
});

function apriDBOffLine(){
    apriIndexedDB(nomeIndexedDB,recuperaParametri);
}

function recuperaParametri(){
    if (xOffLine=="true"){
        res=localStorage.getItem("offLine."+nomePagina+".parametri");
        elaboraParametri(res);
    } else {
        var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
        inviaRichiestaCentralino("parametri",parametri,elaboraParametri,"divCorpo");
    }
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

    if (parametriNC["visMandante"]==1 && tipoAnagrafica=="CLIENTE"){
        var sezione=nomePagina;

        if (tipoAnagrafica!=""){
            sezione+="."+tipoAnagrafica;
        }
        mandante=window.sessionStorage.getItem(sezione+".mandante");

        document.getElementById("divMandante").classList.remove("hide");
        document.getElementById("divRicercaCliente").classList.add("w75-150p");
        document.getElementById("divRicercaCliente").classList.remove("w100-150p");
        avviaCarDatiMandante();
    }
    if(parametriNC.nascondiSaldo==1){
        document.getElementById("divAperti").classList.add("hide");
    }
    if(parametriNC.filtroRicercaPivaCf==1){
        document.getElementById('filtroRicercaPivaCf').classList.remove('hide');
    }
    if (xIdCliente>0){
        var cmd=document.getElementById("cmdNuovoCliente");
        cmd.style.display="none";

        var lab=cmd.parentNode.getElementsByTagName("label");
        for (x in lab){
            try {
                lab[x].setAttribute("class","w25");
            } catch (error) {
                
            }
        }

        document.getElementById("divPiede").classList.add("hide");
    } else if (xIdAgente==0){
        document.getElementById("cmdAgente").classList.remove("hide");
    }
    var script = document.createElement("script");
    script.setAttribute("src", "componenti/elementiListaClienti.js");
    document.body.appendChild(script);

    script.onload = function () {
    query['ListaClienti.html']['modello2Righe']=elementiListaClienti;
    carDatiListaClienti();
    }
}

function elencoClientiScroll(ec, pagina, txtRicerca="") {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;
    
    window.sessionStorage.setItem(nomePagina+".elenco"+tipoAnagrafica+".scroolTop",scrollPos);

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        AvviaCarDatiElencoClienti("elencoClienti","",false);
    }
}

function listaDaLocalita(a){
    localita=a.getAttribute("ID").replace("'","''");
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleL").checked=false;
    document.getElementById("lblFiltroLocalita").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("cmdLocalita").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    segnaStato(a,"","","",tipoAnagrafica);
}

function eliminaFiltroLocalita(a){
    localita="";
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleL").checked=false;
    document.getElementById("lblFiltroLocalita").innerHTML="Selezione: ";
    document.getElementById("cmdLocalita").removeAttribute("style");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoLocalita.id");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoLocalita.descrizioneId");
}

function listaDaProv(a){
    prov=a.getAttribute("ID").replace("'","''");
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleP").checked=false;
    document.getElementById("lblFiltroProv").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("cmdProv").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    segnaStato(a,"","","",tipoAnagrafica);
}

function eliminaFiltroProv(a){
    prov="";
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleP").checked=false;
    document.getElementById("lblFiltroProv").innerHTML="Selezione: ";
    document.getElementById("cmdProv").removeAttribute("style");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoProvince.id");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoProvince.descrizioneId");
}

function listaDaZona(a){
    idZona=a.getAttribute("ID");
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleZ").checked=false;
    document.getElementById("lblFiltroZona").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("cmdZona").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    segnaStato(a,"","","",tipoAnagrafica);
}

function eliminaFiltroZona(a){
    idZona=0;
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleZ").checked=false;
    document.getElementById("lblFiltroZona").innerHTML="Selezione: ";
    document.getElementById("cmdZona").removeAttribute("style");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoZone.id");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoZone.DescrizioneId");
}

function listaDaFamiglia(a){
    idFamiglia=a.getAttribute("ID");
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleF").checked=false;
    document.getElementById("lblFiltroFamiglia").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("cmdFamiglia").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    segnaStato(a,"","","",tipoAnagrafica);
}

function eliminaFiltroFamiglia(a){
    idFamiglia=0;
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleF").checked=false;
    document.getElementById("lblFiltroFamiglia").innerHTML="Selezione: ";
    document.getElementById("cmdFamiglia").removeAttribute("style");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoFamiglie.id");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoFamiglie.descrizioneId");
}

function listaDaAgente(a){
    idAgente=a.getAttribute("ID");
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleA").checked=false;
    document.getElementById("lblFiltroAgente").innerHTML="Selezione: "+a.innerHTML.substring(0,a.innerHTML.indexOf('<img'));
    document.getElementById("cmdAgente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    segnaStato(a,"","","",tipoAnagrafica);
}

function eliminaFiltroAgente(a){
    idAgente=0;
    AvviaCarDatiElencoClienti("elencoClienti");

    document.getElementById("nav-toggleA").checked=false;
    document.getElementById("lblFiltroAgente").innerHTML="Selezione: ";
    document.getElementById("cmdAgente").removeAttribute("style");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoAgente.id");
    eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoAgente.descrizioneId");
}

function listaDaSceltaMultipla(tipo,id){
    idZona="";

    var ul=document.getElementById("elencoZone");
    var chk=ul.getElementsByTagName("input");
    for (i=0;i<chk.length;i++){
        if (chk[i].checked){
            idZona+=chk[i].getAttribute("name")+",";
        }
    }

    if (idZona!=""){
        idZona=idZona.substring(0,idZona.length-1);
    }

    AvviaCarDatiElencoClienti("elencoClienti");

    if (idZona!=""){
        //document.getElementById("nav-toggleZ").checked=false;
        document.getElementById("lblFiltroZona").innerHTML="Selezione: "+idZona;
        document.getElementById("cmdZona").style.border="3px solid rgba("+xColoreSecondario+", 1)";
        sessionStorage.setItem("ListaClienti.html."+tipoAnagrafica+".elencoZone.id",idZona);
        sessionStorage.setItem("ListaClienti.html."+tipoAnagrafica+".elencoZone.descrizioneId",idZona);
    } else {
        //document.getElementById("nav-toggleZ").checked=false;
        document.getElementById("lblFiltroZona").innerHTML="Selezione: ";
        document.getElementById("cmdZona").removeAttribute("style");
        eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoZone.id");
        eliminaStato("ListaClienti.html."+tipoAnagrafica+".elencoZone.descrizioneId");
    }
}

function chkApertiClick(e){
    if (e.checked) {
        aperti=1;
    } else {
        aperti=0;
    }

    window.sessionStorage.setItem(nomePagina+"."+tipoAnagrafica+".chkSaldo",e.checked);

    AvviaCarDatiElencoClienti("elencoClienti");
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

    var parametri={"tipoQuery":"listaClienti","tipoRisposta":tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca, "tipoElenco":righe, 
        "ricarica":ricarica, "scrollTop":scrollTop,"azienda":0,"idCliente":0,"idAgente":idAgente,"localita":localita,"prov":prov,
        "idZona":idZona,"idFamiglia":idFamiglia,"aperti":aperti,"offSet":query[nomeQuery]['OFFSET'],"fetch":query[nomeQuery]['FETCH'],
        "chiamante":tipoRisposta, "tipoAnagrafica":tipoAnagrafica, "mandante":mandante
        }; 
    parametri.md5=localStorage.getItem(tipoRisposta+".md5");
    
    elencoInCaricamento=1;
    
    if (xOffLine=="true"){
        if (parametri.tipoRisposta!="elencoClienti"){
            var data=JSON.parse(localStorage.getItem(parametri.tipoRisposta+".jSon"));
            if (data!=undefined){
                popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop);
            }
        } else {
            parametri.campiFiltro=[{"nomeChiave":"localita","nomeParametro":"localita","tipoControllo":"="},{"nomeChiave":"prov","nomeParametro":"prov","tipoControllo":"="},
                                    {"nomeChiave":"idFamiglia","nomeParametro":"idFamiglia","tipoControllo":"="},{"nomeChiave":"idZona","nomeParametro":"idZona","tipoControllo":"="},
                                    {"nomeChiave":"saldo","nomeParametro":"aperti","tipoControllo":">0","nomeIterazione":"SALDO"}
                                  ];
            parametri.campiFiltroIN=[{"nomeChiave":"MANDANTI","nomeParametro":"mandante"}];
            parametri.nomeTabellaOrdinata="listaClienti";
            
            if (filtroPivaCf==true){
                ciclaTabellaIndexedDBSemplice("clienti",ricerca.toUpperCase(),(res)=>{
                    if(res.length==0){
                        res=[0];
                    }
                    var obj={
                        "parametri":parametri,
                        "risposta":res,
                        'error':''
                    }
                    var resJ=JSON.stringify(obj);
                    elaboraRisposta(resJ)
                },{'limite':10},['PIVA','CF']);
                return;
            }
            leggiTabellaIndexedDB("clienti",parametri,"ricerca",elaboraRisposta);
        }

        return;
    }

    inviaRichiestaCentralino("query",parametri,elaboraRisposta,tipoRisposta);
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
    
    if (parametri.md5!=risp.md5){
        sessionStorage.setItem(nomeSession+".md5",risp.md5);
        sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
    }

    if (parametri.tipoRisposta=="elencoClienti"){
        sessionStorage.setItem(nomeOS+".offSet",parametri.offSet);
        query[nomePagina]['OFFSET']+=parametri.fetch;
    } 
    
    if (xOffLine!='true'){
        data=verificaMd5(parametri.tipoRisposta,parametri,risp,data);
    }
    
    popolaElencoDaJson(data,parametri.tipoRisposta,parametri.tipoElenco,parametri.nomeQuery,parametri.ricarica,parametri.scrollTop);

    elencoInCaricamento=0;

    if (parametri.tipoRisposta=="elencoZone"){
        if (tipoAnagrafica=="ANAGRAFICA" && idZona!=''){
            var m=idZona.split(",");
            for (z in  m){
                document.getElementById("chk."+m[z]).checked=true;
            }
        }
    }
}

function nomeSessionJson(parametri){
    if (parametri.tipoRisposta=="elencoClienti"){
        return nomePagina+"."+tipoAnagrafica+"."+parametri.tipoRisposta+"."+parametri.ricerca+"."+parametri.localita+"."+parametri.prov+"."+parametri.idZona+"."+parametri.idFamiglia+"."+parametri.aperti+"."+parametri.idAgente+"."+parametri.offSet;
    } else{
        return nomePagina+"."+tipoAnagrafica+"."+parametri.tipoRisposta;
    }
}

function nomeSessionOffSet(parametri){
    if (parametri.tipoRisposta=="elencoClienti"){
        return nomePagina+"."+tipoAnagrafica+"."+parametri.tipoRisposta+"."+parametri.ricerca+"."+parametri.localita+"."+parametri.prov+"."+parametri.idZona+"."+parametri.idFamiglia+"."+parametri.aperti+"."+parametri.idAgente;
    } else{
        return nomePagina+"."+tipoAnagrafica+"."+parametri.tipoRisposta;
    }
}

function carDatiListaClienti(){    
    aperti=0;
    ricerca="";
    prov="";
    localita="";
    idZona=0;
    idFamiglia=0;

    var idLocalita=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoLocalita.id");
    var idProv=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoProvince.id");
    var xidZona=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoZone.id");
    var xidFamiglia=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoFamiglie.id");
    var desZona=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoZone.descrizioneId");
    var desFamiglia=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoFamiglie.descrizioneId");
    var filter=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".filter");
    var chk=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".chkSaldo");
    var scroolTop=window.sessionStorage.getItem(nomePagina+".elenco"+tipoAnagrafica+".scroolTop");
    var zIdAgente=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoAgente.id");
    var desAgente=window.sessionStorage.getItem(nomePagina+"."+tipoAnagrafica+".elencoAgente.descrizioneId");

    if (tipoAnagrafica!="ANAGRAFICA"){
        if (chk=="true"){
            document.getElementById("chkAperti").setAttribute("checked","true");
            aperti=1;
        }
    }

    switch (tipoAnagrafica){
        case "CLIENTE":
            document.getElementById("lblRicerca").innerHTML="Ricerca Cliente"
            document.getElementById("txtRicercaCliente").setAttribute("placeholder","Ricerca Cliente ...");
            document.head.getElementsByTagName("title")[0].innerHTML="Lista Clienti";
        break;
        case "FORNITORE":
            document.getElementById("lblRicerca").innerHTML="Ricerca Fornitore"
            document.getElementById("txtRicercaCliente").setAttribute("placeholder","Ricerca Fornitore ...");
            document.head.getElementsByTagName("title")[0].innerHTML="Lista Fonritori";
        break;
        case "ANAGRAFICA":
            document.getElementById("lblRicerca").innerHTML="Ricerca Anagrafica"
            document.getElementById("txtRicercaCliente").setAttribute("placeholder","Ricerca Anagrafica ...");
            document.head.getElementsByTagName("title")[0].innerHTML="Lista Anagrafiche";
            document.getElementById("divAperti").style.display="none";
            query['ListaClienti.html:zone']['modello1Riga']=elementiFiltriSceltaMultipla;
        break;
    }

    if (idLocalita){
        localita=idLocalita.replace("'","''");
        document.getElementById("lblFiltroLocalita").innerHTML="Selezione: "+idLocalita;
        document.getElementById("cmdLocalita").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    if (idProv){
        prov=idProv.replace("'","''");
        document.getElementById("lblFiltroProv").innerHTML="Selezione: "+idProv;
        document.getElementById("cmdProv").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    if (xidZona){
        idZona=xidZona;
        document.getElementById("lblFiltroZona").innerHTML="Selezione: "+desZona;
        document.getElementById("cmdZona").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    if (xidFamiglia){
        idFamiglia=xidFamiglia;
        document.getElementById("lblFiltroFamiglia").innerHTML="Selezione: "+desFamiglia;
        document.getElementById("cmdFamiglia").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    if (zIdAgente){
        idAgente=zIdAgente;
        document.getElementById("lblFiltroAgente").innerHTML="Selezione: "+desAgente;
        document.getElementById("cmdAgente").style.border="3px solid rgba("+xColoreSecondario+", 1)";
    }

    if (filter) {
        ricerca=filter;
        var txtRicerca=document.getElementById("txtRicercaCliente");
        txtRicerca.setAttribute("value",filter);
    }

    AvviaCarDatiElencoClienti("elencoLocalita","localita",true,1);
    AvviaCarDatiElencoClienti("elencoProvince","province",true,1);
    AvviaCarDatiElencoClienti("elencoZone","zone",true,1);
    AvviaCarDatiElencoClienti("elencoFamiglie","famiglie",true,1);
    AvviaCarDatiElencoClienti("elencoAgente","agente",true,1);

    var tipoRisposta="elencoClienti";
    var parametri={"tipoQuery":"listaClienti","tipoRisposta":tipoRisposta,"ricerca":ricerca,"nomeQuery":nomePagina,"tipoElenco":"elencoClienti",
        "azienda":0,"idCliente":0,"idAgente":idAgente,"localita":localita,"prov":prov,"scrollTop":scroolTop,
        "idZona":idZona,"idFamiglia":idFamiglia,"aperti":aperti,"chiamante":tipoRisposta, "tipoElenco":2
        }; 

    var nomeOS=nomeSessionOffSet(parametri);
    os=sessionStorage.getItem(nomeOS+".offSet");
    
    if (os>0 && xOffLine!="true"){
        while (query[nomePagina]['OFFSET']<=os){
            parametri.offSet=query[nomePagina]['OFFSET'];
            var nomeSession=nomeSessionJson(parametri);
            parametri.ricarica=(query[nomePagina]['OFFSET']==0);

            console.log(nomeSession);

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

function avviaCarDatiMandante(){
    var parametri;

    parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"Mandante", "select":"cmbMandante"};
    parametri.md5=localStorage.getItem("cmbMandante.md5");

    if (xOffLine=="true"){
        var data=JSON.parse(localStorage.getItem("cmbMandante.jSon"));
        popolaSelectDaJSON(data,parametri.select);

        if (mandante!=0){
            valorizzaValueElemento(parametri.select,mandante);
        }
    
        return;
    }

    inviaRichiestaCentralino("query",parametri,elaboraCarDatiMandante,"divCorpo");
}

function elaboraCarDatiMandante(res){
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
    
    data=verificaMd5(parametri.select,parametri,risp,data);

    popolaSelectDaJSON(data,parametri.select);

    if (mandante!=0){
        valorizzaValueElemento(parametri.select,mandante);
    }   
}

function apriSchedaCliente(e,idCli,ragSoc){
    
    if(getParamValue('modRichiamo')!=false){
        var obj={
            'id':idCli,
            'ragioneSociale':ragSoc
        }
        
        obj.token=xTkCom;
        window.sessionStorage.removeItem(nomePagina+"."+tipoAnagrafica+".filter");
        window.parent.postMessage(JSON.stringify(obj), '*');
        return
    }
    if (tipoAnagrafica=="CLIENTE"){
        window.sessionStorage.setItem("idCliente",idCli);
        window.sessionStorage.setItem("ragioneSociale", ragSoc);
    } else {
        window.sessionStorage.setItem("idFornitore",idCli);
        window.sessionStorage.setItem("ragioneSocialeF", ragSoc);
    }    
    
    window.sessionStorage.setItem("idMandante",mandante);
    window.sessionStorage.setItem("desMandante",getSelectedSelectText("cmbMandante"));

    var a=e.getElementsByTagName("a")
    segnaStato(a[0],"elencoClienti","","",tipoAnagrafica);
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="schedaCliente.html?tipoAnagrafica="+tipoAnagrafica;
    }else{
        window.open("schedaCliente.html?tipoAnagrafica="+tipoAnagrafica,"_self");
    }
    
}

function clickBack(){
    if (xTarget=="_blank") {
        window.close();
    } else {
        open ("mainPage.html",xTarget);
    }
}

function changeSelectPaginaCorrente(s){
    mandante=recuperaValueElemento("cmbMandante");
    AvviaCarDatiElencoClienti("elencoClienti");  

    var sezione=nomePagina;

    if (tipoAnagrafica!=""){
        sezione+="."+tipoAnagrafica;
    }
    window.sessionStorage.setItem(sezione+".mandante", mandante);
}
function ricercaPivaCf(input){
    
    for(var i = 0; i < input.childNodes.length; i++){
        
        if(input.childNodes[i].tagName === "IMG"){
            console.log(input.childNodes[i].src)
            if(input.childNodes[i].src.indexOf('img/bianche/checkVuoto.svg')!=-1){
                input.childNodes[i].src="img/bianche/check.svg";
                filtroPivaCf=true;
            }else{
                input.childNodes[i].src="img/bianche/checkVuoto.svg";
                filtroPivaCf=false;
            }
            break
        }
    }
    AvviaCarDatiElencoClienti("elencoClienti");
}