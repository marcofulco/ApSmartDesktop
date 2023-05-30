const tagNuovoPagamentiHtml = 'nuovoPagamenti.html';
const tagNuovoPagamentiElenco = tagNuovoPagamentiHtml + ':elencoPagamenti';
const tagNuovoPagamentiElencoM = tagNuovoPagamentiHtml + ':elencoPagamentiM';

query[tagNuovoPagamentiHtml]=new Array;
query[tagNuovoPagamentiHtml]['oggetti']=new Array;
query[tagNuovoPagamentiHtml]['oggetti']['txtID']='ID';
query[tagNuovoPagamentiHtml]['oggetti']['txtDescrizione']='DESCRIZIONE';
query[tagNuovoPagamentiHtml]['oggetti']['chkFineMese']='FINEMESE';
query[tagNuovoPagamentiHtml]['oggetti']['chkAvvenuto']='AVVENUTO';
query[tagNuovoPagamentiHtml]['oggetti']['txtNote']='Note';
query[tagNuovoPagamentiHtml]['oggetti']['txtSpese_Incasso']='SPESE_INCASSO';
query[tagNuovoPagamentiHtml]['oggetti']['txtSconto_Pag']='SCONTO_PAG';
query[tagNuovoPagamentiHtml]['oggetti']['chkRateUguali']='RATEUGUALI';
query[tagNuovoPagamentiHtml]['oggetti']['txtGgAgg']='GGAGG';
query[tagNuovoPagamentiHtml]['oggetti']['chkNoFido']='NOFIDO';
query[tagNuovoPagamentiHtml]['oggetti']['chkRaggruppa']='RAGGRUPPA';
query[tagNuovoPagamentiHtml]['oggetti']['elencoPagamenti']='righe';

query[tagNuovoPagamentiElenco]=new Array;
query[tagNuovoPagamentiElenco]['OFFSET']=0;
query[tagNuovoPagamentiElenco]['FETCH']=100;
query[tagNuovoPagamentiElenco]['MAXFETCH']=0;
query[tagNuovoPagamentiElenco]['COUNT']="id";
query[tagNuovoPagamentiElenco]['modelloRiga']=elementiNuovoPagamenti;
query[tagNuovoPagamentiElenco]['oggetti']=new Array;
query[tagNuovoPagamentiElenco]['oggetti']['{ID}']="id";
query[tagNuovoPagamentiElenco]['oggetti']['{ID_PAG}']="ID_PAG";
query[tagNuovoPagamentiElenco]['oggetti']['{GG}']="GG";
query[tagNuovoPagamentiElenco]['oggetti']['{TIPOS}']="TIPOS";
query[tagNuovoPagamentiElenco]['oggetti']['{INISCAD}']="INISCAD";
query[tagNuovoPagamentiElenco]['oggetti']['{PERC_IMPONIB}']="PERC_IMPONIB";
query[tagNuovoPagamentiElenco]['oggetti']['{PERC_IVA}']="PERC_IVA";
query[tagNuovoPagamentiElenco]['oggetti']['{PERC_TRASP}']="PERC_TRASP";
query[tagNuovoPagamentiElenco]['oggetti']['{PERC_INC}']="PERC_INC";
query[tagNuovoPagamentiElenco]['oggetti']['{PERC_IMB}']="PERC_IMB";
query[tagNuovoPagamentiElenco]['oggetti']['{RAGGRUPPA}']="RAGGRUPPA";
query[tagNuovoPagamentiElenco]['oggetti']['{DES_TIPOS}']="DES_TIPOS";
query[tagNuovoPagamentiElenco]['oggetti']['{DES_INISCAD}']="DES_INISCAD";

query[tagNuovoPagamentiElencoM]=new Array;
query[tagNuovoPagamentiElencoM]['oggetti']=new Array;
query[tagNuovoPagamentiElencoM]['oggetti']['txtID']="id";
query[tagNuovoPagamentiElencoM]['oggetti']['cmbTipos']="TIPOS";
query[tagNuovoPagamentiElencoM]['oggetti']['cmbIniScad']="INISCAD";
query[tagNuovoPagamentiElencoM]['oggetti']['txtGG']="GG";
query[tagNuovoPagamentiElencoM]['oggetti']['txtPercImponib']="PERC_IMPONIB";
query[tagNuovoPagamentiElencoM]['oggetti']['txtPercIva']="PERC_IVA";

var parametriNC={"obbligatori":"", "alternativi":"", "alternativi1":"", "nascosti":";"};

