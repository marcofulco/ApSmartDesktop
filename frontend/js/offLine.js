var alertAggiorna=`<div class="row w100 cx marg10Bottom testoNormale testo30 intestazione clrScuro">AGGIORNAMENTO DATI OFFLINE</div>
    <div class="divOLContainer row w100-10p marg5Sx marg5Dx h100-120p scrollY-Auto"></div>`;
var alertAggiornaTabelle=`<div class="row col3 testoNormale testo20 clrSfumatoScuro">
    <div class="divOLSpinner row lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <img class="divOLImgOk row imgPiccola54 hide" src="img/bianche/ok.svg">
    <div class="divOLTesto row w100-80p h30p marg15Sx marg15Top testoTroncato1"></div>
</div>`;

var pagineOffLine=["mainPage.html","ListaClienti.html","schedaCliente.html","ListaArticoli.html","venditaBanco.html"];
var jSonAttesi=0;
var jSonRicevuti=0;
var idbAttesi=0;
var idbCompletati=0;
var imgAttese=0;
var imgRicevute=0;

var g=0;
var presenzaErrori=false;

var modalAggiorna;

var nomeIndexedDB='apWeb'
var db;

function attivaDisattivaModalitaOffLine(chk,avviaReload=true,callBack=''){
    if (chk.checked) {
        if (gRe==''){
            attivaAlert(2,"Modalità Off Line non Utilizzabile in Ambiente WebAPP!","attivaDisattivaOffLine;");        
            chk.checked=false;
            return;
        }
    }
    
    localStorage.setItem("offLine",chk.checked); 
    if (chk.checked) {
        xOffLine="true";
    } else {
        xOffLine="false";
        var uImg=document.getElementById("userImg");
        if (uImg!=undefined){
            uImg.classList.remove("clrContornoRosso");
        }
    }

    if (avviaReload==true){
        location.reload();   
    }

    if (callBack!=''){
        callBack(!chk.checked);
    }
}

// var noSleep = new NoSleep();

function aggiornaFileOffLine(){
    // noSleep.enable();
    apriIndexedDB(nomeIndexedDB,avviAggiornaFileOffLine);
}

function avviAggiornaFileOffLine(){
    modalAggiorna = document.createElement("div");
    
    modalAggiorna.id = "divAggiornaOffLine";
    modalAggiorna.setAttribute("name","myAlert"); 
    modalAggiorna.setAttribute("class","modalAlert");
    modalAggiorna.innerHTML = alertAggiorna;

    document.body.appendChild(modalAggiorna);
    
    modalAggiorna.style.display="block";
    
    presenzaErrori=false;    
    g=0;
    jSonRicevuti=0;
    jSonAttesi=0;
    idbCompletati=0;
    idbAttesi=0;
    imgAttese=0;
    imgRicevute=0;
    immaginiDaScaricare=[];
    inizioImg=0;
    maxImg=0;

    richiediJSonLogin();
}

function creaDivAttesa(nomeDiv,descrizione){
    var div=document.createElement("div");
    div.id=nomeDiv;
    div.innerHTML=alertAggiornaTabelle;

    modalAggiorna.getElementsByClassName("divOLContainer")[0].prepend(div);

    var sDiv=div.getElementsByClassName("divOLTesto");
    sDiv[0].innerHTML=descrizione

    div.style.display="block";
}

function confermaSuDivAttesa(nomeDiv){
    try {
        var div=document.getElementById(nomeDiv);
        var sDiv=div.getElementsByClassName("divOLSpinner");
        sDiv[0].classList.add("hide");
        sDiv=div.getElementsByClassName("divOLImgOk");
        sDiv[0].classList.remove("hide");   
    } catch (error) {
        
    }
}

function chiudiDivAttesa(){
    try {
        modalAggiorna.parentNode.removeChild(modalAggiorna);
    } catch (error) {
        
    }
}

function richiediJSonLogin(bloccante=true){
    if(bloccante==true){
    creaDivAttesa("divOffLineLogin","Dati Login");
    }
    if (xOffLine!="true"){
        var idDisp="offLine."+xIdDispositivo;
    } else {
        var idDisp=xIdDispositivo;
    }

    var parametri={"userName": xUserCom,"password":gRe, "idServer":xDB,"chiamante":"login","idDispositivo":idDisp,"app":gRe,"captchaToken":"","pwdOL":gRe,"bloccante":bloccante};
    
    jSonAttesi++;
    

    inviaRichiestaCentralino("login",parametri,elaboraJSonLogin,"body");
}

function elaboraJSonLogin(res){

    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    if(parametri.bloccante==true){
    confermaSuDivAttesa("divOffLineLogin")
    }
    if (risp.error!=''){
        chiudiDivAttesa()
        return "";
    }

    if (data.esito!="ok." || data.esito=="elenco") {
        if(parametri.bloccante==true){
            chiudiDivAttesa()
            attivaAlert(2,data.esito,"verificaTokenNonOk");
        }
    } else {
        if (data.token==''){
            attivaAlert(2,"Accesso Non Valido!","verificaToken");        
        } else {
            if (data.idAgente==null){
                data.idAgente=0;
            }

            if (data.idCliente==null){
                data.idCliente=0;
            }

            localStorage.setItem("offLine.t",data.token);
            localStorage.setItem("offLine.userName",parametri.userName);
            localStorage.setItem("offLine.s",data.idServer);
            localStorage.setItem("offLine.nome",data.nome);
            localStorage.setItem("offLine.cognome",data.cognome);
            localStorage.setItem("offLine.img",data.img);
            localStorage.setItem("offLine.superUser",data.superUser);
            localStorage.setItem("offLine.gruppoUtente",data.gruppoUtente);
            localStorage.setItem("offLine.versioneApp",data.versioneApp);
            localStorage.setItem("offLine.imgLogoInt",data.imgLogo);
            localStorage.setItem("offLine.ragSocCliente",data.ragSocCliente);
            localStorage.setItem("offLine.ragSocAgente",data.ragSocAgente);
            localStorage.setItem("offLine.nomeConfigurazione",data.nomeConfigurazione);
            localStorage.setItem("offLine.idC",data.idConfigurazione);
            localStorage.setItem("offLine.mailMittente",data.mailMittente);
            localStorage.setItem("offLine.nomeMittente",data.nomeMittente);
            localStorage.setItem("offLine.listino",data.listino);
            localStorage.setItem("offLine.xIdAgente",data.idAgente);
            localStorage.setItem("offLine.xIdCliente",data.idCliente);
            localStorage.setItem("offLine.fileAppAndroid",data.fileAppAndroid);

            if (xOffLine=="true"){
                xTkCom=data.token;
            }
            
                jSonRicevuti++;
            if(parametri.bloccante==true){
                verificaFineAggiornamento();  
            }else{
                verificaFineAggiornamento2();  
            }  
        }
    }
}

function richiediJSonParametriPagine(bloccante=true){
    
    jSonAttesi+=pagineOffLine.length;
    
    for (x in pagineOffLine){
        var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":pagineOffLine[x], "userName":"",'bloccante':bloccante};       
        if(bloccante==true){
        creaDivAttesa("divOffLine"+parametri.nomePagina,"Parametri Pagine "+parametri.nomePagina);
        }
        inviaRichiestaCentralino("parametri",parametri,elaboraJSonParametriPagine,"body","chiudiDivAttesa");
    }
}

function elaboraJSonParametriPagine(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    if(parametri.bloccante==true){
    confermaSuDivAttesa("divOffLine"+parametri.nomePagina);
    }
    if (risp.error!=''){
        if(parametri.bloccante==true){
        chiudiDivAttesa();
        }
    }    

    localStorage.setItem("offLine."+parametri.nomePagina+".parametri",res);
    
    jSonRicevuti++;
    if(parametri.bloccante==true){
    verificaFineAggiornamento();
    }else{
        verificaFineAggiornamento2();
    }
}

