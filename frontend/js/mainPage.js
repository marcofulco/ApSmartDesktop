var tipoGrafico;
var primoAvvio=true;

var idTabSel=localStorage.getItem(nomePagina+":"+xIdConfigurazione+":"+tipoAnagrafica+":"+xUserCom+".tabSelect");
var xTipoGrafico=sessionStorage.getItem(nomePagina+".tipoGrafico");
var xAnno=sessionStorage.getItem(nomePagina+".anno");
var xMese=sessionStorage.getItem(nomePagina+".mese");
var xGiorno=sessionStorage.getItem(nomePagina+".giorno");
var xParametriPagina={"dataAPFineMese":0, "modificheGuajana":0, "comeAgenti":0, "noUtile":0, "attivaPulsantiera":0, "modificheDenaro":0, "noPrelevatoSuOrdini":1, 
                        "righeOrdiniUgualeQu":0, "mostraPalletSuOrdini":0, "righeOrdiniUgualeNumero":1, "mostraInternetSuOrdini":0, "separaDDT":0, "mostraStatoArticoli":0,
                        "pulsantiConDescrizione":0, "mostraTabLink":0, "nonFiltrareAzienda":0, "mostraProduzione":0, "mostraAccessi":0, "idDest":0
                     };

var div=document.getElementById("divTipoGrafico");
var divAnno=document.getElementById("divAnno");
var divMese=document.getElementById("divMese");
var divGiorno=document.getElementById("divGiorno");

var sel;
var op;

var fatturato=1;
var ddt=0;
var ordini=0;
var incassi=0;
var ingressi=0;
var pagamenti=0;
var articoli=0;
var produzione=0;
var accessi=0;
var vendutoCasse=0;
var tabDaSpostare;
document.getElementById("tabFatture").classList.add("tabLinkSelezionato");

if(xIdCliente>0 || xIdVettore>0){
    var eBase=document.getElementById("divGrafico");
    eBase.classList.add("hide");
    eBase=document.getElementById("divPulsanti");
    eBase.classList.remove("hide");
    if(xParametriPagina.attivaSlideShow!=undefined && xParametriPagina.attivaSlideShow==1){
        attivaSlideShow('slideShowContainer');
    }
}

if (xTipoGrafico!=undefined){
    var span=div.getElementsByTagName("span");
    span[0].innerHTML=xTipoGrafico;

    var idTipo;

    switch (xTipoGrafico){
        case "Ora":
        case "Giorno":
            idTipo=1;
            break;
        case "Mese":
            idTipo=2;
            break;
        case "Anno":
            idTipo=3;
            break;
    }

    span[0].setAttribute("id",idTipo);

    sel=div.getElementsByTagName("select");
    op=sel[0].getElementsByTagName("option")
    op[idTipo-1].setAttribute("selected","selected");
} 

var d=new Date();
var span=divMese.getElementsByTagName("span");

var nMese;

if (xMese!=undefined){
    nMese=Number(xMese)-1;
} else {
    nMese=d.getMonth();
}

span[0].innerHTML=nomiMesi[nMese];
var strMese=new String(nMese+=1);
span[0].setAttribute("id",(strMese.length==1) ? "0"+strMese : strMese);
sel=divMese.getElementsByTagName("select");
op=sel[0].getElementsByTagName("option")
op[nMese-1].setAttribute("selected","selected");

var span=divAnno.getElementsByTagName("span");
var anno;

if (xAnno==undefined){
    xAnno=d.getFullYear();
}

anno=xAnno;

span[0].innerHTML=xAnno;
span[0].setAttribute("id",xAnno);

var nGiorno;
if (xGiorno!=undefined){
    nGiorno=Number(xGiorno)-1;
} else {
    nGiorno=d.getDate();
}

var span=divGiorno.getElementsByTagName("span");

sel=divGiorno.getElementsByTagName("select");
op=sel[0].getElementsByTagName("option")
op[nGiorno-1].setAttribute("selected","selected");

span[0].innerHTML=new String(nGiorno);
span[0].setAttribute("id",nGiorno);

avviaCarDati("selAnno");

if (xIdCliente>0 || xIdAgente>0){
    document.getElementById("divAgente").classList.add("hide");
    document.getElementById("divTipoGrafico").classList.remove("marg1Bottom");
    document.getElementById("divTorta").classList.add("hide");
} else {
    avviaCarDati("cmbAgente");
}

window.addEventListener("load", function(event) {
    setTimeout( function() { 
        document.title=xNomeApplicazione;
               
        if (xIdCliente>0){
            document.getElementById("tabLink").style.display="none";
            document.getElementById("cmdAggiorna").classList.remove("posTopA45p");
        }        

        if (xOffLine=="true"){
            document.getElementById("tabIncassi").style.display="none";
            document.getElementById("tabPagamenti").style.display="none";
            res=localStorage.getItem("offLine."+nomePagina+".parametri");
            elaboraParametri(res);
        } else {
            var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
            
            elencoInCaricamento=1;

            inviaRichiestaCentralino("parametri",parametri,elaboraParametri,"body");
        }

        avviaCarDatiSchedaCliente(false,'',false,'',true);
    }, 50);
});

