var elementiCboScomparsaArticoli=`<li id="cboNas.{CODICE}" codice="{CODICE}" descrizione="{DESCRIZIONE}" class="row w100-10p pad5" onclick="comboScomparsaSel(this)">
    <div class="row w25-5p clrTestoRosso scrollX-Auto marg5Dx">{CODICE}</div>
    <div class="row w60-25p testoTroncato">{DESCRIZIONE}</div>
    <div class="row w25p">{UM}</div>
    <div class="row w15 dx testoTroncato1">{DISP}</div>
</li>`;

var elementiCboScomparsaLocalita=`<li id="cboNas.{id}" codice="{id}" descrizione="{descrizione}" class="row w100-10p pad10 normale" onclick="comboScomparsaSel(this,valorizzaAltriCampiLocalita)">
    <div class="row w100-150p testoTroncato">{descrizione}</div>
    <div class="row w100p cx">{cap}</div>
    <div class="row w50p cx testoTroncato1">{pr}</div>
</li>`;

var elementiCboScomparsaPosizione=`<li id="cboNas.{id}" POSIZIONE="{POSIZIONE}" class="row w100-10p pad10 normale" onclick="comboScomparsaSel(this)">
    <div class="row w100 testoTroncato">{POSIZIONE}</div>
</li>`;
var elementiComboScomparsaClientiVeBa=`<li id="cboNas.{id}" codice="{id}" RAGIONE_SOCIALE="{ragioneSociale}" class="row w100-15p pad10 separatoreLi" onclick="comboScomparsaSel(this,cmbClientiSel)" style="">
<div class="w100 testoTroncato" style="font-size:18px"><b>{ragioneSociale}</b></div>
<div class="w100 testoTroncato" style="font-size:14px">{indirizzo}</div>
</li>`;
var elementiComboScomparsaArticoliVeBa=`<li id="cboNas.{CODICE}" codice="{CODICE}" descrizione="{DESCRIZIONE}" class="row w100-10p pad5 separatoreLi" onclick="comboScomparsaSel(this,selezionaDaMenuScomparsa)" style="min-height:30px;">
<div class="row w25-5p clrTestoRosso scrollX-Auto marg5Dx style="font-size:18px">{CODICE}</div>
<div class="row w60 testoTroncato" style="font-size:18px">{DESCRIZIONE}</div>
<div class="row w10 testoTroncato dx" style="font-size:18px">{GIAC}</div>
</li>`;
var elementiComboScomparsaRegistratoriCassaVeBa=`<li id="cboNas.{id}" UTENTE="{UTENTE}" class="row w100-15p pad10 separatoreLi" onclick="comboScomparsaSel(this,cmbRegistratoriCassaSel)" style="min-height:30px;">
<div class="w100 testoTroncato" style="font-size:20px;"><b>{UTENTE}</b></div>
</li>`;
var elementiComboScomparsaFamiglia=`<li id="cboNas.{id}" idfamiglia="{id}"descrizione="{descrizione}" class="row w100-15p pad10 separatoreLi" onclick="comboScomparsaSel(this,cmbSelezionaFamiglia)" style="min-height:30px;">
<div class="w100 testoTroncato" style="font-size:20px;"><b>{descrizione}</b></div>
</li>`;
var elementiComboScomparsaListaLottiVeBa=`<li id="cboNas.{LOTTO}" scadenza="{SCADENZAHTML}" lotto="{LOTTO}" class="row w100-15p pad10 separatoreLi" onclick="comboScomparsaSel(this,cmbLottoArticolo)" style="">
<div class="w80 row">
  <div class="w100 testoTroncato" style="font-size:18px"><b>{LOTTO}</b></div>
  <div class="w100 testoTroncato" style="font-size:14px">{SCADENZA}</div>
</div>
<div class="w20 row" style="font-size:14px">{GIACENZA}</div>
</li>`;
var elementiComboScomparsalistaDocumentiEmessiVeBa=`<li id="cboNas.{ID}" IDTES="{ID}" class="row w100-15p pad10 separatoreLi" onclick="comboScomparsaSel(this,cmbScontriniEmessi)" style="">
<div class="w100">
  <div class="w100 testoTroncato" style="font-size:18px"><b>{DOCUMENTO}</b></div>
</div>
<div class="w60 row">
  <div class="w100 testoTroncato" style="font-size:14px">{DATADOCUMENTO}</div>
</div>
<div class="w40 row dx" style="font-size:14px">€ {TOT_DOCUMENTO}</div>
</li>`;

query['articoli']=new Array;
query['articoli']['OFFSET']=0;
query['articoli']['FETCH']=100;
query['articoli']['MAXFETCH']=0;
query['articoli']['modelloRiga']=elementiCboScomparsaArticoli;

query['articoli']['oggetti']=new Array;
query['articoli']['oggetti']['{CODICE}']="CODICE";
query['articoli']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['articoli']['oggetti']['{UM}']="UM";
query['articoli']['oggetti']['{GIAC}']="GIAC";
query['articoli']['oggetti']['{DISP}']="DISP";
query['articoli']['oggetti']['{DISPPRES}']="DISPPRES";