function richiediJSonGrafici(){
    var annoP=Number(oggiISO().substring(0,4));
    var meseP=Number(oggiISO().substring(5,7));
    
    var d=new Date();
    var tipoGrafico="Giorno"
    var fatturato=1;
    var ordini=0;
    var incassi=0;
    var idOperatore="";
    var torta=0;
    var ingressi=0;
    var pagamenti=0;
    var minMese=0;

    for (anno=annoP;anno>=annoP-1;anno--){
        if (anno==annoP-1){
            meseP=12;
            minMese=10;
        }

        for (mese=meseP;mese>minMese;mese--){
            var sMese=new String(100+mese).substring(1,3);

            dataDa="01/"+sMese+"/"+anno;
            dataDaP="01/"+sMese+"/"+(anno-1);

            desLbl="FT "+nomiMesi[parseInt(mese)-1].substring(0,3)+' '+anno;
            desLblP="FT "+nomiMesi[parseInt(mese)-1].substring(0,3)+' '+(anno-1);

            switch (sMese){
                case "04":
                case "06":
                case "09":
                case "11":
                    dataA="30/"+sMese+"/"+anno; 
                    
                    d=new Date();
                
                    if (anno==d.getFullYear() && parseInt(sMese)==(d.getMonth()+1)) {
                        dataAP=(d.getDate())+"/"+(d.getMonth()+1)+"/"+(anno-1);
                    } else {
                        dataAP="30/"+sMese+"/"+(anno-1);       
                    }

                    break;
                case "02":
                    int_d = new Date(anno, 2, 1);
                    d = new Date(int_d - 1);

                    if (d.getDate()==29){
                        dataA="29/"+sMese+"/"+anno;       
                        
                        d=new Date();

                        if (anno==d.getFullYear() && parseInt(sMese)==(d.getMonth()+1)) {
                            dataAP=(d.getDate())+"/"+sMese+"/"+(anno-1);
                        } else {
                            int_d = new Date(anno-1, 2, 1);
                            d = new Date(int_d - 1);

                            if (d.getDate()==29){
                                dataAP="29/"+sMese+"/"+(anno-1);       
                            } else {
                                dataAP="28/"+sMese+"/"+(anno-1);       
                            }
                        }
                    } else {
                        dataA="28/"+sMese+"/"+anno;       
                        d=new Date();

                        if (anno==d.getFullYear() && parseInt(sMese)==(d.getMonth()+1)) {
                            dataAP=(d.getDate())+"/"+sMese+"/"+(anno-1);
                        } else {
                            dataAP="28/"+sMese+"/"+(anno-1);       
                        }
                    }

                    break;
                default:
                    dataA="31/"+sMese+"/"+anno;      
                    
                    d=new Date();

                    if (anno==d.getFullYear() && parseInt(sMese)==(d.getMonth()+1)) {
                        dataAP=(d.getDate())+"/"+sMese+"/"+(anno-1);
                    } else {
                        dataAP="31/"+sMese+"/"+(anno-1);       
                    }
            }

            if (xParametriPagina.dataAPFineMese==1){
                d=new Date();

                if (anno==d.getFullYear() && parseInt(sMese)==(d.getMonth()+1)) {
                    dataAP=ultimoGiornoMeseIta(anno-1,d.getMonth()+1);
                }
            }

            jSonAttesi++;    
            
            var parametri={"tipoRisposta":"grafico","tipoQuery":"grafici","nomeQuery":"mainPage.html:"+tipoGrafico,"tipoGrafico":tipoGrafico, 
                                "azienda":0,"idCliente":0,"idAgente":0,"dataDa":dataDa,"dataA":dataA,"dataDaP":dataDaP,"dataAP":dataAP,
                                "desLbl":desLbl, "desLblP":desLblP, "d":d, "anno":anno, "mese":sMese ,"chiamante":tipoGrafico,"fatture":fatturato,
                                "ordini":ordini,"incassi":incassi,"idOperatore":idOperatore,"torta":torta, "ingressi":ingressi, "pagamenti":pagamenti
                            };
            
            creaDivAttesa("divOffLineG"+parametri.tipoGrafico+anno+sMese,"Grafico "+tipoGrafico+" "+anno+" "+sMese);

            inviaRichiestaCentralino("query",parametri,elaboraJSonGrafici,"body","chiudiDivAttesa");
        }
    }

    tipoGrafico="Mese";
    sMese="";

    for (anno=annoP;anno>=annoP-1;anno--){
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

        jSonAttesi++;    
            
        var parametri={"tipoRisposta":"grafico","tipoQuery":"grafici","nomeQuery":"mainPage.html:"+tipoGrafico,"tipoGrafico":tipoGrafico, 
                            "azienda":0,"idCliente":0,"idAgente":0,"dataDa":dataDa,"dataA":dataA,"dataDaP":dataDaP,"dataAP":dataAP,
                            "desLbl":desLbl, "desLblP":desLblP, "d":d, "anno":anno, "mese":sMese ,"chiamante":tipoGrafico,"fatture":fatturato,
                            "ordini":ordini,"incassi":incassi,"idOperatore":idOperatore,"torta":torta, "ingressi":ingressi, "pagamenti":pagamenti
                        };
        
        creaDivAttesa("divOffLineG"+parametri.tipoGrafico+anno+sMese,"Grafico "+tipoGrafico+" "+anno+" "+sMese);

        inviaRichiestaCentralino("query",parametri,elaboraJSonGrafici,"body","chiudiDivAttesa");
    }
}

function elaboraJSonGrafici(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    
    confermaSuDivAttesa("divOffLineG"+parametri.tipoGrafico+parametri.anno+parametri.mese);

    localStorage.setItem("offLine."+parametri.nomeQuery+"."+parametri.anno+"."+parametri.mese,res);

    jSonRicevuti++;

    verificaFineAggiornamento();
}

function richiediJSonClienti(bloccante=true,modificati=false){
    if(modificati==false){
    var parametri;

    parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"Mandante", "select":"cmbMandante","bloccante":bloccante};
    parametri.md5=localStorage.getItem("cmbMandante.md5");
    
    jSonAttesi++;  
    if(bloccante==true){
    creaDivAttesa("divOffLineC"+parametri.nomeTabella,parametri.nomeTabella);
    }
    inviaRichiestaCentralino("query",parametri,elaboraJSonClienti,"body","chiudiDivAttesa");

    var elencoSelect=[{"tipoRisposta":"elencoLocalita","sottoQuery":"localita"},
                        {"tipoRisposta":"elencoProvince","sottoQuery":"province"},
                        {"tipoRisposta":"elencoZone","sottoQuery":"zone"},
                        {"tipoRisposta":"elencoFamiglie","sottoQuery":"famiglie"}
                    ];
    
    var ricerca="";
    var righe=1;
    var ricarica=true;
    var scrollTop=0;
    var localita="";
    var prov="";
    var idZona=0;
    var idFamiglia=0;
    var aperti=0;
    var fetch=0;
    var offSet=0;
    var tipoAnagrafica="CLIENTE";
    var mandante=0;

    for (x in elencoSelect){
        var nomeQuery="ListaClienti.html";
    
        if (elencoSelect[x].sottoQuery!=''){
            nomeQuery+=":"+elencoSelect[x].sottoQuery;
        }
        
        jSonAttesi++;
        
        var parametri={"tipoQuery":"listaClienti","tipoRisposta":elencoSelect[x].tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca, "tipoElenco":righe, 
            "ricarica":ricarica, "scrollTop":scrollTop,"azienda":0,"idCliente":0,"idAgente":0,"localita":localita,"prov":prov,
            "idZona":idZona,"idFamiglia":idFamiglia,"aperti":aperti,"offSet":offSet,"fetch":fetch,
            "chiamante":elencoSelect[x].tipoRisposta, "tipoAnagrafica":tipoAnagrafica, "mandante":mandante, "bloccante":bloccante
            }; 
          
        parametri.md5=localStorage.getItem(parametri.tipoRisposta+".md5");
        if(bloccante==true){
            creaDivAttesa("divOffLineC"+parametri.tipoRisposta,parametri.tipoRisposta);
        }
        
        inviaRichiestaCentralino("query",parametri,elaboraJSonClienti,"body","chiudiDivAttesa");
    }
    }
    var elencoSelect=[{"sottoQuery":"","tabellaOffLine":"clienti"},
                        {"sottoQuery":"rubrica","tabellaOffLine":"rubrica"},
                        {"sottoQuery":"destinazioni","tabellaOffLine":"destinazioni"},
                        {"sottoQuery":"annotazioni","tabellaOffLine":"annotazioni"},
                        {"sottoQuery":"mandanti","tabellaOffLine":"mandanti"}
                    ];
    if(modificati==true){
        var elencoSelect=[{"sottoQuery":"","tabellaOffLine":"clienti"}];
    }
    for (x in elencoSelect){
        var nomeQuery="schedaCliente.html";
    
        if (elencoSelect[x].sottoQuery!=''){
            nomeQuery+=":"+elencoSelect[x].sottoQuery;
        } 
        if(bloccante==true){
            idbAttesi++;
            
        }
        jSonAttesi++;
        var parametri={"tipoQuery":"OffLine","tipoRisposta":"elencoClienti","nomeQuery":nomeQuery,"chiamante":elencoSelect[x].tabellaOffLine,"bloccante":bloccante}; 
        
        if(elencoSelect[x].sottoQuery==''){
            
            if (modificati==true){
                
                var dataAggiornamento=localStorage.getItem("dbClienti."+xIdConfigurazione);
                if(dataAggiornamento==null || dataAggiornamento=="" || dataAggiornamento==undefined){
                    parametri.dataAggiornamento="01/01/1900";
                }else{
                    parametri.dataAggiornamento=dataAggiornamento;
                }
            }else{
                parametri.dataAggiornamento="01/01/1900";
                // parametri.dataAggiornamento=dataAggiornamento;
            }
        }
        //parametri.md5=localStorage.getItem("offLine."+parametri.nomeQuery+".md5");
        if(bloccante==true){
            parametri.idbAttesi=1;
            creaDivAttesa("divOffLineO"+parametri.chiamante,parametri.chiamante);
        }
        

        inviaRichiestaCentralino("query",parametri,elaboraJSonClienti,"body","chiudiDivAttesa");
    }
}

