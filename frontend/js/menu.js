function avviaDaMenu(e){
    var idMenu=e.getAttribute("id");
    
    switch (idMenu){
        case "mnuAnagrafiche":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaClienti.html?tipoAnagrafica=ANAGRAFICA";
            }else{
                open("ListaClienti.html?tipoAnagrafica=ANAGRAFICA",xTarget);
            }
            break;
        case "mnuClienti":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaClienti.html";
            }else{
                open("ListaClienti.html",xTarget);
            }
            break;
        case "mnuFornitori":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaClienti.html?tipoAnagrafica=FORNITORE";
            }else{
                open("ListaClienti.html?tipoAnagrafica=FORNITORE",xTarget);
            }
            break;
        case "mnuPresaOrdini":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="ListaClienti.html";
            }else{
                open("ListaClienti.html",xTarget);
            }
            
            break;
        case "mnuListaMagazzino":
        case "mnuNuovoOrdine":
        case "mnuNovita":
        case "mnuFuoriCatalogo":
        case "mnuGiaAcquistati":
        case "mnuPromo":
        case "mnuRichiestaCatalogo":
            var reso=false;
            var tipoApertura='';

            if (xIdCliente>0) {
                switch(idMenu){
                    case "mnuResoMerce":
                        reso=true;
                        break;
                    case "mnuNovita":
                        tipoApertura='NEW';
                        break;
                    case "mnuFuoriCatalogo":
                        tipoApertura="FC";
                        break;
                    case "mnuPromo":
                        tipoApertura="INPROMOSCALA";
                        break;
                    case "mnuNuovoOrdine":
                        tipoApertura="tutti";
                        break;
                    case "mnuGiaAcquistati":
                        tipoApertura="VENDUTO";
                        break;
                    case "mnuRichiestaCatalogo":
                        tipoApertura="CATALOGO2022";
                        break;
                }

                avviaCarDatiSchedaCliente(reso,tipoApertura,false);
            } else {
                window.sessionStorage.setItem('idCliente','0');
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="ListaArticoli.html";
                }else{
                    window.open("ListaArticoli.html",xTarget);
                }
                
            }
            break;
        case "mnuStatoOrdini":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="statoOrdini.html";
            }else{
                window.open("statoOrdini.html",xTarget);
            }
            break;
        case "mnuSituazioneArticoli":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="situazioneArticoli.html";
            }else{
                window.open("situazioneArticoli.html",xTarget);
            }
            break;
        case "mnuScadutoClienti":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="scadenziario.html";
            }else{
                window.open("scadenziario.html",xTarget);
            }
            
            break;
        case "mnuScadutoFornitori":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="scadenziario.html?tipoAnagrafica=FORNITORES";
            }else{
                window.open("scadenziario.html?tipoAnagrafica=FORNITORES",xTarget);
            }
            break;
        case "mnuVendutoPeriodico":
            apriDettaglio("",1);
            break;
        case "mnuCodiciIva":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=codiciIva";
            }else{
                window.open("listeVarie.html?tabella=codiciIva",xTarget);
            }
            
            break;
        case "mnuFamiglieArticoli":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=famiglieArticoli";
            }else{
                window.open("listeVarie.html?tabella=famiglieArticoli",xTarget);
            }
            
            break;
        case "mnuTipologieArticoli":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=tipologieArticoli";
            }else{
                window.open("listeVarie.html?tabella=tipologieArticoli",xTarget);
            }
            break;
        case "mnuTipologieArticoli2":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=tipologieArticoli2";
            }else{
                window.open("listeVarie.html?tabella=tipologieArticoli2",xTarget);
            }
            break;
        case "mnuContratti":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=contratti&av=V";
            } else {
                window.open("listeVarie.html?tabella=contratti&av=V",xTarget);
            }
            break;
        case "mnuContrattiA":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=contratti&av=A";
            }else{
                window.open("listeVarie.html?tabella=contratti&av=A",xTarget);
            }
            break;
        case "mnuFamiglieCliFor":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=famiglieCliFor";
            }else{
                window.open("listeVarie.html?tabella=famiglieCliFor", xTarget);
            }
            
            break;
        case "mnuZone":
            if(typeof modElectron!='undefined' && modElectron==true){ 
                location.href="listeVarie.html?tabella=zone";
            }else{
                window.open("listeVarie.html?tabella=zone", xTarget);
                }
            break;
        case "mnuPagamenti": 
        if(typeof modElectron!='undefined' && modElectron==true){ 
            location.href="listaPagamenti.html";
        }else{
            window.open("listaPagamenti.html", xTarget);
        }
        break;
        case "mnuBanche":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=banche";
            }else{
                window.open("listeVarie.html?tabella=banche", xTarget);
            }
            break;
        case "mnuVeBa":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="venditaBanco.html";
            }else{
                window.open("venditaBanco.html",xTarget);
            }
            break;
        case "mnuDepositi":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=depositi";
            }else{
                window.open("listeVarie.html?tabella=depositi",xTarget);
            }
            
            break;    
        case "mnuRichiestaInfo":
            var whatsappTel=sessionStorage.getItem("whatsappTel");
            var Testo="Richiesta Informazioni da parte di "+xNome+" "+xCognome+" ("+xUserCom+") ";
            // if (gRe!=''){
                window.open('https://wa.me/39'+whatsappTel+'?text='+Testo.replace(/ /g, "%20").replace(/@/g,"%40"));
            // } else {
                // window.open("whatsapp://send/?phone=39"+whatsappTel+'&text='+Testo.replace(/ /g, "%20").replace(/@/g,"%40")+'&source=&data=',xTarget);
            // }
            break;
        case "mnuFatturato":
            if (xIdCliente==0){
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="graficiAnagrafiche.html?tipoAnagrafica=CLIENTE&home=1";
                }else{
                    window.open("graficiAnagrafiche.html?tipoAnagrafica=CLIENTE&home=1","_self");  
                }
                
            } else {
                avviaCarDatiSchedaCliente(false,"",true);
            }
            break;
        case "mnuOrdineEsterno":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href=xParametriPagina.shopEsterno;
            }else{
                window.open(xParametriPagina.shopEsterno,"_blank");  
            }
            break;
        case "mnuAggiornaOffLine":
            aggiornaFileOffLine();
            break;
        case "mnuAspettoBeni":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=aspettoBeni";
            }else{
                window.open("listeVarie.html?tabella=aspettoBeni",xTarget);
            }
            
            break;
        case "mnuCausaliTrasporto":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=causaliTrasporto";
            }else{
                window.open("listeVarie.html?tabella=causaliTrasporto",xTarget);
            }
            break;   
        case "mnuNoteAggiuntive":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=noteAggiuntive";
            }else{
                window.open("listeVarie.html?tabella=noteAggiuntive",xTarget);
            }
            break;
        case "mnuResoMerce":
            avviaCarDatiSchedaCliente(false,'resoMerce.htm',false,'resoMerce.html');
            break; 
        case "mnuSuggerimentiApp":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href=xParametriPagina.linkMigliorie;
            }else{
                window.open(xParametriPagina.linkMigliorie,"_blank");
            }
            
            break;   
        case "mnuAssortimentiArticoli":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=assortimentiArticoli";
            }else{
                window.open("listeVarie.html?tabella=assortimentiArticoli",xTarget);
            }
            break;
        case "mnuImmagini":
            if(xIdAgente>0){
                idTmp=xIdAgente;
            }else if(xIdCliente>0){
                idTmp=xIdCliente;
            }else if(xIdVettore){
                idTmp=xIdVettore;
            }else{
                return;
            }
            apriImmaginiMultiple('ANAGRAFICHE',idTmp);
            break;    
        case "mnuIncassiPeriodici":
            sessionStorage.removeItem("incassiPeriodici.dataDa");
            sessionStorage.removeItem("incassiPeriodici.dataA");
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="incassiPeriodici.html?tipoAnagrafica=CLIENTE";
            }else{
                window.open("incassiPeriodici.html?tipoAnagrafica=CLIENTE",xTarget);
            }
            
            break;                   
        case "mnuPagamentiPeriodici":
            sessionStorage.removeItem("incassiPeriodici.dataDa");
            sessionStorage.removeItem("incassiPeriodici.dataA");
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="incassiPeriodici.html?tipoAnagrafica=FORNITORE";
            }else{
            window.open("incassiPeriodici.html?tipoAnagrafica=FORNITORE",xTarget);
            }
            break;
        case "mnuProduzione":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="produzione.html";
            }else{
                window.open("produzione.html",xTarget);
            }
            break;       
        case "munFoglioDiCarico":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="foglioDiCarico.html";
            }else{
                window.open("foglioDiCarico.html",xTarget);
            }
            break;
        case "mnuScarichiMagazzino":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="produzione.html?tipoProduzione=scarichi";
            }else{
                window.open("produzione.html?tipoProduzione=scarichi",xTarget);
            }
            
            break;          
        case "mnuListeMagazzino":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeMagazzino.html";
            }else{
                window.open("listeMagazzino.html",xTarget);
            }
            break;     
        case "mnuRichiesteResi":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="richiesteresi.html";
            }else{
                window.open("richiesteresi.html",xTarget);
            }
            
            break;    
        case "mnulistaContrattiB2B":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listeVarie.html?tabella=ContrattiB2B";
            }else{
                window.open("listeVarie.html?tabella=ContrattiB2B",xTarget);
            }
            
            break;
        case "mnulistaAssistenze":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listaAssistenze.html";
            }else{
                window.open("listaAssistenze.html",xTarget);
            }
            break;    
        case "mnuStampaRapportoLavoro":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="stampaRapportoLavoro.html";
            }else{
                window.open("stampaRapportoLavoro.html",xTarget);
            }
            break;        
    }

    var chk=document.getElementById("nav-toggleMenu");
    chk.checked=false;
}