function tabClick(elmnt){
    //Nascondo tutti gli elementi con class="tabcontent"
    var i, tablinks;
    if(elmnt.id!='tabSlideShow' && elmnt.id!='tabSelezionaGrafico'){
        localStorage.setItem(nomePagina+":"+xIdConfigurazione+":"+tipoAnagrafica+":"+xUserCom+".tabSelect",elmnt.id);
    }

    //Rimuovo il colore di background
    // tablinks=document.getElementsByClassName("tablinkColonne");
    // for (i=0; i<tablinks.length; i++){
    //     tablinks[i].setAttribute("style","");
    // }
    tablinks=document.getElementsByClassName("tablink");
    if (tablinks.length>0){
        for (i=0; i<tablinks.length; i++){
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    } else {
        tablinks=document.getElementsByClassName("tablinkColonne");
        for (i=0; i<tablinks.length; i++){
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    }
    
    //Aggiungo uno specifico colore al pulsante usato per aprire il contenuto
    // elmnt.style.background = "rgb("+xColoreScuro+")";
    elmnt.classList.add("tabLinkSelezionato");

    fatturato=0;
    ordini=0;
    incassi=0;
    ingressi=0;
    pagamenti=0;
    ddt=0;
    articoli=0;
    produzione=0;
    accessi=0;
    vendutoCasse=0;

    var optRighe=document.getElementById("divRighe");
    var optValore=document.getElementById("divValore");
    var cmbAgente=document.getElementById("cmbAgente");
    var cmbOperatore=document.getElementById("cmbOperatore");
    var cmbRaggruppamentoCasse=document.getElementById("cmbRaggruppamentoCasse");
    var divAgente=document.getElementById("divAgente");
    var chkTorta=document.getElementById("divTorta");
    var lblOptRighe=document.getElementById("lblOptRighe");
    var divGraficiGenerali=document.getElementById("divGraficiGenerali");
    var divGraficiArticoli=document.getElementById("divGraficiArticoli");
    var divGenereGrafico=document.getElementById("divGenereGrafico");
    var cmbGenereGrafico=document.getElementById("cmbGenereGrafico");
    var divGiorno=document.getElementById("divGiorno");

    divGiorno.classList.add("hide");
    divGenereGrafico.classList.add("hide");
    
    var divNonAnticipati=document.getElementById("divNonAnticipati");

    divNonAnticipati.classList.add("hide");
    if(cmbRaggruppamentoCasse.parentElement.classList.contains("hide")==false){
        cmbRaggruppamentoCasse.parentElement.classList.add("hide");
    }
    var option=`<option value="1">Giorno</option>
        <option value="2">Mese</option>
        <option value="3">Anno</option>`;

    valorizzaHTMLElemento("cmbTipoGrafico",option);
    //cambiaSelezioneSelect("cmbTipoGrafico","0");
    var divTG=document.getElementById("divTipoGrafico");
    var span=divTG.getElementsByTagName("span");

    var sel=divTG.getElementsByTagName("select");
    var op=sel[0].getElementsByTagName("option")
    op[0].setAttribute("selected","selected");

    span[0].innerHTML="Giorno";
    span[0].setAttribute("id",0);

    // document.getElementById('slideShowContainerTabLink').innerHTML='';
    hide('slideShowContainerTabLink');
    if (xParametriPagina.righeOrdiniUgualeQu==1){    
        lblOptRighe.innerHTML="Qu.tà";
    } else if (xParametriPagina.righeOrdiniUgualeNumero==1){    
        lblOptRighe.innerHTML="N.ro";
    }

    if (!(xIdCliente>0 || xIdAgente>0)){
        divAgente.classList.remove("hide");
        divTorta.classList.remove("hide");
    }
    
    if (elmnt.getAttribute("id")=="tabFatture"){
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");

        if (!(xIdCliente>0 || xIdAgente>0)){
            valorizzaCheckedElemento("chkTorta",false);
            chkTorta.classList.add("hide");
            
            divGenereGrafico.classList.remove("hide");
            cmbGenereGrafico.innerHTML=`<option id="ggBarre" value="0">Barre</option>
                <option id="ggAgente" value="1">Agente</option>
                <option id="ggFamCli" value="5">Tipo Cliente</option>`;

            if (xParametriPagina.modificheIceCube==1){
                cmbGenereGrafico.innerHTML+=`<option id="ggArticolo" value="3">Articolo</option>
                    <option id="ggSFamiglia" value="4">S.Famiglia</option>`;
            } else {
                cmbGenereGrafico.innerHTML+=`<option id="ggFamiglia" value="2">Famiglia</option>`;
            }

            //cambiaSelezioneSelect("cmbGenereGrafico","0");
            var span=divGenereGrafico.getElementsByTagName("span");
        
            var sel=divGenereGrafico.getElementsByTagName("select");
            var op=sel[0].getElementsByTagName("option")
            op[0].setAttribute("selected","selected");
        
            span[0].innerHTML="Barre";
            span[0].setAttribute("id",0);
        }

        fatturato=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            if (cmbOperatore!=undefined){
                cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Agente</option>';
                cmbOperatore.id="cmbAgente"
                document.getElementById("primaOpzione").innerHTML="Seleziona Agente";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Agente";
                avviaCarDati("cmbAgente",true);
            }
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabDDT"){
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");

        if (!(xIdCliente>0 || xIdAgente>0)){
            valorizzaCheckedElemento("chkTorta",false);
            chkTorta.classList.add("hide");
            
            divGenereGrafico.classList.remove("hide");
            cmbGenereGrafico.innerHTML=`<option id="ggBarre" value="0">Barre</option>
                <option id="ggAgente" value="1">Agente</option>`;

            if (xParametriPagina.modificheIceCube==1){
                cmbGenereGrafico.innerHTML+=`<option id="ggArticolo" value="3">Articolo</option>
                    <option id="ggSFamiglia" value="4">S.Famiglia</option>`;
            } else {
                cmbGenereGrafico.innerHTML+=`<option id="ggFamiglia" value="2">Famiglia</option>`;
            }

            //cambiaSelezioneSelect("cmbGenereGrafico","0");
            var span=divGenereGrafico.getElementsByTagName("span");
        
            var sel=divGenereGrafico.getElementsByTagName("select");
            var op=sel[0].getElementsByTagName("option")
            op[0].setAttribute("selected","selected");
        
            span[0].innerHTML="Barre";
            span[0].setAttribute("id",0);
        }
        
        ddt=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            if (cmbOperatore!=undefined){
                cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Agente</option>';
                cmbOperatore.id="cmbAgente"
                document.getElementById("primaOpzione").innerHTML="Seleziona Agente";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Agente";
                avviaCarDati("cmbAgente",true);
            }
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabOrdini") {
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");

        ordini=1;

        if (xParametriPagina.noPrelevatoSuOrdini==1){
            divTorta.classList.add("hide");
            divAgente.classList.add("hide");
        }

        try {
            optRighe.classList.remove("hide");
            optValore.classList.remove("hide");

            if (cmbAgente!=undefined){
                cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
                cmbAgente.id="cmbOperatore"
                document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
                avviaCarDati("cmbOperatore",true);
            }
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabIngressi") {
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");

        ingressi=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            valorizzaCheckedElemento("optRighe",true);

            if (cmbAgente!=undefined){
                cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
                cmbAgente.id="cmbOperatore"
                document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
            }

            avviaCarDati("cmbOperatore",true);
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabIncassi") {
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");
        divNonAnticipati.classList.remove("hide");

        incassi=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            divTorta.classList.add("hide");

            valorizzaCheckedElemento("chkTorta",false);
            
            if (cmbOperatore!=undefined){
                cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Agente</option>';
                cmbOperatore.id="cmbAgente"
                document.getElementById("primaOpzione").innerHTML="Seleziona Agente";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Agente";
                avviaCarDati("cmbAgente",true);
            }
        } catch (error) {
            
        }
    }  else if (elmnt.getAttribute("id")=="tabPagamenti") {
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");

        pagamenti=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            divAgente.classList.add("hide");
            divTorta.classList.add("hide");

            valorizzaCheckedElemento("chkTorta",false);
            document.getElementById("divMese").classList.add("marg10Bottom");
        } catch (error) {
            
        }
    }  else if (elmnt.getAttribute("id")=="tabArticoli") {
        avviaCarDati("cmbDeposito");

        divGraficiArticoli.classList.remove("hide");
        divGraficiGenerali.classList.add("hide");

        articoli=1;
    } else if (elmnt.getAttribute("id")=="tabSlideShow") {
        divGraficiArticoli.classList.add("hide");
        divGraficiGenerali.classList.add("hide");
        
        attivaSlideShow('slideShowContainerTabLink');
        show('slideShowContainerTabLink');
    } else if (elmnt.getAttribute("id")=="tabProduzione"){
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");
        valorizzaCheckedElemento("chkTorta",false);
        chkTorta.classList.add("hide");
        
        divGenereGrafico.classList.remove("hide");
        cmbGenereGrafico.innerHTML=`<option id="ggBarre" value="0">Barre</option>
            <option id="ggOperatore" value="1">Operatore</option>`;

        //cambiaSelezioneSelect("cmbGenereGrafico","0");
        var span=divGenereGrafico.getElementsByTagName("span");
    
        var sel=divGenereGrafico.getElementsByTagName("select");
        var op=sel[0].getElementsByTagName("option")
        op[0].setAttribute("selected","selected");
    
        span[0].innerHTML="Barre";
        span[0].setAttribute("id",0);

        produzione=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            if (cmbAgente!=undefined){
                cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
                cmbAgente.id="cmbOperatore"
                document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
                avviaCarDati("cmbOperatore",true);
            } else {
                cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
                document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
                avviaCarDati("cmbOperatore",true);
            }
        } catch (error) {
            
        }
    }  else if (elmnt.getAttribute("id")=="tabUtilizzo"){
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");
        valorizzaCheckedElemento("chkTorta",false);
        chkTorta.classList.add("hide");
        divGiorno.classList.remove("hide");

        divGenereGrafico.classList.remove("hide");

        if (xSuperUser==1){
            cmbGenereGrafico.innerHTML=`<option id="ggLinee" value="0">Linee</option>
                <option id="ggGruppo" value="1">Gruppo Utenti</option>
                <option id="ggConfigurazione" value="2">Configurazione</option>`;
        } else {
            cmbGenereGrafico.innerHTML=`<option id="ggLinee" value="0">Linee</option>
                <option id="ggGruppo" value="1">Gruppo Utenti</option>`;
        }
        
        var span=divGenereGrafico.getElementsByTagName("span");
    
        var sel=divGenereGrafico.getElementsByTagName("select");
        var op=sel[0].getElementsByTagName("option")
        op[0].setAttribute("selected","selected");
    
        span[0].innerHTML="Linee";
        span[0].setAttribute("id",0);

        accessi=1;

        var option=`<option value="0">Ora</option>
            <option value="1">Giorno</option>
            <option value="2">Mese</option>
            <option value="3">Anno</option>`;

        valorizzaHTMLElemento("cmbTipoGrafico",option);
        
        var divTG=document.getElementById("divTipoGrafico");
        var span=divTG.getElementsByTagName("span");
    
        var sel=divTG.getElementsByTagName("select");
        var op=sel[0].getElementsByTagName("option")
        op[0].setAttribute("selected","selected");
    
        span[0].innerHTML="Ora";
        span[0].setAttribute("id",0);

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            if (cmbAgente!=undefined){
                cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Configurazione</option>';
                cmbAgente.id="cmbOperatore"
                document.getElementById("primaOpzione").innerHTML="Seleziona Configurazione";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Configurazione";
                avviaCarDati("cmbOperatore",true);
            } else {
                cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Configurazione</option>';
                document.getElementById("primaOpzione").innerHTML="Seleziona Configurazione";
                document.getElementsByName("spAgente")[0].innerHTML="Seleziona Configurazione";
                avviaCarDati("cmbOperatore",true);
            }

            if (xSuperUser==0){
                divAgente.classList.add("hide");
            }
        } catch (error) {
            
        }
    }else if(elmnt.getAttribute("id")=="tabSelezionaGrafico"){
        apriModalGrafico();
        return;
    }else if(elmnt.getAttribute("id")=="tabCasse"){
        divGraficiGenerali.classList.remove("hide");
        divGraficiArticoli.classList.add("hide");
        optRighe.classList.add("hide");
        optValore.classList.add("hide");
        divGiorno.classList.remove("hide");
        var option=`
            <option value="1">Giorno</option>
            <option value="2">Mese</option>
            <option value="3">Anno</option>`;

        valorizzaHTMLElemento("cmbTipoGrafico",option);
        vendutoCasse=1;
        if (cmbAgente!=undefined){
         if(cmbAgente.parentElement.classList.contains("hide")==false){
            cmbAgente.parentElement.classList.add("hide");
         }
        } 
        if(cmbOperatore!=undefined){
            if(cmbOperatore.parentElement.classList.contains("hide")==false){
                cmbOperatore.parentElement.classList.add("hide");
            }
        }
        if(cmbRaggruppamentoCasse.parentElement.classList.contains("hide")==true){
            cmbRaggruppamentoCasse.parentElement.classList.remove("hide");
        }
        divGiorno.style.visibility="visible";
    }

    avviaCarDati();
    if(document.getElementById('modalCustom')!=undefined){
        chiudiModalCustom();
        document.getElementById('tabSelezionaGrafico').classList.add('tabLinkSelezionato');
    }
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.parametriGenerali!=undefined){
        xParametriGenerali=risp.parametriGenerali;
        sessionStorage.setItem("parametriGenerali",JSON.stringify(xParametriGenerali));
    }

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        avviaCarDati();
    } else {
        for (x in data){
            if (!isNaN(Number(data[x]["valore"]))){
                xParametriPagina[data[x]["parametro"]]=Number(data[x]["valore"]);
            } else {
                xParametriPagina[data[x]["parametro"]]=data[x]["valore"];
            }  
        }

        try {
            sessionStorage.setItem("whatsappTel", xParametriPagina.whatsappTel);

            if(xParametriPagina.attivaPulsantiera==1){
                var eBase=document.getElementById("divGrafico");
                eBase.classList.add("hide");
                eBase=document.getElementById("divPulsanti");
                eBase.classList.remove("hide");

            }
        } catch (error) {
            console.log(error)
        }
        
        if (xParametriPagina.modificheDenaro==1){
            document.getElementById("menu").classList.add("hide");
        }

        if (xParametriPagina["modificheGuajana"]==0){
            try {
                var tab=document.getElementById("tabOrdini");
                tab=document.getElementById("tabIngressi");
                tab.parentNode.removeChild(tab);
                tab=document.getElementById("tabFatture");
                tab=document.getElementById("tabIncassi");

                if (xIdAgente>0 || xParametriPagina.comeAgenti==1){
                    tab=document.getElementById("tabPagamenti"); 
                    tab.parentNode.removeChild(tab);
                }
            } catch (error) {
                
            }
        } else {
            if (xIdAgente>0 || xParametriPagina.comeAgenti==1){
                try {
                    var tab=document.getElementById("tabIngressi");
                    tab.parentNode.removeChild(tab);
                    var tab=document.getElementById("tabPagamenti");
                    tab.parentNode.removeChild(tab);
                    tab=document.getElementById("tabFatture");
                    tab=document.getElementById("tabOrdini");
                    tab=document.getElementById("tabIncassi");
                } catch (error) {
                    
                }
            }
        }

        if (xParametriPagina.separaDDT==1){
            tab=document.getElementById("tabDDT");
            tab.classList.remove("hide");
        }

        if (xParametriPagina.mostraStatoArticoli==1){
            tab=document.getElementById("tabArticoli");
            tab.classList.remove("hide");
        }

        if (xParametriPagina.mostraTabLink==1){
            tab=document.getElementById("tabSlideShow");
            tab.classList.remove("hide");
        }

        if (xParametriPagina.mostraProduzione==1){
            tab=document.getElementById("tabProduzione");
            tab.classList.remove("hide");
        }

        if (xParametriPagina.mostraAccessi==1){
            tab=document.getElementById("tabUtilizzo");
            tab.classList.remove("hide");
        }
        if (xParametriPagina.mostaVendutoCasse==1){
            tab=document.getElementById("tabCasse");
            tab.classList.remove("hide");
        }
        var lab=document.getElementById("tabLink").getElementsByTagName("button");
        var n=0;
        tabDaSpostare=new Array;
        for (x in lab){
            if (x<=lab.length){
                c=lab[x].getAttribute("class");
                if (c.indexOf("hide")==-1){
                    n+=1;
                    if(n>3){
                        tabDaSpostare.push(lab[x].id);
                    }
                }
            }
        }
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        if (n>0){
            if(n>4 && vw<1024){
                for(var t=0;t<lab.length;t++){
                    // console.log(lab[t])
                    if(tabDaSpostare.indexOf(lab[t].id)!=-1){
                        lab[t].classList.add('hide');
                    }else{
                        lab[t].classList.add('w25');
                    }
                    
                }
                document.getElementById('tabSelezionaGrafico').classList.remove('hide');
                }else{
                // var t=0;
                var varW=arrotonda(100/n,0);
                if (varW*n>100){
                    varW-=1;
                }

                for (x in lab){
                    try {
                        if (!lab[x].classList.contains("hide")){
                            // if (x!=lab.length-1){
                                lab[x].classList.add("w"+varW);
                                t+=varW;
                            // } else {
                            //     varW=100-t;
                            //     lab[x].classList.add("w"+varW);
                            // }
                        }
                    } catch (error) {
                        
                    }
                }
            }
        }

        if (idTabSel!=undefined){
            var tab=document.getElementById(idTabSel);
        
            if (tab!=undefined){
                tabClick(tab);
            }
        } else {
            avviaCarDati();
        }

        if(xParametriPagina.attivaSlideShow!=undefined && xParametriPagina.attivaSlideShow==1 && (xIdCliente>0 || xParametriPagina.attivaPulsantiera==1)){
            attivaSlideShow();
        }

        if(localStorage.getItem('linkRapidoStorage')!=undefined){
            var link =localStorage.getItem('linkRapidoStorage')
            localStorage.removeItem('linkRapidoStorage')
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href=link;
            }else{
                window.open(link,"_self");
            }
            
        }
    }

    if (risp.menu!=undefined){
        var menu=risp.menu;
        caricaMenu(menu);
    }
     
}

