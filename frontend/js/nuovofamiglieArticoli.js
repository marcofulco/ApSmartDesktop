query["famiglieArticoli.html:gruppiMerceologici"] = new Array();
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"] = new Array();
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtID"] = "id";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtDescrizione"] = "descrizione";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkArticoliSottoScorta"] = "tiposuinv";

query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtProvvigione"] = "provvigione";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkEscludiEcommerce"] = "noecommerce";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["slcIvaReverseAcquisti"] = "idIva_rc";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkRegimeMargine"] = "regimeMargine";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["slcIvaReverseVendita"] = "idIva_rcv";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkAbbattimentoIva"] = "abbattimentoIva";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkProdottiRivendita"] = "rivendita";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkMagazzinoAssistenze"] = "magazzinoAssistenza";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["chkEvidenzaCC"] = "evidenzacc";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtPercRicarico"] = "ricarico";
// query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtUmStd"] = "um_std";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRics_Min"] = "rics_min";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRics_Med"] = "rics_med";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRics_Max"] = "rics_max";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRicf_Min"] = "ricf_min";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRicf_Med"] = "ricf_med";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRicf_Max"] = "ricf_max";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRici_Min"] = "rici_min";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRici_Med"] = "rici_med";
query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]["txtRici_Max"] = "rici_max";

query["famiglieArticoli.html:sottoGuppiMerceologici"] = new Array();
query["famiglieArticoli.html:sottoGuppiMerceologici"]["oggetti"] = new Array();
query["famiglieArticoli.html:sottoGuppiMerceologici"]["oggetti"]["txtDescrizioneFamiglia"] = "descrizione";
query["famiglieArticoli.html:sottoGuppiMerceologici"]["oggetti"]["txtggScadenza"] = "riarico";
query["famiglieArticoli.html:sottoGuppiMerceologici"]["oggetti"]["txtDescrizioneFamiglia1"] = "descrizione";
query["famiglieArticoli.html:sottoGuppiMerceologici"]["oggetti"]["txtDescrizioneFamiglia2"] = "descrizione";



// query["nuovofamiglieArticoli.html"]["oggetti"]["txtGM"] = "GM";
// query["nuovofamiglieArticoli.html"]["oggetti"]["txtIdCat_Web"] = "IDCAT_WEB";

// query["nuovofamiglieArticoli.html"]["oggetti"]["chkTipoSuInv"] = "TIPOSUINV";
// query["nuovofamiglieArticoli.html"]["oggetti"]["txtCCosto"] = "CCOSTO";
// query["nuovofamiglieArticoli.html"]["oggetti"]["txtCRicavo"] = "cricavo";

// query["nuovofamiglieArticoli.html"]["oggetti"]["txtColore"] = "COLORE";

var parametriNC = {
  obbligatori:
    "txtDescrizione;",
  alternativi: "",
  alternativi1: "",
  nascosti: "",
};
var skUtente = sessionStorage.getItem("skVarie.famiglieArticoli");

window.addEventListener("load", function (event) {
  setTimeout(function () {
    var div = document.getElementById("divTitolo");

    if (skUtente != undefined) {
      div.innerHTML = "MODIFICA ";
    } else {
      div.innerHTML = "NUOVA ";
    }

    div.innerHTML += "FAMIGLIA ARTICOLO";
    avviaCarDati("codiciIvaReverse");
    avviaCarDati("famiglieSF");
    recuperaParametri();
  }, 50);
});

function recuperaParametri() {
  var parametri = {
    tipoRisposta: "parametri",
    chiamante: "parametri",
    nomePagina: nomePagina,
    userName: "",
  };

  elencoInCaricamento = 1;

  inviaRichiestaCentralino("parametri", parametri, elaboraParametri);
}

function elaboraParametri(res) {
  var risp = JSON.parse(res);
  var parametri = risp.parametri;
  var data = risp.risposta;

  if (risp.error != "") {
    return "";
  }

  for (x in data) {
    if (!isNaN(Number(data[x]["valore"]))) {
      parametriNC[data[x]["parametro"]] = Number(data[x]["valore"]);
    } else {
      parametriNC[data[x]["parametro"]] = data[x]["valore"];
    }
  }

  if (parametriNC.nascosti != "") {
    m = parametriNC.nascosti.split(";");
    for (x in m) {
      try {
        document.getElementById(m[x]).classList.add("hide");
      } catch (error) { }
    }
  }

  if (xIdCliente > 0) {
    document.getElementById("divFido").classList.add("hide");
  }

  carDatiAnag();
}

