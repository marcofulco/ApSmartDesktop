var tipoGrafico;
var primoAvvio=true;

var xTipoGrafico=sessionStorage.getItem(nomePagina+".tipoGrafico");
var xAnno=sessionStorage.getItem(nomePagina+".anno");
var xMese=sessionStorage.getItem(nomePagina+".mese");
var xParametriPagina={"dataAPFineMese":0, "modificheGuajana":0, "comeAgenti":0, "noUtile":0, "modificheIceCube":0};

var div=document.getElementById("divTipoGrafico");
var divAnno=document.getElementById("divAnno");
var divMese=document.getElementById("divMese");

var sel;
var op;

var fatturato=1;
var ordini=0;
var incassi=0;
var ingressi=0;
var pagamenti=0;

tipoAnagrafica=recuperaParametroHRef("CLIENTE");
var daHome=recuperaParametroHRef("0","home");

if (tipoAnagrafica=="CLIENTE"){
    var idCliente=window.sessionStorage.getItem("idCliente");

    var tab=document.getElementById("tabIngressi");
    tab.parentNode.removeChild(tab);
    var tab=document.getElementById("tabPagamenti");
    tab.parentNode.removeChild(tab);
    tab=document.getElementById("tabFatture");
    tab.classList.remove("w20");
    tab.classList.add("w33");
    tab=document.getElementById("tabOrdini");
    tab.classList.remove("w20");
    tab.classList.add("w33");
    tab=document.getElementById("tabIncassi");
    tab.classList.remove("w20");
    tab.classList.add("w34");   
} else if (tipoAnagrafica=="FORNITORE") {
    var idCliente=window.sessionStorage.getItem("idFornitore");
} else {
    var idCliente=window.sessionStorage.getItem("idFornitore");
}

var divRS=document.getElementById("divCliente");
divRS.innerHTML=window.sessionStorage.getItem("ragioneSociale");

if (xTipoGrafico!=undefined){
    var span=div.getElementsByTagName("span");
    span[0].innerHTML=xTipoGrafico;

    var idTipo;

    switch (xTipoGrafico){
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

avviaCarDati("selAnno");

document.getElementById("divAgente").classList.add("hide");
document.getElementById("divTipoGrafico").classList.remove("marg1Bottom");
//document.getElementById("divTorta").classList.add("hide");

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 
    
        elencoInCaricamento=1;
        
        if (xIdCliente>0){
            document.getElementById("tabLink").style.display="none";
            document.getElementById("cmdAggiorna").classList.remove("posTopA45p");
        }        

        inviaRichiestaCentralino("parametri",parametri,elaboraParametri);
    }, 50);
});

function tabClick(elmnt){
    //Nascondo tutti gli elementi con class="tabcontent"
    var i, tablinks;

    //Rimuovo il colore di background
    tablinks=document.getElementsByClassName("tablinkColonne");
    for (i=0; i<tablinks.length; i++){
        tablinks[i].setAttribute("style","");
    }
    
    //Aggiungo uno specifico colore al pulsante usato per aprire il contenuto
    elmnt.style.background = "rgb("+xColoreScuro+")";
    
    fatturato=0;
    ordini=0;
    incassi=0;
    ingressi=0;
    pagamenti=0;

    var optRighe=document.getElementById("divRighe");
    var optValore=document.getElementById("divValore");
    var cmbAgente=document.getElementById("cmbAgente");
    var cmbOperatore=document.getElementById("cmbOperatore");
    var divAgente=document.getElementById("divAgente");
    var chkTorta=document.getElementById("divTorta");

    //divAgente.classList.remove("hide");
    divTorta.classList.remove("hide");

    if (elmnt.getAttribute("id")=="tabFatture"){
        fatturato=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            // if (cmbOperatore!=undefined){
            //     cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Agente</option>';
            //     cmbOperatore.id="cmbAgente"
            //     document.getElementById("primaOpzione").innerHTML="Seleziona Agente";
            //     document.getElementsByName("spAgente")[0].innerHTML="Seleziona Agente";
            //     avviaCarDati("cmbAgente",true);
            // }
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabOrdini") {
        ordini=1;

        try {
            optRighe.classList.remove("hide");
            optValore.classList.remove("hide");
            divTorta.classList.add("hide");

            valorizzaCheckedElemento("chkTorta",false);
            // if (cmbAgente!=undefined){
            //     cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
            //     cmbAgente.id="cmbOperatore"
            //     document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
            //     document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
            //     avviaCarDati("cmbOperatore",true);
            // }
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabIngressi") {
        ingressi=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");

            valorizzaCheckedElemento("optRighe",true);
            divTorta.classList.add("hide");

            valorizzaCheckedElemento("chkTorta",false);
            // if (cmbAgente!=undefined){
            //     cmbAgente.innerHTML='<option id="primaOpzione" value="0">Seleziona Operatore</option>';
            //     cmbAgente.id="cmbOperatore"
            //     document.getElementById("primaOpzione").innerHTML="Seleziona Operatore";
            //     document.getElementsByName("spAgente")[0].innerHTML="Seleziona Operatore";
            // }

            avviaCarDati("cmbOperatore",true);
        } catch (error) {
            
        }
    } else if (elmnt.getAttribute("id")=="tabIncassi") {
        incassi=1;

        try {
            optRighe.classList.add("hide");
            optValore.classList.add("hide");
            divTorta.classList.add("hide");

            valorizzaCheckedElemento("chkTorta",false);
            // if (cmbOperatore!=undefined){
            //     cmbOperatore.innerHTML='<option id="primaOpzione" value="0">Seleziona Agente</option>';
            //     cmbOperatore.id="cmbAgente"
            //     document.getElementById("primaOpzione").innerHTML="Seleziona Agente";
            //     document.getElementsByName("spAgente")[0].innerHTML="Seleziona Agente";
            //     avviaCarDati("cmbAgente",true);
            // }
        } catch (error) {
            
        }
    }  else if (elmnt.getAttribute("id")=="tabPagamenti") {
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
    }

    avviaCarDati();
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

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

        if (xParametriPagina.modificheIceCube==1){
            valorizzaHTMLElemento("lblTorta","x Articolo");
        }
        avviaCarDati();
    }
}