function elaboraJSonClienti(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    
    jSonRicevuti++;
    
    
    if(parametri.bloccante==false){
            verificaFineAggiornamento2();
    }
    if (parametri.tipoRisposta=="select"){
        if(parametri.bloccante==true){
            confermaSuDivAttesa("divOffLineC"+parametri.nomeTabella,parametri.nomeTabella);
        }
        if (risp.error!=''){
            if(parametri.bloccante==true){
            verificaFineAggiornamento();
            }
            return "";
        }
    
        if (Array.isArray(data)){
            if(data[0]==0){
                if(parametri.bloccante==true){
                verificaFineAggiornamento();
                }
                return "";
            }
        }
        
        data=verificaMd5(parametri.select,parametri,risp,data);
        if(parametri.bloccante==true){
            verificaFineAggiornamento();
        }
    } else if (parametri.tipoRisposta!="elencoClienti") {
       
        if(parametri.bloccante==true){
            confermaSuDivAttesa("divOffLineC"+parametri.tipoRisposta,parametri.tipoRisposta);
        }
        if (risp.error!=''){
            if(parametri.bloccante==true){
                verificaFineAggiornamento();
            }
            return "";
        }
    
        if (Array.isArray(data)){
            if(data[0]==0){
                if(parametri.bloccante==true){
                    verificaFineAggiornamento();
                }
                return "";
            }
        }

        data=verificaMd5(parametri.tipoRisposta,parametri,risp,data);
        if(parametri.bloccante==true){
            verificaFineAggiornamento();
        }
    } else {
        
        if(parametri.dataAggiornamento!=undefined){
            localStorage.setItem("dbClienti."+xIdConfigurazione,convertiDataEngIta(oggiISO()));
        }
        if (risp.error!=''){
            if(parametri.bloccante==true){
            idbCompletati++;
            confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
            verificaFineAggiornamento();
            }
            return "";
        }
    
        // if (parametri.md5==risp.md5){
        //     idbCompletati++;
        //     confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
        //     verificaFineAggiornamento();
        //     return "";
        // }
        
        //localStorage.setItem("offLine."+parametri.nomeQuery+".md5",risp.md5);
        
        if (Array.isArray(data)){
            if(data[0]==0){
                if(parametri.bloccante==true){
                    idbCompletati++;
                    confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
                    verificaFineAggiornamento();
                }
            
                return "";
            }
        }
        if(parametri.bloccante==true){
            aggiornaTabellaIndexedDB(parametri.chiamante,data,verificaFineAggiornamento);
        }else{
            gestioneTabellaIndexDb(parametri.chiamante,data,(res)=>{               
            },false);
        }
    }
}

function richiediJSonArticoli(){
    var parametri;
    var elencoCmb=[{"select":"cmbPagamento","nomeTabella":"tesPagamenti"},{"select":"cmbVettore","nomeTabella":"vettori"},{"select":"recordSetProvviggioniAgente","nomeTabella":"recordSetProvviggioniAgente"}];

    for (x in elencoCmb){
        parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":elencoCmb[x].nomeTabella, "select":elencoCmb[x].select};
        parametri.md5=localStorage.getItem(elencoCmb[x].select+".md5");

        jSonAttesi++;  
        creaDivAttesa("divOffLineA"+parametri.nomeTabella,parametri.nomeTabella);

        inviaRichiestaCentralino("query",parametri,elaboraJSonArticoli,"body","chiudiDivAttesa");
    }

    var elencoSelect=[
                        {"tipoRisposta":"elencoArticoli","sottoQuery":""},
                        {"tipoRisposta":"elencoAssortimento","sottoQuery":"assortimenti"},
                        {"tipoRisposta":"elencoFamiglia","sottoQuery":"famiglie"},
                        {"tipoRisposta":"elencoTipologia","sottoQuery":"tipologie"},
                        {"tipoRisposta":"elencoAttributo","sottoQuery":"attributi"}
                    ];

    var ricerca="";
    var ricercaF="";
    var righe=1;
    var ricarica=true;
    var scrollTop=0;
    var parametriArticoli={"TabAssortimento":0, "TabFamiglia":1, "TabMarchio":0, "TabAttributi":1, "tabDefault":"tabFamiglia", "modelloRighe":"elementiListaArticoli",
        "decimaliPrezzi":xParametriGenerali.decimaliPrezzi, "noPulsantieraLista":0, "hDescrizione":40, "hContainer":"", "hLi":"", "hContainerNP":"", "hLiNP":"", "visCosto":0,
        "modelloRigheNP":"elementiListaArticoli", "modificaPrezzi":0, "ricaricoVerde":25, "ricaricoArancione":20, "ricaricoRosso":15, "ricaricoViola":0,
        "modificheGuajana":0, "idDest":"0", "stampaAuto":0, "modificheTroia":0, "omaggioSoloMandante":0};
    var idCliente=0;
    var cIdDest=0;
    var idFamiglia=0;
    var idSFamiglia=0;
    var idSFam1=0;
    var idSFam2=0;
    var idTipologia=0;
    var idFornitore=0;
    var soloDisponibili=0;
    var soloVendutiClienteCorrente=0;
    var idAssortimento=0;
    var codice='';
    var inEliminazione=0;
    var idIvaCliente=0;
    var percIvaCliente=0;
    var inPromo=0;
    var nuovo=0;
    var fuoriCatalogo=0;
    var tNoPromo=1;
    var scalaSconti=0;
    var primaApertura=true;
    var promoScala=0;
    var noSconti=1;
    var tNoNetti=1;
    
    for (x in elencoSelect){
        if (elencoSelect[x].sottoQuery!=''){
            var nomeQuery="ListaArticoli.html:"+elencoSelect[x].sottoQuery;
        } else {
            var nomeQuery="ListaArticoli.html";
        }
    
        var maxFetch=0;
        
        if (elencoSelect[x].sottoQuery=='assortimenti'){
            idbAttesi++;

            var parametri={"tipoQuery":"OffLine","tipoRisposta":elencoSelect[x].tipoRisposta,"nomeQuery":nomeQuery,"chiamante":elencoSelect[x].sottoQuery}; 

            parametri.idbAttesi=1;

            creaDivAttesa("divOffLineO"+parametri.chiamante,parametri.tipoRisposta);
        } else {
            var parametri={"tipoQuery":"listaArticoli","tipoRisposta":elencoSelect[x].tipoRisposta,"nomeQuery":nomeQuery,"ricerca":ricerca,"ricercaF":ricercaF,"tipoElenco":righe, 
                "ricarica":ricarica, "scrollTop":scrollTop,"azienda":0,"idCliente":idCliente,"idDest":cIdDest,"idAgente":0,"idFamiglia":idFamiglia,"idSFamiglia":idSFamiglia,
                "idSFam1":idSFam1,"idSFam2":idSFam2,"idTipologia":idTipologia,"idFornitore":idFornitore,"soloDisponibili":soloDisponibili,
                "soloVendutiClienteCorrente":soloVendutiClienteCorrente,"idAssortimento":idAssortimento, "codice":codice, "inEliminazione":inEliminazione,
                "offSet":0,"fetch":0,"chiamante":elencoSelect[x].tipoRisposta, "percorsoImmagini":xPercorsoImmagini,
                "decimaliPrezzi":parametriArticoli["decimaliPrezzi"], "hDescrizione":parametriArticoli["hDescrizione"], "hContainer":parametriArticoli["hContainer"],
                "hLi":parametriArticoli["hLi"], "hContainerNP":parametriArticoli["hContainerNP"],"hLiNP":parametriArticoli["hLiNP"], "idIvaCliente":idIvaCliente,
                "percIvaCliente":percIvaCliente, "inPromo":inPromo, "nuovo":nuovo, "fuoriCatalogo":fuoriCatalogo, "noPromo":tNoPromo, "scalaSconti":scalaSconti,
                "primaApertura":primaApertura, "promoScala":promoScala, "noSconti":noSconti, "noNetti":tNoNetti
                }; 
    
            parametri.md5=localStorage.getItem(elencoSelect[x].tipoRisposta+".md5");
            
            if (elencoSelect[x].sottoQuery==''){
                parametri.offLine=1;
                parametri.idbAttesi=1;
                //parametri.md5=localStorage.getItem("offLine."+parametri.nomeQuery+".md5");

                idbAttesi++;
                creaDivAttesa("divOffLineOarticoli","Articoli");
            } else {
                creaDivAttesa("divOffLineA"+parametri.tipoRisposta,parametri.tipoRisposta);
            }
        }
    
        jSonAttesi++; 

        inviaRichiestaCentralino("query",parametri,elaboraJSonArticoli,"body","chiudiDivAttesa");
    }
}