function avviaCarDati(selectID) {
  var parametri;

  switch (selectID) {
    case "codiciIvaReverse":
      parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "codiciIvaReverse",
        select: selectID,
      };
      break;
    case "famiglieSF":
      parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "famiglieSF",
        select: selectID,
      };
      break;
  }

  parametri.md5 = localStorage.getItem(selectID + ".md5");

  inviaRichiestaCentralino("query", parametri);
}

var risposte = 0;

function elaboraRisposta(res) {
  var risp = JSON.parse(res);
  var parametri = risp.parametri;
  var data = risp.risposta;

  risposte += 1;

  if (risp.error != "") {
    return "";
  }

  if (Array.isArray(data)) {
    if (data[0] == 0) {
      if (risposte == 6 && idModifica > 0) {
        carDatiAnag();
      }

      return "";
    }
  }

  data = verificaMd5(parametri.select, parametri, risp, data);
  if (parametri.select == 'codiciIvaReverse') {

    popolaSelectDaJSON(data, 'slcIvaReverseAcquisti');
  }
  if (parametri.select == 'famiglieSF') {
    preparaFamiglie(data);
  }

  if (risposte == 2 && skUtente != undefined) {
    carDatiAnag();
  }
}

function carDatiAnag() {
  //   jSonCli = window.sessionStorage.getItem(
  //     "schedaCliente.html.CLIENTE." + idModifica + ".jSon"
  //   );

  jSonCli = window.sessionStorage.getItem("skVarie.famiglieArticoli");

  if (jSonCli != undefined) {
    jSonCli = JSON.parse(jSonCli);
    console.log(jSonCli[0])
    popolaFormModificaDati(jSonCli[0], "famiglieArticoli.html:gruppiMerceologici");

  } else {
    idModifica = 0;
  }
}

function esci() {

  if(typeof modElectron!='undefined' && modElectron==true){
    location.href="listeVarie.html?tabella=famiglieArticoli";
  }else{
    window.open("listeVarie.html?tabella=famiglieArticoli", "_self");
  }
  
}

function Salva() {
  var v;
  var errori = false;
  var campi = "";
  var e;
  var campiAl;
  var r;
  
  for (x in parametriNC) {
    if (x == "obbligatori") {
      v = parametriNC.obbligatori.split(";");
      for (i = 0; i < v.length - 1; i++) {
        if (recuperaValueElemento(v[i]) == "") {
          errori = true;
          e = document.getElementById(v[i]);
          e.setAttribute(
            "style",
            "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
          );
          campi += e.getAttribute("placeholder") + "<br>";
        }
      }
    } else if (x.indexOf("alternativi") >= 0) {
      r = 0;
      campiAl = [""];

      v = parametriNC[x].split(";");
      for (i = 0; i < v.length - 1; i++) {
        if (recuperaValueElemento(v[i]) == "") {
          r += 1;
          campiAl[r] = v[i];
        } else {
          r = 0;
          break;
        }
      }

      if (r > 0) {
        for (i = 1; i <= r; i++) {
          errori = true;
          e = document.getElementById(campiAl[i]);
          e.setAttribute(
            "style",
            "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
          );
          campi += e.getAttribute("placeholder") + "<br>";
        }
      }
    }
  }

  if (errori) {
    attivaAlert(
      2,
      "Non sono stati valorizzati i seguenti Campi Obbligatori:<br>" + campi,
      "erroriCampi"
    );
    return;
  }

  var jSon = {};
  if (document.getElementById('txtDescrizioneFamiglia2').value != '') {
    tabella = 'sottoGruppiMerceologici'
    var tmpIdPadre = document.getElementById('txtDescrizioneFamiglia2').getAttribute('idfamiglia');
    if (tmpIdPadre != null && tmpIdPadre != '') {
      tipo = 'update';
      jSon.id = document.getElementById('txtDescrizioneFamiglia2').getAttribute('idfamiglia');
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia2').value;
    } else {
      tipo = 'salva';
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia2').value;
      jSon.idgr = document.getElementById('txtID').value;
      jSon.livello = 2;
      jSon.idpadre = document.getElementById('txtDescrizioneFamiglia1').getAttribute('idfamiglia');
    }
    console.log('livello 2');
    console.log(tipo)
    console.log(jSon)

  } else if (document.getElementById('txtDescrizioneFamiglia1').value != '') {
    tabella = 'sottoGruppiMerceologici';
    var tmpdPadre = document.getElementById('txtDescrizioneFamiglia1').getAttribute('idfamiglia');
    if (tmpdPadre != null && tmpdPadre != '') {
      tipo = 'update';
      jSon.id = document.getElementById('txtDescrizioneFamiglia1').getAttribute('idfamiglia');
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia1').value;
    } else {
      tipo = 'salva';
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia1').value;
      jSon.idgr = document.getElementById('txtID').value;
      jSon.livello = 1;
      jSon.idpadre = document.getElementById('txtDescrizioneFamiglia').getAttribute('idfamiglia');

    }

  } else if (document.getElementById('txtDescrizioneFamiglia').value != '') {
    var tmpidPadre = document.getElementById('txtDescrizioneFamiglia').getAttribute('idfamiglia');
    jSon.ricarico=document.getElementById('txtPercRicarico').value;
    tabella = 'sottoGruppiMerceologici'
    if (tmpidPadre != null && tmpidPadre != '') {
      tipo = 'update';
      jSon.id = document.getElementById('txtDescrizioneFamiglia').getAttribute('idfamiglia');
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia').value;
    } else {
      tipo = 'salva';
      jSon.descrizione = document.getElementById('txtDescrizioneFamiglia').value;
      jSon.idgr = document.getElementById('txtID').value;
      jSon.livello = 0;
      jSon.idpadre = 0;
    }
  } else {
    for (x in query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"]) {
      jSon[query["famiglieArticoli.html:gruppiMerceologici"]["oggetti"][x]] = recuperaValueElemento(x);
    }
    tabella = "gruppiMerceologici";
    // jSon.descrizione=document.getElementById('txtDescrizione').value;
    // jSon.id=document.getElementById('txtID').value;
    if (jSon.id == '') {
      tipo = "salva";
    } else {
      tipo = "update";
    }

  }

  var parametri = { tipoRisposta: tipo, tipoSalva: tabella, dati: jSon };
  inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);
}