query['localita']=new Array;
query['localita']['OFFSET']=0;
query['localita']['FETCH']=100;
query['localita']['MAXFETCH']=0;
query['localita']['modelloRiga']=elementiCboScomparsaLocalita;

query['localita']['oggetti']=new Array;
query['localita']['oggetti']['{id}']="id";
query['localita']['oggetti']['{descrizione}']="descrizione";
query['localita']['oggetti']['{cap}']="cap";
query['localita']['oggetti']['{pr}']="pr";

query['posizione']=new Array;
query['posizione']['OFFSET']=0;
query['posizione']['FETCH']=100;
query['posizione']['MAXFETCH']=0;
query['posizione']['modelloRiga']=elementiCboScomparsaPosizione;

query['posizione']['oggetti']=new Array;
query['posizione']['oggetti']['{POSIZIONE}']="POSIZIONE";

query['ricercaListaClienti']=new Array;
query['ricercaListaClienti']['OFFSET']=0;
query['ricercaListaClienti']['FETCH']=100;
query['ricercaListaClienti']['MAXFETCH']=0;
query['ricercaListaClienti']['modelloRiga']=elementiComboScomparsaClientiVeBa;

query['ricercaListaClienti']['oggetti']=new Array;
query['ricercaListaClienti']['oggetti']['{id}']="ID";
query['ricercaListaClienti']['oggetti']['{ragioneSociale}']="RAGIONE_SOCIALE";
query['ricercaListaClienti']['oggetti']['{indirizzo}']="INDIRIZZO";

query['articoliVeBa']=new Array;
query['articoliVeBa']['OFFSET']=0;
query['articoliVeBa']['FETCH']=100;
query['articoliVeBa']['MAXFETCH']=0;
query['articoliVeBa']['modelloRiga']=elementiComboScomparsaArticoliVeBa;

query['articoliVeBa']['oggetti']=new Array;
query['articoliVeBa']['oggetti']['{CODICE}']="CODICE";
query['articoliVeBa']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['articoliVeBa']['oggetti']['{GIAC}']="GIAC";

query['registratoriCassa']=new Array;
query['registratoriCassa']['OFFSET']=0;
query['registratoriCassa']['FETCH']=100;
query['registratoriCassa']['MAXFETCH']=0;
query['registratoriCassa']['modelloRiga']=elementiComboScomparsaRegistratoriCassaVeBa;

query['registratoriCassa']['oggetti']=new Array;
query['registratoriCassa']['oggetti']['{UTENTE}']="UTENTE";

query['famigliaArticoli']=new Array;
query['famigliaArticoli']['OFFSET']=0;
query['famigliaArticoli']['FETCH']=100;
query['famigliaArticoli']['MAXFETCH']=0;
query['famigliaArticoli']['modelloRiga']=elementiComboScomparsaFamiglia;

query['famigliaArticoli']['oggetti']=new Array;
query['famigliaArticoli']['oggetti']['{descrizione}']="descrizione";
query['famigliaArticoli']['oggetti']['{id}']="id";


query['listaLottiArticoloVeBa']=new Array;
query['listaLottiArticoloVeBa']['OFFSET']=0;
query['listaLottiArticoloVeBa']['FETCH']=100;
query['listaLottiArticoloVeBa']['MAXFETCH']=0;
query['listaLottiArticoloVeBa']['modelloRiga']=elementiComboScomparsaListaLottiVeBa;

query['listaLottiArticoloVeBa']['oggetti']=new Array;
query['listaLottiArticoloVeBa']['oggetti']['{LOTTO}']="LOTTO";
query['listaLottiArticoloVeBa']['oggetti']['{SCADENZA}']="SCADENZAC";
query['listaLottiArticoloVeBa']['oggetti']['{SCADENZAHTML}']="SCADENZAHTML";
query['listaLottiArticoloVeBa']['oggetti']['{GIACENZA}']={ campo: "GIACENZA", decimaliMax: 2, decimaliMin: 0 };

query['listaDocumentiEmessi']=new Array;
query['listaDocumentiEmessi']['OFFSET']=0;
query['listaDocumentiEmessi']['FETCH']=100;
query['listaDocumentiEmessi']['MAXFETCH']=0;
query['listaDocumentiEmessi']['modelloRiga']=elementiComboScomparsalistaDocumentiEmessiVeBa;

query['listaDocumentiEmessi']['oggetti']=new Array;
query['listaDocumentiEmessi']['oggetti']['{DOCUMENTO}']="DOCUMENTO";
query['listaDocumentiEmessi']['oggetti']['{DATADOCUMENTO}']="DATADOCUMENTO";
query['listaDocumentiEmessi']['oggetti']['{ID}']="ID";
query['listaDocumentiEmessi']['oggetti']['{TOT_DOCUMENTO}']="TOT_DOCUMENTO";