function elaboraJSonArticoli(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    jSonRicevuti++;

    if (parametri.tipoRisposta=="select"){
        confermaSuDivAttesa("divOffLineA"+parametri.nomeTabella);

        if (risp.error!=''){
            verificaFineAggiornamento();
            return "";
        }
    
        if (Array.isArray(data)){
            if(data[0]==0){
                verificaFineAggiornamento();
                return "";
            }
        }

        data=verificaMd5(parametri.select,parametri,risp,data);
        verificaFineAggiornamento();
    } else if (parametri.tipoRisposta=='elencoAssortimento'){
        if (risp.error!=''){
            idbCompletati++;
            confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
            verificaFineAggiornamento();
            return "";
        }
        
        if (Array.isArray(data)){
            if(data[0]==0){
                idbCompletati++;
                confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
                verificaFineAggiornamento();
                return "";
            }
        }
        
        aggiornaTabellaIndexedDB(parametri.chiamante,data,verificaFineAggiornamento);
    } else if (parametri.tipoRisposta!='elencoArticoli'){
        confermaSuDivAttesa("divOffLineA"+parametri.tipoRisposta);
        
        if (risp.error!=''){
            verificaFineAggiornamento();
            return "";
        }
    
        if (Array.isArray(data)){
            if(data[0]==0){
                verificaFineAggiornamento();
                return "";
            }
        }

        data=verificaMd5(parametri.tipoRisposta,parametri,risp,data);
        verificaFineAggiornamento();
    } else {
        if (risp.error!=''){
            idbCompletati++;
            confermaSuDivAttesa("divOffLineOarticoli");
            verificaFineAggiornamento();
            return "";
        }
        
        if (Array.isArray(data)){
            if(data[0]==0){
                idbCompletati++;
                confermaSuDivAttesa("divOffLineOarticoli");
                verificaFineAggiornamento();
                return "";
            }
        }

        aggiornaTabellaIndexedDB("articoli",data,verificaFineAggiornamento);
    }
}

var elencoSelectC=[{"tabella":"scalaSconti","offSet":0,"fetch":50000},{"tabella":"contratti","offSet":0,"fetch":50000}];

function richiediJSonContratti(x){
    elencoSelectC[x].offSet=0;
    avviRichiestaJSonContratti(x);
}

function avviRichiestaJSonContratti(x){
    var parametri;
    var nomeQuery="ListaArticoli.html:"+elencoSelectC[x].tabella;

    var parametri={"tipoQuery":"OffLine","tipoRisposta":elencoSelectC[x].tabella,"nomeQuery":nomeQuery,"chiamante":elencoSelectC[x].tabella, "offSet":elencoSelectC[x].offSet,"fetch":elencoSelectC[x].fetch, "x":x}; 

    parametri.idbAttesi=1;

    jSonAttesi++; 
    idbAttesi++;

    creaDivAttesa("divOffLineO"+parametri.chiamante+parametri.offSet,parametri.chiamante+" "+parametri.offSet);
    inviaRichiestaCentralino("query",parametri,elaboraJSonContratti,"body","chiudiDivAttesa");
}

function elaboraJSonContratti(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    jSonRicevuti++;

    if (risp.error!=''){
        idbCompletati++;
        confermaSuDivAttesa("divOffLineO"+parametri.chiamante+parametri.offSet);
        verificaFineAggiornamento();
        return "";
    }
    
    if (Array.isArray(data)){
        if(data[0]==0){
            idbCompletati++;
            confermaSuDivAttesa("divOffLineO"+parametri.chiamante+parametri.offSet);
            verificaFineAggiornamento();
            return "";
        }
    }

    elencoSelectC[parametri.x].offSet+=Number(parametri.fetch);

    if (presenzaErrori==false){
        avviRichiestaJSonContratti(Number(parametri.x));
    }

    aggiornaTabellaIndexedDB(parametri.chiamante,data,verificaFineAggiornamento,parametri.offSet,false);
}



var presente;

function richiediJSonImmagini(){
    var parametri;
    var nomeQuery="ListaArticoli.html:immagini";

    var parametri={"tipoQuery":"OffLine","tipoRisposta":"immagini","nomeQuery":nomeQuery,"chiamante":"immagini"}; 

    parametri.idbAttesi=1;

    jSonAttesi++; 
    idbAttesi++;

    creaDivAttesa("divOffLineOimmagini","DB Immagini");
    inviaRichiestaCentralino("query",parametri,elaboraJSonImmagini,"body","chiudiDivAttesa");
}

function elaboraJSonImmagini(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    jSonRicevuti++;

    if (risp.error!=''){
        idbCompletati++;
        confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
        verificaFineAggiornamento();
        return "";
    }
    
    if (Array.isArray(data)){
        if(data[0]==0){
            idbCompletati++;
            confermaSuDivAttesa("divOffLineO"+parametri.chiamante);
            verificaFineAggiornamento();
            return "";
        }
    }

    presente=data[0].PRESENTE;
    aggiornaTabellaIndexedDB(parametri.chiamante,data,verificaFineAggiornamento,"",false,"IMMAGINE");
}

var immaginiDaScaricare=[];

function richiediFileImmagini(){
    creaDivAttesa("divOffLineOFileImmagini","Verifica File Immagini");

    var z=0;
    var tot=0;

    var e=document.getElementById("divOffLineOFileImmagini");
    var d=e.getElementsByClassName("divOLTesto")

    nrRecordTabellaIndexedDB("immagini").then(function(result) {
        tot=result;
    
        var transaction = db.transaction(["immagini"], "readwrite");
        transaction.oncomplete = function(event) {
            downloadOffLineImg();
        };

        var objectStore = transaction.objectStore("immagini");        
        objectStore.openCursor().onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor!=undefined){
                var data=cursor.value;

                if (data.PRESENTE!=presente){
                    objectStore.delete(data.IMMAGINE);
                } else {
                    if (data.blob==undefined){
                        immaginiDaScaricare.push(data);
                    }
                }

                z++;

                d[0].innerHTML="Verifica File Immagini ("+z+" di "+tot+")";
                
                cursor.continue();
            }
        };
    });
}

var inizioImg=0;
var maxImg=0;

function downloadOffLineImg(){
    imgAttese=immaginiDaScaricare.length;

    if (imgAttese==0 || (imgRicevute==imgAttese && imgRicevute>0)){
        verificaFineAggiornamento();
        return;
    }

    var e=document.getElementById("divOffLineOFileImmagini");
    var d=e.getElementsByClassName("divOLTesto")
    d[0].innerHTML="File Immagini ("+imgRicevute+" di "+imgAttese+")";

    maxImg=inizioImg+50;
    if (maxImg>imgAttese){
        maxImg=imgAttese;
    }

    for (x=inizioImg;x<maxImg;x++){
        avviaOffLineDownloadImg(immaginiDaScaricare[x]);
    }    
}

function avviaOffLineDownloadImg(datax){
    var url=urlImmagineArticolo(datax.IMMAGINE,"","rect","230",false,false,true);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);   
    xhr.responseType = "blob";

    var e=document.getElementById("divOffLineOFileImmagini");
    var d=e.getElementsByClassName("divOLTesto")
    
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            const reader = new FileReader();

            // reader.addEventListener("load", function () {
            reader.onload=function () {
                // convert image file to base64 string
                datax.blob = reader.result;
                var transaction = db.transaction("immagini", "readwrite");
                transaction.oncomplete = function(event) {
                    
                };
                
                var obj=transaction.objectStore("immagini");
                obj.put(datax).onsuccess=function(e){
                    imgRicevute++;

                    d[0].innerHTML="File Immagini ("+imgRicevute+" di "+imgAttese+")";

                    if (imgRicevute==maxImg) {
                        inizioImg=maxImg;
                        downloadOffLineImg();    
                    }
                }
            }
            // }, false);

            reader.readAsDataURL(xhr.response);
        }
    }, false);
    xhr.send();
}

function verificaFineAggiornamento(){
    if (jSonRicevuti>=jSonAttesi && idbCompletati>=idbAttesi && imgRicevute>=imgAttese){
        g++;
        switch (g){
            case 1:
                richiediJSonParametriPagine();
                richiediJSonGrafici();
                break;
            case 2:
                richiediJSonClienti();
                break;
            case 3:
                richiediJSonArticoli();
                break;
            case 4:
                creaDivAttesa("divOffLineP"+elencoSelectC[0].tabella,"Pulizia Tabella "+elencoSelectC[0].tabella);
                pulisciTabellaIndexedDB(elencoSelectC[0].tabella,richiediJSonContratti,'',0);
                break;
            case 5:
                creaDivAttesa("divOffLineP"+elencoSelectC[1].tabella,"Pulizia Tabella "+elencoSelectC[1].tabella);
                pulisciTabellaIndexedDB(elencoSelectC[1].tabella,richiediJSonContratti,'',1);
                break;
            case 6:
                richiediJSonImmagini();
                break;
            case 7:
                richiediFileImmagini();
                break;
            default:
                localStorage.setItem("offLine.UltimoAggiornamento",oggiISO());
                confermaSuDivAttesa("divOffLineOFileImmagini");
                attivaAlert(4,"Aggiornamento Dati OffLine Completato!","aggiornaOffLine","","","chiudiDivAttesa");
                break;
        }
    }
}

function pulisciTabellaIndexedDB(nomeTabella,callBack,extraNome='',parametroCallBack=''){
    var transaction = db.transaction([nomeTabella], "readwrite");
    transaction.oncomplete = function(event) {
        confermaSuDivAttesa("divOffLineP"+nomeTabella+extraNome);
        callBack(parametroCallBack);
    };

    var objectStore = transaction.objectStore(nomeTabella);
    objectStore.clear();
}

function aggiornaTabellaIndexedDB(nomeTabella,data,callBack,extraNome='',pulisciTabella=true,verificaEsistenza=false,aggiornaTotaliIDB=false){
    var transaction = db.transaction([nomeTabella], "readwrite");
    transaction.oncomplete = function(event) {
        idbCompletati++;
        confermaSuDivAttesa("divOffLineO"+nomeTabella+extraNome);
        callBack();
    };
    
    var objectStore = transaction.objectStore(nomeTabella);

    if (pulisciTabella){
        var request = objectStore.clear();
        request.onsuccess=function(){
            aggiungiDatiTabelleIndexedDB(data,objectStore,verificaEsistenza,aggiornaTotaliIDB);
        }
    } else {
        aggiungiDatiTabelleIndexedDB(data,objectStore,verificaEsistenza,aggiornaTotaliIDB);
    }
}