function avviaCarDati(select="",forzaAggiorna=false){
    if (select!="") {
        var tipoOp="";

        if (ingressi==1){
            tipoOp="I";
        } else if (produzione==1){
            tipoOp="P";
        } else if (accessi==1){
            tipoOp="A";
        }

        if (select=="cmbDeposito"){
            var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"depositi", "select":select};
        } else {
            var parametri={"tipoRisposta":"select","tipoQuery":"grafici","nomeQuery":nomePagina+":"+select, "select":select, "tipoOperatore":tipoOp};
            
            if (xOffLine=="true"){
                var data=JSON.parse(localStorage.getItem(select+".jSon"));
                popolaSelectDaJSON(data,parametri.select,xAnno);
                return;
            }

            parametri.md5=localStorage.getItem(select+".md5");

            if (select=="cmbAnno"){
                data=sessionStorage.getItem(nomePagina+".select.jSon");
            
                if (data!=undefined){
                    data=JSON.parse(data);
                    popolaSelectDaJSON(data,parametri.select,xAnno);
                    return;
                }
            }
        }
    } else if (articoli==1) {
        if (primoAvvio==true){
            var codice=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.codiceArticolo');
            var deposito=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.idDeposito');
            var conCriticita=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.chkCriticita');
        } else {
            var codice=recuperaValueElemento("ricercaArticoloVenditaBanco");
            var deposito=recuperaValueElemento("cmbDeposito");
            var conCriticita=recuperaCheckedElemento("chkCriticita");
        }
        
        primoAvvio=false;
        
        var parametri={"tipoRisposta":"articoli","tipoQuery":"grafici","nomeQuery":nomePagina+":articolo","tipoGrafico":tipoGrafico, 
                "azienda":0,"idCliente":0,"idAgente":idAgente,"dataDa":dataDa,"dataA":dataA,"dataDaP":dataDaP,"dataAP":dataAP,
                "desLbl":desLbl, "desLblP":desLblP, "d":d, "anno":anno, "mese":mese ,"chiamante":tipoGrafico,"fatture":fatturato,
                "ordini":ordini,"incassi":incassi,"idOperatore":idOperatore,"torta":torta, "ingressi":ingressi, "pagamenti":pagamenti,
                "noPrelevatoSuOrdini":xParametriPagina.noPrelevatoSuOrdini, "righeOrdiniUgualeQu":xParametriPagina.righeOrdiniUgualeQu,
                "mostraPalletSuOrdini":xParametriPagina.mostraPalletSuOrdini,"righeOrdiniUgualeNumero":xParametriPagina.righeOrdiniUgualeNumero,
                "ddt":ddt, "separaDDT":xParametriPagina.separaDDT, "articoli":articoli, "codice":codice, "deposito":deposito,"conCriticita":conCriticita
            };    

        inviaRichiestaCentralino("query",parametri,elaboraRisposta,"divCorpo");

        return;
    } else {
        var div=document.getElementById("divTipoGrafico");
        var divAnno=document.getElementById("divAnno");
        var divMese=document.getElementById("divMese");
        var divGiorno=document.getElementById("divGiorno");
        var divGenereGrafico=document.getElementById("divGenereGrafico");

        if (divGenereGrafico.classList.contains("hide")!=true){
            var genereGrafico=recuperaValueElemento("cmbGenereGrafico");
        } else {
            var genereGrafico=0;
        }

        var dataDa="";
        var dataA="";

        var dataDaP="";
        var dataAP="";

        var anno="";
        var mese="";
        var giorno="";

        var desLbl="";
        var desLblP="";

        var span=div.getElementsByTagName("span");
        tipoGrafico=span[0].innerHTML;

        sessionStorage.setItem(nomePagina+".tipoGrafico",tipoGrafico);

        span=divAnno.getElementsByTagName("span");
        sessionStorage.setItem(nomePagina+".anno",span[0].innerHTML);

        span=divMese.getElementsByTagName("span");
        sessionStorage.setItem(nomePagina+".mese",span[0].getAttribute("id"));

        var lblFatturatoP=document.getElementById("lblFatturatoP");
        
        if (tipoGrafico!="Anno"){
            divAnno.style.visibility="visible";

            span=divAnno.getElementsByTagName("span");
            anno=span[0].innerHTML;

            if (tipoGrafico!="Mese"){
                divMese.style.visibility="visible";
                
                span=divMese.getElementsByTagName("span");
                mese=span[0].getAttribute("id");
                
                if (tipoGrafico!="Giorno"){
                    
                    divGiorno.style.visibility="visible";
                
                    span=divGiorno.getElementsByTagName("span");
                    giorno=span[0].getAttribute("id"); 
                } else {
                    divGiorno.style.visibility="hidden";        
                }
                if(vendutoCasse==1){
                    divGiorno.style.visibility="visible";
                }
            } else {
                divMese.style.visibility="hidden";
                divGiorno.style.visibility="hidden";    
            }
        } else {
            divAnno.style.visibility="hidden";
            divMese.style.visibility="hidden";
            divGiorno.style.visibility="hidden";
        }
        
        if (anno==""){
            dataDa="01/01/2000";
            dataA="31/12/2030";

            desLbl="FT ";
            lblFatturatoP.style.visibility="hidden";
        } else if (mese==""){
            dataDa="01/01/"+anno;
            dataA="31/12/"+anno;

            dataDaP="01/01/"+(anno-1);

            d=new Date();

            if (anno==d.getFullYear()) {
                if (xParametriPagina.dataAPFineMese==0){
                    dataAP=(d.getDate())+"/"+(d.getMonth()+1)+"/"+(anno-1);
                } else {
                    dataAP=ultimoGiornoMeseIta(anno-1,d.getMonth()+1);
                }
                
            } else {
                dataAP="31/12/"+(anno-1);
            }
            
            desLbl="FT "+anno+' ';
            desLblP="FT "+(anno-1)+' ';
            lblFatturatoP.style.visibility="visible";
        } else if (giorno =="") {
            
            dataDa="01/"+mese+"/"+anno;
            dataDaP="01/"+mese+"/"+(anno-1);

            desLbl="FT "+nomiMesi[parseInt(mese)-1].substring(0,3)+' '+anno;
            desLblP="FT "+nomiMesi[parseInt(mese)-1].substring(0,3)+' '+(anno-1);
            
            lblFatturatoP.style.visibility="visible";

            switch (mese){
                case "04":
                case "06":
                case "09":
                case "11":
                    dataA="30/"+mese+"/"+anno; 
                    
                    d=new Date();
                
                    if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                        dataAP=(d.getDate())+"/"+(d.getMonth()+1)+"/"+(anno-1);
                    } else {
                        dataAP="30/"+mese+"/"+(anno-1);       
                    }

                    break;
                case "02":
                    int_d = new Date(anno, 2, 1);
                    d = new Date(int_d - 1);

                    if (d.getDate()==29){
                        dataA="29/"+mese+"/"+anno;       
                        
                        d=new Date();

                        if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                            dataAP=(d.getDate())+"/"+mese+"/"+(anno-1);
                        } else {
                            int_d = new Date(anno-1, 2, 1);
                            d = new Date(int_d - 1);

                            if (d.getDate()==29){
                                dataAP="29/"+mese+"/"+(anno-1);       
                            } else {
                                dataAP="28/"+mese+"/"+(anno-1);       
                            }
                        }
                    } else {
                        dataA="28/"+mese+"/"+anno;       
                        d=new Date();

                        if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                            dataAP=(d.getDate())+"/"+mese+"/"+(anno-1);
                        } else {
                            dataAP="28/"+mese+"/"+(anno-1);       
                        }
                    }

                    break;
                default:
                    dataA="31/"+mese+"/"+anno;      
                    
                    d=new Date();

                    if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                        dataAP=(d.getDate())+"/"+mese+"/"+(anno-1);
                    } else {
                        dataAP="31/"+mese+"/"+(anno-1);       
                    }
            }

            if (xParametriPagina.dataAPFineMese==1){
                d=new Date();

                if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                    dataAP=ultimoGiornoMeseIta(anno-1,d.getMonth()+1);
                }
            }
        } else {
            dataDa=giorno+"/"+mese+"/"+anno;
            dataA=giorno+"/"+mese+"/"+anno;
        }

        primoAvvio=false;

        var idAgente=recuperaValueElemento("cmbAgente");
        var idOperatore=getSelectedSelectText("cmbOperatore");
        var tipoRaggruppamento=recuperaValueElemento("cmbRaggruppamentoCasse");
        if (idAgente=="") {
            idAgente=0;
        }

        if (ddt==1){
            desLbl=desLbl.replace("FT","DDT");
            desLblP=desLblP.replace("FT","DDT");
        } else if (ordini==1){
            desLbl=desLbl.replace("FT","Ordinato");
            desLblP=desLblP.replace("FT","Ordinato");
        } else if (incassi==1){
            desLbl=desLbl.replace("FT","Incassato");
            desLblP=desLblP.replace("FT","Incassato");
        }  else if (pagamenti==1){
            desLbl=desLbl.replace("FT","Pagato");
            desLblP=desLblP.replace("FT","Pagato");
        } else if (produzione==1){
            desLbl=desLbl.replace("FT","Prodotti");
            desLblP=desLblP.replace("FT","Prodotti");
        }else if(vendutoCasse==1){
            
            giorno=recuperaValueElemento("cmbGiorno");
            mese=recuperaValueElemento("cmbMese");
            anno=recuperaValueElemento("selAnno");
            divGiorno.style.visibility='hidden';
            span=divMese.getElementsByTagName("span");
            mese=span[0].getAttribute("id");
            divAnno.style.visibility='hidden';
            if(recuperaValueElemento("cmbRaggruppamentoCasse")=="0" || recuperaValueElemento("cmbRaggruppamentoCasse")=="1"){
                if(tipoGrafico=='Giorno'){
                    divGiorno.style.visibility='visible';
                    divMese.style.visibility='visible';
                    divAnno.style.visibility='visible';
                }else if (tipoGrafico=='Mese'){
                    divGiorno.style.visibility='hidden';
                    divMese.style.visibility='visible';
                    divAnno.style.visibility='visible';
                    giorno='';
                }else if(tipoGrafico=='Anno'){
                    divGiorno.style.visibility='hidden';
                    divMese.style.visibility='hidden';
                    divAnno.style.visibility='visible';
                    giorno='';
                    mese='';
                }
        }else{
            if(tipoGrafico=='Giorno'){
                divGiorno.style.visibility='hidden';
                divMese.style.visibility='visible';
                divAnno.style.visibility='visible';
            }else if (tipoGrafico=='Mese'){
                divGiorno.style.visibility='hidden';
                divMese.style.visibility='hidden';
                divAnno.style.visibility='visible';
                giorno='';
            }else if(tipoGrafico=='Anno'){
                divGiorno.style.visibility='hidden';
                divMese.style.visibility='hidden';
                divAnno.style.visibility='hidden';
                giorno='';
                mese='';
            }
        }
        desLbl=desLbl.replace("FT","Venduto");
        desLblP=desLblP.replace("FT","Venduto");
        }

        var torta=0;

        if (recuperaCheckedElemento("chkTorta")){
            torta=1;
        }

        var nonAnticipati=0;

        if (!document.getElementById("divNonAnticipati").classList.contains("hide")){
            if (recuperaCheckedElemento("chkNonAnticipati")){
                nonAnticipati=1;
            }    
        }
        
        var parametri={"tipoRisposta":"grafico","tipoQuery":"grafici","nomeQuery":nomePagina+":"+tipoGrafico,"tipoGrafico":tipoGrafico, 
                        "azienda":0,"idCliente":0,"idAgente":idAgente,"dataDa":dataDa,"dataA":dataA,"dataDaP":dataDaP,"dataAP":dataAP,
                        "desLbl":desLbl, "desLblP":desLblP, "d":d, "anno":anno, "mese":mese, "giorno":giorno, "chiamante":tipoGrafico,"fatture":fatturato,
                        "ordini":ordini,"incassi":incassi,"idOperatore":idOperatore,"torta":torta, "ingressi":ingressi, "pagamenti":pagamenti,
                        "noPrelevatoSuOrdini":xParametriPagina.noPrelevatoSuOrdini, "righeOrdiniUgualeQu":xParametriPagina.righeOrdiniUgualeQu,
                        "mostraPalletSuOrdini":xParametriPagina.mostraPalletSuOrdini,"righeOrdiniUgualeNumero":xParametriPagina.righeOrdiniUgualeNumero,
                        "ddt":ddt, "separaDDT":xParametriPagina.separaDDT, "nonFiltrareAzienda":xParametriPagina.nonFiltrareAzienda, "produzione":produzione,
                        "genereGrafico":genereGrafico, "accessi":accessi, "nonAnticipati":nonAnticipati,"vendutoCasse":vendutoCasse,"tipoRaggruppamento":tipoRaggruppamento
                    };    

        if (xOffLine=="true"){
            var res=localStorage.getItem("offLine."+nomePagina+":"+tipoGrafico+"."+anno+"."+mese);
            if (res==null){
                res=JSON.stringify({"parametri":{"tipoRisposta":"grafico","tipoQuery":"grafici","nomeQuery":"mainPage.html:Giorno"},"error":"","query":"","console":"","risposta":[0]});
            }
            
            elaboraRisposta(res);            
            return;
        } else {
            var nomeSession=getSessionName(parametri);
            var jSon=sessionStorage.getItem(nomeSession+".jSon");
            jSon=undefined;
        }

        if (jSon!=undefined){
            if (forzaAggiorna==false){
                var data=JSON.parse(jSon);

                if (ordini==1 || ingressi==1){
                    if (torta==1){
                        caricaJSONOrdiniTorta(data,dataDaP,desLbl,desLblP,anno);
                    } else {
                        caricaJSONOrdini(data,desLbl,anno,torta);
                    }
                } else if (produzione==1) {
                    if (genereGrafico==0){
                        caricaJSONProduzione(data,desLbl,anno,torta)
                    } else {
                        caricaJSONTorta(data,parametri["dataDaP"],desLbl,desLblP,anno);
                    }
                } else if (accessi==1) {
                    if (genereGrafico==0){
                        caricaJSONAccessi(data,desLbl,anno,torta)
                    } else {
                        caricaJSONTorta(data,parametri["dataDaP"],desLbl,desLblP,anno);
                    }                    
                }else if(vendutoCasse==1){
                    caricaJSONVendutoCasse(data,dataDaP,desLbl,anno,torta);
                } else {
                    caricaJSON(data,dataDaP,desLbl,desLblP,anno,genereGrafico);
                }
                
                return;
            }
        }
    }

    if (accessi==1){
        parametri.db="login";
        parametri.idConfig=recuperaValueElemento("cmbOperatore");
        valorizzaHTMLElemento("lblFatturato","");

        if (xSuperUser==1){
            recuperaUtentiConnessi();
        }
    }

    if ((ordini==1 || ingressi==1) && select==""){
        inviaRichiestaCentralino("multiQuery",parametri,elaboraRisposta,"divCorpo");
    } else {
        inviaRichiestaCentralino("query",parametri,elaboraRisposta,"divCorpo");
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
        var e=document.getElementById("divGrafico");
        
        if(data[0]==0){
            if (parametri.tipoRisposta!="select" && e.classList.contains("hide")==false){
                attivaAlert(xTipoAllert.INFORMAZIONE,"Nessun Dato presente per il periodo richiesto!","erroriCampi");
            }
            
            return "";
        }
    }
    
    switch (parametri.tipoRisposta){
        case "select":
            data=verificaMd5(parametri.select,parametri,risp,data); 
            
            var s=document.getElementById(parametri.select);
            if (s!=undefined){
                popolaSelectDaJSON(data,parametri.select,xAnno);
            }

            codiceArticolo=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.codiceArticolo');
            if (codiceArticolo!=undefined){
                valorizzaValueElemento("ricercaArticoloVenditaBanco",codiceArticolo);
            }
            
            conCriticita=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.chkCriticita');
            if (conCriticita!=undefined){
                valorizzaCheckedElemento("chkCriticita",(conCriticita=="true"));
            }

            idDeposito=sessionStorage.getItem(nomePagina+'.'+xIdConfigurazione+'.idDeposito');
            if (idDeposito!=undefined){
                valorizzaValueElemento("cmbDeposito", idDeposito);
            }

            break;
        case "articoli":
            caricaJSONArticoli(data,parametri);

            if (parametri.nomeQuery.indexOf("articolo")>=0){
                parametri.nomeQuery=nomePagina+":deposito";

                inviaRichiestaCentralino("query",parametri,elaboraRisposta,"divCorpo");
            }
            
            break;
        case "grafico":
            var nomeSession=getSessionName(parametri);

            if (parametri.md5==risp.md5){
                data=JSON.parse(sessionStorage.getItem(nomeSession+".jSon"));
            } else {
                sessionStorage.setItem(nomeSession+".md5",risp.md5);
                sessionStorage.setItem(nomeSession+".jSon",JSON.stringify(data));
            }

            var d=new Date(parametri["d"]);
            var desLbl=parametri["desLbl"];
            var desLblP=parametri["desLblP"];
            var anno=parametri["anno"];
            var mese=parametri["mese"];
            var torta=0;

            if (parametri.torta!=undefined){
                if (parametri.torta==1){
                    torta=1;
                }
            }

            if (parametri["ordini"]==1 || parametri["ingressi"]==1){
                if (torta==1){
                    caricaJSONOrdiniTorta(data,parametri["dataDaP"],desLbl,desLblP,anno);
                } else {
                    caricaJSONOrdini(data,desLbl,anno,torta)
                }
            } else if (parametri.produzione==1) {
                if (parametri.genereGrafico==0){
                    caricaJSONProduzione(data,desLbl,anno,torta)
                } else {
                    caricaJSONTorta(data,parametri["dataDaP"],desLbl,desLblP,anno);
                }  
            } else if (accessi==1) {
                if (parametri.genereGrafico==0){
                    caricaJSONAccessi(data,desLbl,anno,torta)
                } else {
                    caricaJSONTorta(data,parametri["dataDaP"],desLbl,desLblP,anno);
                }              
            } else if(vendutoCasse==1){
                
                caricaJSONVendutoCasse(data,parametri["dataDaP"],desLbl,anno,torta);
            }else {
                caricaJSON(data,parametri["dataDaP"],desLbl,desLblP,anno,parametri.genereGrafico);
            }
            
            break;
    }
}

