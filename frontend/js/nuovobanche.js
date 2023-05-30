const tagNuovoBancheHtml = "nuovobanche.html";

query[tagNuovoBancheHtml] = new Array();
query[tagNuovoBancheHtml]["oggetti"] = new Array();
query[tagNuovoBancheHtml]["oggetti"]["txtID"] = "id";
query[tagNuovoBancheHtml]["oggetti"]["txtDescrizione"] = "Descrizione";
query[tagNuovoBancheHtml]["oggetti"]["txtCodPaese"] = "CodPaese";
query[tagNuovoBancheHtml]["oggetti"]["txtCIN"] = "CIN";
query[tagNuovoBancheHtml]["oggetti"]["txtABI"] = "ABI";
query[tagNuovoBancheHtml]["oggetti"]["txtCAB"] = "CAB";
query[tagNuovoBancheHtml]["oggetti"]["txtCC"] = "CC";
query[tagNuovoBancheHtml]["oggetti"]["txtSwiftCode"] = "SwiftCode";
query[tagNuovoBancheHtml]["oggetti"]["txtCodiceSIA"] = "CodiceSIA";
query[tagNuovoBancheHtml]["oggetti"]["txtCreditorID"] = "CreditorID";
query[tagNuovoBancheHtml]["oggetti"]["chkObsoletoB"] = "ObsoletoB";
query[tagNuovoBancheHtml]["oggetti"]["chkPredefinita"] = "Predefinita";
query[tagNuovoBancheHtml]["oggetti"]["cmbAziendaP"] = "AziendaP";

var parametriNC = {
  obbligatori:
    "txtDescrizione;",
  alternativi: "",
  alternativi1: "",
  nascosti: "",
};

var skUtente=sessionStorage.getItem("skVarie.banche");

window.addEventListener("load", function (event) {
  setTimeout(function () {
    var div = document.getElementById("divTitolo");

    if (skUtente!=undefined) {
      div.innerHTML = "MODIFICA ";
    } else {
      div.innerHTML = "NUOVA ";
    }

    div.innerHTML += "BANCA";

    recuperaParametri();
    avviaCarDati("cmbAziendaP");
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
      } catch (error) {}
    }
  }

  if (xIdCliente > 0) {
    document.getElementById("divFido").classList.add("hide");
  }
}

function avviaCarDati(selectID) {
  var parametri;

  switch (selectID) {
    case "cmbAziendaP":
      parametri = {
        tipoRisposta: "select",
        tipoQuery: "querySpecifica",
        nomeTabella: "anagraficaAziende",
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
      if (risposte == 1 && skUtente!=undefined) {
        carDatiAnag();
      }

      return "";
    }
  }

  data = verificaMd5(parametri.select, parametri, risp, data);

  popolaSelectDaJSON(data, parametri.select);

  if (risposte == 1 && skUtente!=undefined) {
    carDatiAnag();
  }
}

function carDatiAnag() {
  //   jSonCli = window.sessionStorage.getItem(
  //     "schedaCliente.html.CLIENTE." + idModifica + ".jSon"
  //   );

  jSonCli = window.sessionStorage.getItem("skVarie.banche");

  if (jSonCli != undefined) {
    jSonCli = JSON.parse(jSonCli);
    popolaFormModificaDati(jSonCli[0], tagNuovoBancheHtml);

    if (xIdCliente > 0 || xIdAgente > 0) {
      document.getElementById("txtRagioneSociale").disabled = true;
      document.getElementById("txtPiva").disabled = true;
      document.getElementById("txtCF").disabled = true;
      // document.getElementById("txtPEC").disabled=true;
      // document.getElementById("txtSDI").disabled=true;
      document.getElementById("cmbPagamento").disabled = true;
      document.getElementById("cmbFamigliaCliFor").disabled = true;

      if (xIdCliente > 0) {
        document.getElementById("txtNote").style.display = none;
      }
    }
  } else {
    idModifica = 0;
  }
}

function esci() {
  window.open("listeVarie.html?tabella=banche", "_self");
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

  for (x in query[tagNuovoBancheHtml]["oggetti"]) {
    jSon[query[tagNuovoBancheHtml]["oggetti"][x]] = recuperaValueElemento(x);
  }

  tipo = "salva";
  if (skUtente!=undefined) {
    tipo = "update";
  }
  var parametri = { tipoRisposta: tipo, tipoSalva: "banche", dati: jSon };
  inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);
}

function elaboraRispostaSalvaCarrello(res) {
  var risp = JSON.parse(res);
  var parametri = risp.parametri;
  var data = risp.risposta;

  if (risp.error != "") {
    return "";
  }

  if (data[0] == 0) {
    attivaAlert(0, "Errore durante il salvataggio della Banca", "fineSalva");
    return "";
  }

  esci();
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