function aggiungiDatiTabelleIndexedDB(data,objectStore,verificaEsistenza=false,aggiornaTotaliIDB=false){
    var totObj=data.length;
    
    if (aggiornaTotaliIDB!=false){
        aggiornaTotaliIDB.totale=totObj;
        var e=document.getElementById(aggiornaTotaliIDB.nomeElemento);
        var d=e.getElementsByClassName("divOLTesto");
        d.innerHTML=aggiornaTotaliIDB.descrizione+" (0 di "+aggiornaTotaliIDB.totale+")";
    }

    data.forEach(function(datax) {
        if (presenzaErrori==true){
            return;
        }

        if (verificaEsistenza!=false){
            var e=document.getElementById("divOffLineOimmagini");
            var d=e.getElementsByClassName("divOLTesto");
            var request=objectStore.get(datax[verificaEsistenza]);
            request.onsuccess = function(event) {
                var rs=event.target.result
                if (rs!=undefined){
                    rs.PRESENTE=datax.PRESENTE;
                    var requestUpdate = objectStore.put(rs);
                    requestUpdate.onerror = function(event) {
                        // console.log(event);
                        // console.error(event);
                        // console.log(datax);
                        console.error('Errore  verifica essistenza: (PUT)'+event.target.source.transaction.error);
                        presenzaErrori=true;
                        return;
                    };
                    requestUpdate.onsuccess = function(event) {
                            d[0].innerHTML="DB Immagini "+datax.IMMAGINE;
                    };
                } else {
                    var request = objectStore.add(datax);
                    request.onsuccess = function(event) {
                            d[0].innerHTML="DB Immagini "+datax.IMMAGINE;
                    };
                    request.onerror = function(event) {
                        console.error('Errore con verifica essistenza (ADD): '+event.target.source.transaction.error);                        
                        presenzaErrori=true;
                        return;
                    };
                }
            };
        }  else {
            var request = objectStore.add(datax);
            request.onsuccess = function(event) {
                
            };
            
            request.onerror = function(event) {
                console.error(event);
                console.log(datax);
                console.log('Errore Effettivo: '+event.target.source.transaction.error);
                presenzaErrori=true;
            };
        }
    });
}

function aggiornaBlobImg(blob,aggiornaTotaliIDB=false){
    var request = objectStore.add(datax);
    request.onsuccess = function(event) {
        
    };
    
    request.onerror = function(event) {
        console.log(event);
        console.error(event);
        console.log(datax);
        presenzaErrori=true;
    };
}

function scriviTabellaOrdinata(rs,parametri,ordinamento,callBack){
    var trO=db.transaction([parametri.nomeTabellaOrdinata],'readwrite');
    var tabO = trO.objectStore(parametri.nomeTabellaOrdinata);
    var request = tabO.clear();
    
    request.onsuccess=function(){
        var rAttesi=rs.length;
        var rOk=0;
        var request;

        if (rAttesi!=0){
            rs.forEach(function(datax) {
                request = tabO.add(datax);
                request.onsuccess = function(event) {
                    rOk++;
                    
                    if (rOk==rAttesi){
                        leggiTabellaIndexedDB(parametri.nomeTabellaOrdinata,parametri,ordinamento,callBack,true,[],rAttesi);
                    }
                };
            });
        } else {
            leggiTabellaIndexedDB(parametri.nomeTabellaOrdinata,parametri,ordinamento,callBack,true,[],rAttesi);
        }
    }
}

async function leggiTabellaIndexedDB(nomeTabella,parametri,ordinamento,callBack,giaFiltrata=false,rsD=[],totaleRecord=-1){
    var rs = [];
    var saltati=0;

    if (parametri.offSet==undefined){
        parametri.offSet=0;
        parametri.fetch=0;
    }

    if (rsD.length>0){
        rs=rsD;
        saltati=parametri.saltati;
    }

    if (giaFiltrata==false && parametri.attivaAlert==true && rsD.length==0){
        attivaAlert(3,"","ricercaIDB","","","",true,3000);
    }
    
    nrRecordTabellaIndexedDB(nomeTabella).then(function(result) {
        total = result;
        parametri.totaleRecordTabella=total;

        if (totaleRecord>-1){
            query[nomePagina]["MAXFETCH"]=totaleRecord;
        } else {
            query[nomePagina]["MAXFETCH"]=total;
        }

        if (total==0){
            res=impacchettaRispostaIndexedDB([0],parametri);
            callBack(res);
            return;
        } else if (total<parametri.offSet){
            res=impacchettaRispostaIndexedDB(rs,parametri);
            callBack(res);
            return;
        } 

        var hasSkipped = false;
        var nomeFiltro=[];
        var filtro=[];

        var nomeFiltroI=[];
        var nomeFiltroIte=[];

        var t = db.transaction([nomeTabella],'readonly');
        var tab = t.objectStore(nomeTabella);

        if (parametri.campiFiltro!=undefined && giaFiltrata==false){
            for (x in parametri.campiFiltro){
                switch (parametri.campiFiltro[x].tipoControllo){
                    case "=":
                        if (parametri[parametri.campiFiltro[x].nomeParametro]!='' && parametri[parametri.campiFiltro[x].nomeParametro]!='0' && parametri[parametri.campiFiltro[x].nomeParametro]!=null){
                            nomeFiltro.push(parametri.campiFiltro[x].nomeChiave);
                            filtro.push(String(parametri[parametri.campiFiltro[x].nomeParametro]));
                        }
                        break;  
                    case ">0":
                        if (parametri[parametri.campiFiltro[x].nomeParametro]>0){
                            nomeFiltroI.push(parametri.campiFiltro[x].nomeIterazione);
                            nomeFiltroIte.push(parametri.campiFiltro[x].nomeChiave);
                        }
                        break;    
                }
            }

            if (filtro.length>0 || nomeFiltroI.length>0){
                if (parametri.offSet==0){
                    if (nomeFiltro.length==1){
                        nomeFiltro=nomeFiltro[0];
                        filtro=filtro[0];
                    } else if (nomeFiltroI.length==1 && nomeFiltro.length==0) {
                        filtro=IDBKeyRange.lowerBound("0",true);
                        nomeFiltro=nomeFiltroIte[0];
                        nomeFiltroI=[];
                    }

                    var index = tab.index(nomeFiltro);    
                    
                    var req=index.openCursor(filtro);
                    req.onsuccess = function(e) {
                        var cursor = e.target.result;
                        
                        if(cursor) {
                            if (nomeFiltroI.length>0){
                                for (x in nomeFiltroI){
                                    if (cursor.value[nomeFiltroI[x]]=='0,00' || cursor.value[nomeFiltroI[x]].substring(0,1)=="-"){
                                        cursor.continue();
                                        return;            
                                    }
                                }
                            }
                            rs.push(cursor.value);
                            cursor.continue();
                        } else {
                            scriviTabellaOrdinata(rs,parametri,ordinamento,callBack);
                        }
                    };
                    return;
                } else {
                    nomeTabella=parametri.nomeTabellaOrdinata;
                    var t = db.transaction([nomeTabella],'readonly');
                    var tab = t.objectStore(nomeTabella);
                }
            } 
        }

        if (parametri.campoID!=undefined){
            var filtro=parametri[parametri.campoID];

            tab.get(filtro).onsuccess = function(e) {
                rs=[e.target.result];
                res=impacchettaRispostaIndexedDB(rs,parametri);
                callBack(res);
            }
        } else {
            if (ordinamento!=''){
                var index = tab.index(ordinamento);
            } else {
                var index=tab;
            }

            var filtroIN=[];
            var filtroR="";

            if (parametri[ordinamento]!=''){
                if (parametri[ordinamento].substring(0,1)!='+' && parametri[ordinamento].substring(0,1)!='%'){
                    filtroR=new RegExp("^"+parametri[ordinamento].toLowerCase().replace(/ /g,''),"g");
                } else {
                    if (parametri[ordinamento].indexOf(" ")>=0){
                        var w=parametri[ordinamento].toLowerCase().substring(1).split(" ");
                        var re="";

                        for (x in w){
                            re+='(?=.*'+w[x]+")";
                        }
                        filtroR=new RegExp(re,"g");
                    } else {
                        filtroR=new RegExp(parametri[ordinamento].toLowerCase().substring(1),"g");
                    }
                }
            }

            if (parametri.campiFiltroIN!=undefined){
                for (x in parametri.campiFiltroIN){
                    if (parametri[parametri.campiFiltroIN[x].nomeParametro]!='' && parametri[parametri.campiFiltroIN[x].nomeParametro]!='0' && parametri[parametri.campiFiltroIN[x].nomeParametro]!=null){
                        var obj={};
                        obj.nomeCampo=parametri.campiFiltroIN[x].nomeChiave;
                        obj.valore=parametri[parametri.campiFiltroIN[x].nomeParametro];

                        if (parametri.campiFiltroIN[x].testo!=undefined){
                            obj.testo=1;
                        }

                        filtroIN.push(obj);
                    }
                }
            }

            hasSkipped = false;

            var dati;

            index.openCursor().onsuccess = function(e) {
                var cursor = e.target.result;
                if(!hasSkipped && parametri.offSet > 0) {
                    hasSkipped = true;
                    cursor.advance(parametri.offSet);
                    return;
                }
                
                if(cursor) {
                    dati=cursor.value;

                    if (filtroR!=''){
                        if (!dati[ordinamento].match(filtroR)){
                            saltati++;
                            cursor.continue();
                            return;            
                        }
                    }

                    if (filtroIN.length>0){
                        for (x in filtroIN){
                            var obj=eval(dati[filtroIN[x].nomeCampo]);

                            if (obj!=undefined){
                                if (filtroIN[x].testo!=undefined){
                                    var test=filtroIN[x].valore
                                } else {
                                    var test=Number(filtroIN[x].valore);
                                }

                                if (obj.includes(test)==false){
                                    saltati++;
                                    cursor.continue();
                                    return; 
                                }
                            }  else {
                                saltati++;
                                cursor.continue();
                                return; 
                            }
                        }
                    }

                    rs.push(dati);

                    if(rs.length < parametri.fetch || parametri.fetch==0) {
                        cursor.continue();
                    } else {
                        ricercaDatiAggiuntiviIndexedDB(rs,parametri,callBack,saltati);
                    }
                } else {
                    ricercaDatiAggiuntiviIndexedDB(rs,parametri,callBack,saltati);
                }
            };
        }
    });
}

