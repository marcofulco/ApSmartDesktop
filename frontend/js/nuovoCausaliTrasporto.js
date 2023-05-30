query['causaliTrasporto.html'] = new Array;
query['causaliTrasporto.html']['oggetti'] = new Array;
query['causaliTrasporto.html']['oggetti']['txtID'] = "id";
query['causaliTrasporto.html']['oggetti']['txtDescrizione'] = "descrizione";

var parametriNC = {
  obbligatori:
    "txtDescrizione;",
  alternativi: "",
  alternativi1: "",
  nascosti: "",
};

var skUtente=sessionStorage.getItem("skVarie.causaliTrasporto");

window.addEventListener("load", function (event) {
  setTimeout(function () {
    var div = document.getElementById("divTitolo");

    if (skUtente!=undefined) {
      div.innerHTML = "MODIFICA ";
    } else {
      div.innerHTML = "NUOVO  ";
    }

    div.innerHTML += "ASPETTO DEI BENI";
    
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
      } catch (error) {}
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
    // case "depositi":
    //   parametri = {
    //     tipoRisposta: "select",
    //     tipoQuery: "querySpecifica",
    //     nomeTabella: "depositi",
    //     select: selectID,
    //   };
    //   break;
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



}

function carDatiAnag() {
  //   jSonCli = window.sessionStorage.getItem(
  //     "schedaCliente.html.CLIENTE." + idModifica + ".jSon"
  //   );

  jSonCli = window.sessionStorage.getItem("skVarie.causaliTrasporto");

  if (jSonCli != undefined) {
    jSonCli = JSON.parse(jSonCli);
    console.log(jSonCli[0])
    popolaFormModificaDati(jSonCli[0], "causaliTrasporto.html");

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
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listaVarie.html?tabella=causaliTrasporto";
    }else{
        window.open("listeVarie.html?tabella=causaliTrasporto", "_self");
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

  for (x in query["causaliTrasporto.html"]["oggetti"]) {
    jSon[query["causaliTrasporto.html"]["oggetti"][x]] = recuperaValueElemento(x);
  }

  tipo = "salva";
  if (skUtente!=undefined) {
    tipo = "update";
  }
  var parametri = { tipoRisposta: tipo, tipoSalva: "causaliTrasporto", dati: jSon };
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
    attivaAlert(0, "Errore durante il salvataggio del Deposito", "fineSalva");
    return "";
  }

  esci();
}

function resetErrore(e) {
  e.setAttribute("style", "");
}