//var skPagamento = sessionStorage.getItem("skPagamento");
var skPagamento = sessionPagamenti.getItems();

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var div=document.getElementById("divTitolo");

        if (skPagamento != undefined) {
            div.innerHTML="MODIFICA ";
        } else {
            div.innerHTML="NUOVO ";
        }

        div.innerHTML+="PAGAMENTO";

        recuperaParametri();
    }, 50);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "id":"", "userName": ""}; 
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

    carDatiAnag();
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbPagamenti":
            parametri={"tipoRisposta":"select","tipoQuery":"queryPagamenti","nomeTabella":"righePagamenti", "select":selectID};
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
            if (risposte==1 && idModifica>0){
                carDatiAnag();
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);

    if (parametri.select!="cmbPagamenti"){
        console.log('data => ', data);
        popolaSelectDaJSON(data,parametri.select);
    }
    
    if (risposte==1 && skPagamento!=undefined){
        carDatiAnag();
    }
}

function carDatiAnag(){
    jSonCli = sessionPagamenti.getItems();

    if (jSonCli != undefined) {
      recuperaDescrizioni(jSonCli.righe);
      popolaFormModificaDati(jSonCli, "nuovoPagamenti.html");
    } else {
      idModifica = 0;
    }
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listaPagamenti.html";
    }else{
        window.open("listaPagamenti.html", "_self");
    }
}

function Salva(){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

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

    if (recuperaValueElemento("txteMail")!=""){
        if (!validazioneEmail("txteMail")){
            return;
        }
    }

    var tipoSalva="update";

    if (skPagamento!=undefined){
        var jSon=JSON.parse(skPagamento);
    } else {
        var jSon={};
        jSon.tipoSalva="salva";
    }

    if (jSon.tipoSalva!=undefined){
        tipoSalva=jSon.tipoSalva;
        delete jSon["tipoSalva"];
    }

    for (x in query['nuovopagamenti.html']['oggetti']){
        if (x!="elencoServer"){
            jSon[query['nuovopagamenti.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }

    var parametri={"tipoRisposta":tipoSalva,"tipoSalva":"pagamenti", "dati":jSon};
    inviaRichiestaCentralino(tipoSalva,parametri,elaboraRispostaSalvaUtente);
}

function elaboraRispostaSalvaUtente(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio del pagamento","fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}

function checkRateUguali(cb) {
    //let righeJson = JSON.parse(sessionStorage.getItem('skPagamento'));
    let righeJson = sessionPagamenti.getItems();
    if (righeJson) {
        chkImportiUguali = cb.checked;
        if (chkImportiUguali) {
            ricalcolaPercentuali(righeJson.righe, -1, false, false);
            sessionPagamenti.setItems(righeJson);
            //sessionStorage.setItem("skPagamento", JSON.stringify(righeJson));
            renderElencoPagamenti(righeJson.righe);
        }
    }
};

function calcolaRata(tot, num) {
    return (tot/num).toFixed(2);
}

function generaValoriRighe(righe, rigaRiferimento, nameCol, isAll) {
    const totalItems = isAll ? righe.length : righe.length - 1;
    const limite = 100;
    const subTot = isAll ? limite : limite - righe[rigaRiferimento][nameCol];
    const rata = +calcolaRata(subTot, totalItems);

    let totale = 0;

    righe.forEach(function(riga, index) {
        let value = (+riga[nameCol]).toFixed(2);
        if (index !== rigaRiferimento) {
            value = +rata.toFixed(2);
        }
        riga[nameCol] = (+value).toFixed(2);
        totale += +value;
    });

    console.log('Totale: ', totale);

    let tmp = +(limite - totale).toFixed(2);
    const lastItem = righe.length - 1;
    let lastValue = +righe[lastItem][nameCol];
    if (tmp > 0) lastValue += tmp;
    else lastValue -= (tmp*-1);
    righe[lastItem][nameCol] = lastValue.toFixed(2);
}

function changedCol(righe, nameCol) {
    const lastIndex = righe.length - 1;
    const lastValue = +righe[lastIndex][nameCol];
    return lastValue > 0;
}
    
  
function ricalcolaPercentuali(righeArray, rigaRiferimento, impChanged, ivaChanged, isNew) {
    let calcola = true;
    if (impChanged || chkImportiUguali) {
        if (isNew) {
            calcola = changedCol(righeArray, 'PERC_IMPONIB');
        } 
        if (calcola) {
            generaValoriRighe(righeArray, +rigaRiferimento, 'PERC_IMPONIB', chkImportiUguali);
        }
    }
    if (ivaChanged || chkImportiUguali) {
        if (isNew) {
            calcola = changedCol(righeArray, 'PERC_IVA');
        } 
        if (calcola) {
            generaValoriRighe(righeArray, +rigaRiferimento, 'PERC_IVA', chkImportiUguali);
        }
    }
}