function ricercaDatiAggiuntiviIndexedDB(rs,parametri,callBack,saltati){
    if (parametri.funzioniParticolari!=undefined){
        parametri.saltati=saltati;
        parametri.callBack=callBack;
        parametri.funzioniParticolari(rs,parametri);    
    } else {
        parametri.fetch+=saltati;
        res=impacchettaRispostaIndexedDB(rs,parametri);
        callBack(res);
    }
}

function impacchettaRispostaIndexedDB(rs,parametri){
    if (rs.length==0){
        rs=[0];
    }

    if (parametri.attivaAlert==true){
        richiestaAJAXinCorso=0;
        chiudiModalBox("ricercaIDB");
    }

    var res={"parametri":parametri,"risposta":rs, "error":"", "md5":"no"};
    return JSON.stringify(res);
}

function nrRecordTabellaIndexedDB(nomeTabella) {
	return new Promise(function(resolve, reject) {
        try {
            var request=db.transaction([nomeTabella],'readonly').objectStore(nomeTabella).count();
            request.onsuccess = function(e) {
                resolve(e.target.result);
            };
        } catch (error) {
            resolve(0);
        }
	});
}

function apriIndexedDB(nomeDB,callBack){    
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    
    if (!('indexedDB' in window)) {
        attivaAlert(2,"IndexedDB non supportato! Impossibile Utilizzare i dati OffLine.","apriIndexedDB","","","chiudiDivAttesa");
        return;
    }
    
    var request = indexedDB.open(nomeDB, 26);

    request.onerror = function(event) {
        attivaAlert(2,event.target.error.message,"dbError","","","chiudiDivAttesa");
        console.error("Database error: " + event); 
        presenzaErrori=true;
    };

    request.onupgradeneeded = function(event) {
        var dbU = event.target.result;

        switch (event.oldVersion){
            case 0:
                var objectStore = dbU.createObjectStore("mandanti", { keyPath: "ID" });
                objectStore.createIndex("IDMANDANTE", "IDMANDANTE", { unique: false });
                objectStore.createIndex("IDCLI", "IDCLI", { unique: false });
            case 1:
            case 2:
                var objectStore = dbU.createObjectStore("rubrica", { keyPath: "ID" });
                objectStore.createIndex("IDCLI", "IDCLI", { unique: false });

                var objectStore = dbU.createObjectStore("destinazioni", { keyPath: "ID" });
                objectStore.createIndex("ID_ANAG", "ID_ANAG", { unique: false });
                
                var objectStore = dbU.createObjectStore("annotazioni", { keyPath: "ID" });
                objectStore.createIndex("IDRIF", "IDRIF", { unique: false });
            case 3:
            case 4:
                var objectStore = dbU.createObjectStore("listaClienti", { keyPath: "ID" });
                objectStore.createIndex("ricerca", "RAGIONE_SOCIALE", { unique: false });
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                var objectStore = dbU.createObjectStore("clienti", { keyPath: "ID" });
                objectStore.createIndex("ricerca", "ricerca", { unique: false });
            case 10:
            case 11:
                dbU.deleteObjectStore("clienti");
                var objectStore = dbU.createObjectStore("clienti", { keyPath: "ID" });
                objectStore.createIndex("ricerca", "ricerca", { unique: false });
                objectStore.createIndex(["localita","prov","idFamiglia","idZona"], ["LOCALITA","PROV","idFamiglia","idZona"], { unique: false }); 
                objectStore.createIndex(["localita","prov"], ["LOCALITA","PROV"], { unique: false }); 
                objectStore.createIndex("localita", "LOCALITA", { unique: false });
                objectStore.createIndex("prov", "PROV", { unique: false });
                objectStore.createIndex("idFamiglia", "RAGGRUPPAMENTO", { unique: false });
                objectStore.createIndex("idZona", "ZONA", { unique: false });      
                objectStore.createIndex(["localita","prov","idFamiglia"], ["LOCALITA","PROV","idFamiglia"], { unique: false }); 
                objectStore.createIndex(["localita","idFamiglia"], ["LOCALITA","idFamiglia"], { unique: false }); 
                objectStore.createIndex(["localita","idZona"], ["LOCALITA","idZona"], { unique: false }); 
                objectStore.createIndex(["prov","idFamiglia","idZona"], ["PROV","idFamiglia","idZona"], { unique: false }); 
                objectStore.createIndex(["prov","idFamiglia"], ["PROV","idFamiglia"], { unique: false }); 
                objectStore.createIndex(["prov","idZona"], ["PROV","idZona"], { unique: false }); 
                objectStore.createIndex(["idFamiglia","idZona"], ["idFamiglia","idZona"], { unique: false }); 
                objectStore.createIndex("saldo", "saldoR", { unique: false });
                objectStore.createIndex(["PIVA","CF"], ["PIVA","CF"], { unique: false });
            case 12:
                dbU.deleteObjectStore("mandanti");
                var objectStore = dbU.createObjectStore("mandanti", { keyPath: "ID" });
                objectStore.createIndex("IDMANDANTE", "IDMANDANTE", { unique: false }); 
            case 13:
                var objectStore = dbU.createObjectStore("articoli", { keyPath: "CODICE" });
                objectStore.createIndex("ricerca", "ricerca", { unique: false });
            case 14:
                var objectStore = dbU.createObjectStore("listaArticoli", { keyPath: "CODICE" });
                objectStore.createIndex("ricerca", "ricerca", { unique: false });
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                dbU.deleteObjectStore("articoli");
                var objectStore = dbU.createObjectStore("articoli", { keyPath: "CODICE" });
                objectStore.createIndex("ricerca", "ricerca", { unique: false });
                objectStore.createIndex(["idGrMerc","idTipologia","oDisp","oNuovo"], ["idGrMerc","idTipologia","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idGrMerc","idTipologia","oDisp"], ["idGrMerc","idTipologia","oDisp"], { unique: false }); 
                objectStore.createIndex(["idGrMerc","idTipologia"], ["idGrMerc","idTipologia"], { unique: false }); 
                objectStore.createIndex("idGrMerc", "idGrMerc", { unique: false }); 
                objectStore.createIndex(["idGrMerc","oDisp","oNuovo"], ["idGrMerc","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idGrMerc","oNuovo"], ["idGrMerc","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSGrMerc","idTipologia","oDisp","oNuovo"], ["idSGrMerc","idTipologia","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idGrMerc","oDisp"], ["idGrMerc","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSGrMerc","idTipologia","oDisp"], ["idSGrMerc","idTipologia","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSGrMerc","idTipologia"], ["idSGrMerc","idTipologia"], { unique: false }); 
                objectStore.createIndex("idSGrMerc","idSGrMerc", { unique: false }); 
                objectStore.createIndex(["idSGrMerc","oDisp","oNuovo"], ["idSGrMerc","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSGrMerc","oNuovo"], ["idSGrMerc","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSGrMerc","oDisp"], ["idSGrMerc","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSFam1","idTipologia","oDisp","oNuovo"], ["idSFam1","idTipologia","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam1","idTipologia","oDisp"], ["idSFam1","idTipologia","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSFam1","idTipologia"], ["idSFam1","idTipologia"], { unique: false }); 
                objectStore.createIndex("idSFam1", "idSFam1", { unique: false }); 
                objectStore.createIndex(["idSFam1","oDisp","oNuovo"], ["idSFam1","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam1","oNuovo"], ["idSFam1","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam1","oDisp"], ["idSFam1","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSFam2", "idTipologia","oDisp","oNuovo"], ["idSFam2","idTipologia","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam2","idTipologia","oDisp"], ["idSFam2","idTipologia","oDisp"], { unique: false }); 
                objectStore.createIndex(["idSFam2","idTipologia"], ["idSFam2","idTipologia"], { unique: false }); 
                objectStore.createIndex("idSFam2","idSFam2", { unique: false }); 
                objectStore.createIndex(["idSFam2","oDisp","oNuovo"], ["idSFam2","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam2","oNuovo"], ["idSFam2","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idSFam2","oDisp"], ["idSFam2","oDisp"], { unique: false }); 
                objectStore.createIndex(["idTipologia","oDisp","oNuovo"], ["idTipologia","oDisp","oNuovo"], { unique: false }); 
                objectStore.createIndex(["idTipologia","oDisp"], ["idTipologia","oDisp"], { unique: false }); 
                objectStore.createIndex("idTipologia","idTipologia", { unique: false }); 
                objectStore.createIndex(["idTipologia","oNuovo"], ["idTipologia","oNuovo"], { unique: false }); 
                objectStore.createIndex(["oDisp","oNuovo"], ["oDisp","oNuovo"], { unique: false });
                objectStore.createIndex("oDisp", "oDisp", { unique: false }); 
                objectStore.createIndex("oNuovo", "oNuovo", { unique: false }); 
            case 20:
                var objectStore = dbU.createObjectStore("assortimenti", { keyPath: "CODICEASS" });
                objectStore.createIndex("ricerca", "DESCRIZIONE", { unique: false });
            case 21:
                var objectStore = dbU.createObjectStore("contratti", { keyPath: ["ID","ARTICOLO"]});
                var objectStore = dbU.createObjectStore("scalaSconti", { keyPath: ["ID","ARTICOLO"]});
                var objectStore = dbU.createObjectStore("listaContratti", { keyPath: ["ID","ARTICOLO"]});
                objectStore.createIndex("riga", "RIGA", { unique: false }); 
                var objectStore = dbU.createObjectStore("listaScalaSconti", { keyPath: ["ID","ARTICOLO"]});
                objectStore.createIndex("riga", "RIGA", { unique: false }); 
            case 22:
                var objectStore = dbU.createObjectStore("immagini", { keyPath: "IMMAGINE"});
                dbU.deleteObjectStore("listaContratti");
                dbU.deleteObjectStore("listaScalaSconti");
            case 23:
                var objectStore = dbU.createObjectStore("immaginiBlob", { keyPath: "IMMAGINE"});
            case 24:
                dbU.deleteObjectStore("immagini");
                var objectStore = dbU.createObjectStore("immagini", { keyPath: "IMMAGINE"});
                dbU.deleteObjectStore("immaginiBlob");
            case 25:
                var objectStore = dbU.createObjectStore("codiciAggiuntivi", { keyPath: "CODAGG"});
                var objectStore = dbU.createObjectStore("dbArticoli", { keyPath: "CODICE"});
                var objectStore = dbU.createObjectStore("documentiVeBa", { keyPath: "identificativo"});
        }
        
    };

    request.onsuccess = function(e) {
        db = e.target.result;
        db.onerror = function(event) {
            attivaAlert(2,event.target.error.message,"dbError");
            console.error("Database error: " +event.target.source.transaction.error);
            console.log(event);
        };
        callBack();
    };
}