query['listaVettori']=new Array;
query['listaVettori']['OFFSET']=0;
query['listaVettori']['FETCH']=100;
query['listaVettori']['MAXFETCH']=0;
query['listaVettori']['modelloRiga']=elementiComboScomparsaClientiVeBa;

query['listaVettori']['oggetti']=new Array;
query['listaVettori']['oggetti']['{id}']="ID";
query['listaVettori']['oggetti']['{ragioneSociale}']="RAGIONE_SOCIALE";
query['listaVettori']['oggetti']['{indirizzo}']="INDIRIZZO";

var nonChiudereComboScomparsa=false;

function comboScomparsaChiudi(e){
    
  try{
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        if (!nonChiudereComboScomparsa){
            var ul=e.parentNode.getElementsByTagName("ul");
            
            ul[0].style.display="none";
        } 
    }, 1000);
  }catch(e){
    console.log(e)
  }
}

function comboScomparsaScroll(e,tabella,ul,inputID){
    var scrollPos = e.scrollTop;
    var maxScroll = e.scrollHeight - e.clientHeight;

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        var inp=document.getElementById(inputID);
        avviaRicercaComboScomparsa(inp,tabella,ul,false)
    }
}

function comboScomparsaSel(e,callBack=''){
    var inp=document.getElementById(e.parentNode.getAttribute("inputID"));

    inp.value=e.getAttribute(inp.getAttribute("filtro"));

    e.parentNode.style.display="none";

    if (callBack && typeof callBack === "function") {
        callBack(e);
    }
    
}

function avviaRicercaComboScomparsa(e,tabella,ul,ricarica=true){
    var maxFetch=0;
    var ulE=document.getElementById(ul);
    var comboattiva;

    if (e.getAttribute('comboattiva')!=null){
        comboattiva=e.getAttribute('comboattiva');//aggiunto attributo comboattiva per attivare immediatamente la combo senza premere alcun tasto
    }

    if (query[tabella]['MAXFETCH']){
        maxFetch=query[tabella]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
        query[tabella]['OFFSET']=0;
    }
    if(comboattiva==null || comboattiva==false){
        if (query[tabella]['OFFSET']>maxFetch && maxFetch!=0) {
            return '';
        }
    }
    
    var filtro=e.value.replace('+','_');
    if(comboattiva==null || comboattiva==false){
        if (filtro==""){
            ulE.style.display='none';
            return;
        }
        
    }
    
    var campo=e.getAttribute("filtro");
    var parametri={"tipoQuery":"comboNascoste", "ul":ul, "nomeQuery":tabella, "filtro":filtro, "campoFiltro":campo, "ricarica":ricarica, "offSet":query[tabella]['OFFSET'], "fetch":query[tabella]['FETCH']};

    ulE.setAttribute("inputID",e.id);

    elencoInCaricamento=1;
    inviaRichiestaCentralino("query",parametri,elaboraAvviaRicercaComboScomparsa);
}

function elaboraAvviaRicercaComboScomparsa(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;
    
    elencoInCaricamento=0;
    query[parametri.nomeQuery]['OFFSET']+=query[parametri.nomeQuery]['FETCH'];

    if (risp.error!=''){
        document.getElementById(parametri.ul).style.display='none';
        return "";
    }
    
    if(data[0]==0){
        document.getElementById(parametri.ul).style.display='none';
        return "";
    }

    popolaElencoDaJson(data,parametri.ul,0,parametri.nomeQuery,parametri.ricarica,0);

    document.getElementById(parametri.ul).style.display='block';
}

function avviaRicercaComboScomparsaJson(e,tabella,ul,nomeJson){
    var ulE=document.getElementById(ul);

    try {
        var data=JSON.parse(localStorage.getItem(nomeJson));
        
        if (data==undefined){
            ulE.style.display='none';
            return;
        }

        if(data[0]==0){
            ulE.style.display='none';
            return;
        }

        var filtro=e.value.toLowerCase();
        var ricercaVuota=e.getAttribute('comboAttiva')
        
        if (filtro=="" && ricercaVuota==null){
            ulE.style.display='none';
            return;
        }
        
        var campo=e.getAttribute("filtro");
        if(campo==null || campo==""){
            dataF=data;
            }else{

            
            var dataF=[];
            var i=0;

            if (filtro.indexOf("\+")>=0){
                filtro='^.*'+filtro.replace("+","").toLowerCase()+'.*$';
            } else {
                filtro='^'+filtro.toLowerCase()+'.*$';
            }

            var regE=new RegExp(filtro,"g");

            for (x in data){
                if (data[x][campo].toLowerCase().match(regE)) {
                    dataF[i]=data[x];
                    i+=1;
                }
            }
        }
        popolaElencoDaJson(dataF,ul,0,tabella,true,0);

        ulE.style.display='block';
    } catch (error) {
      console.log(error)
      
        ulE.style.display='none';
        return "";
        
    }
}