function caricaJSONAccessi(rs,desLbl,anno,torta){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var dati=new Array;
    var etichette=new Array;
    var fatturato=0;
    var altro=[];
    var Euro="";
    var vDec=2;
    var j;
    var colori=new Array;
    var z=0;

    dati["accessi"]=new Array;

    for (n in rs) {            
        dati["accessi"][n]=rs[n].NR;
        fatturato+=parseFloat(sistemaNull(rs[n].NR,true));            
        etichette[n]=rs[n].DESCRIZIONE;
    }
    
    desLblP="";

    document.getElementById("divLblFatturato").classList.remove("marg10Top");

    desLbl=""; //"Accessi "+formattaNumeri(fatturato,0,0);
    
    var vEtichette=etichette;

    //valorizzaHTMLElemento("lblFatturato",desLbl);
    valorizzaHTMLElemento("lblFatturatoP","");

    var dataset=[];
    x=0;

    var z=0;

    for (n in dati){
        var hidden=false;

        var type='line';
        var opacitaP=0;

        if (dati[n].length>0){
            dataset.push({
                label: n,
                backgroundColor:'rgb(255,255,255, '+opacitaP+')',
                borderColor: 'rgb('+xColoreSecondario+')',
                data: dati[n],
                hidden: hidden,
                type:type,
                order:1
            });
        }
    }

    document.getElementById('myChart').remove();
                        
    var canv=document.createElement("canvas");
    canv.setAttribute("id", "myChart");

    var h=calcolaHGrafico();
    // canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")
    
    attivaTouchZoom(canv);

    document.getElementById('divGraficiGenerali').appendChild(canv);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: vEtichette,
            datasets: dataset
        },

        // Configuration options go here
        options: {
              maintainAspectRatio: false, 
            legend: {
                onClick: handleLegendClick
            },
            plugins: {
                datalabels: {
                    color:'black',
                    anchor: 'end',
                    align: 'top',
                    rotation: -90,
                    formatter: function(value, context) {
                        if (context.dataset.label!="totale"){
                            return '';
                        } else {
                            return formattaNumeri(value,vDec,0);
                        }
                    },
                    font: {
                    weight: 'bold'
                    }
                }
            }
        }
    });
    canv.setAttribute("style","position: relative; max-height:"+h+";width:100%;");
    chart.options.scales.yAxes[0].gridLines.color='rgba(0, 0, 0, 0.01)';

    chart.update();
}

function caricaJSONTorta(rs,dataDaP,desLbl,desLblP,anno){
    var dati=new Array;
    var etichette=new Array;
    var colori=new Array;
    var fatturato=0;
    var dec=2;

    var z=-1;

    desLbl="Totale ";    
    
    var datiP="";
    var fatturatoP=0;

    for (n in rs) {
        z+=1;

        dati[n]=rs[n].VALORE;
        fatturato+=parseFloat(rs[n].VALORE);
        dec=2;
        etichette[n]=rs[n].DESCRIZIONE;
        colori[n]='rgba('+matriceColori[z]+',0.7)';
    }

    var lblFatturato=document.getElementById("lblFatturato");
    lblFatturato.innerHTML=desLbl+' '+formattaNumeri(fatturato,dec,0);
    lblFatturatoP.innerHTML="";

    valorizzaGrafico(etichette,dati,anno,datiP,(anno-1),1,colori,fatturato,dec);
}

function caricaJSONProduzione(rs,desLbl,anno,torta){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var dati=new Array;
    var etichette=new Array;
    var fatturato=0;
    var altro=[];
    var Euro="";
    var vDec=2;
    var j;
    var colori=new Array;
    var z=0;

    dati["totale"]=new Array;

    for (n in rs) {
        dati[n]=new Array;
        
        etichette[n]=new Array;
        fatturato[n]=0;
        altro[n]=0;

        j=JSON.parse(rs[n].J);

        for (x in j){
            if (dati[j[x].codice]==undefined){
                dati[j[x].codice]=new Array;

                if (xParametriPagina.coloriProduzione!=undefined){
                    var js=JSON.parse(xParametriPagina.coloriProduzione);

                    if (js[j[x].codice]!=undefined){
                        z=7;
                        colori[j[x].codice]=js[j[x].codice];
                    } else {
                        colori[j[x].codice]=matriceColori[z];
                        z+=1;
                    }                    
                } else {
                    colori[j[x].codice]=matriceColori[z];
                    z+=1;
                }
            }
            
            dati[j[x].codice][n]=j[x].plt;

            fatturato+=parseFloat(sistemaNull(j[x].plt,true));            
        }

        dati["totale"][n]=rs[n].TPLT;
        etichette[n]=rs[n].DESCRIZIONE;
    }
    
    desLblP="";

    document.getElementById("divLblFatturato").classList.remove("marg10Top");

    desLbl="Prodotti "+formattaNumeri(fatturato,vDec,0)+" plt";
    
    var desLblX="";
    if (dati["totale"].length!=0){
        desLblX="Media "+formattaNumeri(fatturato/dati["totale"].length,vDec,0)+" plt";
    }
    
    var vEtichette=etichette;

    valorizzaHTMLElemento("lblFatturato",desLbl);
    valorizzaHTMLElemento("lblFatturatoP",desLblX);

    var dataset=[];
    x=0;

    var z=0;

    for (n in dati){
        var hidden=false;

        if (torta==0){
            var type='bar';
        } else {
            var type='doughnut';
        }
        
        var typeP='line';
        var opacitaP=0;

        if (n=="evaso"){
            hidden=true;
        }

        if(vw<1366 || (recuperaValueElemento("cmbOperatore")!='' && recuperaValueElemento("cmbOperatore")!='0')){
            if ((n=="ordinato" && xParametriPagina.noPrelevatoSuOrdini==0) || n=="arrivato"){
                hidden=true;
            }
        }

        z+=1;

        if (dati[n].length>0){
            if (n=="totale"){
                dataset.push({
                    label: n,
                    backgroundColor:'rgb(255,255,255, '+opacitaP+')',
                    borderColor: 'rgb('+xColoreSecondario+')',
                    data: dati[n],
                    hidden: hidden,
                    type:typeP,
                    order:1
                });
            } else {
                dataset.push({
                    label: n,
                    backgroundColor: 'rgba('+colori[n]+', 0.7)',
                    borderColor: 'rgb('+colori[n]+')',
                    data: dati[n],
                    hidden: hidden,
                    type:type,
                    stack: 'Stack 99',
                    order:0
                });
            }
        }
    }

    document.getElementById('myChart').remove();
                        
    var canv=document.createElement("canvas");
    canv.setAttribute("id", "myChart");

    var h=calcolaHGrafico();
    canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")
    
    attivaTouchZoom(canv);

    document.getElementById('divGraficiGenerali').appendChild(canv);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: vEtichette,
            datasets: dataset
        },

        // Configuration options go here
        options: {
            legend: {
                onClick: handleLegendClick
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var v="";
                        var x;

                        // console.log('yLabel: '+tooltipItem.yLabel);
                        // console.log("datasetindex: "+tooltipItem.datasetIndex);
                        // console.log("tooltipindex:"+tooltipItem.index);
                        // console.log("data: "+data.datasets[tooltipItem.datasetIndex].label);

                        // console.log(rs[tooltipItem.index]);

                        if (data.datasets[tooltipItem.datasetIndex].label!="totale"){
                            var j=JSON.parse(rs[tooltipItem.index].J);

                            for (x in j){
                                if (j[x].codice==data.datasets[tooltipItem.datasetIndex].label){
                                    v=formattaNumeri(j[x].plt,2,0)+' plt ('+data.datasets[tooltipItem.datasetIndex].label+' - '+j[x].descrizione+')';
                                }
                            }
                        } else {
                           v=formattaNumeri(tooltipItem.yLabel,2,0) ;
                        }
                        
                        // console.log(j);

                        return v;
                    }
                }
            },
            // onClick: function(c,i) {
            //     console.log(c);
            //     console.log(i);

            //     if ( i.length == 0 ) return;
            //     e = i[0];
            //     //console.log(e._index);
            //     //console.log(e);
            //     var x_value = this.data.labels[e._index];
            //     var xDataset=e._datasetIndex;
            //     //var y_value = this.data.datasets[0].data[e._index];
            //     //console.log(x_value);
            //     //console.log(y_value);
            //     //apriDettaglio(x_value,xDataset); tolto
            // },
            plugins: {
                datalabels: {
                    color:'black',
                    anchor: 'end',
                    align: 'top',
                    rotation: -90,
                    formatter: function(value, context) {
                        if (context.dataset.label!="totale"){
                            return '';
                        } else {
                            return formattaNumeri(value,vDec,0);
                        }
                    },
                    font: {
                    weight: 'bold'
                    }
                }
            }
        }
    });
    canv.setAttribute("style","position: relative; max-height:"+h+";width:100%;");
    chart.options.scales.yAxes[0].gridLines.color='rgba(0, 0, 0, 0.01)';

    chart.update();
}