function avviaCarDati(select="",forzaAggiorna=false){
    if (select!="") {
        var tipoOp="";

        if (ingressi==1){
            tipoOp="I";
        }

        var parametri={"tipoRisposta":"select","tipoQuery":"grafici","nomeQuery":nomePagina+":"+select, "select":select, "tipoOperatore":tipoOp};
        
        parametri.md5=localStorage.getItem(select+".md5");

        if (select=="cmbAnno"){
            data=sessionStorage.getItem(nomePagina+".select.jSon");
        
            if (data!=undefined){
                data=JSON.parse(data);
                popolaSelectDaJSON(data,parametri.select,xAnno);
                return;
            }
        }
    } else {
        var div=document.getElementById("divTipoGrafico");
        var divAnno=document.getElementById("divAnno");
        var divMese=document.getElementById("divMese");

        var dataDa="";
        var dataA="";

        var dataDaP="";
        var dataAP="";

        var anno="";
        var mese="";

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
            } else {
                divMese.style.visibility="hidden";
            }
        } else {
            divAnno.style.visibility="hidden";
            divMese.style.visibility="hidden";
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
        } else {
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
        }
        
        primoAvvio=false;

        var idAgente=recuperaValueElemento("cmbAgente");
        var idOperatore=getSelectedSelectText("cmbOperatore");

        if (idAgente=="") {
            idAgente=0;
        }

        if (ordini==1){
            desLbl=desLbl.replace("FT","Ordinato");
            desLblP=desLblP.replace("FT","Ordinato");
        } else if (incassi==1){
            desLbl=desLbl.replace("FT","Incassato");
            desLblP=desLblP.replace("FT","Incassato");
        }  else if (pagamenti==1){
            desLbl=desLbl.replace("FT","Pagato");
            desLblP=desLblP.replace("FT","Pagato");
        }

        var torta=0;

        if (recuperaCheckedElemento("chkTorta")){
            torta=1;
        }

        if (xParametriPagina["modificheGuajana"]==0){
            try {
                var tab=document.getElementById("tabOrdini");
                tab.parentNode.removeChild(tab);
                tab=document.getElementById("tabIngressi");
                tab.parentNode.removeChild(tab);
                tab=document.getElementById("tabFatture");
                tab.classList.remove("w20");
                tab.classList.add("w33");
                tab=document.getElementById("tabIncassi");
                tab.classList.remove("w20");
                tab.classList.add("w33");
                tab=document.getElementById("tabPagamenti");
                tab.classList.remove("w20");
                tab.classList.add("w34");
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
                    tab.classList.remove("w20");
                    tab.classList.add("w33");
                    tab=document.getElementById("tabOrdini");
                    tab.classList.remove("w20");
                    tab.classList.add("w33");
                    tab=document.getElementById("tabIncassi");
                    tab.classList.remove("w20");
                    tab.classList.add("w34");   
                } catch (error) {
                    
                }
            }
        }

        var parametri={"tipoRisposta":"grafico","tipoQuery":"grafici","nomeQuery":nomePagina+":"+tipoGrafico,"tipoGrafico":tipoGrafico, 
                        "azienda":0,"idCliente":idCliente,"idAgente":idAgente,"dataDa":dataDa,"dataA":dataA,"dataDaP":dataDaP,"dataAP":dataAP,
                        "desLbl":desLbl, "desLblP":desLblP, "d":d, "anno":anno, "mese":mese ,"chiamante":tipoGrafico,"fatture":fatturato,
                        "ordini":ordini,"incassi":incassi,"idOperatore":idOperatore,"torta":torta, "ingressi":ingressi, "pagamenti":pagamenti,
                        "modificheIceCube":xParametriPagina.modificheIceCube
                    };
        
        var nomeSession=getSessionName(parametri);

        var jSon=sessionStorage.getItem(nomeSession+".jSon");
        if (jSon!=undefined){
            if (forzaAggiorna==false){
                var data=JSON.parse(jSon);

                if (ordini==1 || ingressi==1){
                    if (torta==1){
                        caricaJSONOrdiniTorta(data,dataDaP,desLbl,desLblP,anno);
                    } else {
                        caricaJSONOrdini(data,desLbl,anno,torta);
                    }
                } else {
                    caricaJSON(data,dataDaP,desLbl,desLblP,anno,torta);
                }
                
                return;
            }
        }
    }

    if ((ordini==1 || ingressi==1) && select==""){
        inviaRichiestaCentralino("multiQuery",parametri);
    } else {
        inviaRichiestaCentralino("query",parametri);
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
            if (parametri.tipoRisposta!="select"){
                attivaAlert(xTipoAllert.INFORMAZIONE,"Nessun Dato presente per il periodo richiesto!","erroriCampi");
            }
            
            return "";
        }
    }
    
    switch (parametri.tipoRisposta){
        case "select":
            data=verificaMd5(parametri.select,parametri,risp,data);            
            popolaSelectDaJSON(data,parametri.select,xAnno);
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
            } else {
                caricaJSON(data,parametri["dataDaP"],desLbl,desLblP,anno,torta);
            }
            
            break;
    }
}