function assegnaImmagineOffLine(imgID,immagine){
    immagine=immagine.replace(xPercorsoImmagini,"");
    
    var t = db.transaction(["immagini"],'readonly');
    var tab = t.objectStore("immagini");

    tab.get(immagine).onsuccess = function (event) {
        var imgFile = event.target.result;
        if (imgFile!=undefined){
            const preview = document.getElementById(imgID);

            try {
                preview.src = imgFile.blob;
            } catch (error) {
                
            }

            // const reader = new FileReader();

            // reader.addEventListener("load", function () {
            //     // convert image file to base64 string
            //     preview.src = reader.result;
            // }, false);

            // reader.readAsDataURL(imgFile.blob);
        }
    };
}

/*SEZIONE PER VENDITA AL BANCO */
function richiediJSonCodiciAggiuntivi(pulisciTabella=true){
    var parametri;
    var nomeQuery="ListaArticoli.html:codiciAggiuntivi";
    jSonAttesi++;
    var parametri={"tipoQuery":"OffLine","tipoRisposta":"codiciAggiuntivi","nomeQuery":nomeQuery,"chiamante":"codiciAggiuntivi"}; 

    
    inviaRichiestaCentralino("query",parametri,(res)=>{
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
        var callback=()=>{
            // verificaFineAggiornamento2();
        };
        
        gestioneTabellaIndexDb(parametri.chiamante,data,callback,pulisciTabella,false);
    },"caricamentoDati");
}
function richiediJSonDbArticoli(modificati=false){
    var parametri;
    jSonAttesi++;
    var parametri={"chiamante":"dbArticoli","tipoQuery":"ricercaElencoArticoli","nomeTabella":"ricercaElencoArticoli","nomeQuery":"elencoArticoli","select":"elencoArticoli","CODICE":"","DESCRIZIONE":"","FAMIGLIA":"","SFAMIGLIA0":"","SFAMIGLIA1":"","SFAMIGLIA2":"","TIPOLOGIA":"","TIPOLOGIA2":"","FORNITORE":"","AZIENDA":"","DEPOSITO":"","SERVIZI":0,"OBSOLETI":0,"GIAC1":0,"GIAC0":0};
    if (modificati==true){
        var dataAggiornamento=localStorage.getItem("dbArticoli."+xIdConfigurazione);
        if(dataAggiornamento==null || dataAggiornamento=="" || dataAggiornamento==undefined){
            dataAggiornamento="01/01/1900";
        }else{
            parametri.dataAggiornamento=dataAggiornamento;
        }
    }else{
        dataAggiornamento="01/01/1900";
        parametri.dataAggiornamento=dataAggiornamento;
    }
    inviaRichiestaCentralino("query",parametri,(res)=>{
        var risp=JSON.parse(res);
        var parametri=risp.parametri;
        var data=risp.risposta;

        if (risp.error!=''){
        }
        
        if (Array.isArray(data)){
            if(data[0]==0){              
                return "";
              
            }
        }
        
            callback=()=>{
                    localStorage.setItem("dbArticoli."+xIdConfigurazione,convertiDataEngIta(oggiISO()));
                // verificaFineAggiornamento2();
            };
        if(modificati==true){
            pulisciTabella=false;
        }else{
            pulisciTabella=true;
        }
        gestioneTabellaIndexDb(parametri.chiamante,data,callback,pulisciTabella,false);
    },'caricamentoDati');
}

function leggiTabellaIndexedDBSemplice(tabella,recordoRicerca,callBack){
    var trans = db.transaction([tabella],'readonly');
    var store  = trans.objectStore(tabella);
    var request=store.get(recordoRicerca);
    request.onsuccess = function (event) {
        var obj={
            'error': event.target.error==null? '':event.target.error,
        }
        if(event.target.result!=undefined){
            obj.risposta=event.target.result;
        }else{
            obj.risposta= new Array();
            obj.risposta[0]=0;
        }
        callBack(obj);
        return;
    }
    request.onerror = function (event) {
        console.error('Si è verificato un errore');
    }
}
function ciclaTabellaIndexedDBSemplice(tabella,record,callBack,parametri='',indice=''){
    var trans = db.transaction([tabella],'readonly');
    var store  = trans.objectStore(tabella);
    
    if(indice!=''){
        store.index(indice).openCursor(null).onsuccess =iteraOggetto
        
    }else{
        const lowerBound = record;
        const upperBound = record + "\uffff";
        filtro=IDBKeyRange.bound(lowerBound, upperBound);
        store.openCursor(filtro).onsuccess =iteraOggetto
    }
    
    
    var recordRaccolti=new Array();
      function iteraOggetto(e) {
       
        var cursor = e.target.result;
       
        if(cursor!=null ){
            
        var chiave=cursor.key.toString();
        var partialMatch = false;

        if (Array.isArray(cursor.key)) {
          partialMatch = cursor.key.some((keyPart) => keyPart.includes(record));
        } else {
          partialMatch = chiave.includes(record);
        }
        
        if( typeof cursor.value === 'object'){
            var valore=JSON.stringify(cursor.value);
        }else if(typeof cursor.value === 'string'){
            var valore=cursor.value.toString();
        }
        if (partialMatch && indice!='') {
            recordRaccolti.push(cursor.value);
          }else{          
            if(typeof record === 'string'){
            
                if ((chiave).substring(0,record.length)==record || (valore).substring(0,record.length)==record) {
                    recordRaccolti.push(cursor.value);
                    
                }
            }else if(typeof record === 'object'){
                
                if(record[chiave]!=undefined){
                    
                    recordRaccolti.push(cursor.value);
                }
                
            }
        }
        if(parametri!=''){
            if(parametri.limite!=undefined){
                if(recordRaccolti.length==parametri.limite){
                    callBack(recordRaccolti);
                    return;
                }
            }
        }
        
        cursor.continue();
        }else{
            callBack(recordRaccolti);
            return;
        }
        
    }
    store.onerror = function (event) {
        console.error("Errore durante la lettura dei dati:", event.target.errorCode);
      };
}
function gestioneTabellaIndexDb(nomeTabella,data,callBack,pulisciTabella=true,verificaEsistenza=false){
    var transaction = db.transaction([nomeTabella], "readwrite");
    transaction.oncomplete = function(event) {
        if(typeof callBack === "function"){
            callBack();
        }
        
    };
    var objectStore = transaction.objectStore(nomeTabella);
    // console.log('fuori pulizia '+nomeTabella);
    if (pulisciTabella){
        var request = objectStore.clear();
        request.onsuccess=function(){
            // console.log('pulizia effettuata'+nomeTabella);
            putDatiTabelleIndexedDB(data,objectStore,verificaEsistenza);
        }
    } else {
        putDatiTabelleIndexedDB(data,objectStore,verificaEsistenza);
    }
}