var defaultLegendClickHandler = Chart.defaults.global.legend.onClick;

function handleLegendClick(e, legendItem){
    //console.log(legendItem);

    var index = legendItem.datasetIndex;
    var ci = this.chart;
    var meta = ci.getDatasetMeta(index);

    // console.log(meta);

    if (legendItem.text!="totale" && produzione==1){
        var desLbl=document.getElementById("lblFatturato");

        if (desLbl!=undefined){
            var d=desLbl.innerHTML;
            var v=d.split(" ");

            t=Number(v[1].replace(".","").replace(",","."));

            var data=meta.controller._data;

            for (x in data){
                if (legendItem.hidden==true){
                    t+=data[x];
                } else {
                    t-=data[x];
                }
            }

            desLbl.innerHTML="Prodotti "+formattaNumeri(t,2,0)+" plt";
        }
    }

    // See controller.isDatasetVisible comment
    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

    // We hid a dataset ... rerender the chart
    ci.update();
}

var nrClickA=0;

function caricaJSONArticoli(rs,parametri){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var dati=new Array;
    var etichette=new Array;
    var dataset=new Array;
    var nomeGrafico="";
    var desGrafico="";
    var colore="";

    for (n in rs) {
        dati[n]=rs[n].PERCDISP;
        
        if (parametri.nomeQuery.indexOf("articolo")>=0){
            etichette[n]=rs[n].Codice;
            nomeGrafico="myChartA";
            desGrafico="Articoli";
            colore=xColoreBase;
        } else {
            etichette[n]=rs[n].Descrizione;
            nomeGrafico="myChartD";
            desGrafico="Depositi";
            colore=xColoreSecondario;
        }
    }
    
    dataset.push({
        label: desGrafico,
        backgroundColor: 'rgba('+colore+', 0.5)',
        borderColor: 'rgb('+colore+')',
        data: dati,
        order:1
    });

    var c=document.getElementById(nomeGrafico)        
    if (c!=undefined){
        c.remove();
    }
    
    var divC=document.getElementById('divGraficiArticoliContainer');

    if (vw<550){
        divC.classList.add("posTopA100p");
        divC.classList.remove("posTopA60p");
    }

    var canv=document.createElement("canvas");
    canv.setAttribute("id", nomeGrafico);
    canv.classList.add(["row"]);

    var h=((rs.length*30)+90)+'px';

    if (vw>500){
        var w=47;
    } else {
        var w=94;
    }

    canv.setAttribute("style","position: relative; height:"+h+"; width:"+w+"vw");

    attivaTouchZoom(canv);

    divC.appendChild(canv);

    var ctx = document.getElementById(nomeGrafico).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: etichette,
            datasets: dataset
        },

        // Configuration options go here
        options: {
            responsive: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var v="";
                        
                        if (rs[tooltipItem.index].Codice!=undefined){
                            v=rs[tooltipItem.index].Descrizione+": "+formattaNumeri(rs[tooltipItem.index].PERCDISP,2,0)+'%';
                        } else {
                            v=formattaNumeri(rs[tooltipItem.index].PERCDISP,2,0)+'%';
                        }
                        
                        return v;
                    }
                }
            },
            onClick: function(c,i) {
                if ( i.length == 0 ) {
                    return;
                }

                e = i[0];

                if (nrClickA==0){
                    nrClickA+=1;
                    return;
                }

                nrClickA=0;

                var riga=e._index;
                
                if (rs[riga].Codice!=undefined){
                    var idDeposito=recuperaValueElemento("cmbDeposito");

                    if (idDeposito==0){
                        valorizzaValueElemento("ricercaArticoloVenditaBanco",rs[riga].Codice);
                        sessionStorage.setItem(nomePagina+'.'+xIdConfigurazione+'.codiceArticolo',rs[riga].Codice);
                        avviaCarDati();
                    } else {
                        window.open("statoOrdini.html?codice="+rs[riga].Codice+"&idDeposito="+idDeposito,xTarget);
                    }
                } else if (rs[riga].DEPOSITO!=undefined){
                    var codiceArticolo=recuperaValueElemento("ricercaArticoloVenditaBanco");

                    if (codiceArticolo==""){
                        valorizzaValueElemento("cmbDeposito",rs[riga].DEPOSITO);
                        sessionStorage.setItem(nomePagina+'.'+xIdConfigurazione+'.idDeposito',rs[riga].DEPOSITO);
                        avviaCarDati();
                    } else {
                        if(typeof modElectron!='undefined' && modElectron==true){
                            location.href="statoOrdini.html?codice="+codiceArticolo+"&idDeposito="+rs[riga].DEPOSITO;
                        }else{
                            window.open("statoOrdini.html?codice="+codiceArticolo+"&idDeposito="+rs[riga].DEPOSITO,xTarget);
                        }
                        
                    }
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    },
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 10,
                            bottom: 10
                        }
                    }
                }]
            },
            plugins: {
                datalabels: {
                    color:'black',
                    anchor: 'start',
                    align: 'right',
                    formatter: function(value, context) {
                        var v="";
                        
                        v='G.'+rs[context.dataIndex].GIACENZA+' - I.'+rs[context.dataIndex].IMPEGNATI;
                        
                        return v;
                    },
                    // font: {
                    // weight: 'bold'
                    // }
                }
            }
        }
    });

    chart.options.scales.yAxes[0].gridLines.color='rgba(0, 0, 0, 0.01)';
    canv.setAttribute("style","position: relative; max-height:"+h+";width:100%;");
    chart.update();
}

function caricaJSONOrdini(rs,desLbl,anno,torta){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var dati=new Array;
    var etichette=new Array;
    var fatturato=[];
    var altro=[];
    var altroProd=[];
    var Euro=" € ";
    var vDec=2;

    var ubicare=0;

    var optRighe=document.getElementById("optRighe");
    if (optRighe.checked==true){
        Euro=" # ";
        vDec=0;
    }

    for (n in rs) {
        if (n=="daUbicare"){
            try {
                ubicare=rs[n][0]["NR"];
                break;
            } catch (error) {
                break;
            }
        }

        dati[n]=new Array;
        if (n=="prelevato" || n=="ubicato"){
            dati[n+'_min']=new Array;
            dati[n+'_med']=new Array;
            dati[n+'_max']=new Array;
        }

        etichette[n]=new Array;
        fatturato[n]=0;
        altro[n]=0;
        altroProd[n]=0;

        for (x in rs[n]){
            if (optRighe.checked==true){
                dati[n][x]=rs[n][x].RIGHE;

                if (torta==0){
                    if (n=="prelevato" || n=="ubicato"){
                        dati[n+'_min'][x]=rs[n][x].RIGHEMIN;
                        dati[n+'_med'][x]=rs[n][x].RIGHEMED;
                        dati[n+'_max'][x]=rs[n][x].RIGHEMAX;
                    }
                }
                
                fatturato[n]+=parseFloat(sistemaNull(rs[n][x].RIGHE,true));
                if (xParametriPagina.mostraPalletSuOrdini==1){
                    altro[n]+=parseFloat(sistemaNull(rs[n][x].COLLI,true));
                    altroProd[n]+=parseFloat(sistemaNull(rs[n][x].COLLIPROD,true));
                } else if (xParametriPagina.mostraInternetSuOrdini==1){
                    altro[n]+=parseFloat(sistemaNull(rs[n][x].INTERNET,true));
                }
            } else {
                dati[n][x]=rs[n][x].IMPORTO;
                fatturato[n]+=parseFloat(sistemaNull(rs[n][x].IMPORTO,true));

                if (xParametriPagina.mostraInternetSuOrdini==1){
                    altro[n]+=parseFloat(sistemaNull(rs[n][x].IMPORTOINTERNET,true));
                }
            }
            
            etichette[n][x]=rs[n][x].DESCRIZIONE;
        }
    }

    var colMin="255, 0, 0";
    var colMed="0, 255, 0";
    var colMax="0, 0, 255";
    
    desLblP="";

    document.getElementById("divLblFatturato").classList.remove("marg10Top");

    if (ordini==1){
        document.getElementById("divLblFatturato").classList.add("marg10Top");

        desLbl="O "+Euro+formattaNumeri(fatturato["ordinato"],vDec,vDec);
        desLblE="E "+Euro+formattaNumeri(fatturato["evaso"],vDec,vDec);
        desLblP="P "+Euro+formattaNumeri(fatturato["prelevato"],vDec,vDec);

        if (torta==0){
            if (optRighe.checked==true && xParametriPagina.mostraPalletSuOrdini==1){
                desLbl+=" CT ("+formattaNumeri(altro["ordinato"],0,0)+" plt di cui "+formattaNumeri(altroProd["ordinato"],0,0)+" prod.)";
                desLblE+=" CT ("+formattaNumeri(altro["evaso"],0,0)+" Pallet)";
            } else if (xParametriPagina.mostraInternetSuOrdini==1){
                desLbl+=" ("+formattaNumeri(altro["ordinato"],2,0)+" Internet)";
                desLblE+=" ("+formattaNumeri(altro["evaso"],2,0)+" Internet)";
            }
        }

        var colore={ordinato:xColoreBase,prelevato:xColoreSecondario,evaso:xColoreScuro,
            prelevato_min:colMin,prelevato_med:colMed,prelevato_max:colMax};
        
        var vEtichette=etichette["ordinato"];

        if (xParametriPagina.noPrelevatoSuOrdini==0){
            valorizzaHTMLElemento("lblFatturato",desLbl+' - '+desLblP);
            valorizzaHTMLElemento("lblFatturatoP",desLblE);
        } else {
            valorizzaHTMLElemento("lblFatturato",desLbl);
            valorizzaHTMLElemento("lblFatturatoP",desLblE);
        }   
    } else {
        desLbl="Arrivato "+formattaNumeri(fatturato["arrivato"],vDec,vDec);
        desLblE="Ubicato "+formattaNumeri(fatturato["ubicato"],vDec,vDec);
        desLblP="da Ubicare "+formattaNumeri(ubicare,vDec,vDec);

        var colore={arrivato:xColoreBase,ubicato:xColoreSecondario,
            ubicato_min:colMin,ubicato_med:colMed,ubicato_max:colMax};
        
        var vEtichette=etichette["arrivato"];

        valorizzaHTMLElemento("lblFatturato",desLbl+' - '+desLblP);
        valorizzaHTMLElemento("lblFatturatoP",desLblE);
    }

    var dataset=[];
    x=0;

    var z=0;

    for (n in dati){
        var hidden=false;

        if (torta==0){
            var type='bar';
        } else {
            var type='doughnut';
        }
        
        var typeP='line';
        var opacitaP=0;

        if (n=="evaso"){
            hidden=true;
        }

        if(vw<1366 || (recuperaValueElemento("cmbOperatore")!='' && recuperaValueElemento("cmbOperatore")!='0')){
            if ((n=="ordinato" && xParametriPagina.noPrelevatoSuOrdini==0) || n=="arrivato"){
                hidden=true;
            }
        }

        if (!optRighe.checked && torta==0){
            if (n=="prelevato" || n=="ubicato"){
                typeP='bar';
                opacitaP=0.7;
            }
        }

        z+=1;

        if (dati[n].length>0){
            if (n.indexOf("prelevato")>=0 || n.indexOf("ubicato")>=0){
                if (n!='prelevato' && n!='ubicato'){
                    dataset.push({
                        label: n,
                        backgroundColor: 'rgba('+colore[n]+', 0.7)',
                        borderColor: 'rgb('+colore[n]+')',
                        data: dati[n],
                        hidden: hidden,
                        type:type,
                        stack: 'Stack 99',
                        order:0
                    });
                } else {
                    dataset.push({
                        label: n,
                        backgroundColor:'rgb('+colore[n]+', '+opacitaP+')',
                        borderColor: 'rgb('+colore[n]+')',
                        data: dati[n],
                        hidden: hidden,
                        type:typeP,
                        order:1
                    });
                }
            } else {
                dataset.push({
                    label: n,
                    backgroundColor: 'rgba('+colore[n]+', 0.7)',
                    borderColor: 'rgb('+colore[n]+')',
                    data: dati[n],
                    hidden: hidden,
                    type:type,
                    order:0
                });
            }
        }
    }

    document.getElementById('myChart').remove();
                        
    var canv=document.createElement("canvas");
    canv.setAttribute("id", "myChart");

    var h=calcolaHGrafico();
    // canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")
    
    attivaTouchZoom(canv);

    document.getElementById('divGraficiGenerali').appendChild(canv);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: vEtichette,
            datasets: dataset
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false, 
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var v="";

                        if (xParametriPagina.mostraPalletSuOrdini==1 && optRighe.checked==true){
                            v=formattaNumeri(tooltipItem.yLabel,vDec)+' CT ('+formattaNumeri(rs[data.datasets[tooltipItem.datasetIndex].label][tooltipItem.index].COLLI,0)+" plt di cui "+formattaNumeri(rs[data.datasets[tooltipItem.datasetIndex].label][tooltipItem.index].COLLIPROD,0)+" prodotti)";
                        } else if (xParametriPagina.mostraInternetSuOrdini==1){
                            if (optRighe.checked==true){
                                v=formattaNumeri(tooltipItem.yLabel,vDec)+' ('+formattaNumeri(rs[data.datasets[tooltipItem.datasetIndex].label][tooltipItem.index].INTERNET,0)+" da Web)";
                            } else {
                                v=formattaNumeri(tooltipItem.yLabel,vDec)+' ('+formattaNumeri(rs[data.datasets[tooltipItem.datasetIndex].label][tooltipItem.index].IMPORTOINTERNET,2,2)+" da Web)";
                            }                            
                        } else {
                            v=formattaNumeri(tooltipItem.yLabel,vDec);
                        }

                        return v;
                    }
                }
            },
            onClick: function(c,i) {
                if ( i.length == 0 ) return;
                e = i[0];
                //console.log(e._index);
                //console.log(e);
                var x_value = this.data.labels[e._index];
                var xDataset=e._datasetIndex;
                //var y_value = this.data.datasets[0].data[e._index];
                //console.log(x_value);
                //console.log(y_value);
                //apriDettaglio(x_value,xDataset); tolto
            },
            plugins: {
                datalabels: {
                    color:'black',
                    anchor: 'end',
                    align: 'top',
                    rotation: -90,
                    formatter: function(value, context) {
                        if (context.dataset.label!="prelevato" && context.dataset.label!="ubicato" && (context.dataset.label.indexOf("prelevato")>=0 || context.dataset.label.indexOf("ubicato")>=0)){
                            return '';
                        } else {
                            return formattaNumeri(value,vDec);
                        }
                    },
                    font: {
                    weight: 'bold'
                    }
                }
            }
        }
    });
    canv.setAttribute("style","position: relative; max-height:"+h+";width:100%;");
    chart.options.scales.yAxes[0].gridLines.color='rgba(0, 0, 0, 0.01)';

    chart.update();
}