function caricaJSONOrdini(rs,desLbl,anno,torta){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var dati=new Array;
    var etichette=new Array;
    var fatturato=[];
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
            } else {
                dati[n][x]=rs[n][x].IMPORTO;
                fatturato[n]+=parseFloat(sistemaNull(rs[n][x].IMPORTO,true));
            }
            
            etichette[n][x]=rs[n][x].DESCRIZIONE;
        }
    }

    var colMin="255, 0, 0";
    var colMed="0, 255, 0";
    var colMax="0, 0, 255";
    
    desLblP="";

    if (ordini==1){
        desLbl="O "+Euro+formattaNumeri(fatturato["ordinato"],vDec,vDec);
        desLblE="E "+Euro+formattaNumeri(fatturato["evaso"],vDec,vDec);
        desLblP="P "+Euro+formattaNumeri(fatturato["prelevato"],vDec,vDec);

        var colore={ordinato:xColoreBase,prelevato:xColoreSecondario,evaso:xColoreScuro,
            prelevato_min:colMin,prelevato_med:colMed,prelevato_max:colMax};
        
        var vEtichette=etichette["ordinato"];

        valorizzaHTMLElemento("lblFatturato",desLbl+' - '+desLblP);
    } else {
        desLbl="Arrivato "+formattaNumeri(fatturato["arrivato"],vDec,vDec);
        desLblE="Ubicato "+formattaNumeri(fatturato["ubicato"],vDec,vDec);
        desLblP="da Ubicare "+formattaNumeri(ubicare,vDec,vDec);

        var colore={arrivato:xColoreBase,ubicato:xColoreSecondario,
            ubicato_min:colMin,ubicato_med:colMed,ubicato_max:colMax};
        
        var vEtichette=etichette["arrivato"];

        valorizzaHTMLElemento("lblFatturato",desLbl+' - '+desLblP);
    }
    
    valorizzaHTMLElemento("lblFatturatoP",desLblE);

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
            if (n=="ordinato" || n=="arrivato"){
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
    canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")
    
    attivaTouchZoom(canv);

    document.getElementById('divCorpo').appendChild(canv);

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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return formattaNumeri(tooltipItem.yLabel,vDec);
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

    valorizzaGrafico(etichette,dati,anno,datiP,(anno-1),torta,colori,fatturato,2,datiU,datiUP,datiT,datiTP);
}

var nrClick=0;