function elaboraRispostaSalvaCarrello(res) {
  var risp = JSON.parse(res);
  
  var parametri = risp.parametri;
  var data = risp.risposta;
  console.log(parametri)
  if(parametri.dati.livello==undefined){
    document.getElementById('txtID').value=data;
  }
  if (risp.error != "") {
    return "";
  }

  if (data[0] == 0) {
    attivaAlert(0, "Errore durante il salvataggio del Codice Iva", "fineSalva");
    return "";
  }
  avviaCarDati("famiglieSF");
  pulisciCampoFamiglia();
  // esci();
}

function resetErrore(e) {
  e.setAttribute("style", "");
}

function valorizzaAltriCampiLocalita() {
  s = document.getElementById("cmbLocalita");

  var jLoc = JSON.parse(localStorage.getItem("cmbLocalita.jSon"));

  if (jLoc != undefined) {
    for (x in jLoc) {
      if (jLoc[x].id == s.value) {
        valorizzaValueElemento("txtCAP", jLoc[x].cap);
        valorizzaValueElemento("txtProv", jLoc[x].pr);
        valorizzaValueElemento("cmbRegione", jLoc[x].regione);
        valorizzaValueElemento("txtIstat", jLoc[x].istat);
        return;
      }
    }
  }
}
var sf = {};
var sf1 = {};
var sf2 = {};
function preparaFamiglie(data) {
  sf = {};
  sf1 = {};
  sf2 = {};
  for (var x of data) {
    if (x.livello == 0 && x.idgr == document.getElementById('txtID').value) {
      sf[x.id] = {
        'id': x.id,
        'descrizione': x.descrizione,
        'idPadre': x.idPadre,
        'ricarico':x.ricarico
      }
    } else if (x.livello == 1) {
      sf1[x.id] = {
        'id': x.id,
        'descrizione': x.descrizione,
        'idPadre': x.idPadre
      }
    } else if (x.livello == 2) {
      sf2[x.id] = {
        'id': x.id,
        'descrizione': x.descrizione,
        'idPadre': x.idPadre
      }
    }
  }
  localStorage.setItem('sfJson', JSON.stringify(sf));
  console.log(sf);
}
function cmbSelezionaFamiglia(input) {


  var txtsf1 = document.getElementById('txtDescrizioneFamiglia1').value
  if (txtsf1 == '') {

    document.getElementById('txtDescrizioneFamiglia').setAttribute("idfamiglia", input.getAttribute("idfamiglia"));
    var ricarico=sf[document.getElementById('txtDescrizioneFamiglia').getAttribute('idfamiglia')].ricarico
    document.getElementById('txtPercRicarico').value=ricarico;
    controlInserimentoFamiglia(document.getElementById('txtDescrizioneFamiglia'));
    var tmpSf1 = new Array();
    for (var x in sf1) {
      if (sf1[x].idPadre == input.getAttribute("idfamiglia")) {
        tmpSf1.push({
          'id': sf1[x].id,
          'descrizione': sf1[x].descrizione,
          'idPadre': sf1[x].idPadre
        })
      }
    }

    localStorage.setItem('sfJson1', JSON.stringify(tmpSf1));
    document.getElementById('txtDescrizioneFamiglia1').disabled = false
  } else if (document.getElementById('txtDescrizioneFamiglia2').value == '') {
    document.getElementById('txtDescrizioneFamiglia1').setAttribute("idfamiglia", input.getAttribute("idfamiglia"));
    var tmpSf2 = new Array();
    for (var x in sf2) {
      if (sf2[x].idPadre == document.getElementById('txtDescrizioneFamiglia1').getAttribute("idFamiglia")) {
        tmpSf2.push({
          'id': sf2[x].id,
          'descrizione': sf2[x].descrizione,
          'idPadre': sf2[x].idPadre
        })
      }
    }
    localStorage.setItem('sfJson2', JSON.stringify(tmpSf2));
    document.getElementById('txtDescrizioneFamiglia2').disabled = false
    controlInserimentoFamiglia(document.getElementById('txtDescrizioneFamiglia1'));
  } else if (document.getElementById('txtDescrizioneFamiglia2').value != '') {
    document.getElementById('txtDescrizioneFamiglia2').setAttribute("idfamiglia", input.getAttribute("idfamiglia"));
    controlInserimentoFamiglia(document.getElementById('txtDescrizioneFamiglia2'));
  }
}