function putDatiTabelleIndexedDB(data, objectStore, verificaEsistenza = false) {
    let putOperations = [];

    data.forEach(function (datax) {
        if (verificaEsistenza != false) {
            let request = objectStore.get(datax[verificaEsistenza]);
            putOperations.push(
                request.then(function (rs) {
                    if (rs != undefined) {
                        return objectStore.put(rs);
                    } else {
                        return objectStore.add(datax);
                    }
                })
            );
        } else {
            putOperations.push(objectStore.put(datax));
        }
    });

    Promise.all(putOperations)
        .then(function () {
            verificaFineAggiornamento2();
            console.log('fine inserimento dati');
        })
        .catch(function (error) {
            console.error('Errore durante inserimento dati:', error);
        });
}

function richiediJSonLoginVenditaBanco(callBack){
    
    if (xOffLine!="true"){
        var idDisp="offLine."+xIdDispositivo;
    } else {
        var idDisp=xIdDispositivo;
    }

    var parametri={"userName": xUserCom,"password":gRe, "idServer":xDB,"chiamante":"login","idDispositivo":idDisp,"app":gRe,"captchaToken":"","pwdOL":gRe};

    inviaRichiestaCentralino("login",parametri,function (res){
        var risp=JSON.parse(res);
        
        var parametri=risp.parametri;
        var data=risp.risposta;
        if (risp.error!=''){
            chiudiDivAttesa()
            return "";
        }
    
        if (data.esito!="ok." || data.esito=="elenco") {

        } else {
            if (data.token==''){
                attivaAlert(2,"Accesso Non Valido!","verificaToken");        
            } else {
                if (data.idAgente==null){
                    data.idAgente=0;
                }
    
                if (data.idCliente==null){
                    data.idCliente=0;
                }
    
                localStorage.setItem("offLine.t",data.token);
                localStorage.setItem("offLine.userName",parametri.userName);
                localStorage.setItem("offLine.s",data.idServer);
                localStorage.setItem("offLine.nome",data.nome);
                localStorage.setItem("offLine.cognome",data.cognome);
                localStorage.setItem("offLine.img",data.img);
                localStorage.setItem("offLine.superUser",data.superUser);
                localStorage.setItem("offLine.gruppoUtente",data.gruppoUtente);
                localStorage.setItem("offLine.versioneApp",data.versioneApp);
                localStorage.setItem("offLine.imgLogoInt",data.imgLogo);
                localStorage.setItem("offLine.ragSocCliente",data.ragSocCliente);
                localStorage.setItem("offLine.ragSocAgente",data.ragSocAgente);
                localStorage.setItem("offLine.nomeConfigurazione",data.nomeConfigurazione);
                localStorage.setItem("offLine.idC",data.idConfigurazione);
                localStorage.setItem("offLine.mailMittente",data.mailMittente);
                localStorage.setItem("offLine.nomeMittente",data.nomeMittente);
                localStorage.setItem("offLine.listino",data.listino);
                localStorage.setItem("offLine.xIdAgente",data.idAgente);
                localStorage.setItem("offLine.xIdCliente",data.idCliente);
                localStorage.setItem("offLine.fileAppAndroid",data.fileAppAndroid);
    
                if (xOffLine=="true"){
                    xTkCom=data.token;
                }
                callBack();
            }
        }
    },"body");
}
function richiediJSonLoginVenditaBancoOnline(callBack=''){
      
    var idDisp=xIdDispositivo;
    if(idDisp.indexOf("offLine.")>-1){
        idDisp=idDisp.replace("offLine.","");
    }

    var parametri={"userName": xUserCom,"password":gRe, "idServer":xDB,"chiamante":"login","idDispositivo":idDisp,"app":gRe,"captchaToken":"","pwdOL":gRe};

    inviaRichiestaCentralino("login",parametri,function (res){
        var risp=JSON.parse(res);
        console.log(risp)
        var parametri=risp.parametri;
        var data=risp.risposta;
        if (risp.error!=''){
            chiudiDivAttesa()
            return "";
        }
    
        if (data.esito!="ok." || data.esito=="elenco") {

        } else {
            if (data.token==''){
                attivaAlert(2,"Accesso Non Valido!","verificaToken");        
            } else {
                if (data.idAgente==null){
                    data.idAgente=0;
                }
    
                if (data.idCliente==null){
                    data.idCliente=0;
                }
    
                sessionStorage.setItem("t",data.token);
                localStorage.setItem("t1",data.tokenLogin);
                sessionStorage.setItem("userName",parametri.userName);
                sessionStorage.setItem("s",data.idServer);
                sessionStorage.setItem("nome",data.nome);
                sessionStorage.setItem("cognome",data.cognome);
                sessionStorage.setItem("img",data.img);
                sessionStorage.setItem("superUser",data.superUser);
                sessionStorage.setItem("gruppoUtente",data.gruppoUtente);
                sessionStorage.setItem("versioneApp",data.versioneApp);
                sessionStorage.setItem("imgLogoInt",data.imgLogo);
                sessionStorage.setItem("ragSocCliente",data.ragSocCliente);
                sessionStorage.setItem("ragSocAgente",data.ragSocAgente);
                sessionStorage.setItem("nomeConfigurazione",data.nomeConfigurazione);
                sessionStorage.setItem("idC",data.idConfigurazione);
                sessionStorage.setItem("mailMittente",data.mailMittente);
                sessionStorage.setItem("nomeMittente",data.nomeMittente);
                sessionStorage.setItem("listino",data.listino);
                sessionStorage.setItem("xIdAgente",data.idAgente);
                sessionStorage.setItem("xIdCliente",data.idCliente);
                sessionStorage.setItem("fileAppAndroid",data.fileAppAndroid);
    
                if (xOffLine!="true"){
                    xTkCom=data.token;
                }
                if(callBack!='')
                callBack();
            }
        }
    },"body");
}

function recuperaAllDataIndexDb(tabella,callback){
    var trans = db.transaction([tabella],'readonly');
    var store  = trans.objectStore(tabella);
    var request=store.getAll();
    request.onsuccess = function (event) {
        var obj={
            'error': event.target.error==null? '':event.target.error,
        }
        if(event.target.result!=undefined && event.target.result.length>0){
            obj.risposta=event.target.result;
        }else{
            obj.risposta= new Array();
            obj.risposta[0]=0;
        }
        callback(obj);
        return;
    }
    request.onerror = function (event) {

        console.error('Si è verificato un errore');
    }
}
function rimuoviDatiDaIndexDB(tabella,valore,callback=''){
    var trans = db.transaction([tabella],'readwrite');
    var store  = trans.objectStore(tabella);
    var request=store.delete(valore);
    request.onsuccess = function (event) {
        if(callback!=''){
            callback(event);
        }
        return true;
    }
    request.onerror = function (event) {
        attivaAlert(2,"Errore durante la cancellazione dei file","attivaDisattivaOffLine;");        
        console.error('Si è verificato un errore durante la rimozione dei dati da IndexedDB');
        console.error(event);
        return false;
    }
}
var tabelleDaAggiornare=0;
var tabelleAggiornate=0;
var callBackFineAggiornamento='';
function aggiornaTabelleOffline(listaTabelle,modificati=false,callbackFineCaricamento=''){
    var listaTabelle =listaTabelle.split(",");
    console.log(listaTabelle);
    tabelleDaAggiornare=listaTabelle.length;
    tabelleAggiornate=0;
    jSonAttesi=0;
    if(callbackFineCaricamento!=''){
        callBackFineAggiornamento=callbackFineCaricamento;
    }

    richiediJSonLoginVenditaBanco(function(){    
    
    for(var x in listaTabelle){
        switch (listaTabelle[x]) {
            case 'grafici':
                    richiediJSonParametriPagine();
                    richiediJSonGrafici();
                    break;
            case "clienti":
                    richiediJSonClienti(false,modificati);
                    break;
            case "prodotti":
                    richiediJSonArticoli();
                    break;
            case "login":
                    richiediJSonLoginVenditaBanco(false);
                    break;
            case 'parametri':
                    richiediJSonParametriPagine(false);
                    break;
            case 'articoli':
                    richiediJSonDbArticoli(modificati);
                    break;
            case 'codiciAggiuntivi':
                    richiediJSonCodiciAggiuntivi(modificati);
                    break;
            case 'aggiornaTokenOnline':
                richiediJSonLoginVenditaBancoOnline();
                break;
                
        }
    }
});
}
function verificaFineAggiornamento2(){
    tabelleAggiornate++;
    if(jSonAttesi==tabelleAggiornate){
        if(typeof callBackFineAggiornamento === "function" && tabelleDaAggiornare>0){
            callBackFineAggiornamento();
            // tabelleAggiornate=0;
            // tabelleDaAggiornare=0;
        }
    }
}