function valorizzaGrafico(etichette, dati, anno, datiP="", annoP="",torta, colori,fatturato,dec=2,datiU="",datiUP="",datiT="",datiTP=""){
    var dataset=[];
    var desEti="FT";

    if (incassi==1){
        desEti="Incassato";
    } else if (pagamenti==1){
        desEti="Pagato";
    }
    
    if ((incassi==1 ||pagamenti==1) && xIdAgente==0 && xIdCliente==0){
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
    canv.setAttribute("style","position: relative; height:"+h+"; width:80vw")

    attivaTouchZoom(canv);
    
    document.getElementById('divCorpo').appendChild(canv);

    var tipo='bar';
    var anchor='end';
    var align='top';
    var rotation=-90;

    if (torta==1){
        tipo='doughnut';
        anchor='center';
        align='center';
    } 

    var ctx = document.getElementById('myChart').getContext('2d');
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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        if (torta==0){
                            //console.log(data);
                            // console.log(tooltipItem);
                            
                            // console.log(data.datasets[tooltipItem.datasetIndex]);

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
                                console.log(error);
                                return formattaNumeri(tooltipItem.yLabel,2);
                            }
                        } else {
                            var v='';
                            if (fatturato>0){
                                v=formattaNumeri(data.datasets[0].data[tooltipItem.index]*100/fatturato,0);
                            }
                            
                            return data.labels[tooltipItem.index]+' ('+v+'%)';
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
                if (torta==0){
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

    if (incassi==1){
        // sessionStorage.setItem("incassiPeriodici.dataDa",dataDa);
        // sessionStorage.setItem("incassiPeriodici.dataA",dataA);

        // window.open("incassiPeriodici.html",xTarget);
    } else {
        sessionStorage.setItem("movimentiPeriodici.dataDa",dataDa);
        sessionStorage.setItem("movimentiPeriodici.dataA",dataA);

        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="movimentiPeriodici.html?idCliente="+idCliente;
        } else {
        window.open("movimentiPeriodici.html?idCliente="+idCliente,xTarget);
        }
    }
}

function getSessionName(parametri){
    return nomePagina+"."+parametri.tipoGrafico+"."+parametri.anno+"."+parametri.mese+"."+parametri.fatture+parametri.ordini+parametri.incassi+parametri.idAgente+parametri.idOperatore+parametri.torta+parametri.ingressi+parametri.pagamenti+parametri.idCliente;
}

function avviaCarDatiSchedaCliente(resoMerce=false){
    if (xIdCliente>0) {
        
        var parametri={"nomeQuery":'schedaCliente.html',"tipoRisposta":"schedaCliente","idCliente":xIdCliente,
                        "tipoQuery":"schedaClienti","chiamante":"schedaCliente","tipoAnagrafica":'CLIENTE',"resoMerce":resoMerce
                        }; 
        inviaRichiestaCentralino("query",parametri,elaboraRispostaSkCli);

    }
}

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

    var comandi="tipoAnagrafica=CLIENTE";

    if (parametri.resoMerce==true){
        comandi+="&resoMerce=1";
    }

    sessionStorage.setItem('schedaCliente.html.CLIENTE.'+xIdCliente+'.jSon',JSON.stringify(data));
    window.sessionStorage.setItem("ragioneSociale",xRagSocCliente);
    window.sessionStorage.setItem('idCliente',xIdCliente);
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="ListaArticoli.html?"+comandi;
    }else{
        window.open("ListaArticoli.html?"+comandi,xTarget);
    }
    
}

function calcolaHGrafico(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var h="41vh";

    if (vw>700 || xIdCliente>0 || xIdAgente>0){
        if (vh>1300){
            h="60vh";
        }  else if (vh>1000){
            h="54vh";
        }  else if (vh>750){
            h="50vh";
        }else if (vh>700){
            h="47vh";
        }
    } else {
        if (vh>800){
            h="47vh";
        } else if (vh>700){
            h="44vh";
        }
    }

    return h;
}

function tornaScheda(){
    if (daHome==1){
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="mainPage.html";
        }else{
            window.open("mainPage.html","_self");   
        }
        
    } else {
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="schedaCliente.html?tipoAnagrafica="+tipoAnagrafica;
        }else{
            window.open("schedaCliente.html?tipoAnagrafica="+tipoAnagrafica,"_self");   
        }
        
    }
}

function listaVenduto(){
    apriDettaglio("",1);
}

function statoOrdini(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="statoOrdini.html?idCliente="+idCliente;
    }else{
        window.open("statoOrdini.html?idCliente="+idCliente,"_self");   
    }
    
}