function caricaJSONOrdiniTorta(rs,dataDaP,desLbl,desLblP,anno){
    var dati=new Array;
    var etichette=new Array;
    var colori=new Array;
    var fatturato=0;
    var dec=2;

    var z=-1;

    if (ordini==1){
        if (rs["prelevato"]!=undefined){
            rs=rs["prelevato"];
        }
        
        desLbl=desLbl.replace(/FT/g,'Prelevato');
        desLbl=desLbl.replace(/Ordinato/g,'Prelevato');
    } else {
        if (rs["ubicato"]!=undefined){
            rs=rs["ubicato"];
        }

        desLbl=desLbl.replace(/Ordinato/g,'Ubicato');
        desLbl=desLbl.replace(/FT/g,'Ubicato');
        desLbl=desLbl.replace(/Arrivato/g,'Ubicato');
    }
    

    if (dataDaP!="") {
        var datiP=new Array;
    } else {
        var datiP="";
    }

    var fatturatoP=0;

    for (n in rs) {
        z+=1;

        if (optRighe.checked==true){
            dati[n]=rs[n].RIGHE;
            fatturato+=parseFloat(rs[n].RIGHE);
            dec=0;
        } else {
            dati[n]=rs[n].IMPORTO;
            fatturato+=parseFloat(rs[n].IMPORTO);
        }
        
        etichette[n]=rs[n].DESCRIZIONE;
        colori[n]='rgba('+matriceColori[z]+',0.7)';

        if (dataDaP!="") {
            datiP[n]=rs[n].IMPORTOP;
            fatturatoP+=parseFloat(rs[n].IMPORTOP);
        }
    }

    var lblFatturato=document.getElementById("lblFatturato");
    lblFatturato.innerHTML=desLbl+' € '+formattaNumeri(fatturato,dec);
    lblFatturatoP.innerHTML="";

    valorizzaGrafico(etichette,dati,anno,datiP,(anno-1),1,colori,fatturato,dec);
}

function caricaJSON(rs,dataDaP,desLbl,desLblP,anno,torta){
    var dati=new Array;
    var datiU=new Array;
    var datiT=new Array;
    var etichette=new Array;
    var colori=new Array;
    var fatturato=0;
    var ddtFT=0;

    var z=-1;

    if (dataDaP!="") {
        var datiP=new Array;
        var datiTP=new Array;
        var datiUP=new Array;
    } else {
        var datiP="";
        var datiTP="";
        var datiUP="";
    }

    var fatturatoP=0;
    var utile=0;
    var utileP=0;

    for (n in rs) {
        z+=1;

        if (xIdCliente==0 && xIdAgente==0 && xParametriPagina.noUtile==0 && torta==0){
            dati[n]=parseFloat(rs[n].IMPORTO)-parseFloat(rs[n].UTILE);
            datiT[n]=rs[n].IMPORTO;
        } else {
            dati[n]=rs[n].IMPORTO;
        }
        
        if (ddt==1){
            ddtFT+=parseFloat(rs[n].IMPORTOFT);
        }

        etichette[n]=rs[n].DESCRIZIONE;
        colori[n]='rgba('+matriceColori[z]+',0.7)';

        datiU[n]=rs[n].UTILE;

        fatturato+=parseFloat(rs[n].IMPORTO);
        utile+=parseFloat(rs[n].UTILE);

        if (dataDaP!="") {
            if (xIdCliente==0 && xIdAgente==0 && xParametriPagina.noUtile==0 && torta==0){
                datiP[n]=parseFloat(rs[n].IMPORTOP)-parseFloat(rs[n].UTILEP);
                datiTP[n]=rs[n].IMPORTOP;
            } else {
                datiP[n]=rs[n].IMPORTOP;
            }
            fatturatoP+=parseFloat(rs[n].IMPORTOP);
            utileP+=parseFloat(rs[n].UTILEP);

            datiUP[n]=rs[n].UTILEP;
        }
    }

    var lblFatturato=document.getElementById("lblFatturato");
    lblFatturato.innerHTML=desLbl+' € '+formatter.format(fatturato);
    lblFatturatoP.innerHTML=desLblP+' € '+formatter.format(fatturatoP);

    if (ddt==1){
        lblFatturato.innerHTML+=" (FT: € "+formattaNumeri(ddtFT)+")";
    }

    if (xIdCliente==0 && xIdAgente==0 && xParametriPagina.noUtile==0){
        if (utile>0 && fatturato!=0){
            var perc=utile*100/fatturato;
            lblFatturato.innerHTML+=" (€ "+formatter.format(utile)+" - "+formattaNumeri(perc,1)+"%)";
        }

        if (utileP>0 && fatturatoP!=0){
            var perc=utileP*100/fatturatoP;
            lblFatturatoP.innerHTML+=" (€ "+formatter.format(utileP)+" - "+formattaNumeri(perc,1)+"%)";
        }
    }

    valorizzaGrafico(etichette,dati,anno,datiP,(anno-1),torta,colori,fatturato,2,datiU,datiUP,datiT,datiTP,rs);
}

var nrClick=0;