function caricaMenu(listaMenu){
    var menu=listaMenu.menu;
    var menuRapido=listaMenu.menuRapido;
    var menuPulsanti=listaMenu.pulsantiera;
    
    var ul=document.getElementById("ulMenu");
    var liG;
    var ulG;

    ul.innerHTML="";

    for (n in menu){
        // if (menu[n].nomeLi=="liAggiornaOffLine" && gRe==''){
        //     continue;
        // }

        if (menu[n].gruppo=="1"){
            liG = document.createElement("li");
            liG.id = menu[n].nomeLi; 
            
            ul.appendChild(liG);
            liG.innerHTML=elementiMenuGruppo.replace(/{DESCRIZIONE}/g,menu[n].descrizione);

            ulG = document.createElement("ul");
            ulG.setAttribute("class","panel w100 hCorpo scroo");
            liG.appendChild(ulG);
        } else {
            try {
                ulG.innerHTML+=elementiMenu.replace(/{NOMELI}/g,menu[n].nomeLi).replace(/{DESCRIZIONE}/g,menu[n].descrizione).replace(/{NOMEMENU}/g,menu[n].nomeMenu).replace(/{ICONA}/g,menu[n].icona);   
            } catch (error) {
                
            }
        }
    }

    ul.innerHTML+=`<li id="liArchiviDiv5" class=""><a id="-" href="#"></a></li>
        <li id="liLogOut" class=""><a id="logOut" href="#" onclick="navUserClick(this)">Esci</a></li>`;

    var div=document.getElementById("pulsantiera");
    div.innerHTML="";
   
    var verifica=document.getElementById("liAggiornaOffLine");
    verAggOffLine=(verifica!=undefined);
    var minusAggOffLine=0;

    localStorage.setItem("visualizzaOffLine",verAggOffLine);

    if (verAggOffLine){
        if (gRe!=""){
            dataUltimoAgg=localStorage.getItem("offLine.UltimoAggiornamento");
            if (dataUltimoAgg<oggiISO()){
                attivaAlert(5,"L'ultimo aggiornamento è stato eseguito il "+convertiDataEngIta(dataUltimoAgg)+".<br>Vuoi eseguire l'aggiornamento?","rispDomandaAggOffLine_0")
            }
        }
        
        document.getElementById("divOffLine").classList.remove("hide");
        
        var uImg=document.getElementById("userImg")

        if (xOffLine=="true"){
            valoreChk=true;
            uImg.classList.add("clrContornoRosso");
        } else {
            valoreChk=false;    
            uImg.classList.remove("clrContornoRosso");
        }
        valorizzaCheckedElemento("chkOffLine",valoreChk);
    } else {
        xOffLine=false;
    }

    if (verAggOffLine || gRe!=''){
        // try {
        //     if(disabilitaDownloadApk!=undefined && disabilitaDownloadApk==true){

        //     }else{
        //         document.getElementById("liAggiornaAppAndroid").classList.remove("hide");
        //     }
        // } catch (error) {
        //     document.getElementById("liAggiornaAppAndroid").classList.remove("hide");
        // }
    }
    for (n in menuRapido){
        if (verAggOffLine==false && menuRapido[n].nomeMenu=='mnuAggiornaOffLine'){
            minusAggOffLine=-1;
            continue;
        }
    
        if(xParametriPagina.pulsantiConDescrizione==1){
            
            var descrCustom=(menuRapido[n].descrizioneBreve).split(' ');
            div.innerHTML+=elementiPulsantieraConDescrizione.replace(/{DESCRIZIONE}/g,descrCustom[0]).replace(/{NOMEMENU}/g,menuRapido[n].nomeMenu).replace(/{ICONA}/g,menuRapido[n].icona);
        }else{
            div.innerHTML+=elementiPulsantiera.replace(/{DESCRIZIONE}/g,menuRapido[n].descrizione).replace(/{NOMEMENU}/g,menuRapido[n].nomeMenu).replace(/{ICONA}/g,menuRapido[n].icona);
        }
    }
    if(xParametriPagina.pulsantiConDescrizione==1){
        div.classList.remove('pulsantiera');
        div.classList.add('pulsantieraDescrizione');
        // div.parentNode.classList.remove('clrBase')
    }
        var varW=arrotonda(100/(menuRapido.length+minusAggOffLine),0);
        var p=div.getElementsByTagName("a");
        for (n in p){
            try {
                // p[n].setAttribute("class","w"+varW);
            } catch (error) {
                
            }
        }
    
    if(menuPulsanti[0]!=0){
        var div=document.getElementById("divPulsantiContainer");
        div.innerHTML="";

        for (n in menuPulsanti){
            if (verAggOffLine==false && menuPulsanti[n].nomeMenu=='mnuAggiornaOffLine'){
                continue;
            }

            div.innerHTML+=elementiPulsanti.replace(/{DESCRIZIONE}/g,menuPulsanti[n].descrizione).replace(/{NOMEMENU}/g,menuPulsanti[n].nomeMenu).replace(/{ICONA}/g,menuPulsanti[n].icona);
        }
    }
}

function rispDomandaAggOffLine(risp,id){
    if (risp=="Si"){
        aggiornaFileOffLine();
    } else {
        localStorage.setItem("offLine.UltimoAggiornamento",oggiISO());
        chiudiModalAlert("rispDomandaAggOffLine."+id);
    }
}