function controlInserimentoFamiglia(input) {
  var x = input.getAttribute('idfamiglia');
  if (x == null || x == "") {
    input.style.color = "red";
  } else {
    input.style.color = "";
  }
  if (input.value == '') {
    if (input.id == 'txtDescrizioneFamiglia') {
      input.setAttribute('idfamiglia', '');
      document.getElementById('txtDescrizioneFamiglia1').value = ''
      document.getElementById('txtDescrizioneFamiglia1').disabled = true;
      document.getElementById('txtDescrizioneFamiglia2').value = ''
      document.getElementById('txtDescrizioneFamiglia2').disabled = true;
    } else if (input.id == 'txtDescrizioneFamiglia1') {
      input.setAttribute('idfamiglia', '');
      document.getElementById('txtDescrizioneFamiglia2').value = ''
      document.getElementById('txtDescrizioneFamiglia2').disabled = true;

    }
  }
}
function eliminaUltimaFamiglia() {
  var sfm2 = document.getElementById('txtDescrizioneFamiglia2');
  var sfm1 = document.getElementById('txtDescrizioneFamiglia1');
  var sfm = document.getElementById('txtDescrizioneFamiglia');
  var fm = document.getElementById('txtDescrizione').value;
  var idfm = document.getElementById('txtID').value;
  if (sfm2.getAttribute('idfamiglia') != null && sfm2.getAttribute('idfamiglia') != '') {
    
    eliminaRecord(this, sfm2.getAttribute('idfamiglia'), sfm2.value, 'sottoGruppiMerceologici','caricaDatiFamiglie');
  } else if (sfm1.getAttribute('idfamiglia') != null && sfm1.getAttribute('idfamiglia') != '') {
    
    eliminaRecord(this, sfm1.getAttribute('idfamiglia'), sfm1.value, 'sottoGruppiMerceologici','caricaDatiFamiglie');
  } else if (sfm.getAttribute('idfamiglia') != null && sfm.getAttribute('idfamiglia') != '') {
    
    
    eliminaRecord(this, sfm.getAttribute('idfamiglia'), sfm.value, 'sottoGruppiMerceologici','caricaDatiFamiglie');
  } else if (fm != '' && idfm != '') {
    
    
    eliminaRecord(this, idfm, fm, 'gruppiMerceologici','caricaDatiFamiglie');
  } else {

    attivaAlert(xTipoAllert.ESCLAMAZIONE, 'ATTENZIONE, NON E STATO SELEZIONATO ALCUN RECORD');
  }
}
function pulisciCampoFamiglia(livello) {
  document.getElementById('txtDescrizioneFamiglia2').value='';
  document.getElementById('txtDescrizioneFamiglia2').removeAttribute('idfamiglia');
  document.getElementById('txtDescrizioneFamiglia1').value='';
  document.getElementById('txtDescrizioneFamiglia1').removeAttribute('idfamiglia');
  document.getElementById('txtDescrizioneFamiglia').value='';
  document.getElementById('txtDescrizioneFamiglia').removeAttribute('idfamiglia');

  // document.getElementById('txtDescrizione').value='';
}
function caricaDatiFamiglie(){
  avviaCarDati('famiglieSF');
  pulisciCampoFamiglia();
}