function valorizzaGrafico(etichette, dati, anno, datiP="", annoP="",torta, colori,fatturato,dec=2,datiU="",datiUP="",datiT="",datiTP="",rs=""){
    var dataset=[];
    var desEti="FT";

    if (ddt==1){
        desEti="DDT";
    } else if (incassi==1){
        desEti="Incassato";
    } else if (pagamenti==1){
        desEti="Pagato";
    }
    
    if ((incassi==1 ||pagamenti==1) && xIdAgente==0 && xIdCliente==0 && xParametriPagina.noUtile==0){
        dati=datiT;
        datiP=datiTP;
    }
    
    if (xIdCliente==0 && xIdAgente==0 && xParametriPagina.noUtile==0 && torta==0 && incassi==0 && pagamenti==0){
        desEti="C "
    }
    
    if (torta==0){
        if (datiP==""){
            dataset.push({
                label: desEti+' '+((anno!="") ? anno : ''),
                backgroundColor: 'rgba('+xColoreBase+', 0.7)',
                borderColor: 'rgb('+xColoreBase+')',
                data: dati,
                stack: 'Stack 99',
                order:1
            });
        } else {
            dataset.push({
                label: desEti+' '+((annoP!="") ? annoP : ''),
                backgroundColor: 'rgba('+xColoreSecondario+', 0.7)',
                borderColor: 'rgb('+xColoreSecondario+')',
                hidden: true,
                data: datiP,
                stack: 'Stack 98',
                order:1
            });
            dataset.push({
                label: desEti+' '+((anno!="") ? anno : ''),
                backgroundColor: 'rgba('+xColoreBase+', 0.7)',
                borderColor: 'rgb('+xColoreBase+')',
                data: dati,
                stack: 'Stack 99',
                order:1
            });
        }    
    } else {
        dataset.push({
            label: desEti+' '+((anno!="") ? anno : ''),
            backgroundColor: colori, // 'rgba('+coloriDinamici+', 0.7)',
            //borderColor: colori,
            data: dati
        });
    }
    
    if (xIdCliente==0 && xIdAgente==0 && xParametriPagina.noUtile==0 && torta==0 && incassi==0 && pagamenti==0){
        if (datiUP!=""){
            dataset.push({
                label: 'U '+((annoP!="") ? annoP : ''),
                backgroundColor: 'rgba(0,100,100, 0.7)',
                borderColor: 'rgb('+xColoreSecondario+')',
                data: datiUP,
                hidden: true,
                stack: 'Stack 98',
                order:1
            });
        }
    
        if (datiU!=""){
            dataset.push({
                label: 'U '+((anno!="") ? anno : ''),
                backgroundColor: 'rgba(100,100,0, 0.7)',
                borderColor: 'rgb('+xColoreBase+')',
                data: datiU,
                stack: 'Stack 99',
                order:1
            });
        }
        
        if (datiTP!=""){
            dataset.push({
                label: 'FT '+((annoP!="") ? annoP : ''),
                backgroundColor: 'rgba(100,100,0, 0)',
                borderColor: 'rgb('+xColoreSecondario+')',
                data: datiTP,
                hidden: true,
                type: 'line',
                borderDash: [1, 1000],
                order:0
            });
        }

        dataset.push({
            label: 'FT '+((anno!="") ? anno : ''),
            backgroundColor: 'rgba(100,100,0, 0)',
            borderColor: 'rgb('+xColoreBase+')',
            data: datiT,
            borderDash: [1, 1000],
            type: 'line',
            order:0
        });
    }

    document.getElementById('myChart').remove();
                        
    var canv=document.createElement("canvas");
    canv.setAttribute("id", "myChart");

    var h=calcolaHGrafico();
    
    // canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")

    attivaTouchZoom(canv);
    
    document.getElementById('divGraficiGenerali').appendChild(canv);

    var tipo='bar';
    var anchor='end';
    var align='top';
    var rotation=-90;

    if (torta>0){
        tipo='doughnut';
        anchor='center';
        align='center';
    } 

    var ctx = document.getElementById('myChart').getContext('2d');
    var h=calcolaHGrafico();
    
    
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: tipo,

        // The data for our dataset
        data: {
            labels: etichette,
            datasets: dataset
        },

        // Configuration options go here
        options: {
            maintainAspectRatio: false, 
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        if (torta==0){
                            
                            var nDoc=0;

                            if (vendutoCasse==1){
                                if (recuperaValueElemento("cmbRaggruppamentoCasse")==0){
                                    for (i in rs){
                                        if (rs[i].RESPONSABILE==tooltipItem.xLabel && rs[i].IMPORTON==tooltipItem.yLabel){
                                            nDoc=rs[i].NDOC;
                                            return formattaNumeri(tooltipItem.yLabel,2)+' (#Sc.'+nDoc+' - Media '+formattaNumeri(rs[i].IMPORTON/nDoc,2)+')';
                                        }
                                    }
                                } else if(recuperaValueElemento("cmbRaggruppamentoCasse")==1){
                                    for (i in rs){
                                        if (rs[i].DEPOSITO==tooltipItem.xLabel && rs[i].IMPORTON==tooltipItem.yLabel){
                                            nDoc=rs[i].NDOC;
                                            return formattaNumeri(tooltipItem.yLabel,2)+' (#Scontrini '+nDoc+' - Media '+formattaNumeri(rs[i].IMPORTON/nDoc,2)+')';
                                        }
                                    }
                                }else if(recuperaValueElemento("cmbRaggruppamentoCasse")==2){
                                    for (i in rs){
                                        if (rs[i].CAMPO==tooltipItem.xLabel && rs[i].IMPORTON==tooltipItem.yLabel){
                                            nDoc=rs[i].NDOC;
                                            return formattaNumeri(tooltipItem.yLabel,2)+' (#Sc.'+nDoc+' - Media '+formattaNumeri(rs[i].IMPORTON/nDoc,2)+')';
                                        }
                                    }
                                }
                            }

                            var meno=2;

                            if (datiUP==""){
                                meno=1;
                            }

                            try {
                                if (data.datasets[tooltipItem.datasetIndex].label.indexOf('U')>=0){
                                    nrClick=0;
                                    if (data.datasets[tooltipItem.datasetIndex+meno].data[tooltipItem.index]!=0){
                                        v=formattaNumeri(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]*100/data.datasets[tooltipItem.datasetIndex+meno].data[tooltipItem.index],1);
                                    }
                                    return formattaNumeri(tooltipItem.yLabel,2)+' ('+v+'%)';
                                } else {
                                    return formattaNumeri(tooltipItem.yLabel,2);
                                }
                            } catch (error) {
                                return formattaNumeri(tooltipItem.yLabel,2);
                            }
                        } else {
                            try {
                                var v='';
                                if (fatturato>0){
                                    v=formattaNumeri(data.datasets[0].data[tooltipItem.index]*100/fatturato,0);
                                }

                                if (rs[tooltipItem.index].DESLBL!=undefined){
                                    if (rs[tooltipItem.index].DESLBL!=''){
                                        return data.labels[tooltipItem.index]+' - '+rs[tooltipItem.index].DESLBL+' ('+v+'%)';
                                    } else {
                                        return data.labels[tooltipItem.index]+' ('+v+'%)';
                                    }
                                } else {
                                    return data.labels[tooltipItem.index]+' ('+v+'%)';
                                }    
                            } catch (error) {
                                return formattaNumeri(tooltipItem.yLabel,2);
                            }
                            
                        }                        
                    }
                }
            },
            onClick: function(c,i) {
                if ( i.length == 0 ) return;

                e = i[0];

                if (nrClick==0){
                    nrClick+=1;
                    return;
                }

                nrClick=0;

                //console.log(e._index);
                //console.log(e);
                var x_value = this.data.labels[e._index];
                var xDataset=e._datasetIndex;
                //var y_value = this.data.datasets[0].data[e._index];
                //console.log(x_value);
                //console.log(y_value);
                if (torta==0 && vendutoCasse!=1){
                    apriDettaglio(x_value,xDataset);
                }
            },
            plugins: {
                datalabels: {
                    color: 'black',
                    anchor: anchor,
                    align: function(context){
                        if (context.datasetIndex==5){
                            return align;
                        } else if(context.datasetIndex==4){
                            return 'left';
                        } else {
                            return align;
                        }                           
                    },
                    rotation: function(context){
                        if (context.datasetIndex==5){
                            return -90;
                        } else if(context.datasetIndex==4){
                            return -60;
                        } else {
                            return rotation;
                        }                           
                    },
                    formatter: function(value, context) {
                        //return formattaNumeri(value,dec);
                        //console.log(context);
                        try {
                            if (context.dataset.label.indexOf("U")>=0 || context.dataset.label.indexOf("C")>=0){
                                return '';
                            } else {
                                return formattaNumeri(value,2);
                            }    
                        } catch (error) {
                            return formattaNumeri(value,2);
                        }
                        
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    });
    canv.setAttribute("style","position: relative; max-height:"+h+";width:100%;");
    if (torta==0){
        chart.options.scales.yAxes[0].gridLines.color='rgba(0, 0, 0, 0.01)';

        chart.update();
    }
}

function changeSelectPaginaCorrente(s){
    avviaCarDati();
}

function apriDettaglio(colonna,dataset){
    var dataDa="";
    var dataA="";
    
    var divAnno=document.getElementById("divAnno");
    var span=divAnno.getElementsByTagName("span");
    var anno=span[0].innerHTML;

    var mese;

    if (document.getElementById("divGrafico").classList.contains("hide")){
        dataDa="01/01/"+(Number(anno)-1);
        dataA="31/12/"+anno;
    } else {
        switch (tipoGrafico){
            case "Giorno":
                if (colonna==""){
                    var divMese=document.getElementById("divMese");
                    span=divMese.getElementsByTagName("span");
                    mese=span[0].getAttribute("id");
                
                    if (Number(mese)==(new Date(oggiISO()).getMonth()+1)){
                        colonna=convertiDataEngIta(oggiISO()).substring(0,5);
                    } else {
                        colonna="01/"+mese;
                    }
                }

                if (dataset==0){
                    anno=Number(anno)-1;
                }

                dataDa=colonna+"/"+anno;
                dataA=dataDa;

                break;
            case "Mese":
                if (colonna==""){
                    colonna=new Date(oggiISO()).getMonth()
                    colonna=nomiMesi[colonna].toUpperCase();
                }

                if (dataset==0){
                    anno=Number(anno)-1;
                }
                
                switch (colonna){
                    case "GENNAIO":
                        dataDa="01/01/"+anno;
                        dataA="31/01/"+anno;
                        break;
                    case "FEBBRAIO":
                        dataDa="01/02/"+anno;
                        mese="02";

                        int_d = new Date(anno, 2, 1);
                        d = new Date(int_d - 1);

                        if (d.getDate()==29){
                            dataA="29/"+mese+"/"+anno;       
                            
                            d=new Date();

                            if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                                dataAP=(d.getDate())+"/"+mese+"/"+(anno-1);
                            } else {
                                int_d = new Date(anno-1, 2, 1);
                                d = new Date(int_d - 1);

                                if (d.getDate()==29){
                                    dataAP="29/"+mese+"/"+(anno-1);       
                                } else {
                                    dataAP="28/"+mese+"/"+(anno-1);       
                                }
                            }
                        } else {
                            dataA="28/"+mese+"/"+anno;       
                            d=new Date();

                            if (anno==d.getFullYear() && parseInt(mese)==(d.getMonth()+1)) {
                                dataAP=(d.getDate())+"/"+mese+"/"+(anno-1);
                            } else {
                                dataAP="28/"+mese+"/"+(anno-1);       
                            }
                        }
                        break;
                    case "MARZO":
                        dataDa="01/03/"+anno;
                        dataA="31/03/"+anno;
                        break;
                    case "APRILE":
                        dataDa="01/04/"+anno;
                        dataA="30/04/"+anno;
                        break;
                    case "MAGGIO":
                        dataDa="01/05/"+anno;
                        dataA="31/05/"+anno;
                        break;
                    case "GIUGNO":
                        dataDa="01/06/"+anno;
                        dataA="30/06/"+anno;
                        break;
                    case "LUGLIO":
                        dataDa="01/07/"+anno;
                        dataA="31/07/"+anno;
                        break;
                    case "AGOSTO":
                        dataDa="01/08/"+anno;
                        dataA="31/08/"+anno;
                        break;
                    case "SETTEMBRE":
                        dataDa="01/09/"+anno;
                        dataA="30/09/"+anno;
                        break;
                    case "OTTOBRE":
                        dataDa="01/10/"+anno;
                        dataA="31/10/"+anno;
                        break;
                    case "NOVEMBRE":
                        dataDa="01/11/"+anno;
                        dataA="30/11/"+anno;
                        break;
                    case "DICEMBRE":
                        dataDa="01/12/"+anno;
                        dataA="31/12/"+anno;
                        break;
                }
                break;
            case "Anno":
                dataDa="01/01/"+anno;
                dataA="31/12/"+anno;

                break;
        }
    }

    if (incassi==1){
        sessionStorage.setItem("incassiPeriodici.dataDa",dataDa);
        sessionStorage.setItem("incassiPeriodici.dataA",dataA);
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="incassiPeriodici.html";
        }else{
            window.open("incassiPeriodici.html",xTarget);
        }
        
    } else if (pagamenti==1){
        sessionStorage.setItem("incassiPeriodici.dataDa",dataDa);
        sessionStorage.setItem("incassiPeriodici.dataA",dataA);
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="incassiPeriodici.html?tipoAnagrafica=FORNITORE";
        }else{
            window.open("incassiPeriodici.html?tipoAnagrafica=FORNITORE",xTarget);
        }
        
    } else {
        sessionStorage.setItem("movimentiPeriodici.dataDa",dataDa);
        sessionStorage.setItem("movimentiPeriodici.dataA",dataA);
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="movimentiPeriodici.html";
        }else{
            window.open("movimentiPeriodici.html",xTarget);
        }
        
    }
}

function getSessionName(parametri){
    return nomePagina+"."+parametri.tipoGrafico+"."+parametri.anno+"."+parametri.mese+"."+parametri.giorno+"."+parametri.fatture+"."+parametri.ordini+"."+parametri.incassi+"."+parametri.idAgente+"."+parametri.idOperatore+"."+parametri.torta+"."+parametri.ingressi+"."+parametri.pagamenti+"."+parametri.genereGrafico+"."+parametri.ddt+"."+parametri.nonAnticipati;
}

var xNomeDestinazione="";
var globalParametriSkCli="";

function avviaCarDatiSchedaCliente(resoMerce=false,tipoApertura='',statistiche=false,forzaApeturaPagina='', soloCarDati=false){
    if (xIdCliente>0) {
        var parametri={"nomeQuery":'schedaCliente.html',"tipoRisposta":"schedaCliente","idCliente":xIdCliente,
                        "tipoQuery":"schedaClienti","chiamante":"schedaCliente","tipoAnagrafica":'CLIENTE',"resoMerce":resoMerce,
                        "tipoApertura":tipoApertura, "statistiche":statistiche,'forzaApeturaPagina':forzaApeturaPagina, "soloCarDati":soloCarDati
                        }; 
        inviaRichiestaCentralino("query",parametri,elaboraRispostaSkCli);
    }
}

var parDest;

function elaboraRispostaSkCli(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    
    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        return "";
    }

    sessionStorage.setItem('schedaCliente.html.CLIENTE.'+xIdCliente+'.jSon',JSON.stringify(data));
    window.sessionStorage.setItem("ragioneSociale",xRagSocCliente);
    window.sessionStorage.setItem('idCliente',xIdCliente);

    var idServer=sessionStorage.getItem("s");
    xNomeDestinazione = "nDestinazione."+idServer+".CLIENTE."+xIdCliente;
    localStorage.removeItem(xNomeDestinazione); 
    
    if (parametri.soloCarDati==false){
        if (xParametriPagina.idDest!=0){
            carDatiDestinazione(xParametriPagina.idDest, parametri);
        } else if (data[0].DESTPREDEFINITA!="0"){
            carDatiDestinazione(data[0].DESTPREDEFINITA, parametri);
        } else if (data[0].HIDEDEST==""){
            parDest=parametri;
            attivaAlert(xTipoAllert.DOMANDASINO,"Hai delle destinazioni diverse!<br>Vuoi Selezionarne una?","elaboraRispostaDestinazione_");
        } else {
            apriPagina(parametri);
        }
    }
}

function elaboraRispostaDestinazione(risp,id=0){
    if (risp=="Si"){
        apriDestinazioniMP(parDest);
    } else {
        localStorage.removeItem(xNomeDestinazione);
        apriPagina(parDest);
    }
}

function carDatiDestinazione(idDest, parametriSkCli){
    var parametri={"tipoQuery":"datiDestinazione","id":idDest, "parametriSkCli":parametriSkCli}; 

    inviaRichiestaCentralino("multiQuery",parametri,elaboraDatiDestinazione);
}

function elaboraDatiDestinazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]!=0){
        var idServer=sessionStorage.getItem("s");
        xNomeDestinazione = "nDestinazione."+idServer+".CLIENTE."+xIdCliente;
        IDDestinazionePredefinita=data.idDest;
        localStorage.setItem(xNomeDestinazione,JSON.stringify(data));
    }

    apriPagina(parametri.parametriSkCli);
}

var query=[];

function apriDestinazioniMP(parametriSkCli){
    query['schedaCliente.html:destinazioni']=new Array;
    query['schedaCliente.html:destinazioni']['modelloRiga']=elementiDestinazioni;
    query['schedaCliente.html:destinazioni']['modelloContenitore']=modalRubrica;

    query['schedaCliente.html:destinazioni']['oggetti']=new Array;
    query['schedaCliente.html:destinazioni']['oggetti']['{ID}']="ID";
    query['schedaCliente.html:destinazioni']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
    query['schedaCliente.html:destinazioni']['oggetti']['{TEL}']="TEL";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDETEL}']="HIDETEL";
    query['schedaCliente.html:destinazioni']['oggetti']['{FAX}']="FAX";
    query['schedaCliente.html:destinazioni']['oggetti']['{HIDEFAX}']="HIDEFAX";
    query['schedaCliente.html:destinazioni']['oggetti']['{INDIRIZZO}']="INDIRIZZO";
    query['schedaCliente.html:destinazioni']['oggetti']['{LOCALITA}']="LOCALITA";
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
    query['schedaCliente.html:destinazioni']['oggetti']['{LISTINODEST}']="LISTINODEST";

    var parametri={"nomeQuery":"schedaCliente.html:destinazioni","tipoRisposta":"destinazioni","idCliente":xIdCliente,
                    "tipoQuery":"schedaClienti","chiamante":"destinazioni","parametriSkCli":parametriSkCli
                    }; 

    inviaRichiestaCentralino("query",parametri,elaboraApriDestinazioni);
}

function elaboraApriDestinazioni(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if(data[0]==0){
        apriPagina(parametriSkCli);

        return "";
    }

    globalParametriSkCli=parametri.parametriSkCli;

    apriModalDettagli(parametri.nomeQuery,"SCELTA DESTINAZIONE",data);

    document.getElementById("myStorico").style.zIndex=2002;
}

function apriPagina(parametriSkCli){
    var comandi="tipoAnagrafica=CLIENTE";

    if (parametriSkCli.resoMerce==true){
        comandi+="&resoMerce=1";
    }

    if (parametriSkCli.tipoApertura!=''){
        comandi+="&filtro="+parametriSkCli.tipoApertura;
    }

    if (parametriSkCli.soloCarDati==false){
        if(parametriSkCli.forzaApeturaPagina!='' && parametriSkCli.forzaApeturaPagina.indexOf('.html')>0){
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href=parametriSkCli.forzaApeturaPagina;
            }else{
                window.open(parametriSkCli.forzaApeturaPagina,xTarget);
            }
            
            return;
        }
        
        if (parametriSkCli.statistiche==false){
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaArticoli.html?"+comandi;
            }else{
                window.open("ListaArticoli.html?"+comandi,xTarget);
            }

        } else {
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="graficiAnagrafiche.html?tipoAnagrafica=CLIENTE&home=1";
            }else{
                window.open("graficiAnagrafiche.html?tipoAnagrafica=CLIENTE&home=1","_self");  
            }
            
        }
    }
}

function calcolaHGrafico(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var h="41vh";

    // if (vw>700 || xIdCliente>0 || xIdAgente>0){
    //     if (vh>1300){
    //         h="60vh";
    //     }  else if (vh>1000){
    //         h="54vh";
    //     }  else if (vh>750){
    //         h="50vh";
    //     }else if (vh>700){
    //         h="47vh";
    //     }
    // } else {
    //     // if (vh>800){
    //     //     h="47vh";
    //     // } else if (vh>700){
    //     //     h="44vh";
    //     // }
        var hDivT=document.getElementById("divBase").offsetHeight;
        hDivT-=document.getElementById("divBase").getBoundingClientRect().top;
        hDivT-=document.getElementById("divTestaSuperiore").offsetHeight;
        hDivT-=document.getElementById("divPulsantiGrafici").offsetHeight;
        
        hDivT-=document.getElementById("filtriGrafici").offsetHeight;
        hDivT-=document.getElementById("pulsantiera").offsetHeight;
        return hDivT+"px";
    // }

    return h;
}

function selezionaDaMenuScomparsa(e){
    var inp=document.getElementById("ricercaArticoloVenditaBanco");

    inp.value=e.getAttribute("codice");

    sessionStorage.setItem(nomePagina+'.'+xIdConfigurazione+'.codiceArticolo',inp.value);                

    avviaCarDati();
}

function changeSelectPaginaCorrente(){
    sessionStorage.setItem(nomePagina+'.'+xIdConfigurazione+'.idDeposito',recuperaValueElemento("cmbDeposito"));
                
    avviaCarDati();
}

function chkCriticitaClick(){
    sessionStorage.setItem(nomePagina+'.'+xIdConfigurazione+'.chkCriticita',recuperaCheckedElemento("chkCriticita"));
                
    avviaCarDati();
}

function apriDettaglioOrdini(){
    var idDeposito=recuperaValueElemento("cmbDeposito");
    var codiceArticolo=recuperaValueElemento("ricercaArticoloVenditaBanco");
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="statoOrdini.html?codice="+codiceArticolo+"&idDeposito="+idDeposito;
    }else{
        window.open("statoOrdini.html?codice="+codiceArticolo+"&idDeposito="+idDeposito,xTarget);
    }
}

function pulisciCodiceArticolo(){
    var input = document.getElementById('ricercaArticoloVenditaBanco'); 
    input.value = ''; 
    input.focus(); 
    sessionStorage.removeItem(nomePagina+'.'+xIdConfigurazione+'.codiceArticolo');                
    avviaCarDati();
}

function recuperaUtentiConnessi(){
    var parametri={"tipoQuery":"listaUtenti","tipoRisposta":"utentiAttivi","nomeQuery":"utentiAttivi","chiamante":"utentiAttivi","ricerca":false,"db":"login"}; 
    inviaRichiestaCentralino("query",parametri,elaborarecuperaUtentiConnessi);
}

function elaborarecuperaUtentiConnessi() {
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data[0]!=undefined){
        valorizzaHTMLElemento("lblFatturato","Utenti Attualmente Attivi: "+data[0].nr);
    } else {
        valorizzaHTMLElemento("lblFatturato","Utenti Attualmente Attivi: 0");
    }
}
function apriModalGrafico(){
    var selectTab=localStorage.getItem(nomePagina+":"+xIdConfigurazione+":"+tipoAnagrafica+".tabSelect");

    var listaGrafici=`
    <div>
        <div class="w100"><button class="${selectTab=='tabFatture' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabFatture')==-1 ?'hide':''}" id="tabFatture" onclick="tabClick(this)">Fatture</button></div>
        <div class="w100"><button class="${selectTab=='tabDDT' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabDDT')==-1 ?'hide':''}" id="tabDDT" onclick="tabClick(this)">DDT</button></div>
        <div class="w100"><button class="${selectTab=='tabOrdini' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabOrdini')==-1 ?'hide':''}" id="tabOrdini" onclick="tabClick(this)">Ordini</button></div>
        <div class="w100"><button class="${selectTab=='tabProduzione' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabProduzione')==-1 ?'hide':''}" id="tabProduzione" onclick="tabClick(this)">Produzione</button></div>
        <div class="w100"><button class="${selectTab=='tabIngressi' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabIngressi')==-1 ?'hide':''}" id="tabIngressi" onclick="tabClick(this)">Ingressi</button></div>
        <div class="w100"><button class="${selectTab=='tabIncassi' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabIncassi')==-1 ?'hide':''}" id="tabIncassi" onclick="tabClick(this)">Incassi</button></div>
        <div class="w100"><button class="${selectTab=='tabPagamenti' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabPagamenti')==-1 ?'hide':''}" id="tabPagamenti" onclick="tabClick(this)">Pagamenti</button></div>
        <div class="w100"><button class="${selectTab=='tabArticoli' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabArticoli')==-1 ?'hide':''}" id="tabArticoli" onclick="tabClick(this)">Disponibilià</button></div>
        <div class="w100"><button class="${selectTab=='tabSlideShow' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabSlideShow')==-1 ?'hide':''}" id="tabSlideShow" onclick="tabClick(this)">Slide Show</button></div>
        <div class="w100"><button class="${selectTab=='tabCasse' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabCasse')==-1 ?'hide':''}" id="tabCasse" onclick="tabClick(this)">Casse</button></div>
        <div class="w100"><button class="${selectTab=='tabUtilizzo' ? 'tabLinkSelezionato':''} tablinkColonne intestazione testoTroncato1 marg2Top w100 ${tabDaSpostare.indexOf('tabUtilizzo')==-1 ?'hide':''}" id="tabUtilizzo" onclick="tabClick(this)">Utilizzo App</button></div>
    </div>
    `;

    query['modalSelezioneGrafico']=new Array;
    query['modalSelezioneGrafico']['modalC-body']=listaGrafici;
    
    apriModalCustom('modalSelezioneGrafico','','Tipo Grafico','',0,1);
    

}
function caricaJSONVendutoCasse(rs,dataDaP,desLbl,anno,torta){
    var tipoRaggruppamento=recuperaValueElemento("cmbRaggruppamentoCasse");
    var tipoGrafico=recuperaValueElemento("cmbTipoGrafico");
    divMese=document.getElementById("divMese");
    span=divMese.getElementsByTagName("span");
    mese=span[0].innerHTML


    var dati=new Array;
    var datiU=new Array;
    var datiT=new Array;
    var etichette=new Array;
    var colori=new Array;
    var totaleScontrinato=0;
    var z=-1;
    if (dataDaP!="") {
        var datiP=new Array;
        var datiTP=new Array;
        var datiUP=new Array;
    } else {
        var datiP="";
        var datiTP="";
        var datiUP="";
    }
    for (n in rs) {
        z+=1;
        colori[n]='rgba('+matriceColori[z]+',0.7)';
        if(document.getElementById("cmbRaggruppamentoCasse").value==0){
            etichette[n]=rs[n].RESPONSABILE;
        }else if(document.getElementById("cmbRaggruppamentoCasse").value==1){
            etichette[n]=rs[n].DEPOSITO;
        }else if(document.getElementById("cmbRaggruppamentoCasse").value==2){
            etichette[n]=rs[n].CAMPO;
        }
        
        totaleScontrinato+=Number(rs[n].IMPORTON);
        dati[n]=Number(rs[n].IMPORTON);
    }
    var lblFatturato=document.getElementById("lblFatturato");
    if(tipoRaggruppamento==0 || tipoRaggruppamento==1){
        if(tipoGrafico==1){
            desLbl='Totale Venduto '+mese+' '+recuperaValueElemento("cmbGiorno");
        }else if(tipoGrafico==2){
            
            desLbl='Totale Venduto '+mese;
        }else if(tipoGrafico==3){
            desLbl='Totale Venduto '+recuperaValueElemento("cmbAnno");
        }
    }else if(tipoRaggruppamento==2){
        if(tipoGrafico==1){
            desLbl='Totale Venduto '+mese;
        }else if(tipoGrafico==2){
            desLbl='Totale Venduto '+recuperaValueElemento("cmbAnno");
        }else if(tipoGrafico==3){
            desLbl='Totale Venduto complessivo';
        }
    }
    lblFatturato.innerHTML=desLbl+' € '+formattaNumeri(totaleScontrinato,2,0);
    var lblFatturatoP=document.getElementById("lblFatturatoP");
    lblFatturatoP.innerHTML='';
    fatturato=totaleScontrinato;
    valorizzaGrafico(etichette,dati,anno,datiP,(anno-1),torta,colori,fatturato,2,datiU,datiUP,datiT,datiTP,rs);

}